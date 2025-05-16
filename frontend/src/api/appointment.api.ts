import type { IAppointment } from "@/interfaces/appointment.interface";
import type { IDoctor } from "@/interfaces/doctor.interface";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/appointment`;

export const getAppointments = async (id: string) => {
  const response = await fetch(`${BASE_URL}/patient/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch appointment: ${response.status}`);
  }

  const data = await response.json();
  return data?.data || [];
};

export const cancelAppointment = async (id: string) => {
  const response = await fetch(`${BASE_URL}/cancel/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to cancel appointment: ${response.status}`);
  }

  const data = await response.json();
  return data?.data || [];
};

export const createAppointment = async (
  appointment: Partial<IAppointment>
): Promise<IDoctor[]> => {
  const modAppointmentBody = {
    ...appointment,
    date: appointment.date?.toISOString(),
  };
  const response = await fetch(`${BASE_URL}/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(modAppointmentBody),
  });

  if (!response.ok) {
    throw new Error(`Failed to create appointment: ${response.status}`);
  }

  const data = await response.json();
  return data?.data || [];
};

export const updateAppointment = async (
  appointment: Partial<IAppointment>,
  id: string
): Promise<IDoctor[]> => {
  const modAppointmentBody = {
    ...appointment,
    date: appointment.date?.toISOString(),
    id,
  };
  const response = await fetch(`${BASE_URL}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(modAppointmentBody),
  });

  if (!response.ok) {
    throw new Error(`Failed to create appointment: ${response.status}`);
  }

  const data = await response.json();
  return data?.data || [];
};

export const getAppointmentsByTime = async (
  time: string
): Promise<IAppointment[]> => {
  const response = await fetch(`${BASE_URL}/time/${time}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to create appointment: ${response.status}`);
  }

  const data = await response.json();
  return data?.data || [];
};
