import { useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const [file, setFile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/auth/profile");
        setForm({
          name: res.data.name,
          phone: res.data.phone || "",
        });
        setProfilePic(res.data.profilePic); // 📌 store existing pic
      } catch (err) {
        console.error(err);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      data.append("name", form.name);
      data.append("phone", form.phone);

      if (file) data.append("profilePic", file);

      const res = await api.put("/auth/profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated!");

      // Update localStorage user
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // Also update displayed pic
      setProfilePic(res.data.user.profilePic || null);

    } catch (err) {
      console.error(err);
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      {/* ⭐ PROFILE IMAGE DISPLAY ⭐ */}
      <div className="mb-6 flex flex-col items-center">
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-2 border-blue-600"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-semibold border-2 border-gray-300">
            {form.name ? form.name.charAt(0).toUpperCase() : "U"}
          </div>
        )}
        <p className="mt-2 text-gray-700 font-medium">
          {form.name || "User"}
        </p>
      </div>

      {/* ✏️ EDIT PROFILE FORM */}
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Profile Picture</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border px-2 py-2 rounded"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
