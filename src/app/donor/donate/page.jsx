import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers, cookies } from "next/headers";
import { addDonation } from "./actions";

export default async function Donate() {

  const session = await auth.api.getSession({
    headers: await headers(),
    cookies: await cookies(),
  });

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-xl max-w-xs"
      action={addDonation}>
        <p className="font-bold text-center text-2xl mb-4">Donate</p>
        <label className="font-bold" htmlFor="type">Type of clothing</label>
        <input 
          id="type"
          name="type"
          type="text"
          required
          className="border rounded w-full py-2 px-3 mb-6 bg-gray-100"
        />
        
        <label className="font-bold" htmlFor="size">Size of clothing</label>
        <input
          id="size"
          name="size"
          type="text"
          required
          className="border rounded w-full py-2 px-3 mb-6 bg-gray-100"
        />

        <label className="font-bold" htmlFor="brand">Brand of clothing</label>
        <input 
          id="brand"
          name="brand"
          type="text"
          required
          className="border rounded w-full py-2 px-3 mb-6 bg-gray-100"
        />

        <label className="font-bold" htmlFor="colour">Colour of clothing</label>
        <input 
          id="colour"
          name="colour"
          type="text"
          required
          className="border rounded w-full mb-6 bg-gray-100"
        />

        <label className="font-bold px-2 mb-4" htmlFor="condition">Condition:</label>
        <select className="mb-4" name="condition" id="condition">
          <option value="fair">Fair</option>
          <option value="good">Good</option>
          <option value="excellent">Excellent</option>
        </select>
        <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 mb-6 rounded w-full"
        type="submit">
          Submit Donation
        </button>
      </form>
    </div>
  )
}
