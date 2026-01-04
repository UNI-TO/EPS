# ═══════════════════════════════════════════════════════════════════
# GUIDA R PER ESAME EPS - SCRIPT COMPLETI E PRONTI ALL'USO
# ═══════════════════════════════════════════════════════════════════
# Autore: Assistente Claude
# Uso: Copia e adatta questi script durante l'esame
# Tempo disponibile: 15-20 minuti per esercizio
# ═══════════════════════════════════════════════════════════════════

# ═══════════════════════════════════════════════════════════════════
# 1. CARICAMENTO E PREPARAZIONE DATI
# ═══════════════════════════════════════════════════════════════════

## 1.1 Caricare il file data.csv (metodo standard dell'esame)
# IMPORTANTE: Segui sempre le istruzioni dell'esame per il percorso
dati <- read.csv("data.csv")

## 1.2 Visualizzare le prime righe
head(dati)

## 1.3 Struttura del dataframe
str(dati)

## 1.4 Sommario statistico completo
summary(dati)

# ═══════════════════════════════════════════════════════════════════
# 2. FILTRAGGIO E SELEZIONE DATI
# ═══════════════════════════════════════════════════════════════════

## 2.1 Escludere osservazioni di un gruppo specifico
# Esempio: Escludere tutte le osservazioni del gruppo A
dati_filtrati <- dati[dati$gruppo != "A", ]

## 2.2 Selezionare solo un gruppo specifico
dati_gruppo_C <- dati[dati$gruppo == "C", ]

## 2.3 Filtrare valori numerici
dati_sopra_100 <- dati[dati$var > 100, ]

## 2.4 Filtrare con più condizioni (AND)
dati_multi <- dati[dati$gruppo == "B" & dati$var > 150, ]

## 2.5 Filtrare con più condizioni (OR)
dati_multi2 <- dati[dati$gruppo == "A" | dati$gruppo == "C", ]

# ═══════════════════════════════════════════════════════════════════
# 3. STATISTICA DESCRITTIVA
# ═══════════════════════════════════════════════════════════════════

## 3.1 Misure di posizione centrale
media <- mean(dati$var)                    # Media
mediana <- median(dati$var)                # Mediana
moda <- as.numeric(names(sort(table(dati$var), decreasing = TRUE)[1]))  # Moda

## 3.2 Misure di dispersione
varianza <- var(dati$var)                  # Varianza campionaria
dev_std <- sd(dati$var)                    # Deviazione standard
range <- max(dati$var) - min(dati$var)     # Range
IQR_val <- IQR(dati$var)                   # Range interquartile

## 3.3 Percentili e quantili
# Calcolare il 55° percentile (come negli esami)
percentile_55 <- quantile(dati$var, 0.55)

# Quartili (Q1, Q2=mediana, Q3)
quartili <- quantile(dati$var, probs = c(0.25, 0.50, 0.75))
Q1 <- quartili[1]
Q2 <- quartili[2]  # = mediana
Q3 <- quartili[3]

## 3.4 Identificare outlier con il metodo IQR (Tukey)
IQR_val <- IQR(dati$var)
limite_inf <- Q1 - 1.5 * IQR_val
limite_sup <- Q3 + 1.5 * IQR_val

# Verificare se un valore specifico è outlier
valore_test <- 476.8
if (valore_test < limite_inf | valore_test > limite_sup) {
  print("Il valore è un outlier")
} else {
  print("Il valore NON è un outlier")
}

# Trovare tutti gli outlier
outliers <- dati$var[dati$var < limite_inf | dati$var > limite_sup]

## 3.5 Calcolare percentuali per gruppi
# Esempio: Percentuale di osservazioni nel gruppo C
totale <- nrow(dati)
n_gruppo_C <- sum(dati$gruppo == "C")
percentuale_C <- (n_gruppo_C / totale) * 100

# ═══════════════════════════════════════════════════════════════════
# 4. VISUALIZZAZIONI GRAFICHE
# ═══════════════════════════════════════════════════════════════════

## 4.1 Istogramma
hist(dati$var,
     main = "Distribuzione della variabile var",
     xlab = "Valori",
     ylab = "Frequenza",
     col = "lightblue",
     breaks = 20)

## 4.2 Boxplot
boxplot(dati$var,
        main = "Boxplot di var",
        ylab = "Valori",
        col = "lightgreen")

## 4.3 Boxplot per gruppo
boxplot(var ~ gruppo, data = dati,
        main = "Confronto tra gruppi",
        xlab = "Gruppo",
        ylab = "Valori",
        col = c("red", "blue", "green"))

## 4.4 Scatterplot (per due variabili numeriche)
# Se hai due variabili quantitative
plot(dati$var1, dati$var2,
     main = "Scatterplot",
     xlab = "Variabile 1",
     ylab = "Variabile 2",
     pch = 19,
     col = "blue")

## 4.5 Q-Q plot (per verificare normalità)
qqnorm(dati$var)
qqline(dati$var, col = "red")

# ═══════════════════════════════════════════════════════════════════
# 5. TEST DI IPOTESI - UN CAMPIONE
# ═══════════════════════════════════════════════════════════════════

## 5.1 Test t per la media (H0: μ = μ0)
# Esempio: verificare se la media è diversa da 140
test_t <- t.test(dati$var, mu = 140, alternative = "two.sided")
test_t
p_value <- test_t$p.value

# Interpretazione con α = 0.05
if (p_value < 0.05) {
  print("Rifiuto H0: evidenza sufficiente per dire che μ ≠ 140")
} else {
  print("Non rifiuto H0: non c'è evidenza sufficiente")
}

## 5.2 Test t unilaterale (H1: μ > μ0)
test_t_greater <- t.test(dati$var, mu = 140, alternative = "greater")

## 5.3 Test t unilaterale (H1: μ < μ0)
test_t_less <- t.test(dati$var, mu = 140, alternative = "less")

## 5.4 Test per la proporzione
# Esempio: 60 successi su 100 prove, H0: p = 0.5
prop.test(60, 100, p = 0.5, alternative = "two.sided")

# ═══════════════════════════════════════════════════════════════════
# 6. TEST DI IPOTESI - DUE CAMPIONI
# ═══════════════════════════════════════════════════════════════════

## 6.1 Test t per confrontare medie di due gruppi indipendenti
# Esempio: confrontare media gruppo B vs gruppo C
gruppo_B <- dati$var[dati$gruppo == "B"]
gruppo_C <- dati$var[dati$gruppo == "C"]

# Test assumendo varianze uguali
t.test(gruppo_B, gruppo_C, var.equal = TRUE)

# Test NON assumendo varianze uguali (più conservativo - Welch)
t.test(gruppo_B, gruppo_C, var.equal = FALSE)

## 6.2 Test per dati appaiati (paired t-test)
# Esempio: misurazioni pre e post trattamento
# t.test(dati$pre, dati$post, paired = TRUE)

## 6.3 Test per confrontare due proporzioni
# Esempio: 30/100 nel gruppo A vs 50/120 nel gruppo B
prop.test(c(30, 50), c(100, 120))

# ═══════════════════════════════════════════════════════════════════
# 7. TEST DI NORMALITÀ
# ═══════════════════════════════════════════════════════════════════

## 7.1 Test di Shapiro-Wilk (il più usato)
shapiro.test(dati$var)
# H0: i dati seguono una distribuzione normale
# Se p-value < 0.05 → rifiuto H0 → dati NON normali

## 7.2 Test di Kolmogorov-Smirnov
# Richiede specificare media e sd della normale teorica
ks.test(dati$var, "pnorm", mean = mean(dati$var), sd = sd(dati$var))

## 7.3 Verifica visiva con Q-Q plot (già visto sopra)
qqnorm(dati$var)
qqline(dati$var, col = "red")

# ═══════════════════════════════════════════════════════════════════
# 8. TEST CHI-QUADRATO
# ═══════════════════════════════════════════════════════════════════

## 8.1 Test Chi-quadrato per bontà del fit
# Verificare se i dati osservati seguono una distribuzione teorica
osservati <- c(25, 30, 20, 25)  # Frequenze osservate
attesi <- c(25, 25, 25, 25)      # Frequenze attese sotto H0
chisq.test(osservati, p = attesi/sum(attesi))

## 8.2 Test Chi-quadrato per indipendenza
# Verificare se due variabili categoriali sono indipendenti
# Esempio: tabella di contingenza
tabella <- table(dati$gruppo, dati$categoria)
chisq.test(tabella)

# ═══════════════════════════════════════════════════════════════════
# 9. REGRESSIONE LINEARE
# ═══════════════════════════════════════════════════════════════════

## 9.1 Regressione lineare semplice (Y ~ X)
# Esempio: predire 'var' da 'var2'
modello <- lm(var ~ var2, data = dati)
summary(modello)

## 9.2 Estrarre coefficienti
coefficienti <- coef(modello)
intercetta <- coefficienti[1]
pendenza <- coefficienti[2]

## 9.3 Coefficiente di correlazione di Pearson
cor(dati$var, dati$var2)

## 9.4 Test di significatività per la correlazione
cor.test(dati$var, dati$var2)

## 9.5 Grafico con retta di regressione
plot(dati$var2, dati$var, pch = 19, col = "blue")
abline(modello, col = "red", lwd = 2)

## 9.6 Residui del modello
residui <- residuals(modello)
plot(residui)  # Verificare omoschedasticità
qqnorm(residui)  # Verificare normalità dei residui
qqline(residui, col = "red")

# ═══════════════════════════════════════════════════════════════════
# 10. DISTRIBUZIONI DI PROBABILITÀ
# ═══════════════════════════════════════════════════════════════════

## 10.1 Distribuzione Normale
# P(X ≤ x) per X ~ N(μ, σ²)
pnorm(150, mean = 140, sd = 20)  # Prob che X ≤ 150

# P(X > x)
1 - pnorm(150, mean = 140, sd = 20)

# Quantile: trovare x tale che P(X ≤ x) = 0.95
qnorm(0.95, mean = 140, sd = 20)

## 10.2 Distribuzione Esponenziale
# X ~ Exp(λ), dove λ = 1/media
lambda <- 1/320  # Se media = 320

# P(X > 530)
1 - pexp(530, rate = lambda)
# oppure equivalentemente:
pexp(530, rate = lambda, lower.tail = FALSE)

# P(X ≤ 200)
pexp(200, rate = lambda)

## 10.3 Distribuzione Binomiale
# X ~ Bin(n, p)
# P(X = k) successi in n prove con probabilità p
dbinom(5, size = 10, prob = 0.5)  # Esattamente 5 successi su 10

# P(X ≤ k)
pbinom(5, size = 10, prob = 0.5)

## 10.4 Distribuzione di Poisson
# X ~ Poisson(λ)
# P(X = k)
dpois(3, lambda = 2)

# P(X ≤ k)
ppois(3, lambda = 2)

## 10.5 Distribuzione t di Student
# Utile per test t e intervalli di confidenza
# P(T ≤ t) con df gradi di libertà
pt(2, df = 10)

# Quantile: valore critico per α = 0.05, df = 10
qt(0.975, df = 10)  # Per test bilaterale

## 10.6 Distribuzione Chi-quadrato
# P(χ² ≤ x) con df gradi di libertà
pchisq(5, df = 3)

# Quantile
qchisq(0.95, df = 3)

# ═══════════════════════════════════════════════════════════════════
# 11. INTERVALLI DI CONFIDENZA
# ═══════════════════════════════════════════════════════════════════

## 11.1 IC per la media (σ incognita, uso t di Student)
# Già incluso nell'output di t.test
t.test(dati$var)$conf.int

# Manualmente:
n <- length(dati$var)
media <- mean(dati$var)
s <- sd(dati$var)
errore_std <- s / sqrt(n)
t_critico <- qt(0.975, df = n-1)  # Per IC al 95%
IC_inf <- media - t_critico * errore_std
IC_sup <- media + t_critico * errore_std
c(IC_inf, IC_sup)

## 11.2 IC per una proporzione
prop.test(60, 100)$conf.int

# ═══════════════════════════════════════════════════════════════════
# 12. TRUCCHI E SUGGERIMENTI PER L'ESAME
# ═══════════════════════════════════════════════════════════════════

## 12.1 Arrotondare i risultati (4 cifre decimali)
round(risultato, 4)

## 12.2 Salvare risultati per domande successive
media_var <- mean(dati$var)
mediana_var <- median(dati$var)

## 12.3 Verificare quante osservazioni soddisfano una condizione
sum(dati$var > 150)  # Numero di valori > 150
sum(dati$gruppo == "C")  # Numero di osservazioni nel gruppo C

## 12.4 Estrarre p-value da un test
test_risultato <- t.test(dati$var, mu = 140)
p_val <- test_risultato$p.value
round(p_val, 4)

## 12.5 Creare nuove variabili
dati$var_log <- log(dati$var)
dati$var_quadrato <- dati$var^2

## 12.6 Gestire valori mancanti (NA)
# Rimuovere NA prima di calcolare
mean(dati$var, na.rm = TRUE)
median(dati$var, na.rm = TRUE)

## 12.7 Tabelle di frequenza
table(dati$gruppo)  # Frequenze assolute
prop.table(table(dati$gruppo))  # Frequenze relative

## 12.8 Aggregare per gruppo
aggregate(var ~ gruppo, data = dati, FUN = mean)
aggregate(var ~ gruppo, data = dati, FUN = median)

# ═══════════════════════════════════════════════════════════════════
# 13. CHECKLIST RAPIDA PER L'ESAME (20 MINUTI)
# ═══════════════════════════════════════════════════════════════════

# [✓] 1. Caricare dati: read.csv("data.csv")
# [✓] 2. Esplorare: head(), str(), summary()
# [✓] 3. Filtrare se richiesto: dati[condizione, ]
# [✓] 4. Calcolare statistiche: mean(), median(), quantile(), IQR()
# [✓] 5. Verificare outlier: Q1 - 1.5*IQR, Q3 + 1.5*IQR
# [✓] 6. Test di ipotesi: t.test(), prop.test(), chisq.test()
# [✓] 7. Estrarre p-value: test$p.value
# [✓] 8. Interpretare: se p < α → rifiuto H0
# [✓] 9. Arrotondare: round(risultato, 4)
# [✓] 10. Ricontrollare tutte le risposte!

# ═══════════════════════════════════════════════════════════════════
# FORMULE RAPIDE DA RICORDARE
# ═══════════════════════════════════════════════════════════════════

# Outlier (Tukey): valore < Q1 - 1.5×IQR  o  valore > Q3 + 1.5×IQR
# IQR = Q3 - Q1

# Test ipotesi:
#   - Se p-value < α (es. 0.05) → Rifiuto H0
#   - Se p-value ≥ α → Non rifiuto H0

# Distribuzione Esponenziale:
#   - E[X] = 1/λ  →  se media = 320, allora λ = 1/320
#   - P(X > t) = e^(-λt) = exp(-t/media)

# Teorema Limite Centrale: X̄ ~ N(μ, σ²/n) per n grande

# Correlazione di Pearson: r ∈ [-1, 1]
#   - r > 0: correlazione positiva
#   - r < 0: correlazione negativa
#   - |r| vicino a 1: forte correlazione

# ═══════════════════════════════════════════════════════════════════
# FINE DELLA GUIDA
# ═══════════════════════════════════════════════════════════════════
# Buona fortuna con l'esame! 🍀
# Ricorda: mantieni la calma, leggi bene le domande e controlla i risultati
# ═══════════════════════════════════════════════════════════════════