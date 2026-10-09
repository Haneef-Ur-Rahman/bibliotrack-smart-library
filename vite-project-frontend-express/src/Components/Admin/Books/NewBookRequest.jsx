import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Edit,
  Trash2,
  Loader,
  User,
  Calendar,
  BookOpen,
  X,
  Save,
} from "lucide-react";

const NewBookRequest = ({ darkMode }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  // Form state for the modal
  const [updateForm, setUpdateForm] = useState({
    status: "Pending",
    adminNote: "",
  });

  const token = localStorage.getItem("token");

  // ================= FETCH ALL REQUESTS =================
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/books/admin/requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setRequests(data.requests || []);
    } catch (err) {
      setError("Failed to fetch requests. Please try again.");
      toast.error(err.response?.data?.message || "Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ================= MODAL FUNCTIONS =================
  const openUpdateModal = (request) => {
    setSelectedRequest(request);
    setUpdateForm({
      status: request.status,
      adminNote: request.adminNote || "",
    });
    setIsModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
    setUpdateForm({ status: "Pending", adminNote: "" });
  };

  // ================= UPDATE REQUEST =================
  const handleUpdateRequest = async () => {
    if (!selectedRequest) return;

    setUpdateLoading(true);
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/books/admin/request/${selectedRequest._id}`,
        updateForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message || "Request updated successfully");
      closeUpdateModal();
      fetchRequests(); // Refresh the list
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update request");
    } finally {
      setUpdateLoading(false);
    }
  };

  // ================= DELETE REQUEST =================
  const handleDeleteRequest = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) {
      return;
    }

    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/books/admin/request/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message || "Request deleted successfully");
      fetchRequests(); // Refresh the list
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete request");
    }
  };

  // ================= STATUS BADGE =================
  const getStatusBadge = (status) => {
    const baseClasses =
      "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit";
    switch (status) {
      case "Approved":
        return (
          <span
            className={`${baseClasses} ${darkMode ? "bg-green-900/30 text-green-400 border border-green-800" : "bg-green-100 text-green-700 border border-green-200"}`}
          >
            <CheckCircle className="w-4 h-4" /> Approved
          </span>
        );
      case "Rejected":
        return (
          <span
            className={`${baseClasses} ${darkMode ? "bg-red-900/30 text-red-400 border border-red-800" : "bg-red-100 text-red-700 border border-red-200"}`}
          >
            <XCircle className="w-4 h-4" /> Rejected
          </span>
        );
      default:
        return (
          <span
            className={`${baseClasses} ${darkMode ? "bg-amber-900/30 text-amber-400 border border-amber-800" : "bg-amber-100 text-amber-700 border border-amber-200"}`}
          >
            <Clock className="w-4 h-4" /> Pending
          </span>
        );
    }
  };

  // ================= UI =================
  return (
    <div
      className={`flex-1 p-3 md:p-3 ${darkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="max-w-5xl mx-auto">
        {/* <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Book Request Management</h1>
          <p className={`${darkMode ? "text-slate-400" : "text-gray-600"}`}>
            Review and manage book requests submitted by students.
          </p>
        </div> */}

        {/* LOADING STATE */}
        {loading && (
          <div className="flex justify-center items-center p-12">
            <Loader className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div
            className={`p-6 rounded-xl text-center ${darkMode ? "bg-slate-800" : "bg-white"} shadow-md`}
          >
            <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
            <p className="text-lg font-medium mb-2">
              Oops! Something went wrong.
            </p>
            <p className={darkMode ? "text-slate-400" : "text-gray-600"}>
              {error}
            </p>
            <button
              onClick={fetchRequests}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* REQUESTS TABLE */}
        {!loading && !error && (
          <div
            className={`rounded-xl shadow-md overflow-hidden ${darkMode ? "bg-slate-800" : "bg-white"}`}
          >
            {requests.length === 0 ? (
              <div className="text-center p-12">
                <BookOpen
                  className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-slate-600" : "text-gray-300"}`}
                />
                <h3 className="text-lg font-medium mb-2">
                  No Book Requests Found
                </h3>
                <p className={darkMode ? "text-slate-400" : "text-gray-600"}>
                  There are no new book requests to review at the moment.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead
                    className={`${darkMode ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B]" : "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B]"} border-b ${darkMode ? "border-slate-600" : "border-gray-200"}`}
                  >
                    <tr className="text-white">
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                        Book Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                        Requested By
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={`${darkMode ? "divide-slate-700" : "divide-gray-200"} divide-y`}
                  >
                    {requests.map((req) => (
                      <tr
                        key={req._id}
                        className={`transition-colors border border-gray-400 ${darkMode ? "hover:bg-slate-700/50" : "hover:bg-gray-50"}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="font-medium">{req.bookTitle}</p>
                            <p
                              className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}
                            >
                              by {req.author}
                            </p>
                            {req.isbn && (
                              <p
                                className={`text-xs ${darkMode ? "text-slate-500" : "text-gray-400"}`}
                              >
                                ISBN: {req.isbn}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`p-2 rounded-full ${darkMode ? "bg-slate-600" : "bg-gray-200"} mr-3`}
                            >
                              <User className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {req.firstName} {req.lastName}
                              </p>
                              <p
                                className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}
                              >
                                {req.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm">
                            <Calendar
                              className={`w-4 h-4 mr-2 ${darkMode ? "text-slate-500" : "text-gray-400"}`}
                            />
                            {new Date(req.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(req.status)}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openUpdateModal(req)}
                            className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 mr-3"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteRequest(req._id)}
                            className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================= UPDATE MODAL ================= */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Background overlay */}
            // Agar bilkul black overlay nahi chahiye
            <div
              className="fixed inset-0 backdrop-blur-sm transition-opacity"
              onClick={closeUpdateModal}
            ></div>
            {/* Modal content */}
            <div className="flex items-center justify-center min-h-screen p-4">
              <div
                className={`relative w-full max-w-lg p-6 rounded-xl shadow-xl transform transition-all ${
                  darkMode ? "bg-slate-800" : "bg-white"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-medium leading-6">
                    Update Request Status
                  </h3>
                  <button
                    onClick={closeUpdateModal}
                    className={`p-1 rounded-md ${darkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"}`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-2">
                  <p
                    className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}
                  >
                    Update the status for "
                    <span className="font-semibold">
                      {selectedRequest?.bookTitle}
                    </span>
                    "
                  </p>

                  <div className="mt-4">
                    <label
                      className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}
                    >
                      Status
                    </label>
                    <select
                      value={updateForm.status}
                      onChange={(e) =>
                        setUpdateForm({ ...updateForm, status: e.target.value })
                      }
                      className={`w-full p-3 rounded-lg border ${
                        darkMode
                          ? "bg-slate-700 border-slate-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <label
                      className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}
                    >
                      Admin Note
                    </label>
                    <textarea
                      rows="3"
                      value={updateForm.adminNote}
                      onChange={(e) =>
                        setUpdateForm({
                          ...updateForm,
                          adminNote: e.target.value,
                        })
                      }
                      placeholder="Add a note for the student..."
                      className={`w-full p-3 rounded-lg border ${
                        darkMode
                          ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    ></textarea>
                  </div>
                </div>

                <div
                  className={`mt-6 flex justify-end space-x-3 ${darkMode ? "bg-slate-800" : "bg-white"}`}
                >
                  <button
                    type="button"
                    onClick={closeUpdateModal}
                    className={`px-4 py-2 rounded-md border ${
                      darkMode
                        ? "bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdateRequest}
                    disabled={updateLoading}
                    className={`px-4 py-2 rounded-md border border-transparent shadow-sm ${
                      updateLoading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center`}
                  >
                    {updateLoading ? (
                      <Loader className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <Save className="w-5 h-5 mr-2" />
                    )}
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewBookRequest;
