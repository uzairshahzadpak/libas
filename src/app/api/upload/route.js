




import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import cloudinary from "../../../libs/cloudinary";

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
          message: "You are not authorized to upload images.",
        },
        { status: 403 }
      ),
    };
  }

  return {
    allowed: true,
  };
}

export async function POST(request) {
  try {
    const adminCheck = await checkAdmin();

    if (!adminCheck.allowed) {
      return adminCheck.response;
    }

    const formData = await request.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "Image file is required.",
        },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          message: "Only image files are allowed.",
        },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: "Image size must be less than 5MB.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const base64 = buffer.toString("base64");

    const dataUri = `data:${file.type};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "libas-products",
      resource_type: "image",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully.",
        url: result.secure_url,
        publicId: result.public_id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("CLOUDINARY UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Image upload failed.",
      },
      { status: 500 }
    );
  }
}

