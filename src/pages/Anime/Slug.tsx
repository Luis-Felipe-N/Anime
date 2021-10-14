import { format } from "date-fns"
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
    titles: {en: string, jp: string, it: string},
    title: string
    start_date: string,
    trailer_url: string,
    id: number,
    episode_duration: number,
    episodes_count: number
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

    useEffect(() => {
        if ( data && !data.title ) {
            const title = data.titles?.en || data.titles?.it || data.titles?.jp
            const parsedData = {...data, title}
            setData( parsedData )
        }
    }, [data])


    return (
        <main>
            { slug && data && (
                <>
                <main className={styles.animeContainer}>
                    <section className={styles.hero} style={{backgroundImage:`linear-gradient(180deg, rgba(23,25,35,.6) 0%, rgba(23,25,35,9) 98%), url(${data.banner_image})`}}>
                    </section>
                    <section  className={styles.container}>
                        <div style={{border: `2px solid ${data?.cover_color || '#E4A15D'}`}} className={styles.card}>
                            <img src={data.cover_image} title={data.title} alt={`Imagem do anme ${data.title}`} />
                        </div>
                        <div className={styles.content}>
                            <h1 title={data.title}>{data.title}</h1>
                            <h3>{data.titles?.jp}</h3>
                        </div>
                    </section>
                    <section className={styles.info}>
                        <div className={styles.content}>
                            <div>
                                <div>
                                    <h3>Data de criação: </h3>
                                    <span>{format(new Date(data.start_date), 'MM/dd/yyyy')}</span>
                                </div>
                                <div>
                                    <h3>Episódios: </h3>
                                    <span>{data?.episodes_count}</span>
                                </div>
                                <div>
                                    <h3>Duração de episódios: </h3>
                                    <span>{data?.episode_duration} min</span>
                                </div>
                            </div>
                            
                            <h3>Descrição em {(data.descriptions?.en && 'inglês') || (data.descriptions?.it && 'italiano') || data.descriptions?.jp && 'Japonês'}:</h3>
                            <p  dangerouslySetInnerHTML={{__html: data.descriptions.en || data.descriptions.jp || data.descriptions.it}}></p>
                        </div>
                        { data?.trailer_url && (
                            <iframe className={styles.iframeYoutube} width="1366"  height="505" src={data.trailer_url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        )}
                    </section>
                </main>
                </>
            )}
        </main>
    )
}