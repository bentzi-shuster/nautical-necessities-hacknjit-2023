import { newPrompt } from "@/lib/newPrompt/newPrompt";

export default async function Page() {
let data = await newPrompt([
    "if you were stranded on a desert island, what would you bring?"
],"A boat");
data=JSON.parse(data);
return(
    
<>
<div className="md:artboard artboard-horizontal w-[90%] py-4 phone-1 content-center bg-slate-50 mx-auto my-24 min-h-32 rounded-md flex flex-col px-16 justify-center gap-4">
<h1 className="text-2xl">
{data.result}
</h1>
</div>
<form className="form-control flex flex-col gap-4 px-16  justify-center">

<input type="text" name="response" id="response" className="form-input py-4 border-black rounded-md indent-5" placeholder="Response goes here" />
</form>

</>    

)

}