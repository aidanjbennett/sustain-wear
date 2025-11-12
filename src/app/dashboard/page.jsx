import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers, cookies } from "next/headers";
import { db } from "@/lib/prisma";
import { addDonation } from "./actions";

export default async function Dashboard() {

  const session = await auth.api.getSession({
    headers: await headers(),
    cookies: await cookies(),
  });

  if (!session) {
    redirect("/login")
  }

  const userId = session.user.id

  const donations = await db.donation.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1>Dashboard {userId}</h1>
      <form action={addDonation}>
        <label htmlFor="type">Type of clothing</label>
        <input
          id="type"
          name="type"
          type="text"
          required
        />

        <label htmlFor="size">Size of clothing</label>
        <input
          id="size"
          name="size"
          type="text"
          required
        />

        <label htmlFor="brand">Brand of clothing</label>
        <input
          id="brand"
          name="brand"
          type="text"
          required
        />

        <label htmlFor="colour">Colour of clothing</label>
        <input
          id="colour"
          name="colour"
          type="text"
          required
        />

        <button type="submit">
          Add Item
        </button>
      </form>

      {donations.length > 0 ? (
        <ul>
          {donations.map((donation) => (
            <li key={donation.id}>
              <strong>{donation.type}</strong> – {donation.brand} (
              {donation.size}, {donation.colour})
            </li>
          ))}
        </ul>
      ) : (
        <p>No donations yet.</p>
      )}
    </div>
  )
}
