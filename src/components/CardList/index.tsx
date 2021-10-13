import { useEffect, useRef, useState } from 'react'
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
    trailer_url: string,
    id: number
}

export function CardList({genre}: CardListProps) {
    const [ directionX, setDirectionX ] = useState(0)
    const [ data, setData ] = useState<CardAnimeProps[]>()
    const slideContainer = useRef<HTMLDivElement>(null)

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

    const handleMoveSectionToLeft = () => {
        if ( slideContainer.current ) {
            if ( directionX > 0 ) {
                const userWidthScreen = window.innerWidth
                setDirectionX( x => x = x - userWidthScreen)
                console.log(directionX)
                slideContainer.current.style.transform = `translateX(-${directionX}px)`
            }
        }
    }

    const handleMoveSectionToRigth = () => {
        if ( slideContainer.current && data ) {
            const slideContainerWidth = data.length * 208

            if ( directionX < slideContainerWidth) {
                const userWidthScreen = window.innerWidth
                setDirectionX( x => x += userWidthScreen)
                console.log(directionX)
                slideContainer.current.style.transform = `translateX(-${directionX}px)`
            }
        }
    }

    return (
        <section className={styles.cardListContainer}>
            <h2>{genre}</h2>
            <button onClick={handleMoveSectionToLeft}>back</button>
            <div className={styles.cardListContainer__wrapper}>
                <div ref={slideContainer} className={styles.container}>
                    { data && data.map( (animeC) => <CardAnime key={animeC.id} anime={animeC} />)}
                </div>
                <button onClick={handleMoveSectionToRigth}>next</button>
            </div>
        </section>
    )
}