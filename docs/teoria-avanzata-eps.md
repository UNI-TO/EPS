# Teoria Avanzata - Elementi di Probabilità e Statistica

## Indice
1. [Teorema del Limite Centrale](#teorema-del-limite-centrale)
2. [Test Chi-quadrato Approfondito](#test-chi-quadrato)
3. [ANOVA e Confronti Multipli](#anova)
4. [Regressione Lineare Avanzata](#regressione)
5. [Distribuzioni Congiunte](#distribuzioni-congiunte)
6. [Metodo Bootstrap](#bootstrap)
7. [Test Non Parametrici](#test-non-parametrici)

---

## Teorema del Limite Centrale

### Enunciato

Sia X₁, X₂, ..., Xₙ un campione casuale da una popolazione con media μ e varianza σ² (entrambe finite).

Allora la distribuzione della media campionaria X̄ converge a una **distribuzione normale** quando n → ∞:

```
X̄ ~ N(μ, σ²/n)  per n sufficientemente grande
```

O equivalentemente, la variabile standardizzata:

```
Z = (X̄ - μ) / (σ/√n) ~ N(0, 1)
```

### Aspetti Chiave

1. **Universalità**: Vale **indipendentemente** dalla distribuzione originale di X
   - X può essere uniforme, esponenziale, binomiale, etc.
   - Non serve che X sia normale!

2. **"n grande"**: Tipicamente n ≥ 30
   - Per distribuzioni simmetriche: anche n < 30 può bastare
   - Per distribuzioni molto asimmetriche: serve n > 30

3. **Errore Standard**: SE(X̄) = σ/√n
   - Diminuisce con √n, non linearmente
   - Per dimezzare l'errore, serve quadruplicare n

### Esempio in R

```r
# Popolazione NON normale: Esponenziale
lambda <- 1/50  # media = 50
popolazione <- rexp(100000, rate = lambda)

# Distribuzione popolazione (asimmetrica)
hist(popolazione, breaks = 50, col = "lightblue",
     main = "Popolazione Esponenziale")

# Generiamo 10000 medie campionarie con n = 30
medie <- replicate(10000, {
  campione <- sample(popolazione, 30)
  mean(campione)
})

# Distribuzione medie campionarie (quasi normale!)
hist(medie, breaks = 50, col = "lightgreen",
     main = "Distribuzione Medie (n=30)")

# Verifica teorema
mean(medie)  # ≈ 50 = μ
sd(medie)    # ≈ 50/√30 ≈ 9.13

# Test normalità
shapiro.test(medie)  # p-value > 0.05 → normale

# Q-Q plot
qqnorm(medie)
qqline(medie, col = "red")
```

### Applicazioni

1. **Costruzione Intervalli di Confidenza**
   ```r
   # IC per μ quando σ incognita (uso s)
   n <- 30
   x_bar <- mean(campione)
   s <- sd(campione)

   # Errore standard
   SE <- s / sqrt(n)

   # IC 95% usando t di Student
   t_critico <- qt(0.975, df = n-1)
   IC <- x_bar + c(-1, 1) * t_critico * SE
   ```

2. **Test Ipotesi sulla Media**
   ```r
   # H0: μ = μ0
   # Statistica test
   t_stat <- (x_bar - mu0) / SE

   # p-value (test bilaterale)
   p_value <- 2 * (1 - pt(abs(t_stat), df = n-1))
   ```

3. **Stima Dimensione Campione**
   ```r
   # Quanti n servono per SE ≤ 5?
   sigma <- 50
   SE_desiderato <- 5

   n <- (sigma / SE_desiderato)^2
   ceiling(n)  # 100
   ```

---

## Test Chi-quadrato Approfondito

### Tipi di Test Chi-quadrato

#### 1. Test di Bontà del Fit (Goodness of Fit)

Verifica se i dati seguono una distribuzione teorica specificata.

**Ipotesi:**
- H₀: I dati seguono la distribuzione specificata
- H₁: I dati NON seguono la distribuzione

**Statistica test:**
```
χ² = Σ (Osservati - Attesi)² / Attesi
```

**Gradi di libertà:**
```
df = k - 1 - p
```
dove:
- k = numero di categorie
- p = numero di parametri stimati dai dati

**Esempio in R:**

```r
# Test: Un dado è truccato?
# Lancio dado 120 volte

osservati <- c(25, 22, 18, 20, 19, 16)  # Frequenze osservate

# Se dado equo, ci aspettiamo 20 per faccia
attesi <- rep(20, 6)

# Test chi-quadrato
test <- chisq.test(osservati, p = attesi/sum(attesi))
test

# Risultato:
# χ² = 2.5, df = 5, p-value = 0.776
# Non rifiuto H0 → dado sembra equo

# Visualizzazione
barplot(rbind(osservati, attesi),
        beside = TRUE,
        col = c("blue", "red"),
        legend = c("Osservato", "Atteso"),
        names.arg = 1:6)
```

**Esempio avanzato: Test normalità**

```r
# Verifico se dati seguono N(100, 15²)
set.seed(123)
dati <- rnorm(200, 100, 15)

# Divido in intervalli (bins)
breaks <- seq(60, 140, by = 10)
osservati <- table(cut(dati, breaks))

# Calcolo frequenze attese dalla normale teorica
n <- length(dati)
prob_intervalli <- diff(pnorm(breaks, mean = 100, sd = 15))
attesi <- n * prob_intervalli

# Test
chisq.test(osservati, p = prob_intervalli)

# ATTENZIONE: Se stimiamo media e SD dai dati,
# df = k - 1 - 2 (perché stimiamo 2 parametri)
```

#### 2. Test di Indipendenza

Verifica se due variabili categoriali sono indipendenti.

**Ipotesi:**
- H₀: Le variabili sono indipendenti
- H₁: Le variabili sono associate

**Gradi di libertà:**
```
df = (r - 1) × (c - 1)
```

**Esempio in R:**

```r
# Studio: Fumo vs Malattia polmonare

#              Malato  Sano
# Fumatore        45    30
# Non fumatore    15    60

tabella <- matrix(c(45, 30, 15, 60), nrow = 2, byrow = TRUE)
rownames(tabella) <- c("Fumatore", "Non fumatore")
colnames(tabella) <- c("Malato", "Sano")

# Test
test <- chisq.test(tabella)
test

# χ² = 24.5, df = 1, p-value < 0.001
# Rifiuto H0 → Fumo e malattia sono associati

# Frequenze attese sotto H0
test$expected

# Residui standardizzati (grandi in valore assoluto → contributo forte)
test$stdres
```

**Interpretazione Residui:**
```r
# Residuo = (Osservato - Atteso) / sqrt(Atteso)
# |residuo| > 2 → contributo significativo a χ²

# Heatmap residui
library(corrplot)  # se disponibile
residui <- test$stdres
heatmap(residui, scale = "none", col = cm.colors(10))
```

#### 3. Test di Omogeneità

Verifica se k popolazioni hanno la stessa distribuzione per una variabile categoriale.

Stesso procedimento del test indipendenza, ma interpretazione diversa.

---

## ANOVA (Analysis of Variance)

### ANOVA a un Fattore

Confronta medie di k ≥ 3 gruppi.

**Ipotesi:**
- H₀: μ₁ = μ₂ = ... = μₖ (tutte le medie uguali)
- H₁: Almeno una media diversa

**Assunzioni:**
1. Normalità in ogni gruppo
2. Varianze omogenee (omogeneità)
3. Osservazioni indipendenti

**Statistica test:**
```
F = MSB / MSW

dove:
MSB = varianza TRA gruppi (Between)
MSW = varianza DENTRO gruppi (Within)
```

**Gradi di libertà:**
- df1 = k - 1 (numeratore)
- df2 = N - k (denominatore)
  dove N = totale osservazioni

### Esempio in R

```r
# Confronto 3 diete su perdita peso

dieta_A <- c(5.2, 4.8, 6.1, 5.5, 5.9, 4.7)
dieta_B <- c(7.1, 6.8, 7.5, 7.2, 6.9, 7.4)
dieta_C <- c(4.1, 3.9, 4.5, 4.2, 3.8, 4.6)

# Creo dataframe
dati <- data.frame(
  peso_perso = c(dieta_A, dieta_B, dieta_C),
  dieta = rep(c("A", "B", "C"), each = 6)
)

# ANOVA
modello <- aov(peso_perso ~ dieta, data = dati)
summary(modello)

# Output:
#             Df Sum Sq Mean Sq F value Pr(>F)
# dieta        2  29.45  14.725  67.234 <0.001 ***
# Residuals   15   3.29   0.219

# Interpretazione:
# F = 67.234, p < 0.001
# Rifiuto H0 → almeno una dieta differente

# Visualizzazione
boxplot(peso_perso ~ dieta, data = dati,
        col = c("red", "green", "blue"),
        main = "Perdita Peso per Dieta")

# Medie per gruppo
aggregate(peso_perso ~ dieta, data = dati, FUN = mean)
```

### Test Post-Hoc: Tukey HSD

Dopo ANOVA significativa, identifica quali coppie differiscono.

```r
# Test Tukey HSD (Honest Significant Difference)
tukey <- TukeyHSD(modello)
tukey

# Output:
#      diff     lwr     upr   p adj
# B-A  1.85   1.24   2.46   0.000
# C-A -1.05  -1.66  -0.44   0.002
# C-B -2.90  -3.51  -2.29   0.000

# Interpretazione:
# Tutte le coppie significativamente diverse (p < 0.05)

# Grafico
plot(tukey)

# Intervalli che NON contengono 0 → differenza significativa
```

### Verifica Assunzioni

```r
# 1. Normalità per gruppo
shapiro.test(dieta_A)
shapiro.test(dieta_B)
shapiro.test(dieta_C)

# Oppure residui globali
residui <- residuals(modello)
shapiro.test(residui)
qqnorm(residui)
qqline(residui)

# 2. Omogeneità varianze: Test di Levene
# install.packages("car")
library(car)
leveneTest(peso_perso ~ dieta, data = dati)

# H0: varianze uguali
# Se p > 0.05 → assunzione soddisfatta

# Alternativa: Test di Bartlett (sensibile a non-normalità)
bartlett.test(peso_perso ~ dieta, data = dati)
```

### Cosa fare se Assunzioni Violate?

1. **Trasformazioni**:
   ```r
   # Log-trasformazione (dati positivi asimmetrici)
   modello_log <- aov(log(peso_perso) ~ dieta, data = dati)

   # Box-Cox (trova trasformazione ottimale)
   library(MASS)
   boxcox(modello)
   ```

2. **Test Non Parametrico: Kruskal-Wallis**:
   ```r
   kruskal.test(peso_perso ~ dieta, data = dati)

   # Non assume normalità, solo ordine dei dati
   # Post-hoc: Dunn test
   # install.packages("dunn.test")
   library(dunn.test)
   dunn.test(dati$peso_perso, dati$dieta, method = "bonferroni")
   ```

---

## Regressione Lineare Avanzata

### Diagnostica del Modello

```r
# Modello: Prezzo casa ~ Superficie
set.seed(42)
superficie <- runif(100, 50, 200)
prezzo <- 50000 + 800 * superficie + rnorm(100, 0, 20000)

dati <- data.frame(superficie, prezzo)
modello <- lm(prezzo ~ superficie, data = dati)

# Summary completo
summary(modello)

# Coefficienti:
#              Estimate Std. Error t value Pr(>|t|)
# (Intercept)  51234.5    4567.2   11.22   <2e-16 ***
# superficie    798.3      31.4    25.43   <2e-16 ***
#
# R² = 0.868, p < 0.001

# DIAGNOSTICA: 4 grafici chiave
par(mfrow = c(2, 2))
plot(modello)
par(mfrow = c(1, 1))
```

### Interpretazione Grafici Diagnostici

#### 1. Residuals vs Fitted
```r
plot(modello, which = 1)
```
- **Cosa cercare**: Pattern casuale intorno a 0
- **Problemi**:
  - Curva → relazione non lineare
  - Imbuto → eteroschedasticità (varianza non costante)
  - Outliers evidenti

#### 2. Q-Q Plot
```r
plot(modello, which = 2)
```
- **Cosa cercare**: Punti sulla linea
- **Problemi**:
  - Code pesanti → deviazione da normalità
  - S-shape → asimmetria

#### 3. Scale-Location
```r
plot(modello, which = 3)
```
- **Cosa cercare**: Linea orizzontale, varianza costante
- **Problemi**:
  - Trend → eteroschedasticità

#### 4. Residuals vs Leverage
```r
plot(modello, which = 5)
```
- **Cosa cercare**: Punti entro linee tratteggiate (Cook's distance)
- **Problemi**:
  - Punti oltre linee → osservazioni influenti

### Identificare Osservazioni Problematiche

```r
# 1. Outliers (residui standardizzati > 3)
std_res <- rstandard(modello)
outliers <- which(abs(std_res) > 3)
dati[outliers, ]

# 2. Punti influenti (Cook's distance > 1)
cooks_d <- cooks.distance(modello)
influenti <- which(cooks_d > 1)
dati[influenti, ]

# 3. High leverage (h > 2p/n)
hatvalues_mod <- hatvalues(modello)
p <- length(coef(modello))
n <- nrow(dati)
high_leverage <- which(hatvalues_mod > 2*p/n)

# Visualizzazione
plot(hatvalues_mod, std_res,
     xlab = "Leverage", ylab = "Residui Standardizzati")
abline(h = c(-3, 3), col = "red", lty = 2)
abline(v = 2*p/n, col = "blue", lty = 2)
```

### Intervalli di Confidenza e Predizione

```r
# Nuovi valori
nuovi_dati <- data.frame(superficie = c(100, 150, 200))

# 1. Intervallo di CONFIDENZA per E[Y|X]
#    (media predetta)
IC <- predict(modello, nuovi_dati, interval = "confidence", level = 0.95)
IC

# 2. Intervallo di PREDIZIONE per Y
#    (singola osservazione futura)
IP <- predict(modello, nuovi_dati, interval = "prediction", level = 0.95)
IP

# IP è SEMPRE più ampio di IC!

# Visualizzazione
plot(superficie, prezzo, pch = 19)
abline(modello, col = "red", lwd = 2)

# Aggiungi bande
seq_superficie <- seq(50, 200, length.out = 100)
IC_band <- predict(modello,
                   data.frame(superficie = seq_superficie),
                   interval = "confidence")
IP_band <- predict(modello,
                   data.frame(superficie = seq_superficie),
                   interval = "prediction")

lines(seq_superficie, IC_band[, "lwr"], col = "blue", lty = 2)
lines(seq_superficie, IC_band[, "upr"], col = "blue", lty = 2)
lines(seq_superficie, IP_band[, "lwr"], col = "green", lty = 2)
lines(seq_superficie, IP_band[, "upr"], col = "green", lty = 2)

legend("topleft",
       c("Regressione", "IC 95%", "IP 95%"),
       col = c("red", "blue", "green"),
       lty = c(1, 2, 2))
```

---

## Metodo Bootstrap

Tecnica di ricampionamento per stimare la distribuzione di una statistica.

### Idea Base

1. Ricampiona **con reinserimento** dal campione originale
2. Calcola la statistica su ogni ricampionamento
3. Usa la distribuzione empirica come approssimazione

### Implementazione in R

```r
# Campione originale
set.seed(999)
campione <- rexp(50, rate = 1/20)  # media teorica = 20

# Statistica: mediana
mediana_obs <- median(campione)

# Bootstrap: 10000 ricampionamenti
B <- 10000
mediane_boot <- numeric(B)

for (i in 1:B) {
  campione_boot <- sample(campione, replace = TRUE)
  mediane_boot[i] <- median(campione_boot)
}

# Distribuzione bootstrap
hist(mediane_boot, breaks = 50, col = "lightblue",
     main = "Distribuzione Bootstrap della Mediana")
abline(v = mediana_obs, col = "red", lwd = 2)

# IC Bootstrap (metodo percentile)
IC_boot <- quantile(mediane_boot, c(0.025, 0.975))
IC_boot

# Errore standard bootstrap
SE_boot <- sd(mediane_boot)
SE_boot
```

### Applicazioni

1. **IC quando distribuzione ignota**
2. **IC per statistiche complesse** (es. correlazione, ratio)
3. **Validazione modelli**

---

## Test Non Parametrici

### Quando Usarli?

- Dati **non** normali
- Dati **ordinali**
- Campioni **piccoli**
- Assunzioni parametriche violate

### Test Principali

#### 1. Test di Wilcoxon (alternativa a t-test)

**Un campione:**
```r
# H0: mediana = m0
wilcox.test(dati, mu = m0)
```

**Due campioni indipendenti (Mann-Whitney):**
```r
wilcox.test(gruppo1, gruppo2)
```

**Due campioni appaiati:**
```r
wilcox.test(pre, post, paired = TRUE)
```

#### 2. Kruskal-Wallis (alternativa ad ANOVA)
```r
kruskal.test(valore ~ gruppo, data = dati)
```

#### 3. Test di Friedman (ANOVA a blocchi)
```r
friedman.test(valore ~ trattamento | blocco, data = dati)
```

### Esempio Completo

```r
# Dati molto asimmetrici (tempi di reazione)
set.seed(777)
gruppo_A <- rlnorm(20, meanlog = 5, sdlog = 0.8)
gruppo_B <- rlnorm(20, meanlog = 5.5, sdlog = 0.8)

# Test normalità
shapiro.test(gruppo_A)  # p < 0.05 → NON normale

# t-test (parametrico - SBAGLIATO)
t.test(gruppo_A, gruppo_B)

# Mann-Whitney (non parametrico - CORRETTO)
wilcox.test(gruppo_A, gruppo_B, alternative = "less")

# Il test non parametrico è più robusto!
```

---

## Conclusione

Questi argomenti avanzati completano la preparazione per l'esame di EPS. Ricorda:

✅ TLC giustifica uso della normale anche quando dati non lo sono
✅ Chi-quadrato ha usi diversi: bontà, indipendenza, omogeneità
✅ ANOVA richiede verificare assunzioni prima di interpretare
✅ Regressione necessita diagnostica approfondita
✅ Bootstrap utile quando teoria manca
✅ Test non parametrici salvano quando assunzioni violate

**Studia con metodo, pratica con R, supererai l'esame!** 🎓
