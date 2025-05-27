# 🛒 Shophub

**Amazon Replica** è una web application full-stack che replica le funzionalità principali dell’interfaccia utente e della logica server-side di Amazon. Il progetto è costruito con tecnologie moderne e un forte focus su sicurezza, performance e scalabilità.

---

## 🚀 Stack Tecnologico

### Frontend
- ⚛️ **React** — UI moderna e component-based
- 🎨 **SCSS** — Styling modulare e responsive
- 📦 **Webpack & Babel** (integrati via Create React App)

### Backend
- 🧠 **Express.js** — Server Node.js con routing flessibile
- 📄 **HTTPS** — Connessione cifrata con certificati locali
- 🔐 **Sicurezza avanzata** — Helmet, XSS-Clean, HPP, Rate Limiting, CORS
- ⚙️ **Middleware** — Logging (Morgan), parsing (body/cookie), compression

### Database
- 🐘 **PostgreSQL** — Database relazionale potente e robusto

---

## 🛡️ Sicurezza

Il progetto implementa una serie di best practice per garantire la sicurezza dell'applicazione:
- **Header di sicurezza** tramite `helmet`
- **Limitazione delle richieste** (`express-rate-limit`)
- **Protezione da XSS e parametri malevoli** (`xss-clean`, `hpp`)
- **Connessione HTTPS** con certificati SSL locali
- **Politiche CORS** configurate per ambienti cross-origin sicuri

---

## 📁 Struttura del Progetto

```bash
amazonreplica/
├── client/                # Frontend React
│   └── src/
│       ├── components/
│       ├── styles/
│       └── utils/
├── server/                # Backend Express
│   ├── routers            # Express routers
│   ├── .env               # Variabili d'ambiente
│   └── index.js           # Entrypoint del server
├── ssl/ 
├── .gitignore
├── README.md
└── package.json
└── db_backup.sql
```
---

## 🔧 Setup & Avvio

### 1. Clona il repository

```bash
git clone https://github.com/Samuixxx/Amazon.git
cd Amazon
```

### 2. Installa le dipendenze
# Root
```bash
npm install
```

# Backend

```bash
cd server
npm install
```

# Frontend

```bash
cd ../client
npm install
```

### 3. Avvia l’ambiente di sviluppo

```bash
npm run dev
```

Assicurati di avere i certificati SSL (`key.pem`, `cert.pem`) nella directory `server/ssl`.

---

## 🌐 Variabili d’Ambiente

Esempio di file `.env` per il server:

```.env
SERVER_PORT=8433
CLIENT_BUILD_PATH=../client/build
```

---

## 🛠️ Build di Produzione

Per generare la versione ottimizzata del frontend:

```bash
cd client
npm run build
```

Il backend in modalità `production` servirà automaticamente i file dalla cartella `build`.

---

## 📜 Licenza

Questo progetto è distribuito sotto licenza **MIT**. Consulta il file LICENSE per ulteriori dettagli.

---

## ✉️ Contatti

Sviluppato con passione da [@Samuixxx](https://github.com/Samuixxx)  
📫 Per feedback o collaborazioni: fnidentix@gmail.com

