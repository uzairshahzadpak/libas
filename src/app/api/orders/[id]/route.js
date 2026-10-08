

import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "../../../../libs/mongodb";
import Order from "../../../../models/Order";

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


export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET SINGLE ORDER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch order.",
      },
      { status: 500 }
    );
  }
}


export async function PATCH(request, { params }) {
  try {
    const adminCheck = await checkAdmin();

    if (!adminCheck.allowed) {
      return adminCheck.response;
    }

    await connectDB();

    const { id } = await params;

    const body = await request.json();

    const { status } = body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!status || !allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order status.",
        },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order status updated successfully.",
        order: updatedOrder,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("UPDATE ORDER STATUS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update order status.",
      },
      { status: 500 }
    );
  }
}


