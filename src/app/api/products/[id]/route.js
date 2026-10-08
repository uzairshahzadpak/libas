
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "../../../../libs/mongodb";
import Product from "../../../../models/Product";


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

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET SINGLE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch product.",
      },
      { status: 500 }
    );
  }
}


export async function PUT(request, { params }) {
  try {
    // Admin check
    const adminCheck = await checkAdmin();

    if (!adminCheck.allowed) {
      return adminCheck.response;
    }

    await connectDB();

    const { id } = await params;

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

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
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
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully.",
        product: updatedProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update product.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    // Admin check
    const adminCheck = await checkAdmin();

    if (!adminCheck.allowed) {
      return adminCheck.response;
    }

    await connectDB();

    const { id } = await params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete product.",
      },
      { status: 500 }
    );
  }
}



