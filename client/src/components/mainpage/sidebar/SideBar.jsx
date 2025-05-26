import './SideBar.scss'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useUIStore } from '../../../app/store/uistore'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import CategoriesSection from './categoriesection/CategoriesSection'
import PaymentAndShippingSection from './paymentandshippingsection/PaymentAndShippingSection'
import OrdersHandlerSection from './ordershandlersection/OrdersHandlerSection'
import ProfileSection from './profilesection/ProfileSection'
import SettingsSection from './settingsection/SettingsSection'

const MainPageSideBar = () => {
    const isSidebarOpen = useUIStore(state => state.sidebarOpen)
    const setSidebarOpen = useUIStore(state => state.setSidebarOpen)
    const userDisplayName = useSelector(state => state.user.userDisplayName)
    const { t } = useTranslation()
    const sidebarRef = useRef(null)
    const location = useLocation()

    useEffect(() => {
        setSidebarOpen(false)
    }, [location.pathname])
    
    useEffect(() => {
        if(!isSidebarOpen && sidebarRef.current) {
            sidebarRef.current.scrollTop = 0
        }
    }, [ sidebarRef, isSidebarOpen ])

    return (
        <motion.aside
            ref={sidebarRef}
            className='main-page-sidebar'
            initial={{ x: '-100%' }}
            animate={{ x: isSidebarOpen ? 0 : '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            <section className="signup-container">
                <FontAwesomeIcon icon={faUserSecret} size='xl'/>
                { userDisplayName 
                ? t("Welcome, {{name}}", { name: userDisplayName })
                : t("Welcome, Sign in")
                }
            </section>
            <CategoriesSection />
            <PaymentAndShippingSection />
            <OrdersHandlerSection />
            <ProfileSection />
            <SettingsSection />
        </motion.aside>
    )
}

export default MainPageSideBar