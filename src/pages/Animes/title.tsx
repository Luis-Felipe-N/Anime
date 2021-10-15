import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import CardAnime from "../../components/CardAnime"

type TitleParams = {
    title: string
}

interface CardAnimeProps {
    banner_image: string,
    cover_image: string,
    cover_color: string,
    descriptions: {en: string, jp: string, it: string},
    titles: {en: string, jp: string, it: string},
    title: string
    start_date: string,
    trailer_url: string,
    id: number,
    episode_duration: number,
    episodes_count: number,
}


export function Animes() {

    const [ data, setData ] = useState<CardAnimeProps[]>()

    const params = useParams<TitleParams>()
    const title = params.title
    
    useEffect(() => {
        const getAnimeHero = async () => {
            const response = await fetch(`https://api.aniapi.com/v1/anime?title=${title}`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${process.env.REACT_APP_ANIME_JWT}`,
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
            });

            const responseJson = await response.json()
            setData(responseJson.data.documents)
        }

        getAnimeHero()
        
    }, [title])   

    if ( data ) {
        return (
            <main>
                {
                    data.map( anime => <CardAnime key={anime.id} anime={anime}/>)
                }
            </main>
        )
    } else {
        return (
            <main>
                <h1>{title} não foi encontrado</h1>
            </main>
        )
    }
}