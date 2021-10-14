import { useEffect, useRef, useState } from 'react'
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi'
import CardAnime from '../CardAnime'
import styles from './styles.module.scss'

interface CardListProps {
    genre: string,
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

export function CardList({genre, slug}: CardListProps) {
    const [ directionX, setDirectionX ] = useState(0)
    const [ data, setData ] = useState<CardAnimeProps[]>()
    const slideContainer = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const getAnimeHero = async () => {
            const response = await fetch(`https://api.aniapi.com/v1/anime?formats=0&genres=${genre}`, {
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
        if ( slideContainer.current) {
            slideContainer.current.style.transform = `translateX(-${directionX*100}%)`
        }
    }, [directionX])

    const handleMoveSectionToLeft = () => {
        if ( slideContainer.current ) {
            if ( directionX >= 0 ) {
                
                setDirectionX( x => x = x - 1)

            }
        }
    }

    const handleMoveSectionToRigth = () => {

        if ( slideContainer.current && data ) {
            const slideContainerWidth = data.length * 204
            const userWidthScreen = window.innerWidth

            if ( directionX < (Math.ceil(slideContainerWidth/userWidthScreen)+1)) {
                setDirectionX(x=>x = x + 1)
            }
        }
    }

    return (
        <section id={slug.toLocaleLowerCase()} className={styles.cardListContainer}>
            <h2>{slug}</h2>
            <div className={styles.cardListContainer__wrapper}>
            <button onClick={handleMoveSectionToLeft}><BiLeftArrow size="2rem"/></button>
                <div ref={slideContainer} className={styles.container}>
                    { data && data.map( (animeC) => <CardAnime key={animeC.id} anime={animeC} />)}
                </div>
            <button className={styles.btnNext} onClick={handleMoveSectionToRigth}><BiRightArrow size="2rem"/></button>
            </div>
        </section>
    )
}