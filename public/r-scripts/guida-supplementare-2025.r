# ═══════════════════════════════════════════════════════════════════
# GUIDA R SUPPLEMENTARE 2025 - ARGOMENTI AVANZATI
# ═══════════════════════════════════════════════════════════════════
# Complemento alla guida principale con nuovi argomenti
# ═══════════════════════════════════════════════════════════════════


# ═══════════════════════════════════════════════════════════════════
# 1. LAVORARE CON I DATI: MANIPOLAZIONE AVANZATA
# ═══════════════════════════════════════════════════════════════════

## 1.1 Creazione dataframe da zero
studenti <- data.frame(
  nome = c("Alice", "Bob", "Carlo", "Diana"),
  voto = c(28, 24, 30, 26),
  anno = c(2, 1, 3, 2),
  corso = c("Informatica", "Matematica", "Informatica", "Fisica")
)

## 1.2 Aggiungere colonne
studenti$lode <- studenti$voto == 30
studenti$valutazione <- ifelse(studenti$voto >= 27, "Ottimo",
                                ifelse(studenti$voto >= 24, "Buono", "Sufficiente"))

## 1.3 Subset avanzato
# Solo informatici con voto ≥ 25
info_bravi <- subset(studenti, corso == "Informatica" & voto >= 25)

# Escludere colonne
studenti_no_anno <- studenti[, -3]  # Rimuove colonna 3

# Selezionare colonne per nome
solo_voti <- studenti[, c("nome", "voto")]

## 1.4 Ordinare dataframe
# Per voto decrescente
studenti_ord <- studenti[order(-studenti$voto), ]

# Per corso (alfabetico) poi voto (decrescente)
studenti_ord2 <- studenti[order(studenti$corso, -studenti$voto), ]

## 1.5 Riassumere per gruppo con aggregate
medie_per_corso <- aggregate(voto ~ corso, data = studenti, FUN = mean)
max_per_anno <- aggregate(voto ~ anno, data = studenti, FUN = max)

# Funzione custom
statistiche <- aggregate(voto ~ corso, data = studenti,
                        FUN = function(x) c(media = mean(x),
                                           mediana = median(x),
                                           sd = sd(x)))

## 1.6 Merge di dataframe
esami <- data.frame(
  nome = c("Alice", "Bob", "Elena"),
  esame = c("EPS", "EPS", "Algoritmi"),
  voto_esame = c(28, 24, 29)
)

# Join (inner join: solo nomi in comune)
merged <- merge(studenti, esami, by = "nome")

# Left join (tutti da studenti)
merged_left <- merge(studenti, esami, by = "nome", all.x = TRUE)


# ═══════════════════════════════════════════════════════════════════
# 2. GRAFICI AVANZATI CON BASE R
# ═══════════════════════════════════════════════════════════════════

## 2.1 Layout multipli
par(mfrow = c(2, 2))  # 2 righe, 2 colonne

hist(rnorm(1000), col = "lightblue", main = "Normale")
hist(rexp(1000), col = "lightgreen", main = "Esponenziale")
hist(rpois(1000, 5), col = "pink", main = "Poisson")
hist(runif(1000), col = "yellow", main = "Uniforme")

par(mfrow = c(1, 1))  # Ripristina

## 2.2 Personalizzazione grafica avanzata
x <- rnorm(100)
y <- 2*x + rnorm(100, 0, 0.5)

plot(x, y,
     main = "Scatterplot Personalizzato",
     xlab = "Variabile X",
     ylab = "Variabile Y",
     pch = 19,                    # Punti pieni
     col = "darkblue",
     cex = 1.5,                   # Dimensione punti
     xlim = c(-3, 3),
     ylim = c(-6, 6),
     las = 1,                     # Etichette assi orizzontali
     frame.plot = FALSE)          # Senza box

# Aggiungi elementi
abline(lm(y ~ x), col = "red", lwd = 2)
abline(h = 0, lty = 2, col = "gray")
abline(v = 0, lty = 2, col = "gray")
grid()

# Legenda
legend("topleft",
       c("Dati", "Regressione"),
       col = c("darkblue", "red"),
       pch = c(19, NA),
       lty = c(NA, 1),
       lwd = c(NA, 2))

# Testo custom
text(1, 4, "Outlier?", col = "red", cex = 0.8)

## 2.3 Grafico a torta (pie chart)
frequenze <- c(30, 25, 20, 15, 10)
nomi <- c("A", "B", "C", "D", "E")

pie(frequenze,
    labels = nomi,
    col = rainbow(5),
    main = "Distribuzione Categorie")

# Percentuali
percentuali <- round(frequenze/sum(frequenze) * 100, 1)
etichette <- paste(nomi, percentuali, "%", sep = " ")
pie(frequenze, labels = etichette, col = rainbow(5))

## 2.4 Barplot avanzato
# Barplot raggruppato
dati_bar <- matrix(c(10, 15, 8, 12, 20, 18), nrow = 2)
rownames(dati_bar) <- c("Gruppo A", "Gruppo B")
colnames(dati_bar) <- c("Gen", "Feb", "Mar")

barplot(dati_bar,
        beside = TRUE,             # Barre affiancate
        col = c("blue", "red"),
        legend.text = TRUE,
        args.legend = list(x = "topright"),
        main = "Confronto Mensile",
        xlab = "Mese",
        ylab = "Valori")

## 2.5 Violin plot (imitazione con boxplot + densità)
# Richiede pacchetto vioplot (opzionale)
# install.packages("vioplot")
# library(vioplot)
# vioplot(gruppo1, gruppo2, gruppo3, names = c("A", "B", "C"))


# ═══════════════════════════════════════════════════════════════════
# 3. FUNZIONI STATISTICHE AVANZATE
# ═══════════════════════════════════════════════════════════════════

## 3.1 Coefficiente di variazione
CV <- function(x) {
  sd(x) / mean(x) * 100  # In percentuale
}

dati1 <- c(100, 105, 110, 95, 102)
dati2 <- c(10, 15, 20, 5, 12)

CV(dati1)  # ~5%
CV(dati2)  # ~40%

## 3.2 Standardizzazione (Z-score)
standardizza <- function(x) {
  (x - mean(x)) / sd(x)
}

voti <- c(18, 24, 28, 30, 22, 26)
voti_std <- standardizza(voti)

# Media 0, SD 1
mean(voti_std)  # ≈ 0
sd(voti_std)    # ≈ 1

## 3.3 Normalizzazione min-max [0, 1]
normalizza <- function(x) {
  (x - min(x)) / (max(x) - min(x))
}

voti_norm <- normalizza(voti)
range(voti_norm)  # [0, 1]

## 3.4 Asimmetria (Skewness) e Curtosi
# install.packages("moments")
# library(moments)
# skewness(dati)  # > 0 asimmetria destra, < 0 sinistra
# kurtosis(dati)  # > 3 code pesanti, < 3 code leggere

# Manuale (approssimazione)
skewness_manual <- function(x) {
  n <- length(x)
  m <- mean(x)
  s <- sd(x)
  sum((x - m)^3) / (n * s^3)
}

## 3.5 Errore standard
SE <- function(x) {
  sd(x) / sqrt(length(x))
}

campione <- rnorm(30, 100, 15)
SE(campione)  # ≈ 2.74

## 3.6 Coefficiente di correlazione robusto (Spearman)
# Basato sui ranghi, non influenzato da outliers

x <- c(1, 2, 3, 4, 100)  # Outlier!
y <- c(2, 4, 6, 8, 10)

cor(x, y, method = "pearson")   # Influenzato da 100
cor(x, y, method = "spearman")  # Robusto

# Kendall (alternativa robusta)
cor(x, y, method = "kendall")


# ═══════════════════════════════════════════════════════════════════
# 4. SIMULAZIONI E BOOTSTRAP
# ═══════════════════════════════════════════════════════════════════

## 4.1 Simulazione Monte Carlo
# Stimare π con metodo Monte Carlo

n_punti <- 100000
x <- runif(n_punti, -1, 1)
y <- runif(n_punti, -1, 1)

# Conta punti dentro cerchio unitario
dentro <- (x^2 + y^2) <= 1
stima_pi <- 4 * sum(dentro) / n_punti
stima_pi  # ≈ 3.14159

# Visualizzazione (solo primi 5000 punti)
plot(x[1:5000], y[1:5000],
     col = ifelse(dentro[1:5000], "blue", "red"),
     pch = ".",
     asp = 1,
     main = paste("Stima π =", round(stima_pi, 4)))

## 4.2 Bootstrap per IC della mediana
campione <- rexp(50, rate = 1/20)
mediana_obs <- median(campione)

# Bootstrap
B <- 10000
mediane_boot <- replicate(B, {
  boot_sample <- sample(campione, replace = TRUE)
  median(boot_sample)
})

# IC bootstrap (metodo percentile)
IC_boot <- quantile(mediane_boot, c(0.025, 0.975))

cat("Mediana osservata:", mediana_obs, "\n")
cat("IC 95% bootstrap:", IC_boot, "\n")

# Grafico
hist(mediane_boot, breaks = 50, col = "lightblue",
     main = "Distribuzione Bootstrap Mediana")
abline(v = mediana_obs, col = "red", lwd = 2)
abline(v = IC_boot, col = "blue", lwd = 2, lty = 2)


# ═══════════════════════════════════════════════════════════════════
# 5. TEST NON PARAMETRICI
# ═══════════════════════════════════════════════════════════════════

## 5.1 Test di Wilcoxon (alternativa a t-test)
# Dati NON normali

gruppo1 <- rlnorm(20, meanlog = 2, sdlog = 1)
gruppo2 <- rlnorm(20, meanlog = 2.5, sdlog = 1)

# t-test (assume normalità - potrebbe essere sbagliato)
t.test(gruppo1, gruppo2)

# Wilcoxon (Mann-Whitney U test - NON assume normalità)
wilcox.test(gruppo1, gruppo2, alternative = "less")

## 5.2 Wilcoxon paired (alternativa a paired t-test)
pre <- c(85, 90, 88, 92, 87)
post <- c(88, 92, 90, 95, 89)

# t-test appaiato
t.test(post, pre, paired = TRUE, alternative = "greater")

# Wilcoxon paired
wilcox.test(post, pre, paired = TRUE, alternative = "greater")

## 5.3 Kruskal-Wallis (alternativa ad ANOVA)
# Confronta k ≥ 3 gruppi NON normali

gruppo_A <- rlnorm(15, 3, 0.5)
gruppo_B <- rlnorm(15, 3.3, 0.5)
gruppo_C <- rlnorm(15, 3.6, 0.5)

dati_kw <- data.frame(
  valore = c(gruppo_A, gruppo_B, gruppo_C),
  gruppo = rep(c("A", "B", "C"), each = 15)
)

# ANOVA (parametrica)
anova_test <- aov(valore ~ gruppo, data = dati_kw)
summary(anova_test)

# Kruskal-Wallis (non parametrica)
kruskal.test(valore ~ gruppo, data = dati_kw)

# Post-hoc per Kruskal-Wallis
# install.packages("dunn.test")
# library(dunn.test)
# dunn.test(dati_kw$valore, dati_kw$gruppo, method = "bonferroni")


# ═══════════════════════════════════════════════════════════════════
# 6. DIAGNOSTICA REGRESSIONE LINEARE
# ═══════════════════════════════════════════════════════════════════

## 6.1 Modello esempio
set.seed(2025)
x <- runif(100, 0, 10)
y <- 3 + 2*x + rnorm(100, 0, 2)

modello <- lm(y ~ x)

## 6.2 Grafici diagnostici standard
par(mfrow = c(2, 2))
plot(modello)
par(mfrow = c(1, 1))

# Spiegazione:
# 1. Residuals vs Fitted: cerca pattern (dovrebbe essere casuale)
# 2. Q-Q Plot: normalità residui (punti sulla linea)
# 3. Scale-Location: omogeneità varianza (linea piatta)
# 4. Residuals vs Leverage: punti influenti (Cook's distance)

## 6.3 Test normalità residui
residui <- residuals(modello)
shapiro.test(residui)
# H0: residui normali
# p > 0.05 → OK

## 6.4 Test eteroschedasticità (Breusch-Pagan)
# install.packages("lmtest")
# library(lmtest)
# bptest(modello)
# H0: varianza omogenea
# p > 0.05 → OK

## 6.5 Identificare outliers e punti influenti
# Residui standardizzati
std_res <- rstandard(modello)
outliers <- which(abs(std_res) > 3)

if (length(outliers) > 0) {
  cat("Outliers trovati alle righe:", outliers, "\n")
} else {
  cat("Nessun outlier (|residuo std| > 3)\n")
}

# Cook's distance (influenza)
cooks_d <- cooks.distance(modello)
influenti <- which(cooks_d > 1)

if (length(influenti) > 0) {
  cat("Punti influenti (Cook's D > 1):", influenti, "\n")
} else {
  cat("Nessun punto fortemente influente\n")
}

# Leverage
leverage <- hatvalues(modello)
p <- length(coef(modello))  # Numero parametri
n <- nrow(data.frame(x, y))
soglia_leverage <- 2 * p / n

high_leverage <- which(leverage > soglia_leverage)

## 6.6 Intervalli predizione vs confidenza
nuovi_x <- data.frame(x = c(2, 5, 8))

# IC per E[Y|X] (media condizionata)
IC <- predict(modello, nuovi_x, interval = "confidence", level = 0.95)

# IP per Y (singola osservazione)
IP <- predict(modello, nuovi_x, interval = "prediction", level = 0.95)

# IP sempre più largo di IC!
print(IC)
print(IP)

## 6.7 R² aggiustato
summary(modello)$r.squared        # R²
summary(modello)$adj.r.squared    # R² aggiustato (penalizza molti predittori)


# ═══════════════════════════════════════════════════════════════════
# 7. TRUCCHI E SCORCIATOIE UTILI
# ═══════════════════════════════════════════════════════════════════

## 7.1 Funzioni apply per evitare loop
# apply: applica funzione a righe/colonne matrice
mat <- matrix(rnorm(20), nrow = 4)
apply(mat, 1, mean)  # Media per riga (margin = 1)
apply(mat, 2, sum)   # Somma per colonna (margin = 2)

# lapply: applica a liste (output = lista)
lista <- list(a = 1:5, b = 6:10, c = 11:15)
lapply(lista, mean)

# sapply: come lapply ma semplifica output
sapply(lista, mean)  # Vettore

# tapply: applica per gruppi
voti <- c(28, 24, 30, 26, 22, 29)
corsi <- c("A", "B", "A", "B", "A", "B")
tapply(voti, corsi, mean)  # Media per corso

## 7.2 Funzione replicate per simulazioni
# Ripete espressione n volte
medie_campionarie <- replicate(1000, mean(rnorm(30, 100, 15)))
hist(medie_campionarie, col = "lightgreen")

## 7.3 Sequenze utili
seq(1, 10, by = 2)           # 1, 3, 5, 7, 9
seq(0, 1, length.out = 11)   # 11 valori equidistanti
rep(5, times = 10)           # Ripete 5 per 10 volte
rep(c(1, 2), times = 5)      # 1, 2, 1, 2, ...
rep(c(1, 2), each = 3)       # 1, 1, 1, 2, 2, 2

## 7.4 Condizioni vettorializzate
x <- c(5, 12, 8, 15, 3, 20)

# ifelse vettoriale
categoria <- ifelse(x >= 10, "Alto", "Basso")

# Multipli livelli con cut
categorie <- cut(x,
                 breaks = c(0, 5, 10, 20),
                 labels = c("Basso", "Medio", "Alto"))

## 7.5 Gestire NA (valori mancanti)
dati_na <- c(1, 2, NA, 4, 5, NA, 7)

mean(dati_na)              # Restituisce NA
mean(dati_na, na.rm = TRUE)  # Rimuove NA prima di calcolare

# Identificare NA
is.na(dati_na)             # Vettore logico
which(is.na(dati_na))      # Posizioni NA
sum(is.na(dati_na))        # Conta NA

# Rimuovere NA
dati_puliti <- na.omit(dati_na)
# Oppure:
dati_puliti <- dati_na[!is.na(dati_na)]

## 7.6 Salvataggio e caricamento workspace
# Salvare oggetti
save(studenti, voti, file = "mio_workspace.RData")

# Salvare tutto
save.list = ls(), file = "tutto.RData")

# Caricare
load("mio_workspace.RData")

# Esportare CSV
write.csv(studenti, file = "studenti.csv", row.names = FALSE)

# Importare CSV
dati_importati <- read.csv("studenti.csv")


# ═══════════════════════════════════════════════════════════════════
# 8. FORMULE RAPIDE DA RICORDARE
# ═══════════════════════════════════════════════════════════════════

## DISTRIBUZIONI PRINCIPALI

# NORMALE: X ~ N(μ, σ²)
# E[X] = μ, Var(X) = σ²
# P(X ≤ x) = pnorm(x, mean = μ, sd = σ)

# ESPONENZIALE: X ~ Exp(λ) dove λ = 1/μ
# E[X] = 1/λ = μ, Var(X) = 1/λ²
# P(X > t) = exp(-λt) = 1 - pexp(t, rate = λ)

# BINOMIALE: X ~ Bin(n, p)
# E[X] = np, Var(X) = np(1-p)
# P(X = k) = dbinom(k, size = n, prob = p)

# POISSON: X ~ Poisson(λ)
# E[X] = λ, Var(X) = λ
# P(X = k) = dpois(k, lambda = λ)

# GEOMETRICA: Y = numero prove fino primo successo
# E[Y] = 1/p, Var(Y) = (1-p)/p²
# P(Y = k) = dgeom(k-1, prob = p)  # ATTENZIONE: R usa fallimenti!

## TEST DI IPOTESI

# t-test un campione: H0: μ = μ0
# t.test(x, mu = μ0, alternative = "two.sided" / "less" / "greater")

# t-test due campioni: H0: μ1 = μ2
# t.test(x, y, var.equal = TRUE/FALSE)

# t-test appaiato: H0: μd = 0
# t.test(x, y, paired = TRUE)

# Test proporzione: H0: p = p0
# prop.test(successi, n, p = p0)

# Chi-quadrato bontà fit: H0: distribuzione teorica OK
# chisq.test(osservati, p = prob_teoriche)

# Chi-quadrato indipendenza: H0: variabili indipendenti
# chisq.test(tabella_contingenza)

# ANOVA: H0: μ1 = μ2 = ... = μk
# aov(y ~ gruppo, data = dati)

## REGRESSIONE

# Modello: lm(y ~ x)
# Coefficienti: coef(modello)
# R²: summary(modello)$r.squared
# Predizione: predict(modello, nuovi_dati)


# ═══════════════════════════════════════════════════════════════════
# FINE GUIDA SUPPLEMENTARE
# ═══════════════════════════════════════════════════════════════════

cat("\n")
cat("═══════════════════════════════════════════════════════════════════\n")
cat("✅ GUIDA SUPPLEMENTARE COMPLETATA!\n")
cat("═══════════════════════════════════════════════════════════════════\n")
cat("\n")
cat("Hai appreso:\n")
cat("  ✓ Manipolazione avanzata dataframe\n")
cat("  ✓ Grafici personalizzati\n")
cat("  ✓ Funzioni statistiche custom\n")
cat("  ✓ Simulazioni Monte Carlo e Bootstrap\n")
cat("  ✓ Test non parametrici\n")
cat("  ✓ Diagnostica regressione completa\n")
cat("  ✓ Trucchi e scorciatoie R\n")
cat("  ✓ Formule rapide di riepilogo\n")
cat("\n")
cat("Combina con la guida principale per preparazione completa!\n")
cat("═══════════════════════════════════════════════════════════════════\n")
