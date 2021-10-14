import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

export function PageNotFound() {
    return (
        <main className={styles.PageNotFoundContainer}>
            <p>Página não encontrada, <Link to="/">Volte para o inicio</Link></p>
        </main>
    )
}