import styles from "@/components/page.module.css";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import HomePageForm from "@/components/HomePageForm";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'

export default async function GameWaiting() {
    const supabase = createServerComponentClient({ cookies });

    let userId = cookies().get('userId').value
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


    let { data: playerData } = await supabase
        .from('PlayerGames')
        .select('userId, gameId, created_at')
        .eq('gameId', playerGamesData.gameId)
        let firstPlayer = playerData.reduce((a, b) => {
            return a.created_at < b.created_at ? a : b;
        });
        



    return (
        <>
            <div className="artboard artboard-horizontal phone-1 bg-slate-50 mx-auto my-48 min-h-32 rounded-md flex flex-col px-16 justify-center gap-0">
                <h1 className='text-center text-2xl py-2'> Nautical Necessities </h1>
                <h1 className='text-center text-xl py-2'>{gameData.game_code}</h1>
                <p>Waiting for the game to begin...</p>


                {firstPlayer.userId == userId && (
                    <button className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'}>Start Game</button>
                    
                    )}
            </div>
        </>
    )
}