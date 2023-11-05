"use client"
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";

export default function GameStartListener({gameId}) {
    const supabase = createClientComponentClient();

    const router = useRouter()

    const PlayerGames = supabase.channel('custom-update-channel')
        .on(
            'postgres_changes',
            {event: 'UPDATE', schema: 'public', table: 'Game', filter: `id=eq.${gameId}`},
            (payload) => {
                if (payload.new.phase != 'not started') {
                    router.push('/host/respond')
                }
            }
        )
        .subscribe()
}