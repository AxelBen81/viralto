import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}`;
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ count: 0 });

  const month = getCurrentMonth();

  const { count } = await supabase
    .from("generations")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("month", month);

  return NextResponse.json({ count: count ?? 0 });
}

export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  const month = getCurrentMonth();

  const { error } = await supabase
    .from("generations")
    .insert({ user_id: userId, month });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
