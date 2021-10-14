// import CardAnime from "../components/CardAnime"
import { CardList } from "../components/CardList"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Hero } from "../components/Hero"

export function Home() {

    return (
        <>
            <Header />
        <main>
            <Hero />
            <CardList slug="Piratas" genre="Pirates"/>
            <CardList slug="Guerras" genre="War"/>
        </main>
        <Footer/>
        </>
    )
}