import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"

import styles from './styles.module.scss'

type slugParams = {
    slug: string
}

interface CardAnimeProps {
    banner_image: string,
    cover_image: string,
    cover_color: string,
    descriptions: {en: string, jp: string, it: string},
    titles: {en: string, jp: string},
    start_date: string,
    trailer_url: string,
    id: number
}

export function Anime() {
    const [ data, setData ] = useState<CardAnimeProps>()
    
    const history = useHistory()
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
            try {
                setData(responseJson.data.documents[0])
            } catch {
                if (!data) history.push('/404')
            }
            console.log(data)
        }

        getAnimeHero()
        
    }, [slug])



    return (
        <main>
            { slug && data && (
                <>
                <main className={styles.animeContainer}>
                    <section className={styles.hero} style={{backgroundImage:`linear-gradient(180deg, rgba(23,25,35,.6) 0%, rgba(23,25,35,9) 98%), url(${data.banner_image})`}}>
                    </section>
                    <section  className={styles.container}>
                        <div style={{border: `2px solid ${data?.cover_color || '#E4A15D'}`}} className={styles.card}>
                            <img src={data.cover_image} alt="card de anime" />
                        </div>
                        <div className={styles.content}>
                            <h1>{data.titles?.en || data.titles?.jp}</h1>
                            <h3>{data.titles?.jp}</h3>
                        </div>
                    </section>
                    <section>
                        <div>
                            <div></div>
                            <p>{data.descriptions?.en || data.descriptions?.it}</p>
                        </div>
                    </section>
                </main>
                </>
            )}
        </main>
    )
}