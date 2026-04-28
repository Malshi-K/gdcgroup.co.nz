import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const jobTitle = formData.get("jobTitle");
    const resume = formData.get("resume");

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !jobTitle || !resume) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save resume file to public/uploads directory
    const uploadsDir = path.join(process.cwd(), "public/uploads/resumes");
    
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (err) {
      console.log("Directory already exists or creation failed:", err);
    }

    const buffer = await resume.arrayBuffer();
    const filename = `${Date.now()}-${resume.name}`;
    const filepath = path.join(uploadsDir, filename);

    await writeFile(filepath, Buffer.from(buffer));

    // Prepare email content
    const applicationData = {
      firstName,
      lastName,
      email,
      phone,
      jobTitle,
      resumeFileName: filename,
      submittedAt: new Date().toISOString(),
    };

    // Send confirmation email to applicant
    try {
      await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`,
        },
        body: JSON.stringify({
          properties: {
            firstname: firstName,
            lastname: lastName,
            email: email,
            phone: phone,
            jobtitle: jobTitle,
          },
        }),
      }).catch((err) => console.log("HubSpot contact creation error:", err));
    } catch (err) {
      console.log("Error sending to HubSpot:", err);
    }

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        data: applicationData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing application:", error);
    return NextResponse.json(
      { error: "Failed to process application" },
      { status: 500 }
    );
  }
}
