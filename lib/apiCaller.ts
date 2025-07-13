import { createFetchBuilder } from "@/utils/fetch-builder";

export const apiCaller = createFetchBuilder({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
