import { NextResponse } from "next/server"
import { routeWeb } from "./route/web"


export function middleware(req)
{
    const token = req.cookies.get("token")
    const url   = req.url
    

    if(!token && url.includes("/"))
    {
        // return NextResponse.redirect(new URL(`${process.env.BASE_PATH}${routeWeb.login.link}`))
    }

    if(token && url.includes("/connexion") || token && url.includes("/inscription"))
    {
        return NextResponse.redirect(new URL(`${process.env.BASE_PATH}${routeWeb.discussion.link}`))
    }

    return NextResponse.next()

}

export const config = 
{
    matcher: ["/", "/connexion", "/inscription"]
}