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
    }

    const handleSearch = (e: any) => {
        e.preventDefault()
        if ( search ) {
            history.push(`/animes/${search}`)
            setSearch('')
        }
    }

    return (
        <header className={styles.headerContainer}>
            <Link to="/"><h1>AnimePedia</h1></Link>
            <form onSubmit={handleSearch} className={styles.headerContainer__search}>
                <input 
                    className={activeInput ? styles.active : ''} 
                    type="text" placeholder="Pesquisar" 
                    onChange={ ({target}) => setSearch(target.value)} 
                    value={search}
                />
                <button 
                    onClick={handleActiveInput} 
                    className={styles.icon} >
                    <CgSearch size="20"/>
                </button>
            </form>
        </header>
    )
}