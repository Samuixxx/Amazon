/**
 * @file ProfileMenu.jsx
 * @descrizione Componente React che mostra il menu del profilo utente,
 *              con un messaggio di benvenuto che cambia dinamicamente
 *              in base alla lingua selezionata tramite la libreria i18next.
 *              Il testo visualizzato sarà tradotto in base alla lingua corrente.
 *
 * @component
 * @param {void}
 *
 * @returns {JSX.Element} Un elemento di sezione contenente il messaggio di benvenuto
 *                        che si adatta alla lingua dell'utente.
 */
import './ProfileMenu.scss'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const ProfileMenu = () => {

    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <section className="profile_menu_container" onClick={ () => navigate("/auth") }>
            <h2 className="profile_menu_ref">
                {t('Welcome, Sign in')}
            </h2>
        </section>
    )
}

export default ProfileMenu