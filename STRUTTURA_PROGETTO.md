# 📚 Struttura Progetto - Simulatore EPS

## 🎯 Panoramica

Applicazione web completa per la preparazione all'esame di **Elementi di Probabilità e Statistica**.

### 📊 Statistiche Progetto
- **3 Quiz interattivi** (33 domande totali)
- **2 Simulatori d'esame** con timer
- **1 Simulatore R** con 15 esercizi guidati
- **File R scaricabili** per RStudio
- **Architettura modulare** e scalabile

---

## 📁 Struttura Directory

\`\`\`
EPS/
├── 📄 index.html                    # Entry point HTML
├── 📄 package.json                  # Dipendenze npm
├── 📄 vite.config.js               # Configurazione Vite
├── 📄 .gitignore                   # File da ignorare in git
│
├── 📂 src/                         # Codice sorgente React
│   ├── 📄 main.jsx                 # Bootstrap React
│   ├── 📄 App.jsx                  # Router principale
│   │
│   ├── 📂 components/
│   │   ├── 📂 quiz/                # Quiz di pratica
│   │   │   ├── EPSQuizApp.jsx      # Quiz generale (10 domande)
│   │   │   └── QuizEsameReale.jsx  # Quiz avanzato da esami (10 domande)
│   │   │
│   │   ├── 📂 exams/               # Simulatori d'esame
│   │   │   ├── EPSExamSimulator.jsx  # Simulatore completo (20 min, 4 parti)
│   │   │   └── Quiz18Feb.jsx         # Esame 18 Feb 2021 (15 domande)
│   │   │
│   │   ├── 📂 R-quiz/              # Simulatore R
│   │   │   └── quiz-1.jsx          # 15 esercizi R interattivi
│   │   │
│   │   └── 📂 layout/              # Componenti di layout
│   │       ├── HomePage.jsx        # Homepage con card categorie
│   │       ├── Header.jsx          # Barra navigazione
│   │       └── CategoryCard.jsx    # Card categoria riutilizzabile
│   │
│   ├── 📂 data/
│   │   └── categories.js           # Configurazione quiz/esami
│   │
│   ├── 📂 utils/                   # Funzioni utilità (future)
│   └── 📂 styles/                  # CSS custom (future)
│
├── 📂 public/                      # File statici pubblici
│   └── 📂 r-scripts/               # Script R scaricabili
│       ├── esame18Febbraio21.r
│       └── guida.r
│
└── 📂 docs/                        # Documentazione
    └── 📂 esempi-R/                # Archivio script R
        ├── esame18Febbraio21.r
        └── guida.r
\`\`\`

---

## 🧩 Componenti Principali

### 1. **Homepage** (\`src/components/layout/HomePage.jsx\`)
- Visualizzazione categorizzata di quiz e simulatori
- Card interattive con descrizioni e tag argomenti
- Sezione "Come funziona" con guida passo-passo
- Design responsive mobile-first

### 2. **Quiz di Pratica**

#### a) **Quiz EPS Generale** (\`EPSQuizApp.jsx\`)
- 10 domande su Probabilità, Statistica, R, Teoria
- Feedback immediato con spiegazioni
- Barra di progresso visiva
- Categorie con icone colorate

#### b) **Quiz da Esami Reali** (\`QuizEsameReale.jsx\`) ⭐ NUOVO
- 10 domande avanzate da esami Feb 2021 e Lug 2025
- Livelli difficoltà (⭐ → ⭐⭐⭐⭐)
- Navigazione tra domande
- Spiegazioni dettagliate con codice R
- Argomenti: Esponenziale avanzato, Test paired, Probabilità condizionata, Sistemi

#### c) **Simulatore R Interattivo** (\`SimulatoreR.jsx\`) 🔬 NUOVO
- 15 esercizi progressivi da esami reali
- Console R simulata con editor codice
- Verifica automatica risposte
- Hint e soluzioni
- Barra progresso
- Riferimento rapido comandi R
- Categorie: Caricamento dati, Statistiche, Test t, Regressione, Proporzioni

### 3. **Simulatori d'Esame**

#### a) **Simulatore Completo** (\`EPSExamSimulator.jsx\`)
- Timer 20 minuti con countdown
- 4 sezioni: Analisi Descrittiva (6pt), Test Ipotesi (4pt), Probabilità (4pt), Teoria (6pt)
- Navigazione tra sezioni
- Punteggio dettagliato per sezione
- Correzione completa con feedback
- Soglia superamento: 12/20

#### b) **Esame 18 Febbraio 2021** (\`Quiz18Feb.jsx\`)
- 15 domande da esame reale
- Argomenti: Geometrica, Esponenziale, Test t Appaiato, R
- Link download script R associato
- Spiegazioni con formule

---

## 🎨 Design System

### Colori
- **Quiz:** Verde (#4caf50 → #66bb6a)
- **Simulatori:** Blu (#2196f3 → #42a5f5)
- **R Interattivo:** Indaco (#3f51b5 → #5c6bc0)
- **Successo:** Verde (#4caf50)
- **Errore:** Rosso (#f44336)
- **Warning:** Arancione (#ff9800)

### Tipografia
- **Font:** System UI (native)
- **Code:** Consolas, Monaco, monospace

### Icone (Lucide React)
- BookOpen: Quiz
- GraduationCap: Simulatori
- Terminal: R Console
- CheckCircle: Risposta corretta
- XCircle: Risposta errata
- Clock: Timer
- FileCode: Script R

---

## 🔧 Tecnologie

| Tecnologia | Versione | Uso |
|------------|----------|-----|
| **React** | 18.2.0 | Framework UI |
| **Vite** | 4.4.5 | Build tool veloce |
| **Lucide React** | 0.263.1 | Libreria icone |
| **Tailwind CSS** | CDN | Styling (via CDN) |

---

## 🚀 Comandi Disponibili

\`\`\`bash
# Installazione dipendenze
npm install

# Avvio dev server (porta 3000)
npm start
# oppure
npm run dev

# Build produzione
npm run build

# Anteprima build
npm run preview
\`\`\`

---

## 📦 Aggiungere Nuovi Contenuti

### Aggiungere Quiz

1. **Crea componente** in \`src/components/quiz/NuovoQuiz.jsx\`
2. **Registra in** \`src/data/categories.js\`:
\`\`\`javascript
{
    id: 'nuovo-quiz',
    name: 'Nome Quiz',
    description: 'Descrizione',
    component: 'NuovoQuiz',
    topics: ['Topic1', 'Topic2']
}
\`\`\`
3. **Importa in** \`src/App.jsx\`:
\`\`\`javascript
import NuovoQuiz from './components/quiz/NuovoQuiz';

// Nel renderComponent():
case 'NuovoQuiz':
    return <NuovoQuiz />;
\`\`\`

### Aggiungere Script R Scaricabile

1. Metti file \`.r\` in \`public/r-scripts/\`
2. Aggiungi riferimento in \`categories.js\`:
\`\`\`javascript
{
    rScript: '/r-scripts/nomefile.r',
    rScriptName: 'nomefile.r'
}
\`\`\`

---

## 🎓 Funzionalità per Categoria

### Quiz di Pratica (3 quiz, 35 domande)
| Quiz | Domande | Difficoltà | Argomenti |
|------|---------|------------|-----------|
| Quiz Generale | 10 | Base | Probabilità, Statistica, R, Teoria |
| Quiz Esami Reali | 10 | Avanzato | Esponenziale, Test, Prob. Condiz. |
| Simulatore R | 15 | Progressivo | Comandi R, Analisi, Test, Regressione |

### Simulatori Esami (2 simulatori)
| Simulatore | Tempo | Punti | Parti |
|------------|-------|-------|-------|
| Completo | 20 min | 20 | 4 (Analisi, Test, Prob, Teoria) |
| 18 Feb 2021 | Libero | 15 | 1 (Completo) |

---

## 📊 Copertura Argomenti

### ✅ Probabilità
- [x] Distribuzione Esponenziale (media, varianza, P(X>t))
- [x] Probabilità condizionata
- [x] Proprietà memoryless
- [x] Distribuzione Geometrica
- [x] Probabilità classica / Combinatoria
- [x] Sistemi di componenti

### ✅ Statistica
- [x] Statistiche descrittive (media, mediana, sd, quantili)
- [x] Test t paired
- [x] Test proporzioni (binom.test)
- [x] Interpretazione p-value
- [x] Correlazione (cor.test)
- [x] Regressione lineare (lm)
- [x] R² (bontà modello)
- [x] Outlier (metodo IQR)

### ✅ R Programming
- [x] Caricamento dati (load, read.csv)
- [x] Filtraggio (\`df$var[condizione]\`)
- [x] Statistiche con na.rm=TRUE
- [x] Contare con sum(condizione)
- [x] Visualizzazioni (plot, boxplot)
- [x] Test ipotesi (t.test, binom.test)
- [x] Estrazione risultati (test$p.value)

### ✅ Teoria
- [x] Legge Grandi Numeri
- [x] Teorema Limite Centrale
- [x] Statistica vs Parametro
- [x] Stimare vs Calcolare
- [x] Campione vs Popolazione

---

## 🎯 Prossimi Sviluppi (Future Features)

### Priorità Alta
- [ ] Modalità dark mode
- [ ] Salvataggio progressi (localStorage)
- [ ] Esportazione risultati PDF
- [ ] Timer personalizzabile per simulatori

### Priorità Media
- [ ] Quiz su Variabili Discrete (Binomiale, Poisson)
- [ ] Simulatore ggplot2
- [ ] Flashcard teoria interattive
- [ ] Modalità allenamento mirato

### Priorità Bassa
- [ ] Backend per analytics
- [ ] Leaderboard punteggi
- [ ] Modalità multiplayer
- [ ] AI tutor con suggerimenti

---

## 🐛 Troubleshooting

### Problema: npm start non funziona
**Soluzione:**
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
npm start
\`\`\`

### Problema: Errori compilazione React
**Soluzione:** Verifica che tutte le importazioni siano corrette in \`App.jsx\`

### Problema: Script R non scaricabili
**Soluzione:** Verifica che i file siano in \`public/r-scripts/\` (non \`src\`)

---

## 📝 Convenzioni Codice

### Naming
- **Componenti:** PascalCase (\`EPSQuizApp.jsx\`)
- **File dati:** camelCase (\`categories.js\`)
- **Variabili:** camelCase (\`currentQuestion\`)
- **Costanti:** UPPER_SNAKE_CASE (se esistono)

### Struttura Componenti
\`\`\`jsx
// 1. Import
import React, { useState } from 'react';

// 2. Componente
const MyComponent = () => {
    // 3. State
    const [state, setState] = useState();
    
    // 4. Handlers
    const handleClick = () => {};
    
    // 5. Render
    return <div>...</div>;
};

// 6. Export
export default MyComponent;
\`\`\`

---

## 📄 Licenza

Progetto educativo per uso universitario - Corso EPS

---

## 👥 Contribuire

Per contribuire al progetto:
1. Fork repository
2. Crea branch (\`git checkout -b feature/NomeFeature\`)
3. Commit (\`git commit -m 'Add NomeFeature'\`)
4. Push (\`git push origin feature/NomeFeature\`)
5. Apri Pull Request

---

## 📞 Supporto

Per domande o problemi:
- Leggi questa documentazione
- Controlla \`README.md\`
- Apri una issue su GitHub (se configurato)

---

**Ultima modifica:** Gennaio 2026
**Versione:** 2.0.0
