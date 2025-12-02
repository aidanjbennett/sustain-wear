'use client'

import { useState, useEffect } from "react";
import { getUnacknowledgedDonations } from "./viewDonationsActions";

export default function ViewDonationsTable() {

  const [donations, setDonations] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUnacknowledgedDonations(page, limit);
      setDonations(res.donations);
      setTotalPages(res.totalPages);
    };
    fetchData();
  }, [page]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">View Unacknowledged Donations</h1>

      {donations.length === 0 ? (
        <p className="text-gray-600">There are no incoming donations.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Donor Name</th>
                <th className="px-4 py-2 text-left">Category of Clothing</th>
                <th className="px-4 py-2 text-left">Type of Clothing</th>
                <th className="px-4 py-2 text-left">Size</th>
                <th className="px-4 py-2 text-left">Brand</th>
                <th className="px-4 py-2 text-left">Colour</th>
                <th className="px-4 py-2 text-left">Condition</th>
                <th className="px-4 py-2 text-left">Date Received</th>
                <th className="px-4 py-2 text-left">Acknowledge Donation</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id} className="border-t">
                  <td className="px-4 py-2">{donation.user.name}</td>
                  <td className="px-4 py-2">{donation.category}</td>
                  <td className="px-4 py-2">{donation.type}</td>
                  <td className="px-4 py-2">{donation.size && donation.size.trim() ? donation.size : "-"}</td>
                  <td className="px-4 py-2">{donation.brand && donation.brand.trim() ? donation.brand : "-"}</td>
                  <td className="px-4 py-2">{donation.colour && donation.colour.trim() ? donation.colour : "-"}</td>
                  <td className="px-4 py-2">{donation.condition}</td>
                  <td className="px-4 py-2">{new Date(donation.createdAt).toLocaleString()}</td>
                  <td><button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded">
                    Acknowledge</button></td>
                  {/* <td>
                    <div className="inline-flex">
                      <button className="px-4 py-2 m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded">
                        Accept</button>
                      <button className="px-4 py-2 m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded">
                        Reject</button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-center">
        <button
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
          className="px-4 py-2 m-5 align-center bg-green hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-semibold px-4 py-2 border border-black-400 rounded shadow">
          Previous
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(prev => prev + 1)}
          className="px-4 py-2 m-5 align-center bg-green hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-semibold px-4 py-2 border border-black-400 rounded shadow">
          Next
        </button>
      </div>
    </main>
  )
}
