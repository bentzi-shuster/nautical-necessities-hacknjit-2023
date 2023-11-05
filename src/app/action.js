'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'
 
import { redirect } from 'next/navigation'
const supabase = createServerComponentClient({ cookies})
      
export async function doStuff(formData) {
    let user
            
           let name =  formData.get("name")
             let code =  formData.get("code")
             let game = await supabase
             .from('Game')
             .select('id,game_code')
                .eq('game_code', code)  
           if (game.data[0]?.id == null) {
             }
             else {
              user = await supabase
             .from('User')
             .insert([
               { name: name },
             ])
             .select("name,id")
             cookies().set('userId', user.data[0]?.id)
                 let playergames=   await supabase
             .from('PlayerGames')
             .insert([
               { userId: user.data[0]?.id, gameId: game.data[0]?.id },
             ])
            }
            redirect(`/game/waiting`)
            
          }