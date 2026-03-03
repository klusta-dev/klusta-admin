import { NextRequest, NextResponse } from "next/server";

function getTargetBaseUrl(): string {
  const fromServer = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";
  return fromServer.replace(/\/$/, "");
}

async function proxy(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const baseUrl = getTargetBaseUrl();
  if (!baseUrl || !/^https?:\/\//i.test(baseUrl)) {
    return NextResponse.json(
      { message: "API base URL is not configured. Set API_BASE_URL or NEXT_PUBLIC_API_BASE_URL." },
      { status: 500 }
    );
  }

  const { path } = await context.params;
  const query = req.nextUrl.search || "";
  const targetUrl = `${baseUrl}/${path.join("/")}${query}`;

  const headers = new Headers();
  const contentType = req.headers.get("content-type");
  const authorization = req.headers.get("authorization");
  const apiAccessKey =
    req.headers.get("api-access-key") ||
    process.env.API_ACCESS_KEY ||
    process.env.NEXT_PUBLIC_API_ACCESS_KEY;

  if (contentType) headers.set("content-type", contentType);
  if (authorization) headers.set("authorization", authorization);
  if (apiAccessKey) headers.set("api-access-key", apiAccessKey);

  const init: RequestInit = {
    method: req.method,
    headers,
    cache: "no-store",
  };

  if (!["GET", "HEAD"].includes(req.method.toUpperCase())) {
    init.body = await req.text();
  }

  const upstream = await fetch(targetUrl, init);
  const responseText = await upstream.text();

  return new NextResponse(responseText, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") || "application/json",
    },
  });
}

export async function GET(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(req, context);
}

export async function POST(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(req, context);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(req, context);
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(req, context);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(req, context);
}

export async function OPTIONS(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(req, context);
}
