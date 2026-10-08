

import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "../../../libs/mongodb";
import Order from "../../../models/Order";

// Admin check
async function checkAdmin() {
  const { userId } = await auth();

  if (!userId) {
    return {
      allowed: false,
      response: NextResponse.json(
        {
          success: false,
          message: "You must be logged in.",
        },
        { status: 401 }
      ),
    };
  }

  const user = await currentUser();

  const email = user?.emailAddresses?.[0]?.emailAddress;

  if (email !== process.env.ADMIN_EMAIL) {
    return {
      allowed: false,
      response: NextResponse.json(
        {
          success: false,
          message: "You are not authorized to perform this action.",
        },
        { status: 403 }
      ),
    };
  }

  return {
    allowed: true,
  };
}


export async function GET() {
  try {
    const adminCheck = await checkAdmin();

    if (!adminCheck.allowed) {
      return adminCheck.response;
    }

    await connectDB();

    const orders = await Order.find({}).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        orders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch orders.",
      },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { customer, items, total } = body;

    if (
      !customer ||
      !items ||
      items.length === 0 ||
      total === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Required order information is missing.",
        },
        { status: 400 }
      );
    }

    if (
      !customer.name ||
      !customer.phone ||
      !customer.city ||
      !customer.address
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Complete customer information is required.",
        },
        { status: 400 }
      );
    }

    const order = await Order.create({
      customer,
      items,
      total,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully.",
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ORDER API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order.",
      },
      { status: 500 }
    );
  }
}

