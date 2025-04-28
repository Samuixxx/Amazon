/**
 * @file LangSelector.jsx
 * @descrizione Componente React che mostra un elenco di lingue disponibili
 *              e permette all'utente di cambiare la lingua dell'applicazione
 *              utilizzando la libreria i18next. Dopo la selezione, può
 *              chiudere automaticamente il menu.
 *
 * @component
 * @param {Array} nations - Array di oggetti che rappresentano le lingue disponibili.
 *                          Ogni oggetto deve avere:
 *                          - id: stringa (es. 'en', 'it', 'fr'), usata da i18next.
 *                          - name: stringa visualizzata nel menu (es. 'Inglese').
 *
 * @returns {JSX.Element} Lista di opzioni di lingua da selezionare.
 */
import './LangSelector.scss'
import { Spawn } from './index.js'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { getFlag } from '../../utils/langs/nations.js'

const LangSelector = ({ nations }) => {

    const { t, i18n } = useTranslation()
    const [langMenuState, setLangMenuState] = useState(false)

    const flagSrc = getFlag(i18n.language.split('-')[0])
    const flagText = t(i18n.language.split('-')[0])

    const handleChangeLanguage = (langId) => {
        i18n.changeLanguage(langId)
        if (closeMenu) closeMenu()
    };

    const toggleLangmenu = () => {
        setLangMenuState(prev => !prev)
    };

    const closeMenu = () => {
        setLangMenuState(false)
    }

    Spawn(langMenuState, ".lang_options")

    return (
        <section className="lang_container">
            <button className="lang_button" onClick={toggleLangmenu}>
                <img src={flagSrc} alt="Bandiera" className="lang_flag" />
            </button>
            <ul className="lang_options" role="menu">
                {langMenuState &&
                    nations.map(nation => (
                        <li
                            key={nation.id}
                            className="lang_option"
                            onClick={() => handleChangeLanguage(nation.id)}
                            role="menuitem"
                        >
                            {t(nation.id)}
                        </li>
                    ))}
            </ul>
            <span className='lang_span'>
                {flagText}
            </span>
        </section>
    );
}

export default LangSelector
