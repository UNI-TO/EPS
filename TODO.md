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

### Priorità Alta ✅ COMPLETATO!
- [x] **Quiz Test Chi-quadro**
  - Test per l'indipendenza (tabelle di contingenza)
  - Test per bontà del fit
  - Regola di Cochran
  - Interpretazione risultati
  - File: `src/components/quiz/QuizChiQuadro.jsx` ✅

- [x] **Quiz Distribuzioni Continue**
  - Normale (pnorm, qnorm, dnorm)
  - Esponenziale (pexp, proprietà memoryless)
  - Probabilità condizionate
  - Calcoli con media e varianza
  - File: `src/components/quiz/QuizDistribuzioniContinue.jsx` ✅

- [x] **Quiz Distribuzioni Discrete**
  - Poisson (dpois, ppois)
  - Binomiale (dbinom, pbinom, qbinom)
  - Geometrica (dgeom, pgeom)
  - Ipergeometrica (dhyper)
  - Probabilità condizionate
  - File: `src/components/quiz/QuizDistribuzioniDiscrete.jsx` ✅

- [x] **Quiz Test di Ipotesi**
  - t-test (paired vs unpaired)
  - Test per proporzioni (binom.test)
  - Interpretazione p-value
  - Scelta del test corretto
  - Alternative (two.sided, less, greater)
  - File: `src/components/quiz/QuizTestIpotesi.jsx` ✅

---

## 💻 Esercizi R con Dataset RData ✅ COMPLETATO!

### Dataset disponibili in `input/rData/`:

✅ **Tutti gli esercizi creati in un unico file R completo:**
- File: `public/r-scripts/esercizi-dataset-esistenti.r`
- 6 esercizi completi con oltre 900 righe di codice commentato

- [x] **atleti.RData**
  - Correlazione tra variabili (cor, cor.test)
  - Regressione lineare (lm)
  - Interpretazione R²
  - Residui e diagnostica
  - ✅ Esercizio 1 nel file R

- [x] **bosco.RData**
  - Analisi descrittiva completa
  - Visualizzazioni (boxplot, histogram, scatterplot)
  - Identificazione outlier (metodo IQR e Z-score)
  - Statistiche per gruppo
  - ✅ Esercizio 2 nel file R

- [x] **fertilizzante.RData**
  - Test ANOVA (aov)
  - Confronti multipli (TukeyHSD)
  - Assunzioni ANOVA (Levene, Shapiro)
  - Interpretazione risultati ed effect size
  - ✅ Esercizio 3 nel file R

- [x] **trazione.RData**
  - Test ipotesi su medie (t-test)
  - Intervalli di confidenza (90%, 95%, 99%)
  - Test unilaterali (greater/less)
  - ✅ Esercizio 4 nel file R

- [x] **compressione.RData**
  - Analisi esplorativa completa
  - Test normalità e Q-Q plot
  - Analisi per variabile e gruppo
  - ✅ Esercizio 5 nel file R

- [x] **alberi.RData**
  - Regressione multipla
  - Scatter plot matrix con correlazioni
  - Diagnostica avanzata (Cook's D, leverage)
  - ✅ Esercizio 6 nel file R

---

## 📚 Quiz da Altri Esami Reali

### PDF disponibili in `input/`:

- [x] **Esame 29 Gennaio 2025 - Turno 2** ✅
  - Leggere: `input/EPS 29 gen 25 - turno 2_ Revisione tentativo.pdf`
  - Estrarre domande e soluzioni
  - File: `src/components/exams/QuizGennaio2025Turno2.jsx` ✅
  - 5 domande: Fertilizzante/Test t, Esponenziale, Probabilità Eventi, Alberi/Correlazione, Teoria CDF

- [x] **Esame 11 Luglio 2025 - Turno 10** ✅
  - Leggere: `input/https_esami_i_learn_unito_itmodquizreview_phpattempt=670337&cmid=43357.pdf`
  - Estrarre domande e soluzioni
  - File: `src/components/exams/QuizLuglio2025Turno10.jsx` ✅
  - 5 domande: Fito/Regressione, Urne/Binomiale, Normale Condizionata, Esponenziale Teoria, Escursioni/Proporzioni

- [ ] **Esame 29 Gennaio 2025 - Turno 4** 🎯 PROSSIMO
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

- [x] **Quiz Errori Comuni e Trabocchetti** ✅
  - Confusione rate vs media in Esponenziale
  - paired=TRUE vs FALSE
  - alternative="less" vs "greater"
  - Interpretazione p-value
  - Quando usare quale test
  - "Accettare H0" vs "Non rifiutare H0"
  - File: `src/components/quiz/QuizErroriComuni.jsx` ✅
  - 10 domande complete con spiegazioni approfondite

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
- ✅ **10 Quiz di Pratica** (91 domande totali)
  - Quiz EPS Generale (10 domande)
  - Quiz da Esami Reali (10 domande)
  - Quiz Teorico Avanzato (12 domande)
  - Esercizi da Esami Interattivi (4 esercizi)
  - 🆕 Quiz Test Chi-quadro (8 domande)
  - 🆕 Quiz Distribuzioni Continue (8 domande)
  - 🆕 Quiz Distribuzioni Discrete (8 domande)
  - 🆕 Quiz Test di Ipotesi (8 domande)
  - 🆕 Quiz Errori Comuni (10 domande)
  - Simulatore R (15 esercizi)
- ✅ **7 Simulatori d'Esame** (25 domande totali)
  - Simulazione Esame Completo
  - Esame 18 Febbraio 2021
  - Esame 29 Gennaio 2025 - Turno 1
  - 🆕 Esame 29 Gennaio 2025 - Turno 2 (5 domande)
  - Esame 12 Febbraio 2025
  - Esame 11 Luglio 2025 - VN e T
  - 🆕 Esame 11 Luglio 2025 - Turno 10 (5 domande)
- ✅ **13 Esercizi R Guidati** (7 nuovi dataset + 6 dataset esistenti)

### Contenuti Pianificati (Rimanenti)
- 📚 **3 Quiz da Esami Aggiuntivi** (~15 domande)
  - Turno 4 Gennaio 2025
  - Luglio 2024
  - Giugno 2024
- 📝 **2 Quiz da Script R** (~15 domande)
  - appello-gennaio-2021.R
  - appello-febbraio.R
- 🎓 **1 Contenuto Didattico** (~12 domande + flashcard)
  - Quiz Teoria Avanzata

**Totale completato questa sessione: 52 nuove domande + 6 esercizi R completi**
**Totale ancora da fare: ~42 domande/esercizi**

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

**Ultima modifica:** 7 Gennaio 2026
**Versione:** 1.1 - Completati Quiz Errori Comuni + 2 Esami 2025


//TODO :  🎯 Esame 29 Gennaio 2025 - Turno 4
- File PDF: input/EPS 29 gen 25 - turno 4_ Revisione tentativo.PDF
- Da creare: src/components/exams/QuizGennaio2025Turno4.jsx