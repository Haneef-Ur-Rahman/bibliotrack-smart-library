import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RecentlyAddedStudents = () => {
  const [recentStudents, setRecentStudents] = useState([]);

  useEffect(() => {
    fetchRecent();
  }, []);

  const fetchRecent = async () => {
    try {
      const { data } = await axios.get("${import.meta.env.VITE_API_URL}/members");
      const sorted = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRecentStudents(sorted.slice(0, 10));
    } catch (error) {
      toast.error("Failed to fetch recent students ❌");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-indigo-700">
        Recently Added Students
      </h3>
      {recentStudents.length === 0 ? (
        <p className="text-center text-gray-500">No recent students found.</p>
      ) : (
        <ul className="space-y-3">
          {recentStudents.map((s) => (
            <li
              key={s._id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md bg-gray-50 transition"
            >
              <p className="font-semibold">
                {s.firstName} {s.lastName} ({s.username})
              </p>
              <p className="text-sm text-gray-600">{s.email}</p>
              <p className="text-xs text-gray-500">
                Added: {new Date(s.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentlyAddedStudents;
