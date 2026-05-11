import { supabase } from "../../../lib/supabase";

export async function POST(request) {

    try {

        const { tools, result, summary, email, companyName, role } = await request.json();

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
            return Response.json(
                { error: "Failed to save audit" },
                { status: 500 }
            );
        }

        return Response.json({ id: data.id });

    } catch (error) {

        console.error("Save audit error:", error);
        return Response.json(
            { error: "Failed to save audit" },
            { status: 500 }
        );

    }
}