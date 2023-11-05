import styles from "@/components/page.module.css";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import HomePageForm from "@/components/HomePageForm";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'

export default async function GameRespond() {
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
            <div className="artboard artboard-horizontal phone-1 bg-slate-50 mx-auto my-48 min-h-32 rounded-md flex flex-col px-16 justify-center gap-2">
                <h1 className={'block text-gray-700 text-sm font-bold mb-2'}>The super smart AI™ said...</h1>
                <p className={'bg-blue-500 rounded-b-3xl rounded-tr-3xl p-5 w-3/4'}>Lorum ipsum dolor sit amet.</p>
                <hr />
                <form>
                    <div className={"flex gap-1"}>
                        <input autoFocus className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="userinput" type="text" placeholder="Your response..."></input>
                        <button type={'submit'} className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'}>Send</button>
                    </div>
                </form>
            </div>
        </>
    )
}