import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [houses, setHouses] = useState([]);

  const fetchData = async () => {
    try {
      const u = await api.get("/admin/users");
      const h = await api.get("/admin/houses");
      setUsers(u.data);
      setHouses(h.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
  const load = async () => {
    try {
      await fetchData();
    } catch (err) {
      console.error("Admin fetch failed:", err);
    }
  };

  load();
}, []);


  const deleteUser = async (id) => {
    await api.delete(`/admin/users/${id}`);
    fetchData();
  };

  const deleteHouse = async (id) => {
    await api.delete(`/admin/houses/${id}`);
    fetchData();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Users Table */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Users</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.role}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Houses Table */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Houses</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Title</th>
              <th class="p-2 border">Owner</th>
              <th class="p-2 border">Price</th>
              <th class="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {houses.map((h) => (
              <tr key={h._id}>
                <td className="p-2 border">{h.title}</td>
                <td className="p-2 border">{h.ownerName}</td>
                <td className="p-2 border">₹ {h.price}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => deleteHouse(h._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
