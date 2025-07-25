import * as Sentry from "@sentry/nextjs";

interface ApiOptions extends RequestInit {
  spanName?: string;
  context?: Record<string, unknown>;
}

/**
 * Unified API fetch client with Sentry span + error capture
 */
export async function apiCall<T>(url: string, options: ApiOptions = {}): Promise<T> {
  const { spanName = `API Call: ${url}`, context, ...fetchOptions } = options;

  return Sentry.startSpan(
    {
      name: spanName,
      op: "http.client",
      attributes: safeSpanAttributes({ url, ...(context ?? {}) }),
    },
    async () => {
      try {
        const res = await fetch(url, fetchOptions);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }
        return (await res.json()) as T;
      } catch (error) {
        captureWithContext(error, { url, ...context });
        throw error;
      }
    }
  );
}

/**
 * Generic runner for arbitrary actions (Supabase, redirects, etc.)
 */
export async function runWithSpan<T>(
  name: string,
  fn: () => Promise<T>,
  context?: Record<string, unknown>
): Promise<T> {
  return Sentry.startSpan(
    {
      name,
      op: "function",
      attributes: safeSpanAttributes(context ?? {}),
    },
    async () => {
      try {
        return await fn();
      } catch (error) {
        captureWithContext(error, context);
        throw error;
      }
    }
  );
}

/**
 * Internal utility to attach context and capture error
 */
function captureWithContext(error: unknown, context?: Record<string, unknown>) {
  Sentry.withScope((scope) => {
    if (context) {
      for (const [key, value] of Object.entries(context)) {
        scope.setExtra(key, value);
      }
    }
    const activeSpan = Sentry.getActiveSpan?.();
    if (activeSpan) {
      scope.setContext("trace", {
        trace_id: activeSpan.spanContext().traceId,
        span_id: activeSpan.spanContext().spanId,
      });
    }
    Sentry.captureException(error);
  });
}

/**
 * Converts arbitrary context to safe span attributes
 * Ensures only supported types (string | number | boolean | null | undefined)
 */
function safeSpanAttributes(
  context: Record<string, unknown>
): Record<string, string | number | boolean> {
  const attributes: Record<string, string | number | boolean> = {}

  for (const [key, value] of Object.entries(context)) {
    if (value === null || value === undefined) continue

    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      attributes[key] = value
    } else {
      // Convert arrays and objects to JSON strings
      attributes[key] = JSON.stringify(value)
    }
  }

  return attributes
}

