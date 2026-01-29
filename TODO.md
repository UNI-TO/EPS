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

- [x] **Esame 29 Gennaio 2025 - Turno 4** ✅
  - Leggere: `input/EPS 29 gen 25 - turno 4_ Revisione tentativo.PDF`
  - Estrarre domande e soluzioni
  - File: `src/components/exams/QuizGennaio2025Turno4.jsx` ✅
  - 6 domande: Bosco/Test t Appaiato, Test Hypothesis, P-value, Moneta/Probabilità, t Student, Esponenziale Condizionata

- [x] **Esame 12 Luglio 2024** ✅
  - Leggere: `input/EPS 12 lug 24 turno 1_ Revisione tentativo.pdf`
  - Estrarre domande e soluzioni
  - File: `src/components/exams/QuizLuglio2024.jsx` ✅
  - 4 domande: Barplot/Visualizzazioni, Moneta/Probabilità Classica, Normale+Esponenziale Indipendenti, Trazione/Test t Indipendenti

- [x] **Esame 20 Giugno 2024** ✅
  - Leggere: `input/EPS 20 giu 24 turno 1_ Revisione tentativo.PDF`
  - Estrarre domande e soluzioni
  - File: `src/components/exams/QuizGiugno2024.jsx` ✅
  - 4 domande: Compressione/Test t Appaiato, Urne/Binomiale Somma VA, Teoria Binomiale, Esponenziale Condizionata

- [x] **Esame 16 Gennaio 2026 - Turno 1** 🆕⭐
  - Leggere: `input/EPS 16 gen 26 Turno 1 (9 CFU)_ Revisione tentativo _ Esami.pdf`
  - Estrarre domande e soluzioni
  - File: `src/components/exams/QuizGennaio2026Turno1.jsx` ✅
  - 5 domande: attivita/Chi-quadro Bontà Fit, Normale VA indipendenti, Teoria Test Ipotesi, streaming/Test t Indipendenti, Binomiale
  - 🆕 Esercizi R: `public/r-scripts/esercizi-esami-gennaio-2026.r`
  - Dataset: attivita.RData, streaming.RData

- [x] **Esame 16 Gennaio 2026 - Turno 2** 🆕⭐
  - Leggere: `input/EPS 16 gen 26 Turno 2 (9 CFU)_ Attempt review _ Esami.pdf`
  - Estrarre domande e soluzioni
  - File: `src/components/exams/QuizGennaio2026Turno2.jsx` ✅
  - 5 domande: Moneta/Probabilità Classica, Teoria Varianza, allenamento/Regressione Lineare, Esponenziale Memoryless, consumo/Test Proporzioni
  - 🆕 Esercizi R: `public/r-scripts/esercizi-esami-gennaio-2026.r`
  - Dataset: allenamento.RData, consumo.RData

---

## 📝 Quiz da Script R ✅ COMPLETATI!

- [x] **Quiz da appello-gennaio-2021.R** ✅
  - Analizzare: `input/appello-gennaio-2021.R`
  - Creare domande basate sugli esercizi
  - Includere spiegazioni codice R
  - File: `src/components/quiz/QuizScriptGennaio2021.jsx` ✅
  - 6 esercizi: Poisson+Bayes, Esponenziale+Binomiale (2x), Ipergeometrica+Bayes (2x), Normale+Binomiale

- [x] **Quiz da appello-febbraio.R** ✅
  - Analizzare: `input/appello-febbraio.R`
  - Creare domande basate sugli esercizi
  - Includere spiegazioni codice R
  - File: `src/components/quiz/QuizScriptFebbraio.jsx` ✅
  - 4 esercizi: Normale+Binomiale (QI), Binomiale+Bayes (WiFi), Geometrica+Bayes, Tabelle Contingenza

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
- ✅ **12 Quiz di Pratica** (108 domande totali)
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
  - 🆕 Quiz Script R Gennaio 2021 (6 esercizi, 17 domande)
  - 🆕 Quiz Script R Febbraio (4 esercizi, 16 domande)
- ✅ **12 Simulatori d'Esame** (55 domande totali)
  - Simulazione Esame Completo
  - Esame 18 Febbraio 2021
  - Esame 29 Gennaio 2025 - Turno 1
  - 🆕 Esame 29 Gennaio 2025 - Turno 2 (5 domande)
  - 🆕 Esame 29 Gennaio 2025 - Turno 4 (6 domande)
  - Esame 12 Febbraio 2025
  - Esame 11 Luglio 2025 - VN e T
  - 🆕 Esame 11 Luglio 2025 - Turno 10 (5 domande)
  - 🆕 Esame 12 Luglio 2024 - Turno 1 (4 domande)
  - 🆕 Esame 20 Giugno 2024 - Turno 1 (4 domande)
  - 🆕⭐ Esame 16 Gennaio 2026 - Turno 1 (5 domande)
  - 🆕⭐ Esame 16 Gennaio 2026 - Turno 2 (5 domande)
- ✅ **17+ Esercizi R Guidati** (11+ dataset: 4 nuovi gen 2026 + 7 precedenti)

### Contenuti Pianificati (Rimanenti)
- 🎓 **1 Contenuto Didattico OPZIONALE** (~12 domande + flashcard)
  - Quiz Teoria Avanzata (bassa priorità - contenuti già coperti)

**Totale completato questa sessione: 105 nuove domande + 10 esercizi R completi**
**Tutti i contenuti essenziali completati! 🎉**

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

**Ultima modifica:** 29 Gennaio 2026
**Versione:** 2.1 - ESAMI GENNAIO 2026 AGGIUNTI! ✅
- Tutti gli esami reali PDF completati (5 nuovi totali)
- 🆕 Esame 16 Gennaio 2026 - Turno 1 (5 domande)
- 🆕 Esame 16 Gennaio 2026 - Turno 2 (5 domande)
- 🆕 Esercizi R per 4 nuovi dataset (allenamento, attivita, consumo, streaming)
- Tutti i quiz da script R completati (2 nuovi)
- 12 quiz di pratica + 12 simulatori esame + 13+ esercizi R = 163+ domande totali!

