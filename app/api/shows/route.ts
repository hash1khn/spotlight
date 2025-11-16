import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const showsFilePath = path.join(process.cwd(), "data", "shows.json");

interface Show {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  ticketLink: string;
}

// GET - Read all shows
export async function GET() {
  try {
    const fileContents = await fs.readFile(showsFilePath, "utf8");
    const shows = JSON.parse(fileContents);
    return NextResponse.json(shows);
  } catch (error) {
    console.error("Error reading shows:", error);
    return NextResponse.json({ error: "Failed to read shows" }, { status: 500 });
  }
}

// POST - Add a new show
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, date, time, location, address, ticketLink } = body;

    // Validate required fields
    if (!title || !date || !time || !location || !address || !ticketLink) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Read existing shows
    const fileContents = await fs.readFile(showsFilePath, "utf8");
    const shows: Show[] = JSON.parse(fileContents);

    // Generate new ID
    const newId = shows.length > 0 ? Math.max(...shows.map((s) => s.id)) + 1 : 1;

    // Add new show
    const newShow: Show = {
      id: newId,
      title,
      date,
      time,
      location,
      address,
      ticketLink,
    };

    shows.push(newShow);

    // Write back to file
    await fs.writeFile(showsFilePath, JSON.stringify(shows, null, 2), "utf8");

    return NextResponse.json(newShow, { status: 201 });
  } catch (error) {
    console.error("Error adding show:", error);
    return NextResponse.json({ error: "Failed to add show" }, { status: 500 });
  }
}

// PUT - Update an existing show
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, date, time, location, address, ticketLink } = body;

    if (!id) {
      return NextResponse.json({ error: "Show ID is required" }, { status: 400 });
    }

    // Validate required fields
    if (!title || !date || !time || !location || !address || !ticketLink) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Read existing shows
    const fileContents = await fs.readFile(showsFilePath, "utf8");
    const shows: Show[] = JSON.parse(fileContents);

    // Find and update show
    const showIndex = shows.findIndex((s) => s.id === id);
    if (showIndex === -1) {
      return NextResponse.json({ error: "Show not found" }, { status: 404 });
    }

    shows[showIndex] = {
      id,
      title,
      date,
      time,
      location,
      address,
      ticketLink,
    };

    // Write back to file
    await fs.writeFile(showsFilePath, JSON.stringify(shows, null, 2), "utf8");

    return NextResponse.json(shows[showIndex]);
  } catch (error) {
    console.error("Error updating show:", error);
    return NextResponse.json({ error: "Failed to update show" }, { status: 500 });
  }
}

// DELETE - Delete a show
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "");

    if (!id || isNaN(id)) {
      return NextResponse.json({ error: "Valid show ID is required" }, { status: 400 });
    }

    // Read existing shows
    const fileContents = await fs.readFile(showsFilePath, "utf8");
    const shows: Show[] = JSON.parse(fileContents);

    // Find and remove show
    const showIndex = shows.findIndex((s) => s.id === id);
    if (showIndex === -1) {
      return NextResponse.json({ error: "Show not found" }, { status: 404 });
    }

    shows.splice(showIndex, 1);

    // Write back to file
    await fs.writeFile(showsFilePath, JSON.stringify(shows, null, 2), "utf8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting show:", error);
    return NextResponse.json({ error: "Failed to delete show" }, { status: 500 });
  }
}

