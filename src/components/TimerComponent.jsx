"use client"
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function TimerComponent({timerLength, route}) {
    let [timerPercent, updateTimerPercent] = useState(0);

    let alreadyRun = false;
    const router = useRouter();

    useEffect(() => {
        if (alreadyRun) return
        alreadyRun = true

        const timerInterval = setInterval(() => {
            updateTimerPercent(prev => (prev >= 100 ? router.push(route) : prev + 0.125));
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