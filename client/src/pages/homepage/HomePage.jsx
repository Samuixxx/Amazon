/**
 * @file Home.js
 * @descrizione Componente principale della pagina Home che rende l'intestazione
 *              della pagina tramite il componente `Header`. Il componente `Home`
 *              è la vista iniziale della pagina e contiene la struttura di base 
 *              per l'interfaccia utente.
 *
 * @component
 * @param {void}
 *
 * @returns {JSX.Element} Un componente contenente l'intestazione della pagina,
 *                        rappresentato dal componente `Header`.
 */
import PageHeader from '../../components/pageheader/PageHeader'
import CategoriesNavbar from '../../components/categories/CategoriesNavbar'
import MainPage from '../../components/mainpage/MainPage'
import PageFooter from '../../components/pagefooter/PageFooter'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../features/user'
import api from '../../axios'
import { toast } from 'react-toastify'
import i18n from '../../i18n'

function Home() {

    const dispatch = useDispatch()

    useEffect(() => {
        const controller = new AbortController()
        const { signal } = controller

        const retriveUserData = async () => {
            try {
                const request = await api.get("/auth/spawn/findUserByRefreshToken", { signal })
                const response = request.data
                if (!response.ok) {
                    if (response.rfMissing) {
                        toast(<div>
                            {i18n.t("Welcome to ShopHub")}
                            <br />
                            {i18n.t("We hope you'll have a great experience")}
                        </div>, {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            pauseOnHover: false,
                            draggable: false
                        })
                    } else if (response.shouldDeleteToken) {
                        // chiedi al backend di eliminare accesstoken
                    }

                    return
                }

                const { userEmail, userDisplayName, userFamilyName } = response?.profile
                dispatch(setUser({ userEmail, userDisplayName, userFamilyName}))
            } catch (error) {
                console.error(error?.response?.data || error.message || error)
            }
        }

        retriveUserData()

        return () => {
            controller.abort()
        }
    }, [ dispatch ])

    return (
        <>
            <PageHeader />
            <CategoriesNavbar />
            <MainPage />
            <PageFooter />
        </>
    )
}

export default Home
