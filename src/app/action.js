"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";
const supabase = createServerComponentClient({ cookies });

export async function doStuff(formData) {
  let user;

  let name = formData.get("name");
  let code = formData.get("code");
  let game = await supabase
    .from("Game")
    .select("id,game_code")
    .eq("game_code", code);
  if (game.data[0]?.id == null) {
    console.log("game not found");
  } else {

//check if user exists
  let usersWithTheSameName  = await supabase
    .from("User")
    .select("name,id")
    .eq("name", name)
    .order("id", { ascending: false })
    .limit(1)
console.log(usersWithTheSameName);
    //now check if the user is already in the game
    if(usersWithTheSameName.data[0]?.id){
     console.log(usersWithTheSameName.data[0]?.id);
    let userAlreadyExists = await supabase
    .from("PlayerGames")
    .select("userId")
    .eq("userId", usersWithTheSameName.data[0]?.id)
    .eq("gameId", game.data[0]?.id);
    console.log(usersWithTheSameName.data[0]?.id,game.data[0]?.id);
    console.log(userAlreadyExists);
    if (userAlreadyExists.data&&userAlreadyExists.data[0]?.userId != null) {
      console.log("user already exists in the game");
      redirect(`/?error=alreadyInGame`);
    }
console.log(usersWithTheSameName.data[0][0]?.id);
     
}

    user = await supabase
      .from("User")
      .insert([{ name: name }])
      .select("name,id");
    cookies().set("userId", user.data[0]?.id);
    let playergames = await supabase
      .from("PlayerGames")
      .insert([{ userId: user.data[0]?.id, gameId: game.data[0]?.id }]);
      redirect(`/game/waiting`);
  }
  
}
