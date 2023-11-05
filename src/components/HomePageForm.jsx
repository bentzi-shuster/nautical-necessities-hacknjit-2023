import { doStuff } from "@/app/action";

export default function HomePageForm() {
return (


    <form action={doStuff} className="form-control gap-4">
    <input type="text" placeholder="Enter Your Name" className="input input-bordered" name="name" />
<input type="text" placeholder="Enter Game Code" className="input input-bordered" name="code" />
 <button type='submit' className="btn border-solid border-2 border-black">Join Game</button>
    </form>
    )
}