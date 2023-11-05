import styles from "@/components/page.module.css";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import HomePageForm from "@/components/HomePageForm";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'

export default async function GameWaiting() {
    const supabase = createServerComponentClient({ cookies });

    let userId = 57;

    let { data: playerGamesData } = await supabase
        .from('PlayerGames')
        .select('gameId')
        .eq('userId', userId)
        .single()
    let { data: gameData } = await supabase
        .from('Game')
        .select('game_code')
        .eq('id', playerGamesData.gameId)
        .single()
    console.log(gameData)

    return (
        <>
            <div className="artboard artboard-horizontal phone-1 bg-slate-50 mx-auto my-48 min-h-32 rounded-md flex flex-col px-16 justify-center gap-0">
                <h1 className='text-center text-2xl py-2'> Nautical Necessities </h1>
                <h1 className='text-center text-xl py-2'>{gameData.game_code}</h1>
                <p>Waiting for the game to begin...</p>
            </div>
        </>
    )
}