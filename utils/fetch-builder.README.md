# Fetch Builder Utility

A comprehensive, type-safe fetch builder utility for Next.js applications with a fluent API for making HTTP requests.

## Features

- 🔗 **Fluent API** - Chain methods for clean, readable code
- 🛡️ **Type Safety** - Full TypeScript support with proper typing
- 🚀 **Next.js Integration** - Built-in support for Next.js fetch features
- 🔄 **Retry Logic** - Automatic retry with configurable delay
- ⏱️ **Timeout Support** - Request timeout handling
- 🔐 **Authentication** - Easy token-based authentication
- 📊 **Multiple Body Types** - JSON, form data, URL encoded, and more
- 🔧 **Interceptors** - Request and response interceptors
- 📝 **Error Handling** - Detailed error information with status codes
- 🎯 **Path Parameters** - URL template parameter substitution
- 📋 **Query Parameters** - Easy query string building

## Installation

The fetch builder is already included in your utils directory. Simply import it:

```typescript
import { api, createFetchBuilder, FetchBuilder } from "./utils/fetch-builder";
```

## Basic Usage

### Simple GET Request

```typescript
import { api } from "./utils/fetch-builder";

const users = await api.get("/api/users").json();
```

### POST Request with JSON Body

```typescript
const newUser = await api
  .post("/api/users")
  .jsonBody({ name: "John Doe", email: "john@example.com" })
  .json();
```

### GET Request with Query Parameters

```typescript
const users = await api
  .get("/api/users")
  .query({ role: "admin", page: 1, limit: 10 })
  .json();
```

### Authenticated Request

```typescript
const profile = await api.get("/api/profile").auth("your-jwt-token").json();
```

## Advanced Usage

### Custom Fetch Builder Instance

```typescript
import { createFetchBuilder } from "./utils/fetch-builder";

const apiClient = createFetchBuilder({
  baseUrl: "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const data = await apiClient.get("/users").json();
```

### Request with Retry Logic

```typescript
const data = await api
  .get("/api/data")
  .timeout(5000)
  .retry(3, 1000) // 3 retries with 1 second delay
  .json();
```

### Path Parameters

```typescript
const user = await api.get("/api/users/:id").params({ id: "123" }).json();
```

### Form Data Upload

```typescript
const formData = new FormData();
formData.append("file", file);

const response = await api
  .post("/api/upload")
  .auth(token)
  .form(formData)
  .json();
```

### URL Encoded Form Data

```typescript
const response = await api
  .post("/api/login")
  .urlEncoded({ email: "user@example.com", password: "password" })
  .json();
```

### Next.js Specific Features

```typescript
const data = await api
  .get("/api/data")
  .cache("force-cache")
  .next({ revalidate: 3600 }) // Revalidate every hour
  .json();
```

### Request and Response Interceptors

```typescript
const client = createFetchBuilder()
  .interceptRequest((config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
    return config;
  })
  .interceptResponse(async (response) => {
    if (response.status === 401) {
      // Handle unauthorized
      window.location.href = "/login";
    }
    return response;
  });
```

### Error Handling

```typescript
try {
  const data = await api.get("/api/users").json();
} catch (error) {
  if (error.status === 404) {
    console.log("Users not found");
  } else if (error.status === 500) {
    console.log("Server error");
  }
  console.error("Request failed:", error.message);
}
```

### Different Response Types

```typescript
// JSON response
const jsonData = await api.get("/api/data").json();

// Text response
const textData = await api.get("/api/data").text();

// Blob response (for files)
const blobData = await api.get("/api/file").blob();

// Raw response (for custom handling)
const response = await api.get("/api/data").send();
```

## API Reference

### FetchBuilder Methods

#### URL and Method Configuration

- `url(url: string)` - Set the request URL
- `method(method: HttpMethod)` - Set the HTTP method
- `get(url?: string)` - Set GET method (optionally with URL)
- `post(url?: string)` - Set POST method (optionally with URL)
- `put(url?: string)` - Set PUT method (optionally with URL)
- `delete(url?: string)` - Set DELETE method (optionally with URL)
- `patch(url?: string)` - Set PATCH method (optionally with URL)

#### Headers

- `headers(headers: Record<string, string>)` - Set multiple headers
- `header(key: string, value: string)` - Set a single header
- `auth(token: string, type?: 'Bearer' | 'Basic')` - Set authorization header
- `contentType(type: string)` - Set Content-Type header
- `accept(type: string)` - Set Accept header

#### Request Body

- `jsonBody(data: Record<string, unknown>)` - Set JSON body
- `form(data: FormData | Record<string, string | number | boolean>)` - Set form data body
- `urlEncoded(data: Record<string, string | number | boolean>)` - Set URL encoded body
- `body(body: BodyInit)` - Set raw body

#### Parameters

- `query(params: Record<string, string | number | boolean | undefined | null>)` - Set query parameters
- `params(params: Record<string, string>)` - Set path parameters

#### Configuration

- `timeout(ms: number)` - Set request timeout
- `retry(retries: number, delay?: number)` - Set retry configuration
- `cache(cache: RequestCache)` - Set cache policy
- `next(options: NextFetchRequestConfig)` - Set Next.js specific options
- `credentials(credentials: RequestCredentials)` - Set credentials policy

#### Interceptors

- `interceptRequest(interceptor: RequestInterceptor)` - Add request interceptor
- `interceptResponse(interceptor: ResponseInterceptor)` - Add response interceptor

#### Execution

- `send()` - Execute request and return Response
- `json<T>()` - Execute request and return parsed JSON
- `text()` - Execute request and return text
- `blob()` - Execute request and return blob
- `arrayBuffer()` - Execute request and return array buffer
- `formData()` - Execute request and return form data

#### Utility

- `clone()` - Clone the builder for reuse

### Global Configuration

```typescript
import { createFetchBuilder } from "./utils/fetch-builder";

const client = createFetchBuilder({
  baseUrl: "https://api.example.com",
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  cache: "no-cache",
});
```

### Error Types

The fetch builder throws `FetchError` objects with the following properties:

- `message: string` - Error message
- `status?: number` - HTTP status code
- `statusText?: string` - HTTP status text
- `response?: Response` - Original response object
- `data?: unknown` - Response data (if available)

## Best Practices

1. **Use the convenience API** - Use `api.get()`, `api.post()`, etc. for simple requests
2. **Create configured instances** - Use `createFetchBuilder()` for applications with consistent base URLs and headers
3. **Handle errors appropriately** - Always wrap requests in try-catch blocks
4. **Use interceptors for common logic** - Add authentication, logging, or error handling globally
5. **Leverage Next.js features** - Use the `.next()` method for ISR and caching
6. **Type your responses** - Use generics with `.json<T>()` for better type safety

## Examples

Check out the `fetch-builder.examples.ts` file for more comprehensive usage examples.
