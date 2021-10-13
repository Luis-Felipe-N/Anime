// import CardAnime from "../components/CardAnime"
import { CardList } from "../components/CardList"
import { Header } from "../components/Header"
import { Hero } from "../components/Hero"

export function Home() {

    return (
        <main>
            <Header />
            <Hero />
            <CardList genre="Pirates"/>
        </main>
    )
}