const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export const getDoctors = async () => {
  const response = await fetch(`${BASE_URL}/doctor`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch doctors: ${response.status}`);
  }

  const data = await response.json();
  return data?.data || [];
};
