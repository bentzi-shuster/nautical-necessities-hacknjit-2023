"use client"
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {useEffect, useState} from "react";
import PlayerCard from "@/components/PlayerCard";
import MessageBubble from "@/components/MessageBubble";
import {useRouter} from "next/navigation";

export default function VoteComponent({gameId, allData}) {
    const voteTime = 6;

    const supabase = createClientComponentClient()
    const router = useRouter();

    let [gameCode, updateGameCode] = useState('~~~~~');
    let [timerPercent, updateTimerPercent] = useState(0);

    supabase.from('Game').select('game_code').eq('id', gameId).limit(1).single()
        .then((data) => updateGameCode(data.data.game_code))

    let alreadyRan = false;

    useEffect(() => {
        if (alreadyRan) return
        alreadyRan = true;

        let ydir = 1;
        let buffer = 100;
        let yHeight = -buffer;
        setInterval(() => {
            if (yHeight > window.outerHeight + buffer || yHeight < 0 - buffer) {
                ydir *= -1
            }
            yHeight += ydir
            window.scrollTo(0, yHeight)
        }, 25)

        const timerInterval = setInterval(() => {
            updateTimerPercent(prev => (prev >= 100 ? router.push('/host/respond') : prev + 0.125));
        }, (voteTime * 1000) / 800);
    }, [])


    return (
        <>
            <div className="stat">
                <div>
                    <div className="stat-desc text-3xl">Game Code</div>
                    <div className="stat-value">{gameCode}</div>
                    <div className="flex flex-row flex-wrap justify-center gap-4">
                        {
                            allData?.map((data, index) => {
                                return (
                                    <div key={index} className={'bg-white/75 rounded-lg'}>
                                        <MessageBubble user={data.name} message={'test'}></MessageBubble>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 w-full bg-blue-500">
                <div className={'bg-teal-500 p-2'} style={{width: `${timerPercent}%`}}>

                </div>
            </div>
        </>
    )
}