import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}`;
}

export async function GET(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Missing env vars", url: !!supabaseUrl, key: !!supabaseKey });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ count: 0 });

  const month = getCurrentMonth();
  const { count, error } = await supabase
    .from("generations")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("month", month);

  if (error) return NextResponse.json({ error: error.message });

  return NextResponse.json({ count: count ?? 0 });
}

export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Missing env vars" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { userId } = await req.json();
  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  const month = getCurrentMonth();
  const { error } = await supabase
    .from("generations")
    .insert({ user_id: userId, month });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
