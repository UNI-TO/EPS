import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, RotateCcw, BookOpen, AlertTriangle } from 'lucide-react';

const QuizErroriComuni = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900);

  const questions = [
    {
      id: 1,
      category: "Esponenziale - rate vs mean",
      difficulty: "⭐⭐⭐⭐",
      question: "X ~ Esponenziale con E[X] = 2. Quale comando R usi per calcolare P(X < 3)?",
      options: [
        "pexp(3, rate = 2)",
        "pexp(3, rate = 0.5)",
        "pexp(3, rate = 1/2)",
        "B e C sono corrette"
      ],
      correct: 3,
      explanation: `✅ RISPOSTA CORRETTA: B e C sono corrette

📌 ERRORE MOLTO COMUNE!

🔴 CONFUSIONE rate vs mean:
- Se E[X] = 2, allora λ (rate) = 1/E[X] = 1/2 = 0.5
- **NON** usare rate = 2!

📊 FORMULE ESPONENZIALE:
- E[X] = 1/λ
- Var(X) = 1/λ²
- Parametro in R: **rate = λ**

🧮 ESEMPIO:
\`\`\`r
# Dato: E[X] = 2
# Quindi: λ = 1/2 = 0.5

# CORRETTO:
pexp(3, rate = 0.5)
pexp(3, rate = 1/2)

# ❌ SBAGLIATO:
pexp(3, rate = 2)  # NO! Questo darebbe E[X] = 1/2
\`\`\`

💡 VERIFICA:
\`\`\`r
# Se usi rate = 0.5
# Allora E[X] = 1/rate = 1/0.5 = 2 ✓

# Se usi rate = 2
# Allora E[X] = 1/rate = 1/2 = 0.5 ✗
\`\`\`

⚠️ SEMPRE RICORDA:
rate = λ = 1 / E[X]

🎯 ALTRI ESEMPI:
\`\`\`r
# E[X] = 5 → rate = 1/5 = 0.2
# E[X] = 0.25 → rate = 1/0.25 = 4
# E[X] = 10 → rate = 1/10 = 0.1
\`\`\``
    },
    {
      id: 2,
      category: "t-test - paired TRUE/FALSE",
      difficulty: "⭐⭐⭐⭐",
      question: "Hai 30 studenti. Misuri il peso prima e dopo una dieta. Quale test usi?",
      options: [
        "t.test(prima, dopo, paired = FALSE) - campioni indipendenti",
        "t.test(prima, dopo, paired = TRUE) - osservazioni appaiate",
        "t.test(prima, dopo) - il default è corretto",
        "Non importa, il risultato è lo stesso"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: paired = TRUE

📌 QUANDO USARE paired=TRUE:
- **Stesso soggetto** misurato 2 volte
- **Coppie naturali** (gemelli, lati dx/sx)
- **Prima/Dopo** sullo stesso individuo

🔍 DIFFERENZA:

**paired = FALSE** (default):
- Due gruppi **DIVERSI**
- Es: Gruppo A vs Gruppo B
- Test: H0: μA = μB

**paired = TRUE**:
- Stesso gruppo, **MISURATO DUE VOLTE**
- Es: Prima vs Dopo (stesso soggetto)
- Test: H0: μdifferenza = 0

📊 CODICE:
\`\`\`r
# CORRETTO per dati appaiati
t.test(peso_dopo, peso_prima, paired = TRUE)

# Equivalente a:
differenze <- peso_dopo - peso_prima
t.test(differenze, mu = 0)
\`\`\`

💡 PERCHÉ IMPORTA:
- **paired=TRUE**: usa le differenze → MENO variabilità
- **paired=FALSE**: confronta medie → PIÙ variabilità
- paired=TRUE è più **POTENTE** per dati appaiati!

⚠️ ERRORE GRAVE:
Usare paired=FALSE quando i dati sono appaiati:
- Perdi potenza statistica
- p-value più alto
- Rischi di NON rifiutare H0 quando dovresti!

🎯 ESEMPI:

**paired=TRUE**:
- Peso prima/dopo
- Pressione sinistra/destra
- Score pre/post trattamento
- Gemelli (uno trattato, uno no)

**paired=FALSE**:
- Gruppo trattamento vs controllo (persone diverse)
- Maschi vs Femmine
- Città A vs Città B

🧮 SIMULAZIONE:
\`\`\`r
set.seed(123)
# Stesso individuo, media differenza = 2
prima <- rnorm(30, 70, 5)
dopo <- prima + rnorm(30, 2, 1)

# paired=TRUE (CORRETTO)
t.test(dopo, prima, paired = TRUE)
# p-value ≈ 0 → SIGNIFICATIVO!

# paired=FALSE (SBAGLIATO)
t.test(dopo, prima, paired = FALSE)
# p-value più alto → potrebbe non essere significativo!
\`\`\``
    },
    {
      id: 3,
      category: "alternative parameter",
      difficulty: "⭐⭐⭐",
      question: "Vuoi testare se μ > 50 (H1: μ > 50). Quale alternative usi?",
      options: [
        "alternative = 'less' (μ < 50)",
        "alternative = 'greater' (μ > 50)",
        "alternative = 'two.sided' (μ ≠ 50)",
        "Non serve specificarlo"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: alternative = "greater"

📌 PARAMETRO alternative:

**"greater"**: H1: μ > μ₀
- Testi se la media è MAGGIORE
- p-value = P(T > t_obs)
- Usa quando vuoi dimostrare AUMENTO

**"less"**: H1: μ < μ₀
- Testi se la media è MINORE
- p-value = P(T < t_obs)
- Usa quando vuoi dimostrare DIMINUZIONE

**"two.sided"** (default): H1: μ ≠ μ₀
- Testi se la media è DIVERSA (in qualsiasi direzione)
- p-value = 2 × P(|T| > |t_obs|)
- Usa quando non sai la direzione

📊 CODICE:
\`\`\`r
# H0: μ = 50 vs H1: μ > 50
t.test(dati, mu = 50, alternative = "greater")

# H0: μ = 50 vs H1: μ < 50
t.test(dati, mu = 50, alternative = "less")

# H0: μ = 50 vs H1: μ ≠ 50
t.test(dati, mu = 50, alternative = "two.sided")
t.test(dati, mu = 50)  # default
\`\`\`

💡 RELAZIONE TRA P-VALUES:
\`\`\`r
# Se t_obs > 0 (media campionaria > μ₀):
p_greater < p_two.sided < p_less

# Se t_obs < 0 (media campionaria < μ₀):
p_less < p_two.sided < p_greater
\`\`\`

⚠️ ATTENZIONE:
Test unilaterale (greater/less) ha p-value più piccolo!
- Più facile rifiutare H0
- MA devi sapere la direzione a priori
- Non puoi decidere dopo aver visto i dati!

🎯 QUANDO USARE:

**"greater"**:
- Nuovo farmaco aumenta guarigione?
- Fertilizzante aumenta produzione?
- Trattamento aumenta performance?

**"less"**:
- Dieta riduce peso?
- Intervento riduce ansia?
- Metodo riduce errori?

**"two.sided"**:
- Non sai la direzione
- Vuoi solo vedere se c'è differenza
- Più conservativo

🧮 ESEMPIO:
\`\`\`r
dati <- c(52, 55, 48, 51, 53, 49, 54)

# Media campionaria: 51.7

# greater (corretto se vuoi μ > 50)
t.test(dati, mu = 50, alternative = "greater")
# p-value piccolo

# less (sbagliato! media > 50)
t.test(dati, mu = 50, alternative = "less")
# p-value grande

# two.sided
t.test(dati, mu = 50, alternative = "two.sided")
# p-value intermedio
\`\`\``
    },
    {
      id: 4,
      category: "Normale - sd vs varianza",
      difficulty: "⭐⭐⭐",
      question: "X ~ N(100, 225). Quale comando R è CORRETTO per P(X < 115)?",
      options: [
        "pnorm(115, 100, 225)",
        "pnorm(115, mean = 100, sd = 225)",
        "pnorm(115, mean = 100, sd = 15)",
        "pnorm(115, mean = 100, sd = sqrt(225))"
      ],
      correct: 2,
      explanation: `✅ RISPOSTA CORRETTA: pnorm(115, mean = 100, sd = 15)

📌 ERRORE MOLTO COMUNE!

🔴 CONFUSIONE σ² vs σ:
- X ~ N(μ, σ²) significa:
  - μ = media
  - σ² = VARIANZA
  - σ = DEVIAZIONE STANDARD

⚠️ IN R: pnorm usa **sd** (non varianza!)

📊 ESEMPIO:
\`\`\`r
# Dato: X ~ N(100, 225)
# μ = 100
# σ² = 225
# σ = √225 = 15

# ✅ CORRETTO:
pnorm(115, mean = 100, sd = 15)
pnorm(115, mean = 100, sd = sqrt(225))
pnorm(115, 100, 15)

# ❌ SBAGLIATO:
pnorm(115, 100, 225)  # Usa 225 come sd!
pnorm(115, mean = 100, sd = 225)  # Sbagliato!
\`\`\`

💡 SEMPRE RICORDA:
- Notazione: N(μ, σ²)
- R funzione: pnorm(x, mean = μ, sd = σ)
- **Converti** σ² → σ = √σ²

🎯 ALTRI ESEMPI:
\`\`\`r
# X ~ N(0, 4)
# σ² = 4, σ = 2
pnorm(1, mean = 0, sd = 2)

# X ~ N(50, 100)
# σ² = 100, σ = 10
pnorm(60, mean = 50, sd = 10)

# X ~ N(10, 0.25)
# σ² = 0.25, σ = 0.5
pnorm(11, mean = 10, sd = 0.5)
\`\`\`

📈 TUTTE LE FUNZIONI R:
\`\`\`r
# Tutte usano sd (non varianza!)
dnorm(x, mean, sd)  # Densità
pnorm(x, mean, sd)  # CDF
qnorm(p, mean, sd)  # Quantili
rnorm(n, mean, sd)  # Campionamento
\`\`\`

🧮 VERIFICA:
\`\`\`r
# Generare N(100, 225)
set.seed(123)
dati <- rnorm(10000, mean = 100, sd = 15)

# Verifica
mean(dati)  # ≈ 100
var(dati)   # ≈ 225
sd(dati)    # ≈ 15

# P(X < 115)
pnorm(115, 100, 15)  # ≈ 0.84
mean(dati < 115)     # ≈ 0.84 ✓
\`\`\``
    },
{
      id: 5,
      category: "Geometrica - Offset in R",
      difficulty: "⭐⭐⭐⭐",
      question: "Lanci un dado fino al primo 6. P(serve esattamente 3 lanci)?",
      options: [
        "dgeom(3, prob = 1/6)",
        "dgeom(2, prob = 1/6)",
        "pgeom(3, prob = 1/6)",
        "1 - pgeom(2, prob = 1/6)"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: dgeom(2, prob = 1/6)

📌 TRABOCCHETTO GEOMETRICA IN R!

🔴 R CONTA I FALLIMENTI, NON LE PROVE!

- Vuoi P(X = 3 lanci) = P(2 fallimenti + 1 successo)
- In R: dgeom(2, prob = 1/6)

📊 DEFINIZIONE:
**Geometrica**: numero di fallimenti prima del primo successo

\`\`\`
X = numero di FALLIMENTI
P(X = k) = (1-p)^k · p

In R: dgeom(k, prob = p)
\`\`\`

💡 ESEMPIO DADO:
\`\`\`r
# Primo 6 al 3° lancio
# Sequenza: NON-6, NON-6, 6
# = 2 fallimenti + 1 successo

# CORRETTO:
dgeom(2, prob = 1/6)

# ❌ SBAGLIATO:
dgeom(3, prob = 1/6)  # Questo è per 4 lanci!
\`\`\`

🎯 CONVERSIONE:
\`\`\`
Numero prove → Numero fallimenti in R
1 prova → 0 fallimenti: dgeom(0, p)
2 prove → 1 fallimento:  dgeom(1, p)
3 prove → 2 fallimenti:  dgeom(2, p)
k prove → (k-1) fallimenti: dgeom(k-1, p)
\`\`\`

📈 ESEMPI COMPLETI:
\`\`\`r
p <- 1/6

# P(1° successo al 1° tentativo)
dgeom(0, prob = p)  # 0 fallimenti

# P(1° successo al 2° tentativo)
dgeom(1, prob = p)  # 1 fallimento

# P(1° successo al 3° tentativo)
dgeom(2, prob = p)  # 2 fallimenti

# P(1° successo entro 3 tentativi)
pgeom(2, prob = p)  # ≤ 2 fallimenti
\`\`\`

⚠️ ATTENZIONE A pgeom:
\`\`\`r
# P(X ≤ k fallimenti)
pgeom(k, prob = p)

# P(serve ≤ 3 lanci) = P(≤ 2 fallimenti)
pgeom(2, prob = 1/6)

# P(serve > 3 lanci) = P(> 2 fallimenti)
1 - pgeom(2, prob = 1/6)
\`\`\`

🧮 VERIFICA:
\`\`\`r
# Simulazione
set.seed(123)
n_sim <- 100000

lanci_necessari <- rgeom(n_sim, prob = 1/6) + 1
# +1 perché rgeom dà fallimenti!

# P(esattamente 3 lanci)
mean(lanci_necessari == 3)
# ≈ dgeom(2, 1/6)

dgeom(2, prob = 1/6)
# ≈ 0.1157
\`\`\`

💡 MEDIA E VARIANZA:
\`\`\`r
# R conta fallimenti
# E[X] = (1-p)/p
# Var(X) = (1-p)/p²

# Per numero PROVE (non fallimenti):
# E[Prove] = 1/p
# Var(Prove) = (1-p)/p²

# Dado:
# E[Prove] = 1/(1/6) = 6 lanci in media
\`\`\``
    },
    {
      id: 6,
      category: "P-value - Interpretazione",
      difficulty: "⭐⭐⭐",
      question: "p-value = 0.03. Quale affermazione è CORRETTA?",
      options: [
        "C'è il 3% di probabilità che H0 sia vera",
        "C'è il 97% di probabilità che H1 sia vera",
        "Se H0 fosse vera, ci sarebbe il 3% di probabilità di osservare dati così estremi",
        "Posso accettare H0 con confidenza del 97%"
      ],
      correct: 2,
      explanation: `✅ RISPOSTA CORRETTA: Se H0 fosse vera, 3% di prob. di osservare dati così estremi

📌 DEFINIZIONE CORRETTA P-VALUE:

P(osservare dati così o più estremi | H0 è vera)

🔍 INTERPRETAZIONE:
"Se l'ipotesi nulla fosse vera, ci sarebbe solo il 3% di probabilità di osservare dati così estremi o più estremi di quelli osservati"

❌ ERRORI COMUNI:

**SBAGLIATO**:
- "H0 è vera con probabilità 3%"
- "H1 è vera con probabilità 97%"
- "Accetto H0"
- "C'è 3% di errore"

✅ CORRETTO:
- "I dati osservati sono improbabili sotto H0"
- "Evidenza contro H0"
- "Rifiuto H0" (se p < α)
- "Non rifiuto H0" (se p ≥ α)

📊 REGOLA DECISIONALE:
\`\`\`
Se p-value < α (es. 0.05):
  → Rifiuto H0
  → Evidenza sufficiente contro H0

Se p-value ≥ α:
  → Non rifiuto H0
  → Evidenza insufficiente contro H0
\`\`\`

💡 COSA NON È IL P-VALUE:
- NON è P(H0 è vera)
- NON è P(H1 è vera)
- NON è probabilità di errore
- NON è "quanto è vero" H0/H1

⚠️ H0 E H1 NON HANNO PROBABILITÀ:
- Sono IPOTESI, non eventi aleatori
- Sono vere o false (non probabili)
- P-value riguarda i DATI, non le ipotesi

🎯 INTERPRETAZIONI CORRETTE:

**p-value = 0.03**:
✅ "Rifiuto H0 con α = 0.05"
✅ "I dati forniscono evidenza contro H0"
✅ "Risultato statisticamente significativo"
✅ "Se H0 vera, i dati osservati sono improbabili"

❌ "H0 è falsa al 97%"
❌ "H1 è vera al 97%"
❌ "Accetto H1"
❌ "3% di probabilità di errore"

📈 ESEMPIO:
\`\`\`r
# Test: H0: μ = 10 vs H1: μ ≠ 10
dati <- c(12, 13, 11, 14, 12, 13)

test <- t.test(dati, mu = 10)
test$p.value
# = 0.0013

# Interpretazione CORRETTA:
# "Se μ fosse davvero 10, ci sarebbe solo lo 0.13%
#  di probabilità di osservare una media campionaria
#  così lontana da 10. Quindi rifiuto H0."

# Interpretazione SBAGLIATA:
# "C'è lo 0.13% di probabilità che μ = 10"  ❌
\`\`\`

💡 LIVELLI DI SIGNIFICATIVITÀ:
\`\`\`
p < 0.001 → *** (fortemente significativo)
p < 0.01  → **  (molto significativo)
p < 0.05  → *   (significativo)
p ≥ 0.05  → ns  (non significativo)
\`\`\`

🧮 P-VALUE vs DIMENSIONE EFFETTO:
- p-value piccolo ≠ effetto grande!
- Con n grande, anche piccole differenze danno p-value piccolo
- **Sempre riporta anche la dimensione dell'effetto!**`
    },
    {
      id: 7,
      category: "Accettare vs Non Rifiutare H0",
      difficulty: "⭐⭐⭐",
      question: "p-value = 0.15, α = 0.05. Cosa concludi?",
      options: [
        "Accetto H0, quindi H0 è vera",
        "Non rifiuto H0, i dati sono compatibili con H0",
        "Rifiuto H1, quindi H1 è falsa",
        "Il test è inconcludente"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: Non rifiuto H0, dati compatibili con H0

📌 TERMINOLOGIA CORRETTA:

❌ "Accetto H0"
✅ "Non rifiuto H0"

🔍 DIFFERENZA:

**"Accettare H0"** suggerirebbe:
- H0 è vera
- Abbiamo provato che H0 è corretta
- Nessuna possibilità di errore

**"Non rifiutare H0"** significa:
- NON abbiamo evidenza sufficiente contro H0
- I dati sono compatibili con H0
- MA potrebbe essere anche Errore Tipo II (β)

📊 ANALOGIA GIURIDICA:
\`\`\`
Test di ipotesi = Processo penale

H0 = Innocente (until proven guilty)
H1 = Colpevole

Se evidenza insufficiente:
❌ "Dichiaro innocente" (troppo forte)
✅ "Non colpevole" (non proven guilty)

Stesso nel test:
❌ "Accetto H0"
✅ "Non rifiuto H0"
\`\`\`

💡 4 POSSIBILI CONCLUSIONI:

**Con α = 0.05**:

1. **p < 0.05**: Rifiuto H0
   - Evidenza significativa contro H0
   - Supporto per H1

2. **p ≥ 0.05**: Non rifiuto H0
   - Evidenza insufficiente contro H0
   - NON significa "H0 è vera"!

3. **p molto piccolo** (< 0.001): Forte evidenza contro H0

4. **p vicino ad α** (es. 0.06): Al limite, servono più dati

⚠️ ERRORI TIPO II:
\`\`\`
Non rifiutare H0 può essere:
1. Corretto (H0 vera)
2. Errore Tipo II (H0 falsa, ma non la rifiutiamo)

Probabilità Errore Tipo II = β
Potenza = 1 - β
\`\`\`

🎯 FRASI CORRETTE:

**Quando p ≥ α**:
✅ "Non rifiuto H0"
✅ "Evidenza insufficiente contro H0"
✅ "I dati sono compatibili con H0"
✅ "Non posso concludere che H0 sia falsa"

❌ "Accetto H0"
❌ "H0 è vera"
❌ "H1 è falsa"
❌ "Dimostrato che non c'è differenza"

📈 ESEMPIO:
\`\`\`r
# Test: H0: μ = 50 vs H1: μ ≠ 50
dati <- c(52, 48, 51, 49, 50, 53)

test <- t.test(dati, mu = 50)
test$p.value
# = 0.37

# p-value = 0.37 > 0.05

# Conclusione CORRETTA:
# "Non rifiuto H0. I dati non forniscono evidenza
#  sufficiente per concludere che μ ≠ 50.
#  I dati sono compatibili con μ = 50."

# Conclusione SBAGLIATA:
# "Accetto H0, quindi μ = 50"  ❌
# "Dimostrato che μ = 50"      ❌
\`\`\`

💡 COSA FARE:
\`\`\`
Se non rifiuti H0:
1. Riporta il p-value
2. Dici "non rifiuto H0"
3. Considera se serve più potenza (↑ n)
4. Calcola IC (intervallo confidenza)
5. Valuta dimensione effetto
\`\`\`

🧮 POTENZA E DIMENSIONE CAMPIONE:
\`\`\`r
# Se non rifiuti H0, forse serve più potenza
power.t.test(
  n = NULL,           # trova n necessario
  delta = 5,          # differenza che vuoi rilevare
  sd = 10,            # deviazione standard
  sig.level = 0.05,   # α
  power = 0.80        # 1 - β
)
# Dice: serve n = 64 per side
\`\`\``
    },
    {
      id: 8,
      category: "Correlazione vs Causalità",
      difficulty: "⭐⭐⭐",
      question: "r = 0.85 significativo (p < 0.001) tra gelati venduti e annegamenti. Conclusione corretta?",
      options: [
        "I gelati causano annegamenti",
        "Gli annegamenti causano vendita di gelati",
        "C'è associazione lineare, ma NON implica causalità (confounding: temperatura)",
        "Non c'è relazione, p-value è troppo piccolo"
      ],
      correct: 2,
      explanation: `✅ RISPOSTA CORRETTA: Associazione, NON causalità (confounding: temperatura)

📌 PRINCIPIO FONDAMENTALE:
**Correlazione ≠ Causalità**

🔍 ESEMPIO CLASSICO:
- Gelati venduti vs Annegamenti
- r = 0.85 (forte correlazione!)
- p < 0.001 (significativa!)

MA:
- Gelati NON causano annegamenti!
- **Variabile confondente**: TEMPERATURA
  - Temperatura alta → più gelati venduti
  - Temperatura alta → più persone al mare → più annegamenti

📊 TIPI DI RELAZIONE:

**1. CORRELAZIONE SPURIA**:
\`\`\`
Variabile confondente Z causa sia X che Y
  Z (temperatura)
  ↓         ↓
  X (gelati) Y (annegamenti)

X e Y correlati ma NON causalmente legati
\`\`\`

**2. CORRELAZIONE CAUSALE**:
\`\`\`
X causa Y
Fumo → Cancro ai polmoni
Studio → Voto alto
\`\`\`

**3. CAUSALITÀ INVERSA**:
\`\`\`
Pensi X → Y ma è Y → X
Es: Poliziotti e crimini (più crimini → più poliziotti)
\`\`\`

💡 ALTRI ESEMPI SPURII:

**Numero pirati vs Temperatura globale**:
- Forte correlazione negativa!
- MA: coincidenza temporale

**Consumo cioccolato vs Premi Nobel**:
- Correlazione positiva tra paesi!
- MA: variabile confondente = ricchezza

**Vendite scarpe vs Crimini**:
- Correlazione in città
- MA: dimensione popolazione

⚠️ PER DIMOSTRARE CAUSALITÀ SERVE:

1. **Associazione**: X e Y correlati ✓
2. **Temporalità**: X precede Y
3. **Esclusione alternative**: Nessun Z confondente
4. **Meccanismo plausibile**: Come X causa Y?
5. **Esperimento controllato**: RCT (Randomized Controlled Trial)

🎯 COME PARLARE DI CORRELAZIONE:

✅ CORRETTO:
- "X e Y sono associati"
- "X e Y sono linearmente correlati"
- "C'è relazione statistica tra X e Y"
- "X predice Y" (ma non causa!)

❌ SBAGLIATO:
- "X causa Y"
- "X produce Y"
- "Y è conseguenza di X"
- "X determina Y"

📈 ESEMPIO IN R:
\`\`\`r
# Simulazione: temperatura come confondente
set.seed(123)
temp <- rnorm(100, 25, 5)

# Entrambi dipendono da temperatura
gelati <- 100 + 10*temp + rnorm(100, 0, 20)
annegamenti <- 2 + 0.3*temp + rnorm(100, 0, 1)

# Correlazione gelati-annegamenti
cor.test(gelati, annegamenti)
# r ≈ 0.85, p < 0.001!

# MA è spuria! Causata da temp
cor.test(temp, gelati)    # r ≈ 0.83
cor.test(temp, annegamenti)  # r ≈ 0.82
\`\`\`

🧮 COME IDENTIFICARE CONFOUNDING:

**Regressione Multipla**:
\`\`\`r
# Modello semplice
lm(annegamenti ~ gelati)
# Coefficiente significativo!

# Modello con confondente
lm(annegamenti ~ gelati + temp)
# Coefficiente gelati NON più significativo!
# temp è il vero predittore
\`\`\`

💡 ESPERIMENTI CONTROLLATI:

**Osservazionale** (solo correlazione):
- Osservi X e Y "in natura"
- Non controlli assegnazione
- Possibili confondenti
- Esempio: survey, studi retrospettivi

**Sperimentale** (può mostrare causalità):
- **Randomizzi** assegnazione a X
- Controlli tutto il resto
- Elimini confondenti
- Esempio: RCT clinici

🎯 CONCLUSIONE ESAME:
Se ti chiedono di correlazione:
1. Calcola r e p-value
2. Dici "correlazione significativa"
3. MA aggiungi "NON implica causalità"
4. Menciona possibili confondenti`
    },
    {
      id: 9,
      category: "Test Selection",
      difficulty: "⭐⭐⭐⭐",
      question: "Hai 3 gruppi, vuoi confrontare le medie. Quale test usi?",
      options: [
        "Tre t-test: A vs B, A vs C, B vs C",
        "ANOVA, poi Tukey HSD se significativo",
        "Chi-quadrato per confronto medie",
        "Regressione lineare"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: ANOVA, poi Tukey HSD

📌 PROBLEMA CONFRONTI MULTIPLI:

🔴 PERCHÉ NON 3 t-test?
\`\`\`
3 gruppi → 3 confronti:
- A vs B
- A vs C
- B vs C

Ogni test: α = 0.05
Probabilità almeno 1 falso positivo:
1 - (0.95)³ ≈ 0.14 = 14%!

INFLAZIONE ERRORE TIPO I!
\`\`\`

✅ SOLUZIONE: ANOVA
- Test omnibus: controlla tutti insieme
- Mantiene α = 0.05 globale
- H0: μ₁ = μ₂ = μ₃
- H1: Almeno una media diversa

📊 WORKFLOW CORRETTO:
\`\`\`r
# PASSO 1: ANOVA
modello <- aov(valore ~ gruppo, data = dati)
summary(modello)

# Se p < 0.05:
#   → Almeno un gruppo è diverso
#   → Procedi con post-hoc

# Se p ≥ 0.05:
#   → STOP! Non fare post-hoc
#   → Nessuna differenza significativa
\`\`\`

💡 TEST POST-HOC (dopo ANOVA significativa):
\`\`\`r
# Tukey HSD (Honestly Significant Difference)
TukeyHSD(modello)

# Confronti a coppie con correzione
# Mantiene α = 0.05 globale
\`\`\`

⚠️ ERRORE GRAVE:
\`\`\`r
# ❌ SBAGLIATO: 3 t-test senza correzione
t.test(gruppo_A, gruppo_B)  # α = 0.05
t.test(gruppo_A, gruppo_C)  # α = 0.05
t.test(gruppo_B, gruppo_C)  # α = 0.05

# Rischio totale > 0.05!
\`\`\`

🎯 REGOLE:

**2 gruppi** → t-test
\`\`\`r
t.test(gruppo_A, gruppo_B)
\`\`\`

**3+ gruppi** → ANOVA + post-hoc
\`\`\`r
aov(...) + TukeyHSD(...)
\`\`\`

📈 ESEMPIO COMPLETO:
\`\`\`r
# 3 gruppi di studenti
set.seed(123)
gruppo <- rep(c("A", "B", "C"), each = 30)
voto <- c(
  rnorm(30, 25, 3),  # Gruppo A
  rnorm(30, 27, 3),  # Gruppo B
  rnorm(30, 26, 3)   # Gruppo C
)
dati <- data.frame(gruppo, voto)

# PASSO 1: ANOVA
modello <- aov(voto ~ gruppo, data = dati)
summary(modello)
# p-value < 0.05 → significativo!

# PASSO 2: Post-hoc
TukeyHSD(modello)
# Confronti:
# B-A: significativo
# C-A: non significativo
# C-B: non significativo

# Conclusione: B > A
\`\`\`

💡 CORREZIONI ALTERNATIVE:

**Bonferroni** (più conservativa):
\`\`\`r
# Per k confronti, usa α/k
# 3 confronti: usa α = 0.05/3 = 0.0167

pairwise.t.test(voto, gruppo, p.adjust.method = "bonferroni")
\`\`\`

**Holm** (meno conservativa di Bonferroni):
\`\`\`r
pairwise.t.test(voto, gruppo, p.adjust.method = "holm")
\`\`\`

**FDR** (False Discovery Rate):
\`\`\`r
pairwise.t.test(voto, gruppo, p.adjust.method = "fdr")
\`\`\`

🧮 QUANTI CONFRONTI?
\`\`\`
k gruppi → k(k-1)/2 confronti

2 gruppi → 1 confronto
3 gruppi → 3 confronti
4 gruppi → 6 confronti
5 gruppi → 10 confronti
10 gruppi → 45 confronti!
\`\`\`

⚠️ ASSUNZIONI ANOVA:
1. Normalità (per gruppo)
2. Omogeneità varianze (Levene test)
3. Indipendenza

Se violate:
- Kruskal-Wallis (non parametrico)
- Welch ANOVA (varianze diverse)`
    },
    {
      id: 10,
      category: "IC vs IP (Confidenza vs Predizione)",
      difficulty: "⭐⭐⭐⭐",
      question: "Regressione Y ~ X. IC 95% = [10, 15], IP 95% = [5, 20]. Quale affermazione è corretta?",
      options: [
        "IP è sbagliato, dovrebbe essere uguale o più stretto di IC",
        "IC è per la MEDIA di Y, IP è per un SINGOLO valore di Y",
        "IC e IP sono la stessa cosa",
        "IC è sempre [0, 1] per proporzioni"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: IC per MEDIA, IP per SINGOLO valore

📌 DUE TIPI DI INTERVALLI:

**IC (Intervallo di Confidenza)**:
- Per la MEDIA CONDIZIONATA E[Y|X]
- Più STRETTO
- "Dove si trova la media di Y per questo X?"

**IP (Intervallo di Predizione)**:
- Per un SINGOLO valore futuro di Y
- Più AMPIO (include variabilità individuale)
- "Dove si troverà il prossimo Y per questo X?"

🔍 DIFFERENZA MATEMATICA:
\`\`\`
IC: Ŷ ± t_{α/2} · SE(Ŷ)
IP: Ŷ ± t_{α/2} · SE(Ŷ + ε)

SE(Ŷ) = errore standard della MEDIA
SE(Ŷ + ε) = include anche varianza residua

→ IP SEMPRE PIÙ AMPIO di IC
\`\`\`

📊 CODICE R:
\`\`\`r
# Regressione
modello <- lm(Y ~ X, data = dati)

# Nuova osservazione
nuovo_X <- data.frame(X = 5)

# IC (per la media)
predict(modello, newdata = nuovo_X,
        interval = "confidence", level = 0.95)
# fit = 12.5, lwr = 10, upr = 15

# IP (per singola osservazione)
predict(modello, newdata = nuovo_X,
        interval = "prediction", level = 0.95)
# fit = 12.5, lwr = 5, upr = 20
\`\`\`

💡 INTERPRETAZIONI:

**IC [10, 15]**:
"Sono confident al 95% che la MEDIA di Y quando X=5 sia tra 10 e 15"

**IP [5, 20]**:
"Sono confident al 95% che il PROSSIMO Y quando X=5 sarà tra 5 e 20"

⚠️ IP SEMPRE PIÙ AMPIO:
\`\`\`
Variabilità totale in IP =
  Variabilità della media (IC) +
  Variabilità individuale attorno alla media

→ IP > IC sempre!
\`\`\`

🎯 QUANDO USARE:

**IC (Confidence)**:
- Vuoi stimare la media per un gruppo
- Es: "Peso medio di uomini alti 180cm?"
- Es: "Vendite medie in città con pop. 50k?"

**IP (Prediction)**:
- Vuoi predire un singolo valore futuro
- Es: "Peso di un nuovo uomo alto 180cm?"
- Es: "Vendite del prossimo negozio in città 50k?"

📈 ESEMPIO COMPLETO:
\`\`\`r
# Dataset
set.seed(123)
X <- 1:50
Y <- 2*X + rnorm(50, 0, 5)
dati <- data.frame(X, Y)

# Regressione
modello <- lm(Y ~ X, data = dati)

# Predizioni per X = 25
nuovo <- data.frame(X = 25)

# IC
ic <- predict(modello, nuovo, interval = "confidence")
# [46.5, 52.5]  (ampiezza ≈ 6)

# IP
ip <- predict(modello, nuovo, interval = "prediction")
# [38, 61]      (ampiezza ≈ 23)

# IP è ~4 volte più ampio!
\`\`\`

🧮 VISUALIZZAZIONE:
\`\`\`r
# Grafico con entrambi gli intervalli
plot(X, Y, pch = 19)
abline(modello, col = "red", lwd = 2)

# Calcola intervalli per tutti gli X
X_grid <- seq(min(X), max(X), length = 100)
pred_df <- data.frame(X = X_grid)

ic_vals <- predict(modello, pred_df, interval = "confidence")
ip_vals <- predict(modello, pred_df, interval = "prediction")

# IC (banda stretta)
lines(X_grid, ic_vals[,"lwr"], col = "blue", lty = 2)
lines(X_grid, ic_vals[,"upr"], col = "blue", lty = 2)

# IP (banda larga)
lines(X_grid, ip_vals[,"lwr"], col = "green", lty = 3)
lines(X_grid, ip_vals[,"upr"], col = "green", lty = 3)

legend("topleft",
       c("Regressione", "IC 95%", "IP 95%"),
       col = c("red", "blue", "green"),
       lty = c(1, 2, 3))
\`\`\`

💡 PROPRIETÀ:
- IC si restringe con ↑ n
- IP ha limite inferiore (non va a 0)
- IP ≈ IC quando σ² → 0 (no variabilità residua)
- Entrambi più ampi lontano da X̄`
    }
  ];

  const handleAnswer = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) correct++;
    });
    return correct;
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setTimeLeft(900);
  };

  const question = questions[currentQuestion];
  const score = calculateScore();
  const percentage = ((score / questions.length) * 100).toFixed(1);

  React.useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showResults]);

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-full mb-4">
                {percentage >= 70 ? (
                  <CheckCircle className="w-16 h-16 text-white" />
                ) : (
                  <AlertTriangle className="w-16 h-16 text-white" />
                )}
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Quiz Completato!
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                Quiz Errori Comuni e Trabocchetti
              </p>
              <p className="text-6xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
                {percentage}%
              </p>
              <p className="text-xl text-gray-600">
                {score} su {questions.length} risposte corrette
              </p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Prestazione</span>
                <span>{percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    percentage >= 90
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                      : percentage >= 70
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                      : percentage >= 60
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                      : 'bg-gradient-to-r from-red-500 to-pink-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {questions.map((q, idx) => {
                const userAnswer = selectedAnswers[q.id];
                const isCorrect = userAnswer === q.correct;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-lg border-2 ${
                      isCorrect
                        ? 'bg-green-50 border-green-500'
                        : 'bg-red-50 border-red-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 mb-1">
                          Domanda {idx + 1}: {q.category}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">{q.question}</p>
                        <p className="text-sm">
                          <span className="font-medium">La tua risposta: </span>
                          <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                            {q.options[userAnswer] || 'Nessuna risposta'}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-sm mt-1">
                            <span className="font-medium">Risposta corretta: </span>
                            <span className="text-green-700">{q.options[q.correct]}</span>
                          </p>
                        )}
                      </div>
                      <div>
                        {isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                    </div>
                    <details className="mt-3">
                      <summary className="cursor-pointer text-sm font-medium text-red-600 hover:text-red-800">
                        Vedi spiegazione completa
                      </summary>
                      <div className="mt-2 p-3 bg-white rounded border border-gray-200">
                        <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans">
                          {q.explanation}
                        </pre>
                      </div>
                    </details>
                  </div>
                );
              })}
            </div>

            <button
              onClick={resetQuiz}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              Ricomincia Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent flex items-center gap-2">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                Quiz Errori Comuni
              </h1>
              <p className="text-gray-600 mt-1">
                Trabocchetti e confusioni frequenti in EPS
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Domanda {currentQuestion + 1} di {questions.length}
            </span>
            <span className="text-gray-600">
              {Object.keys(selectedAnswers).length}/{questions.length} risposte
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="bg-gradient-to-r from-red-600 to-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {currentQuestion + 1}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                  {question.category}
                </span>
                <span className="text-gray-500">{question.difficulty}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
                {question.question}
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswers[question.id] === index;
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(question.id, index)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-red-600 bg-gradient-to-r from-red-50 to-orange-50 shadow-md'
                      : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'border-red-600 bg-red-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                    <span className={`${isSelected ? 'font-medium text-red-900' : 'text-gray-700'}`}>
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            ← Precedente
          </button>

          <div className="flex-1" />

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={submitQuiz}
              disabled={Object.keys(selectedAnswers).length !== questions.length}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Completa Quiz
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg"
            >
              Successiva →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizErroriComuni;
