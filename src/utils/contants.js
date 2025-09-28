const BASE_URL = import.meta.env.DEV
  ? "http://localhost:8800"
  : "https://task-manager-api-wura.onrender.com";

const USERS_URL = `${BASE_URL}/api/user`;
const TASKS_URL = `${BASE_URL}/api/task`;
const ADMIN_URL = `${BASE_URL}/api/admin`;

export { USERS_URL, TASKS_URL, ADMIN_URL };