/**
 * HTTP Methods supported by the fetch builder
 */
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS";

/**
 * Response format options
 */
export type ResponseFormat =
  | "json"
  | "text"
  | "blob"
  | "arrayBuffer"
  | "formData";

/**
 * Request configuration interface
 */
export interface RequestConfig {
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

/**
 * Error response interface
 */
export interface FetchError extends Error {
  status?: number;
  statusText?: string;
  response?: Response;
  data?: unknown;
}

/**
 * Request interceptor function type
 */
export type RequestInterceptor = (
  config: RequestInit
) => RequestInit | Promise<RequestInit>;

/**
 * Response interceptor function type
 */
export type ResponseInterceptor = (
  response: Response
) => Response | Promise<Response>;

/**
 * FetchBuilder class provides a fluent API for making HTTP requests
 */
export class FetchBuilder {
  private config: RequestConfig = {};
  private requestConfig: RequestInit = {};
  private requestUrl: string = "";
  private queryParams: Record<string, string> = {};
  private pathParams: Record<string, string> = {};
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  constructor(config: RequestConfig = {}) {
    this.config = {
      timeout: 10000,
      retries: 0,
      retryDelay: 1000,
      credentials: "same-origin",
      cache: "default",
      ...config,
    };
  }

  /**
   * Set the base URL for requests
   */
  baseUrl(url: string): FetchBuilder {
    this.config.baseUrl = url;
    return this;
  }

  /**
   * Set the request URL
   */
  url(url: string): FetchBuilder {
    this.requestUrl = url;
    return this;
  }

  /**
   * Set HTTP method
   */
  method(method: HttpMethod): FetchBuilder {
    this.requestConfig.method = method;
    return this;
  }

  /**
   * Convenience method for GET requests
   */
  get(url?: string): FetchBuilder {
    if (url) this.requestUrl = url;
    return this.method("GET");
  }

  /**
   * Convenience method for POST requests
   */
  post(url?: string): FetchBuilder {
    if (url) this.requestUrl = url;
    return this.method("POST");
  }

  /**
   * Convenience method for PUT requests
   */
  put(url?: string): FetchBuilder {
    if (url) this.requestUrl = url;
    return this.method("PUT");
  }

  /**
   * Convenience method for DELETE requests
   */
  delete(url?: string): FetchBuilder {
    if (url) this.requestUrl = url;
    return this.method("DELETE");
  }

  /**
   * Convenience method for PATCH requests
   */
  patch(url?: string): FetchBuilder {
    if (url) this.requestUrl = url;
    return this.method("PATCH");
  }

  /**
   * Set request headers
   */
  headers(headers: Record<string, string>): FetchBuilder {
    this.requestConfig.headers = {
      ...this.requestConfig.headers,
      ...headers,
    };
    return this;
  }

  /**
   * Set a single header
   */
  header(key: string, value: string): FetchBuilder {
    return this.headers({ [key]: value });
  }

  /**
   * Set Authorization header
   */
  auth(token: string, type: "Bearer" | "Basic" = "Bearer"): FetchBuilder {
    return this.header("Authorization", `${type} ${token}`);
  }

  /**
   * Set Content-Type header
   */
  contentType(type: string): FetchBuilder {
    return this.header("Content-Type", type);
  }

  /**
   * Set Accept header
   */
  accept(type: string): FetchBuilder {
    return this.header("Accept", type);
  }

  /**
   * Set request body as JSON
   */
  jsonBody(data: Record<string, unknown>): FetchBuilder {
    this.requestConfig.body = JSON.stringify(data);
    return this.contentType("application/json");
  }

  /**
   * Set request body as form data
   */
  form(
    data: FormData | Record<string, string | number | boolean>
  ): FetchBuilder {
    if (data instanceof FormData) {
      this.requestConfig.body = data;
    } else {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      this.requestConfig.body = formData;
    }
    return this;
  }

  /**
   * Set request body as URL encoded form
   */
  urlEncoded(data: Record<string, string | number | boolean>): FetchBuilder {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    this.requestConfig.body = params.toString();
    return this.contentType("application/x-www-form-urlencoded");
  }

  /**
   * Set raw request body
   */
  body(body: BodyInit): FetchBuilder {
    this.requestConfig.body = body;
    return this;
  }

  /**
   * Set query parameters
   */
  query(
    params: Record<string, string | number | boolean | undefined | null>
  ): FetchBuilder {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        this.queryParams[key] = String(value);
      }
    });
    return this;
  }

  /**
   * Set path parameters (for URL templating)
   */
  params(params: Record<string, string>): FetchBuilder {
    this.pathParams = { ...this.pathParams, ...params };
    return this;
  }

  /**
   * Set timeout for the request
   */
  timeout(ms: number): FetchBuilder {
    this.config.timeout = ms;
    return this;
  }

  /**
   * Set retry configuration
   */
  retry(retries: number, delay: number = 1000): FetchBuilder {
    this.config.retries = retries;
    this.config.retryDelay = delay;
    return this;
  }

  /**
   * Set cache policy
   */
  cache(cache: RequestCache): FetchBuilder {
    this.config.cache = cache;
    return this;
  }

  /**
   * Set Next.js specific fetch options
   */
  next(options: NextFetchRequestConfig): FetchBuilder {
    this.config.next = options;
    return this;
  }

  /**
   * Set credentials policy
   */
  credentials(credentials: RequestCredentials): FetchBuilder {
    this.config.credentials = credentials;
    return this;
  }

  /**
   * Add request interceptor
   */
  interceptRequest(interceptor: RequestInterceptor): FetchBuilder {
    this.requestInterceptors.push(interceptor);
    return this;
  }

  /**
   * Add response interceptor
   */
  interceptResponse(interceptor: ResponseInterceptor): FetchBuilder {
    this.responseInterceptors.push(interceptor);
    return this;
  }

  /**
   * Build the final URL with base URL, path params, and query params
   */
  private buildUrl(): string {
    let finalUrl = this.requestUrl;

    // Add base URL if provided
    if (this.config.baseUrl) {
      finalUrl = `${this.config.baseUrl.replace(/\/$/, "")}/${finalUrl.replace(
        /^\//,
        ""
      )}`;
    }

    // Replace path parameters
    Object.entries(this.pathParams).forEach(([key, value]) => {
      finalUrl = finalUrl.replace(`:${key}`, value);
    });

    // Add query parameters
    if (Object.keys(this.queryParams).length > 0) {
      const searchParams = new URLSearchParams(this.queryParams);
      finalUrl += `?${searchParams.toString()}`;
    }

    return finalUrl;
  }

  /**
   * Build the final request configuration
   */
  private async buildRequestConfig(): Promise<RequestInit> {
    let config: RequestInit = {
      ...this.requestConfig,
      headers: {
        ...this.config.headers,
        ...this.requestConfig.headers,
      },
      credentials: this.config.credentials,
      cache: this.config.cache,
    };

    // Add Next.js specific options
    if (this.config.next) {
      (config as RequestInit & { next?: NextFetchRequestConfig }).next =
        this.config.next;
    }

    // Apply request interceptors
    for (const interceptor of this.requestInterceptors) {
      config = await interceptor(config);
    }

    return config;
  }

  /**
   * Create a custom fetch error
   */
  private createFetchError(message: string, response?: Response): FetchError {
    const error = new Error(message) as FetchError;
    error.name = "FetchError";

    if (response) {
      error.status = response.status;
      error.statusText = response.statusText;
      error.response = response;
    }

    return error;
  }

  /**
   * Execute the request with retry logic
   */
  private async executeWithRetry(
    url: string,
    config: RequestInit
  ): Promise<Response> {
    let lastError: Error;
    const maxRetries = this.config.retries || 0;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          this.config.timeout
        );

        const response = await fetch(url, {
          ...config,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Apply response interceptors
        let finalResponse = response;
        for (const interceptor of this.responseInterceptors) {
          finalResponse = await interceptor(finalResponse);
        }

        return finalResponse;
      } catch (error) {
        lastError = error as Error;

        if (attempt < maxRetries) {
          await new Promise((resolve) =>
            setTimeout(resolve, this.config.retryDelay)
          );
        }
      }
    }

    throw lastError!;
  }

  /**
   * Execute the request and return the response
   */
  async send(): Promise<Response> {
    const url = this.buildUrl();
    const config = await this.buildRequestConfig();

    try {
      const response = await this.executeWithRetry(url, config);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.clone().json();
        } catch {
          errorData = await response.clone().text();
        }

        const error = this.createFetchError(
          `Request failed with status ${response.status}`,
          response
        );
        error.data = errorData;
        throw error;
      }

      return response;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw this.createFetchError("Request timed out");
      }
      throw error;
    }
  }

  /**
   * Execute the request and return parsed JSON
   */
  async json<T = unknown>(): Promise<T> {
    const response = await this.send();
    return response.json();
  }

  /**
   * Execute the request and return text
   */
  async text(): Promise<string> {
    const response = await this.send();
    return response.text();
  }

  /**
   * Execute the request and return blob
   */
  async blob(): Promise<Blob> {
    const response = await this.send();
    return response.blob();
  }

  /**
   * Execute the request and return array buffer
   */
  async arrayBuffer(): Promise<ArrayBuffer> {
    const response = await this.send();
    return response.arrayBuffer();
  }

  /**
   * Execute the request and return form data
   */
  async formData(): Promise<FormData> {
    const response = await this.send();
    return response.formData();
  }

  /**
   * Clone the builder for reuse
   */
  clone(): FetchBuilder {
    const cloned = new FetchBuilder(this.config);
    cloned.requestConfig = { ...this.requestConfig, body: null };
    cloned.requestUrl = this.requestUrl;
    cloned.queryParams = { ...this.queryParams };
    cloned.pathParams = { ...this.pathParams };
    cloned.requestInterceptors = [...this.requestInterceptors];
    cloned.responseInterceptors = [...this.responseInterceptors];
    return cloned;
  }
}

/**
 * Create a new FetchBuilder instance
 */
export function createFetchBuilder(config?: RequestConfig): FetchBuilder {
  return new FetchBuilder(config);
}

/**
 * Default fetch builder instance
 */
export const fetchBuilder = createFetchBuilder();

/**
 * Convenience functions for common HTTP methods
 */
export const api = {
  get: (url: string) => fetchBuilder.clone().get(url),
  post: (url: string) => fetchBuilder.clone().post(url),
  put: (url: string) => fetchBuilder.clone().put(url),
  delete: (url: string) => fetchBuilder.clone().delete(url),
  patch: (url: string) => fetchBuilder.clone().patch(url),
};
