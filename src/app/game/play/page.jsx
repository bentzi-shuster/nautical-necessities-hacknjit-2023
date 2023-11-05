import { newPrompt } from "@/lib/newPrompt/newPrompt";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import { savePlayerResponseToRound } from "./action";
export default async function Page() {
  const supabase = createServerComponentClient({ cookies });
let data = await newPrompt([
    "if you were stranded on a desert island, what would you bring?"
],"A boat");
data=JSON.parse(data);
let userId = cookies().get('userId').value


let {data: playerGamesData} = await supabase
.from('PlayerGames')
.select('gameId')
.eq('userId', userId)
.single()
// let {data: gameData} = await supabase
// .from('Game')
// .select('game_code')
// .eq('id', playerGamesData.gameId)
// .single()
const inserted = await supabase
  .from('GamePrompt')
  .insert([
    { prompt: data.result,gameId: playerGamesData.gameId, responderId:userId},
  ])
  .select()

return(
    
<>
<div className="md:artboard artboard-horizontal w-[90%] py-4 phone-1 content-center bg-slate-50 mx-auto my-24 min-h-32 rounded-md flex flex-col px-16 justify-center gap-4">
<h1 className="text-2xl">
{data.result}
</h1>
</div>
<form className="form-control flex flex-col gap-4 px-16  justify-center" action={savePlayerResponseToRound}>
<input type="hidden" name="questionId" id="questionId" value={inserted.data[0].id} />
<input type="text" name="userResponse" id="response" className="form-input py-4 border-black rounded-md indent-5" placeholder="Response goes here" />
<button type="submit" className="btn btn-primary">Submit</button>
</form>

</>    

)

}