import { useHistory } from 'react-router'
import styles from './styles.module.scss'
interface CardAnimeProps {
    anime: {
        banner_image: string,
        cover_image: string,
        descriptions: {en: string, jp: string, it: string},
        titles: {en: string, jp: string},
        start_date: string,
        trailer_url: string
    } 
}

export default function CardAnime({anime}: CardAnimeProps) {
    const history = useHistory()

    return (
        <div onClick={() => history.push(`/anime/${anime.titles?.en}`)} className={styles.cardAnimeContainer}>
            <img src={anime.cover_image} alt={anime.titles?.en} />
            {/* <h1>{anime.titles.en}</h1> */}
        </div>
    )
}

