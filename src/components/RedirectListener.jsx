"use client"
import {useEffect, useState} from "react";
import {useRouter, usePathname} from "next/navigation";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {setInterval, setTimeout} from "worker-timers";

export default function RedirectListener({gameId}) {
    const supabase = createClientComponentClient();
    let pathName = usePathname()

    const router = useRouter()

    useEffect(() => {
        if (pathName.includes('host')) return
        pathName = pathName.split("/game/")[1]

        function handleStatus(status) {
            if (status === pathName) return;
            switch (status) {
                case "vote":
                case "respond":
                    router.push('/game/' + status)
                    break;
                default:
                    router.push('/game/waiting');
            }
        }

        const test = supabase.channel('custom-update-channel')
            .on(
                'postgres_changes',
                {event: 'UPDATE', schema: 'public', table: 'Game', filter: `id=eq.${gameId}`},
                (payload) => {
                    let status = payload?.new?.phase;
                    handleStatus(status);
                }
            )
            .subscribe()

        async function periodicCheck() {
            let res = await supabase.from('Game').select('phase').eq('id', gameId).limit(1).single();
            console.log(res)
        }

        setInterval(async () => {
            periodicCheck()
        }, 1000)

        periodicCheck()
    })
}