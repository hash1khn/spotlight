import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDatabaseClient } from "@/lib/db";

// Authentication helper
async function checkAuth(): Promise<boolean> {
  try {
    const authCookie = (await cookies()).get("admin-auth");
    return authCookie?.value === "authenticated";
  } catch {
    return false;
  }
}

// GET - Read all shows
export async function GET() {
  try {
    const db = getDatabaseClient() as any;

    const { data, error } = await db
      .from("shows")
      .select("*")
      .order("date", { ascending: true })
      .order("time", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading shows:", error);
    return NextResponse.json({ error: "Failed to read shows" }, { status: 500 });
  }
}

// POST - Add new show
export async function POST(request: NextRequest) {
  try {
    // Auth check
    if (!(await checkAuth())) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { title, date, time, location, address, ticketlink } =
      await request.json();

    // Validation
    if (!title || !date || !time || !location || !address || !ticketlink) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    try {
      new URL(ticketlink);
    } catch {
      return NextResponse.json({ error: "Ticket link must be a valid URL" }, { status: 400 });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return NextResponse.json({ error: "Date must be YYYY-MM-DD" }, { status: 400 });
    }

    const db = getDatabaseClient() as any;

    const { data, error } = await db
      .from("shows")
      .insert({ title, date, time, location, address, ticketlink } as any)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error adding show:", error);
    return NextResponse.json({ error: "Failed to add show" }, { status: 500 });
  }
}

// PUT - Update show
export async function PUT(request: NextRequest) {
  try {
    // Auth check
    if (!(await checkAuth())) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id, title, date, time, location, address, ticketlink } =
      await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    if (!title || !date || !time || !location || !address || !ticketlink) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    try {
      new URL(ticketlink);
    } catch {
      return NextResponse.json({ error: "Ticket link must be valid" }, { status: 400 });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return NextResponse.json({ error: "Date must be YYYY-MM-DD" }, { status: 400 });
    }

    const db = getDatabaseClient() as any;

    const { data, error } = await db
      .from("shows")
      .update({ title, date, time, location, address, ticketlink } as any)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating show:", error);
    return NextResponse.json({ error: "Failed to update show" }, { status: 500 });
  }
}

// DELETE - Remove show
export async function DELETE(request: NextRequest) {
  try {
    // Auth check
    if (!(await checkAuth())) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const id = parseInt(new URL(request.url).searchParams.get("id") || "0");

    if (!id) {
      return NextResponse.json({ error: "Valid ID required" }, { status: 400 });
    }

    const db = getDatabaseClient() as any;

    const { error } = await db.from("shows").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting show:", error);
    return NextResponse.json({ error: "Failed to delete show" }, { status: 500 });
  }
}
