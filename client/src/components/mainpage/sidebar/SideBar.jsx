import './SideBar.scss'
import { useUIStore } from '../../../app/store/uistore'
import { motion } from 'framer-motion'

const MainPageSideBar = () => {
    const isSiderbarOpen = useUIStore(state => state.sidebarOpen)

    return (
        <motion.aside
            className='main-page-sidebar'
            initial={{ x: '-100%' }}
            animate={{ x: isSiderbarOpen ? 0 : '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            cracrapu
        </motion.aside>
    )
}

export default MainPageSideBar