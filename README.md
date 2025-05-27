<h1 id="-amazon-replica">🛒 Amazon Replica</h1>
<p><strong>Amazon Replica</strong> è una web application full-stack che replica le funzionalità principali dell’interfaccia utente e della logica server-side di Amazon. Il progetto è costruito con tecnologie moderne e un forte focus su sicurezza, performance e scalabilità.</p>
<hr />
<h2 id="-stack-tecnologico">🚀 Stack Tecnologico</h2>
<h3 id="frontend">Frontend</h3>
<ul>
<li>⚛️ <strong>React</strong> — UI moderna e component-based</li>
<li>🎨 <strong>SCSS</strong> — Styling modulare e responsive</li>
<li>📦 <strong>Webpack &amp; Babel</strong> (integrati via Create React App)</li>
<li><strong>Librerie principali</strong>:
<ul>
<li><code>@fortawesome/fontawesome-svg-core</code>, <code>@fortawesome/free-brands-svg-icons</code>, <code>@fortawesome/free-solid-svg-icons</code>, <code>@fortawesome/react-fontawesome</code>: Set di icone e componenti React per Font Awesome.</li>
<li><code>@google/model-viewer</code>: Componente web per visualizzare modelli 3D sul web.</li>
<li><code>@reduxjs/toolkit</code>, <code>react-redux</code>, <code>redux-persist</code>: Strumenti per una gestione efficiente dello stato globale e la sua persistenza.</li>
<li><code>@testing-library/dom</code>, <code>@testing-library/jest-dom</code>, <code>@testing-library/react</code>, <code>@testing-library/user-event</code>: Utilities per testare componenti React in modo efficace.</li>
<li><code>axios</code>: Client HTTP per effettuare richieste al backend.</li>
<li><code>bootstrap</code>: Framework front-end per lo sviluppo rapido di interfacce responsive.</li>
<li><code>dayjs</code>: Libreria leggera per l'analisi, la manipolazione e la formattazione di date e orari.</li>
<li><code>dompurify</code>: Una libreria per sanificare HTML, prevenendo attacchi XSS.</li>
<li><code>framer-motion</code>, <code>gsap</code>: Potenti librerie per creare animazioni fluide e complesse nell'interfaccia utente.</li>
<li><code>i18next</code>, <code>i18next-browser-languagedetector</code>, <code>react-i18next</code>: Strumenti per l'internazionalizzazione dell'applicazione, permettendo il supporto multilingua.</li>
<li><code>jose</code>: Implementazione JavaScript di JSON Object Signing and Encryption.</li>
<li><code>react-intersection-observer</code>: Hook React per rilevare quando un elemento entra o esce dal viewport.</li>
<li><code>react-select</code>: Un componente di selezione altamente flessibile e personalizzabile per React.</li>
<li><code>react-toastify</code>: Un componente React per visualizzare notifiche toast.</li>
<li><code>validator</code>: Libreria per la validazione di stringhe, utile per input form.</li>
<li><code>zustand</code>: Una soluzione di gestione dello stato leggera e scalabile.</li>
</ul>
</li>
</ul>
<h3 id="backend">Backend</h3>
<ul>
<li>🧠 <strong>Express.js</strong> — Server Node.js con routing flessibile</li>
<li>📄 <strong>HTTPS</strong> — Connessione cifrata con certificati locali</li>
<li>🔐 <strong>Sicurezza avanzata</strong> — Helmet, XSS-Clean, HPP, Rate Limiting, CORS</li>
<li>⚙️ <strong>Middleware</strong> — Logging (Morgan), parsing (body/cookie), compression</li>
<li><strong>Librerie principali</strong>:
<ul>
<li><code>axios</code>: Client HTTP per effettuare richieste esterne.</li>
<li><code>bcrypt</code>, <code>bcryptjs</code>: Librerie per l'hashing delle password.</li>
<li><code>compression</code>: Middleware per la compressione delle risposte HTTP.</li>
<li><code>connect-redis</code>, <code>ioredis</code>, <code>redis</code>: Integrazione con Redis per la gestione delle sessioni e del caching.</li>
<li><code>cookie-parser</code>: Middleware per il parsing dei cookie.</li>
<li><code>cors</code>: Middleware per abilitare il Cross-Origin Resource Sharing.</li>
<li><code>crypto</code>: Modulo nativo di Node.js per funzionalità crittografiche.</li>
<li><code>dotenv</code>: Carica variabili d'ambiente da un file <code>.env</code>.</li>
<li><code>express</code>: Framework web per Node.js.</li>
<li><code>express-rate-limit</code>: Middleware per limitare le richieste ripetute a API pubbliche/endpoint.</li>
<li><code>express-session</code>: Middleware per la gestione delle sessioni.</li>
<li><code>express-validator</code>: Middleware per la validazione e sanificazione dei dati in ingresso.</li>
<li><code>form-data</code>: Per la creazione di richieste <code>multipart/form-data</code>.</li>
<li><code>fs</code>: Modulo nativo di Node.js per interagire con il file system.</li>
<li><code>helmet</code>: Raccolta di middleware per impostare header HTTP legati alla sicurezza.</li>
<li><code>hpp</code>: Protezione dalla pollution dei parametri HTTP.</li>
<li><code>https</code>: Modulo nativo di Node.js per creare server HTTPS.</li>
<li><code>i18next</code>, <code>i18next-fs-backend</code>, <code>i18next-http-middleware</code>: Internazionalizzazione lato server.</li>
<li><code>joi</code>: Schema description language e data validator per JavaScript.</li>
<li><code>JSONStream</code>: Streaming di dati JSON.</li>
<li><code>jsonwebtoken</code>: Implementazione di JSON Web Tokens per l'autenticazione.</li>
<li><code>libphonenumber-js</code>: Libreria per la validazione e formattazione di numeri di telefono.</li>
<li><code>mailgun.js</code>: SDK per interagire con l'API Mailgun per l'invio di email.</li>
<li><code>morgan</code>: Middleware di logging per le richieste HTTP.</li>
<li><code>multer</code>: Middleware per la gestione di upload di file.</li>
<li><code>nodemailer</code>: Modulo per l'invio di email da Node.js.</li>
<li><code>passport</code>, <code>passport-google-oauth20</code>, <code>passport-local</code>: Framework di autenticazione con strategie per Google OAuth2.0 e autenticazione locale.</li>
<li><code>path</code>: Modulo nativo di Node.js per la gestione dei percorsi di file.</li>
<li><code>pg</code>: Client PostgreSQL per Node.js.</li>
<li><code>postcode-validator</code>: Validatore di codici postali.</li>
<li><code>sanitize-html</code>: Libreria per sanificare HTML.</li>
<li><code>twilio</code>: SDK per interagire con l'API Twilio per SMS e chiamate.</li>
<li><code>uuid</code>: Generatore di UUID (Universally Unique Identifiers).</li>
<li><code>xss</code>, <code>xss-clean</code>: Prevenzione dagli attacchi Cross-Site Scripting.</li>
</ul>
</li>
</ul>
<h3 id="database">Database</h3>
<ul>
<li>🐘 <strong>PostgreSQL</strong> — Database relazionale potente e robusto</li>
</ul>
<h3 id="dipendenze-root-del-progetto">Dipendenze Root del Progetto</h3>
<ul>
<li><code>concurrently</code>: Utility per eseguire più comandi in parallelo.</li>
<li><code>crypto</code>: (Già menzionato nel backend, ma incluso anche qui a livello di root)</li>
</ul>
<hr />
<h2 id="-sicurezza">🛡️ Sicurezza</h2>
<p>Il progetto implementa una serie di best practice per garantire la sicurezza dell'applicazione:</p>
<ul>
<li><strong>Header di sicurezza</strong> tramite <code>helmet</code></li>
<li><strong>Limitazione delle richieste</strong> (<code>express-rate-limit</code>)</li>
<li><strong>Protezione da XSS e parametri malevoli</strong> (<code>xss-clean</code>, <code>hpp</code>)</li>
<li><strong>Connessione HTTPS</strong> con certificati SSL locali</li>
<li><strong>Politiche CORS</strong> configurate per ambienti cross-origin sicuri</li>
</ul>
<hr />
<h2 id="-struttura-del-progetto">📁 Struttura del Progetto</h2>
<pre><code>Amazon/
├── client/                 # Frontend React
|   ├── public              # Cartella che serve index.html per la renderizzazione
│   └── src/
│       ├── components/
│       ├── styles/
│       └── utils/
|       └── index.js        # Entry point del rendering React
|
├── server/                 # Backend Express
│   ├── .env                # Variabili d'ambiente
│   └── index.js            # Entrypoint del server
├── ssl/                    # Certificati HTTPS
├── uploads/                # Cartella statica dove multer carica i file, servita staticamente da express
│   ├── product             # Variabili d'ambiente
│       └── images          # Immagini di listino (default)
|       └── models          # Models di listino (default)
├── .gitignore              # File da non caricare su Github
├── README.md
└── package.json
</code></pre>
<hr />
<h2 id="-setup-amp-avvio">🔧 Setup &amp; Avvio</h2>
<h3 id="1-clona-il-repository">1. Clona il repository</h3>
<pre><code class="language-bash">git clone https://github.com/Samuixxx/Amazon.git
cd amazonreplica
</code></pre>
<h3 id="2-installa-le-dipendenze">2. Installa le dipendenze</h3>
<p># Backend</p>
<pre><code class="language-bash">cd server
npm install
</code></pre>
<p># Frontend</p>
<pre><code class="language-bash">cd ../client
npm install
</code></pre>
<h3 id="3-avvia-lambiente-di-sviluppo">3. Avvia l’ambiente di sviluppo</h3>
<pre><code class="language-bash">npm run dev
</code></pre>
<p>Assicurati di avere i certificati SSL (<code>key.pem</code>, <code>cert.pem</code>) nella directory <code>ssl/</code>.</p>
<hr />
<h2 id="-variabili-dambiente">🌐 Variabili d’Ambiente</h2>
<p>Esempio di file <code>.env</code> per il server:</p>
<pre><code class="language-dotenv">SERVER_PORT=443
CLIENT_BUILD_PATH=../client/build
</code></pre>
<hr />
<h2 id="-build-di-produzione">🛠️ Build di Produzione</h2>
<p>Per generare la versione ottimizzata del frontend:</p>
<pre><code class="language-bash">cd client
npm run build
</code></pre>
<p>Il backend in modalità <code>production</code> servirà automaticamente i file dalla cartella <code>build</code>.</p>
<hr />
<h2 id="-licenza">📜 Licenza</h2>
<p>Questo progetto è distribuito sotto licenza <strong>MIT</strong>. Consulta il file LICENSE per ulteriori dettagli.</p>
<hr />
<h2 id="-contatti">✉️ Contatti</h2>
<p>Sviluppato con passione da <a href="https://github.com/Samuixxx">@Samuixxx</a><br />📫 Per feedback o collaborazioni: <a href="mailto:fnidentix@gmail.com">fnidentix@gmail.com</a></p>
