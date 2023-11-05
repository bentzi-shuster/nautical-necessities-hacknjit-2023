import Image from 'next/image'
import styles from '../components/page.module.css'

import HomePageForm from '@/components/HomePageForm';
import BackgroundAnimation from "@/components/BackgroundAnimation";
export default function Home() {

  return (
    <>
        <div className="artboard artboard-horizontal phone-1 bg-slate-50 mx-auto my-48 min-h-32 rounded-md flex flex-col px-16 justify-center gap-4">
        <h1 className='text-center text-2xl py-2'> Nautical Necessities </h1>
        <HomePageForm/>
        <a href='/host' className="btn border-solid border-2 border-black">Host Game</a>
        </div>
    </>
  )
}
