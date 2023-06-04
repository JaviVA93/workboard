
import Pomodoro from "@/components/pomodoro/Pomodoro";
import ToDo from "@/components/to-do/toDo";
import style from './workoardPage.module.css'
import ToolsBar from "@/components/toolsBar/toolsBar";
import ClampCalculator from "@/components/clamp-calculator/ClampCalculator";
import Weather from "@/components/weather/weather";
import { cookies, headers } from "next/headers";
import { cloneElement, useEffect } from "react";
import ArrowSvg from "@/components/assets/ArrowSvg";
import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";



export default async function Workboard() {
    const toolsToShow: { id: string, component: JSX.Element }[] = []

    const tools = [
        {
            id: 'pomodoro',
            component: <Pomodoro />
        },
        {
            id: 'todo',
            component: <ToDo />
        },
        {
            id: 'clampcalc',
            component: <ClampCalculator />
        },
        {
            id: 'weather',
            component: <Weather />
        }
    ]

    let toolsCookie: null | string = null
    if (cookies().get('supabase-auth-token')) {
        const supabase = createRouteHandlerSupabaseClient({
            headers,
            cookies
        })
    
        const { data, error } = await supabase.from('board-tools').select('tools')
        if (data)
            toolsCookie = data[0].tools
    }
    
    if (!toolsCookie)
        toolsCookie = cookies().get('devboard-tools')?.value || null

    if (toolsCookie) {
        const toolsSplited = toolsCookie.split(',');
        toolsSplited.forEach(id => {
            const tool = tools.find(v => v.id === id)
            if (tool)
                toolsToShow.push(tool)
        })
    }

    return (
        <section className={style.workboard}>
            <ToolsBar />
            <h1>Your Workboard</h1>
            {toolsToShow.length > 0
                ? toolsToShow.map(t => cloneElement(t.component, { key: t.id }))
                : <div>
                    <h1 className={style.emptyBoardMsg}>Add tools to your workboard!</h1>
                    <div className={style.emptyBoardArrowWrapper}>
                        <ArrowSvg className={style.emptyBoardArrow} />
                    </div>
                </div>}

        </section>
    )
}