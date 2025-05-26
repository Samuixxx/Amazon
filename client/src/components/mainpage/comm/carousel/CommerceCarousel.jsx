import './CommerceCarousel.scss'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import cinema from '../../../../assets/maincarousel/cinema.webp'
import ecohome from '../../../../assets/maincarousel/ecohome.webp'
import homeparts from '../../../../assets/maincarousel/homeparts.webp'
import offers from '../../../../assets/maincarousel/offers.webp'
import shippingservice from '../../../../assets/maincarousel/shippingservice.webp'
import tech from '../../../../assets/maincarousel/tech.webp'

const CommerceCarousel = () => {
    const { t } = useTranslation()
    const [step, setStep] = useState(0)

    const carouselData = [
        { image: cinema, text: t("Elevate movie nights with top cinema gear") },
        { image: ecohome, text: t("Eco-friendly style for your home") },
        { image: homeparts, text: t("Essentials to upgrade every room") },
        { image: offers, text: t("Best deals to save you more") },
        { image: shippingservice, text: t("Fast, reliable delivery") },
        { image: tech, text: t("Smart tech for modern living") },
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setStep(prev => (prev + 1) % carouselData.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [carouselData.length])

    const handleNext = () => setStep(prev => (prev + 1) % carouselData.length)
    const handlePrev = () => setStep(prev => (prev - 1 + carouselData.length) % carouselData.length)

    return (
        <div className="carousel-container">
            <button onClick={handlePrev} className="carousel-arrow">
                <FontAwesomeIcon icon={faArrowLeft} size="3x" />
            </button>

            <div className="carousel-slide">
                <img
                    src={carouselData[step].image}
                    alt={t("Banner")}
                    className="carousel-image"
                />
                <h2 className="carousel-image-description">
                    {carouselData[step].text}
                </h2>
            </div>

            <button onClick={handleNext} className="carousel-arrow">
                <FontAwesomeIcon icon={faArrowRight} size="3x" />
            </button>
        </div>
    )
}

export default CommerceCarousel
