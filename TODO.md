# 📋 TODO List - Simulatore EPS

Lista completa dei task per espandere il simulatore con nuovi quiz ed esercizi basati sui contenuti della cartella `input/`.

---

## ✅ Completati

- [x] Analizzare i file nella cartella input (PDF, RData, script R)
- [x] Esaminare la struttura attuale dei quiz e componenti React
- [x] Leggere i PDF degli esami per estrarre domande e contenuti
- [x] **Quiz Esame 29 Gennaio 2025** - 5 domande (Chi-quadro, Normale, Poisson, Test t)
- [x] **Quiz Esame 12 Febbraio 2025** - 5 domande (Normale, Poisson, Chi-quadro, Proporzioni)
- [x] **Quiz Esame 11 Luglio 2025** - 5 domande (Probabilità classica, Esponenziale, Proporzioni)
- [x] Aggiornare navigazione e route per i nuovi quiz

---

## 🎯 Quiz Tematici

### Priorità Alta
- [ ] **Quiz Test Chi-quadro**
  - Test per l'indipendenza (tabelle di contingenza)
  - Test per bontà del fit
  - Regola di Cochran
  - Interpretazione risultati
  - File: `src/components/quiz/QuizChiQuadro.jsx`

- [ ] **Quiz Distribuzioni Continue**
  - Normale (pnorm, qnorm, dnorm)
  - Esponenziale (pexp, proprietà memoryless)
  - Probabilità condizionate
  - Calcoli con media e varianza
  - File: `src/components/quiz/QuizDistribuzioniContinue.jsx`

- [ ] **Quiz Distribuzioni Discrete**
  - Poisson (dpois, ppois)
  - Binomiale (dbinom, pbinom, qbinom)
  - Geometrica (dgeom, pgeom)
  - Ipergeometrica (dhyper)
  - Probabilità condizionate
  - File: `src/components/quiz/QuizDistribuzioniDiscrete.jsx`

- [ ] **Quiz Test di Ipotesi**
  - t-test (paired vs unpaired)
  - Test per proporzioni (binom.test)
  - Interpretazione p-value
  - Scelta del test corretto
  - Alternative (two.sided, less, greater)
  - File: `src/components/quiz/QuizTestIpotesi.jsx`

---

## 💻 Esercizi R con Dataset RData

### Dataset disponibili in `input/rData/`:

- [ ] **atleti.RData**
  - Correlazione tra variabili (cor, cor.test)
  - Regressione lineare (lm)
  - Interpretazione R²
  - Residui e diagnostica
  - File: `src/components/R-quiz/EserciziAtleti.jsx`

- [ ] **bosco.RData**
  - Analisi descrittiva completa
  - Visualizzazioni (boxplot, histogram, scatterplot)
  - Identificazione outlier (metodo IQR)
  - Statistiche per gruppo
  - File: `src/components/R-quiz/EserciziBosco.jsx`

- [ ] **fertilizzante.RData**
  - Test ANOVA (aov)
  - Confronti multipli (TukeyHSD)
  - Assunzioni ANOVA
  - Interpretazione risultati
  - File: `src/components/R-quiz/EserciziFertilizzante.jsx`

- [ ] **trazione.RData**
  - Test ipotesi su medie
  - Intervalli di confidenza
  - Test su varianze
  - File: `src/components/R-quiz/EserciziTrazione.jsx`

- [ ] **compressione.RData**
  - Analisi e test specifici
  - File: `src/components/R-quiz/EserciziCompressione.jsx`

- [ ] **alberi.RData**
  - Analisi e visualizzazioni
  - File: `src/components/R-quiz/EserciziAlberi.jsx`

---

## 📚 Quiz da Altri Esami Reali

### PDF disponibili in `input/`:

- [ ] **Esame 29 Gennaio 2025 - Turno 2**
  - Leggere: `input/EPS 29 gen 25 - turno 2_ Revisione tentativo.pdf`
  - Estrarre domande e soluzioni
  - File: `src/components/exams/QuizGennaio2025Turno2.jsx`

- [ ] **Esame 29 Gennaio 2025 - Turno 4**
  - Leggere: `input/EPS 29 gen 25 - turno 4_ Revisione tentativo.PDF`
  - Estrarre domande e soluzioni
  - File: `src/components/exams/QuizGennaio2025Turno4.jsx`

- [ ] **Esame 12 Luglio 2024**
  - Leggere: `input/EPS 12 lug 24 turno 1_ Revisione tentativo.pdf`
  - Estrarre domande e soluzioni
  - File: `src/components/exams/QuizLuglio2024.jsx`

- [ ] **Esame 20 Giugno 2024**
  - Leggere: `input/EPS 20 giu 24 turno 1_ Revisione tentativo.PDF`
  - Leggere anche: `input/EPS 20 giu 24 turno 1 (mio).pdf`
  - Estrarre domande e soluzioni
  - File: `src/components/exams/QuizGiugno2024.jsx`

---

## 📝 Quiz da Script R

- [ ] **Quiz da appello-gennaio-2021.R**
  - Analizzare: `input/appello-gennaio-2021.R`
  - Creare domande basate sugli esercizi
  - Includere spiegazioni codice R
  - File: `src/components/exams/QuizScriptGennaio2021.jsx`

- [ ] **Quiz da appello-febbraio.R**
  - Analizzare: `input/appello-febbraio.R`
  - Creare domande basate sugli esercizi
  - Includere spiegazioni codice R
  - File: `src/components/exams/QuizScriptFebbraio.jsx`

---

## 🎓 Contenuti Didattici

### Priorità Alta

- [ ] **Quiz Teoria Approfondito**
  - Teorema del Limite Centrale (TLC)
  - Legge dei Grandi Numeri (LGN)
  - Stimatori (non distorti, consistenti, efficienti)
  - Distribuzioni campionarie
  - Parametro vs Statistica
  - File: `src/components/quiz/QuizTeoriaAvanzata.jsx`

- [ ] **Quiz Errori Comuni e Trabocchetti**
  - Confusione rate vs media in Esponenziale
  - paired=TRUE vs FALSE
  - alternative="less" vs "greater"
  - Interpretazione p-value
  - Quando usare quale test
  - "Accettare H0" vs "Non rifiutare H0"
  - File: `src/components/quiz/QuizErroriComuni.jsx`

### Priorità Media

- [ ] **Sezione Flashcard**
  - Formule principali
  - Comandi R essenziali
  - Concetti chiave
  - Ripasso veloce
  - File: `src/components/flashcards/Flashcards.jsx`

---

## ⚙️ Funzionalità Avanzate

### Priorità Bassa (Future Features)

- [ ] **Sezione Esercizi Guidati Step-by-Step**
  - Esercizi con soluzione progressiva
  - Hint graduali
  - Spiegazione passo-passo
  - File: `src/components/guided/EserciziGuidati.jsx`

- [ ] **Modalità Allenamento Personalizzato**
  - Seleziona argomenti specifici
  - Genera quiz su misura
  - Difficoltà personalizzata
  - File: `src/components/training/AllenamentoPersonalizzato.jsx`

- [ ] **Sistema Tracking Progressi**
  - localStorage per salvare progressi
  - Statistiche per argomento
  - Grafico andamento
  - Quiz completati
  - Punteggi storici
  - File: `src/components/stats/ProgressTracker.jsx`

- [ ] **Modalità Dark Mode**
  - Toggle dark/light mode
  - Persistenza preferenza

- [ ] **Esportazione Risultati PDF**
  - Genera report risultati
  - Stampa certificato

---

## 📊 Statistiche Progetto

### Contenuti Attuali
- ✅ **3 Quiz di Pratica** (33 domande)
- ✅ **5 Simulatori d'Esame** (3 vecchi + 3 nuovi)
- ✅ **1 Simulatore R** (15 esercizi)

### Contenuti Pianificati
- 🎯 **4 Quiz Tematici** (40-50 domande)
- 💻 **6 Esercizi R con Dataset** (30-40 esercizi)
- 📚 **4 Quiz da Esami Aggiuntivi** (20 domande)
- 📝 **2 Quiz da Script R** (15 domande)
- 🎓 **3 Contenuti Didattici** (30 domande + flashcard)

**Totale pianificato: ~150 nuove domande/esercizi**

---

## 🔧 Note Implementazione

### Pattern da Seguire
1. Ogni quiz segue la struttura esistente (vedere `QuizGennaio2025.jsx`)
2. Colori distintivi per categoria:
   - Esami 2025: arancione, rosa, teal
   - Quiz tematici: verde, blu, indaco
   - Esercizi R: viola, cyan
3. Difficoltà indicata con stelle (⭐ → ⭐⭐⭐⭐)
4. Spiegazioni dettagliate con codice R formattato
5. Navigazione tra domande
6. Risultati finali con dettaglio

### Aggiornamenti Necessari per Ogni Nuovo Quiz
1. Creare componente in `src/components/[categoria]/`
2. Importare in `src/App.jsx`
3. Aggiungere case nello switch di `renderComponent()`
4. Aggiungere item in `src/data/categories.js`

---

## 📝 Priorità Suggerita

### Sprint 1 (Settimana 1-2)
1. Quiz Test Chi-quadro
2. Quiz Distribuzioni Continue
3. Quiz Errori Comuni

### Sprint 2 (Settimana 3-4)
4. Quiz Distribuzioni Discrete
5. Quiz Test di Ipotesi
6. Esercizi R con atleti.RData

### Sprint 3 (Settimana 5-6)
7. Quiz da altri esami 2025 (turno 2 e 4)
8. Esercizi R con bosco.RData
9. Quiz Teoria Avanzata

### Sprint 4 (Settimana 7+)
10. Funzionalità avanzate (tracking, dark mode, etc.)

---

**Ultima modifica:** 6 Gennaio 2026
**Versione:** 1.0
