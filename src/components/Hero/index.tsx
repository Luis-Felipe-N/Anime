import { useEffect, useState } from 'react'
import { animeFetch } from '../../service/animeFecth'
import styles from './styles.module.scss'

interface CardAnimeProps {
    banner_image: string,
    cover_image: string,
    descriptions: {en: string, jp: string, it: string},
    titles: {en: string, jp: string}
}

export function Hero() {
    const [ data, setData ] = useState<CardAnimeProps>()

    useEffect(() => {
        const getAnimeHero = async () => {
            const response = await fetch(`https://api.aniapi.com/v1/anime/${Math.floor(Math.random() * 11) }`, {
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
        console.log(data)

        getAnimeHero()
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])
 
    return (
        <section className={styles.heroContainer} style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.627), hsla(0, 0%, 0%, 0.467)), url(${data?.banner_image})`}}>
            <div className={styles.heroContainer__card}>
                <img src={data?.cover_image} alt={data?.titles.en || data?.titles.jp} />
            </div>

            <div className={styles.heroContainer__content}>
                <h1>{data?.titles.en || data?.titles.jp}</h1>
                {data?.descriptions.en && <p dangerouslySetInnerHTML={{__html: data.descriptions.en || data.descriptions.jp || data.descriptions.it}} ></p>}
            </div>
        </section>
    )
}