import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
    supabaseUrl && supabaseAnonKey
        ? createClient(
            supabaseUrl,
            supabaseAnonKey
        )
        : null;

const resend =
    process.env.RESEND_API_KEY
        ? new Resend(
            process.env.RESEND_API_KEY
        )
        : null;

export async function POST(request) {
    try {
        const { tools, result, summary, email, companyName, role } = await request.json();
        if (!supabase) {
            return Response.json(
                {
                    error: "Supabase not configured"
                },
                { status: 500 }
            );
        }
        // Save audit to Supabase
        const { data, error } = await supabase
            .from("audits")
            .insert({
                tools,
                result,
                summary,
                email: email || null,
                company_name: companyName || null,
                role: role || null,
            })
            .select("id")
            .single();

        if (error) {
            console.error("Supabase error:", error);
            return Response.json({ error: "Failed to save audit" }, { status: 500 });
        }

        const auditId = data.id;

        if (!resend) {
            return Response.json({
                error: "Email service unavailable"
            });
        }

        // Send email inline (no inter-route fetch — that pattern fails on Vercel)
        if (email && resend) {
            const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ai-spend-analyser.vercel.app";
            const auditLink = `${appUrl}/audit/${auditId}`;

            try {
                console.log("📨 Sending email to:", email);

                const emailResponse = await resend.emails.send({
                    from: "onboarding@resend.dev",
                    to: email,
                    subject: `Your AI Spend Audit: $${result.totalSavings}/mo in savings found`,
                    html: `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #10b981;">Your AI Spend Audit is Ready</h1>
    <p>Hi${companyName ? " " + companyName : ""},</p>
    <p>Your free AI spend audit has been completed.</p>
    <p><strong>Potential savings: $${result.totalSavings}/mo ($${result.annualSavings}/yr)</strong></p>
    <p>
        <a href="${auditLink}" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
            View Your Audit Report
        </a>
    </p>
    <p style="color: #666; font-size: 12px; margin-top: 30px;">
        Or copy this link: ${auditLink}
    </p>
</body>
</html>
                    `,
                });

                console.log("✅ Resend response:", JSON.stringify(emailResponse));

                if (emailResponse.error) {
                    console.error("❌ Resend rejected:", emailResponse.error);
                }
            } catch (emailError) {
                console.error("❌ Email send failed (non-blocking):", emailError);
            }
        } else if (email && !resend) {
            console.warn("⚠️  RESEND_API_KEY not set — email not sent");
        }

        return Response.json({ id: auditId });

    } catch (error) {
        console.error("Save audit error:", error);
        return Response.json({ error: "Failed to save audit" }, { status: 500 });
    }
}