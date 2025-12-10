import Link from "next/link"
import DonorNavbar from '@/components/DonorNavbar'

export default function Home() {
  return (
    <main>
      <DonorNavbar />
      <h1 className="font-bold text-2xl text-center mt-2">Sustain Wear</h1>
      <p className="text-center text-xl">Connecting donors to charity&apos;s since 2024</p>
      <div className="md:flex rounded shadow-md justify-between mx-40 gap-4 mt-10 bg-white">
        <div className="w-1/2">
          <h2 className="text-center text-2xl underline mb-2">For Donors</h2>
          <ul>
            <li className="text-center my-4 ">Easy to donate</li>
            <li className="text-center my-4 ">See history of donations</li>
            <li className="text-center my-4 ">See if donation is accepted</li>
            <li className="text-center my-4 ">Knowledge that you are helping</li>
          </ul>
        </div>
        <div className="w-1/2">
          <h2 className="text-center text-2xl underline mb-2">For Charities</h2>
          <ul>
            <li className="text-center my-4 ">Access to more donors</li>
            <li className="text-center my-4 ">Ablity to sort through donations</li>
            <li className="text-center my-4 ">Amazing Community</li>
            <li className="text-center my-4 ">Ablity to see donation history</li>
          </ul>
          <div className="flex justify-center mt-20 w-40">
            <Link href="/signup" className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded w-full">
              Sign up today!
            </Link>
          </div>
        </div>
      </div>

    </main>
  )
}
