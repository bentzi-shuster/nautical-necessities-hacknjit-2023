import { generateGame } from "@/app/host/generateGame";
import HomePageForm from '@/components/HomePageForm';
export default function Home(params) {
  return (
    <>
    {params.searchParams.error&&params.searchParams.error==="alreadyInGame"&&(
      <div className="alert alert-error">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>Error! Name already in use</span>
</div>
    )}
        <div className="artboard artboard-horizontal phone-1 bg-slate-50 mx-auto my-48 min-h-32 rounded-md flex flex-col px-16 justify-center gap-4">
            <h1 className='text-center text-2xl py-2'> Nautical Necessities </h1>
            <HomePageForm/>
            <form action={generateGame}>
                <button type={'submit'} className="btn border-solid border-2 border-black">Host Game</button>
            </form>
        </div>
    </>
  )
}
