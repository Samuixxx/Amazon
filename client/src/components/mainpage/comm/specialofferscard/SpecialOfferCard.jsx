import './SpecialOfferCard.scss'
import '@google/model-viewer'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


const SpecialOfferCard = ({ product_id, name, discount, end_date, model_path, image_path }) => {
    const { t } = useTranslation()
    const formattedEndDate = dayjs(end_date).format('MM-DD')
    const formattedDiscount = discount.split('.')[0]

    return (
        <article className="special-offer-card" key={product_id}>
            <h2 className="special-offer-card-title">{name}</h2>

            {model_path ? (
                <model-viewer
                    src={model_path ? `${process.env.REACT_APP_API_URL}${model_path}` : undefined}
                    className="special-offer-model"
                    alt="3D model of a product"
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    camera-controls
                    touch-action="pan-y"
                    shadow-intensity={1}
                    autoplay
                    exposure={1}
                    camera-orbit="0deg 90deg 6m"
                    field-of-view="30deg"
                />
            ) : (
                image_path ? (
                    <img
                        src={image_path ? `${process.env.REACT_APP_API_URL}${image_path}` : ''}
                        className="special-offer-image"
                        alt="Immagine non trovata"
                    />
                ) : (
                    <p>Immagine non disponibile</p> // oppure null o un placeholder
                )
            )}

            <span className="special-offer-end-time">{t(`Valid until`, { endDate: formattedEndDate })}</span>
            <span className="special-offer-discount">{t(`Of discount`, { discount: formattedDiscount })}</span>
            <span className="special-offer-go-to">{t("See")}
                <FontAwesomeIcon icon={faArrowRight} size='xs' />
            </span>
        </article>
    )
}

export default SpecialOfferCard
