import { useEffect, useState } from "react"
import CardAnime from "../components/CardAnime"
import { Header } from "../components/Header"
import { Hero } from "../components/Hero"

export function Home() {
    const [ data , setData ] = useState<any>()

    useEffect(() => {

    }, [])

    return (
        <main>
            <Header />
            <Hero />
        </main>
    )
}