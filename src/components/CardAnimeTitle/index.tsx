import { useHistory } from 'react-router'
import styles from './styles.module.scss'

interface CardAnimeTitleProps {
    anime: {
        cover_image: string,
        titles: {en: string, jp: string, it: string},
    } 
}

export default function CardAnimeTitle({anime}: CardAnimeTitleProps) {
    const history = useHistory()

    return (
        <div onClick={() => history.push(`/anime/${anime.titles?.en}`)} className={styles.cardAnimeTitleContainer}>
            <img src={anime.cover_image} alt={anime.titles?.en} />
            <h2>{anime.titles?.en || anime.titles?.it || anime.titles?.jp}</h2>
        </div>
    )
}

