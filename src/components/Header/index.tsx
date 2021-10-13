import { Link } from "react-router-dom";

import styles from './styles.module.scss'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <Link to="/"><h1>AnimePedia</h1></Link>
            <nav>
                <Link to="/"><a>Home</a></Link>
                <Link to="/"><a>Destaques</a></Link>
                {/* <a href="#">Lançamentos</a> */}
            </nav>
        </header>
    )
}