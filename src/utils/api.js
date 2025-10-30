const isDev = import.meta.env.DEV;

const API_BASE_URL = isDev
   import.meta.env.VITE_API_URL;

// Example: Get all tasks
export const getTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: "GET",
    credentials: "include", // if using cookies/auth
  });
  return response.json();
};

// Example: Create a new task
export const createTask = async (taskData) => {
  const response = await fetch(`${API_BASE_URL}/api/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(taskData),
  });
  return response.json();
};

// Example: Delete or restore a task
export const deleteRestoreTask = async (taskId) => {
  const response = await fetch(`${API_BASE_URL}/api/delete-restore/${taskId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json();
};