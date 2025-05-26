import './MainPage.scss'
import MainPageSideBar from './sidebar/SideBar'
import Commerce from './comm/Commerce'

const MainPage = () => {
    return (
        <main className="main-page">
            <MainPageSideBar />
            <Commerce />
        </main>
    )
}

export default MainPage