# Quick Start - Nuovi Contenuti Simulatore EPS

## Avvio Rapido

### 1. Avvia l'Applicazione Web
```bash
npm start
```

L'app si aprirà su `http://localhost:5173`

### 2. Nuovi Quiz Disponibili

Nella homepage, sezione "Quiz di Pratica", troverai:

#### 🆕 Quiz Teorico Avanzato
- 12 domande approfondite su teoria statistica
- Spiegazioni complete per ogni risposta
- Argomenti: TLC, Distribuzioni, Test Ipotesi, Correlazione

#### 🆕 Esercizi da Esami Interattivi
- 4 esercizi completi da esami reali
- Codice R step-by-step
- Dataset: pomodori.RData, Poisson, Normale, Probabilità

#### 🆕 Quiz Test Chi-quadro
- 8 domande su test indipendenza, bontà del fit
- Regola di Cochran, residui standardizzati
- Codice R completo (chisq.test, fisher.test)

#### 🆕 Quiz Distribuzioni Continue
- 8 domande su Normale ed Esponenziale
- Funzioni R: pnorm, qnorm, pexp, dexp
- Standardizzazione e combinazioni lineari

#### 🆕 Quiz Distribuzioni Discrete
- 8 domande su Poisson, Binomiale, Geometrica, Ipergeometrica
- Focus su dpois, pbinom, dgeom, dhyper
- Approssimazioni e offset in R

#### 🆕 Quiz Test di Ipotesi
- 8 domande su t-test, ANOVA, proporzioni
- Errori Tipo I/II, p-value, intervalli confidenza
- paired vs unpaired, alternative parameter

### 3. Genera Nuovi Dataset R

Apri R/RStudio ed esegui:

```r
# Genera 7 nuovi dataset .RData
source("./public/r-scripts/generatore-dataset.r")

# Dataset creati:
# - studenti.RData
# - vendite.RData
# - temperatura.RData
# - pazienti.RData
# - tempi_risposta.RData
# - produzione.RData
# - persone.RData
```

### 4. Pratica con gli Esercizi

```r
# 7 esercizi guidati con nuovi dataset
source("./public/r-scripts/esercizi-nuovi-dataset.r")

# Esercizio 1: STUDENTI - Test t, Correlazione, Regressione
# Esercizio 2: VENDITE - Chi-quadrato, Proporzioni
# Esercizio 3: TEMPERATURA - Paired t-test, ANOVA
# Esercizio 4: PAZIENTI - Test proporzioni, ANOVA
# Esercizio 5: TEMPI RISPOSTA - Normalità, Trasformazioni
# Esercizio 6: PRODUZIONE - Regressione, Correlazione
# Esercizio 7: PERSONE - Regressione, Diagnostica

# 🆕 6 esercizi guidati con dataset esistenti
source("./public/r-scripts/esercizi-dataset-esistenti.r")

# Esercizio 1: ATLETI - Correlazione, Regressione, Outlier
# Esercizio 2: BOSCO - Analisi Descrittiva, Normalità
# Esercizio 3: FERTILIZZANTE - ANOVA, Tukey HSD
# Esercizio 4: TRAZIONE - Test t, Intervalli Confidenza
# Esercizio 5: COMPRESSIONE - Analisi Completa
# Esercizio 6: ALBERI - Regressione Multipla, Diagnostica
```

### 5. Studia la Teoria

#### Teoria Avanzata (Markdown)
```bash
# Apri con qualsiasi editor Markdown
./docs/teoria-avanzata-eps.md
```

Argomenti:
- Teorema del Limite Centrale
- Test Chi-quadrato (3 tipi)
- ANOVA completa
- Regressione avanzata
- Bootstrap
- Test non parametrici

#### Guida R Supplementare
```r
# Apri in RStudio
./public/r-scripts/guida-supplementare-2025.r
```

Contenuti:
- Manipolazione dataframe avanzata
- Grafici personalizzati
- Funzioni statistiche custom
- Simulazioni Monte Carlo
- Test non parametrici
- Diagnostica regressione
- Trucchi R utili
- Formule rapide

---

## Contenuti Principali

### Quiz Web (Interattivi)

| Nome | Domande | Difficoltà | Argomenti Chiave |
|------|---------|------------|------------------|
| Quiz Teorico Avanzato | 12 | ⭐⭐⭐ | Teoria, Distribuzioni, TLC, Chi² |
| Esercizi da Esami | 4 | ⭐⭐⭐⭐ | Dataset R, Poisson, Normale, Condizionata |
| Quiz Test Chi-quadro 🆕 | 8 | ⭐⭐⭐ | Indipendenza, Bontà Fit, Cochran, Fisher |
| Quiz Distribuzioni Continue 🆕 | 8 | ⭐⭐⭐ | Normale, Esponenziale, pnorm, qnorm |
| Quiz Distribuzioni Discrete 🆕 | 8 | ⭐⭐⭐ | Poisson, Binomiale, Geometrica, Iper |
| Quiz Test di Ipotesi 🆕 | 8 | ⭐⭐⭐⭐ | t-test, ANOVA, Proporzioni, Errori |

### Dataset R (.RData)

| Dataset | N | Variabili | Uso Principale |
|---------|---|-----------|----------------|
| studenti | 150 | 6 | t-test, ANOVA, Regressione |
| vendite | 200 | 5 | Chi-quadrato, Aggregazioni |
| temperatura | 90 | 4 | Paired t-test, ANOVA |
| pazienti | 250 | 7 | Proporzioni, Chi-quadrato |
| tempi_risposta | 180 | 5 | Normalità, Trasformazioni |
| produzione | 200 | 5 | Regressione, Correlazione |
| persone | 120 | 4 | Regressione, Diagnostica |

### Guide e Documentazione

| File | Tipo | Righe/Parole | Contenuto |
|------|------|--------------|-----------|
| teoria-avanzata-eps.md | Markdown | ~6000 parole | TLC, Chi², ANOVA, Regressione, Bootstrap |
| guida-supplementare-2025.r | R Script | ~900 righe | Manipolazione, Grafici, Funzioni, Trucchi |
| esercizi-nuovi-dataset.r | R Script | ~600 righe | 7 esercizi completi guidati |

---

## Percorso di Studio Consigliato

### Settimana 1: Teoria Base
1. Leggi `teoria-avanzata-eps.md` - Sezioni 1-3
2. Fai "Quiz Teorico Avanzato" (prime 6 domande)
3. Studia `guida-supplementare-2025.r` - Sezioni 1-3

### Settimana 2: Applicazioni R
1. Genera tutti i dataset (`generatore-dataset.r`)
2. Fai Esercizi 1-4 (`esercizi-nuovi-dataset.r`)
3. Fai "Esercizi da Esami Interattivi"

### Settimana 3: Argomenti Avanzati
1. Leggi `teoria-avanzata-eps.md` - Sezioni 4-6
2. Fai "Quiz Teorico Avanzato" (domande 7-12)
3. Fai Esercizi 5-7 (`esercizi-nuovi-dataset.r`)

### Settimana 4: Consolidamento
1. Studia `guida-supplementare-2025.r` - Sezioni 4-8
2. Rifai tutti i quiz
3. Pratica con dataset personali

---

## Comandi Rapidi R

### Caricare un Dataset
```r
load("./input/rData/studenti.RData")
head(studenti)
str(studenti)
```

### Statistiche Descrittive
```r
mean(studenti$VotoEsame)
median(studenti$VotoEsame)
sd(studenti$VotoEsame)
quantile(studenti$VotoEsame, c(0.25, 0.75))
IQR(studenti$VotoEsame)
```

### Test t
```r
# Un campione
t.test(studenti$VotoEsame, mu = 25)

# Due campioni
gruppo_A <- studenti$VotoEsame[studenti$Corso == "Informatica"]
gruppo_B <- studenti$VotoEsame[studenti$Corso == "Matematica"]
t.test(gruppo_A, gruppo_B)

# Appaiato
t.test(temperatura$TemperaturaPostTrattamento,
       temperatura$TemperaturaPreTrattamento,
       paired = TRUE)
```

### ANOVA
```r
modello <- aov(VotoEsame ~ Corso, data = studenti)
summary(modello)
TukeyHSD(modello)
```

### Regressione
```r
modello <- lm(Peso_kg ~ Altezza_cm, data = persone)
summary(modello)
par(mfrow=c(2,2)); plot(modello); par(mfrow=c(1,1))
```

### Chi-quadrato
```r
tabella <- table(vendite$Citta, vendite$Categoria)
chisq.test(tabella)
```

---

## Risorse Aggiuntive

### File Esistenti Utili
- `./docs/esempi-R/guida.r` - Guida R principale
- `./docs/esempi-R/esame18Febbraio21.r` - Esame completo con soluzioni
- `./input/appello-febbraio.R` - Altro esame risolto

### Quiz Esistenti nell'App
- Quiz EPS Generale (10 domande)
- Quiz da Esami Reali (10 domande avanzate)
- Simulatore R Interattivo (15 esercizi)
- Esame 18 Febbraio 2021
- Esame 29 Gennaio 2025 🆕
- Esame 12 Febbraio 2025 🆕
- Esame 11 Luglio 2025 🆕

---

## Troubleshooting

### L'app non si avvia
```bash
# Reinstalla dipendenze
npm install
npm start
```

### Dataset non trovati
```r
# Assicurati di essere nella directory corretta
getwd()
setwd("path/to/Simulatore EPS")

# Rigenera dataset
source("./public/r-scripts/generatore-dataset.r")
```

### Errori nei quiz web
- Aggiorna il browser
- Cancella cache (Ctrl+Shift+R)
- Controlla console browser (F12)

---

## Contatti e Supporto

Per problemi o suggerimenti:
1. Apri un issue su GitHub
2. Controlla `NUOVI_CONTENUTI.md` per documentazione completa

---

**Buono Studio! 🎓📊**

*Versione: 1.0 - Data: 7 Gennaio 2025*
