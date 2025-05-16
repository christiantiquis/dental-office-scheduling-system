import type { IUser } from "@/interfaces/user.interface";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/user`;

export const getUserData = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch doctors: ${response.status}`);
  }

  const data = await response.json();
  return data?.data || [];
};

export const userSignup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<{ user: Partial<IUser>; token: string; message: string }> => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch doctors: ${response.status}`);
  }

  const data = await response.json();
  return { user: data?.data || {}, token: data.token, message: data.message };
};
