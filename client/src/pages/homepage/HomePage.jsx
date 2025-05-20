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

function Home(){
    return (
        <>
            <PageHeader />
            <CategoriesNavbar /> 
            <MainPage />
        </>
    )
}

export default Home
