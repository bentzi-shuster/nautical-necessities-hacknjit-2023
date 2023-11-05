"use client"
import {useEffect, useState} from "react";
import {useRouter, usePathname} from "next/navigation";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {setInterval} from "worker-timers";

export default function TimerComponent({timerLength, route, side, gameId = null}) {
    let [timerPercent, updateTimerPercent] = useState(0);
    let [alreadyRun, updateAlreadyRun] = useState(false);

    const supabase = createClientComponentClient();

    const router = useRouter();
    let pathName = usePathname()

    useEffect(() => {
        if (alreadyRun) return
        updateAlreadyRun(true)

        if (side != 'host') {
            let splitPathName = pathName.split('/host/')[1]
            console.log('testtestestestestes', gameId, splitPathName)
            let {
                test,
                error
            } = supabase.from('Game').update({phase: splitPathName}).eq('id', gameId).select().single().then((test, error) => {
                console.log('timer redirect to...', test)
                router.push(`/game/${test.data.phase}`)
            });

        }

        const timerInterval = setInterval(() => {
            updateTimerPercent(prev => (prev >= 100 ? (side === 'host' ? router.push(`/host/${route}`) : 100) : prev + 0.125));
        }, (timerLength * 1000) / 800);
    }, [])

    return (
        <>
            <div className="fixed bottom-0 w-full bg-blue-500">
                <div className={'bg-teal-500 p-2'} style={{width: `${timerPercent}%`}}>
                </div>
            </div>
        </>
    )
}