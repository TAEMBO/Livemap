import { redirect } from "@sveltejs/kit";

export async function GET() {
    throw redirect(303, process.env.OAUTH_URI);
}
