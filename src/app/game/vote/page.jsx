import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers'
import AllUsers from "@/components/AllUsers";
import VoteComponent from "@/components/VoteComponent";
import RedirectListener from "@/components/RedirectListener";

export default async function Host() {
    //const cookieStore = cookies()
    const supabase = createServerComponentClient({cookies})

    let gameId = cookies().get('gameId').value;

    let {data: allPlayers, error} = await supabase
        .from('PlayerGames')
        .select('User (id, name)')
        .eq('gameId', gameId)
       
        let {data: GamePrompts, error2} = await supabase
        .from('GamePrompt')
        .select('response, responderId')
        .eq('gameId', gameId)
    allPlayers = allPlayers.map((data) => data.User)

    allPlayers = allPlayers.map((data) => {
        for (let i = 0; i < GamePrompts.length; i++) {
            if (GamePrompts[i].responderId == data.id) {
                data.response = GamePrompts[i].response
            }
        }

        return data;
    })  
    const PlayerGames = await supabase.channel('custom-all-channel')
        .on(
            'postgres_changes',
            {event: 'INSERT', schema: 'public', table: 'PlayerGames', filter: `gameId=eq.${gameId}`},
            (payload) => {
                console.log('new changes ' + payload.new)
            }
        )
        .subscribe()

    return (
        <>
            <VoteComponent gameId={gameId} allData={allPlayers} side={'game'}></VoteComponent>
            <RedirectListener gameId={gameId}/>
        </>
    )
}