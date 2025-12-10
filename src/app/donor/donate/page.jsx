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
    <main className="max-w-4xl mx-auto px-4 py-8">
    <h1 className="text-2xl font-semibold mb-6">Donate Clothing Here</h1>
<div className="flex items-center justify-center">
      <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 w-2xl max-w-2xl"
        action={addDonation}>
          <div className="flex">
        <label className="font-semibold" htmlFor="category">Category of clothing:</label>
        <select className=" px-2 mb-6 bg-gray-100" name="category" id="category">
          <option value="Womens">Womens</option>
          <option value="Mens">Mens</option>
          <option value="Boys">Boys</option>
          <option value="Girls">Girls</option>
        </select>
        </div>

        <label className="font-semibold text-m" htmlFor="type"> Type of clothing </label>
        <input
          id="type"
          name="type"
          type="text"
          required
          className="rounded w-full py-2 px-3 mb-6 bg-gray-100"
        />

        <label className="font-semibold text-m" htmlFor="size">Size of clothing</label>
        <input
          id="size"
          name="size"
          type="text"
          required
          className="rounded w-full py-2 px-3 mb-6 bg-gray-100"
        />

        <label className="font-semibold text-m" htmlFor="brand">Brand of clothing</label>
        <input
          id="brand"
          name="brand"
          type="text"
          required
          className="rounded w-full py-2 px-3 mb-6 bg-gray-100"
        />

        <label className="font-semibold text-m" htmlFor="colour">Colour of clothing</label>
        <input
          id="colour"
          name="colour"
          type="text"
          required
          className="rounded w-full py-2 px-3 mb-6 bg-gray-100"
        />

        <label className="font-semibold text-m px-2 mb-4" htmlFor="condition">Condition:</label>
        <select className="mb-4 rounded bg-gray-100" name="condition" id="condition">
          <option value="fair">Fair</option>
          <option value="good">Good</option>
          <option value="excellent">Excellent</option>
        </select>
        <button className="bg-green-700 hover:bg-green-900 text-white font-semibold py-2 mb-6 rounded w-full"
          type="submit">
          Submit Donation
        </button>
      </form>
    </div>
    </main>
  )
}
