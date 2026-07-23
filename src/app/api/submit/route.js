import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      fullName,
      email,
      roleCompany,
      website,
      postTitle,
      category,
      metaDescription,
      focusKeywords,
      backlinkUrl,
      anchorText,
      gdriveImage,
      planSelected,
      draft,
      bio,
    } = data;

    if (!fullName || !email || !postTitle || !draft) {
      return NextResponse.json(
        { success: false, error: "Missing required submission fields." },
        { status: 400 }
      );
    }

    // Generate URL slug & secure token
    const baseSlug = postTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const uniqueId = Date.now().toString().slice(-4);
    const slug = `${baseSlug}-${uniqueId}`;
    const secureToken = `sub_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const categoryNames = {
      "seo-digital-growth": "SEO & Digital Growth",
      "hr-people-operations": "HR & People Operations",
      "social-media-branding": "Branding & Social Systems",
      "website-development-design": "Web Development & Design",
      "startup-business-strategy": "Startup & Business Strategy",
      "vocational-career-development": "Career & Vocational Growth",
    };
    const categoryName = categoryNames[category] || "SEO & Digital Growth";

    // Attempt Prisma DB storage first if DATABASE_URL is set
    let persistedToDb = false;
    if (process.env.DATABASE_URL) {
      try {
        await prisma.submission.create({
          data: {
            secureToken,
            fullName,
            email,
            roleCompany: roleCompany || "",
            website: website || "",
            postTitle,
            category: categoryName,
            metaDescription: metaDescription || "",
            focusKeywords: focusKeywords || "",
            backlinkUrl: backlinkUrl || null,
            anchorText: anchorText || null,
            gdriveImage: gdriveImage || null,
            draft,
            bio: bio || "",
            status: "SUBMITTED",
          },
        });
        persistedToDb = true;
      } catch (dbErr) {
        console.warn("Prisma DB save skipped (falling back to JSON store):", dbErr.message);
      }
    }

    // Save to local JSON storage for dev fallback
    const jsonPath = path.join(process.cwd(), "src", "data", "guest_posts.json");
    let guestPosts = [];
    if (fs.existsSync(jsonPath)) {
      try {
        guestPosts = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
      } catch {
        guestPosts = [];
      }
    }

    const initials = fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    const newPostRecord = {
      slug,
      secureToken,
      title: postTitle,
      excerpt: metaDescription || draft.substring(0, 150) + "...",
      category: categoryName,
      categorySlug: category || "seo-digital-growth",
      date: new Date().toISOString().split("T")[0],
      readTime: `${Math.max(3, Math.ceil(draft.split(/\s+/).length / 200))} min read`,
      author: {
        name: fullName,
        slug: fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        role: roleCompany || "Guest Contributor",
        initials: initials || "GP",
        bio: bio || "Verified guest contributor.",
      },
      gradient: "linear-gradient(135deg, #090909 0%, #28223a 58%, #a98aff 145%)",
      featured: false,
      tags: focusKeywords ? focusKeywords.split(",").map((k) => k.trim()) : [category || "GuestPost"],
      isGuestPost: true,
      status: "SUBMITTED",
    };

    guestPosts.push(newPostRecord);

    try {
      fs.writeFileSync(jsonPath, JSON.stringify(guestPosts, null, 2), "utf-8");
    } catch (fsErr) {
      console.warn("Filesystem JSON write bypassed (read-only runtime):", fsErr.message);
    }

    return NextResponse.json({
      success: true,
      slug,
      token: secureToken,
      persistedToDb,
      message: "Submission received and queued for editorial review.",
    });
  } catch (error) {
    console.error("Submission API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
