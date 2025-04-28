/**
 * @file Header.jsx
 * @descrizione Componente React che rappresenta l'intestazione della pagina,
 *              includendo il logo, il titolo e una barra di navigazione.
 *              La barra di navigazione contiene componenti per la selezione della lingua,
 *              il carrello, la ricerca, la sezione ordini e resi, e il menu del profilo.
 *              Il titolo "ShopHub" è fisso e il logo è dinamicamente caricato tramite un'immagine.
 *
 * @component
 * @param {void}
 *
 * @returns {JSX.Element} Un'intestazione con logo, titolo e barra di navigazione
 *                        che include vari componenti interattivi per l'utente.
 */
import './Pageheader.scss';
import logo from '../../assets/logo.png'
import { nations } from '../../utils/langs/nations'
import LangSelector from './LangSelector'
import SearchBar from './SearchBar'
import CartSelector from './CartSelector'
import OrdersAndReturnsSelector from './OrdersAndReturnsSelector'
import ProfileMenu from './ProfileMenu'

const PageHeader = () => {
    return (
        <header className="homepage_header">
            <img src={logo} alt="Logo" className="homepage_logo" />
            <h1 className="homepage_title">ShopHub</h1>
            <nav className="homepage_nav">
                <LangSelector nations={nations} />
                <CartSelector />
                <SearchBar />
                <OrdersAndReturnsSelector />
                <ProfileMenu />
            </nav>
        </header>
    );
}

export default PageHeader
