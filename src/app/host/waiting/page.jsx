import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers'
import AllUsers from "@/components/AllUsers";
import GameStartListener from "@/components/GameStartListener";

export default async function Host() {
    //const cookieStore = cookies()
    const supabase = createServerComponentClient({cookies})

    let gameId = cookies().get('gameId')?.value;

    let {data: allPlayers, error} = await supabase
        .from('PlayerGames')
        .select('User (id, name)')
        .eq('gameId', gameId)

    allPlayers = allPlayers.map((data) => data.User)

    const PlayerGames = await supabase.channel('custom-all-channel')
        .on(
            'postgres_changes',
            {event: 'UPDATE', schema: 'public', table: 'PlayerGames', filter: `gameId=eq.${gameId}`},
            (payload) => {
                console.log('new changes ' + payload.new)
            }
        )
        .subscribe()

    return (
        <>
            <GameStartListener gameId={gameId}/>
            <AllUsers gameId={gameId} allPlayers={allPlayers}></AllUsers>
        </>
    )
}