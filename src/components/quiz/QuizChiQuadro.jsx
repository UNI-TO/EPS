import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, RotateCcw, BookOpen } from 'lucide-react';

const QuizChiQuadro = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      category: "Chi-quadrato - Test Indipendenza",
      difficulty: "⭐⭐⭐",
      question: "Hai una tabella di contingenza 3×4 che mostra la relazione tra Tipo di Cliente (3 livelli) e Prodotto Acquistato (4 livelli). Vuoi testare se le due variabili sono indipendenti. Quanti gradi di libertà ha il test chi-quadrato?",
      options: [
        "6",
        "11",
        "12",
        "7"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: 6

📐 FORMULA GRADI DI LIBERTÀ TEST INDIPENDENZA:
df = (r - 1) × (c - 1)

dove:
- r = numero di righe
- c = numero di colonne

CALCOLO:
Tabella 3×4:
- r = 3 righe (Tipo Cliente)
- c = 4 colonne (Prodotto)
- df = (3 - 1) × (4 - 1) = 2 × 3 = 6

💡 PERCHÉ (r-1) × (c-1)?
Una volta fissati i totali marginali (somme righe e colonne),
solo (r-1)×(c-1) celle sono "libere" di variare.
Le altre sono determinate automaticamente.

📊 CODICE R:
# Esempio tabella 3×4
tabella <- matrix(c(20,30,25,15,
                    15,20,30,25,
                    25,15,20,30),
                  nrow=3, byrow=TRUE)

test <- chisq.test(tabella)
test$parameter  # df = 6

⚠️ ATTENZIONE:
NON confondere con test bontà del fit:
df_bontà = k - 1 - parametri_stimati`
    },
    {
      id: 2,
      category: "Chi-quadrato - Regola di Cochran",
      difficulty: "⭐⭐",
      question: "Quale condizione NON deve essere violata per applicare il test chi-quadrato?",
      options: [
        "Tutte le frequenze attese devono essere ≥ 5",
        "Al massimo il 20% delle celle può avere frequenza attesa < 5",
        "Nessuna frequenza attesa può essere < 1",
        "Sia B che C sono condizioni della regola di Cochran"
      ],
      correct: 3,
      explanation: `✅ RISPOSTA CORRETTA: Sia B che C (opzione 4)

📋 REGOLA DI COCHRAN:

Il test chi-quadrato è valido SE:
1. **Al massimo 20% delle celle** ha frequenza attesa < 5
2. **Nessuna cella** ha frequenza attesa < 1

❌ SBAGLIATO: "Tutte ≥ 5" (troppo restrittivo!)

📊 ESEMPIO:

Tabella 4×3 = 12 celle totali

Scenario A: ✅ VALIDO
- 2 celle con E < 5 (16.7% < 20%) ✓
- Nessuna cella con E < 1 ✓

Scenario B: ❌ NON VALIDO
- 3 celle con E < 5 (25% > 20%) ✗

Scenario C: ❌ NON VALIDO
- 1 cella con E = 0.8 < 1 ✗

💡 CODICE R:

test <- chisq.test(tabella)
frequenze_attese <- test$expected

# Verifica Cochran
n_celle <- length(frequenze_attese)
n_minori_5 <- sum(frequenze_attese < 5)
percentuale <- n_minori_5 / n_celle * 100

cat("Celle con E<5:", n_minori_5, "\n")
cat("Percentuale:", percentuale, "%\n")
cat("Valida?", percentuale <= 20, "\n")

# Verifica E < 1
any(frequenze_attese < 1)  # Deve essere FALSE

🔧 COSA FARE SE VIOLATA?
1. Accorpare categorie vicine
2. Usare test esatto di Fisher (per 2×2)
3. Usare simulazione Monte Carlo (in R: simulate.p.value=TRUE)`
    },
    {
      id: 3,
      category: "Chi-quadrato - Bontà del Fit",
      difficulty: "⭐⭐⭐",
      question: "Lanci un dado 120 volte e vuoi testare se è equo. Ottieni: 1→25, 2→22, 3→18, 4→20, 5→19, 6→16. Quale ipotesi nulla stai testando?",
      options: [
        "H₀: Il dado è equo (tutte le facce hanno probabilità 1/6)",
        "H₀: Il dado è truccato",
        "H₀: Le frequenze osservate sono diverse dalle attese",
        "H₀: Il dado mostra preferenza per alcune facce"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: H₀: Il dado è equo (opzione 1)

📊 TEST CHI-QUADRATO PER BONTÀ DEL FIT

IPOTESI:
- H₀: I dati seguono la distribuzione specificata
- H₁: I dati NON seguono la distribuzione specificata

Nel nostro caso:
- H₀: p₁ = p₂ = ... = p₆ = 1/6 (dado equo)
- H₁: Almeno una probabilità è diversa

⚠️ IMPORTANTE:
H₀ rappresenta SEMPRE la distribuzione teorica che vogliamo testare!
Non scriviamo mai "è truccato" in H₀.

📈 CALCOLO COMPLETO:

osservati <- c(25, 22, 18, 20, 19, 16)
n <- sum(osservati)  # 120

# Se dado equo, ci aspettiamo 120/6 = 20 per faccia
attesi <- rep(20, 6)

# Test
test <- chisq.test(osservati, p = rep(1/6, 6))
test

# Output:
# X² = 2.5, df = 5, p-value = 0.776

# Interpretazione:
# p-value (0.776) > 0.05
# → NON rifiuto H₀
# → Il dado sembra equo

🔑 GRADI DI LIBERTÀ:
df = k - 1 - parametri_stimati
   = 6 - 1 - 0  (nessun parametro stimato)
   = 5

💡 STATISTICA TEST:
χ² = Σ (Oᵢ - Eᵢ)² / Eᵢ
   = (25-20)²/20 + (22-20)²/20 + ... + (16-20)²/20
   = 1.25 + 0.2 + 0.2 + 0 + 0.05 + 0.8
   = 2.5

📋 CODICE R COMPLETO:

# Dati
osservati <- c(25, 22, 18, 20, 19, 16)

# Metodo 1: automatico
test1 <- chisq.test(osservati, p = rep(1/6, 6))

# Metodo 2: manuale
attesi <- rep(120/6, 6)
chi_sq <- sum((osservati - attesi)^2 / attesi)
p_value <- 1 - pchisq(chi_sq, df = 5)

# Visualizzazione
barplot(rbind(osservati, attesi),
        beside = TRUE,
        col = c("blue", "red"),
        legend = c("Osservato", "Atteso"),
        names.arg = 1:6,
        main = "Test Dado Equo")`
    },
    {
      id: 4,
      category: "Chi-quadrato - Interpretazione Risultati",
      difficulty: "⭐⭐",
      question: "Fai un test chi-quadrato per indipendenza e ottieni p-value = 0.03 con α = 0.05. Quale conclusione è corretta?",
      options: [
        "Non c'è associazione tra le variabili",
        "C'è evidenza di associazione tra le variabili",
        "Le variabili sono indipendenti",
        "Il test non è conclusivo"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: C'è evidenza di associazione (opzione 2)

📊 INTERPRETAZIONE P-VALUE:

REGOLA:
- Se p-value < α → Rifiuto H₀
- Se p-value ≥ α → Non rifiuto H₀

NEL NOSTRO CASO:
p-value (0.03) < α (0.05) → **RIFIUTO H₀**

🔑 IPOTESI TEST INDIPENDENZA:
- H₀: Le due variabili sono **indipendenti**
- H₁: Le due variabili sono **associate** (dipendenti)

CONCLUSIONE:
Rifiuto H₀ → Accetto H₁
→ **C'è evidenza di associazione tra le variabili**

⚠️ FRASI CORRETTE:
✅ "C'è evidenza di associazione"
✅ "Le variabili sembrano dipendenti"
✅ "Rifiuto l'ipotesi di indipendenza"
✅ "L'associazione è statisticamente significativa"

❌ FRASI SBAGLIATE:
✗ "Le variabili sono indipendenti" (è H₀, che rifiutiamo!)
✗ "Non c'è associazione" (è H₀!)
✗ "Accetto H₀" (mai dire "accetto")

📈 ESEMPIO COMPLETO:

# Tabella Fumo × Malattia
#              Malato  Sano
# Fumatore        45    30
# Non fumatore    15    60

tabella <- matrix(c(45, 30, 15, 60), nrow=2, byrow=TRUE)
rownames(tabella) <- c("Fumatore", "Non fumatore")
colnames(tabella) <- c("Malato", "Sano")

test <- chisq.test(tabella)
test

# Output:
# X² = 24.5, df = 1, p-value < 0.001

# Interpretazione:
cat("p-value =", test$p.value, "\n")
if (test$p.value < 0.05) {
  cat("→ Rifiuto H₀\n")
  cat("→ Fumo e malattia sono ASSOCIATI\n")
  cat("→ C'è evidenza di dipendenza\n")
} else {
  cat("→ Non rifiuto H₀\n")
  cat("→ Non c'è evidenza di associazione\n")
}

💡 FORZA DELL'ASSOCIAZIONE:
Oltre al test, possiamo calcolare:

# Phi coefficient (per tabelle 2×2)
library(psych)  # se disponibile
phi(tabella)

# Cramér's V (generale)
library(lsr)  # se disponibile
cramersV(tabella)

📋 RESIDUI STANDARDIZZATI:
Per capire DOVE è l'associazione:

test$stdres
#             Malato   Sano
# Fumatore     3.5    -3.5
# Non fumatore -3.5    3.5

|residuo| > 2 → contributo significativo`
    },
    {
      id: 5,
      category: "Chi-quadrato - Scelta del Test",
      difficulty: "⭐⭐⭐",
      question: "In quale situazione useresti il test chi-quadrato per BONTÀ DEL FIT invece che per INDIPENDENZA?",
      options: [
        "Verificare se genere e preferenza politica sono indipendenti",
        "Testare se un dado a 6 facce è equo",
        "Confrontare frequenze di malattia in fumatori vs non fumatori",
        "Verificare se due variabili categoriali sono associate"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: Testare se un dado è equo (opzione 2)

🔑 DIFFERENZA TRA I DUE TEST:

┌─────────────────────────────────────────────────────────────┐
│  TEST DI BONTÀ DEL FIT (Goodness of Fit)                   │
├─────────────────────────────────────────────────────────────┤
│ • UNA sola variabile categoriale                            │
│ • Confronta osservati vs distribuzione teorica SPECIFICATA  │
│ • H₀: Dati seguono la distribuzione X                       │
│ • Gradi di libertà: df = k - 1 - parametri stimati         │
└─────────────────────────────────────────────────────────────┘

Esempi:
✓ Dado equo? (1 variabile: faccia)
✓ Numeri lotteria uniformi? (1 variabile: numero)
✓ Nascite seguono Poisson? (1 variabile: n. nascite)

┌─────────────────────────────────────────────────────────────┐
│  TEST DI INDIPENDENZA                                       │
├─────────────────────────────────────────────────────────────┤
│ • DUE variabili categoriali                                 │
│ • Verifica se sono indipendenti o associate                 │
│ • H₀: Le variabili sono indipendenti                        │
│ • Gradi di libertà: df = (r-1) × (c-1)                     │
└─────────────────────────────────────────────────────────────┘

Esempi:
✓ Genere × Preferenza politica (2 variabili)
✓ Fumo × Malattia (2 variabili)
✓ Età × Prodotto acquistato (2 variabili)

📊 ANALISI OPZIONI:

Opzione 1: "Genere e preferenza politica"
→ 2 variabili → TEST INDIPENDENZA ✗

Opzione 2: "Dado equo"
→ 1 variabile (faccia) → TEST BONTÀ FIT ✓

Opzione 3: "Fumatori vs non fumatori"
→ 2 variabili (fumo, malattia) → TEST INDIPENDENZA ✗

Opzione 4: "Due variabili associate"
→ 2 variabili → TEST INDIPENDENZA ✗

💻 CODICE R COMPARAZIONE:

## BONTÀ DEL FIT ##
# Dado: osservo 25,22,18,20,19,16
osservati <- c(25, 22, 18, 20, 19, 16)
chisq.test(osservati, p = rep(1/6, 6))
# df = 6-1 = 5

## INDIPENDENZA ##
# Genere × Preferenza
#           Dem  Rep  Ind
# Maschi     45   60   15
# Femmine    55   40   25
tabella <- matrix(c(45,60,15, 55,40,25), nrow=2, byrow=TRUE)
chisq.test(tabella)
# df = (2-1)×(3-1) = 2

📋 TRUCCO PER RICORDARE:

Una variabile? → BONTÀ FIT
"Questo dado è BUONO (equo)?"

Due variabili? → INDIPENDENZA
"Queste due variabili sono INDIPENDENTI?"

🎯 CASO PARTICOLARE - OMOGENEITÀ:
Test di omogeneità:
- Stesso procedimento di indipendenza
- Interpretazione diversa
- Confronta k popolazioni su una variabile

Esempio: "Maschi e femmine hanno stessa
distribuzione di preferenze politiche?"

(Tecnicamente indipendenza, ma interpretazione
come confronto tra popolazioni)`
    },
    {
      id: 6,
      category: "Chi-quadrato - Calcolo Manuale",
      difficulty: "⭐⭐⭐⭐",
      question: "Tabella 2×2: A=10, B=30, C=20, D=40. Quale formula calcola il chi-quadrato?",
      options: [
        "χ² = (10-30)² + (20-40)²",
        "χ² = Σ (Oᵢ - Eᵢ)² / Eᵢ per tutte le 4 celle",
        "χ² = (AD - BC)² × N / [(A+B)(C+D)(A+C)(B+D)]",
        "Sia B che C sono corrette"
      ],
      correct: 3,
      explanation: `✅ RISPOSTA CORRETTA: Sia B che C (opzione 4)

Entrambe le formule sono CORRETTE per calcolare χ²!

📐 FORMULA GENERALE (opzione B):

χ² = Σ (Oᵢ - Eᵢ)² / Eᵢ

Per tutte le celle della tabella.

📊 TABELLA:
        Col1  Col2  | Totale
Riga1    10    30   |   40
Riga2    20    40   |   60
        ─────────────┼──────
Totale   30    70   |  100 (N)

PASSO 1: Calcola frequenze attese
E₁₁ = (40 × 30) / 100 = 12
E₁₂ = (40 × 70) / 100 = 28
E₂₁ = (60 × 30) / 100 = 18
E₂₂ = (60 × 70) / 100 = 42

PASSO 2: Calcola χ²
χ² = (10-12)²/12 + (30-28)²/28 + (20-18)²/18 + (40-42)²/42
   = 4/12 + 4/28 + 4/18 + 4/42
   = 0.333 + 0.143 + 0.222 + 0.095
   = 0.793

📐 FORMULA COMPATTA PER 2×2 (opzione C):

χ² = (AD - BC)² × N / [(A+B)(C+D)(A+C)(B+D)]

dove la tabella è:
    A  B
    C  D

Nel nostro caso:
A=10, B=30, C=20, D=40, N=100

χ² = (10×40 - 30×20)² × 100 / [(40)(60)(30)(70)]
   = (400 - 600)² × 100 / [5,040,000]
   = 40,000 × 100 / 5,040,000
   = 4,000,000 / 5,040,000
   = 0.793

✓ Stesso risultato!

💻 CODICE R COMPLETO:

## Metodo 1: automatico
tabella <- matrix(c(10, 30, 20, 40), nrow=2, byrow=TRUE)
test <- chisq.test(tabella)
test$statistic  # 0.793

## Metodo 2: formula generale
O <- c(10, 30, 20, 40)  # Osservati
E <- test$expected       # Attesi
chi_sq_generale <- sum((O - E)^2 / E)
chi_sq_generale  # 0.793

## Metodo 3: formula compatta 2×2
A <- 10; B <- 30; C <- 20; D <- 40
N <- A + B + C + D
chi_sq_compatta <- (A*D - B*C)^2 * N /
                   ((A+B)*(C+D)*(A+C)*(B+D))
chi_sq_compatta  # 0.793

## Verifica tutti uguali
c(test$statistic, chi_sq_generale, chi_sq_compatta)

🎯 QUANDO USARE QUALE FORMULA?

FORMULA GENERALE:
✓ Funziona per QUALSIASI dimensione tabella
✓ Più intuitiva (differenze al quadrato)
✓ Usala per tabelle > 2×2

FORMULA COMPATTA:
✓ Solo per tabelle 2×2
✓ Più veloce da calcolare a mano
✓ Utile negli esami scritti

💡 CORREZIONE DI YATES (per 2×2):

Per tabelle 2×2 con N piccolo (<40) o
frequenze attese < 5, usa correzione:

χ²_Yates = Σ (|Oᵢ - Eᵢ| - 0.5)² / Eᵢ

In R:
chisq.test(tabella, correct = TRUE)

Riduce leggermente χ² → test più conservativo`
    },
    {
      id: 7,
      category: "Chi-quadrato - Frequenze Attese",
      difficulty: "⭐⭐⭐",
      question: "In una tabella di contingenza 2×3 con N=120, la cella (riga 1, colonna 2) ha totale riga = 50 e totale colonna = 40. Qual è la frequenza attesa per questa cella?",
      options: [
        "16.67",
        "20.00",
        "45.00",
        "90.00"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: 16.67

📐 FORMULA FREQUENZA ATTESA:

E_{ij} = (Totale Riga i × Totale Colonna j) / N

dove N = totale generale

📊 NEL NOSTRO CASO:

Tabella 2×3, N = 120
Cella (1,2):
- Totale riga 1 = 50
- Totale colonna 2 = 40

E_{1,2} = (50 × 40) / 120
        = 2000 / 120
        = 16.67

💡 INTERPRETAZIONE:

"Se le variabili fossero indipendenti,
ci aspetteremmo ~16.67 osservazioni
nella cella (1,2)"

📈 ESEMPIO COMPLETO:

       C1   C2   C3  | Tot
R1     ?    ?    ?   | 50
R2     ?    ?    ?   | 70
      ──────────────┼────
Tot   30   40   50   | 120

Calcola TUTTE le frequenze attese:

E_{1,1} = (50 × 30)/120 = 12.50
E_{1,2} = (50 × 40)/120 = 16.67 ← nostro caso
E_{1,3} = (50 × 50)/120 = 20.83

E_{2,1} = (70 × 30)/120 = 17.50
E_{2,2} = (70 × 40)/120 = 23.33
E_{2,3} = (70 × 50)/120 = 29.17

Verifica:
Σ E_{i,j} = 12.5+16.67+20.83+17.5+23.33+29.17
          = 120 ✓

💻 CODICE R:

# Supponiamo osservati:
osservati <- matrix(c(15, 18, 17,
                      15, 22, 33),
                    nrow=2, byrow=TRUE)

# Test
test <- chisq.test(osservati)

# Frequenze attese
test$expected

# Output:
#      [,1]  [,2]  [,3]
# [1,] 12.5 16.67 20.83
# [2,] 17.5 23.33 29.17

# Verifica calcolo manuale
totali_riga <- rowSums(osservati)
totali_colonna <- colSums(osservati)
N <- sum(osservati)

# Cella (1,2)
E_1_2 <- (totali_riga[1] * totali_colonna[2]) / N
E_1_2  # 16.67

🔑 PROPRIETÀ FREQUENZE ATTESE:

1. Σ Eᵢⱼ = N (somma = totale)

2. Totale riga atteso = Totale riga osservato
   sum(E[1,]) = totali_riga[1]

3. Totale colonna atteso = Totale colonna osservato
   sum(E[,2]) = totali_colonna[2]

4. Se indipendenza: P(A∩B) = P(A)×P(B)
   Eᵢⱼ = N × P(Rᵢ) × P(Cⱼ)
       = N × (nᵢ/N) × (nⱼ/N)
       = (nᵢ × nⱼ) / N

⚠️ ATTENZIONE ESAMI:

Errore comune: confondere totali!
- Totale RIGA (orizzontale)
- Totale COLONNA (verticale)
- Totale GENERALE (N)

Usa sempre la formula:
E = (Tot_Riga × Tot_Colonna) / N`
    },
    {
      id: 8,
      category: "Chi-quadrato - Test vs Fisher",
      difficulty: "⭐⭐⭐",
      question: "Quando dovresti usare il test esatto di Fisher invece del chi-quadrato?",
      options: [
        "Sempre per tabelle 2×2",
        "Quando la regola di Cochran è violata (es. E < 5 in più del 20% celle)",
        "Quando N > 1000",
        "Quando vuoi massima potenza del test"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: Quando regola Cochran violata (opzione 2)

🔑 TEST ESATTO DI FISHER:

Usa quando:
1. Tabella 2×2 CON campione piccolo
2. Frequenze attese < 5 in una o più celle
3. Regola di Cochran violata
4. N molto piccolo (< 20-40)

⚠️ NON necessario se:
- Tutte le E ≥ 5
- N grande (>100)
- Regola Cochran soddisfatta

📊 CONFRONTO:

┌────────────────────────────────────────────┐
│  Test Chi-quadrato                         │
├────────────────────────────────────────────┤
│ • Basato su approssimazione χ²             │
│ • Richiede E ≥ 5 (con eccezioni)          │
│ • Veloce da calcolare                      │
│ • Standard per campioni grandi             │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│  Test Esatto di Fisher                     │
├────────────────────────────────────────────┤
│ • Calcola probabilità esatta               │
│ • Nessuna assunzione su E                  │
│ • Computazionalmente intensivo             │
│ • Necessario per campioni piccoli          │
└────────────────────────────────────────────┘

📈 ESEMPIO:

Scenario 1: N grande, E tutte ≥ 5
#           Guariti  Non guariti
# Farmaco      80        20
# Placebo      70        30

tabella1 <- matrix(c(80,20,70,30), nrow=2)
chisq.test(tabella1)  # OK! ✓
# Tutte E > 5

Scenario 2: N piccolo, alcune E < 5
#           Guariti  Non guariti
# Farmaco      8         2
# Placebo      3         7

tabella2 <- matrix(c(8,2,3,7), nrow=2)
test_chi <- chisq.test(tabella2)
test_chi$expected
#      [,1] [,2]
# [1,]  5.5  4.5
# [2,]  5.5  4.5

# E < 5 in 50% celle → violazione!
# Warning: Chi-squared approximation may be incorrect

# Usa Fisher:
fisher.test(tabella2)  # Meglio! ✓

💻 CODICE R COMPLETO:

# Tabella piccola
tabella <- matrix(c(8, 2, 3, 7), nrow=2)

# 1. Test Chi-quadrato (con warning)
chi_test <- chisq.test(tabella)
chi_test

# 2. Test esatto di Fisher
fisher_test <- fisher.test(tabella)
fisher_test

# Confronto p-value
cat("Chi-quadrato p-value:", chi_test$p.value, "\n")
cat("Fisher p-value:", fisher_test$p.value, "\n")

# Fisher è più accurato per N piccolo!

🎯 REGOLE PRATICHE:

N > 40 E tutte E ≥ 5:
→ Chi-quadrato OK ✓

N < 40 O alcune E < 5:
→ Fisher raccomandato ✓

N molto grande (>1000):
→ Chi-quadrato OK (Fisher lento) ✓

💡 SIMULAZIONE MONTE CARLO:

Alternativa a Fisher per tabelle > 2×2:

chisq.test(tabella,
           simulate.p.value = TRUE,
           B = 10000)

# Simula distribuzione χ² invece di usare
# approssimazione teorica

⚠️ NOTE:

1. Fisher è ESATTO (non approssimato)
2. Fisher solo per tabelle 2×2 (in R base)
3. Per tabelle grandi, Fisher molto lento
4. Chi-quadrato con N grande è affidabile

📋 DECISIONE ALGORITMO:

if (qualsiasi E < 1 OR >20% celle con E < 5) {
  if (tabella è 2×2) {
    usa fisher.test()
  } else {
    usa chisq.test(simulate.p.value=TRUE)
  }
} else {
  usa chisq.test()  # Standard
}`
    }
  ];

  const handleAnswer = (questionIndex, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex
    });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        correct++;
      }
    });
    setScore(correct);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const currentQ = questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const isCorrect = selectedAnswers[currentQuestion] === currentQ.correct;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl mb-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <BookOpen className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">Quiz Test Chi-quadrato</h1>
            <p className="text-indigo-100 mt-1">
              8 domande su indipendenza, bontà del fit e regola di Cochran
            </p>
          </div>
        </div>

        {!showResults && (
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Domanda {currentQuestion + 1} di {questions.length}</span>
            </div>
            <div>
              Risposte: {Object.keys(selectedAnswers).length}/{questions.length}
            </div>
          </div>
        )}
      </div>

      {!showResults ? (
        <>
          <div className="flex gap-2 mb-6 flex-wrap">
            {questions.map((_, index) => {
              const answered = selectedAnswers[index] !== undefined;
              return (
                <button
                  key={index}
                  onClick={() => goToQuestion(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    currentQuestion === index
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-200'
                      : answered
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
            <div className="flex justify-between items-start mb-6 flex-wrap gap-3">
              <span className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
                {currentQ.category}
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                Difficoltà: {currentQ.difficulty}
              </span>
            </div>

            <h2 className="text-2xl font-semibold mb-8 leading-relaxed text-gray-800">
              {currentQ.question}
            </h2>

            <div className="space-y-4">
              {currentQ.options.map((option, index) => {
                const selected = selectedAnswers[currentQuestion] === index;
                const showCorrect = isAnswered && index === currentQ.correct;
                const showWrong = isAnswered && selected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(currentQuestion, index)}
                    disabled={isAnswered}
                    className={`w-full p-5 text-left rounded-xl border-3 transition ${
                      showCorrect
                        ? 'border-green-500 bg-green-50'
                        : showWrong
                        ? 'border-red-500 bg-red-50'
                        : selected
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50'
                    } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        showCorrect
                          ? 'bg-green-500 text-white'
                          : showWrong
                          ? 'bg-red-500 text-white'
                          : selected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1 text-base">{option}</span>
                      {showCorrect && <CheckCircle className="w-6 h-6 text-green-600" />}
                      {showWrong && <XCircle className="w-6 h-6 text-red-600" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className={`mt-8 p-6 rounded-xl border-l-4 ${
                isCorrect
                  ? 'bg-green-50 border-green-500'
                  : 'bg-orange-50 border-orange-500'
              }`}>
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-3 ${
                  isCorrect ? 'text-green-800' : 'text-orange-800'
                }`}>
                  {isCorrect ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                  {isCorrect ? 'Corretto!' : 'Non corretto'}
                </h3>
                <div className="whitespace-pre-line text-base leading-relaxed text-gray-700">
                  {currentQ.explanation}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between gap-4">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              ← Precedente
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={calculateScore}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-lg"
              >
                Mostra Risultati
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Successiva →
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl p-10 shadow-lg text-center">
          <div className={`w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl font-bold text-white shadow-xl ${
            score >= 6 ? 'bg-green-500' : score >= 4 ? 'bg-orange-500' : 'bg-red-500'
          }`}>
            {score}/{questions.length}
          </div>

          <h2 className="text-4xl font-bold mb-4">
            {score >= 6 ? '🎉 Ottimo lavoro!' :
             score >= 4 ? '👍 Buon risultato!' :
             '📚 Continua a studiare!'}
          </h2>

          <p className="text-xl text-gray-600 mb-8">
            Hai risposto correttamente a {score} domande su {questions.length}
          </p>

          <div className="bg-gray-50 p-6 rounded-xl mb-8 text-left">
            <h3 className="text-xl font-bold mb-4">📊 Dettaglio Risposte:</h3>
            {questions.map((q, index) => {
              const correct = selectedAnswers[index] === q.correct;
              return (
                <div
                  key={index}
                  className={`p-4 bg-white rounded-lg mb-3 border-l-4 ${
                    correct ? 'border-green-500' : 'border-red-500'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      Domanda {index + 1}: {q.category}
                    </span>
                    {correct ?
                      <CheckCircle className="w-5 h-5 text-green-600" /> :
                      <XCircle className="w-5 h-5 text-red-600" />
                    }
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={resetQuiz}
            className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-3 mx-auto shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Ricomincia Quiz
          </button>
        </div>
      )}

      <div className="mt-8 bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
        <h3 className="text-xl font-bold text-purple-900 mb-4">💡 Argomenti Trattati:</h3>
        <ul className="grid grid-cols-2 gap-3 text-gray-700">
          <li>✓ Test Indipendenza (df, tabelle)</li>
          <li>✓ Regola di Cochran</li>
          <li>✓ Test Bontà del Fit</li>
          <li>✓ Interpretazione p-value</li>
          <li>✓ Scelta del test corretto</li>
          <li>✓ Calcolo χ² manuale</li>
          <li>✓ Frequenze attese</li>
          <li>✓ Test di Fisher</li>
        </ul>
      </div>
    </div>
  );
};

export default QuizChiQuadro;
