"use server";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
const supabase = createServerComponentClient({cookies});

export async function savePlayerResponseToRound(formData) {
    let userId = cookies().get('userId').value;
    let response = formData.get('userResponse');
    let questionId = formData.get('questionId');

const temp = await supabase
  .from('GamePrompt')
  .update([
    { response: response },
  ])
  .eq("id", questionId)
  .select()

    
}
