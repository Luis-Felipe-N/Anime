import { FaGithub } from 'react-icons/fa'
import styles from './styles.module.scss'

export function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <p>Criado por Luis Felipe</p>
            <div>
                <a target="_blanck" href="https://github.com/Luis-Felipe-N"><FaGithub/></a>
            </div>
        </footer>
    )
}