import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {

    try {

        const { email, companyName, auditId, totalSavings, annualSavings } = await request.json();

        console.log("📧 Email request received:", { email, companyName, auditId });
        console.log("🔑 Resend API Key exists:", !!process.env.RESEND_API_KEY);

        if (!email) {
            return Response.json(
                { error: "Email required" },
                { status: 400 }
            );
        }

        const auditLink = `${process.env.NEXT_PUBLIC_APP_URL || "https://ai-spend-analyser.vercel.app"}/audit/${auditId}`;

        const emailContent = `
<!DOCTYPE html>
<html>
<body>
    <h1>Your AI Spend Audit is Ready</h1>
    <p>Hi${companyName ? " " + companyName : ""},</p>
    <p>Your free AI spend audit has been completed. You saved $${totalSavings}/mo!</p>
    <p><a href="${auditLink}">View Your Audit Report</a></p>
</body>
</html>
        `;

        console.log("📨 Sending email to:", email);
        const response = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: `Your AI Spend Audit: $${totalSavings}/mo in savings found`,
            html: emailContent,
        });

        console.log("✅ Resend response:", response);

        if (response.error) {
            console.error("❌ Resend error:", response.error);
            return Response.json(
                { error: "Failed to send email", details: response.error },
                { status: 500 }
            );
        }

        return Response.json({ success: true, id: response.id });

    } catch (error) {

        console.error("❌ Email send error:", error);
        return Response.json(
            { error: "Failed to send email", details: error.message },
            { status: 500 }
        );

    }
}