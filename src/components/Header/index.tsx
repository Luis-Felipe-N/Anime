import { Link } from "react-router-dom";

import styles from './styles.module.scss'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <Link to="/"><h1>AnimePedia</h1></Link>
            <nav>
                <Link to="/"><a>Home</a></Link>
                <a href="#piratas">Piratas</a>
                <a href="#guerra">Guerra</a>
            </nav>
        </header>
    )
}