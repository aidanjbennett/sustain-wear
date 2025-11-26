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
    <div>
      <h1>Dashboard</h1>
      <form action={addDonation}>
        <label htmlFor="category">Category of clothing</label>
        <select name="category" id="category">
          <option value="Womens">Womens</option>
          <option value="Mens">Mens</option>
          <option value="Boys">Boys</option>
          <option value="Girls">Girls</option>
        </select>

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

        <label htmlFor="condition">Condition of clothing</label>
        <select name="condition" id="condition">
          <option value="Fair">Fair</option>
          <option value="Good">Good</option>
          <option value="Excellent">Excellent</option>
        </select>

        <button type="submit">
          Add Item
        </button>
      </form>
    </div>
  )
}
