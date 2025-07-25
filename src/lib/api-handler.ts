// lib/withErrorHandler.ts
import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

type RouteHandler = (req: Request) => Promise<Response>;

export function withErrorHandler(handler: RouteHandler, routeName: string): RouteHandler {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (error) {
      // --- Log error to Sentry ---
      Sentry.withScope((scope) => {
        scope.setTag("api_route", routeName);
        scope.setExtra("request_url", req.url);
        Sentry.captureException(error);
      });

      return NextResponse.json(
        { success: false, error: (error as Error).message },
        { status: 500 }
      );
    }
  };
}
