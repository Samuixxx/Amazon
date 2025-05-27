import './CustomerReviews.scss'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

const StarRating = ({ rating }) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<span key={i} style={{ color: '#f5a623' }}>★</span>) // piena
        } else {
            stars.push(<span key={i} style={{ color: '#ccc' }}>☆</span>) // vuota
        }
    }
    return <div style={{ fontSize: '1.2rem' }}>{stars}</div>
}

const capitalizeName = (name) => {
    return name
        .split(' ')
        .map(n => n.charAt(0).toUpperCase() + n.slice(1))
        .join(' ')
}

const CustomerReviews = ({ items }) => {
    const { t } = useTranslation()
    return (
        <div className="customers-reviews__container">
            <h2>{t("Reviews title")}</h2>
            {items.map(({ rating, text, reviser, timestamp }, i) => (
                <div key={i} className="customers-reviews__item">
                    <strong className="customers-reviews__reviser">{capitalizeName(reviser)}</strong>
                    <div className="customers-reviews__header">
                        <StarRating rating={rating} className="star-rating" />
                        <small className="customers-reviews__date">{dayjs(timestamp).format('DD/MM/YY')}</small>
                    </div>
                    <p className="customers-reviews__text">{text}</p>
                </div>
            ))}
        </div>

    )
}

export default CustomerReviews
