import ProtectedPage from "@/components/ProtectedRoute"
import { db } from "@/lib/prisma"

export default async function AdminDashboard() {

  const donors = await db.user.count({
    where: {
      role: "Donor",
    },
  })

  const staff = await db.user.count({
    where: {
      role: "Charity Staff",
    },
  })

  const admin = await db.user.count({
    where: {
      role: "Admin",
    },
  })

  const donations = await db.donation.count()

  const amountOfAcceptedDonations = await db.donation.count({
    where: {
      accepted: true,
    },
  });

  const amountOfRejectedDonations = await db.donation.count({
    where: {
      accepted: true,
    },
  });

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Total Donors</h2>
            <p className="text-3xl font-bold text-blue-600">{donors}</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Total Charity Staff</h2>
            <p className="text-3xl font-bold text-blue-600">{staff}</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Total Admins</h2>
            <p className="text-3xl font-bold text-blue-600">{admin}</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Total Donations</h2>
            <p className="text-3xl font-bold text-blue-600">{donations}</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Accepted Donations</h2>
            <p className="text-3xl font-bold text-green-600">{amountOfAcceptedDonations}</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Rejected Donations</h2>
            <p className="text-3xl font-bold text-red-600">{amountOfRejectedDonations}</p>
          </div>
        </div>
      </div>
    </ProtectedPage>
  )
}
