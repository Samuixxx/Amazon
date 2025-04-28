/**
 * @file nations.js
 * @descrizione Contiene una lista centralizzata delle nazioni disponibili 
 *              per la selezione della lingua nel sito, insieme a un helper
 *              per recuperare l'immagine della bandiera corrispondente.
 *
 * @strutturaOggettoNazione
 * Ogni oggetto all'interno dell'array `nations` ha la seguente struttura:
 * - id: stringa univoca usata come identificativo e per cambiare lingua (es. 'it')
 * - name: stringa visualizzata nel menu (es. 'Italia')
 * - lang: codice lingua ISO (es. 'en', 'it', 'zh')
 * - flag: nome immagine associato (es. 'it' corrisponde a it.png)
 *
 * @funzioniEsportate
 * - nations: array di tutte le lingue disponibili
 * - getFlag: funzione che ritorna l'immagine della bandiera data una chiave linguistica
 */
import en from '../../assets/flags/en.png';
import it from '../../assets/flags/it.png';
import fr from '../../assets/flags/fr.png';
import de from '../../assets/flags/de.png';
import es from '../../assets/flags/es.png';
import cn from '../../assets/flags/cn.png';

const nations = [
    { id: 'it', name: 'Italia', lang: 'it', flag: 'it' },
    { id: 'en', name: 'Inglese', lang: 'en', flag: 'en' },
    { id: 'fr', name: 'Français', lang: 'fr', flag: 'fr' },
    { id: 'de', name: 'Deutsch', lang: 'de', flag: 'de' },
    { id: 'es', name: 'Español', lang: 'es', flag: 'es' },
    { id: 'cn', name: '中国 (Cina)', lang: 'zh', flag: 'zh' }
];

const flagMap = {
    it,
    en,
    fr,
    de,
    es,
    cn,
};

/**
 * @function getFlag
 * @param {string} lang - Codice lingua (es. 'it', 'en', 'fr', ...)
 * @returns {string} Percorso dell'immagine corrispondente alla bandiera
 * @descrizione Restituisce l'immagine della bandiera associata a un codice lingua.
 */
const getFlag = (lang) => flagMap[lang];

export { nations, getFlag };
