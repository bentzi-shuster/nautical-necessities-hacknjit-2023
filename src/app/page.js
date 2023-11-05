import Image from 'next/image'
import styles from './page.module.css'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'


import HomePageForm from '@/components/HomePageForm';
export default function Home() {
  return (
    <>
 <svg className={styles.backgroundcustom} id="demo" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path className={[styles.path,styles.path1].join(" ")} fill="#CFEBF8" fillOpacity="1" d="M-100 -100L200 -100L200 50L-100 50Z"
              />
        <path  className={[styles.path,styles.path2].join(" ")} fill="#3782C6" fillOpacity="1" d="M-100 -100L200 -100L200 50L-100 50Z"
              />
        <path  className={[styles.path,styles.path3].join(" ")} fill="#0000FF" fillOpacity="1" d="M-100 -100L200 -100L200 20L-100 20Z"
              />
      </svg>


      <div className="artboard artboard-horizontal phone-1 bg-slate-50 mx-auto my-48 min-h-32 rounded-md flex flex-col px-16 justify-center gap-4">
<h1 className='text-center text-2xl py-2'> Nautical Necessities </h1>

    <HomePageForm/>
   

<a href='/host' className="btn border-solid border-2 border-black">Host Game</a>
      </div>


    </>
  )
}
