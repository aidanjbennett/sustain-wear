import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import AdminUsersClient from "@/components/AdminUsersClient";

const PAGE_SIZE = 30;

const VALID_SORT_FIELDS = ["id", "name", "role"];

function parseSortField(value) {
  if (!value) return "id";
  return VALID_SORT_FIELDS.includes(value) ? value : "id";
}

function parseSortOrder(value) {
  return value === "desc" ? "desc" : "asc";
}

function parsePage(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.floor(n);
}

export const dynamic = "force-dynamic";

export default async function AdminUsersPage({ searchParams }) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session.user) {
    redirect("/login");
  }

  const currentUser = session.user;

  if (currentUser.role !== "Admin") {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Unauthorised Access</h1>
        <p>You do not have permission to view this page.</p>
      </main>
    );
  }

  const page = parsePage(await searchParams?.page);
  const sortBy = parseSortField(await searchParams?.sortBy);
  const order = parseSortOrder(await searchParams?.order);

  let totalUsers = 0;
  let users = [];
  let loadError = false;

  try {
    totalUsers = await db.user.count();

    if (totalUsers > 0) {
      const orderBy = {};
      orderBy[sortBy] = order;

      users = await db.user.findMany({
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        orderBy,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
    }
  } catch (e) {
    console.error("Error loading users:", e);
    loadError = true;
  }

  const totalPages = Math.max(1, Math.ceil(totalUsers / PAGE_SIZE));

  if (loadError) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">View Users</h1>
        <p className="text-red-600">
          Unable to load users. Please try again later.
        </p>
      </main>
    );
  }

  if (totalUsers === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">View Users</h1>
        <p>There are no users in the database.</p>
      </main>
    );
  }

  return (
    <AdminUsersClient
      users={users}
      page={page}
      totalPages={totalPages}
      totalUsers={totalUsers}
      sortBy={sortBy}
      order={order}
      currentAdmin={currentUser}
    />
  );
}
