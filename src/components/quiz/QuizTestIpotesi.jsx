import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, RotateCcw, BookOpen } from 'lucide-react';

const QuizTestIpotesi = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  const questions = [
    {
      id: 1,
      category: "t-test - Paired vs Unpaired",
      difficulty: "⭐⭐⭐",
      question: "Stai confrontando il peso di 30 persone prima e dopo una dieta. Quale test usi?",
      options: [
        "t.test(peso_prima, peso_dopo, paired = FALSE)",
        "t.test(peso_prima, peso_dopo, paired = TRUE)",
        "t.test(peso_prima, peso_dopo) [default]",
        "Non importa, il risultato è identico"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: paired = TRUE

📌 QUANDO USARE PAIRED T-TEST:
- **Stesso soggetto** misurato 2 volte (prima/dopo)
- **Coppie naturali** (gemelli, paia di scarpe)
- Riduce variabilità individuale → test più potente

🔴 ERRORE COMUNE:
Se usi paired = FALSE quando i dati sono appaiati, perdi potenza statistica!

📊 CODICE COMPLETO:
\`\`\`r
# Dati appaiati
t.test(peso_dopo, peso_prima, paired = TRUE)

# Equivalente a:
differenze <- peso_dopo - peso_prima
t.test(differenze, mu = 0)
\`\`\`

⚠️ ASSUNZIONI:
- Normalità delle **differenze** (non dei singoli gruppi)
- Indipendenza tra coppie`
    },
    {
      id: 2,
      category: "t-test - Alternative",
      difficulty: "⭐⭐⭐⭐",
      question: "H0: μ = 50 vs H1: μ > 50. Quale parametro usi?",
      options: [
        "alternative = 'greater'",
        "alternative = 'less'",
        "alternative = 'two.sided'",
        "mu = 50 è sufficiente"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: alternative = 'greater'

📌 INTERPRETAZIONE:
- **greater**: H1: μ > μ₀ (media campione > valore null)
- **less**: H1: μ < μ₀ (media campione < valore null)
- **two.sided**: H1: μ ≠ μ₀ (diverso, in qualsiasi direzione)

🧮 ESEMPIO COMPLETO:
\`\`\`r
# Vogliamo sapere se μ > 50
campione <- c(52, 55, 48, 60, 53)
t.test(campione, mu = 50, alternative = "greater")

# Output: p-value = 0.15
# Se p < 0.05 → rifiuto H0 → μ > 50
\`\`\`

⚠️ ATTENZIONE:
- **greater**: p-value = P(T > t_obs)
- **less**: p-value = P(T < t_obs)
- **two.sided**: p-value = 2 * P(|T| > |t_obs|)

📊 QUANDO USARE COSA:
- Vuoi dimostrare AUMENTO → greater
- Vuoi dimostrare DIMINUZIONE → less
- Solo diversità (non sai direzione) → two.sided`
    },
    {
      id: 3,
      category: "P-value - Interpretazione",
      difficulty: "⭐⭐",
      question: "p-value = 0.03 con α = 0.05. Cosa concludi?",
      options: [
        "Accetto H0 (non rifiuto)",
        "Rifiuto H0",
        "H1 è vera al 97%",
        "C'è il 3% di probabilità che H0 sia vera"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: Rifiuto H0

📌 DEFINIZIONE P-VALUE:
**P(osservare dati così estremi | H0 è vera)**

🔍 REGOLA DECISIONALE:
- Se p-value < α → **Rifiuto H0** (evidenza contro H0)
- Se p-value ≥ α → **Non rifiuto H0** (evidenza insufficiente)

⚠️ ERRORI COMUNI:
❌ "H0 è vera con probabilità 3%" → FALSO!
❌ "H1 è vera con probabilità 97%" → FALSO!
✅ "I dati osservati sono improbabili sotto H0"

📊 ESEMPIO:
\`\`\`r
t.test(campione, mu = 10)
# p-value = 0.03

# Interpretazione:
# "Se H0 fosse vera (μ = 10), ci sarebbe solo
#  il 3% di probabilità di osservare una media
#  campionaria così estrema. Quindi rifiuto H0."
\`\`\`

🎯 LIVELLI SIGNIFICATIVITÀ:
- p < 0.001 → ***
- p < 0.01  → **
- p < 0.05  → *
- p ≥ 0.05  → ns (non significativo)`
    },
    {
      id: 4,
      category: "Test Proporzioni",
      difficulty: "⭐⭐⭐",
      question: "30 successi su 100 prove. Testi se p = 0.25. Quale usi?",
      options: [
        "t.test(successi, mu = 0.25)",
        "binom.test(30, 100, p = 0.25)",
        "prop.test(30, 100, p = 0.25)",
        "Sia B che C vanno bene"
      ],
      correct: 3,
      explanation: `✅ RISPOSTA CORRETTA: Sia binom.test che prop.test

📌 DIFFERENZE:
**binom.test()**: Test esatto binomiale
- Usa distribuzione binomiale esatta
- Meglio per campioni piccoli (n < 30)
- Più conservativo

**prop.test()**: Test approssimato (χ²)
- Usa approssimazione normale/chi-quadrato
- Meglio per campioni grandi (n ≥ 30)
- Meno conservativo

🧮 CODICE:
\`\`\`r
# Test esatto
binom.test(30, 100, p = 0.25, alternative = "two.sided")

# Test approssimato
prop.test(30, 100, p = 0.25, correct = TRUE)

# Con Yates correction (default)
# correct = TRUE → più conservativo
# correct = FALSE → più potente
\`\`\`

📊 CONFRONTARE DUE PROPORZIONI:
\`\`\`r
# Gruppo A: 30/100, Gruppo B: 45/120
prop.test(c(30, 45), c(100, 120))
\`\`\`

⚠️ NON USARE t.test() per proporzioni!
Il t-test è per medie continue, non proporzioni.`
    },
    {
      id: 5,
      category: "ANOVA vs t-test",
      difficulty: "⭐⭐⭐",
      question: "Confronti le medie di 4 gruppi. Perché NON fare 6 t-test separati?",
      options: [
        "Troppo lungo da calcolare",
        "Inflazione errore Tipo I (falsi positivi)",
        "R non lo permette",
        "ANOVA è sempre più potente"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: Inflazione errore Tipo I

📌 PROBLEMA CONFRONTI MULTIPLI:
Con 4 gruppi → 6 confronti a coppie (A-B, A-C, A-D, B-C, B-D, C-D)

🔴 RISCHIO:
- Ogni test: α = 0.05 (5% falso positivo)
- 6 test: P(almeno 1 falso positivo) = 1 - (0.95)⁶ ≈ 26%!

✅ SOLUZIONE: ANOVA
- Test omnibus: controlla tutti i gruppi insieme
- Mantiene α = 0.05 per l'intera famiglia di test

🧮 WORKFLOW CORRETTO:
\`\`\`r
# Passo 1: ANOVA
modello <- aov(voto ~ corso, data = studenti)
summary(modello)

# Se p < 0.05 → almeno un gruppo è diverso

# Passo 2: Post-hoc (Tukey HSD)
TukeyHSD(modello)
# Confronti a coppie con correzione Bonferroni
\`\`\`

📊 QUANDO USARE COSA:
- 2 gruppi → t-test
- 3+ gruppi → ANOVA + post-hoc

⚠️ ATTENZIONE:
Se fai ANOVA e p ≥ 0.05, **STOP**!
Non fare post-hoc se l'ANOVA non è significativa.`
    },
    {
      id: 6,
      category: "Errori - Tipo I e II",
      difficulty: "⭐⭐⭐⭐",
      question: "Quale affermazione è CORRETTA?",
      options: [
        "Errore Tipo I = Falso Negativo, Tipo II = Falso Positivo",
        "Errore Tipo I = Rifiutare H0 vera, Tipo II = Non rifiutare H0 falsa",
        "α è la probabilità di Errore Tipo II",
        "Aumentando α diminuisce l'Errore Tipo I"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: Tipo I = Rifiutare H0 vera, Tipo II = Non rifiutare H0 falsa

📌 DEFINIZIONI:
**Errore Tipo I (α)**: FALSO POSITIVO
- Rifiuto H0 quando è vera
- "Allarme falso"
- Probabilità = α (es. 0.05)

**Errore Tipo II (β)**: FALSO NEGATIVO
- Non rifiuto H0 quando è falsa
- "Miss, non rilevato"
- Probabilità = β

**Potenza (1 - β)**: Probabilità di rilevare un effetto reale

📊 TABELLA VERITÀ:
\`\`\`
               | H0 vera    | H0 falsa
---------------|------------|------------
Rifiuto H0     | Tipo I (α) | Corretto ✓
Non rifiuto H0 | Corretto ✓ | Tipo II (β)
\`\`\`

⚖️ TRADE-OFF:
- Diminuendo α → aumenta β (più conservativi)
- Aumentando α → diminuisce β (più potenti, ma più falsi positivi)

🎯 AUMENTARE POTENZA (1-β):
1. Aumentare n (dimensione campione)
2. Aumentare α (ma attenzione!)
3. Aumentare effect size (differenza reale)
4. Ridurre variabilità

🧮 CALCOLO POTENZA IN R:
\`\`\`r
# Esempio: t-test
power.t.test(n = 30, delta = 5, sd = 10, sig.level = 0.05)
# power = 0.87 → 87% di rilevare effetto reale
\`\`\``
    },
    {
      id: 7,
      category: "Assunzioni t-test",
      difficulty: "⭐⭐⭐",
      question: "Quali sono le assunzioni del t-test?",
      options: [
        "Solo normalità",
        "Normalità, indipendenza, omogeneità varianze (per unpaired)",
        "Solo indipendenza",
        "Nessuna assunzione, è robusto a tutto"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: Normalità, indipendenza, omogeneità varianze

📌 ASSUNZIONI T-TEST:

**1. NORMALITÀ**
- Distribuzione approssimamente normale
- Verificare con: Shapiro-Wilk, Q-Q plot, istogrammi
- Robusto per n > 30 (TLC)

**2. INDIPENDENZA**
- Osservazioni indipendenti tra loro
- Verificare col disegno sperimentale
- Non verificabile statisticamente

**3. OMOGENEITÀ VARIANZE** (solo unpaired)
- σ₁² = σ₂² (varianze uguali)
- Verificare con: Levene test, Bartlett test
- Se violata → Welch t-test

🧮 VERIFICA ASSUNZIONI IN R:
\`\`\`r
# 1. Normalità
shapiro.test(gruppo_A)
qqnorm(gruppo_A); qqline(gruppo_A)

# 2. Omogeneità varianze
var.test(gruppo_A, gruppo_B)
# O con Levene (più robusto)
library(car)
leveneTest(valore ~ gruppo, data = df)

# 3. Se varianze diverse → Welch
t.test(gruppo_A, gruppo_B, var.equal = FALSE)
\`\`\`

⚠️ COSA FARE SE VIOLATE:
- **Non normale + n < 30** → Mann-Whitney U (wilcox.test)
- **Varianze diverse** → Welch t-test (var.equal = FALSE)
- **Outliers estremi** → test non parametrico

✅ ROBUSTEZZA:
- T-test è robusto a lievi violazioni di normalità
- Più importante per campioni piccoli (n < 30)
- TLC protegge per n grandi`
    },
    {
      id: 8,
      category: "IC vs Test",
      difficulty: "⭐⭐⭐⭐",
      question: "IC 95% per μ: [12, 18]. Cosa puoi concludere su H0: μ = 20?",
      options: [
        "Non rifiuto H0 (α = 0.05)",
        "Rifiuto H0 (α = 0.05)",
        "Serve fare il test per saperlo",
        "Dipende dal p-value"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: Rifiuto H0

📌 EQUIVALENZA IC - TEST:
**Se valore null NON è nell'IC → Rifiuto H0**
**Se valore null È nell'IC → Non rifiuto H0**

🔍 LOGICA:
- IC 95% = [12, 18]
- H0: μ = 20
- 20 NON è in [12, 18]
- → p-value < 0.05
- → Rifiuto H0

🧮 VERIFICA IN R:
\`\`\`r
campione <- rnorm(30, mean = 15, sd = 3)

# Intervallo confidenza
t.test(campione)$conf.int
# Output: [14.2, 15.8]

# Test
t.test(campione, mu = 20)
# p-value < 0.001 → Rifiuto!
\`\`\`

📊 DUALITÀ IC-TEST:
\`\`\`
IC 95% <-> Test two-sided α=0.05
IC 90% <-> Test two-sided α=0.10
IC 99% <-> Test two-sided α=0.01
\`\`\`

⚠️ ATTENZIONE:
Questa equivalenza vale SOLO per:
- Test **two-sided** (bidirezionale)
- Stesso livello di confidenza/significatività

🎯 INTERPRETAZIONE IC:
"Siamo confidenti al 95% che μ ∈ [12, 18]"
≠ "C'è 95% di probabilità che μ ∈ [12, 18]"

Il parametro μ è FISSO, l'intervallo è ALEATORIO!

💡 VANTAGGIO IC:
Fornisce informazione su **grandezza effetto**, non solo significatività`
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
    setTimeLeft(600);
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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full mb-4">
                {percentage >= 70 ? (
                  <CheckCircle className="w-16 h-16 text-white" />
                ) : (
                  <XCircle className="w-16 h-16 text-white" />
                )}
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Quiz Completato!
              </h2>
              <p className="text-6xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
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
                      : percentage >= 50
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
                      <summary className="cursor-pointer text-sm font-medium text-pink-600 hover:text-pink-800">
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
              className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-pink-700 hover:to-rose-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Quiz Test di Ipotesi
              </h1>
              <p className="text-gray-600 mt-1">
                t-test, ANOVA, Proporzioni, Errori Tipo I/II
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
              className="bg-gradient-to-r from-pink-600 to-rose-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {currentQuestion + 1}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
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
                      ? 'border-pink-600 bg-gradient-to-r from-pink-50 to-rose-50 shadow-md'
                      : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'border-pink-600 bg-pink-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                    <span className={`${isSelected ? 'font-medium text-pink-900' : 'text-gray-700'}`}>
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
              className="px-8 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Completa Quiz
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg"
            >
              Successiva →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizTestIpotesi;
