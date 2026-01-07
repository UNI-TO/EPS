# Nuovi Contenuti Generati - Simulatore EPS

## Sommario

Questo documento elenca tutti i nuovi contenuti generati per il simulatore EPS. I contenuti includono quiz interattivi, dataset R, documentazione teorica e guide pratiche.

---

## 1. Quiz a Scelta Multipla Teorici

### **QuizTeoricoAvanzato.jsx**
📍 Location: `./src/components/quiz/QuizTeoricoAvanzato.jsx`

#### Caratteristiche:
- **12 domande** approfondite su teoria statistica
- Spiegazioni dettagliate per ogni risposta
- Interfaccia interattiva con navigazione tra domande
- Sistema di scoring e feedback

#### Argomenti Trattati:
1. Distribuzione Normale (parametri, supporto, proprietà)
2. Errori nei Test di Ipotesi (Tipo I e Tipo II)
3. Indipendenza vs Disgiunzione Eventi
4. Intervalli di Confidenza (interpretazione corretta)
5. Teorema del Limite Centrale
6. Funzioni R per Distribuzioni (pnorm, dnorm, qnorm, rnorm)
7. Correlazione di Pearson (interpretazione)
8. Distribuzione Binomiale (formule E[X] e Var(X))
9. P-value (definizione e interpretazione)
10. Test t in R (alternative="greater", "less", "two.sided")
11. Media Campionaria (proprietà, varianza σ²/n)
12. Test Chi-quadrato (gradi di libertà per indipendenza)

#### Come Usare:
```jsx
import QuizTeoricoAvanzato from './components/quiz/QuizTeoricoAvanzato';
```

---

## 2. Quiz Interattivi da Immagini di Esami

### **QuizDalleImmagini.jsx**
📍 Location: `./src/components/quiz/QuizDalleImmagini.jsx`

#### Caratteristiche:
- **4 esercizi completi** basati su esami reali
- Codice R completo per ogni esercizio
- Spiegazioni teoriche approfondite
- Esempi passo-passo

#### Esercizi Inclusi:

**1. Analisi Dataset pomodori.RData**
- Statistiche descrittive (media, SD)
- Filtraggio con condizioni
- Calcolo percentili
```r
load("pomodori.RData")
mean(fertilizzante_A$produzione)
sum(pomodori$produzione >= 2 & pomodori$produzione <= 3)
quantile(pomodori$produzione, 0.90)
```

**2. Distribuzione di Poisson**
- Valori discreti vs continui
- P(Y = k), P(Y < k), P(Y ∈ [a, b])
```r
dpois(1.5, 2)  # = 0 (Poisson è discreta!)
ppois(1, 2)    # P(Y ≤ 1)
ppois(10, 2) - ppois(4, 2)  # P(5 ≤ Y ≤ 10)
```

**3. Trasformazioni Lineari della Normale**
- Se Y ~ N(μ, σ²), allora Y - c ~ N(μ - c, σ²)
- Unione di eventi
- Probabilità condizionata
```r
# X = Y - 3 dove Y ~ N(3, 4)
# X ~ N(0, 4)
pnorm(1.2, 0, 2) + (1 - pnorm(2, 0, 2))  # Unione
(1 - pnorm(1.7, 0, 2)) / (1 - pnorm(1, 0, 2))  # Condizionata
```

**4. Teoria Variabili Aleatorie**
- Continua vs discreta
- Parametri normale (media, varianza)
- Supporto della normale (ℝ)

---

## 3. Nuovi Dataset RData con Esercizi

### **generatore-dataset.r**
📍 Location: `./public/r-scripts/generatore-dataset.r`

#### Dataset Generati:

1. **studenti.RData** (150 osservazioni)
   - Variabili: Corso, AnnoImmatricolazione, OreDiStudio, VotoEsame, Frequenza
   - Uso: Test t, ANOVA, Regressione, Correlazione

2. **vendite.RData** (200 osservazioni)
   - Variabili: GiornoSettimana, Citta, Categoria, Importo, NumeroArticoli
   - Uso: Test Chi-quadrato, Aggregazioni, Proporzioni

3. **temperatura.RData** (90 osservazioni)
   - Variabili: Laboratorio, TemperaturaPreTrattamento, TemperaturaPostTrattamento
   - Uso: Paired t-test, ANOVA

4. **pazienti.RData** (250 osservazioni)
   - Variabili: Eta, Sesso, GruppoTrattamento, PressionePre, PressionePost, Migliorato
   - Uso: Test proporzioni, Chi-quadrato, ANOVA

5. **tempi_risposta.RData** (180 osservazioni)
   - Variabili: Condizione, TempoRisposta_ms, Corretto
   - Uso: Test normalità, Trasformazioni log, ANOVA

6. **produzione.RData** (200 osservazioni)
   - Variabili: Turno, PezziProdotti, PezziDifettosi, TemperaturaAmbiente
   - Uso: Regressione, Correlazione, ANOVA

7. **persone.RData** (120 osservazioni)
   - Variabili: Sesso, Altezza_cm, Peso_kg, Eta
   - Uso: Regressione lineare, Correlazione, Diagnostica

#### Come Generare:
```r
# Eseguire in R
source("./public/r-scripts/generatore-dataset.r")
# Crea 7 file .RData in ./input/rData/
```

### **esercizi-nuovi-dataset.r**
📍 Location: `./public/r-scripts/esercizi-nuovi-dataset.r`

#### Contenuto:
- 7 esercizi guidati completi (uno per dataset)
- Codice R passo-passo con commenti
- Interpretazioni statistiche
- Visualizzazioni grafiche

#### Competenze Praticate:
✅ Statistiche descrittive (mean, median, sd, IQR, quantile)
✅ Identificazione outlier (metodo Tukey)
✅ Test t (indipendenti e appaiati)
✅ ANOVA e test post-hoc (Tukey HSD)
✅ Test Chi-quadrato (indipendenza)
✅ Test proporzioni
✅ Correlazione (Pearson, Spearman)
✅ Regressione lineare
✅ Diagnostica modelli
✅ Trasformazioni (log)
✅ Test normalità (Shapiro-Wilk)

---

## 4. Documentazione Teorica Avanzata

### **teoria-avanzata-eps.md**
📍 Location: `./docs/teoria-avanzata-eps.md`

#### Capitoli:

**1. Teorema del Limite Centrale**
- Enunciato formale
- Condizioni applicabilità
- Errore standard SE = σ/√n
- Esempi con R
- Applicazioni (IC, test, dimensione campione)

**2. Test Chi-quadrato Approfondito**
- **Bontà del Fit**: verifica distribuzione teorica
  - df = k - 1 - parametri stimati
  - Esempio: dado truccato, test normalità
- **Test di Indipendenza**: tabella contingenza
  - df = (r-1) × (c-1)
  - Residui standardizzati
  - Esempio: fumo vs malattia
- **Test di Omogeneità**: confronto k popolazioni

**3. ANOVA (Analysis of Variance)**
- ANOVA a un fattore
- Assunzioni (normalità, omogeneità varianze, indipendenza)
- Statistica F = MSB / MSW
- Test post-hoc: Tukey HSD
- Verifica assunzioni (Levene, Shapiro)
- Alternative non parametriche (Kruskal-Wallis)

**4. Regressione Lineare Avanzata**
- **Diagnostica modello**: 4 grafici standard
  1. Residuals vs Fitted (linearità, eteroschedasticità)
  2. Q-Q Plot (normalità residui)
  3. Scale-Location (omogeneità varianza)
  4. Residuals vs Leverage (punti influenti)
- **Identificare outliers**: residui standardizzati > 3
- **Punti influenti**: Cook's distance > 1
- **High leverage**: h > 2p/n
- **IC vs IP**: confidenza (media) vs predizione (singola obs)

**5. Metodo Bootstrap**
- Idea: ricampionamento con reinserimento
- Implementazione in R
- IC bootstrap (metodo percentile)
- Errore standard bootstrap

**6. Test Non Parametrici**
- Quando usarli (dati non normali, ordinali, campioni piccoli)
- Wilcoxon (alternativa a t-test)
- Mann-Whitney U (due campioni indipendenti)
- Kruskal-Wallis (alternativa ad ANOVA)
- Friedman (ANOVA a blocchi)

---

## 5. Guida R Supplementare

### **guida-supplementare-2025.r**
📍 Location: `./public/r-scripts/guida-supplementare-2025.r`

#### Sezioni:

**1. Manipolazione Avanzata Dataframe**
```r
# Creazione, aggiunta colonne, subset, ordinamento
studenti$lode <- studenti$voto == 30
subset(studenti, corso == "Informatica" & voto >= 25)
studenti[order(-studenti$voto), ]
aggregate(voto ~ corso, data = studenti, FUN = mean)
merge(df1, df2, by = "key")
```

**2. Grafici Avanzati Base R**
```r
# Layout multipli
par(mfrow = c(2, 2))

# Personalizzazione completa
plot(..., pch = 19, col = "blue", cex = 1.5, las = 1)
abline(), grid(), legend(), text()

# Pie chart, barplot raggruppato
```

**3. Funzioni Statistiche Custom**
```r
CV <- function(x) sd(x)/mean(x)*100  # Coefficiente variazione
standardizza <- function(x) (x - mean(x))/sd(x)
normalizza <- function(x) (x - min(x))/(max(x) - min(x))
SE <- function(x) sd(x)/sqrt(length(x))
```

**4. Simulazioni**
```r
# Monte Carlo per stimare π
# Bootstrap per IC mediana
replicate(1000, ...)
```

**5. Test Non Parametrici**
```r
wilcox.test(x, y)
kruskal.test(y ~ gruppo, data = df)
```

**6. Diagnostica Regressione**
```r
par(mfrow = c(2,2)); plot(modello); par(mfrow = c(1,1))
rstandard(modello)  # Residui standardizzati
cooks.distance(modello)
hatvalues(modello)
predict(modello, newdata, interval = "confidence")
predict(modello, newdata, interval = "prediction")
```

**7. Trucchi e Scorciatoie**
```r
# Funzioni apply
apply(mat, 1, mean)  # Riga
sapply(lista, mean)
tapply(voti, corsi, mean)

# Sequenze
seq(1, 10, by = 2)
rep(c(1,2), each = 3)

# NA management
mean(x, na.rm = TRUE)
na.omit(x)

# Import/Export
write.csv(df, "file.csv", row.names = FALSE)
read.csv("file.csv")
```

**8. Formule Rapide**
- Tutte le distribuzioni (Normale, Esponenziale, Binomiale, Poisson, Geometrica)
- Tutti i test (t-test, prop.test, chisq.test, aov)
- Regressione (lm, coef, summary, predict)

---

## Integrazione nell'App

### File Modificati:

**1. src/App.jsx**
- Aggiunti import per nuovi componenti
- Aggiunti casi in switch per routing

**2. src/data/categories.js**
- Aggiunte 2 nuove voci:
  - "Quiz Teorico Avanzato 🆕"
  - "Esercizi da Esami Interattivi 🆕"

### Come Accedere ai Nuovi Contenuti:

1. **Avvia il server**:
   ```bash
   npm start
   ```

2. **Naviga nell'app**:
   - Homepage → Sezione "Quiz di Pratica"
   - Clicca su "Quiz Teorico Avanzato 🆕"
   - Oppure "Esercizi da Esami Interattivi 🆕"

3. **Genera i dataset R**:
   ```r
   # In R/RStudio
   source("./public/r-scripts/generatore-dataset.r")
   source("./public/r-scripts/esercizi-nuovi-dataset.r")
   ```

4. **Leggi la teoria**:
   - Apri `./docs/teoria-avanzata-eps.md` in un editor Markdown
   - Oppure leggi direttamente su GitHub

5. **Studia la guida R**:
   - Apri `./public/r-scripts/guida-supplementare-2025.r` in RStudio
   - Esegui sezione per sezione

---

## Statistiche Nuovi Contenuti

### Quiz Web:
- **2 nuovi componenti** React
- **16 nuove domande teoriche** (12 + 4 esercizi)
- **Oltre 50 concetti** spiegati

### Script R:
- **3 nuovi file** R
- **7 dataset** generati
- **7 esercizi guidati** completi
- **Oltre 500 righe** di codice commentato

### Documentazione:
- **1 guida teorica** Markdown (6000+ parole)
- **1 guida pratica** R (900+ righe)
- **Tutti gli argomenti** avanzati EPS coperti

### Argomenti Totali Coperti:
✅ Teoria Distribuzioni Continue/Discrete
✅ Test di Ipotesi (tutti i tipi)
✅ Teorema Limite Centrale
✅ ANOVA e Post-Hoc
✅ Regressione Lineare Avanzata
✅ Chi-quadrato (3 tipi)
✅ Test Non Parametrici
✅ Bootstrap e Simulazioni
✅ Manipolazione Dati R
✅ Visualizzazione Avanzata
✅ Diagnostica Modelli

---

## Come Contribuire

Per aggiungere nuovi contenuti:

1. **Nuovi Quiz**: Crea componente in `./src/components/quiz/`
2. **Nuovi Dataset**: Aggiungi generazione in `generatore-dataset.r`
3. **Nuovi Esercizi**: Espandi `esercizi-nuovi-dataset.r`
4. **Nuova Teoria**: Aggiungi sezioni in `teoria-avanzata-eps.md`
5. **Nuove Guide**: Crea file in `./public/r-scripts/`

Poi aggiorna:
- `src/App.jsx` (import + routing)
- `src/data/categories.js` (menu)

---

## Licenza

Tutti i contenuti generati sono per uso educativo nell'ambito del corso "Elementi di Probabilità e Statistica".

---

## Autore

Contenuti generati da Claude (Anthropic) per migliorare l'esperienza di studio degli studenti di EPS.

**Data creazione**: 7 Gennaio 2025

**Versione**: 1.0

---

## Prossimi Sviluppi Suggeriti

- [ ] Aggiungere modalità esame con timer
- [ ] Sistema di tracciamento progressi utente
- [ ] Quiz personalizzati basati su difficoltà
- [ ] Integrazione con console R interattiva nel browser
- [ ] Export risultati in PDF
- [ ] Flashcard per formule rapide
- [ ] Video tutorial per argomenti complessi
- [ ] Community forum per domande
- [ ] Modalità competitiva multiplayer
- [ ] App mobile (React Native)

---

**Buono Studio! 📊🎓**
