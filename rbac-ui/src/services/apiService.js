const API_URL = "http://localhost:5000";

export const fetchRoles = async () => {
  const response = await fetch(`${API_URL}/api/roles`);
  if (!response.ok) {
    throw new Error("Failed to fetch roles");
  }
  return await response.json();
};

export const fetchPermissions = async () => {
  const response = await fetch(`${API_URL}/api/permissions`);
  if (!response.ok) {
    throw new Error("Failed to fetch permissions");
  }
  return await response.json();
};

// Corrected fetchUsers to use the root endpoint
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/`);  // Users endpoint is the root
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
