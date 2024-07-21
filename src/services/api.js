let host;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  host = "http://localhost:5000";
} else {
  host = "https://task-manager-application-be.vercel.app";
}

// Authenticate
export const register_api = `${host}/api/auth/register`;
export const login_api = `${host}/api/auth/login`;
export const googleRegister_api = `${host}/api/auth/google/register`;
export const googleLogin_api = `${host}/api/auth/google/login`;

// tasks

export const viewTask_api = `${host}/api/tasks`;
export const createTask_api = `${host}/api/tasks/create`;
export const updateTask_api = `${host}/api/tasks/update`;
export const deleteTask_api = `${host}/api/tasks/delete`;
