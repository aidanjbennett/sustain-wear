import ProtectedPage from "@/components/ProtectedRoute";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { headers, cookies } from "next/headers";

export default async function DonorDashboard() {

  const session = await auth.api.getSession({
    headers: await headers(),
    cookies: await cookies(),
  });

  if (!session) {
    redirect("/login")
  }

  const userId = session.user.id

  const userWithNotifications = await db.user.findUnique({
    where: { id: userId },
    include: {
      notifications: {
        orderBy: { createdAt: "desc" },
        take: 15,
      },
    },
  });

  const userWithDonations = await db.user.findUnique({
    where: { id: userId },
    include: {
      donations: {
        orderBy: { createdAt: "desc" },
        take: 15,
      },
    },
  });


  return (
    <ProtectedPage>
      <div className="mx-4 mt-4">
        <h1 className="text-3xl font-bold mb-6">Donor Dashboard</h1>

        <h2 className="text-xl font-semibold mt-6 mb-3">Recent Notifications</h2>
        <ul className="space-y-4">
          {userWithNotifications.notifications.map((notif) => (
            <li
              key={notif.id}
              className="p-4 rounded-xl bg-gray-100 shadow-sm border border-gray-200"
            >
              <p className="font-medium">{notif.message}</p>
              <small className="text-gray-500 block mt-1">
                {new Date(notif.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">Recent Donations</h2>
        <ul className="space-y-4">
          {userWithDonations.donations.map((donation) => (
            <li
              key={donation.id}
              className="p-4 rounded-xl bg-white shadow-sm border border-gray-200 flex"
            >
              <p className="font-semibold text-gray-700">{donation.category} {donation.brand} {donation.colour} {donation.size} {new Date(donation.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedPage>
  )
}
