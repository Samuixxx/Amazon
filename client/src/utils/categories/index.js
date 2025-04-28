/**
 * @file index.js
 * @description Questo file esporta un array che contiene un elenco di categorie di prodotto per un'applicazione e-commerce.
 *              Ogni categoria è rappresentata da un oggetto con un `id` univoco e un `name` che descrive la categoria.
 *              L'array è destinato a essere utilizzato per la visualizzazione e la gestione delle categorie nell'interfaccia utente.
 *
 * @array categories
 * @descrizione Array contenente le categorie di prodotto principali per il sito e-commerce.
 *              Ogni oggetto nell'array ha la seguente struttura:
 *              - id (stringa): Identificativo univoco della categoria, utilizzato per la gestione interna.
 *              - name (stringa): Nome della categoria che sarà visualizzato nell'interfaccia utente.
 *
 * @returns {Array} L'array delle categorie di prodotto.
 */

const categories = [
    { id: 'offers', name: 'Daily Offers' },
    { id: 'prime', name: 'Prime' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'books', name: 'Books' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home & Furniture' },
    { id: 'toys', name: 'Toys & Games' },
    { id: 'health-beauty', name: 'Health & Beauty' },
    { id: 'sports', name: 'Sports & Outdoors' },
    { id: 'arts-crafts', name: 'Arts & Crafts' },
    { id: 'jewelry-watches', name: 'Jewelry & Watches' },
    { id: 'tech-innovations', name: 'Tech & Innovations' }
];

export default categories;