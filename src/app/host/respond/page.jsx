import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers'
import AllUsers from "@/components/AllUsers";
import {usePathname} from "next/navigation";
import TimerComponent from "@/components/TimerComponent";

export default async function Host() {
    //const cookieStore = cookies()
    const supabase = createServerComponentClient({cookies})

    let gameId = cookies().get('gameId').value;

    let {data: allPlayers, error} = await supabase
        .from('PlayerGames')
        .select('User (id, name)')
        .eq('gameId', gameId)

    allPlayers = allPlayers.map((data) => data.User)

    return (
        <>
            <AllUsers gameId={gameId} allPlayers={allPlayers}></AllUsers>
            <TimerComponent timerLength={30} gameId={gameId} route={'vote'} side={'host'}/>
        </>
    )
}