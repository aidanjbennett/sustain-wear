import { useState } from "react";


export default function DonationForm() {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    size: "",
    brand: "",
    colour: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div>
      <form action="">
        <label htmlFor="type">Type of clothing</label>
        <input
          id="type"
          type="text"
          value={formData.type}
          onChange={handleChange}
          required
        />

        <label htmlFor="size">Size of clothing</label>
        <input
          id="size"
          type="text"
          value={formData.size}
          onChange={handleChange}
          required
        />


        <label htmlFor="brand">Brand of clothing</label>
        <input
          id="brand"
          type="text"
          value={formData.brand}
          onChange={handleChange}
          required
        />

        <label htmlFor="colour">Colour of clothing</label>
        <input
          id="colour"
          type="text"
          value={formData.brand}
          onChange={handleChange}
          required
        />


        <button type="submit" disabled={loading}>
          {loading ? "Creating item..." : "Add Item"}
        </button>

      </form>
    </div >
  )
}
