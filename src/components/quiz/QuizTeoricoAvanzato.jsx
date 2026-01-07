import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, RotateCcw, BookOpen } from 'lucide-react';

const QuizTeoricoAvanzato = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      category: "Teoria - Distribuzioni Continue",
      difficulty: "⭐⭐",
      question: "La variabile aleatoria normale è una variabile aleatoria _____ . È caratterizzata da due parametri reali, la _____ e la varianza. La varianza è una quantità _____ . Il supporto della variabile aleatoria normale corrisponde a _____ .",
      options: [
        "continua / media / non negativa / tutto l'asse reale",
        "discreta / mediana / positiva / i reali positivi",
        "continua / mediana / negativa / i reali negativi",
        "continua / moda / zero / [-1, 1]"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: opzione 1

"La variabile aleatoria normale è una variabile aleatoria CONTINUA.
È caratterizzata da due parametri reali, la MEDIA e la varianza.
La varianza è una quantità NON NEGATIVA.
Il supporto della variabile aleatoria normale corrisponde a TUTTO L'ASSE REALE."

📚 CONCETTI CHIAVE:

1. CONTINUA vs DISCRETA:
   - Normale è continua (può assumere qualsiasi valore reale)
   - Discreta solo per variabili come Binomiale, Poisson, Geometrica

2. PARAMETRI:
   - μ (media/valore atteso) - centro della distribuzione
   - σ² (varianza) - dispersione intorno alla media
   - σ (deviazione standard) = √σ²

3. VARIANZA:
   - Sempre σ² ≥ 0 (non negativa)
   - Mai negativa per definizione

4. SUPPORTO:
   - ℝ = (-∞, +∞) tutto l'asse reale
   - Teoricamente X può essere qualsiasi valore

💡 NOTAZIONE: X ~ N(μ, σ²)`
    },
    {
      id: 2,
      category: "Teoria - Test di Ipotesi",
      difficulty: "⭐⭐⭐",
      question: "Nel contesto dei test di ipotesi, l'errore di primo tipo consiste nel:",
      options: [
        "Rifiutare l'ipotesi nulla quando essa è vera",
        "Non rifiutare l'ipotesi nulla quando essa è falsa",
        "Rifiutare l'ipotesi alternativa quando essa è vera",
        "Accettare l'ipotesi nulla quando essa è vera"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: opzione 1

"Rifiutare l'ipotesi nulla quando essa è vera"

📊 TABELLA DEGLI ERRORI:

                    | H₀ VERA     | H₀ FALSA
--------------------+-------------+-------------
NON RIFIUTO H₀      | ✅ Corretto | ❌ Errore II (β)
RIFIUTO H₀          | ❌ Errore I (α) | ✅ Corretto

🔑 DEFINIZIONI:

ERRORE DI PRIMO TIPO (α):
- Rifiuto H₀ quando è vera
- "Falso positivo"
- Probabilità controllata dal livello di significatività α (es. 0.05)

ERRORE DI SECONDO TIPO (β):
- Non rifiuto H₀ quando è falsa
- "Falso negativo"
- Probabilità più difficile da controllare

📌 ESEMPIO:
Test farmaco (H₀: farmaco non efficace)
- Errore I: Concludo che funziona ma non funziona
- Errore II: Concludo che non funziona ma funziona

⚠️ NOTA: Non si dice MAI "accettare H₀", solo "non rifiutare"`
    },
    {
      id: 3,
      category: "Teoria - Probabilità Condizionata",
      difficulty: "⭐⭐⭐",
      question: "Due eventi A e B sono indipendenti. Quale delle seguenti affermazioni è FALSA?",
      options: [
        "P(A|B) = P(A)",
        "P(A ∩ B) = P(A) × P(B)",
        "P(A ∪ B) = P(A) + P(B)",
        "P(B|A) = P(B)"
      ],
      correct: 2,
      explanation: `✅ RISPOSTA CORRETTA: opzione 3 (è FALSA)

"P(A ∪ B) = P(A) + P(B)" è FALSA anche per eventi indipendenti!

🔍 ANALISI OPZIONI:

✅ VERA - P(A|B) = P(A)
Definizione di indipendenza: sapere B non cambia prob di A

✅ VERA - P(A ∩ B) = P(A) × P(B)
Regola del prodotto per eventi indipendenti

❌ FALSA - P(A ∪ B) = P(A) + P(B)
Questa vale SOLO per eventi DISGIUNTI (A ∩ B = ∅)!
Formula corretta: P(A ∪ B) = P(A) + P(B) - P(A ∩ B)

✅ VERA - P(B|A) = P(B)
Simmetrica alla prima, definizione di indipendenza

📌 CONCETTO IMPORTANTE:
INDIPENDENZA ≠ DISGIUNZIONE

Indipendenti: sapere uno non influenza l'altro
Disgiunti: non possono verificarsi insieme

💡 ESEMPIO:
Lancio dado:
- A = "esce pari" {2,4,6}
- B = "esce > 3" {4,5,6}
→ INDIPENDENTI ma NON disgiunti (condividono {4,6})`
    },
    {
      id: 4,
      category: "Teoria - Intervalli di Confidenza",
      difficulty: "⭐⭐⭐",
      question: "Quale affermazione è corretta riguardo a un intervallo di confidenza al 95% per la media μ?",
      options: [
        "Il 95% dei campioni produrrà intervalli che contengono la vera media μ",
        "C'è il 95% di probabilità che μ sia nell'intervallo calcolato",
        "Il 95% dei valori della popolazione è nell'intervallo",
        "L'intervallo contiene il 95% dei dati del campione"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: opzione 1

"Il 95% dei campioni produrrà intervalli che contengono la vera media μ"

🎯 INTERPRETAZIONE CORRETTA:

L'intervallo di confidenza al 95% significa:
Se ripetessimo il campionamento molte volte, e calcolassimo
un IC 95% per ogni campione, circa il 95% di questi intervalli
conterrebbe il vero parametro μ della popolazione.

❌ INTERPRETAZIONI SBAGLIATE:

Opzione 2: "C'è il 95% di probabilità che μ sia nell'intervallo"
→ SBAGLIATO! μ è un parametro fisso, non aleatorio
→ L'intervallo è aleatorio, non μ
→ O μ è nell'intervallo (100%) o non lo è (0%)

Opzione 3: "Il 95% dei valori della popolazione è nell'intervallo"
→ SBAGLIATO! L'IC stima il parametro, non i singoli valori

Opzione 4: "L'intervallo contiene il 95% dei dati del campione"
→ SBAGLIATO! Questo sarebbe un range o percentile

📊 ESEMPIO:
Campione: n=100, X̄=50, s=10
IC 95%: [48.04, 51.96]

Interpretazione corretta:
"Sono fiducioso al 95% che μ sia in [48.04, 51.96]"

Interpretazione sbagliata:
"μ ha il 95% di probabilità di essere in [48.04, 51.96]"

🔑 CONCETTO CHIAVE:
La fiducia (confidence) è nel METODO, non nell'intervallo specifico!`
    },
    {
      id: 5,
      category: "Teoria - Teorema Limite Centrale",
      difficulty: "⭐⭐⭐⭐",
      question: "Il Teorema del Limite Centrale afferma che:",
      options: [
        "La distribuzione della media campionaria X̄ converge a una normale quando n→∞, indipendentemente dalla distribuzione di X",
        "Tutti i dati seguono una distribuzione normale se il campione è abbastanza grande",
        "La media campionaria è sempre uguale alla media della popolazione",
        "La varianza del campione converge a zero quando n→∞"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: opzione 1

"La distribuzione della media campionaria X̄ converge a una normale
quando n→∞, indipendentemente dalla distribuzione di X"

📚 TEOREMA DEL LIMITE CENTRALE (TLC):

ENUNCIATO:
Se X₁, X₂, ..., Xₙ sono i.i.d. con E[X]=μ e Var(X)=σ², allora:

X̄ ~ N(μ, σ²/n)  per n sufficientemente grande (tipicamente n≥30)

🔑 PUNTI CHIAVE:

1. Vale per QUALSIASI distribuzione di X
   - X può essere uniforme, esponenziale, binomiale, etc.
   - Non serve che X sia normale!

2. X̄ diventa normale, NON X
   - I dati originali mantengono la loro distribuzione
   - Solo la MEDIA campionaria diventa normale

3. "n grande" di solito significa n ≥ 30
   - Per distribuzioni già simmetriche basta n < 30
   - Per distribuzioni molto asimmetriche serve n > 30

4. La varianza di X̄ è σ²/n
   - Diminuisce all'aumentare di n
   - Errore standard: SE = σ/√n

❌ ERRORI COMUNI:

"I dati diventano normali" → NO! Solo X̄
"Vale solo se X è normale" → NO! Vale per qualsiasi X
"X̄ = μ" → NO! X̄ è vicino a μ ma non uguale

📊 ESEMPIO:
Lanci un dado (uniforme discreta):
X ∈ {1,2,3,4,5,6}, E[X]=3.5, Var(X)=2.92

Se calcoli la media di n=100 lanci:
X̄ ~ N(3.5, 2.92/100) = N(3.5, 0.0292)

💡 APPLICAZIONE:
Il TLC giustifica l'uso del test t e degli IC anche quando
i dati non sono perfettamente normali!`
    },
    {
      id: 6,
      category: "R Programming - Distribuzioni",
      difficulty: "⭐⭐",
      question: "In R, quale funzione calcola P(X ≤ x) per una distribuzione normale standard?",
      options: [
        "pnorm(x)",
        "dnorm(x)",
        "qnorm(x)",
        "rnorm(x)"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: opzione 1

pnorm(x) calcola P(X ≤ x) per X ~ N(0,1)

📋 FAMIGLIE DI FUNZIONI IN R:

Per ogni distribuzione (norm, exp, binom, pois, etc.) ci sono 4 funzioni:

1. d**** (density/mass):
   - dnorm(x) → f(x) densità in x
   - P(X = x) per discrete

2. p**** (cumulative probability):
   - pnorm(x) → P(X ≤ x)
   - CDF - Funzione di ripartizione

3. q**** (quantile):
   - qnorm(p) → x tale che P(X ≤ x) = p
   - Inversa di p****

4. r**** (random):
   - rnorm(n) → genera n valori casuali

🎯 ESEMPI CON NORMALE:

# Normale standard N(0,1)
pnorm(1.96)     # P(X ≤ 1.96) = 0.975
qnorm(0.975)    # x tale che P(X ≤ x) = 0.975 → 1.96
dnorm(0)        # f(0) = 0.3989
rnorm(100)      # 100 valori casuali

# Normale generica N(μ, σ²)
pnorm(150, mean=140, sd=20)  # P(X ≤ 150)
qnorm(0.95, mean=140, sd=20) # Percentile 95

💡 TRUCCO PER RICORDARE:
- p = probability → P(X ≤ x)
- q = quantile → valore x dato p
- d = density → altezza della curva
- r = random → generazione casuale

⚠️ ATTENZIONE:
pnorm(x, lower.tail=FALSE) → P(X > x)
1 - pnorm(x) → stesso risultato`
    },
    {
      id: 7,
      category: "Teoria - Correlazione",
      difficulty: "⭐⭐⭐",
      question: "Il coefficiente di correlazione di Pearson r = -0.9 tra due variabili X e Y indica:",
      options: [
        "Forte relazione lineare negativa: quando X aumenta, Y tende a diminuire",
        "Debole relazione: le variabili sono quasi indipendenti",
        "X causa Y con probabilità 0.9",
        "Y = -0.9X è la retta di regressione"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: opzione 1

"Forte relazione lineare negativa: quando X aumenta, Y tende a diminuire"

📊 COEFFICIENTE DI CORRELAZIONE r:

RANGE: r ∈ [-1, 1]

INTERPRETAZIONE:
- r = +1  → Perfetta relazione lineare positiva
- r = +0.7 a +1 → Forte correlazione positiva
- r = +0.3 a +0.7 → Moderata correlazione positiva
- r = 0   → Nessuna correlazione lineare
- r = -0.3 a -0.7 → Moderata correlazione negativa
- r = -0.7 a -1 → Forte correlazione negativa
- r = -1  → Perfetta relazione lineare negativa

🔑 CONCETTI CHIAVE:

1. r = -0.9 è FORTE (vicino a -1)
2. Segno negativo → relazione inversa
3. Misura solo relazione LINEARE
4. Non implica causalità!

❌ ERRORI COMUNI:

"X causa Y" → NO!
- Correlazione ≠ Causalità
- Potrebbe essere Y → X
- Potrebbe esserci una terza variabile

"Y = -0.9X" → NO!
- r non è il coefficiente angolare
- r è adimensionale
- La pendenza β₁ può essere diversa

"Relazione debole perché negativo" → NO!
- Il segno indica direzione, non forza
- Forza si vede dal valore assoluto |r|

📈 ESEMPIO IN R:

x <- c(1, 2, 3, 4, 5)
y <- c(10, 8, 6, 4, 2)
cor(x, y)  # -1 (perfetta negativa)

x <- c(1, 2, 3, 4, 5)
y <- c(2, 1, 5, 3, 4)
cor(x, y)  # ≈ 0.3 (debole)

🎯 CASI PARTICOLARI:
- r = 0 non significa indipendenza!
  (potrebbe esserci relazione non lineare)
- Outliers possono influenzare molto r`
    },
    {
      id: 8,
      category: "Teoria - Distribuzione Binomiale",
      difficulty: "⭐⭐",
      question: "Una variabile X ~ Binomiale(n=10, p=0.3). Quanto vale E[X] e Var(X)?",
      options: [
        "E[X] = 3, Var(X) = 2.1",
        "E[X] = 10, Var(X) = 3",
        "E[X] = 0.3, Var(X) = 0.21",
        "E[X] = 3, Var(X) = 0.9"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: opzione 1

E[X] = np = 10 × 0.3 = 3
Var(X) = np(1-p) = 10 × 0.3 × 0.7 = 2.1

📚 DISTRIBUZIONE BINOMIALE:

DEFINIZIONE:
X = numero di successi in n prove indipendenti
Ogni prova ha probabilità p di successo

NOTAZIONE: X ~ Bin(n, p)

FORMULE:
- E[X] = np
- Var(X) = np(1-p) = npq  (dove q = 1-p)
- SD(X) = √[np(1-p)]

🎯 ESEMPIO:
n = 10 lanci di moneta, p = 0.3 (moneta truccata)
X = numero di teste

E[X] = 10 × 0.3 = 3 teste in media
Var(X) = 10 × 0.3 × 0.7 = 2.1
SD(X) = √2.1 ≈ 1.45

💡 INTERPRETAZIONE:
In 10 lanci, ci aspettiamo circa 3 teste,
con una variabilità di circa ±1.45

📊 CODICE R:

# P(X = k) esattamente k successi
dbinom(5, size=10, prob=0.3)

# P(X ≤ k) al massimo k successi
pbinom(5, size=10, prob=0.3)

# P(X > k) più di k successi
1 - pbinom(k, size=10, prob=0.3)

# Verifica formule
x <- 0:10
px <- dbinom(x, 10, 0.3)
sum(x * px)           # E[X] = 3
sum((x-3)^2 * px)     # Var(X) = 2.1

⚠️ CONDIZIONI:
1. n prove fisse
2. Prove indipendenti
3. Probabilità p costante
4. Solo due esiti (successo/fallimento)`
    },
    {
      id: 9,
      category: "Teoria - P-value",
      difficulty: "⭐⭐⭐",
      question: "Quale affermazione sul p-value è corretta?",
      options: [
        "Il p-value è la probabilità di osservare dati estremi come quelli osservati (o più estremi) assumendo H₀ vera",
        "Il p-value è la probabilità che H₀ sia vera",
        "Il p-value è la probabilità che H₁ sia vera",
        "Un p-value basso significa che H₀ è falsa con certezza"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: opzione 1

"Il p-value è la probabilità di osservare dati estremi come quelli
osservati (o più estremi) assumendo H₀ vera"

📊 DEFINIZIONE FORMALE:

p-value = P(osservare statistica test ≥ valore osservato | H₀ vera)

🔑 INTERPRETAZIONE:

Se p-value è piccolo:
→ I dati osservati sarebbero molto improbabili se H₀ fosse vera
→ Evidenza contro H₀
→ Rifiutiamo H₀

Se p-value è grande:
→ I dati osservati sono compatibili con H₀
→ Non c'è evidenza sufficiente contro H₀
→ Non rifiutiamo H₀

❌ INTERPRETAZIONI SBAGLIATE:

"Probabilità che H₀ sia vera" → NO!
- H₀ è vera o falsa (non è probabilistico)
- p-value assume H₀ vera

"Probabilità di errore" → NO!
- α è la probabilità di errore di tipo I
- p-value è la probabilità dei dati

"H₀ è falsa con certezza" → NO!
- Anche con p=0.001 potremmo sbagliare
- Test statistico ≠ dimostrazione matematica

📈 ESEMPIO:

Test: H₀: μ = 100 vs H₁: μ ≠ 100
Osservo: X̄ = 110
Calcolo: p-value = 0.03

Interpretazione:
"Se la vera media fosse 100, osservare X̄=110
(o più estremo) avrebbe probabilità 0.03.
Dato che 0.03 < 0.05, rifiuto H₀."

🎯 REGOLA DECISIONALE:

p-value < α → Rifiuto H₀
p-value ≥ α → Non rifiuto H₀

Valori comuni di α: 0.05, 0.01, 0.10

💡 SCALA DI GIUDIZIO (informale):
- p < 0.001 → evidenza molto forte
- p < 0.01  → evidenza forte
- p < 0.05  → evidenza moderata
- p < 0.10  → evidenza debole
- p ≥ 0.10  → nessuna evidenza`
    },
    {
      id: 10,
      category: "R Programming - Test Ipotesi",
      difficulty: "⭐⭐⭐",
      question: "In R, hai fatto t.test(x, mu=50, alternative='greater') e ottieni p-value=0.02. Quale ipotesi alternativa stai testando?",
      options: [
        "H₁: μ > 50",
        "H₁: μ < 50",
        "H₁: μ ≠ 50",
        "H₁: μ = 50"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: opzione 1

alternative='greater' → H₁: μ > 50

📋 TIPI DI TEST IN R:

1. TEST BILATERALE (two-sided):
   t.test(x, mu=50, alternative="two.sided")
   H₀: μ = 50
   H₁: μ ≠ 50
   Testa se μ è diversa da 50 (in qualsiasi direzione)

2. TEST UNILATERALE DESTRO (greater):
   t.test(x, mu=50, alternative="greater")
   H₀: μ ≤ 50
   H₁: μ > 50
   Testa se μ è maggiore di 50

3. TEST UNILATERALE SINISTRO (less):
   t.test(x, mu=50, alternative="less")
   H₀: μ ≥ 50
   H₁: μ < 50
   Testa se μ è minore di 50

🎯 ESEMPIO:

# Genero dati con media 55
set.seed(123)
x <- rnorm(30, mean=55, sd=10)

# Test bilaterale
t.test(x, mu=50, alternative="two.sided")
# p-value ≈ 0.04 → rifiuto H₀ (μ ≠ 50)

# Test unilaterale destro
t.test(x, mu=50, alternative="greater")
# p-value ≈ 0.02 → rifiuto H₀ (μ > 50)

# Test unilaterale sinistro
t.test(x, mu=50, alternative="less")
# p-value ≈ 0.98 → non rifiuto H₀

💡 NOTA IMPORTANTE:
Il p-value del test unilaterale è circa metà
del p-value del test bilaterale!

⚠️ QUANDO USARE QUALE:

BILATERALE (default):
- Non hai una direzione specifica in mente
- Vuoi rilevare qualsiasi differenza
- Più conservativo

UNILATERALE:
- Hai una direzione specifica da testare
- Teoria predice una direzione
- Più potente (se direzione corretta)

🔑 INTERPRETAZIONE NEL PROBLEMA:

t.test(x, mu=50, alternative='greater')
p-value = 0.02 < 0.05

Conclusione:
"Rifiuto H₀. C'è sufficiente evidenza per
affermare che μ > 50 (al livello α=0.05)"`
    },
    {
      id: 11,
      category: "Teoria - Campionamento",
      difficulty: "⭐⭐⭐",
      question: "Quale affermazione sulla media campionaria X̄ è FALSA?",
      options: [
        "X̄ è una statistica",
        "E[X̄] = μ (media della popolazione)",
        "Var(X̄) = σ² (varianza della popolazione)",
        "X̄ è uno stimatore non distorto di μ"
      ],
      correct: 2,
      explanation: `✅ RISPOSTA CORRETTA: opzione 3 (è FALSA)

"Var(X̄) = σ²" è SBAGLIATO!

La formula corretta è: Var(X̄) = σ²/n

🔍 ANALISI OPZIONI:

✅ VERA - "X̄ è una statistica"
Statistica = funzione del campione
X̄ = (X₁+X₂+...+Xₙ)/n dipende dal campione casuale

✅ VERA - "E[X̄] = μ"
Valore atteso della media campionaria = media popolazione
Dimostrazione: E[X̄] = E[(X₁+...+Xₙ)/n] = (nμ)/n = μ

❌ FALSA - "Var(X̄) = σ²"
Formula corretta: Var(X̄) = σ²/n
Dimostrazione:
Var(X̄) = Var[(X₁+...+Xₙ)/n] = (nσ²)/n² = σ²/n

✅ VERA - "X̄ è stimatore non distorto di μ"
Non distorto significa E[X̄] = μ (verificato sopra)

📊 PROPRIETÀ DELLA MEDIA CAMPIONARIA:

1. VALORE ATTESO: E[X̄] = μ
2. VARIANZA: Var(X̄) = σ²/n
3. DEVIAZIONE STANDARD: SD(X̄) = σ/√n (errore standard)
4. DISTRIBUZIONE (per n grande): X̄ ~ N(μ, σ²/n) per TLC

🎯 CONSEGUENZE IMPORTANTI:

Var(X̄) = σ²/n → diminuisce con n
- Campione più grande → media più precisa
- n quadruplica → varianza dimezza
- n×100 → errore standard ÷10

💡 ESEMPIO:

Popolazione: μ=100, σ²=400 (σ=20)

Campione n=25:
E[X̄] = 100
Var(X̄) = 400/25 = 16
SD(X̄) = 4

Campione n=100:
E[X̄] = 100 (stesso)
Var(X̄) = 400/100 = 4 (più piccolo!)
SD(X̄) = 2 (più preciso!)

📈 CODICE R DIMOSTRAZIONE:

# Popolazione N(100, 400)
popolazione <- rnorm(100000, mean=100, sd=20)

# 1000 medie campionarie con n=25
medie <- replicate(1000, mean(sample(popolazione, 25)))

mean(medie)   # ≈ 100 (= μ)
var(medie)    # ≈ 16 (= σ²/n = 400/25)

⚠️ ERRORE COMUNE:
Confondere σ² (var popolazione) con s² (var campione)
- σ² = parametro (fisso, incognito)
- s² = statistica (varia tra campioni)
- E[s²] = σ² se usiamo divisore (n-1)`
    },
    {
      id: 12,
      category: "Teoria - Chi-quadrato",
      difficulty: "⭐⭐⭐⭐",
      question: "Nel test chi-quadrato per l'indipendenza con una tabella 3×4, quanti gradi di libertà ha la statistica test?",
      options: [
        "6",
        "11",
        "12",
        "7"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: opzione 1

Gradi di libertà = (r-1) × (c-1) = (3-1) × (4-1) = 2 × 3 = 6

📊 TEST CHI-QUADRATO PER INDIPENDENZA:

FORMULA GRADI DI LIBERTÀ:
df = (numero righe - 1) × (numero colonne - 1)
df = (r - 1) × (c - 1)

🎯 ESEMPIO:

Tabella 3×4:
           Colonna1  Colonna2  Colonna3  Colonna4
Riga1         20        30        25        15
Riga2         15        20        30        25
Riga3         25        15        20        30

r = 3 righe
c = 4 colonne
df = (3-1) × (4-1) = 2 × 3 = 6

💡 PERCHÉ (r-1) × (c-1)?

Sotto H₀ di indipendenza:
- Fissi i totali marginali (righe e colonne)
- Una volta riempite (r-1)×(c-1) celle, le altre sono determinate
- Quindi hai (r-1)×(c-1) valori "liberi"

📋 CASI COMUNI:

Tabella 2×2: df = (2-1)×(2-1) = 1
Tabella 2×3: df = (2-1)×(3-1) = 2
Tabella 3×3: df = (3-1)×(3-1) = 4
Tabella 4×5: df = (4-1)×(5-1) = 12

📈 CODICE R:

# Creo tabella
tab <- matrix(c(20,30,25,15,
                15,20,30,25,
                25,15,20,30),
              nrow=3, byrow=TRUE)

# Test chi-quadrato
test <- chisq.test(tab)
test$parameter  # df = 6

# P-value
test$p.value

# Statistica chi-quadrato
test$statistic

🔑 INTERPRETAZIONE:

H₀: Le due variabili sono indipendenti
H₁: Le due variabili sono associate

Statistica test:
χ² = Σ (Osservati - Attesi)² / Attesi

Se p-value < α:
→ Rifiuto H₀
→ Le variabili sono associate

⚠️ ATTENZIONE:
Test diverso dal chi-quadrato per BONTÀ DEL FIT!

BONTÀ DEL FIT:
- Una sola variabile
- df = k - 1 - parametri stimati
- k = numero di categorie

INDIPENDENZA:
- Due variabili
- df = (r-1) × (c-1)
- Tabella di contingenza`
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
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8 rounded-xl mb-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <BookOpen className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">Quiz Teorico Avanzato EPS</h1>
            <p className="text-blue-100 mt-1">
              12 domande approfondite su teoria, probabilità e statistica
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
                      ? 'bg-blue-600 text-white ring-4 ring-blue-200'
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
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
                    } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        showCorrect
                          ? 'bg-green-500 text-white'
                          : showWrong
                          ? 'bg-red-500 text-white'
                          : selected
                          ? 'bg-blue-600 text-white'
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
                  : 'bg-blue-600 text-white hover:bg-blue-700'
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
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Successiva →
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl p-10 shadow-lg text-center">
          <div className={`w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl font-bold text-white shadow-xl ${
            score >= 9 ? 'bg-green-500' : score >= 7 ? 'bg-orange-500' : 'bg-red-500'
          }`}>
            {score}/{questions.length}
          </div>

          <h2 className="text-4xl font-bold mb-4">
            {score >= 9 ? 'Eccellente!' :
             score >= 7 ? 'Buon risultato!' :
             'Continua a studiare!'}
          </h2>

          <p className="text-xl text-gray-600 mb-8">
            Hai risposto correttamente a {score} domande su {questions.length}
          </p>

          <div className="bg-gray-50 p-6 rounded-xl mb-8 text-left">
            <h3 className="text-xl font-bold mb-4">Dettaglio Risposte:</h3>
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
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-3 mx-auto shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Ricomincia Quiz
          </button>
        </div>
      )}

      <div className="mt-8 bg-cyan-50 p-6 rounded-xl border-l-4 border-cyan-500">
        <h3 className="text-xl font-bold text-cyan-900 mb-4">Argomenti Trattati:</h3>
        <ul className="grid grid-cols-2 gap-3 text-gray-700">
          <li>✓ Distribuzioni Continue e Discrete</li>
          <li>✓ Test di Ipotesi e Errori</li>
          <li>✓ Probabilità Condizionata e Indipendenza</li>
          <li>✓ Intervalli di Confidenza</li>
          <li>✓ Teorema Limite Centrale</li>
          <li>✓ Funzioni R per Distribuzioni</li>
          <li>✓ Correlazione di Pearson</li>
          <li>✓ Distribuzione Binomiale</li>
          <li>✓ P-value e Significatività</li>
          <li>✓ Media Campionaria</li>
          <li>✓ Test Chi-quadrato</li>
          <li>✓ Alternative nei Test</li>
        </ul>
      </div>
    </div>
  );
};

export default QuizTeoricoAvanzato;
