  import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'
export default async function Host() {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({
      cookies,
    })
    const { data, error } = await supabase
  .from('Game')
  .insert([
    { game_code: (Array.from(Array(5), () => Math.floor(Math.random() * 36).toString(36)).join('')).toUpperCase() },
  ])
  .select(
  ).limit(1)
console.log(data);
return (
<>

  <div className="stat">
  <div className="stat-desc text-3xl">Game Code</div>
    <div className="stat-value">{data[0].game_code}</div>
</div>




<div>
<h3>
 Players   
</h3>


    
</div>






</>


)

}