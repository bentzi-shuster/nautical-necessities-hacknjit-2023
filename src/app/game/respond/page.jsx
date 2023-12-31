import styles from "@/components/page.module.css";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import HomePageForm from "@/components/HomePageForm";
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers'
import MessageBubble from "@/components/MessageBubble";
import TimerComponent from "@/components/TimerComponent";
import {savePlayerResponse} from "@/app/game/respond/action";
import RedirectListener from "@/components/RedirectListener";
import {savePlayerResponseToRound} from "../play/action";
import {newPrompt} from "@/lib/newPrompt/newPrompt";

export default async function GameRespond() {
    let respondTime = 30;

    // const supabase = createServerComponentClient({cookies});

    // let userId = cookies().get('userId').value

    // let {data: playerGamesData} = await supabase
    //     .from('PlayerGames')
    //     .select('gameId')
    //     .eq('userId', userId)
    //     .single()
    // let {data: gameData} = await supabase
    //     .from('Game')
    //     .select('game_code')
    //     .eq('id', playerGamesData.gameId)
    //     .single()
    // console.log(gameData)

    const supabase = createServerComponentClient({cookies});
    let userId = cookies().get('userId').value
    let {data: playerGamesData} = await supabase
        .from('PlayerGames')
        .select('gameId')
        .eq('userId', userId)
        .single()

    let {data: PromptData} = await supabase
        .from('GamePrompt')
        .select('prompt')
        .eq('gameId', playerGamesData.gameId)

    let promptArray = PromptData.map((data) => data.prompt)

    let data = await newPrompt([...promptArray], "");
    data = JSON.parse(data);


// let {data: gameData} = await supabase
// .from('Game')
// .select('game_code')
// .eq('id', playerGamesData.gameId)
// .single()
    const inserted = await supabase
        .from('GamePrompt')
        .insert([
            {prompt: data.result, gameId: playerGamesData.gameId, responderId: userId},
        ])
        .select()


    return (
        <>
            <div
                className="artboard artboard-horizontal phone-1 bg-slate-50 mx-auto my-48 min-h-32 rounded-md flex flex-col px-16 justify-center gap-2">
                <MessageBubble user={'The super smart AI'} message={data.result}></MessageBubble>
                <hr/>
                <form action={savePlayerResponseToRound}>
                    <input type="hidden" name="questionId" id="questionId" value={inserted.data[0].id}/>
                    <div className={"flex gap-1"}>
                        <input autoFocus name={'userResponse'}
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                               id="userinput" type="text" placeholder="Your response..."></input>
                        <button type={'submit'}
                                className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'}>Send
                        </button>
                    </div>
                </form>
            </div>
            <TimerComponent timerLength={respondTime} side='game' route={`vote`} gameId={playerGamesData.gameId}/>
            <RedirectListener gameId={playerGamesData.gameId}/>
        </>
    )
}