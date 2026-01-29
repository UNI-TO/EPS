# ═══════════════════════════════════════════════════════════════════
# ESERCIZI GUIDATI - ESAMI GENNAIO 2026
# ═══════════════════════════════════════════════════════════════════
# Dataset dai due turni dell'esame del 16 Gennaio 2026
# ═══════════════════════════════════════════════════════════════════


# ═══════════════════════════════════════════════════════════════════
# ESERCIZIO 1: ATTIVITÀ EXTRACURRICOLARI
# Dataset: attivita.RData (Esame 16 Gen 2026 - Turno 1)
# ═══════════════════════════════════════════════════════════════════

cat("\n")
cat("═══════════════════════════════════════════════════════════════════\n")
cat("ESERCIZIO 1: ATTIVITÀ EXTRACURRICOLARI\n")
cat("═══════════════════════════════════════════════════════════════════\n\n")

## Carica il dataset
load("../../input/rData/attivita.RData")

## 1.1 Esplorare la struttura dei dati
cat("--- 1.1 Struttura Dataset ---\n")
str(dati)
head(dati)

## 1.2 Numero osservazioni e valori mancanti
cat("\n--- 1.2 Dimensioni e NA ---\n")
n_obs <- nrow(dati)
n_na <- sum(is.na(dati))
cat("Numero osservazioni:", n_obs, "\n")
cat("Valori mancanti:", n_na, "\n")

## 1.3 Frequenze giorni feriali
cat("\n--- 1.3 Analisi Giorni ---\n")
tabella_giorni <- table(dati$giorno, useNA = "ifany")
print(tabella_giorni)

# Frequenza e frequenza relativa giorni feriali (escludendo NA)
freq_feriali <- sum(dati$giorno == "feriali", na.rm = TRUE)
freq_rel_feriali <- freq_feriali / sum(!is.na(dati$giorno))
cat("\nFrequenza giorni feriali:", freq_feriali, "\n")
cat("Frequenza relativa feriali:", round(freq_rel_feriali, 4), "\n")

## 1.4 Tabella di contingenza completa
cat("\n--- 1.4 Tabella di Contingenza ---\n")
tabella <- table(dati$attivita, dati$giorno, useNA = "ifany")
print(tabella)

# Frequenza attività sportive nei giorni festivi
freq_sport_festivi <- tabella["sportiva", "festivo"]
cat("\nFrequenza attività sportive nei giorni festivi:", freq_sport_festivi, "\n")

## 1.5 Grafici esplorativi
cat("\n--- 1.5 Grafici ---\n")
par(mfrow = c(2, 2))

# Barplot giorni
barplot(table(dati$giorno),
        main = "Distribuzione Giorni",
        col = c("lightblue", "lightcoral"),
        ylab = "Frequenza")

# Barplot attività
barplot(table(dati$attivita),
        main = "Distribuzione Attività",
        col = c("lightgreen", "lightyellow", "lightpink"),
        ylab = "Frequenza")

# Barplot affiancati
barplot(tabella,
        beside = TRUE,
        col = c("red", "blue", "green"),
        legend = rownames(tabella),
        main = "Attività per Giorno",
        ylab = "Frequenza")

# Mosaicplot
mosaicplot(tabella,
           main = "Mosaicplot Attività × Giorno",
           color = TRUE)

par(mfrow = c(1, 1))

## 1.6 TEST DI IPOTESI - Domanda dell'esame:
## "Gli studenti scelgono giorni feriali e festivi con la stessa probabilità?"
cat("\n--- 1.6 Test Chi-quadro Bontà del Fit ---\n")
cat("Domanda: Gli studenti scelgono giorni feriali e festivi")
cat("con la stessa probabilità (p = 1/2)?\n\n")

# H_0: p_feriali = p_festivi = 1/2
# H_1: la distribuzione è diversa

test_bonta <- chisq.test(table(dati$giorno), p = c(1/2, 1/2))
cat("Risultati del test:\n")
print(test_bonta)

cat("\nFrequenze osservate:", test_bonta$observed, "\n")
cat("Frequenze attese:", test_bonta$expected, "\n")
cat("Statistica chi-quadro:", test_bonta$statistic, "\n")
cat("P-value:", test_bonta$p.value, "\n")

# Verifica regola di Cochran
cat("\n--- Regola di Cochran ---\n")
cat("Tutte le frequenze attese >= 5?\n")
if (all(test_bonta$expected >= 5)) {
  cat("✓ SÌ - Il test è affidabile\n")
} else {
  cat("✗ NO - Il test potrebbe non essere affidabile\n")
}

# Interpretazione con α = 0.01
cat("\n--- Interpretazione (α = 0.01) ---\n")
if (test_bonta$p.value < 0.01) {
  cat("p-value (", round(test_bonta$p.value, 4), ") < 0.01\n")
  cat("→ RIFIUTO H_0\n")
  cat("→ La distribuzione NON è p_1 = p_2 = 1/2\n")
} else {
  cat("p-value (", round(test_bonta$p.value, 4), ") >= 0.01\n")
  cat("→ NON RIFIUTO H_0\n")
  cat("→ La distribuzione È compatibile con p_1 = p_2 = 1/2\n")
}

## 1.7 Test alternativo: Chi-quadro per l'indipendenza
cat("\n--- 1.7 Test Chi-quadro Indipendenza (bonus) ---\n")
cat("Domanda: Tipo di attività e giorno sono indipendenti?\n\n")

test_indipendenza <- chisq.test(tabella)
print(test_indipendenza)

cat("\nFrequenze attese:\n")
print(round(test_indipendenza$expected, 2))

if (test_indipendenza$p.value < 0.05) {
  cat("\n→ Le variabili NON sono indipendenti (p < 0.05)\n")
} else {
  cat("\n→ Le variabili SONO indipendenti (p >= 0.05)\n")
}


# ═══════════════════════════════════════════════════════════════════
# ESERCIZIO 2: STREAMING E GRADIMENTO
# Dataset: streaming.RData (Esame 16 Gen 2026 - Turno 1)
# ═══════════════════════════════════════════════════════════════════

cat("\n\n")
cat("═══════════════════════════════════════════════════════════════════\n")
cat("ESERCIZIO 2: STREAMING E GRADIMENTO\n")
cat("═══════════════════════════════════════════════════════════════════\n\n")

## Carica il dataset
load("../../input/rData/streaming.RData")

## 2.1 Esplorare i dati
cat("--- 2.1 Struttura Dataset ---\n")
str(dati)
summary(dati)

## 2.2 Numero utenti per servizio
cat("\n--- 2.2 Utenti per Servizio ---\n")
tabella_servizi <- table(dati$scelta)
print(tabella_servizi)

n_X <- sum(dati$scelta == "X")
n_Y <- sum(dati$scelta == "Y")
cat("\nUtenti servizio X:", n_X, "\n")
cat("Utenti servizio Y:", n_Y, "\n")

## 2.3 Statistiche descrittive gradimento per servizio X
cat("\n--- 2.3 Gradimento Servizio X ---\n")
gradimento_X <- dati$gradimento[dati$scelta == "X"]

media_X <- mean(gradimento_X)
sd_X <- sd(gradimento_X)
mediana_X <- median(gradimento_X)

cat("Media gradimento X:", round(media_X, 4), "\n")
cat("Dev. standard X:", round(sd_X, 4), "\n")
cat("Mediana X:", round(mediana_X, 4), "\n")

## 2.4 Quantile 15% per servizio X
cat("\n--- 2.4 Quantili Servizio X ---\n")
q15_X <- quantile(gradimento_X, 0.15)
cat("Il 15% degli utenti meno soddisfatti del servizio X")
cat("ha riportato un indice < ", round(q15_X, 4), "\n")

## 2.5 Statistiche per servizio Y
cat("\n--- 2.5 Gradimento Servizio Y ---\n")
gradimento_Y <- dati$gradimento[dati$scelta == "Y"]

media_Y <- mean(gradimento_Y)
sd_Y <- sd(gradimento_Y)

cat("Media gradimento Y:", round(media_Y, 4), "\n")
cat("Dev. standard Y:", round(sd_Y, 4), "\n")

## 2.6 Boxplot comparativo
cat("\n--- 2.6 Confronto Visivo ---\n")
par(mfrow = c(1, 2))

boxplot(gradimento ~ scelta, data = dati,
        main = "Gradimento per Servizio",
        xlab = "Servizio",
        ylab = "Indice Gradimento",
        col = c("lightblue", "lightcoral"))

hist(gradimento_X,
     main = "Distribuzione Gradimento X",
     xlab = "Gradimento",
     col = "lightblue",
     breaks = 15,
     xlim = c(0, 1))

par(mfrow = c(1, 1))

# Verifica sovrapposizione boxplot
cat("\nLe scatole dei boxplot si sovrappongono?\n")
q1_X <- quantile(gradimento_X, 0.25)
q3_X <- quantile(gradimento_X, 0.75)
q1_Y <- quantile(gradimento_Y, 0.25)
q3_Y <- quantile(gradimento_Y, 0.75)

sovrapposizione <- (q1_X <= q3_Y) && (q1_Y <= q3_X)
cat("→", ifelse(sovrapposizione, "SÌ", "NO"), "\n")

## 2.7 TEST DI IPOTESI
cat("\n--- 2.7 Test t per Differenza di Medie ---\n")
cat("Domanda: La soddisfazione media di X è più alta di Y?\n\n")

# H_0: μ_X = μ_Y
# H_1: μ_X > μ_Y

test_streaming <- t.test(gradimento_X, gradimento_Y,
                         alternative = "greater")

cat("Risultati del test:\n")
print(test_streaming)

cat("\nP-value:", test_streaming$p.value, "\n")
cat("Gradi di libertà:", test_streaming$parameter, "\n")
cat("Differenza medie:", mean(gradimento_X) - mean(gradimento_Y), "\n")

# Interpretazione con α = 0.01
cat("\n--- Interpretazione (α = 0.01) ---\n")
if (test_streaming$p.value < 0.01) {
  cat("p-value < 0.01 → RIFIUTO H_0\n")
  cat("→ La soddisfazione di X È significativamente maggiore di Y\n")
} else {
  cat("p-value >= 0.01 → NON RIFIUTO H_0\n")
  cat("→ Non c'è evidenza che X sia migliore di Y\n")
}

## 2.8 Intervallo di confidenza
cat("\n--- 2.8 Intervallo di Confidenza 95% ---\n")
ic_diff <- t.test(gradimento_X, gradimento_Y)$conf.int
cat("IC 95% per (μ_X - μ_Y): [",
    round(ic_diff[1], 4), ",", round(ic_diff[2], 4), "]\n")


# ═══════════════════════════════════════════════════════════════════
# ESERCIZIO 3: ALLENAMENTO E CAPACITÀ CARDIORESPIRATORIA
# Dataset: allenamento.RData (Esame 16 Gen 2026 - Turno 2)
# ═══════════════════════════════════════════════════════════════════

cat("\n\n")
cat("═══════════════════════════════════════════════════════════════════\n")
cat("ESERCIZIO 3: ALLENAMENTO E CAPACITÀ CARDIORESPIRATORIA\n")
cat("═══════════════════════════════════════════════════════════════════\n\n")

## Carica il dataset
load("../../input/rData/allenamento.RData")

## 3.1 Info generali
cat("--- 3.1 Informazioni Dataset ---\n")
n_atleti <- nrow(dati)
n_na <- sum(is.na(dati))

cat("Numero atleti:", n_atleti, "\n")
cat("Valori mancanti:", n_na, "\n")

## 3.2 Statistiche per chi si allena 2 ore
cat("\n--- 3.2 Atleti con 2 ore di Allenamento ---\n")
cardio_2h <- dati$cardio[dati$allenamento == 2]

media_2h <- mean(cardio_2h)
sd_2h <- sd(cardio_2h)

cat("N atleti con 2h:", length(cardio_2h), "\n")
cat("Capacità media:", round(media_2h, 4), "ml/kg/min\n")
cat("Dev. standard:", round(sd_2h, 4), "\n")

## 3.3 Quantile 97% (top 3%)
cat("\n--- 3.3 Atleti con Capacità più Alta ---\n")
q97 <- quantile(dati$cardio, 0.97)
cat("Il 3% degli atleti con capacità più alta ha capacità > ",
    round(q97, 2), "ml/kg/min\n")

## 3.4 Boxplot comparativo per ore allenamento
cat("\n--- 3.4 Confronto per Ore Allenamento ---\n")
par(mfrow = c(2, 2))

boxplot(cardio ~ allenamento, data = dati,
        main = "Capacità per Ore Allenamento",
        xlab = "Ore settimanali",
        ylab = "Capacità (ml/kg/min)",
        col = rainbow(length(unique(dati$allenamento))))

# Boxplot specifico 2h vs 3h
dati_2_3 <- dati[dati$allenamento %in% c(2, 3), ]
boxplot(cardio ~ allenamento, data = dati_2_3,
        main = "Confronto 2h vs 3h",
        xlab = "Ore",
        ylab = "Capacità",
        col = c("lightblue", "lightcoral"))

# Scatterplot
plot(dati$allenamento, dati$cardio,
     main = "Allenamento vs Capacità",
     xlab = "Ore allenamento",
     ylab = "Capacità (ml/kg/min)",
     pch = 19,
     col = rgb(0, 0, 1, 0.3))

# Istogramma capacità
hist(dati$cardio,
     main = "Distribuzione Capacità",
     xlab = "Capacità (ml/kg/min)",
     col = "lightgreen",
     breaks = 30)

par(mfrow = c(1, 1))

# Verifica boxplot
cat("\nIl 50° percentile (mediana) di chi si allena 3h")
cat("è maggiore del 75° percentile di chi si allena 2h?\n")
med_3h <- median(dati$cardio[dati$allenamento == 3])
q75_2h <- quantile(dati$cardio[dati$allenamento == 2], 0.75)
cat("Mediana 3h:", round(med_3h, 2), "\n")
cat("Q3 2h:", round(q75_2h, 2), "\n")
cat("→", ifelse(med_3h > q75_2h, "SÌ", "NO"), "\n")

## 3.5 CORRELAZIONE
cat("\n--- 3.5 Correlazione Allenamento - Capacità ---\n")
cor_test <- cor.test(dati$allenamento, dati$cardio)

cat("Correlazione r:", round(cor_test$estimate, 4), "\n")
cat("P-value:", cor_test$p.value, "\n")

if (cor_test$p.value < 0.01) {
  cat("\n→ La correlazione è SIGNIFICATIVAMENTE NON NULLA (p < 0.01)\n")
  if (cor_test$estimate > 0.7) {
    cat("→ Correlazione FORTE e positiva\n")
  }
} else {
  cat("\n→ La correlazione NON è significativa\n")
}

## 3.6 REGRESSIONE LINEARE
cat("\n--- 3.6 Regressione Lineare: cardio ~ allenamento ---\n")
modello <- lm(cardio ~ allenamento, data = dati)

cat("\nRisultati regressione:\n")
summary(modello)

# Coefficienti
a <- coef(modello)[2]  # slope (pendenza)
b <- coef(modello)[1]  # intercept (intercetta)

cat("\nEquazione retta: cardio = ", round(b, 4), " + ",
    round(a, 4), " × allenamento\n", sep = "")

cat("\nInterpretazione:\n")
cat("- Intercetta (b):", round(b, 4), "\n")
cat("  → Capacità con 0 ore di allenamento\n")
cat("- Pendenza (a):", round(a, 4), "\n")
cat("  → Per ogni ora in più di allenamento,")
cat(" la capacità aumenta di ~", round(a, 2), " ml/kg/min\n")

# R²
r2 <- summary(modello)$r.squared
cat("\nR² =", round(r2, 4), "\n")
cat("→ Il modello spiega", round(r2 * 100, 2), "% della varianza\n")

## 3.7 Grafico regressione
cat("\n--- 3.7 Grafico Regressione ---\n")
plot(dati$allenamento, dati$cardio,
     main = "Regressione Lineare",
     xlab = "Ore allenamento settimanale",
     ylab = "Capacità cardiorespiratoria (ml/kg/min)",
     pch = 19,
     col = rgb(0, 0.5, 1, 0.4),
     cex = 0.8)
abline(modello, col = "red", lwd = 3)

# Aggiungi equazione al grafico
eq <- paste0("y = ", round(b, 2), " + ", round(a, 2), "x")
r2_text <- paste0("R² = ", round(r2, 4))
legend("topleft",
       legend = c(eq, r2_text),
       bty = "n",
       cex = 1.2)

## 3.8 Diagnostica residui
cat("\n--- 3.8 Diagnostica Residui ---\n")
par(mfrow = c(2, 2))
plot(modello)
par(mfrow = c(1, 1))


# ═══════════════════════════════════════════════════════════════════
# ESERCIZIO 4: CONSUMO ENERGETICO E RISPARMIO
# Dataset: consumo.RData (Esame 16 Gen 2026 - Turno 2)
# ═══════════════════════════════════════════════════════════════════

cat("\n\n")
cat("═══════════════════════════════════════════════════════════════════\n")
cat("ESERCIZIO 4: CONSUMO ENERGETICO E RISPARMIO\n")
cat("═══════════════════════════════════════════════════════════════════\n\n")

## Carica il dataset
load("../../input/rData/consumo.RData")

## 4.1 Esplorare i dati
cat("--- 4.1 Struttura Dataset ---\n")
str(dati)
head(dati)

## 4.2 Conteggio abitazioni con/senza risparmio e NA
cat("\n--- 4.2 Conteggio Abitazioni ---\n")
tabella_risparmio <- table(dati$risparmio, useNA = "ifany")
print(tabella_risparmio)

n_con_risparmio <- sum(dati$risparmio == "S", na.rm = TRUE)
n_na <- sum(is.na(dati))

cat("\nAbitazioni con risparmio (S):", n_con_risparmio, "\n")
cat("Valori mancanti totali:", n_na, "\n")

## 4.3 Statistiche consumo per abitazioni con risparmio
cat("\n--- 4.3 Consumo Abitazioni con Risparmio ---\n")
consumo_S <- dati$consumo[dati$risparmio == "S"]

media_S <- mean(consumo_S, na.rm = TRUE)
sd_S <- sd(consumo_S, na.rm = TRUE)

cat("N abitazioni:", length(consumo_S[!is.na(consumo_S)]), "\n")
cat("Consumo medio:", round(media_S, 4), "kWh\n")
cat("Dev. standard:", round(sd_S, 4), "\n")

## 4.4 Statistiche per abitazioni senza risparmio
cat("\n--- 4.4 Consumo Abitazioni senza Risparmio ---\n")
consumo_N <- dati$consumo[dati$risparmio == "N"]

media_N <- mean(consumo_N, na.rm = TRUE)
sd_N <- sd(consumo_N, na.rm = TRUE)

cat("Consumo medio:", round(media_N, 4), "kWh\n")
cat("Dev. standard:", round(sd_N, 4), "\n")

## 4.5 Quantile 90% (top 10% consuma di più)
cat("\n--- 4.5 Abitazioni con Consumo più Alto ---\n")
q90 <- quantile(dati$consumo, 0.9, na.rm = TRUE)
cat("Il 10% delle abitazioni con consumo più alto consuma > ",
    round(q90, 2), " kWh\n")

## 4.6 Grafici
cat("\n--- 4.6 Grafici Esplorativi ---\n")
par(mfrow = c(2, 2))

# Boxplot per risparmio
boxplot(consumo ~ risparmio, data = dati,
        main = "Consumo per Tipo Risparmio",
        xlab = "Risparmio energetico",
        ylab = "Consumo (kWh)",
        col = c("lightcoral", "lightgreen"))

# Istogramma consumo
hist(dati$consumo,
     main = "Distribuzione Consumo",
     xlab = "Consumo (kWh)",
     col = "lightblue",
     breaks = 20)

# Barplot risparmio
barplot(table(dati$risparmio),
        main = "Abitazioni con/senza Risparmio",
        col = c("salmon", "lightgreen"),
        ylab = "Frequenza")

# Densità
plot(density(dati$consumo, na.rm = TRUE),
     main = "Densità Consumo",
     xlab = "Consumo (kWh)",
     col = "darkblue",
     lwd = 2)

par(mfrow = c(1, 1))

## 4.7 TEST DI IPOTESI SULLA PROPORZIONE
cat("\n--- 4.7 Test su Proporzione ---\n")
cat("Domanda: Più del 40% delle abitazioni ha dispositivi di risparmio?\n\n")

# Conta totale (escludendo NA nella variabile risparmio)
totale_validi <- sum(!is.na(dati$risparmio))

# H_0: p = 0.4
# H_1: p > 0.4

test_prop <- binom.test(n_con_risparmio,
                        totale_validi,
                        p = 0.4,
                        alternative = "greater")

cat("Risultati test binomiale:\n")
print(test_prop)

cat("\nSuccessi (abitazioni con S):", n_con_risparmio, "\n")
cat("Totale:", totale_validi, "\n")
cat("Proporzione osservata:", round(test_prop$estimate, 4), "\n")
cat("P-value:", test_prop$p.value, "\n")

# Interpretazione con α = 0.05
cat("\n--- Interpretazione (α = 0.05) ---\n")
if (test_prop$p.value < 0.05) {
  cat("p-value < 0.05 → RIFIUTO H_0\n")
  cat("→ C'è evidenza che PIÙ DEL 40% delle abitazioni")
  cat(" ha dispositivi di risparmio\n")
} else {
  cat("p-value >= 0.05 → NON RIFIUTO H_0\n")
  cat("→ Non c'è evidenza sufficiente per affermare che > 40%\n")
}

## 4.8 Test t: differenza consumo con/senza risparmio (bonus)
cat("\n--- 4.8 Test t: Consumo S vs N (bonus) ---\n")
test_consumo <- t.test(consumo_S, consumo_N,
                       alternative = "less")

cat("P-value:", test_consumo$p.value, "\n")

if (test_consumo$p.value < 0.05) {
  cat("→ Le abitazioni CON risparmio consumano")
  cat(" significativamente MENO (p < 0.05)\n")
} else {
  cat("→ Non c'è evidenza di differenza significativa\n")
}


# ═══════════════════════════════════════════════════════════════════
# RIEPILOGO FINALE
# ═══════════════════════════════════════════════════════════════════

cat("\n\n")
cat("═══════════════════════════════════════════════════════════════════\n")
cat("✅ TUTTI GLI ESERCIZI COMPLETATI!\n")
cat("═══════════════════════════════════════════════════════════════════\n\n")

cat("Hai praticato con i dataset degli esami del 16 Gennaio 2026:\n\n")

cat("📊 ESERCIZIO 1 - ATTIVITÀ EXTRACURRICOLARI\n")
cat("   ✓ Tabelle di contingenza\n")
cat("   ✓ Test Chi-quadro per bontà del fit\n")
cat("   ✓ Test Chi-quadro per indipendenza\n")
cat("   ✓ Regola di Cochran\n\n")

cat("📊 ESERCIZIO 2 - STREAMING E GRADIMENTO\n")
cat("   ✓ Statistiche descrittive per gruppo\n")
cat("   ✓ Test t per differenza di medie (campioni indipendenti)\n")
cat("   ✓ Boxplot comparativi\n")
cat("   ✓ Intervalli di confidenza\n\n")

cat("📊 ESERCIZIO 3 - ALLENAMENTO E CAPACITÀ CARDIORESPIRATORIA\n")
cat("   ✓ Correlazione e test di significatività\n")
cat("   ✓ Regressione lineare semplice\n")
cat("   ✓ Interpretazione coefficienti (a, b, R²)\n")
cat("   ✓ Diagnostica residui\n\n")

cat("📊 ESERCIZIO 4 - CONSUMO ENERGETICO E RISPARMIO\n")
cat("   ✓ Test binomiale per proporzioni\n")
cat("   ✓ Analisi descrittiva per gruppo\n")
cat("   ✓ Gestione valori mancanti\n")
cat("   ✓ Quantili e outlier\n\n")

cat("═══════════════════════════════════════════════════════════════════\n")
cat("💡 CONCETTI CHIAVE PRATICATI:\n")
cat("═══════════════════════════════════════════════════════════════════\n")
cat("  • Test Chi-quadro (bontà fit vs indipendenza)\n")
cat("  • Test t (indipendenti vs appaiati)\n")
cat("  • Correlazione e regressione lineare\n")
cat("  • Test per proporzioni (binom.test)\n")
cat("  • Interpretazione p-value e decisioni statistiche\n")
cat("  • Grafici esplorativi e diagnostici\n")
cat("  • Gestione NA e dati mancanti\n\n")

cat("🎯 In bocca al lupo per l'esame! 📚\n")
cat("═══════════════════════════════════════════════════════════════════\n")