export const categories = [
    {
        id: 'quiz',
        title: 'Quiz di Pratica',
        description: 'Quiz per esercitarti sui vari argomenti del corso',
        color: 'bg-gradient-to-br from-green-400 to-green-600',
        items: [
            {
                id: 'eps-quiz',
                name: 'Quiz EPS Generale',
                description: '10 domande su probabilità, statistica, R e teoria',
                component: 'EPSQuizApp',
                topics: ['Probabilità', 'Statistica', 'R Programming', 'Teoria']
            },
            {
                id: 'quiz-esami-reali',
                name: 'Quiz da Esami Reali ⭐',
                description: '10 domande avanzate da esami Feb 2021 e Lug 2025',
                component: 'QuizEsameReale',
                topics: ['Esponenziale Avanzato', 'Test Ipotesi', 'Probabilità Condizionata', 'Sistemi']
            },
            {
                id: 'quiz-teorico-avanzato',
                name: 'Quiz Teorico Avanzato 🆕',
                description: '12 domande approfondite su teoria, distribuzioni e statistica',
                component: 'QuizTeoricoAvanzato',
                topics: ['Teoria Distribuzioni', 'Test Ipotesi', 'TLC', 'Correlazione', 'Chi-quadrato']
            },
            {
                id: 'quiz-dalle-immagini',
                name: 'Esercizi da Esami Interattivi 🆕',
                description: '4 esercizi completi con codice R e spiegazioni dettagliate',
                component: 'QuizDalleImmagini',
                topics: ['Analisi Dataset', 'Poisson', 'Normale', 'Probabilità Condizionata']
            },
            {
                id: 'quiz-chi-quadro',
                name: 'Quiz Test Chi-quadro 🆕',
                description: '8 domande su test indipendenza, bontà del fit e applicazioni',
                component: 'QuizChiQuadro',
                topics: ['Test Indipendenza', 'Bontà del Fit', 'Cochran', 'Fisher']
            },
            {
                id: 'quiz-distribuzioni-continue',
                name: 'Quiz Distribuzioni Continue 🆕',
                description: '8 domande su Normale ed Esponenziale con R',
                component: 'QuizDistribuzioniContinue',
                topics: ['Normale', 'Esponenziale', 'pnorm', 'qnorm', 'Standardizzazione']
            },
            {
                id: 'quiz-distribuzioni-discrete',
                name: 'Quiz Distribuzioni Discrete 🆕',
                description: '8 domande su Poisson, Binomiale, Geometrica e Ipergeometrica',
                component: 'QuizDistribuzioniDiscrete',
                topics: ['Poisson', 'Binomiale', 'Geometrica', 'Ipergeometrica', 'Approssimazioni']
            },
            {
                id: 'quiz-test-ipotesi',
                name: 'Quiz Test di Ipotesi 🆕',
                description: '8 domande su t-test, ANOVA, proporzioni ed errori Tipo I/II',
                component: 'QuizTestIpotesi',
                topics: ['t-test', 'ANOVA', 'Proporzioni', 'P-value', 'Errori', 'IC']
            },
            {
                id: 'quiz-errori-comuni',
                name: 'Quiz Errori Comuni e Trabocchetti 🆕⚠️',
                description: '10 domande sui più frequenti errori: rate/mean, paired, alternative, sd/varianza, offset',
                component: 'QuizErroriComuni',
                topics: ['Esponenziale rate', 'paired TRUE/FALSE', 'alternative', 'pnorm sd', 'Geometrica offset', 'P-value', 'Accettare H0', 'Correlazione≠Causalità', 'Confronti multipli', 'IC vs IP']
            },
            {
                id: 'simulatore-r',
                name: 'Simulatore R Interattivo 🔬',
                description: '15 esercizi guidati di R da esami reali con console interattiva',
                component: 'SimulatoreR',
                topics: ['Caricamento Dati', 'Statistiche', 'Test t', 'Regressione', 'Proporzioni']
            },
            {
                id: 'quiz-script-gennaio-2021',
                name: 'Quiz da Script R - Gennaio 2021 🆕',
                description: '6 esercizi avanzati con codice R: Poisson, Esponenziale, Ipergeometrica, Normale, Binomiale',
                component: 'QuizScriptGennaio2021',
                topics: ['Probabilità Totale', 'Bayes', 'Esponenziale+Binomiale', 'Ipergeometrica', 'Normale']
            },
            {
                id: 'quiz-script-febbraio',
                name: 'Quiz da Script R - Febbraio 🆕',
                description: '4 esercizi: QI/Normale, WiFi/Bayes, Geometrica, Tabelle contingenza',
                component: 'QuizScriptFebbraio',
                topics: ['Normale+Binomiale', 'Bayes', 'Geometrica', 'Tabelle 2×2']
            }
        ]
    },
    {
        id: 'simulatori',
        title: 'Simulatori Esami',
        description: 'Simulazioni complete di esami reali con timer',
        color: 'bg-gradient-to-br from-blue-400 to-blue-600',
        items: [
            {
                id: 'esame-gennaio',
                name: 'Simulazione Esame Completo',
                description: '20 minuti - 4 parti - 20 punti totali',
                component: 'EPSExamSimulator',
                topics: ['Analisi Descrittiva', 'Test di Ipotesi', 'Probabilità', 'Teoria']
            },
            {
                id: 'esame-18feb',
                name: 'Esame 18 Febbraio 2021',
                description: 'Quiz basato sull\'esame del 18 Febbraio 2021',
                component: 'Quiz18Feb',
                topics: ['Geometrica', 'Esponenziale', 'Test t Appaiato', 'R Programming'],
                rScript: '/r-scripts/esame18Febbraio21.r',
                rScriptName: 'esame18Febbraio21.r'
            },
            {
                id: 'esame-gennaio-2025',
                name: 'Esame 29 Gennaio 2025 - Turno 1 ⭐',
                description: '5 domande da esame reale - Chi-quadro, Normale, Poisson, Test t',
                component: 'QuizGennaio2025',
                topics: ['Chi-quadro Indipendenza', 'Normale Condizionata', 'Poisson', 'Test Appaiato']
            },
            {
                id: 'esame-gennaio-2025-turno2',
                name: 'Esame 29 Gennaio 2025 - Turno 2 🆕',
                description: '5 domande - Fertilizzante/Test t, Esponenziale, Probabilità, Alberi, Teoria',
                component: 'QuizGennaio2025Turno2',
                topics: ['Test t Bilaterale', 'Esponenziale', 'Eventi', 'Correlazione', 'CDF']
            },
            {
                id: 'esame-febbraio-2025',
                name: 'Esame 12 Febbraio 2025 ⭐ NUOVO',
                description: '5 domande da esame reale - Normale, Poisson, Chi-quadro, Proporzioni',
                component: 'QuizFebbraio2025',
                topics: ['Normale', 'Poisson Condizionata', 'Bontà del Fit', 'P-value']
            },
            {
                id: 'esame-luglio-2025',
                name: 'Esame 11 Luglio 2025 - VN e T ⭐',
                description: '5 domande da esame reale - Probabilità classica, Esponenziale, Proporzioni',
                component: 'QuizLuglio2025',
                topics: ['Probabilità Classica', 'Esponenziale', 'Test Proporzioni', 'Teoria']
            },
            {
                id: 'esame-luglio-2025-turno10',
                name: 'Esame 11 Luglio 2025 - Turno 10 (9cfu) 🆕',
                description: '5 domande - Fito/Correlazione, Urne/Binomiale, Normale, Esponenziale, Escursioni',
                component: 'QuizLuglio2025Turno10',
                topics: ['Regressione', 'Binomiale', 'Prob. Condizionata', 'Riconoscimento Distrib', 'Test Proporzioni']
            },
            {
                id: 'esame-gennaio-2025-turno4',
                name: 'Esame 29 Gennaio 2025 - Turno 4 🆕',
                description: '6 domande - Bosco/Test t Appaiato, Probabilità, t Student, Esponenziale',
                component: 'QuizGennaio2025Turno4',
                topics: ['Test t Appaiato', 'P-value', 'Probabilità Classica', 't di Student', 'Esponenziale Condizionata']
            },
            {
                id: 'esame-luglio-2024',
                name: 'Esame 12 Luglio 2024 - Turno 1 🆕',
                description: '4 domande - Barplot, Moneta/Probabilità, Normale+Esponenziale, Trazione/Test t',
                component: 'QuizLuglio2024',
                topics: ['Visualizzazioni R', 'Probabilità Classica', 'Indipendenza', 'Test t Indipendenti']
            },
            {
                id: 'esame-giugno-2024',
                name: 'Esame 20 Giugno 2024 - Turno 1 🆕',
                description: '4 domande - Compressione/Test t Appaiato, Urne/Binomiale, Teoria, Esponenziale',
                component: 'QuizGiugno2024',
                topics: ['Test t Appaiato', 'Somma VA', 'Teoria Binomiale', 'Esponenziale Condizionata']
            },
            {
                id: 'esame-gennaio-2026-turno1',
                name: 'Esame 16 Gennaio 2026 - Turno 1 🆕⭐',
                description: '5 domande - attivita/Chi-quadro, Normale VA indipendenti, Teoria, streaming/Test t, Binomiale',
                component: 'QuizGennaio2026Turno1',
                topics: ['Chi-quadro Bontà Fit', 'Normale i.i.d.', 'Test Ipotesi', 'Test t Indipendenti', 'Binomiale']
            },
            {
                id: 'esame-gennaio-2026-turno2',
                name: 'Esame 16 Gennaio 2026 - Turno 2 🆕⭐',
                description: '5 domande - Moneta/Probabilità, Teoria Varianza, allenamento/Regressione, Esponenziale, consumo/Proporzioni',
                component: 'QuizGennaio2026Turno2',
                topics: ['Probabilità Classica', 'Teoria Varianza', 'Regressione Lineare', 'Esponenziale Memoryless', 'Test Proporzioni']
            },
            {
                id: 'esame-febbraio-2026-turno2',
                name: 'Esame 6 Febbraio 2026 - Turno 2 🆕⭐',
                description: '4 domande - Corsi/Bayes, Parcheggi/Test Proporzioni, Esponenziale Memoryless, Teoria IC',
                component: 'QuizFebbraio2026Turno2',
                topics: ['Probabilità Totali', 'Bayes', 'Test Proporzioni', 'Esponenziale', 'Teoria IC'],
                rScript: '/input/rData/parcheggi.RData',
                rScriptName: 'parcheggi.RData'
            }
        ]
    },
    {
        id: 'materiali',
        title: 'Materiali di Studio',
        description: 'Riassunti di teoria, formule e comandi R per ripassare',
        color: 'bg-gradient-to-br from-purple-400 to-indigo-600',
        items: [
            {
                id: 'study-materials',
                name: 'Materiali di Studio Completi',
                description: 'Teoria, formule e comandi R organizzati per argomento',
                component: 'StudyMaterials',
                topics: ['Probabilità', 'VA Discrete', 'VA Continue', 'Statistica', 'IC', 'Test Ipotesi', 'Comandi R']
            }
        ]
    }
];
