import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.DEV
  ? "http://localhost:8800/api"
  : import.meta.env.VITE_API_URL + "/api";

console.log("API_URL:", API_URL); // ✅ Add this for debugging

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include", // ✅ Required for cookie-based auth
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
