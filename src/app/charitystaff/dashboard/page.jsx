import ProtectedPage from "@/components/ProtectedRoute";
import { db } from "@/lib/prisma";

export default async function CharityStaffDashboard() {

  const amountOfDonations = await db.donation.count()

  return (
    <ProtectedPage>
      <h1>Charity Staff Dashboard</h1>

    </ProtectedPage>
  )
}
