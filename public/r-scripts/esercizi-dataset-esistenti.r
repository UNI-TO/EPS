# ============================================================================
# ESERCIZI GUIDATI CON DATASET ESISTENTI
# ============================================================================
# Corso: Elementi di Probabilità e Statistica
# Data: Gennaio 2025
#
# Questo script contiene 6 esercizi completi per praticare:
# - Statistiche descrittive
# - Correlazione e regressione lineare
# - ANOVA e test post-hoc
# - Test di ipotesi
# - Intervalli di confidenza
# - Identificazione outlier
# - Visualizzazione dati
# ============================================================================

# Imposta directory di lavoro (modifica se necessario)
# setwd("path/to/Simulatore EPS")

# ============================================================================
# ESERCIZIO 1: ATLETI - Correlazione e Regressione Lineare
# ============================================================================
# Dataset: atleti.RData
# Obiettivo: Analizzare relazione tra variabili fisiche degli atleti

cat("\n========== ESERCIZIO 1: ATLETI ==========\n")

# Carica dataset
load("./input/rData/atleti.RData")

# 1.1 Esplorazione iniziale
cat("\n--- 1.1 Struttura Dataset ---\n")
str(atleti)
head(atleti)
summary(atleti)

# Dimensioni
cat("\nNumero osservazioni:", nrow(atleti), "\n")
cat("Numero variabili:", ncol(atleti), "\n")

# 1.2 Statistiche descrittive
cat("\n--- 1.2 Statistiche Descrittive ---\n")

# Funzione per statistiche complete
stats_complete <- function(x) {
  c(
    N = length(x),
    Media = mean(x, na.rm = TRUE),
    Mediana = median(x, na.rm = TRUE),
    SD = sd(x, na.rm = TRUE),
    Min = min(x, na.rm = TRUE),
    Q1 = quantile(x, 0.25, na.rm = TRUE),
    Q3 = quantile(x, 0.75, na.rm = TRUE),
    Max = max(x, na.rm = TRUE),
    IQR = IQR(x, na.rm = TRUE)
  )
}

# Applica a tutte le variabili numeriche
sapply(atleti[sapply(atleti, is.numeric)], stats_complete)

# 1.3 Visualizzazioni
cat("\n--- 1.3 Visualizzazioni ---\n")

# Layout 2x2
par(mfrow = c(2, 2))

# Istogrammi variabili principali
if ("Altezza" %in% names(atleti)) {
  hist(atleti$Altezza,
       main = "Distribuzione Altezza",
       xlab = "Altezza (cm)",
       col = "skyblue",
       border = "white")
}

if ("Peso" %in% names(atleti)) {
  hist(atleti$Peso,
       main = "Distribuzione Peso",
       xlab = "Peso (kg)",
       col = "lightgreen",
       border = "white")
}

if ("VO2max" %in% names(atleti)) {
  hist(atleti$VO2max,
       main = "Distribuzione VO2max",
       xlab = "VO2max (ml/kg/min)",
       col = "salmon",
       border = "white")
}

# Boxplot per identificare outlier
boxplot(atleti[sapply(atleti, is.numeric)],
        main = "Boxplot Variabili Numeriche",
        col = rainbow(sum(sapply(atleti, is.numeric))),
        las = 2)

par(mfrow = c(1, 1))

# 1.4 Matrice di correlazione
cat("\n--- 1.4 Matrice di Correlazione ---\n")

# Solo variabili numeriche
numeric_vars <- atleti[sapply(atleti, is.numeric)]
cor_matrix <- cor(numeric_vars, use = "complete.obs")
print(round(cor_matrix, 3))

# Visualizzazione matrice correlazione
pairs(numeric_vars,
      main = "Scatter Plot Matrix",
      pch = 19,
      col = rgb(0, 0, 1, 0.5))

# 1.5 Correlazione di Pearson
cat("\n--- 1.5 Correlazione Pearson ---\n")

# Esempio: Correlazione Altezza vs Peso
if ("Altezza" %in% names(atleti) && "Peso" %in% names(atleti)) {
  cor_test <- cor.test(atleti$Altezza, atleti$Peso)
  print(cor_test)

  cat("\nInterpretazione:\n")
  cat("- Coefficiente r =", round(cor_test$estimate, 3), "\n")
  cat("- p-value =", format(cor_test$p.value, scientific = TRUE), "\n")

  if (cor_test$p.value < 0.05) {
    cat("- Correlazione SIGNIFICATIVA (p < 0.05)\n")
  } else {
    cat("- Correlazione NON significativa (p >= 0.05)\n")
  }

  # Scatter plot con linea di regressione
  plot(atleti$Altezza, atleti$Peso,
       main = "Altezza vs Peso",
       xlab = "Altezza (cm)",
       ylab = "Peso (kg)",
       pch = 19,
       col = rgb(0, 0, 1, 0.6))
  abline(lm(Peso ~ Altezza, data = atleti), col = "red", lwd = 2)
  grid()
}

# 1.6 Regressione Lineare
cat("\n--- 1.6 Regressione Lineare ---\n")

if ("Altezza" %in% names(atleti) && "Peso" %in% names(atleti)) {
  # Modello: Peso ~ Altezza
  modello <- lm(Peso ~ Altezza, data = atleti)
  print(summary(modello))

  # Estrai coefficienti
  intercetta <- coef(modello)[1]
  pendenza <- coef(modello)[2]

  cat("\nEquazione: Peso =", round(intercetta, 2), "+",
      round(pendenza, 2), "* Altezza\n")

  # R² e R² aggiustato
  r2 <- summary(modello)$r.squared
  r2_adj <- summary(modello)$adj.r.squared
  cat("R² =", round(r2, 4), "(", round(r2 * 100, 2), "% varianza spiegata)\n")
  cat("R² adj =", round(r2_adj, 4), "\n")

  # Grafici diagnostici
  par(mfrow = c(2, 2))
  plot(modello)
  par(mfrow = c(1, 1))

  # Predizioni
  cat("\n--- Predizioni ---\n")
  nuovi_dati <- data.frame(Altezza = c(170, 180, 190))
  predizioni <- predict(modello, newdata = nuovi_dati, interval = "confidence")
  print(cbind(nuovi_dati, predizioni))
}

# 1.7 Identificazione outlier
cat("\n--- 1.7 Identificazione Outlier (Metodo Tukey) ---\n")

identifica_outlier <- function(x, nome_var) {
  Q1 <- quantile(x, 0.25, na.rm = TRUE)
  Q3 <- quantile(x, 0.75, na.rm = TRUE)
  IQR_val <- Q3 - Q1

  lower_bound <- Q1 - 1.5 * IQR_val
  upper_bound <- Q3 + 1.5 * IQR_val

  outliers <- x[x < lower_bound | x > upper_bound]

  cat("\nVariabile:", nome_var, "\n")
  cat("Limiti: [", round(lower_bound, 2), ",", round(upper_bound, 2), "]\n")
  cat("Numero outlier:", length(outliers), "\n")
  if (length(outliers) > 0) {
    cat("Valori outlier:", paste(round(outliers, 2), collapse = ", "), "\n")
  }
}

for (var in names(numeric_vars)) {
  identifica_outlier(numeric_vars[[var]], var)
}


# ============================================================================
# ESERCIZIO 2: BOSCO - Analisi Descrittiva e Visualizzazione
# ============================================================================
# Dataset: bosco.RData
# Obiettivo: Esplorare variabili forestali, identificare pattern e outlier

cat("\n\n========== ESERCIZIO 2: BOSCO ==========\n")

# Carica dataset
load("./input/rData/bosco.RData")

# 2.1 Esplorazione
cat("\n--- 2.1 Esplorazione Dataset ---\n")
str(bosco)
head(bosco, 10)
summary(bosco)

# 2.2 Statistiche descrittive per gruppi
cat("\n--- 2.2 Statistiche per Tipologia Albero ---\n")

if ("Specie" %in% names(bosco) && "Diametro" %in% names(bosco)) {
  # Media diametro per specie
  aggregate(Diametro ~ Specie, data = bosco, FUN = function(x) {
    c(N = length(x),
      Media = mean(x),
      SD = sd(x),
      Min = min(x),
      Max = max(x))
  })
}

# 2.3 Visualizzazioni avanzate
cat("\n--- 2.3 Visualizzazioni ---\n")

par(mfrow = c(2, 2))

# Istogramma con curva normale sovrapposta
if ("Altezza" %in% names(bosco)) {
  h <- hist(bosco$Altezza,
            main = "Distribuzione Altezza Alberi",
            xlab = "Altezza (m)",
            col = "forestgreen",
            border = "white",
            prob = TRUE)

  # Aggiungi curva normale teorica
  xfit <- seq(min(bosco$Altezza, na.rm = TRUE),
              max(bosco$Altezza, na.rm = TRUE),
              length = 100)
  yfit <- dnorm(xfit,
                mean = mean(bosco$Altezza, na.rm = TRUE),
                sd = sd(bosco$Altezza, na.rm = TRUE))
  lines(xfit, yfit, col = "red", lwd = 2)
}

# Boxplot per gruppo
if ("Specie" %in% names(bosco) && "Diametro" %in% names(bosco)) {
  boxplot(Diametro ~ Specie, data = bosco,
          main = "Diametro per Specie",
          xlab = "Specie",
          ylab = "Diametro (cm)",
          col = rainbow(length(unique(bosco$Specie))),
          las = 2)
}

# Scatter plot
if ("Diametro" %in% names(bosco) && "Altezza" %in% names(bosco)) {
  plot(bosco$Diametro, bosco$Altezza,
       main = "Diametro vs Altezza",
       xlab = "Diametro (cm)",
       ylab = "Altezza (m)",
       pch = 19,
       col = rgb(0, 0.5, 0, 0.6))
  abline(lm(Altezza ~ Diametro, data = bosco), col = "red", lwd = 2)
  grid()
}

# Density plot
if ("Altezza" %in% names(bosco)) {
  plot(density(bosco$Altezza, na.rm = TRUE),
       main = "Density Plot - Altezza",
       xlab = "Altezza (m)",
       col = "darkgreen",
       lwd = 2)
  polygon(density(bosco$Altezza, na.rm = TRUE),
          col = rgb(0, 0.5, 0, 0.3))
}

par(mfrow = c(1, 1))

# 2.4 Test normalità
cat("\n--- 2.4 Test Normalità (Shapiro-Wilk) ---\n")

for (var in names(bosco[sapply(bosco, is.numeric)])) {
  test <- shapiro.test(bosco[[var]])
  cat("\nVariabile:", var, "\n")
  cat("W =", round(test$statistic, 4), "\n")
  cat("p-value =", format(test$p.value, scientific = TRUE), "\n")

  if (test$p.value < 0.05) {
    cat("→ NON normale (p < 0.05)\n")
  } else {
    cat("→ Approssimativamente normale (p >= 0.05)\n")
  }
}

# 2.5 Outlier detection
cat("\n--- 2.5 Outlier Detection ---\n")

# Metodo Z-score
zscore_outliers <- function(x, nome_var, threshold = 3) {
  z <- scale(x)
  outliers_idx <- which(abs(z) > threshold)

  cat("\nVariabile:", nome_var, "\n")
  cat("Outlier (|Z| >", threshold, "):", length(outliers_idx), "\n")

  if (length(outliers_idx) > 0) {
    cat("Indici:", paste(outliers_idx, collapse = ", "), "\n")
    cat("Valori:", paste(round(x[outliers_idx], 2), collapse = ", "), "\n")
  }
}

for (var in names(bosco[sapply(bosco, is.numeric)])) {
  zscore_outliers(bosco[[var]], var)
}


# ============================================================================
# ESERCIZIO 3: FERTILIZZANTE - ANOVA e Test Post-hoc
# ============================================================================
# Dataset: fertilizzante.RData
# Obiettivo: Confrontare medie tra gruppi con ANOVA e Tukey HSD

cat("\n\n========== ESERCIZIO 3: FERTILIZZANTE ==========\n")

# Carica dataset
load("./input/rData/fertilizzante.RData")

# 3.1 Esplorazione
cat("\n--- 3.1 Esplorazione Dataset ---\n")
str(fertilizzante)
head(fertilizzante)
summary(fertilizzante)

# Conta osservazioni per gruppo
if ("Tipo" %in% names(fertilizzante)) {
  cat("\nOsservazioni per tipo fertilizzante:\n")
  print(table(fertilizzante$Tipo))
}

# 3.2 Statistiche descrittive per gruppo
cat("\n--- 3.2 Statistiche per Gruppo ---\n")

if ("Tipo" %in% names(fertilizzante) && "Produzione" %in% names(fertilizzante)) {
  stats_gruppo <- aggregate(Produzione ~ Tipo, data = fertilizzante, FUN = function(x) {
    c(N = length(x),
      Media = mean(x),
      SD = sd(x),
      SE = sd(x)/sqrt(length(x)),
      Min = min(x),
      Max = max(x))
  })
  print(stats_gruppo)
}

# 3.3 Visualizzazioni
cat("\n--- 3.3 Visualizzazioni ---\n")

par(mfrow = c(2, 2))

# Boxplot
if ("Tipo" %in% names(fertilizzante) && "Produzione" %in% names(fertilizzante)) {
  boxplot(Produzione ~ Tipo, data = fertilizzante,
          main = "Produzione per Tipo Fertilizzante",
          xlab = "Tipo",
          ylab = "Produzione (kg/ha)",
          col = c("lightblue", "lightgreen", "salmon", "gold"),
          las = 1)

  # Aggiungi medie
  means <- tapply(fertilizzante$Produzione, fertilizzante$Tipo, mean)
  points(1:length(means), means, pch = 19, col = "red", cex = 1.5)
  legend("topright", legend = "Media", pch = 19, col = "red")
}

# Istogrammi per gruppo
if ("Tipo" %in% names(fertilizzante) && "Produzione" %in% names(fertilizzante)) {
  gruppi <- unique(fertilizzante$Tipo)
  for (i in 1:min(3, length(gruppi))) {
    dati_gruppo <- fertilizzante$Produzione[fertilizzante$Tipo == gruppi[i]]
    hist(dati_gruppo,
         main = paste("Distribuzione -", gruppi[i]),
         xlab = "Produzione",
         col = rainbow(length(gruppi))[i],
         border = "white")
  }
}

par(mfrow = c(1, 1))

# 3.4 Verifica assunzioni ANOVA
cat("\n--- 3.4 Verifica Assunzioni ANOVA ---\n")

# Assunzione 1: Normalità per gruppo
cat("\nTest normalità per gruppo (Shapiro-Wilk):\n")
if ("Tipo" %in% names(fertilizzante) && "Produzione" %in% names(fertilizzante)) {
  gruppi <- unique(fertilizzante$Tipo)
  for (gruppo in gruppi) {
    dati_gruppo <- fertilizzante$Produzione[fertilizzante$Tipo == gruppo]
    if (length(dati_gruppo) >= 3) {
      test <- shapiro.test(dati_gruppo)
      cat(gruppo, ": W =", round(test$statistic, 4),
          ", p =", round(test$p.value, 4), "\n")
    }
  }
}

# Assunzione 2: Omogeneità varianze (Levene Test)
cat("\n Test omogeneità varianze:\n")
if (requireNamespace("car", quietly = TRUE)) {
  library(car)
  if ("Tipo" %in% names(fertilizzante) && "Produzione" %in% names(fertilizzante)) {
    levene <- car::leveneTest(Produzione ~ Tipo, data = fertilizzante)
    print(levene)

    if (levene$`Pr(>F)`[1] < 0.05) {
      cat("→ Varianze NON omogenee (p < 0.05)\n")
    } else {
      cat("→ Varianze omogenee (p >= 0.05)\n")
    }
  }
} else {
  cat("Pacchetto 'car' non installato. Installa con: install.packages('car')\n")

  # Alternativa: Bartlett test (meno robusto)
  cat("\nBartlett test (alternativa):\n")
  if ("Tipo" %in% names(fertilizzante) && "Produzione" %in% names(fertilizzante)) {
    bartlett <- bartlett.test(Produzione ~ Tipo, data = fertilizzante)
    print(bartlett)
  }
}

# 3.5 ANOVA
cat("\n--- 3.5 ANOVA ---\n")

if ("Tipo" %in% names(fertilizzante) && "Produzione" %in% names(fertilizzante)) {
  # Modello ANOVA
  modello_aov <- aov(Produzione ~ Tipo, data = fertilizzante)
  print(summary(modello_aov))

  # Estrai F-statistic e p-value
  aov_summary <- summary(modello_aov)[[1]]
  F_stat <- aov_summary$`F value`[1]
  p_value <- aov_summary$`Pr(>F)`[1]

  cat("\nRisultati:\n")
  cat("F =", round(F_stat, 3), "\n")
  cat("p-value =", format(p_value, scientific = TRUE), "\n")

  if (p_value < 0.05) {
    cat("\n✅ CONCLUSIONE: Almeno un gruppo ha media diversa (p < 0.05)\n")
    cat("→ Procedi con test post-hoc (Tukey HSD)\n")
  } else {
    cat("\n❌ CONCLUSIONE: Nessuna differenza significativa tra gruppi (p >= 0.05)\n")
    cat("→ NON fare test post-hoc\n")
  }
}

# 3.6 Test Post-hoc: Tukey HSD
cat("\n--- 3.6 Test Post-hoc: Tukey HSD ---\n")

if ("Tipo" %in% names(fertilizzante) && "Produzione" %in% names(fertilizzante)) {
  if (p_value < 0.05) {
    tukey <- TukeyHSD(modello_aov)
    print(tukey)

    # Visualizza intervalli confidenza
    plot(tukey, las = 1, col = "blue")

    cat("\nInterpretazione:\n")
    cat("Se IC non contiene 0 → differenza significativa\n")
    cat("Se p adj < 0.05 → differenza significativa\n")
  }
}

# 3.7 Effect size (Eta-squared)
cat("\n--- 3.7 Effect Size (η²) ---\n")

if ("Tipo" %in% names(fertilizzante) && "Produzione" %in% names(fertilizzante)) {
  # Calcolo manuale eta-squared
  SS_between <- aov_summary$`Sum Sq`[1]
  SS_total <- sum(aov_summary$`Sum Sq`)
  eta_squared <- SS_between / SS_total

  cat("η² =", round(eta_squared, 4), "\n")
  cat("Interpretazione:\n")
  cat("- η² < 0.01: effetto piccolo\n")
  cat("- 0.01 ≤ η² < 0.06: effetto medio\n")
  cat("- η² ≥ 0.06: effetto grande\n")
}


# ============================================================================
# ESERCIZIO 4: TRAZIONE - Test Ipotesi e Intervalli Confidenza
# ============================================================================
# Dataset: trazione.RData
# Obiettivo: Test t, confronto medie, IC

cat("\n\n========== ESERCIZIO 4: TRAZIONE ==========\n")

# Carica dataset
load("./input/rData/trazione.RData")

# 4.1 Esplorazione
cat("\n--- 4.1 Esplorazione Dataset ---\n")
str(trazione)
head(trazione)
summary(trazione)

# 4.2 Statistiche descrittive
cat("\n--- 4.2 Statistiche Descrittive ---\n")
sapply(trazione[sapply(trazione, is.numeric)], stats_complete)

# 4.3 Test t a un campione
cat("\n--- 4.3 Test t a Un Campione ---\n")

# Esempio: Verificare se la resistenza media è diversa da un valore noto (es. 50 MPa)
if ("Resistenza" %in% names(trazione)) {
  mu0 <- 50  # Valore di riferimento

  cat("H0: μ =", mu0, "\n")
  cat("H1: μ ≠", mu0, "\n\n")

  test_t <- t.test(trazione$Resistenza, mu = mu0)
  print(test_t)

  cat("\nInterpretazione:\n")
  cat("Media campionaria:", round(mean(trazione$Resistenza), 2), "\n")
  cat("t-statistic:", round(test_t$statistic, 3), "\n")
  cat("p-value:", format(test_t$p.value, scientific = TRUE), "\n")
  cat("IC 95%: [", round(test_t$conf.int[1], 2), ",",
      round(test_t$conf.int[2], 2), "]\n")

  if (test_t$p.value < 0.05) {
    cat("\n✅ Rifiuto H0: la media è significativamente diversa da", mu0, "\n")
  } else {
    cat("\n❌ Non rifiuto H0: evidenza insufficiente\n")
  }
}

# 4.4 Test t a due campioni indipendenti
cat("\n--- 4.4 Test t a Due Campioni ---\n")

if ("Materiale" %in% names(trazione) && "Resistenza" %in% names(trazione)) {
  # Separa gruppi
  materiali <- unique(trazione$Materiale)

  if (length(materiali) >= 2) {
    gruppo_A <- trazione$Resistenza[trazione$Materiale == materiali[1]]
    gruppo_B <- trazione$Resistenza[trazione$Materiale == materiali[2]]

    cat("Confronto:", materiali[1], "vs", materiali[2], "\n\n")

    # Test
    test_2sample <- t.test(gruppo_A, gruppo_B, var.equal = TRUE)
    print(test_2sample)

    # Visualizzazione
    boxplot(Resistenza ~ Materiale, data = trazione,
            main = "Resistenza per Materiale",
            ylab = "Resistenza (MPa)",
            col = c("skyblue", "salmon"))

    # Aggiungi medie
    means <- tapply(trazione$Resistenza, trazione$Materiale, mean)
    points(1:2, means[1:2], pch = 19, col = "red", cex = 1.5)
  }
}

# 4.5 Intervalli di Confidenza
cat("\n--- 4.5 Intervalli di Confidenza ---\n")

if ("Resistenza" %in% names(trazione)) {
  # IC 90%, 95%, 99%
  for (conf_level in c(0.90, 0.95, 0.99)) {
    ic <- t.test(trazione$Resistenza, conf.level = conf_level)$conf.int
    cat("IC", conf_level * 100, "%: [", round(ic[1], 2), ",",
        round(ic[2], 2), "]\n")
  }

  cat("\nInterpretazione:\n")
  cat("Siamo confidenti al 95% che μ ∈ IC 95%\n")
  cat("Intervallo più ampio → maggiore confidenza\n")
}

# 4.6 Test unilaterale
cat("\n--- 4.6 Test Unilaterale ---\n")

if ("Resistenza" %in% names(trazione)) {
  mu0 <- 50

  # Test: H1: μ > 50 (greater)
  cat("\nH0: μ = 50 vs H1: μ > 50\n")
  test_greater <- t.test(trazione$Resistenza, mu = mu0, alternative = "greater")
  print(test_greater)

  # Test: H1: μ < 50 (less)
  cat("\nH0: μ = 50 vs H1: μ < 50\n")
  test_less <- t.test(trazione$Resistenza, mu = mu0, alternative = "less")
  print(test_less)
}


# ============================================================================
# ESERCIZIO 5: COMPRESSIONE - Analisi Completa
# ============================================================================
# Dataset: compressione.RData
# Obiettivo: Analisi esplorativa e inferenziale completa

cat("\n\n========== ESERCIZIO 5: COMPRESSIONE ==========\n")

# Carica dataset
load("./input/rData/compressione.RData")

# 5.1 Esplorazione completa
cat("\n--- 5.1 Esplorazione Completa ---\n")
str(compressione)
summary(compressione)

# 5.2 Analisi per variabile
cat("\n--- 5.2 Analisi Variabili ---\n")

numeric_cols <- names(compressione[sapply(compressione, is.numeric)])

for (var in numeric_cols) {
  cat("\n========", var, "========\n")

  # Statistiche
  print(stats_complete(compressione[[var]]))

  # Histogram + QQ plot
  par(mfrow = c(1, 2))

  hist(compressione[[var]],
       main = paste("Distribuzione -", var),
       xlab = var,
       col = "steelblue",
       border = "white")

  qqnorm(compressione[[var]], main = paste("Q-Q Plot -", var))
  qqline(compressione[[var]], col = "red", lwd = 2)

  par(mfrow = c(1, 1))

  # Test normalità
  if (length(compressione[[var]]) >= 3 && length(compressione[[var]]) <= 5000) {
    shap <- shapiro.test(compressione[[var]])
    cat("\nShapiro-Wilk: W =", round(shap$statistic, 4),
        ", p =", round(shap$p.value, 4), "\n")
  }
}

# 5.3 Confronti tra gruppi
if (any(sapply(compressione, is.factor) | sapply(compressione, is.character))) {
  cat("\n--- 5.3 Analisi per Gruppi ---\n")

  factor_cols <- names(compressione[sapply(compressione, function(x) is.factor(x) | is.character(x))])

  for (factor_var in factor_cols) {
    for (num_var in numeric_cols) {
      cat("\n", num_var, "per", factor_var, "\n")

      # Statistiche per gruppo
      print(aggregate(compressione[[num_var]] ~ compressione[[factor_var]],
                      FUN = function(x) c(N = length(x), Mean = mean(x), SD = sd(x))))

      # Boxplot
      boxplot(compressione[[num_var]] ~ compressione[[factor_var]],
              main = paste(num_var, "per", factor_var),
              ylab = num_var,
              xlab = factor_var,
              col = rainbow(length(unique(compressione[[factor_var]]))))
    }
  }
}


# ============================================================================
# ESERCIZIO 6: ALBERI - Analisi e Visualizzazioni Avanzate
# ============================================================================
# Dataset: alberi.RData
# Obiettivo: Analisi completa con visualizzazioni professionali

cat("\n\n========== ESERCIZIO 6: ALBERI ==========\n")

# Carica dataset
load("./input/rData/alberi.RData")

# 6.1 Esplorazione
cat("\n--- 6.1 Esplorazione Dataset ---\n")
str(alberi)
head(alberi, 10)
summary(alberi)

# 6.2 Visualizzazioni avanzate
cat("\n--- 6.2 Visualizzazioni Avanzate ---\n")

# Panel di grafici
par(mfrow = c(2, 3), mar = c(4, 4, 2, 1))

numeric_vars_alberi <- alberi[sapply(alberi, is.numeric)]

# Histogrammi con density overlay
for (var in names(numeric_vars_alberi)[1:min(3, length(numeric_vars_alberi))]) {
  hist(alberi[[var]],
       main = var,
       xlab = var,
       col = "lightblue",
       border = "white",
       prob = TRUE)

  lines(density(alberi[[var]], na.rm = TRUE),
        col = "darkblue",
        lwd = 2)
}

# Boxplots
for (var in names(numeric_vars_alberi)[1:min(3, length(numeric_vars_alberi))]) {
  boxplot(alberi[[var]],
          main = var,
          ylab = var,
          col = "lightgreen",
          border = "darkgreen",
          horizontal = TRUE)
}

par(mfrow = c(1, 1))

# 6.3 Scatter plot matrix con correlazioni
cat("\n--- 6.3 Matrice Correlazione ---\n")

if (ncol(numeric_vars_alberi) >= 2) {
  # Funzione per visualizzare correlazioni
  panel.cor <- function(x, y, digits = 2, prefix = "", cex.cor, ...) {
    usr <- par("usr")
    on.exit(par(usr))
    par(usr = c(0, 1, 0, 1))
    r <- cor(x, y, use = "complete.obs")
    txt <- format(c(r, 0.123456789), digits = digits)[1]
    txt <- paste0(prefix, txt)
    text(0.5, 0.5, txt, cex = 1.5 * abs(r))
  }

  pairs(numeric_vars_alberi,
        main = "Scatter Plot Matrix con Correlazioni",
        lower.panel = panel.smooth,
        upper.panel = panel.cor,
        pch = 19,
        col = rgb(0, 0, 1, 0.3))
}

# 6.4 Regressione multipla (se applicabile)
cat("\n--- 6.4 Regressione Multipla ---\n")

if (ncol(numeric_vars_alberi) >= 3) {
  # Esempio: predire prima variabile dalle altre
  var_dipendente <- names(numeric_vars_alberi)[1]
  var_indipendenti <- names(numeric_vars_alberi)[-1]

  formula_str <- paste(var_dipendente, "~", paste(var_indipendenti, collapse = " + "))
  cat("Modello:", formula_str, "\n\n")

  modello_multi <- lm(as.formula(formula_str), data = alberi)
  print(summary(modello_multi))

  # Diagnostica
  par(mfrow = c(2, 2))
  plot(modello_multi, pch = 19, col = rgb(0, 0, 1, 0.5))
  par(mfrow = c(1, 1))

  # Coefficienti con IC
  cat("\nCoefficienti con IC 95%:\n")
  print(confint(modello_multi))
}

# 6.5 Analisi residui
cat("\n--- 6.5 Analisi Residui ---\n")

if (exists("modello_multi")) {
  residui <- residuals(modello_multi)
  residui_std <- rstandard(modello_multi)

  cat("Statistiche residui:\n")
  print(summary(residui))

  # Outlier detection sui residui
  outlier_idx <- which(abs(residui_std) > 3)
  cat("\nOsservazioni con |residui standardizzati| > 3:", length(outlier_idx), "\n")
  if (length(outlier_idx) > 0) {
    cat("Indici:", paste(outlier_idx, collapse = ", "), "\n")
  }

  # Cook's distance
  cook <- cooks.distance(modello_multi)
  influential <- which(cook > 4/length(cook))
  cat("\nPunti influenti (Cook's D > 4/n):", length(influential), "\n")
}

# 6.6 Predizioni
cat("\n--- 6.6 Predizioni ---\n")

if (exists("modello_multi") && ncol(numeric_vars_alberi) >= 2) {
  # Crea dati per predizione (valori medi)
  nuovi_dati <- as.data.frame(lapply(numeric_vars_alberi[-1], median, na.rm = TRUE))

  # Predizione puntuale
  pred_punto <- predict(modello_multi, newdata = nuovi_dati)
  cat("Predizione puntuale:", round(pred_punto, 2), "\n")

  # IC confidenza (media)
  pred_conf <- predict(modello_multi, newdata = nuovi_dati, interval = "confidence")
  cat("IC 95% per la media:\n")
  print(round(pred_conf, 2))

  # IC predizione (singola osservazione)
  pred_pred <- predict(modello_multi, newdata = nuovi_dati, interval = "prediction")
  cat("\nIC 95% per singola osservazione:\n")
  print(round(pred_pred, 2))
}


# ============================================================================
# RIEPILOGO E FORMULE RAPIDE
# ============================================================================

cat("\n\n========== RIEPILOGO FORMULE ==========\n")

cat("
# STATISTICHE DESCRITTIVE
mean(x)              # Media
median(x)            # Mediana
sd(x)                # Deviazione standard
var(x)               # Varianza
quantile(x, p)       # Quantili
IQR(x)               # Range interquartile
range(x)             # Min e Max

# CORRELAZIONE
cor(x, y)            # Coefficiente Pearson
cor.test(x, y)       # Test significatività
cor(df, method='spearman')  # Spearman (non parametrico)

# REGRESSIONE
lm(y ~ x, data=df)   # Modello lineare
summary(modello)     # Riepilogo
coef(modello)        # Coefficienti
predict(modello, newdata)  # Predizioni
confint(modello)     # IC coefficienti

# TEST T
t.test(x, mu=0)      # Un campione
t.test(x, y)         # Due campioni indipendenti
t.test(x, y, paired=TRUE)  # Appaiato

# ANOVA
aov(y ~ gruppo, data=df)   # ANOVA
TukeyHSD(modello)   # Post-hoc

# TEST NORMALITÀ
shapiro.test(x)      # Shapiro-Wilk
qqnorm(x); qqline(x) # Q-Q plot

# VISUALIZZAZIONI
hist(x)              # Istogramma
boxplot(x)           # Box plot
plot(x, y)           # Scatter plot
pairs(df)            # Matrix scatter plot
")

cat("\n========== ESERCIZI COMPLETATI ==========\n")
cat("✅ Esercizio 1: Atleti - Correlazione e Regressione\n")
cat("✅ Esercizio 2: Bosco - Analisi Descrittiva\n")
cat("✅ Esercizio 3: Fertilizzante - ANOVA\n")
cat("✅ Esercizio 4: Trazione - Test Ipotesi\n")
cat("✅ Esercizio 5: Compressione - Analisi Completa\n")
cat("✅ Esercizio 6: Alberi - Visualizzazioni Avanzate\n")
cat("\nBuono studio! 📊\n")
