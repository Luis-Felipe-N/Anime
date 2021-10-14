// import CardAnime from "../components/CardAnime"
import { CardList } from "../components/CardList"
import { Hero } from "../components/Hero"

export function Home() {

    return (
        <main>
            <Hero />
            <CardList slug="Piratas" genre="Pirates"/>
            <CardList slug="Guerra" genre="War"/>
        </main>
    )
}