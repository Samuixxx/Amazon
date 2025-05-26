import './Pageheader.scss'
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
