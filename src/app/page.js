import Image from 'next/image'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'
import { generateGame } from "@/app/host/generateGame";
import HomePageForm from '@/components/HomePageForm';
export default function Home() {
  return (
    <>
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
