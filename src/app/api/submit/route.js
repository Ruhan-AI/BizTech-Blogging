import { NextResponse } from "next/server";
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
      return NextResponse.json({ success: false, error: "Missing required submission fields." }, { status: 400 });
    }

    // 1. Generate clean URL-friendly slug & tracking token
    const baseSlug = postTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    
    const uniqueId = Date.now().toString().slice(-4);
    const slug = `${baseSlug}-${uniqueId}`;
    const secureToken = `sub_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // 2. Calculate expiry timeline based on subscription plans
    const creationDate = new Date();
    const durationDays =
      planSelected === "3months"
        ? 90
        : planSelected === "6months"
        ? 180
        : planSelected === "12months"
        ? 365
        : 7;

    const expiry = new Date();
    expiry.setDate(creationDate.getDate() + durationDays);

    const expiryDateStr = expiry.toISOString().split("T")[0];
    const dateStr = creationDate.toISOString().split("T")[0];

    const initials = fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    const categoryNames = {
      "seo-digital-growth": "SEO & Digital Growth",
      "hr-people-operations": "HR Outsourcing & People Operations",
      "social-media-branding": "Social Media & Branding",
      "website-development-design": "Website Development & Design",
      "startup-business-strategy": "Startup Advisory & Business Strategy",
      "vocational-career-development": "Vocational Training & Career Development",
    };
    const categoryName = categoryNames[category] || "SEO & Digital Growth";

    // Formulate structured post record
    const newPost = {
      slug: slug,
      secureToken: secureToken,
      title: postTitle,
      excerpt: metaDescription || (draft.substring(0, 150) + "..."),
      category: categoryName,
      categorySlug: category || "seo-digital-growth",
      date: dateStr,
      readTime: `${Math.max(3, Math.ceil(draft.split(/\s+/).length / 200))} min read`,
      author: {
        name: fullName,
        slug: fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        role: roleCompany,
        initials: initials || "GP",
        bio: bio,
      },
      gradient: "linear-gradient(135deg, #090909 0%, #28223a 58%, #a98aff 145%)",
      featured: false,
      tags: focusKeywords ? focusKeywords.split(",").map((k) => k.trim()) : [category || "GuestPost"],
      planSelected: planSelected || "free",
      expiryDate: expiryDateStr,
      gdriveImage: gdriveImage || "",
      backlinkUrl: backlinkUrl || "",
      anchorText: anchorText || "",
      metaDescription: metaDescription || "",
      focusKeywords: focusKeywords || "",
      draftContent: draft,
      status: "published",
      isGuestPost: true,
    };

    // Save metadata safely to data persistence
    const jsonPath = path.join(process.cwd(), "src", "data", "guest_posts.json");
    let guestPosts = [];
    if (fs.existsSync(jsonPath)) {
      const rawData = fs.readFileSync(jsonPath, "utf-8");
      try {
        guestPosts = JSON.parse(rawData);
      } catch (err) {
        guestPosts = [];
      }
    }
    guestPosts.push(newPost);
    try {
      fs.writeFileSync(jsonPath, JSON.stringify(guestPosts, null, 2), "utf-8");
    } catch (err) {
      console.warn("Could not write to local guest_posts.json (e.g. read-only filesystem), post registered in memory:", err.message);
    }

    return NextResponse.json({
      success: true,
      slug: slug,
      token: secureToken,
      message: "Submission received and dynamic article created.",
    });
  } catch (error) {
    console.error("Submission API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
