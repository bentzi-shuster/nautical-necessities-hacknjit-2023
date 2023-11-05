"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {useState} from "react";

export default function AllUsers({gameId, allPlayers}) {
    //const cookieStore = cookies()
    const supabase = createClientComponentClient()

    let [allUsers, updateAllUsers] = useState(allPlayers);

    const PlayerGames = supabase.channel('custom-all-channel')
        .on(
            'postgres_changes',
            {event: 'INSERT', schema: 'public', table: 'PlayerGames', filter: `gameId=eq.${gameId}`},
            async (payload) => {
                let {data: player, error} = await supabase
                    .from('User')
                    .select('id, name')
                    .eq('id', payload.new.userId)
                    .limit(1)
                    .single()
                console.log('testinguseses ' + JSON.stringify(player))
                let tempAllPlayers = [...allUsers]
                tempAllPlayers.push(player)
                updateAllUsers(tempAllPlayers)
            }
        )
        .subscribe()

    const PlayerGames2 = supabase.channel('custom-all-channel')
        .on(
            'postgres_changes',
            { event: 'DELETE', schema: 'public', table: 'PlayerGames', filter: `gameId=eq.${gameId}` },
            async (payload) => {
                let {data: player, error} = await supabase
                    .from('User')
                    .select('id, name')
                    .eq('id', payload.new.userId)
                    .limit(1)
                    .single()
                let tempAllPlayers = [...allUsers]
                let index = tempAllPlayers.indexOf(player)
                tempAllPlayers.splice(index, 1)
                updateAllUsers(tempAllPlayers)
            }
        )
        .subscribe()

    return (
        <>
            <div className="stat">
                <div>
                    <div className="stat-desc text-3xl">Game Code</div>
                    <div className="stat-value">{gameId}</div>
                    {
                        allUsers.map((data, index) => {
                            return (
                                <p key={index}>{data.name}</p>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}