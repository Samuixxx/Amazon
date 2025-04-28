/**
 * @file OrdersAndReturnsSelector.jsx
 * @descrizione Componente React che mostra un'icona e un titolo per la sezione
 *              "Ordini e Resi". Utilizza un elemento `<picture>` per fornire
 *              versioni ottimizzate dell'immagine in vari formati (WebP, PNG, TIFF, JPG)
 *              in base al supporto del browser. Il titolo è dinamicamente tradotto
 *              utilizzando la libreria i18next.
 *
 * @component
 * @param {void}
 *
 * @returns {JSX.Element} Un elemento di sezione contenente un'icona di "Ordini e Resi"
 *                        e il relativo titolo, con supporto per diversi formati immagine.
 */
import './OrdersAndReturnsSelector.scss'
import { useTranslation } from 'react-i18next'
import logoWebp from '../../assets/ordersandreturns/orders.webp'
import logoTiff from '../../assets/ordersandreturns/orders.tiff'
import logoPng from '../../assets/ordersandreturns/orders.png'
import logoJpg from '../../assets/ordersandreturns/orders.jpg'

const OrdersAndReturnsSelector = () => {
    const { t } = useTranslation()

    return (
        <section className="orders_and_returns_container">
           <picture className="orders_and_returns_picture">
                <source srcSet={logoWebp} type="image/webp" />
                <source srcSet={logoPng} type="image/png" />
                <source srcSet={logoTiff} type="image/tiff" />
                <source srcSet={logoJpg} type="image/jpg" />
                <img src={logoPng} alt="Icona Ordini e Resi" className="orders_and_returns_logo"/>
            </picture>
            <h2 className="orders_and_returns_ref">
                {t('Orders and returns')}
            </h2>
        </section>
    )
}

export default OrdersAndReturnsSelector