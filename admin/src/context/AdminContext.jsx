import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);

  // Fetch all doctors
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/admin/all-doctors"
      );
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Change doctor's availability
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/admin/change-availability",
        { docId }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Fetch all appointments
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/admin/appointments"
      );
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Cancel an appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/admin/cancel-appointment",
        { appointmentId }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Fetch dashboard data
  const getDashData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/admin/dashboard"
      );
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const value = {
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
