"use server";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

import {redirect} from "next/navigation";

const supabase = createServerComponentClient({cookies});

export async function savePlayerResponse(formData) {
    let userId = cookies().get('userId').value;

    console.log(userId)
    console.log(formData.get('userResponse'))

    let updated = await supabase
        .from('GamePrompt')
        .update({
            response: formData.get('userResponse')
        })
        .eq('responderId', userId)

    console.log(updated)
}
