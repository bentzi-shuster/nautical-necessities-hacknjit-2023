
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'
const cookieStore = cookies()
const supabase = createServerComponentClient({ cookies})
      
export async function doStuff(formData) {
            'use server'
           let name =  formData.get("name")
             let code =  formData.get("code")

             let { gamedata, gameerror } = await supabase
             .from('Game')
             .select('id,game_code')
             .eq('game_code', code)

           if (gameerror) {
                  console.log(gameerror)
             }
             else {
             let { userdata, usererror } = await supabase
             .from('User')
             .insert([
               { name: name },
             ])
             .select("id,name")
            }
            console.log(gamedata,gameerror);
          }