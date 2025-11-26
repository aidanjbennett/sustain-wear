import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function DonationHistoryPage() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });


  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = session.user.id;

  const donations = await db.donation.findMany({
    where: { userId },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Donation History</h1>

      {donations.length === 0 ? (
        <p className="text-gray-600">
          You haven&apos;t donated any items yet.
        </p>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Type of Clothing</th>
                <th className="px-4 py-2 text-left">Size</th>
                <th className="px-4 py-2 text-left">Brand</th>
                <th className="px-4 py-2 text-left">Colour</th>
                <th className="px-4 py-2 text-left">Condition</th>
                <th className="px-4 py-2 text-left">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id} className="border-t">
                  <td className="px-4 py-2">{donation.type}</td>
                  <td className="px-4 py-2">
                    {donation.size && donation.size.trim()
                      ? donation.size
                      : "-"}
                  </td>
                  <td className="px-4 py-2">
                    {donation.brand && donation.brand.trim()
                      ? donation.brand
                      : "-"}
                  </td>
                  <td className="px-4 py-2">
                    {donation.colour && donation.colour.trim()
                      ? donation.colour
                      : "-"}
                  </td>
                  <td className="px-4 py-2">{donation.condition}</td>
                  <td className="px-4 py-2">
                    {new Date(donation.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}