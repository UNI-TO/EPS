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
                id: 'simulatore-r',
                name: 'Simulatore R Interattivo 🔬',
                description: '15 esercizi guidati di R da esami reali con console interattiva',
                component: 'SimulatoreR',
                topics: ['Caricamento Dati', 'Statistiche', 'Test t', 'Regressione', 'Proporzioni']
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
                name: 'Esame 29 Gennaio 2025 ⭐ NUOVO',
                description: '5 domande da esame reale - Chi-quadro, Normale, Poisson, Test t',
                component: 'QuizGennaio2025',
                topics: ['Chi-quadro Indipendenza', 'Normale Condizionata', 'Poisson', 'Test Appaiato']
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
                name: 'Esame 11 Luglio 2025 ⭐ NUOVO',
                description: '5 domande da esame reale - Probabilità classica, Esponenziale, Proporzioni',
                component: 'QuizLuglio2025',
                topics: ['Probabilità Classica', 'Esponenziale', 'Test Proporzioni', 'Teoria']
            }
        ]
    }
];
