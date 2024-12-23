import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { appointments, getAllAppointments } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency, cancelAppointment } =
    useContext(AppContext);

  useEffect(() => {
    getAllAppointments(); // Call the function directly without token dependency
  }, [getAllAppointments]);

  return (
    <div className="w-full max-w-6xl mx-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor Name</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointments List */}
        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            key={item._id || index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full"
                src={item.userData?.image || assets.default_user_image}
                alt="User"
              />
              <p>{item.userData?.name || "Unknown"}</p>
            </div>
            <p className="max-sm:hidden">{item.userData?.dob}</p>
            <p>
              {item.slotDate}, {item.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full bg-gray-200"
                src={item.docData?.image || assets.default_user_image}
                alt="Doctor"
              />
              <p>{item.docData?.name || "Unknown"}</p>
            </div>
            <p>
              {currency}
              {item.amount || "N/A"}
            </p>
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : (
              <p className="text-green-600 text-xs font-medium">Booked</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
