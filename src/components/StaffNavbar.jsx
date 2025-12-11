"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function StaffNavbar() {

  const router = useRouter()

  async function signOut() {
    await authClient.signOut();
    router.push("/login");
  }

  return (
    <nav className="bg-green-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"> SustainWear</span>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button onClick={signOut} className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Sign out</button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul>
            <Link href='/charitystaff/accept-reject' className='text-xl font-semibold whitespace-nowrap dark:text-white py-2 px-7 hover:text-gray-200'>Accept/Reject</Link>
          </ul>
          <ul>
            <Link href='/charitystaff/viewdonations' className='text-xl font-semibold whitespace-nowrap dark:text-white py-2 px-7 hover:text-gray-200'>View Donations</Link>
          </ul>
          <ul>
            <Link href='/charitystaff/dashboard' className='text-xl font-semibold whitespace-nowrap dark:text-white py-2 px-7 hover:text-gray-200'>Dashboard</Link>
          </ul>
        </div>
      </div>
    </nav>

  )
}
