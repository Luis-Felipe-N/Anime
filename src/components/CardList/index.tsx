import { useEffect, useState } from 'react'
import CardAnime from '../CardAnime'
import styles from './styles.module.scss'

interface CardListProps {
    genre: string
}

interface CardAnimeProps {
    banner_image: string,
    cover_image: string,
    descriptions: {en: string, jp: string, it: string},
    titles: {en: string, jp: string},
    start_date: string,
    trailer_url: string
}

export function CardList({genre}: CardListProps) {
    const [ data, setData ] = useState<CardAnimeProps[]>()

    useEffect(() => {
        const getAnimeHero = async () => {
            const response = await fetch(`https://api.aniapi.com/v1/anime?genres=${genre}`, {
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
        
        // https://api.aniapi.com/v1/anime?genres=Pirates
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])
    return (
        <section className={styles.cardListContainer}>
            <h2>{genre}</h2>
            <div className={styles.cardListContainer__wrapper}>
                <div className={styles.container}>
                    { data && data.map( (animeC) => <CardAnime anime={animeC} />)}
                    {/* <CardAnime /> */}
                </div>
            </div>
        </section>
    )
}