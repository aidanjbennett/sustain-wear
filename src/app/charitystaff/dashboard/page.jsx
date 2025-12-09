import ProtectedPage from "@/components/ProtectedRoute";
import { db } from "@/lib/prisma";

export default async function CharityStaffDashboard() {

  const amountOfDonations = await db.donation.count()
  const amountOfAcceptedDonations = await db.donation.count({
    where: {
      accepted: true,
    },
  });

  const ammountOfRejectedDonations = await db.donation.count({
    where: {
      accepted: false,
    },
  });

  const weeklyDonationCount = await db.donation.count({
    where: {
      createdAt: {
        // eslint-disable-next-line react-hooks/purity
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  });


  const monthlyDonationCount = await db.donation.count({
    where: {
      createdAt: {
        // eslint-disable-next-line react-hooks/purity
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
  });

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Charity Staff Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Total Donations</h2>
            <p className="text-3xl font-bold text-blue-600">{amountOfDonations}</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Accepted Donations</h2>
            <p className="text-3xl font-bold text-green-600">{amountOfAcceptedDonations}</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Rejected Donations</h2>
            <p className="text-3xl font-bold text-red-600">{ammountOfRejectedDonations}</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Weekly Donations</h2>
            <p className="text-3xl font-bold text-blue-600">{weeklyDonationCount}</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Monthly Donations</h2>
            <p className="text-3xl font-bold text-blue-600">{monthlyDonationCount}</p>
          </div>
        </div>
      </div>
    </ProtectedPage>
  )
}
