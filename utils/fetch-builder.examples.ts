import { createFetchBuilder, api } from "./fetch-builder";

// Example usage of the FetchBuilder utility

// 1. Basic GET request
export async function getUsers() {
  try {
    const users = await api.get("/api/users").json();
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
}

// 2. POST request with JSON body
export async function createUser(userData: { name: string; email: string }) {
  try {
    const newUser = await api.post("/api/users").jsonBody(userData).json();
    return newUser;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  }
}

// 3. GET request with query parameters
export async function getUsersByRole(role: string, page: number = 1) {
  try {
    const users = await api
      .get("/api/users")
      .query({ role, page, limit: 10 })
      .json();
    return users;
  } catch (error) {
    console.error("Failed to fetch users by role:", error);
    throw error;
  }
}

// 4. Authenticated request
export async function getProfile(token: string) {
  try {
    const profile = await api.get("/api/profile").auth(token).json();
    return profile;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error;
  }
}

// 5. Request with custom headers
export async function uploadFile(file: File, token: string) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api
      .post("/api/upload")
      .auth(token)
      .form(formData)
      .json();
    return response;
  } catch (error) {
    console.error("Failed to upload file:", error);
    throw error;
  }
}

// 6. Request with path parameters
export async function getUserById(userId: string) {
  try {
    const user = await api.get("/api/users/:id").params({ id: userId }).json();
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
}

// 7. Request with timeout and retry
export async function getHealthCheck() {
  try {
    const health = await api
      .get("/api/health")
      .timeout(5000)
      .retry(3, 1000)
      .json();
    return health;
  } catch (error) {
    console.error("Health check failed:", error);
    throw error;
  }
}

// 8. Custom fetch builder instance with base configuration
export const apiClient = createFetchBuilder({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 9. Using the custom client
export async function getApiData() {
  try {
    const data = await apiClient
      .get("/api/data")
      .cache("force-cache")
      .next({ revalidate: 3600 }) // Next.js specific - revalidate every hour
      .json();
    return data;
  } catch (error) {
    console.error("Failed to fetch API data:", error);
    throw error;
  }
}

// 10. Request with interceptors
export function setupAuthInterceptor(token: string) {
  return createFetchBuilder()
    .interceptRequest((config) => {
      // Add authorization header to all requests
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
      return config;
    })
    .interceptResponse(async (response) => {
      // Log all responses
      console.log(`Response: ${response.status} ${response.url}`);

      // Handle 401 responses
      if (response.status === 401) {
        // Redirect to login or refresh token
        window.location.href = "/login";
      }

      return response;
    });
}

// 11. Using URL encoded form data
export async function loginUser(credentials: {
  email: string;
  password: string;
}) {
  try {
    const response = await api
      .post("/api/auth/login")
      .urlEncoded(credentials)
      .json();
    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

// 12. Handling different response types
export async function downloadFile(fileId: string, token: string) {
  try {
    const response = await api
      .get(`/api/files/${fileId}/download`)
      .auth(token)
      .send();

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "file.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error("Failed to download file:", error);
    throw error;
  }
}
