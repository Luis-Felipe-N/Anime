import { useEffect, useState } from 'react'
import styles from './styles.module.scss'

import { format } from 'date-fns'

interface CardAnimeProps {
    banner_image: string,
    cover_image: string,
    descriptions: {en: string, jp: string, it: string},
    titles: {en: string, jp: string},
    start_date: string,
    trailer_url: string
}

export function Hero() {
    const [ data, setData ] = useState<CardAnimeProps>()

    useEffect(() => {
        const getAnimeHero = async () => {
            const response = await fetch(`https://api.aniapi.com/v1/anime/5441`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${process.env.REACT_APP_ANIME_JWT}`,
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
            });

            const responseJson = await response.json()
            setData(responseJson.data)
        }

        getAnimeHero()
    }, [])
 
    return (
        <section className={styles.heroContainer} style={{backgroundImage:`linear-gradient(180deg, rgba(23,25,35,.6) 0%, rgba(23,25,35,9) 98%), url(${data?.banner_image})`}}>
            <div className={styles.heroContainer__card}>
                <img src={data?.cover_image} alt={data?.titles.en || data?.titles.jp} />
            </div>

            <div className={styles.heroContainer__content}>
                <h1>{data?.titles.en || data?.titles.jp}</h1>
                {data?.descriptions.en && <p dangerouslySetInnerHTML={{__html: data.descriptions.en || data.descriptions.jp || data.descriptions.it}} ></p>}

                <div>{data?.start_date && <span>{format(new Date(data.start_date), 'MM/dd/yyyy')}</span>}
                {data    && <span><a href={data?.trailer_url} target="_black">Trailer</a></span>}</div>
            </div>
        </section>
    )
}