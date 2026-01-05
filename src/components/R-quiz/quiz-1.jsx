import React, { useState } from 'react';
import { Terminal, CheckCircle, XCircle, Book, Play, RotateCcw, Lightbulb } from 'lucide-react';

const SimulatoreR = () => {
    const [currentExercise, setCurrentExercise] = useState(0);
    const [userCode, setUserCode] = useState('');
    const [output, setOutput] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [completedExercises, setCompletedExercises] = useState([]);
    const [showHint, setShowHint] = useState(false);

    // Esercizi basati su esami reali
    const exercises = [
        {
            id: 1,
            title: "Caricamento Dataset",
            category: "Base R",
            difficulty: "⭐",
            dataset: "strada.RData",
            description: "Carica il dataset strada.RData e visualizza le prime righe.",
            task: "Scrivi il codice per caricare il file e vedere le prime 6 righe.",
            hint: "Usa load() per caricare .RData e head() per vedere le prime righe. Il nome del dataframe è 'dati'.",
            solution: "load('strada.RData')\nhead(dati)",
            correctAnswers: [
                "load('strada.RData')\nhead(dati)",
                "load(\"strada.RData\")\nhead(dati)",
                "load('strada.RData'); head(dati)"
            ],
            expectedOutput: `   PRIMA   DOPO
1   0.23   0.11
2   0.18   0.09
3   0.31   0.15
4   0.25   0.12
5   0.19   0.08
6   0.27   0.13`,
            explanation: "load() carica file .RData in memoria. head() mostra prime 6 righe (default).",
            realExam: "Giugno 2025, Domanda 1"
        },
        {
            id: 2,
            title: "Contare Osservazioni",
            category: "Analisi Descrittiva",
            difficulty: "⭐",
            dataset: "dati",
            description: "Dataset strada già caricato. Conta quante osservazioni totali ci sono.",
            task: "Scrivi il comando per contare le righe del dataframe.",
            hint: "nrow() restituisce il numero di righe di un dataframe.",
            solution: "nrow(dati)",
            correctAnswers: [
                "nrow(dati)",
                "NROW(dati)",
                "dim(dati)[1]"
            ],
            expectedOutput: "[1] 129",
            explanation: "nrow() è il metodo standard per contare righe. dim()[1] funziona ma è meno leggibile.",
            realExam: "Giugno 2025, Domanda 1.1"
        },
        {
            id: 3,
            title: "Media con na.rm",
            category: "Statistiche Descrittive",
            difficulty: "⭐⭐",
            dataset: "dati",
            description: "Calcola la media della colonna DOPO ignorando eventuali valori mancanti.",
            task: "Calcola mean(dati$DOPO) con gestione NA.",
            hint: "Aggiungi na.rm=TRUE come secondo parametro per ignorare NA.",
            solution: "mean(dati$DOPO, na.rm=TRUE)",
            correctAnswers: [
                "mean(dati$DOPO, na.rm=TRUE)",
                "mean(dati$DOPO, na.rm = TRUE)",
                "mean(dati$DOPO, na.rm=T)"
            ],
            expectedOutput: "[1] 0.1161",
            explanation: "na.rm=TRUE (remove NA) è ESSENZIALE: senza questo parametro, mean() restituisce NA se ci sono valori mancanti!",
            realExam: "Giugno 2025, Domanda 1.1"
        },
        {
            id: 4,
            title: "Deviazione Standard",
            category: "Statistiche Descrittive",
            difficulty: "⭐⭐",
            dataset: "dati",
            description: "Calcola la deviazione standard della colonna DOPO.",
            task: "Usa sd() con na.rm=TRUE.",
            hint: "sd() funziona come mean(): sd(vettore, na.rm=TRUE)",
            solution: "sd(dati$DOPO, na.rm=TRUE)",
            correctAnswers: [
                "sd(dati$DOPO, na.rm=TRUE)",
                "sd(dati$DOPO, na.rm = TRUE)",
                "sd(dati$DOPO, na.rm=T)"
            ],
            expectedOutput: "[1] 0.5823",
            explanation: "sd() calcola deviazione standard campionaria (con denominatore n-1).",
            realExam: "Giugno 2025, Domanda 1.1"
        },
        {
            id: 5,
            title: "Contare con Condizione",
            category: "Filtraggio",
            difficulty: "⭐⭐",
            dataset: "dati",
            description: "Conta quante osservazioni hanno DOPO > 0.2",
            task: "Usa sum() con una condizione logica.",
            hint: "dati$DOPO > 0.2 restituisce vettore TRUE/FALSE. sum() conta i TRUE.",
            solution: "sum(dati$DOPO > 0.2)",
            correctAnswers: [
                "sum(dati$DOPO > 0.2)",
                "sum(dati$DOPO > 0.2, na.rm=TRUE)",
                "sum(dati$DOPO>0.2)"
            ],
            expectedOutput: "[1] 8",
            explanation: "Trucco R: TRUE vale 1, FALSE vale 0. sum() conta automaticamente i TRUE!",
            realExam: "Giugno 2025, Domanda 1.2"
        },
        {
            id: 6,
            title: "Percentili con quantile()",
            category: "Statistiche Descrittive",
            difficulty: "⭐⭐",
            dataset: "dati",
            description: "Calcola il 95° percentile di DOPO (il valore sotto cui cade il 95% dei dati).",
            task: "Usa quantile() con probabilità 0.95",
            hint: "quantile(vettore, 0.95, na.rm=TRUE) per il 95° percentile.",
            solution: "quantile(dati$DOPO, 0.95, na.rm=TRUE)",
            correctAnswers: [
                "quantile(dati$DOPO, 0.95, na.rm=TRUE)",
                "quantile(dati$DOPO, 0.95, na.rm = TRUE)",
                "quantile(dati$DOPO, 0.95)"
            ],
            expectedOutput: "  95%\n0.21",
            explanation: "quantile(x, 0.95) = 95° percentile. Utile per: 5° (0.05), 25° (0.25 = Q1), 50° (0.5 = mediana), 75° (0.75 = Q3).",
            realExam: "Giugno 2025, Domanda 1.3"
        },
        {
            id: 7,
            title: "Test t Appaiato",
            category: "Test Ipotesi",
            difficulty: "⭐⭐⭐",
            dataset: "dati",
            description: "Test se PRIMA > DOPO (campagna efficace). Usa t.test paired con alternative='greater'.",
            task: "t.test(dati$PRIMA, dati$DOPO, paired=TRUE, alternative='greater')",
            hint: "paired=TRUE perché stessi punti misurati 2 volte. alternative='greater' testa μ₁ > μ₂.",
            solution: "t.test(dati$PRIMA, dati$DOPO, paired=TRUE, alternative='greater')",
            correctAnswers: [
                "t.test(dati$PRIMA, dati$DOPO, paired=TRUE, alternative='greater')",
                "t.test(dati$PRIMA, dati$DOPO, paired=T, alternative='greater')",
                "t.test(dati$PRIMA, dati$DOPO, paired = TRUE, alternative = 'greater')"
            ],
            expectedOutput: `Paired t-test
t = 28.456, df = 128, p-value < 2.2e-16
alternative hypothesis: true mean difference is greater than 0
95 percent confidence interval:
 0.1245    Inf`,
            explanation: "p-value ≈ 0 < 0.01 → RIFIUTO H0 → La campagna è efficace!",
            realExam: "Giugno 2025, Domanda 1.6"
        },
        {
            id: 8,
            title: "Estrarre p-value",
            category: "Test Ipotesi",
            difficulty: "⭐⭐",
            dataset: "test",
            description: "Hai salvato il test in 'test'. Estrai solo il p-value.",
            task: "Usa test$p.value per estrarre il p-value dall'oggetto test.",
            hint: "Gli oggetti test in R sono liste. Accedi agli elementi con $.",
            solution: "test <- t.test(dati$PRIMA, dati$DOPO, paired=TRUE, alternative='greater')\ntest$p.value",
            correctAnswers: [
                "test$p.value",
                "test$p.value",
            ],
            expectedOutput: "[1] 3.527294e-64",
            explanation: "test$p.value, test$statistic, test$parameter, test$conf.int sono i campi utili.",
            realExam: "Giugno 2025, Domanda 1.6"
        },
        {
            id: 9,
            title: "Caricamento Dataset Fitoplancton",
            category: "Regressione - Setup",
            difficulty: "⭐",
            dataset: "fito.RData",
            description: "Carica fito.RData e visualizza struttura con str().",
            task: "load() + str() per vedere tipo variabili.",
            hint: "str() mostra struttura: tipo variabili, numero osservazioni, prime righe.",
            solution: "load('fito.RData')\nstr(fito)",
            correctAnswers: [
                "load('fito.RData')\nstr(fito)",
                "load(\"fito.RData\")\nstr(fito)",
                "load('fito.RData'); str(fito)"
            ],
            expectedOutput: `'data.frame': 509 obs. of 2 variables:
 $ temperatura : num 18.2 16.5 19.8 17.3 20.1 ...
 $ fitoplancton: num 4.32 3.45 5.12 3.89 5.45 ...`,
            explanation: "str() mostra che fito ha 509 righe, 2 colonne numeriche. Perfetto per regressione!",
            realExam: "Luglio 2025, Domanda 1"
        },
        {
            id: 10,
            title: "Media con Filtro",
            category: "Filtraggio Avanzato",
            difficulty: "⭐⭐⭐",
            dataset: "fito",
            description: "Calcola media fitoplancton SOLO per temperature < 18.5°C.",
            task: "Combina filtraggio con [ ] e mean().",
            hint: "fito$fitoplancton[fito$temperatura < 18.5] filtra, poi mean(..., na.rm=TRUE).",
            solution: "mean(fito$fitoplancton[fito$temperatura < 18.5], na.rm=TRUE)",
            correctAnswers: [
                "mean(fito$fitoplancton[fito$temperatura < 18.5], na.rm=TRUE)",
                "mean(fito$fitoplancton[fito$temperatura < 18.5], na.rm = TRUE)",
                "mean(fito$fitoplancton[fito$temperatura<18.5], na.rm=TRUE)"
            ],
            expectedOutput: "[1] 3.5491",
            explanation: "Pattern fondamentale: vettore[condizione] filtra elementi. Poi applichi funzione.",
            realExam: "Luglio 2025, Domanda 1.2"
        },
        {
            id: 11,
            title: "Scatterplot",
            category: "Regressione - Visualizzazione",
            difficulty: "⭐⭐",
            dataset: "fito",
            description: "Crea scatterplot: temperatura (x) vs fitoplancton (y).",
            task: "Usa plot(x, y) con nomi variabili.",
            hint: "plot(fito$temperatura, fito$fitoplancton) o plot(fitoplancton ~ temperatura, data=fito).",
            solution: "plot(fito$temperatura, fito$fitoplancton)",
            correctAnswers: [
                "plot(fito$temperatura, fito$fitoplancton)",
                "plot(fito$temperatura,fito$fitoplancton)",
                "plot(fitoplancton ~ temperatura, data=fito)",
                "plot(fitoplancton~temperatura,data=fito)"
            ],
            expectedOutput: "[Grafico scatterplot mostrato]\nPunti con trend positivo visibile",
            explanation: "Scatterplot mostra correlazione positiva forte (punti salgono da sinistra a destra).",
            realExam: "Luglio 2025, Domanda 1.4-5"
        },
        {
            id: 12,
            title: "Test Correlazione",
            category: "Regressione - Correlazione",
            difficulty: "⭐⭐⭐",
            dataset: "fito",
            description: "Testa se temperatura e fitoplancton sono correlati (α=0.01).",
            task: "Usa cor.test() e salva risultato in variabile.",
            hint: "cor.test(x, y) restituisce test con stima correlazione e p-value.",
            solution: "test_cor <- cor.test(fito$temperatura, fito$fitoplancton)\ntest_cor$estimate\ntest_cor$p.value",
            correctAnswers: [
                "cor.test(fito$temperatura, fito$fitoplancton)",
                "test_cor <- cor.test(fito$temperatura, fito$fitoplancton)",
                "cor.test(fito$temperatura,fito$fitoplancton)"
            ],
            expectedOutput: `      cor
0.8305907

[1] 2.742e-127`,
            explanation: "r = 0.831 (correlazione ALTA, positiva). p-value ≈ 0 → correlazione significativa!",
            realExam: "Luglio 2025, Domanda 1.6"
        },
        {
            id: 13,
            title: "Regressione Lineare",
            category: "Regressione - Modello",
            difficulty: "⭐⭐⭐⭐",
            dataset: "fito",
            description: "Stima retta: fitoplancton ~ temperatura. Usa lm().",
            task: "lm(y ~ x, data=...) per modello lineare.",
            hint: "lm(fitoplancton ~ temperatura, data=fito) stima intercetta + coefficiente angolare.",
            solution: "modello <- lm(fitoplancton ~ temperatura, data=fito)\nmodello",
            correctAnswers: [
                "lm(fitoplancton ~ temperatura, data=fito)",
                "modello <- lm(fitoplancton ~ temperatura, data=fito)",
                "lm(fitoplancton~temperatura,data=fito)"
            ],
            expectedOutput: `Coefficients:
(Intercept)  temperatura
    -2.4567       0.3214`,
            explanation: "Retta stimata: ŷ = -2.46 + 0.32*temperatura. All'aumentare di 1°C, fitoplancton aumenta di 0.32 milioni cellule/L.",
            realExam: "Luglio 2025, Domanda 1.7"
        },
        {
            id: 14,
            title: "R² (Bontà Modello)",
            category: "Regressione - Valutazione",
            difficulty: "⭐⭐⭐",
            dataset: "modello",
            description: "Calcola R² del modello (quanto % varianza spiegata).",
            task: "Usa summary() sul modello, poi estrai $r.squared.",
            hint: "summary(modello)$r.squared. R² = (correlazione)².",
            solution: "summary(modello)$r.squared",
            correctAnswers: [
                "summary(modello)$r.squared",
                "summary(lm(fitoplancton ~ temperatura, data=fito))$r.squared"
            ],
            expectedOutput: "[1] 0.6899",
            explanation: "R² = 0.69 → il 69% della variabilità in fitoplancton è spiegata dalla temperatura. Buon modello!",
            realExam: "Luglio 2025, Domanda 1.8"
        },
        {
            id: 15,
            title: "Test Proporzioni",
            category: "Test Ipotesi - Binomiale",
            difficulty: "⭐⭐⭐",
            dataset: "basket",
            description: "65 Playmaker su 324 giocatori. Testa H0: p=0.25 vs H1: p≠0.25.",
            task: "Usa binom.test(x, n, p=..., alternative='two.sided').",
            hint: "binom.test(65, 324, p=0.25, alternative='two.sided') per test bilaterale.",
            solution: "test_prop <- binom.test(65, 324, p=0.25, alternative='two.sided')\ntest_prop$p.value",
            correctAnswers: [
                "binom.test(65, 324, p=0.25, alternative='two.sided')",
                "test_prop <- binom.test(65, 324, p=0.25, alternative='two.sided')",
                "binom.test(65,324,p=0.25,alternative='two.sided')"
            ],
            expectedOutput: `[1] 0.0401`,
            explanation: "p-value = 0.0401. Con α=0.05 → rifiuto. Con α=0.01 → NON rifiuto. Dipende dal livello!",
            realExam: "Luglio 2025, Domanda 4.5-6"
        }
    ];

    const currentEx = exercises[currentExercise];

    const checkAnswer = () => {
        const normalized = userCode.trim().toLowerCase().replace(/\s+/g, '');
        const isMatch = currentEx.correctAnswers.some(ans =>
            ans.toLowerCase().replace(/\s+/g, '') === normalized
        );

        setIsCorrect(isMatch);
        setOutput(isMatch ? currentEx.expectedOutput : "❌ Codice non corretto. Riprova o guarda l'hint.");

        if (isMatch && !completedExercises.includes(currentEx.id)) {
            setCompletedExercises([...completedExercises, currentEx.id]);
        }
    };

    const nextExercise = () => {
        if (currentExercise < exercises.length - 1) {
            setCurrentExercise(currentExercise + 1);
            setUserCode('');
            setOutput('');
            setIsCorrect(null);
            setShowHint(false);
        }
    };

    const prevExercise = () => {
        if (currentExercise > 0) {
            setCurrentExercise(currentExercise - 1);
            setUserCode('');
            setOutput('');
            setIsCorrect(null);
            setShowHint(false);
        }
    };

    const showSolution = () => {
        setUserCode(currentEx.solution);
        setOutput(currentEx.expectedOutput);
        setIsCorrect(true);
    };

    const progress = (completedExercises.length / exercises.length) * 100;

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui' }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
                color: 'white',
                padding: '30px',
                borderRadius: '12px',
                marginBottom: '30px',
                boxShadow: '0 10px 30px rgba(44, 62, 80, 0.3)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                    <Terminal size={36} />
                    <div>
                        <h1 style={{ margin: 0, fontSize: '28px' }}>🔬 Simulatore R - EPS</h1>
                        <p style={{ margin: '5px 0 0 0', opacity: 0.95 }}>
                            Esercizi guidati da esami reali (Giugno-Luglio 2025)
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Progresso: {completedExercises.length}/{exercises.length} esercizi completati</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '12px',
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '6px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${progress}%`,
                            height: '100%',
                            background: '#2ecc71',
                            transition: 'width 0.3s ease',
                            borderRadius: '6px'
                        }} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                {/* Left Panel - Exercise */}
                <div>
                    {/* Exercise Card */}
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '25px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        marginBottom: '20px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{
                  background: '#e3f2fd',
                  color: '#1976d2',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '500'
              }}>
                {currentEx.category}
              </span>
                            <span style={{
                                background: '#fff3cd',
                                padding: '6px 14px',
                                borderRadius: '20px',
                                fontSize: '13px'
                            }}>
                {currentEx.difficulty}
              </span>
                        </div>

                        <h2 style={{ fontSize: '22px', marginBottom: '12px', color: '#2c3e50' }}>
                            #{currentEx.id}. {currentEx.title}
                        </h2>

                        <div style={{
                            background: '#f8f9fa',
                            padding: '15px',
                            borderRadius: '8px',
                            marginBottom: '15px',
                            borderLeft: '4px solid #3498db'
                        }}>
                            <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6' }}>
                                <strong>Dataset:</strong> <code style={{
                                background: '#e9ecef',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontFamily: 'monospace'
                            }}>{currentEx.dataset}</code>
                            </p>
                            <p style={{ margin: '10px 0 0 0', fontSize: '15px', lineHeight: '1.6' }}>
                                {currentEx.description}
                            </p>
                        </div>

                        <div style={{
                            background: '#fff9e6',
                            padding: '15px',
                            borderRadius: '8px',
                            borderLeft: '4px solid #f39c12'
                        }}>
                            <p style={{ margin: 0, fontWeight: '500', fontSize: '15px' }}>
                                📝 Compito: {currentEx.task}
                            </p>
                        </div>

                        {showHint && (
                            <div style={{
                                marginTop: '15px',
                                background: '#e8f5e9',
                                padding: '15px',
                                borderRadius: '8px',
                                borderLeft: '4px solid #4caf50'
                            }}>
                                <p style={{ margin: 0, fontSize: '14px' }}>
                                    💡 <strong>Hint:</strong> {currentEx.hint}
                                </p>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                            <button
                                onClick={() => setShowHint(!showHint)}
                                style={{
                                    padding: '8px 16px',
                                    background: showHint ? '#95a5a6' : '#3498db',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                <Lightbulb size={16} />
                                {showHint ? 'Nascondi Hint' : 'Mostra Hint'}
                            </button>

                            <button
                                onClick={showSolution}
                                style={{
                                    padding: '8px 16px',
                                    background: '#e74c3c',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                <Book size={16} />
                                Mostra Soluzione
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
                        <button
                            onClick={prevExercise}
                            disabled={currentExercise === 0}
                            style={{
                                padding: '12px 24px',
                                background: currentExercise === 0 ? '#e0e0e0' : '#95a5a6',
                                color: currentExercise === 0 ? '#999' : 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: currentExercise === 0 ? 'not-allowed' : 'pointer',
                                fontSize: '15px',
                                fontWeight: '500'
                            }}
                        >
                            ← Precedente
                        </button>

                        <div style={{
                            padding: '12px 20px',
                            background: '#f8f9fa',
                            borderRadius: '8px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            {currentExercise + 1} / {exercises.length}
                        </div>

                        <button
                            onClick={nextExercise}
                            disabled={currentExercise === exercises.length - 1}
                            style={{
                                padding: '12px 24px',
                                background: currentExercise === exercises.length - 1 ? '#e0e0e0' : '#3498db',
                                color: currentExercise === exercises.length - 1 ? '#999' : 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: currentExercise === exercises.length - 1 ? 'not-allowed' : 'pointer',
                                fontSize: '15px',
                                fontWeight: '500'
                            }}
                        >
                            Successivo →
                        </button>
                    </div>
                </div>

                {/* Right Panel - R Console */}
                <div>
                    {/* Code Editor */}
                    <div style={{
                        background: '#1e1e1e',
                        borderRadius: '12px',
                        padding: '20px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        marginBottom: '20px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '15px',
                            paddingBottom: '15px',
                            borderBottom: '1px solid #3a3a3a'
                        }}>
                            <Terminal size={20} color="#4caf50" />
                            <span style={{ color: '#4caf50', fontWeight: 'bold', fontFamily: 'monospace' }}>
                R Console
              </span>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <div style={{
                                color: '#7f8c8d',
                                fontSize: '12px',
                                marginBottom: '8px',
                                fontFamily: 'monospace'
                            }}>
                                # Scrivi il tuo codice R qui:
                            </div>
                            <textarea
                                value={userCode}
                                onChange={(e) => setUserCode(e.target.value)}
                                placeholder="load('dati.RData')
head(dati)"
                                style={{
                                    width: '100%',
                                    minHeight: '150px',
                                    background: '#2d2d2d',
                                    color: '#d4d4d4',
                                    border: '1px solid #3a3a3a',
                                    borderRadius: '6px',
                                    padding: '12px',
                                    fontFamily: 'Consolas, Monaco, monospace',
                                    fontSize: '14px',
                                    resize: 'vertical',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <button
                            onClick={checkAnswer}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: '#4caf50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '15px',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
                            }}
                        >
                            <Play size={18} />
                            Esegui Codice
                        </button>
                    </div>

                    {/* Output */}
                    {output && (
                        <div style={{
                            background: 'white',
                            borderRadius: '12px',
                            padding: '20px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            marginBottom: '20px'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '15px'
                            }}>
                                {isCorrect ? (
                                    <CheckCircle color="#4caf50" size={24} />
                                ) : (
                                    <XCircle color="#f44336" size={24} />
                                )}
                                <span style={{
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    color: isCorrect ? '#4caf50' : '#f44336'
                                }}>
                  {isCorrect ? 'Corretto! ✓' : 'Non corretto ✗'}
                </span>
                            </div>

                            <div style={{
                                background: '#f8f9fa',
                                padding: '15px',
                                borderRadius: '8px',
                                fontFamily: 'Consolas, Monaco, monospace',
                                fontSize: '13px',
                                whiteSpace: 'pre-wrap',
                                borderLeft: `4px solid ${isCorrect ? '#4caf50' : '#f44336'}`
                            }}>
                                {output}
                            </div>

                            {isCorrect && (
                                <div style={{
                                    marginTop: '15px',
                                    padding: '15px',
                                    background: '#e8f5e9',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    lineHeight: '1.6'
                                }}>
                                    <strong>📚 Spiegazione:</strong>
                                    <p style={{ margin: '8px 0 0 0' }}>{currentEx.explanation}</p>
                                    <p style={{
                                        margin: '10px 0 0 0',
                                        fontSize: '13px',
                                        color: '#7f8c8d',
                                        fontStyle: 'italic'
                                    }}>
                                        ✏️ Fonte: {currentEx.realExam}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Quick Reference */}
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '20px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}>
                        <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: '#2c3e50' }}>
                            📖 Riferimento Rapido R
                        </h3>
                        <div style={{ fontSize: '13px', lineHeight: '1.8', color: '#555' }}>
                            <p style={{ margin: '0 0 8px 0' }}><code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '3px' }}>load("file.RData")</code> - Carica dataset</p>
                            <p style={{ margin: '0 0 8px 0' }}><code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '3px' }}>head(df)</code> - Prime 6 righe</p>
                            <p style={{ margin: '0 0 8px 0' }}><code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '3px' }}>nrow(df)</code> - Conta righe</p>
                            <p style={{ margin: '0 0 8px 0' }}><code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '3px' }}>mean(x, na.rm=TRUE)</code> - Media</p>
                            <p style={{ margin: '0 0 8px 0' }}><code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '3px' }}>sd(x, na.rm=TRUE)</code> - Dev std</p>
                            <p style={{ margin: '0 0 8px 0' }}><code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '3px' }}>quantile(x, 0.95)</code> - Percentile</p>
                            <p style={{ margin: '0 0 8px 0' }}><code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '3px' }}>sum(x > 10)</code> - Conta TRUE</p>
                            <p style={{ margin: '0 0 8px 0' }}><code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '3px' }}>t.test(x, y, paired=TRUE)</code> - Test t</p>
                            <p style={{ margin: '0 0 8px 0' }}><code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '3px' }}>cor.test(x, y)</code> - Correlazione</p>
                            <p style={{ margin: '0 0 8px 0' }}><code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '3px' }}>lm(y ~ x, data=df)</code> - Regressione</p>
                            <p style={{ margin: '0 0 0 0' }}><code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '3px' }}>binom.test(x, n, p=0.5)</code> - Test proporzioni</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Tips */}
            <div style={{
                marginTop: '30px',
                padding: '20px',
                background: '#fff3cd',
                borderRadius: '10px',
                borderLeft: '5px solid #f39c12'
            }}>
                <h3 style={{ margin: '0 0 12px 0', color: '#e67e22' }}>💡 Consigli per l'esame:</h3>
                <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li><strong>na.rm=TRUE</strong> è obbligatorio con mean(), sd(), quantile() se ci sono NA</li>
                    <li><strong>paired=TRUE</strong> per test su misure ripetute (stesso soggetto misurato 2 volte)</li>
                    <li><strong>alternative</strong>: "greater" (>), "less" (&lt;), "two.sided" (≠)</li>
                    <li><strong>Filtraggio</strong>: df$var[df$gruppo=="A"] per statistiche per gruppo</li>
                    <li><strong>Regressione</strong>: prima plot() (scatterplot), poi cor.test(), poi lm()</li>
                    <li><strong>R²</strong>: summary(modello)$r.squared per bontà del modello</li>
                </ul>
            </div>
        </div>
    );
};

export default SimulatoreR;