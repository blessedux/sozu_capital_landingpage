import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import type { NewWaitlistEntry } from "@/lib/supabase";
import { createClient } from "@/utils/supabase/server";

async function getSupabase() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function GET() {
  try {
    const supabase = await getSupabase();

    const { data, error, count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        {
          error: "Failed to fetch waitlist",
          waitlist: [],
          count: 0,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      waitlist: data || [],
      count: count || 0,
    });
  } catch (error) {
    console.error("Error fetching waitlist:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch waitlist",
        waitlist: [],
        count: 0,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    let body: { email?: string; source?: string; metadata?: Record<string, unknown> };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 });
    }

    const { email, source = "website", metadata = {} } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required and must be a string" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const supabase = await getSupabase();

    const newEntry: NewWaitlistEntry = {
      email: trimmedEmail,
      source,
      metadata: {
        ...metadata,
        userAgent: request.headers.get("user-agent"),
        ip:
          request.headers.get("x-forwarded-for") ||
          request.headers.get("x-real-ip"),
        timestamp: new Date().toISOString(),
      },
    };

    const { error } = await supabase.from("waitlist").insert([newEntry]);

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Email already exists in waitlist" },
          { status: 409 }
        );
      }

      console.error("Supabase insert error:", error);
      return NextResponse.json(
        {
          error: "Failed to add email to waitlist",
          details:
            process.env.NODE_ENV === "development" ? error.message : undefined,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Successfully added to waitlist",
      email: trimmedEmail,
    });
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : undefined,
      },
      { status: 500 }
    );
  }
}
