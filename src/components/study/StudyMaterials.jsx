import React, { useState } from 'react';
import { BookOpen, Code, Calculator, ChevronDown, ChevronRight, Search } from 'lucide-react';

const StudyMaterials = () => {
    const [activeSection, setActiveSection] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('teoria'); // teoria, r-commands, formulas

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? '' : section);
    };

    const theoryContent = [
        {
            id: 'probabilita',
            title: 'Probabilità',
            icon: <Calculator className="w-5 h-5" />,
            subsections: [
                {
                    title: 'Concetti Base',
                    content: `
**Modello Probabilistico:**
- **Spazio campionario (Ω)**: insieme con tutti i possibili esiti dell'esperimento
- **Legge di probabilità P**: funzione che assegna ad ogni esito un valore [0,1]

**Proprietà di P:**
- P(A) ≥ 0 per ogni evento A
- P(Ω) = 1
- Se A e B disgiunti: P(A ∪ B) = P(A) + P(B) (additività)

**Due interpretazioni di P:**
1. **Frequenza relativa**: P(A) = casi favorevoli / casi possibili
2. **Area**: per spazi continui, P(A) = area di A`
                },
                {
                    title: 'Probabilità Condizionata',
                    content: `
**Definizione:**
P(A|B) = P(A ∩ B) / P(B)   per P(B) ≠ 0

**Formula di Bayes:**
P(A|B) = P(B|A) × P(A) / P(B)

**Regola della moltiplicazione:**
P(A₁ ∩ A₂ ∩ ... ∩ Aₙ) = P(A₁) × P(A₂|A₁) × P(A₃|A₁∩A₂) × ... × P(Aₙ|Aₙ₋₁∩...∩A₁)

**Formula delle probabilità totali:**
Se A₁, ..., Aₙ è una partizione di Ω:
P(B) = P(B|A₁)×P(A₁) + ... + P(B|Aₙ)×P(Aₙ)

**Indipendenza:**
A e B sono indipendenti se P(A|B) = P(A)
⟺ P(A ∩ B) = P(A) × P(B)`
                },
                {
                    title: 'Proprietà della Probabilità',
                    content: `
- Se A ⊆ B allora P(A) ≤ P(B)
- P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
- P(A ∪ B) ≤ P(A) + P(B)
- P(A ∪ B ∪ C) = P(A) + P(B) + P(C) - P(A∩B) - P(B∩C) - P(A∩C) + P(A∩B∩C)`
                }
            ]
        },
        {
            id: 'va-discrete',
            title: 'Variabili Aleatorie Discrete',
            icon: <Calculator className="w-5 h-5" />,
            subsections: [
                {
                    title: 'Definizioni',
                    content: `
**Variabile Aleatoria (v.a.)**: funzione da Ω a ℝ

**PMF (Probability Mass Function):**
Data una v.a. X e un valore x, restituisce P(X = x)

**Proprietà:**
- Pₓ(x) ≥ 0 per ogni x
- Σ Pₓ(x) = 1 per tutti gli x ∈ Im(X)

**Media (o valore atteso):**
E[X] = Σ x × Pₓ(x)

**Varianza:**
Var(X) = E[(X - E[X])²] = E[X²] - E[X]²

**Deviazione standard:**
SD(X) = √Var(X)

**Proprietà:**
- E[aX + b] = a×E[X] + b
- Var(aX + b) = a²×Var(X)`
                },
                {
                    title: 'Distribuzioni Discrete Note',
                    content: `
**Bernoulliana(p):**
- Esito: successo (1) o fallimento (0)
- P(X=1) = p, P(X=0) = 1-p
- E[X] = p, Var(X) = p(1-p)

**Binomiale(n, p):**
- n prove indipendenti bernoulliane
- X = numero di successi
- P(X=k) = C(n,k) × pᵏ × (1-p)ⁿ⁻ᵏ
- E[X] = np, Var(X) = np(1-p)

**Geometrica(p):**
- Numero di prove fino al primo successo
- P(X=k) = (1-p)ᵏ⁻¹ × p
- E[X] = 1/p, Var(X) = (1-p)/p²

**Poisson(λ):**
- Eventi rari in intervallo continuo
- P(X=k) = (λᵏ/k!) × e⁻ᵏ
- E[X] = Var(X) = λ
- Se dilati la finestra di k, moltiplica λ per k

**Ipergeometrica(N, C, n):**
- n estrazioni senza reimbussolamento da N oggetti (C con caratteristica)
- X = numero oggetti con caratteristica estratti
- E[X] = n × (C/N)`
                }
            ]
        },
        {
            id: 'va-continue',
            title: 'Variabili Aleatorie Continue',
            icon: <Calculator className="w-5 h-5" />,
            subsections: [
                {
                    title: 'Definizioni',
                    content: `
**PDF (Probability Density Function):**
Funzione fₓ(x) tale che P(X ∈ A) = ∫ₐ fₓ(t) dt

**Proprietà:**
- fₓ(x) ≥ 0
- ∫₋∞⁺∞ fₓ(x) dx = 1
- P(X = a) = 0 (punto singolo ha probabilità zero)

**CDF (Cumulative Distribution Function):**
Fₓ(x) = P(X ≤ x) = ∫₋∞ˣ fₓ(t) dt

**Media e Varianza:**
- E[X] = ∫₋∞⁺∞ x × fₓ(x) dx
- Var(X) = E[X²] - E[X]²

**Standardizzazione:**
Z = (X - μ) / σ
dove μ = E[X], σ = √Var(X)
⟹ E[Z] = 0, Var(Z) = 1`
                },
                {
                    title: 'Distribuzioni Continue Note',
                    content: `
**Uniforme(a, b):**
- fₓ(x) = 1/(b-a) se x ∈ [a,b], 0 altrimenti
- E[X] = (a+b)/2
- Var(X) = (b-a)²/12

**Esponenziale(λ):**
- fₓ(x) = λe⁻ᵏˣ per x ≥ 0, 0 per x < 0
- E[X] = 1/λ
- Var(X) = 1/λ²
- **Proprietà memoryless**: P(X > m | X > n) = P(X > m-n) se m > n

**Normale(μ, σ²):** (Gaussiana)
- E[X] = μ
- Var(X) = σ²
- Se Y = aX + b, allora Y ~ Normale(aμ+b, a²σ²)
- **Normale Standard**: μ = 0, σ = 1`
                }
            ]
        },
        {
            id: 'statistica',
            title: 'Statistica',
            icon: <Calculator className="w-5 h-5" />,
            subsections: [
                {
                    title: 'Statistica Descrittiva',
                    content: `
**Tipi di dati:**
- Qualitativi: fattoriali, character
- Quantitativi: discreti, continui

**Indici di posizione:**
- **Media campionaria**: x̄ = (Σxᵢ)/n
  (sensibile a valori estremi)
- **Mediana**: valore che lascia 50% dati a sinistra
  - Se mediana > media → valori estremi piccoli
  - Se mediana < media → valori estremi grandi
  - Se mediana ≈ media → simmetria
- **Percentili**: p-esimo percentile lascia p% dati a sinistra
  - 25°, 50°, 75° = 1°, 2°, 3° quartile

**Indici di dispersione:**
- **Varianza campionaria**: s² = Σ(xᵢ - x̄)² / (n-1)
- **Deviazione standard**: s = √s²
- **Z-scores**: zᵢ = (xᵢ - x̄) / s (standardizzazione)
- **CV (Coefficiente di variazione)**: CV = s/x̄
  - Se CV > 1 → grande variabilità

**Indici di forma:**
- **Skewness**: (1/n)Σzᵢ³
  - ≈ 0 → simmetria
  - > 0 → asimmetria destra
  - < 0 → asimmetria sinistra`
                },
                {
                    title: 'Correlazione',
                    content: `
**Correlazione di Pearson:**
- Misura relazione lineare tra due variabili quantitative
- r ∈ [-1, 1]
- r ≈ 0 → no correlazione lineare
- r > 0 → correlazione diretta
- r < 0 → correlazione inversa

**Correlazione di Spearman:**
- Usa i ranghi delle osservazioni
- Robusta a outlier

**Correlazione di Kendall:**
- Per variabili qualitative ordinabili

**⚠️ ATTENZIONE:** Correlazione ≠ Causalità!`
                },
                {
                    title: 'Statistica Inferenziale',
                    content: `
**Obiettivo:** Dai dati campionari ottenere informazioni sulla popolazione

**Stimatore (o Statistica):**
Funzione calcolabile sui dati X₁, ..., Xₙ

**Legge dei Grandi Numeri:**
Per n → ∞:
- x̄ → μ (media della popolazione)
- s² → σ² (varianza della popolazione)

**Proprietà:**
- E[x̄] = μ
- Var(x̄) = σ²/n

**Teorema del Limite Centrale (TLC):**
Per n ≥ 30:
Z = (x̄ - μ) / (s/√n) ~ Normale(0, 1)

(Se n < 30, assumere X ~ Normale)`
                }
            ]
        },
        {
            id: 'intervalli-confidenza',
            title: 'Intervalli di Confidenza',
            icon: <Calculator className="w-5 h-5" />,
            subsections: [
                {
                    title: 'Concetto',
                    content: `
**Intervallo di Confidenza (IC):**
Restituisce [a, b] e confidenza (1-α)

**Interpretazione:**
"La probabilità che [a,b] contenga il vero valore del parametro è (1-α)"

**Procedura generale:**
1. Trovare una quantità pivotale Q
2. Fissare confidenza (1-α), trovare z₁ e z₂ tali che:
   P(z₁ < Q < z₂) = 1-α
3. Isolare il parametro incognito`
                },
                {
                    title: 'IC per la Media',
                    content: `
**Quantità pivotale:**
Q = (x̄ - μ) / (s/√n)

**Se n ≥ 30:**
Q ~ Normale(0, 1)

**Se n < 30:**
Assumere X ~ Normale
Q ~ t di Student con (n-1) gradi di libertà

**In R:**
t.test(x, conf.level = 0.95)`
                },
                {
                    title: 'IC per Proporzioni',
                    content: `
**Contesto:** v.a. Bernoulliana, stimare p

**In R:**
binom.test(successi, n, conf.level = 0.95)`
                },
                {
                    title: 'IC per Differenza di Medie',
                    content: `
**Due casi:**

**1. Campioni indipendenti:**
Gruppi diversi e indipendenti
\`\`\`r
t.test(x, y, conf.level = 0.95, paired = FALSE)
\`\`\`

**2. Campioni appaiati:**
Stesse unità statistiche misurate due volte
\`\`\`r
t.test(x, y, conf.level = 0.95, paired = TRUE)
\`\`\`

**Nota:** X - Y, IC per μ_X - μ_Y`
                }
            ]
        },
        {
            id: 'test-ipotesi',
            title: 'Test di Ipotesi',
            icon: <Calculator className="w-5 h-5" />,
            subsections: [
                {
                    title: 'Concetto',
                    content: `
**Ipotesi Nulla (H₀):**
Proposizione sui parametri (es: μ = 0)

**Ipotesi Alternativa (H₁):**
Ciò che adottiamo se abbandoniamo H₀

**Tipi di H₁:**
- **One-sided (unilaterale)**: μ > 0 oppure μ < 0
- **Two-sided (bilaterale)**: μ ≠ 0

**P-value:**
Probabilità di osservare dati così estremi (o più) assumendo H₀ vera

**Regola decisionale:**
- Se p-value < α → rifiuto H₀
- Se p-value ≥ α → NON rifiuto H₀
- Tipicamente α = 0.05

**⚠️ ATTENZIONE:**
- NON si "accetta" H₀, solo "non si rifiuta"
- P-value basso → evidenza CONTRO H₀
- P-value alto → mancanza di evidenza, NON conferma di H₀`
                },
                {
                    title: 'Test t (una media)',
                    content: `
**H₀: μ = μ₀**

**In R:**
\`\`\`r
t.test(x, alternative = "two.sided", mu = μ₀)
t.test(x, alternative = "greater", mu = μ₀)
t.test(x, alternative = "less", mu = μ₀)
\`\`\`

**Output:**
- t = statistica test
- df = gradi di libertà
- p-value = probabilità valori estremi`
                },
                {
                    title: 'Test t (due medie)',
                    content: `
**H₀: μ_X = μ_Y** (o equivalente: μ_X - μ_Y = 0)

**Campioni indipendenti:**
\`\`\`r
t.test(x, y, alternative = "two.sided", paired = FALSE)
\`\`\`

**Campioni appaiati:**
\`\`\`r
t.test(x, y, alternative = "two.sided", paired = TRUE)
\`\`\`

**⚠️ ERRORE COMUNE:**
Confondere paired = TRUE/FALSE!
- TRUE: stesse unità, misurate 2 volte
- FALSE: gruppi diversi`
                },
                {
                    title: 'Errori Tipo I e II',
                    content: `
**Errore di Tipo I:**
Rifiutare H₀ quando è vera (falso positivo)
P(Errore I) = α (livello di significatività)

**Errore di Tipo II:**
Non rifiutare H₀ quando è falsa (falso negativo)
P(Errore II) = β

**Potenza del test:**
1 - β = probabilità di rifiutare H₀ quando è falsa

**Tabella:**
                 H₀ vera    H₀ falsa
Rifiuto H₀      Errore I   Decisione corretta
Non rifiuto H₀  Corretto   Errore II`
                }
            ]
        }
    ];

    const rCommands = [
        {
            id: 'base',
            title: 'Comandi Base',
            icon: <Code className="w-5 h-5" />,
            commands: [
                {
                    name: 'getwd()',
                    description: 'Restituisce la working directory corrente',
                    example: 'getwd()'
                },
                {
                    name: 'c(...)',
                    description: 'Crea un vettore con gli elementi specificati',
                    example: 'x <- c(1, 2, 3, 4, 5)'
                },
                {
                    name: 'n:m',
                    description: 'Crea sequenza di numeri da n a m',
                    example: 'i <- 1:10'
                },
                {
                    name: 'sum()',
                    description: 'Somma elementi di un vettore',
                    example: 'sum(c(1, 2, 3))  # = 6'
                },
                {
                    name: 'length()',
                    description: 'Lunghezza di un vettore',
                    example: 'length(c(1,2,3))  # = 3'
                },
                {
                    name: 'exp(x)',
                    description: 'Calcola e^x',
                    example: 'exp(1)  # = 2.718...'
                }
            ]
        },
        {
            id: 'statistiche',
            title: 'Statistiche Descrittive',
            icon: <Code className="w-5 h-5" />,
            commands: [
                {
                    name: 'mean(x)',
                    description: 'Media campionaria',
                    example: 'mean(c(1, 2, 3, 4, 5))  # = 3'
                },
                {
                    name: 'median(x)',
                    description: 'Mediana',
                    example: 'median(c(1, 2, 3, 4, 5))  # = 3'
                },
                {
                    name: 'var(x)',
                    description: 'Varianza campionaria',
                    example: 'var(c(1, 2, 3, 4, 5))'
                },
                {
                    name: 'sd(x)',
                    description: 'Deviazione standard',
                    example: 'sd(c(1, 2, 3, 4, 5))'
                },
                {
                    name: 'quantile(x, p)',
                    description: 'Calcola il p-esimo quantile',
                    example: 'quantile(x, 0.25)  # 1° quartile\nquantile(x)  # tutti i quartili'
                },
                {
                    name: 'skewness(x)',
                    description: 'Indice di asimmetria (richiede library)',
                    example: 'library(moments)\nskewness(x)'
                },
                {
                    name: 'cor(x, y, method)',
                    description: 'Correlazione tra x e y',
                    example: 'cor(x, y, method="pearson")\ncor(x, y, method="spearman")'
                }
            ]
        },
        {
            id: 'distribuzioni-discrete',
            title: 'Distribuzioni Discrete',
            icon: <Code className="w-5 h-5" />,
            commands: [
                {
                    name: 'dbinom(x, size, prob)',
                    description: 'PMF Binomiale: P(X = x)',
                    example: 'dbinom(3, size=10, prob=0.5)\n# P(X=3) con n=10, p=0.5'
                },
                {
                    name: 'pbinom(q, size, prob)',
                    description: 'CDF Binomiale: P(X ≤ q)',
                    example: 'pbinom(3, size=10, prob=0.5)\n# P(X≤3)'
                },
                {
                    name: 'qbinom(p, size, prob)',
                    description: 'Quantile Binomiale',
                    example: 'qbinom(0.25, size=10, prob=0.5)'
                },
                {
                    name: 'dpois(x, lambda)',
                    description: 'PMF Poisson: P(X = x)',
                    example: 'dpois(5, lambda=3)\n# P(X=5) con λ=3'
                },
                {
                    name: 'ppois(q, lambda)',
                    description: 'CDF Poisson: P(X ≤ q)',
                    example: 'ppois(5, lambda=3)'
                },
                {
                    name: 'dgeom(x, prob)',
                    description: 'PMF Geometrica: P(X = x)\n⚠️ x = numero di FALLIMENTI prima del successo',
                    example: 'dgeom(2, prob=0.5)\n# P(2 fallimenti prima di 1 successo)'
                },
                {
                    name: 'pgeom(q, prob)',
                    description: 'CDF Geometrica: P(X ≤ q)',
                    example: 'pgeom(2, prob=0.5)'
                }
            ]
        },
        {
            id: 'distribuzioni-continue',
            title: 'Distribuzioni Continue',
            icon: <Code className="w-5 h-5" />,
            commands: [
                {
                    name: 'dnorm(x, mean, sd)',
                    description: 'PDF Normale\n⚠️ sd è la DEVIAZIONE STANDARD, non la varianza!',
                    example: 'dnorm(0, mean=0, sd=1)\n# Normale standard in x=0'
                },
                {
                    name: 'pnorm(q, mean, sd)',
                    description: 'CDF Normale: P(X ≤ q)\n⚠️ sd, NON varianza!',
                    example: 'pnorm(1.96, mean=0, sd=1)  # ≈ 0.975\npnorm(0, mean=0, sd=1)      # = 0.5'
                },
                {
                    name: 'qnorm(p, mean, sd)',
                    description: 'Quantile Normale: valore x t.c. P(X ≤ x) = p',
                    example: 'qnorm(0.975, mean=0, sd=1)  # ≈ 1.96\nqnorm(0.5, mean=0, sd=1)    # = 0'
                },
                {
                    name: 'dexp(x, rate)',
                    description: 'PDF Esponenziale\n⚠️ rate = λ = 1/media',
                    example: 'dexp(2, rate=0.5)\n# λ=0.5 → media=1/0.5=2'
                },
                {
                    name: 'pexp(q, rate)',
                    description: 'CDF Esponenziale: P(X ≤ q)',
                    example: 'pexp(2, rate=0.5)'
                },
                {
                    name: 'qexp(p, rate)',
                    description: 'Quantile Esponenziale',
                    example: 'qexp(0.5, rate=0.5)'
                },
                {
                    name: 'dunif(x, min, max)',
                    description: 'PDF Uniforme',
                    example: 'dunif(0.5, min=0, max=1)  # = 1'
                },
                {
                    name: 'punif(q, min, max)',
                    description: 'CDF Uniforme',
                    example: 'punif(0.5, min=0, max=1)  # = 0.5'
                }
            ]
        },
        {
            id: 'test-statistici',
            title: 'Test Statistici',
            icon: <Code className="w-5 h-5" />,
            commands: [
                {
                    name: 't.test(x, conf.level)',
                    description: 'IC per la media',
                    example: 't.test(x, conf.level=0.95)\n# IC al 95% per μ'
                },
                {
                    name: 't.test(x, mu, alternative)',
                    description: 'Test ipotesi su media\nalternative: "two.sided", "greater", "less"',
                    example: 't.test(x, mu=0, alternative="two.sided")\n# H0: μ=0 vs H1: μ≠0'
                },
                {
                    name: 't.test(x, y, paired)',
                    description: 'Test differenza medie\n⚠️ paired=TRUE se campioni appaiati!',
                    example: 't.test(x, y, paired=FALSE)  # indipendenti\nt.test(x, y, paired=TRUE)   # appaiati'
                },
                {
                    name: 'binom.test(x, n, p, conf.level)',
                    description: 'IC per proporzioni (Binomiale)',
                    example: 'binom.test(30, 100, conf.level=0.95)\n# IC per p con 30 successi su 100'
                },
                {
                    name: 'prop.test(x, n, p, alternative)',
                    description: 'Test ipotesi su proporzioni',
                    example: 'prop.test(30, 100, p=0.5)\n# H0: p=0.5'
                },
                {
                    name: 'chisq.test(table)',
                    description: 'Test Chi-quadro per indipendenza/bontà del fit',
                    example: 'chisq.test(table(x, y))  # test indipendenza\nchisq.test(osservati, p=attesi)  # bontà fit'
                }
            ]
        },
        {
            id: 'visualizzazioni',
            title: 'Visualizzazioni',
            icon: <Code className="w-5 h-5" />,
            commands: [
                {
                    name: 'hist(x)',
                    description: 'Istogramma per dati quantitativi',
                    example: 'hist(x)\nhist(x, breaks=20, col="blue")'
                },
                {
                    name: 'plot(x, y)',
                    description: 'Scatter plot',
                    example: 'plot(x, y)\nplot(x, y, main="Titolo", xlab="X", ylab="Y")'
                },
                {
                    name: 'plot(density(x))',
                    description: 'Densità stimata',
                    example: 'plot(density(x))'
                },
                {
                    name: 'boxplot(x)',
                    description: 'Box plot (mostra outlier come pallini)',
                    example: 'boxplot(x, horizontal=TRUE)'
                },
                {
                    name: 'barplot(table(x))',
                    description: 'Grafico a barre per dati qualitativi',
                    example: 'barplot(table(x))\nbarplot(table(x), col="red")'
                }
            ]
        },
        {
            id: 'dataset',
            title: 'Lavorare con Dataset',
            icon: <Code className="w-5 h-5" />,
            commands: [
                {
                    name: 'data("nome")',
                    description: 'Carica un dataset predefinito',
                    example: 'data("babyboom")\nstr(babyboom)  # struttura del dataset'
                },
                {
                    name: 'dataset$colonna',
                    description: 'Accede a una colonna del dataset',
                    example: 'babyboom$wt  # colonna wt\nmean(babyboom$wt)'
                },
                {
                    name: 'dataset[, n]',
                    description: 'Accede all\'n-esima colonna',
                    example: 'babyboom[, 3]  # terza colonna'
                },
                {
                    name: 'dataset$col[indices]',
                    description: 'Filtra elementi specifici',
                    example: 'babyboom$wt[c(1,3,5)]  # elementi 1,3,5\nbabyboom$wt[babyboom$wt > 2000]  # filtro'
                },
                {
                    name: 'factor(x)',
                    description: 'Converte vettore in fattoriale',
                    example: 'fumo <- factor(c(0,1,1,2,0))\nlevels(fumo) <- c("No","A volte","Ex")'
                },
                {
                    name: 'table(x)',
                    description: 'Tabella di frequenze (fattoriali)',
                    example: 'table(fumo)\ntable(fumo)/length(fumo)  # proporzioni'
                },
                {
                    name: 'as.numeric(x)',
                    description: 'Converte fattoriale in numerico',
                    example: 'as.numeric(factor_var)'
                }
            ]
        }
    ];

    const formulas = [
        {
            id: 'probabilita-formule',
            title: 'Formule Probabilità',
            icon: <Calculator className="w-5 h-5" />,
            items: [
                { name: 'P(A ∪ B)', formula: 'P(A) + P(B) - P(A ∩ B)' },
                { name: 'P(A|B)', formula: 'P(A ∩ B) / P(B)' },
                { name: 'Bayes', formula: 'P(A|B) = P(B|A)×P(A) / P(B)' },
                { name: 'Indipendenza', formula: 'P(A ∩ B) = P(A) × P(B)' },
                { name: 'Prob. Totali', formula: 'P(B) = Σ P(B|Aᵢ)×P(Aᵢ)' }
            ]
        },
        {
            id: 'distribuzioni-discrete-formule',
            title: 'Distribuzioni Discrete',
            icon: <Calculator className="w-5 h-5" />,
            items: [
                { name: 'Bernoulli', formula: 'E[X] = p,  Var(X) = p(1-p)' },
                { name: 'Binomiale', formula: 'E[X] = np,  Var(X) = np(1-p)' },
                { name: 'Geometrica', formula: 'E[X] = 1/p,  Var(X) = (1-p)/p²' },
                { name: 'Poisson', formula: 'E[X] = λ,  Var(X) = λ' },
                { name: 'Ipergeometrica', formula: 'E[X] = n(C/N)' }
            ]
        },
        {
            id: 'distribuzioni-continue-formule',
            title: 'Distribuzioni Continue',
            icon: <Calculator className="w-5 h-5" />,
            items: [
                { name: 'Uniforme(a,b)', formula: 'E[X] = (a+b)/2,  Var(X) = (b-a)²/12' },
                { name: 'Esponenziale(λ)', formula: 'E[X] = 1/λ,  Var(X) = 1/λ²' },
                { name: 'Normale(μ,σ²)', formula: 'E[X] = μ,  Var(X) = σ²' },
                { name: 'Standardizzazione', formula: 'Z = (X-μ)/σ → N(0,1)' }
            ]
        },
        {
            id: 'statistica-formule',
            title: 'Statistica',
            icon: <Calculator className="w-5 h-5" />,
            items: [
                { name: 'Media', formula: 'x̄ = Σxᵢ / n' },
                { name: 'Varianza', formula: 's² = Σ(xᵢ-x̄)² / (n-1)' },
                { name: 'Dev. Standard', formula: 's = √s²' },
                { name: 'CV', formula: 'CV = s/x̄' },
                { name: 'Z-score', formula: 'z = (x-x̄)/s' },
                { name: 'Skewness', formula: '(1/n)Σzᵢ³' }
            ]
        },
        {
            id: 'inferenza-formule',
            title: 'Inferenza',
            icon: <Calculator className="w-5 h-5" />,
            items: [
                { name: 'E[x̄]', formula: 'μ' },
                { name: 'Var(x̄)', formula: 'σ²/n' },
                { name: 'TLC (n≥30)', formula: '(x̄-μ)/(s/√n) ~ N(0,1)' },
                { name: 'T statistic', formula: 't = (x̄-μ₀)/(s/√n)' }
            ]
        }
    ];

    const filterContent = (items, searchTerm) => {
        if (!searchTerm) return items;
        const lower = searchTerm.toLowerCase();
        return items.filter(item =>
            item.title?.toLowerCase().includes(lower) ||
            item.name?.toLowerCase().includes(lower) ||
            item.description?.toLowerCase().includes(lower) ||
            JSON.stringify(item.content || '').toLowerCase().includes(lower) ||
            JSON.stringify(item.subsections || []).toLowerCase().includes(lower) ||
            JSON.stringify(item.commands || []).toLowerCase().includes(lower)
        );
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-lg shadow-lg mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="w-10 h-10" />
                    <h1 className="text-3xl font-bold">Materiali di Studio EPS</h1>
                </div>
                <p className="text-purple-100">
                    Riassunti di teoria, formule e comandi R per ripassare e studiare
                </p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Cerca nei materiali..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b-2 border-gray-200">
                <button
                    onClick={() => setActiveTab('teoria')}
                    className={`px-6 py-3 font-semibold transition-all ${
                        activeTab === 'teoria'
                            ? 'border-b-4 border-purple-600 text-purple-600'
                            : 'text-gray-600 hover:text-purple-600'
                    }`}
                >
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Teoria
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('r-commands')}
                    className={`px-6 py-3 font-semibold transition-all ${
                        activeTab === 'r-commands'
                            ? 'border-b-4 border-purple-600 text-purple-600'
                            : 'text-gray-600 hover:text-purple-600'
                    }`}
                >
                    <div className="flex items-center gap-2">
                        <Code className="w-5 h-5" />
                        Comandi R
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('formulas')}
                    className={`px-6 py-3 font-semibold transition-all ${
                        activeTab === 'formulas'
                            ? 'border-b-4 border-purple-600 text-purple-600'
                            : 'text-gray-600 hover:text-purple-600'
                    }`}
                >
                    <div className="flex items-center gap-2">
                        <Calculator className="w-5 h-5" />
                        Formulario
                    </div>
                </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
                {/* Theory Tab */}
                {activeTab === 'teoria' && filterContent(theoryContent, searchTerm).map((section) => (
                    <div key={section.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-purple-600">{section.icon}</div>
                                <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
                            </div>
                            {activeSection === section.id ? (
                                <ChevronDown className="w-5 h-5 text-gray-600" />
                            ) : (
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            )}
                        </button>

                        {activeSection === section.id && (
                            <div className="p-4 bg-gray-50 border-t border-gray-200">
                                {section.subsections.map((sub, idx) => (
                                    <div key={idx} className="mb-6 last:mb-0">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                            {sub.title}
                                        </h3>
                                        <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line bg-white p-4 rounded-lg border border-gray-200">
                                            {sub.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {/* R Commands Tab */}
                {activeTab === 'r-commands' && filterContent(rCommands, searchTerm).map((section) => (
                    <div key={section.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-indigo-600">{section.icon}</div>
                                <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
                            </div>
                            {activeSection === section.id ? (
                                <ChevronDown className="w-5 h-5 text-gray-600" />
                            ) : (
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            )}
                        </button>

                        {activeSection === section.id && (
                            <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-4">
                                {section.commands.map((cmd, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200">
                                        <div className="flex items-start gap-3">
                                            <Code className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                                            <div className="flex-1">
                                                <code className="text-lg font-mono font-semibold text-indigo-600">
                                                    {cmd.name}
                                                </code>
                                                <p className="text-gray-700 mt-2 whitespace-pre-line">{cmd.description}</p>
                                                {cmd.example && (
                                                    <div className="mt-3 bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm overflow-x-auto">
                                                        {cmd.example}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {/* Formulas Tab */}
                {activeTab === 'formulas' && filterContent(formulas, searchTerm).map((section) => (
                    <div key={section.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-green-600">{section.icon}</div>
                                <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
                            </div>
                            {activeSection === section.id ? (
                                <ChevronDown className="w-5 h-5 text-gray-600" />
                            ) : (
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            )}
                        </button>

                        {activeSection === section.id && (
                            <div className="p-4 bg-gray-50 border-t border-gray-200">
                                <div className="grid gap-3">
                                    {section.items.map((item, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
                                            <span className="font-semibold text-gray-800">{item.name}</span>
                                            <code className="text-green-600 font-mono bg-green-50 px-3 py-1 rounded">
                                                {item.formula}
                                            </code>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* No results */}
            {searchTerm && (
                (activeTab === 'teoria' && filterContent(theoryContent, searchTerm).length === 0) ||
                (activeTab === 'r-commands' && filterContent(rCommands, searchTerm).length === 0) ||
                (activeTab === 'formulas' && filterContent(formulas, searchTerm).length === 0)
            ) && (
                <div className="text-center py-12 text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Nessun risultato trovato per "{searchTerm}"</p>
                </div>
            )}
        </div>
    );
};

export default StudyMaterials;