import { useEffect, useState } from "react"
import CardAnime from "../../components/CardAnime"
import { SkeletonText } from "../../components/Skeleton"

import styles from './styles.module.scss'

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
    const [ notFound, setNotFound ] = useState(false)
    const [ data, setData ] = useState<CardAnimeProps[]>()

    const params = useParams<TitleParams>()
    const title = params.title
    
    useEffect(() => {
        const getAnimeHero = async () => {
            const response = await fetch(`https://api.aniapi.com/v1/anime?title=${title}&formats=0,1`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${process.env.REACT_APP_ANIME_JWT}`,
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
            });

            const responseJson = await response.json()
            if (responseJson.status_code === 404) {
                setNotFound(true)
            } else {
                setData(responseJson.data.documents)
                setNotFound(false)
            }
        }

        getAnimeHero()
        
    }, [title])   


        return (
            <main className={styles.containerCard}>
                { !notFound && <h2>Animes encontrados: {data?.length || '0'}</h2>}
                <div>
                {
                    !notFound ? data ? data.map( anime => <CardAnime key={anime.id} anime={anime}/>) : (
                        <>
                        <SkeletonText />
                        <SkeletonText />
                        <SkeletonText />
                        </>
                    ) : <h1>{title} não foi encontrado</h1>
                }
                </div>
            </main>
        )
}