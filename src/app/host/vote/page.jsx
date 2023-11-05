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
    console.log(allPlayers);
    return (
        <>
            <VoteComponent gameId={gameId} allData={allPlayers} side={'host'}></VoteComponent>
            <TimerComponent timerLength={30} gameId={gameId} route={'respond'} side={'host'}/>
        </>
    )
}