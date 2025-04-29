import { useTranslation } from "react-i18next"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

const FormStepTwo = ({ onNext, onBack, onChange }) => {
    const { t } = useTranslation()
    return (
        <form className="signup-form">
            <span className="signup-go-back-span" onClick={onBack}>
                <FontAwesomeIcon icon={faCircleArrowLeft} size="2x" className="back-icon"/>
            </span>
            <h1 className="signup-form-title">
                {t("Enter your shipping address")}
            </h1>
            <div className="input-container">
                <input type="text" name="addressone" id="address-first-container" className="input-field" />
                <label htmlFor="addressone" className="input-label">
                    {t("Address (Line 1)")}
                </label>
            </div>
            <div className="input-container">
                <input type="text" name="address_second" id="address-second-container" className="input-field" />
                <label htmlFor="address_second" className="input-label">
                    {t("Address (Line 2)")}
                </label>
            </div>
            <div className="input-container">
                <input type="text" name="city" id="city-container" className="input-field" />
                <label htmlFor="city" className="input-label">
                    {t("City")}
                </label>
            </div>
            <div className="input-container">
                <input type="text" name="postalcode" id="postal-code-container" className="input-field" />
                <label htmlFor="postalcode" className="input-label">
                    {t("Postal code")}
                </label>
            </div>
            <div className="input-container">
                <textarea name="specifications" id="specifications-container" className="input-field" maxLength={200}></textarea>
                <label htmlFor="specifications" className="input-label">
                    {t("Specifications")}
                </label>
            </div>
            <button type="submit" className="submit-button">
                {t("Proceed")}
            </button>
            <span className="signup-prompt">
                {t("Already have an account?")}
                <strong onClick={onChange}>
                    {t("Sign in")}
                </strong>
            </span>
        </form>
    )
}

export default FormStepTwo