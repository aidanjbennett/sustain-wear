'use client'

import { useState, useEffect } from "react";
import {
  getAcknowledgedDonations,
  acceptDonation, rejectDonation
} from "./action";
import { authClient } from "@/lib/auth-client";
import ProtectedPage from "@/components/ProtectedRoute";

export default function AcceptAndRejectPage() {
  const [donations, setDonations] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const limit = 10;

  useEffect(() => {

    const fetchData = async () => {
      const res = await getAcknowledgedDonations(page, limit);
      setDonations(res.donations);
      setTotalPages(res.totalPages);
    };

    fetchData();
  }, [page]);

  const { data: session } = authClient.useSession()
  const charityStaffMemberId = session?.user.id

  const handleAccept = async (donationId) => {
    setIsProcessing(true);
    const result = await acceptDonation(donationId, charityStaffMemberId);

    if (result.success) {
      setMessage({ text: result.message, type: "success" });
      setDonations(donations.filter(d => d.id !== donationId));
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } else {
      setMessage({ text: result.message, type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 5000);
    }
    setIsProcessing(false);
  };

  const handleRejectClick = (donation) => {
    setSelectedDonation(donation);
    setShowRejectModal(true);
    setRejectionReason("");
  };

  const handleRejectConfirm = async () => {
    if (!rejectionReason.trim()) {
      setMessage({ text: "Please provide a rejection reason", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return;
    }

    setIsProcessing(true);
    const result = await rejectDonation(selectedDonation.id, charityStaffMemberId, rejectionReason);

    if (result.success) {
      setMessage({ text: result.message, type: "success" });
      setDonations(donations.filter(d => d.id !== selectedDonation.id));
      setShowRejectModal(false);
      setSelectedDonation(null);
      setRejectionReason("");
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } else {
      setMessage({ text: result.message, type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 5000);
    }
    setIsProcessing(false);
  };

  const handleRejectCancel = () => {
    setShowRejectModal(false);
    setSelectedDonation(null);
    setRejectionReason("");
  };

  return (
    <ProtectedPage >
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Accept / Reject Donations</h1>

        {message.text && (
          <div className={`mb-4 p-4 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {message.text}
          </div>
        )}

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
                  <th className="px-4 py-2 text-left">Actions</th>
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
                    <td>
                      <div className="grid">
                        <button
                          onClick={() => handleAccept(donation.id)}
                          disabled={isProcessing}
                          className="m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectClick(donation)}
                          disabled={isProcessing}
                          className="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                          Reject
                        </button>
                      </div>
                    </td>
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
            className="m-5 align-center bg-green hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-semibold px-4 py-2 border border-black-400 rounded shadow">
            Previous
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(prev => prev + 1)}
            className="m-5 align-center bg-green hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-semibold px-4 py-2 border border-black-400 rounded shadow">
            Next
          </button>
        </div>

        {showRejectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h2 className="text-xl font-semibold mb-4">Confirm Rejection</h2>
              <p className="mb-4 text-gray-700">Are you sure you want to reject this donation? Please provide a reason:</p>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter rejection reason..."
                className="w-full border rounded px-3 py-2 mb-4 min-h-24"
                disabled={isProcessing}
              />
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleRejectCancel}
                  disabled={isProcessing}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                  Cancel
                </button>
                <button
                  onClick={handleRejectConfirm}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  Confirm Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </ProtectedPage>
  );
}