import { useEffect, useState } from "react"
import { useParams } from "react-router"

import stylses from './styles.module.scss'

type slugParams = {
    slug: string
}

interface CardAnimeProps {
    banner_image: string,
    cover_image: string,
    descriptions: {en: string, jp: string, it: string},
    titles: {en: string, jp: string},
    start_date: string,
    trailer_url: string,
    id: number
}

export function Anime() {
    const [ data, setData ] = useState<CardAnimeProps>()
    const params = useParams<slugParams>()
    const slug = params.slug
    
    useEffect(() => {
        const getAnimeHero = async () => {
            const response = await fetch(`https://api.aniapi.com/v1/anime?title=${slug}&formats=0,1`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${process.env.REACT_APP_ANIME_JWT}`,
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
            });

            const responseJson = await response.json()
            setData(responseJson.data.documents)
            console.log(data)
        }

        getAnimeHero()
        
    }, [slug])

    return (
        <main>
            { slug && (
                <>
                <main className={styles.animeContainer}>
                    <section className={styles.animeContainer__banner}>
                        <div></div>
                    </section>
                </main>
                </>
            )}
        </main>
    )
}