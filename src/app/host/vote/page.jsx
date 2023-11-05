import VoteComponent from "@/components/VoteComponent";
import {cookies} from 'next/headers'
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import TimerComponent from "@/components/TimerComponent";

export default async function Host() {
    const supabase = createServerComponentClient({cookies})

    let gameId = cookies().get('gameId').value;

    let {data: allPlayers, error} = await supabase
        .from('PlayerGames')
        .select('User (id, name)')
        .eq('gameId', gameId)

    allPlayers = allPlayers.map((data) => data.User)

    return (
        <>
            <VoteComponent gameId={gameId} allData={allPlayers} side={'host'}></VoteComponent>
            <TimerComponent timerLength={6} gameId={gameId} route={'respond'} side={'host'}/>
        </>
    )
}