import Link from 'next/link'

export default function Navbar() {
  return (

    <nav className="bg-green-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"> SustainWear</span>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link href="/login" className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Login</Link>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul>
            <Link href='/donor/donate' className='text-xl font-semibold whitespace-nowrap dark:text-white py-2 px-7 hover:text-gray-200'>Donate</Link>
          </ul>
          <ul>
            <Link href='/donor/history' className='text-xl font-semibold whitespace-nowrap dark:text-white py-2 px-7 hover:text-gray-200'>Donation History</Link>
          </ul>
          <ul>
            <a href='' className='text-xl font-semibold whitespace-nowrap dark:text-white py-2 px-7 hover:text-gray-200'>test link</a>
          </ul>
          <ul>
            <a href='' className='text-xl font-semibold whitespace-nowrap dark:text-white py-2 px-7 hover:text-gray-200'>test link</a>
          </ul>
        </div>
      </div>
    </nav>

  )
}
