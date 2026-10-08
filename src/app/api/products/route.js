
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "../../../libs/mongodb";
import Product from "../../../models/Product";


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
    await connectDB();

    const products = await Product.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const adminCheck = await checkAdmin();

    if (!adminCheck.allowed) {
      return adminCheck.response;
    }

    await connectDB();

    const body = await request.json();

    const {
      name,
      price,
      category,
      collection,
      kidsType,
      sizes,
      image,
      description,
    } = body;

    if (
      !name ||
      price === undefined ||
      !category ||
      !collection ||
      !sizes ||
      sizes.length === 0 ||
      !image
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Required product information is missing.",
        },
        { status: 400 }
      );
    }

    if (category === "Kids" && !kidsType) {
      return NextResponse.json(
        {
          success: false,
          message: "Kids Type is required for Kids products.",
        },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name,
      price,
      category,
      collection,
      kidsType:
        category === "Kids"
          ? kidsType
          : undefined,
      sizes,
      image,
      description,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully.",
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product.",
      },
      { status: 500 }
    );
  }
}

