'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'

import { redirect } from 'next/navigation'

export async function generateGame(formData) {

    const supabase = createServerComponentClient({
        cookies,
    })
    const { data, error } = await supabase
        .from('Game')
        .insert([
            { game_code: (Array.from(Array(5), () => Math.floor(Math.random() * 36).toString(36)).join('')).toUpperCase() },
        ])//https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
        .select().limit(1).single()

    cookies().set('gameId', data.id)

    redirect(`/host/waiting`)
}