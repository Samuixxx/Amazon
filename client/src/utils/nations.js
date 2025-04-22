// ──────────────────────────────────────────────
// 📁 File: utils/nations.js
// 📝 Descrizione: Lista centralizzata delle nazioni disponibili 
//                per la selezione della lingua nel sito.
// 🧩 Ogni voce contiene:
//     - id: identificatore univoco (es. 'it')
//     - name: nome visualizzato (es. 'Italia')
//     - lang: codice lingua (es. 'it', 'en', 'zh')
// 🔄 Utilizzo: importare nel componente <Langmenu /> o altri
//              punti dell'app che richiedono supporto multilingua.
// ──────────────────────────────────────────────

const nations = [
    { id: 'it', name: 'Italia', lang: 'it' },
    { id: 'en', name: 'Inglese', lang: 'en' },
    { id: 'fr', name: 'Français', lang: 'fr' },
    { id: 'de', name: 'Deutsch', lang: 'de' },
    { id: 'es', name: 'Español', lang: 'es' },
    { id: 'cn', name: '中国 (Cina)', lang: 'zh' } // 👈 aggiunta la Cina
  ];
  
  export default nations;
  