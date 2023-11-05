"use server";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

import {redirect} from "next/navigation";

const supabase = createServerComponentClient({cookies});

export async function updatePhaseToResponding(formData) {
    let gameId = formData.get('gameId');

    // console.log(gameId)
    // console.log(formData.get('userResponse'))

    let updated = await supabase
        .from('Game')
        .update({
            phase: "responding"
        })
        .eq('id', gameId)
}
