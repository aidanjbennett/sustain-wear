"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ROLE_OPTIONS = ["Donor", "Charity Staff", "Admin"];

function toggleOrder(order) {
  return order === "asc" ? "desc" : "asc";
}

function buildUrl(page, sortBy, order) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("sortBy", sortBy);
  params.set("order", order);
  return `/admin/users?${params.toString()}`;
}

export default function AdminUsersClient({
  users,
  page,
  totalPages,
  totalUsers,
  sortBy,
  order,
}) {
  const router = useRouter();
  const [usersState, setUsersState] = useState(users);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUser, setModalUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [loadingModal, setLoadingModal] = useState(false);
  const [modalError, setModalError] = useState("");
  const [saving, setSaving] = useState(false);
  const [pageAlert, setPageAlert] = useState("");

  async function openEditModal(userId) {
    setModalOpen(true);
    setModalUser(null);
    setSelectedRole("");
    setModalError("");
    setLoadingModal(true);

    try {
      const res = await fetch(`/api/admin/users/${userId}`);
      if (!res.ok) {
        setModalError(
          "This user's information could not be loaded at this time"
        );
        return;
      }
      const data = await res.json();
      setModalUser(data.user);
      setSelectedRole(data.user.role);
    } catch (e) {
      console.error(e);
      setModalError(
        "This user's information could not be loaded at this time"
      );
    } finally {
      setLoadingModal(false);
    }
  }

  function closeModal() {
    setModalOpen(false);
    setModalUser(null);
    setSelectedRole("");
    setModalError("");
    setSaving(false);
  }

  const hasRoleChanged =
    modalUser && selectedRole && selectedRole !== modalUser.role;

  const isAdminTarget = modalUser && modalUser.role === "Admin";

  async function handleSave() {
    if (!modalUser || !hasRoleChanged || isAdminTarget) return;

    setSaving(true);
    setPageAlert("");

    try {
      const res = await fetch(`/api/admin/users/${modalUser.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: selectedRole }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPageAlert(data.error || "Failed to update role");
        setSaving(false);
        return;
      }

      setUsersState((prev) =>
        prev.map((u) =>
          u.id === modalUser.id ? { ...u, role: selectedRole } : u
        )
      );

      setPageAlert(data.message);

      closeModal();

      router.refresh();
    } catch (e) {
      console.error(e);
      setPageAlert("Failed to update role");
      setSaving(false);
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">View Users</h1>

      {pageAlert && (
        <div className="mb-4 rounded border border-green-500 bg-green-50 px-4 py-2 text-sm text-green-700">
          {pageAlert}
        </div>
      )}

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">
                <Link
                  href={buildUrl(
                    1,
                    "id",
                    sortBy === "id" ? toggleOrder(order) : "asc"
                  )}
                >
                  ID {sortBy === "id" && (order === "asc" ? "▲" : "▼")}
                </Link>
              </th>
              <th className="px-4 py-2 text-left">
                <Link
                  href={buildUrl(
                    1,
                    "name",
                    sortBy === "name" ? toggleOrder(order) : "asc"
                  )}
                >
                  Full Name{" "}
                  {sortBy === "name" && (order === "asc" ? "▲" : "▼")}
                </Link>
              </th>
              <th className="px-4 py-2 text-left">
                <Link
                  href={buildUrl(
                    1,
                    "role",
                    sortBy === "role" ? toggleOrder(order) : "asc"
                  )}
                >
                  Role {sortBy === "role" && (order === "asc" ? "▲" : "▼")}
                </Link>
              </th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersState.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-2">{u.id}</td>
                <td className="px-4 py-2">{u.name || "-"}</td>
                <td className="px-4 py-2">{u.role}</td>
                <td className="px-4 py-2">
                  <button
                    className="rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
                    onClick={() => openEditModal(u.id)}
                  >
                    Edit role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Page {page} of {totalPages} • {totalUsers} users total (30 per page)
        </div>
        <div className="flex gap-2">
          {page > 1 && (
            <Link
              href={buildUrl(page - 1, sortBy, order)}
              className="rounded border px-3 py-1 text-sm"
            >
              Previous
            </Link>
          )}
          {page < totalPages && (
            <Link
              href={buildUrl(page + 1, sortBy, order)}
              className="rounded border px-3 py-1 text-sm"
            >
              Next
            </Link>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Edit user role</h2>

            {loadingModal ? (
              <p>Loading user information...</p>
            ) : modalError ? (
              <p className="text-red-600 text-sm">{modalError}</p>
            ) : modalUser ? (
              <>
                <div className="mb-3 text-sm">
                  <div className="mb-2">
                    <label className="block text-xs font-semibold text-gray-600">
                      ID
                    </label>
                    <input
                      className="w-full rounded border px-2 py-1 text-sm bg-gray-100"
                      value={modalUser.id}
                      readOnly
                    />
                  </div>

                  <div className="mb-2">
                    <label className="block text-xs font-semibold text-gray-600">
                      Name
                    </label>
                    <input
                      className="w-full rounded border px-2 py-1 text-sm bg-gray-100"
                      value={modalUser.name || ""}
                      readOnly
                    />
                  </div>

                  <div className="mb-2">
                    <label className="block text-xs font-semibold text-gray-600">
                      Email
                    </label>
                    <input
                      className="w-full rounded border px-2 py-1 text-sm bg-gray-100"
                      value={modalUser.email || ""}
                      readOnly
                    />
                  </div>

                  <div className="mb-2">
                    <label className="block text-xs font-semibold text-gray-600">
                      Role
                    </label>
                    <select
                      className="w-full rounded border px-2 py-1 text-sm"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      disabled={isAdminTarget}
                    >
                      {ROLE_OPTIONS.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    {isAdminTarget && (
                      <p className="mt-1 text-xs text-gray-500">
                        Admin roles cannot be changed.
                      </p>
                    )}
                  </div>
                </div>
              </>
            ) : null}

            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded border px-3 py-1 text-sm"
                onClick={closeModal}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                className="rounded bg-green-600 px-3 py-1 text-sm font-medium text-white disabled:opacity-50"
                onClick={handleSave}
                disabled={saving || !hasRoleChanged || isAdminTarget}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
