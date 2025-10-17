import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    status: "ok", 
    message: "API funcionando corretamente",
    timestamp: new Date().toISOString()
  });
}
