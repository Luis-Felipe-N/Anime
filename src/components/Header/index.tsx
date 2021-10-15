import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { CgSearch } from 'react-icons/cg'

import styles from './styles.module.scss'

export function Header() {
    const [ search, setSearch ] = useState(String)
    const [ activeInput , setActiveInput ] = useState(false)
    const history = useHistory()

    const handleActiveInput = () => {
        setActiveInput(!activeInput)
        if ( search ) handleSearch()
    }

    const handleSearch = () => {
        if ( search ) {
            history.push(`/animes/${search}`)
            setSearch('')
        }
    }

    return (
        <header className={styles.headerContainer}>
            <Link to="/"><h1>AnimePedia</h1></Link>
            <div className={styles.headerContainer__search}>
                <button 
                    onClick={handleActiveInput} 
                    className={styles.icon} >
                    <CgSearch size="20"/>
                </button>
                <input 
                    className={activeInput ? styles.active : ''} 
                    type="text" placeholder="Pesquisar" 
                    onChange={ ({target}) => setSearch(target.value)} 
                    value={search}
                />
            </div>
        </header>
    )
}