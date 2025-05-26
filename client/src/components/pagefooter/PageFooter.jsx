import './PageFooter.scss'
import { useTranslation } from "react-i18next"
import api from '../../axios'
import {
    faFacebookF,
    faInstagram,
    faXTwitter,
    faYoutube,
    faLinkedinIn,
    faCcVisa,
    faCcMastercard,
    faCcPaypal,
    faCcApplePay,
    faGooglePay
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PageFooter = () => {
    const { t, i18n } = useTranslation()

    const handleChangeLanguage = async (e) => {
        const lang = e.target.value
        i18n.changeLanguage(lang)

        try {
            await api.post("/api/preferences/setlang", { lang })
        } catch (error) {
            console.error("Errore durante l'impostazione della lingua:", error)
        }
    }

    return (
        <footer className="page-footer">
            <div className="footer-top">
                <div className="footer-section">
                    <h4>{t("footer.discover")}</h4>
                    <ul>
                        <li><a href="#">{t("footer.aboutUs")}</a></li>
                        <li><a href="#">{t("footer.careers")}</a></li>
                        <li><a href="#">{t("footer.affiliates")}</a></li>
                        <li><a href="#">{t("footer.blog")}</a></li>
                        <li><a href="#">{t("footer.sustainability")}</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>{t("footer.support")}</h4>
                    <ul>
                        <li><a href="#">{t("footer.contactUs")}</a></li>
                        <li><a href="#">{t("footer.returns")}</a></li>
                        <li><a href="#">{t("footer.shipping")}</a></li>
                        <li><a href="#">{t("footer.orderTracking")}</a></li>
                        <li><a href="#">{t("footer.faq")}</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>{t("footer.account")}</h4>
                    <ul>
                        <li><a href="#">{t("footer.login")}</a></li>
                        <li><a href="#">{t("footer.register")}</a></li>
                        <li><a href="#">{t("footer.orderHistory")}</a></li>
                        <li><a href="#">{t("footer.favorites")}</a></li>
                        <li><a href="#">{t("footer.newsletter")}</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>{t("footer.followUs")}</h4>
                    <ul className="social-links">
                        <li><a href="#"><FontAwesomeIcon icon={faFacebookF} /> Facebook</a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faInstagram} /> Instagram</a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faXTwitter} /> X (Twitter)</a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faYoutube} /> YouTube</a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faLinkedinIn} /> LinkedIn</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>{t("footer.paymentsAccepted")}</h4>
                    <div className="payment-methods">
                        <div className="payment-method">
                            <FontAwesomeIcon icon={faCcVisa} size="2x" className="payment-icon" />
                            <span>Visa</span>
                        </div>
                        <div className="payment-method">
                            <FontAwesomeIcon icon={faCcMastercard} size="2x" className="payment-icon" />
                            <span>Mastercard</span>
                        </div>
                        <div className="payment-method">
                            <FontAwesomeIcon icon={faCcPaypal} size="2x" className="payment-icon" />
                            <span>Paypal</span>
                        </div>
                        <div className="payment-method">
                            <FontAwesomeIcon icon={faCcApplePay} size="2x" className="payment-icon" />
                            <span>Apple Pay</span>
                        </div>
                        <div className="payment-method">
                            <FontAwesomeIcon icon={faGooglePay} size="2x" className="payment-icon" />
                            <span>Google Pay</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-left">
                    <p>&copy; 2025 ShopHub Inc. {t("footer.rightsReserved")}</p>
                    <ul>
                        <li><a href="#">{t("footer.terms")}</a></li>
                        <li><a href="#">{t("footer.privacy")}</a></li>
                        <li><a href="#">{t("footer.cookies")}</a></li>
                        <li><a href="#">{t("footer.cookieSettings")}</a></li>
                    </ul>
                </div>
                <div className="footer-right">
                    <select name="language" id="language-selector" onChange={handleChangeLanguage} defaultValue={i18n.language}>
                        <option value="it">🌐 {t("it")}</option>
                        <option value="en">🌐 {t("en")}</option>
                        <option value="fr">🌐 {t("fr")}</option>
                        <option value="de">🌐 {t("de")}</option>
                        <option value="fr">🌐 {t("es")}</option>
                        <option value="de">🌐 {t("cn")}</option>
                    </select>
                </div>
            </div>
        </footer>
    )
}

export default PageFooter
