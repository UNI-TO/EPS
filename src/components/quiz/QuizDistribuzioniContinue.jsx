import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, RotateCcw, BookOpen } from 'lucide-react';

const QuizDistribuzioniContinue = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      category: "Normale - pnorm",
      difficulty: "⭐⭐",
      question: "X ~ N(100, 225). Calcola P(X ≤ 115). Quale comando R è corretto?",
      options: [
        "pnorm(115, 100, 225)",
        "pnorm(115, 100, 15)",
        "pnorm(115, mean=100, sd=15)",
        "Sia B che C sono corrette"
      ],
      correct: 3,
      explanation: `✅ RISPOSTA CORRETTA: Sia B che C (opzione 4)

📊 DISTRIBUZIONE NORMALE: X ~ N(μ, σ²)

Parametri:
- μ = 100 (media)
- σ² = 225 (varianza)
- σ = √225 = 15 (deviazione standard)

⚠️ ATTENZIONE: pnorm() usa DEVIAZIONE STANDARD (σ), NON varianza!

💻 COMANDI CORRETTI:

# Opzione B: posizionale
pnorm(115, 100, 15)
# Ordine: pnorm(x, mean, sd)

# Opzione C: con nomi
pnorm(115, mean=100, sd=15)

Entrambi danno: 0.8413

❌ SBAGLIATO:
pnorm(115, 100, 225)  # Usa varianza invece di SD!

🔑 FUNZIONI NORMALE IN R:

pnorm(x, mean=μ, sd=σ)  → P(X ≤ x)
pnorm(x, μ, σ, lower.tail=FALSE) → P(X > x)
qnorm(p, μ, σ)  → x tale che P(X ≤ x) = p
dnorm(x, μ, σ)  → f(x) densità in x
rnorm(n, μ, σ)  → genera n valori casuali

📈 ESEMPIO COMPLETO:

# Dati
mu <- 100
sigma2 <- 225
sigma <- sqrt(sigma2)  # 15

# P(X ≤ 115)
pnorm(115, mu, sigma)  # 0.8413

# P(X > 115)
1 - pnorm(115, mu, sigma)  # 0.1587
# Oppure:
pnorm(115, mu, sigma, lower.tail=FALSE)

# P(90 < X < 110)
pnorm(110, mu, sigma) - pnorm(90, mu, sigma)  # 0.4950`
    },
    {
      id: 2,
      category: "Esponenziale - Rate vs Media",
      difficulty: "⭐⭐⭐",
      question: "Il tempo di attesa al telefono segue una distribuzione esponenziale con media 5 minuti. Come calcoli P(X > 8)?",
      options: [
        "1 - pexp(8, rate=5)",
        "1 - pexp(8, rate=1/5)",
        "pexp(8, rate=1/5, lower.tail=FALSE)",
        "Sia B che C sono corrette"
      ],
      correct: 3,
      explanation: `✅ RISPOSTA CORRETTA: Sia B che C (opzione 4)

📊 DISTRIBUZIONE ESPONENZIALE: X ~ Exp(λ)

⚠️ ERRORE COMUNE: Confondere rate λ con media μ!

RELAZIONE:
- Media: μ = 1/λ
- Rate: λ = 1/μ

Se μ = 5, allora λ = 1/5 = 0.2

💻 COMANDI CORRETTI:

# Opzione B: manuale
1 - pexp(8, rate=1/5)  # 0.2019

# Opzione C: con lower.tail
pexp(8, rate=1/5, lower.tail=FALSE)  # 0.2019

Entrambi corretti!

❌ SBAGLIATO:
1 - pexp(8, rate=5)  # Usa media invece di rate!

🔑 FUNZIONI ESPONENZIALE IN R:

pexp(x, rate=λ)  → P(X ≤ x)
pexp(x, rate=λ, lower.tail=FALSE)  → P(X > x)
qexp(p, rate=λ)  → x tale che P(X ≤ x) = p
dexp(x, rate=λ)  → f(x) densità in x
rexp(n, rate=λ)  → genera n valori casuali

📐 FORMULE:

E[X] = 1/λ = μ
Var(X) = 1/λ² = μ²
P(X > t) = e^(-λt) = exp(-t/μ)

📈 ESEMPIO COMPLETO:

# Media 5 minuti
media <- 5
lambda <- 1/media  # 0.2

# P(X > 8)
prob <- 1 - pexp(8, rate=lambda)  # 0.2019

# Verifica con formula diretta
exp(-8/media)  # 0.2019 ✓

# P(X ≤ 3)
pexp(3, rate=lambda)  # 0.4512

💡 PROPRIETÀ MEMORYLESS:
P(X > s+t | X > s) = P(X > t)

# Esempio: P(X > 10 | X > 5) = P(X > 5)
pexp(10, lambda, lower.tail=FALSE) /
  pexp(5, lambda, lower.tail=FALSE)
# Uguale a:
pexp(5, lambda, lower.tail=FALSE)`
    },
    {
      id: 3,
      category: "Normale - qnorm",
      difficulty: "⭐⭐",
      question: "Vuoi trovare il valore x tale che P(X ≤ x) = 0.95 per X ~ N(50, 100). Quale comando?",
      options: [
        "qnorm(0.95, 50, 100)",
        "qnorm(0.95, 50, 10)",
        "pnorm(0.95, 50, 10)",
        "qnorm(0.05, 50, 10)"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: qnorm(0.95, 50, 10)

📊 FUNZIONE QUANTILE: qnorm()

qnorm(p, mean, sd) trova x tale che P(X ≤ x) = p

Parametri:
- p = 0.95 (probabilità)
- mean = 50
- sd = √100 = 10 (NON varianza!)

💻 COMANDO CORRETTO:

qnorm(0.95, 50, 10)  # x ≈ 66.45

Verifica:
pnorm(66.45, 50, 10)  # ≈ 0.95 ✓

❌ ERRORI:

qnorm(0.95, 50, 100)  # Usa varianza! ✗
pnorm(0.95, ...)  # pnorm calcola P, non x! ✗
qnorm(0.05, ...)  # Sbagliata probabilità! ✗

🔑 QUANDO USARE QUALE:

pnorm: Hai X, vuoi P
qnorm: Hai P, vuoi X

📈 ESEMPI:

# X ~ N(50, 100), sd=10

# 95° percentile
qnorm(0.95, 50, 10)  # 66.45

# 5° percentile
qnorm(0.05, 50, 10)  # 33.55

# Mediana (50° percentile)
qnorm(0.50, 50, 10)  # 50 (= media per normale)

# Quartili
qnorm(0.25, 50, 10)  # Q1 = 43.26
qnorm(0.75, 50, 10)  # Q3 = 56.74

💡 NORMALE STANDARD Z ~ N(0,1):

# Valore critico per α=0.05 (bilaterale)
qnorm(0.975)  # 1.96

# Valore critico per α=0.01 (bilaterale)
qnorm(0.995)  # 2.576

# Regola 68-95-99.7
qnorm(0.84)  # ≈ 1 (68% entro ±1σ)
qnorm(0.975) # ≈ 2 (95% entro ±2σ)
qnorm(0.9985) # ≈ 3 (99.7% entro ±3σ)`
    },
    {
      id: 4,
      category: "Normale - Probabilità Condizionata",
      difficulty: "⭐⭐⭐⭐",
      question: "X ~ N(10, 4). Calcola P(X < 12 | X > 9). Quale approccio è corretto?",
      options: [
        "P(X < 12 | X > 9) = P(9 < X < 12) / P(X > 9)",
        "P(X < 12 | X > 9) = pnorm(12, 10, 2) - pnorm(9, 10, 2)",
        "P(X < 12 | X > 9) = pnorm(12, 10, 2)",
        "Nessuna delle precedenti"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: Opzione 1

📐 PROBABILITÀ CONDIZIONATA:

P(A | B) = P(A ∩ B) / P(B)

Nel nostro caso:
A = {X < 12}
B = {X > 9}
A ∩ B = {9 < X < 12}

P(X < 12 | X > 9) = P(9 < X < 12) / P(X > 9)

💻 CODICE R COMPLETO:

mu <- 10
sigma <- 2  # sd = √4 = 2

# Numeratore: P(9 < X < 12)
numeratore <- pnorm(12, mu, sigma) - pnorm(9, mu, sigma)

# Denominatore: P(X > 9)
denominatore <- 1 - pnorm(9, mu, sigma)

# Probabilità condizionata
prob_cond <- numeratore / denominatore

cat("P(9 < X < 12) =", numeratore, "\n")
cat("P(X > 9) =", denominatore, "\n")
cat("P(X < 12 | X > 9) =", prob_cond, "\n")

# Risultato: ≈ 0.7745

📊 VERIFICA GRAFICA:

x <- seq(4, 16, 0.1)
y <- dnorm(x, mu, sigma)

plot(x, y, type="l", lwd=2,
     main="P(X < 12 | X > 9)")

# Regione condizionante: X > 9
polygon(c(9, x[x>9], 16),
        c(0, y[x>9], 0),
        col=rgb(0,0,1,0.3))

# Regione d'interesse: 9 < X < 12
polygon(c(9, x[x>9 & x<12], 12),
        c(0, y[x>9 & x<12], 0),
        col=rgb(1,0,0,0.5))

abline(v=c(9,12), lty=2, col="red")

💡 INTERPRETAZIONE:

"Sapendo che X > 9, qual è la probabilità che X < 12?"

Restringiamo lo spazio campionario a X > 9,
poi calcoliamo la probabilità di X < 12 in questo spazio.

⚠️ ERRORI COMUNI:

# SBAGLIATO 1: Non condizionare
pnorm(12, mu, sigma)  # Ignora condizione X > 9

# SBAGLIATO 2: Solo numeratore
pnorm(12, mu, sigma) - pnorm(9, mu, sigma)
# Manca la divisione per P(X > 9)

# CORRETTO:
(pnorm(12, mu, sigma) - pnorm(9, mu, sigma)) /
  (1 - pnorm(9, mu, sigma))

🔑 PATTERN GENERALE:

P(a < X < b | X > c) dove c < a < b:
= P(a < X < b) / P(X > c)
= [pnorm(b) - pnorm(a)] / [1 - pnorm(c)]

P(X > b | X > a) dove a < b:
= P(X > b) / P(X > a)
= [1 - pnorm(b)] / [1 - pnorm(a)]`
    },
    {
      id: 5,
      category: "Esponenziale - Applicazioni",
      difficulty: "⭐⭐⭐",
      question: "Durata batteria ~ Exp con media 500 ore. Qual è la probabilità che duri almeno 700 ore?",
      options: [
        "exp(-700/500) = 0.2466",
        "1 - exp(-700/500) = 0.7534",
        "pexp(700, rate=1/500) = 0.7534",
        "Sia A che B sono corrette"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: exp(-700/500) = 0.2466

📊 DISTRIBUZIONE ESPONENZIALE

Durata ~ Exp(λ) con μ = 500 ore
λ = 1/μ = 1/500 = 0.002

Vogliamo: P(X ≥ 700) = P(X > 700)

💡 FORMULE EQUIVALENTI:

# Metodo 1: Formula diretta
P(X > t) = e^(-λt) = e^(-t/μ)
exp(-700/500)  # 0.2466

# Metodo 2: Con pexp
1 - pexp(700, rate=1/500)  # 0.2466

# Metodo 3: Con lower.tail
pexp(700, rate=1/500, lower.tail=FALSE)  # 0.2466

Tutti danno stesso risultato!

❌ SBAGLIATO:
1 - exp(-700/500)  # Questo è P(X ≤ 700)!

💻 CODICE COMPLETO:

media <- 500
lambda <- 1/media

# P(X > 700)
prob_A <- exp(-700/media)
prob_B <- 1 - pexp(700, rate=lambda)
prob_C <- pexp(700, rate=lambda, lower.tail=FALSE)

cat("Metodo formula:", prob_A, "\n")
cat("Metodo pexp (1):", prob_B, "\n")
cat("Metodo pexp (2):", prob_C, "\n")
# Tutti = 0.2466

# P(X ≤ 700)
prob_less <- pexp(700, rate=lambda)  # 0.7534

📈 PROBLEMA TIPICO ESAME:

"La durata di una batteria segue distribuzione
esponenziale con media 500 ore."

a) P(dura più di 700 ore)?
   exp(-700/500) = 0.2466

b) P(dura meno di 300 ore)?
   pexp(300, rate=1/500) = 0.4512

c) P(dura tra 400 e 600 ore)?
   pexp(600, 1/500) - pexp(400, 1/500)
   = 0.6988 - 0.5507 = 0.1481

d) Mediana?
   qexp(0.5, rate=1/500)
   = 346.6 ore

e) 90° percentile?
   qexp(0.9, rate=1/500)
   = 1151.3 ore

💡 PROPRIETÀ UTILI:

# Media e varianza
media <- 500
varianza <- media^2  # 250000
sd <- media  # 500 (SD = media!)

# Memoryless property
# P(X > 100+200 | X > 100) = P(X > 200)
exp(-200/media)  # Uguale a...
exp(-300/media) / exp(-100/media)`
    },
    {
      id: 6,
      category: "Normale - Standardizzazione",
      difficulty: "⭐⭐⭐",
      question: "X ~ N(50, 25). Come calcoli P(X > 60) usando la normale standard?",
      options: [
        "1 - pnorm((60-50)/25)",
        "1 - pnorm((60-50)/5)",
        "pnorm((60-50)/5, lower.tail=FALSE)",
        "Sia B che C sono corrette"
      ],
      correct: 3,
      explanation: `✅ RISPOSTA CORRETTA: Sia B che C (opzione 4)

📐 STANDARDIZZAZIONE (Z-score)

Se X ~ N(μ, σ²), allora:
Z = (X - μ) / σ ~ N(0, 1)

Nel nostro caso:
- μ = 50
- σ² = 25
- σ = 5

Standardizzare x = 60:
z = (60 - 50) / 5 = 2

P(X > 60) = P(Z > 2)

💻 COMANDI CORRETTI:

# Metodo diretto (senza standardizzare)
1 - pnorm(60, mean=50, sd=5)  # 0.0228

# Metodo con standardizzazione - Opzione B
1 - pnorm((60-50)/5)  # 0.0228

# Metodo con standardizzazione - Opzione C
pnorm((60-50)/5, lower.tail=FALSE)  # 0.0228

Tutti equivalenti!

❌ SBAGLIATO:
1 - pnorm((60-50)/25)  # Divide per varianza! ✗

🔑 PERCHÉ STANDARDIZZARE?

Vantaggio: Puoi usare tabelle Z standard
(utile quando non hai computer)

# Dalla tabella Z
z <- 2
P(Z > 2) = 1 - Φ(2) = 1 - 0.9772 = 0.0228

📈 ESEMPIO COMPLETO:

# X ~ N(50, 25), sd=5

# P(X > 60)
x <- 60
z <- (x - 50) / 5  # 2
prob <- 1 - pnorm(z)  # 0.0228

# P(45 < X < 55)
z1 <- (45 - 50) / 5  # -1
z2 <- (55 - 50) / 5  # 1
prob <- pnorm(z2) - pnorm(z1)  # 0.6827

# Verifica senza standardizzare
pnorm(55, 50, 5) - pnorm(45, 50, 5)  # 0.6827 ✓

💡 REGOLA 68-95-99.7:

# 68% entro μ ± 1σ
P(45 < X < 55) = pnorm(1) - pnorm(-1)  # 0.6827

# 95% entro μ ± 2σ
P(40 < X < 60) = pnorm(2) - pnorm(-2)  # 0.9545

# 99.7% entro μ ± 3σ
P(35 < X < 65) = pnorm(3) - pnorm(-3)  # 0.9973

🎯 QUANDO STANDARDIZZARE:

ESAMI SENZA COMPUTER:
✓ Standardizza e usa tabella Z

ESAMI CON R:
✗ Non necessario, usa pnorm direttamente
(ma utile per capire concettualmente)

📋 FUNZIONI NORMALI EQUIVALENTI:

# Originale
pnorm(x, mean=mu, sd=sigma)

# Standardizzata
pnorm((x - mu) / sigma)`
    },
    {
      id: 7,
      category: "Esponenziale vs Geometrica",
      difficulty: "⭐⭐⭐⭐",
      question: "Quando usare Esponenziale vs Geometrica?",
      options: [
        "Esponenziale: tempo continuo / Geometrica: prove discrete",
        "Esponenziale: eventi rari / Geometrica: eventi comuni",
        "Esponenziale: con memoria / Geometrica: senza memoria",
        "Sono intercambiabili"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: Opzione 1

🔑 DIFFERENZA CHIAVE: Continua vs Discreta

┌──────────────────────────────────────────┐
│  ESPONENZIALE (Continua)                 │
├──────────────────────────────────────────┤
│ • Modella TEMPO fino a evento            │
│ • Variabile continua: t ∈ [0, +∞)       │
│ • X ~ Exp(λ)                             │
│ • E[X] = 1/λ                             │
│ • Memoryless                             │
└──────────────────────────────────────────┘

Esempi:
✓ Tempo attesa telefono (minuti)
✓ Durata batteria (ore)
✓ Tempo tra arrivi clienti (secondi)
✓ Durata chiamata (minuti)

┌──────────────────────────────────────────┐
│  GEOMETRICA (Discreta)                   │
├──────────────────────────────────────────┤
│ • Modella NUMERO PROVE fino a successo   │
│ • Variabile discreta: k = 1,2,3,...      │
│ • Y ~ Geom(p)                            │
│ • E[Y] = 1/p                             │
│ • Memoryless                             │
└──────────────────────────────────────────┘

Esempi:
✓ Lanci dado fino a 6 (prove)
✓ Monete fino a testa (lanci)
✓ Prodotti ispezionati fino a difetto
✓ Clienti serviti fino a reclamo

📊 CONFRONTO DIRETTO:

SCENARIO: Arrivi cliente

ESPONENZIALE:
"Tempo (in minuti) tra un cliente e l'altro"
X ~ Exp(λ=1/5) se media 5 min
X ∈ [0, +∞) continuo

GEOMETRICA:
"Numero di minuti interi fino a arrivo"
Y ~ Geom(p) discrete
Y ∈ {1, 2, 3, ...}

💻 CODICE CONFRONTO:

## ESPONENZIALE ##
media <- 5
lambda <- 1/media

# P(tempo > 7 minuti)
pexp(7, rate=lambda, lower.tail=FALSE)  # 0.2466

# Tempo medio
1/lambda  # 5 minuti

## GEOMETRICA ##
# Se successo ogni minuto ha p=0.2
p <- 0.2

# P(serve più di 7 prove)
pgeom(6, prob=p, lower.tail=FALSE)  # 0.2097

# Numero medio prove
1/p  # 5 prove

⚠️ ERRORI COMUNI:

"Lanci dado fino a 6, quanto tempo?"
→ SBAGLIATO: Esponenziale
→ CORRETTO: Geometrica (prove discrete!)

"Minuti attesa telefono"
→ SBAGLIATO: Geometrica
→ CORRETTO: Esponenziale (tempo continuo!)

💡 ENTRAMBE MEMORYLESS:

# Esponenziale
P(X > s+t | X > s) = P(X > t)

# Geometrica
P(Y > n+k | Y > n) = P(Y > k)

Sono le UNICHE distribuzioni memoryless
(continua e discreta rispettivamente)!

📋 DECISION TREE:

Domanda: "Tempo o numero prove?"

TEMPO (continuo)?
→ Esponenziale
  Esempio: "Attendi X minuti"

PROVE (discrete)?
→ Geometrica
  Esempio: "Servono Y tentativi"

🎯 RELAZIONE:

Se arrivi seguono Poisson(λ) per unità tempo,
allora tempi tra arrivi ~ Exp(λ)

Sono complementari:
- Poisson conta eventi in tempo fisso
- Esponenziale misura tempo tra eventi`
    },
    {
      id: 8,
      category: "Normale - Calcoli Compositi",
      difficulty: "⭐⭐⭐⭐",
      question: "X ~ N(20, 16), Y ~ N(30, 9). Se X e Y indipendenti, quanto vale E[2X - Y] e Var(2X - Y)?",
      options: [
        "E = 10, Var = 25",
        "E = 10, Var = 73",
        "E = 50, Var = 25",
        "Non si può calcolare senza correlazione"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: E = 10, Var = 73

📐 PROPRIETÀ COMBINAZIONI LINEARI

Se X ~ N(μₓ, σₓ²) e Y ~ N(μᵧ, σᵧ²) indipendenti:

aX + bY ~ N(aμₓ + bμᵧ, a²σₓ² + b²σᵧ²)

Nel nostro caso:
Z = 2X - Y = 2X + (-1)Y

PASSO 1: Valore Atteso
E[Z] = E[2X - Y]
     = 2E[X] - E[Y]
     = 2(20) - 30
     = 10

PASSO 2: Varianza
Var(Z) = Var(2X - Y)
       = Var(2X) + Var(-Y)  (indipendenti!)
       = 4Var(X) + 1²Var(Y)
       = 4(16) + 1(9)
       = 64 + 9
       = 73

⚠️ IMPORTANTE:
- Varianza di aX = a² Var(X), non a Var(X)
- Per indipendenti: Var(X ± Y) = Var(X) + Var(Y)
  (segno + anche per sottrazione!)

💻 VERIFICA CON SIMULAZIONE:

set.seed(123)
n <- 100000

# Genera X e Y indipendenti
X <- rnorm(n, mean=20, sd=4)  # sd = √16
Y <- rnorm(n, mean=30, sd=3)  # sd = √9

# Z = 2X - Y
Z <- 2*X - Y

# Verifica media
mean(Z)  # ≈ 10 ✓

# Verifica varianza
var(Z)   # ≈ 73 ✓

# Verifica normalità
hist(Z, breaks=50, prob=TRUE)
curve(dnorm(x, 10, sqrt(73)), add=TRUE, col="red", lwd=2)

📊 ALTRE COMBINAZIONI:

# X + Y
E[X + Y] = 20 + 30 = 50
Var(X + Y) = 16 + 9 = 25

# X - Y
E[X - Y] = 20 - 30 = -10
Var(X - Y) = 16 + 9 = 25  (stesso!)

# 3X + 2Y
E[3X + 2Y] = 3(20) + 2(30) = 120
Var(3X + 2Y) = 9(16) + 4(9) = 180

🔑 FORMULE GENERALI:

Per Z = aX + bY con X, Y indipendenti:

E[Z] = aE[X] + bE[Y]

Var(Z) = a²Var(X) + b²Var(Y)

SD(Z) = √[a²Var(X) + b²Var(Y)]

Se X, Y normali → Z normale

💡 CASO NON INDIPENDENTI:

Se Cov(X,Y) ≠ 0:

Var(aX + bY) = a²Var(X) + b²Var(Y) + 2ab·Cov(X,Y)

Con correlazione ρ:
Cov(X,Y) = ρ·SD(X)·SD(Y)

📈 ESEMPIO APPLICATO:

"Media di due esami: M = (X + Y)/2
dove X ~ N(24, 9) e Y ~ N(26, 16)"

E[M] = E[(X+Y)/2] = (24+26)/2 = 25

Var(M) = Var[(X+Y)/2]
       = (1/4)[Var(X) + Var(Y)]
       = (1/4)(9 + 16)
       = 6.25

SD(M) = √6.25 = 2.5

M ~ N(25, 6.25)

# P(media > 27)?
1 - pnorm(27, mean=25, sd=2.5)  # 0.2119`
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
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8 rounded-xl mb-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <BookOpen className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">Quiz Distribuzioni Continue</h1>
            <p className="text-emerald-100 mt-1">
              8 domande su Normale, Esponenziale e probabilità condizionate
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
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-200'
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
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 bg-white hover:border-emerald-300 hover:bg-gray-50'
                    } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        showCorrect
                          ? 'bg-green-500 text-white'
                          : showWrong
                          ? 'bg-red-500 text-white'
                          : selected
                          ? 'bg-emerald-600 text-white'
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
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
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
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition"
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
            className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition flex items-center gap-3 mx-auto shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Ricomincia Quiz
          </button>
        </div>
      )}

      <div className="mt-8 bg-teal-50 p-6 rounded-xl border-l-4 border-teal-500">
        <h3 className="text-xl font-bold text-teal-900 mb-4">💡 Argomenti Trattati:</h3>
        <ul className="grid grid-cols-2 gap-3 text-gray-700">
          <li>✓ pnorm (calcolo probabilità)</li>
          <li>✓ Rate vs Media Esponenziale</li>
          <li>✓ qnorm (calcolo quantili)</li>
          <li>✓ Probabilità condizionata</li>
          <li>✓ Esponenziale (applicazioni)</li>
          <li>✓ Standardizzazione Z-score</li>
          <li>✓ Esponenziale vs Geometrica</li>
          <li>✓ Combinazioni lineari</li>
        </ul>
      </div>
    </div>
  );
};

export default QuizDistribuzioniContinue;
