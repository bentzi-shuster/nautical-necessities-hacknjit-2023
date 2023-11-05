"use client"
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {useEffect, useState} from "react";
import PlayerCard from "@/components/PlayerCard";
import MessageBubble from "@/components/MessageBubble";
import {useRouter} from "next/navigation";
import TimerComponent from "@/components/TimerComponent";
import RedirectListener from "@/components/RedirectListener";
import {setInterval} from "worker-timers";

export default function VoteComponent({gameId, allData, side}) {
    const voteTime = 30;
    console.log(allData);
    const supabase = createClientComponentClient()
    const router = useRouter();

    let [gameCode, updateGameCode] = useState('~~~~~');

    supabase.from('Game').select('game_code').eq('id', gameId).limit(1).single()
        .then((data) => updateGameCode(data?.data?.game_code))

    useEffect(() => {
        if (side == 'host') {
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
        }
    }, [])

    const handleVote = (data) => {
        data.target.style.backgroundColor = 'grey'
        console.log('vote lol')
        let voteButtons = document.getElementsByClassName('voteButton')
        for (let item in voteButtons) {
            if (parseInt(item)) {
                voteButtons[item].remove()
            }
        }
    }

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
                                        <MessageBubble user={data.name} message={data.response}></MessageBubble>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <TimerComponent timerLength={voteTime} side={side} route={`respond`} gameId={gameId}/>
            <RedirectListener gameId={gameId}/>
        </>
    )
}