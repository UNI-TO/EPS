# ═══════════════════════════════════════════════════════════════════
# ESERCIZI GUIDATI CON I NUOVI DATASET
# ═══════════════════════════════════════════════════════════════════
# Esercizi pratici per l'esame EPS con soluzioni complete
# ═══════════════════════════════════════════════════════════════════


# ═══════════════════════════════════════════════════════════════════
# ESERCIZIO 1: STUDENTI E VOTI
# ═══════════════════════════════════════════════════════════════════

## Carica il dataset
load("../../input/rData/studenti.RData")

## 1.1 Esplora i dati
head(studenti)
str(studenti)
summary(studenti)

## 1.2 Calcola statistiche descrittive per VotoEsame
media_voti <- mean(studenti$VotoEsame)
mediana_voti <- median(studenti$VotoEsame)
sd_voti <- sd(studenti$VotoEsame)
IQR_voti <- IQR(studenti$VotoEsame)

cat("Media voti:", media_voti, "\n")
cat("Mediana voti:", mediana_voti, "\n")
cat("Deviazione standard:", sd_voti, "\n")
cat("IQR:", IQR_voti, "\n")

## 1.3 Calcola il 75° percentile dei voti
percentile_75 <- quantile(studenti$VotoEsame, 0.75)
cat("75° percentile:", percentile_75, "\n")

## 1.4 Identifica outlier con metodo Tukey
Q1 <- quantile(studenti$VotoEsame, 0.25)
Q3 <- quantile(studenti$VotoEsame, 0.75)
limite_inf <- Q1 - 1.5 * IQR_voti
limite_sup <- Q3 + 1.5 * IQR_voti

outliers <- studenti$VotoEsame[studenti$VotoEsame < limite_inf |
                               studenti$VotoEsame > limite_sup]
cat("Outlier trovati:", length(outliers), "\n")

## 1.5 Confronta voti tra corsi
voti_informatica <- studenti$VotoEsame[studenti$Corso == "Informatica"]
voti_matematica <- studenti$VotoEsame[studenti$Corso == "Matematica"]
voti_fisica <- studenti$VotoEsame[studenti$Corso == "Fisica"]

cat("Media Informatica:", mean(voti_informatica), "\n")
cat("Media Matematica:", mean(voti_matematica), "\n")
cat("Media Fisica:", mean(voti_fisica), "\n")

## 1.6 Test t: Informatica vs Matematica
test_corsi <- t.test(voti_informatica, voti_matematica, var.equal = FALSE)
cat("\nTest t Informatica vs Matematica:\n")
print(test_corsi)

if (test_corsi$p.value < 0.05) {
  cat("→ C'è differenza significativa tra i corsi (p < 0.05)\n")
} else {
  cat("→ Non c'è differenza significativa (p ≥ 0.05)\n")
}

## 1.7 Test correlazione: Ore studio vs Voto
cor_test <- cor.test(studenti$OreDiStudio, studenti$VotoEsame)
cat("\nCorrelazione Ore studio - Voto:\n")
cat("r =", cor_test$estimate, "\n")
cat("p-value =", cor_test$p.value, "\n")

## 1.8 Regressione lineare: Voto ~ Ore studio
modello <- lm(VotoEsame ~ OreDiStudio, data = studenti)
summary(modello)

## 1.9 Grafici
par(mfrow = c(2, 2))

# Boxplot voti
boxplot(studenti$VotoEsame,
        main = "Distribuzione Voti",
        ylab = "Voto",
        col = "lightblue")

# Boxplot per corso
boxplot(VotoEsame ~ Corso, data = studenti,
        main = "Voti per Corso",
        col = c("red", "green", "blue"))

# Scatterplot ore vs voto
plot(studenti$OreDiStudio, studenti$VotoEsame,
     main = "Ore Studio vs Voto",
     xlab = "Ore di Studio",
     ylab = "Voto",
     pch = 19,
     col = "darkblue")
abline(modello, col = "red", lwd = 2)

# Istogramma voti
hist(studenti$VotoEsame,
     main = "Distribuzione Voti",
     xlab = "Voto",
     col = "lightgreen",
     breaks = 15)

par(mfrow = c(1, 1))


# ═══════════════════════════════════════════════════════════════════
# ESERCIZIO 2: VENDITE NEGOZI
# ═══════════════════════════════════════════════════════════════════

load("../../input/rData/vendite.RData")

## 2.1 Statistiche descrittive importi
cat("\n=== VENDITE ===\n")
summary(vendite$Importo)

## 2.2 Importo medio per città
importo_per_citta <- aggregate(Importo ~ Citta, data = vendite, FUN = mean)
print(importo_per_citta)

## 2.3 Proporzione vendite per categoria
tabella_categoria <- table(vendite$Categoria)
prop_categoria <- prop.table(tabella_categoria)
cat("\nProporzioni per categoria:\n")
print(prop_categoria)

## 2.4 Test chi-quadrato: Città vs Categoria
tabella_contingenza <- table(vendite$Citta, vendite$Categoria)
cat("\nTabella di contingenza Città x Categoria:\n")
print(tabella_contingenza)

test_chi <- chisq.test(tabella_contingenza)
cat("\nTest Chi-quadrato indipendenza:\n")
print(test_chi)

if (test_chi$p.value < 0.05) {
  cat("→ Città e Categoria sono associate (p < 0.05)\n")
} else {
  cat("→ Città e Categoria sono indipendenti (p ≥ 0.05)\n")
}

## 2.5 Filtra vendite Milano sopra 200€
vendite_milano <- vendite[vendite$Citta == "Milano" & vendite$Importo > 200, ]
cat("\nVendite Milano > 200€:", nrow(vendite_milano), "\n")

## 2.6 Confronta importo Elettronica vs Abbigliamento
importo_elettronica <- vendite$Importo[vendite$Categoria == "Elettronica"]
importo_abbigliamento <- vendite$Importo[vendite$Categoria == "Abbigliamento"]

test_categorie <- t.test(importo_elettronica, importo_abbigliamento)
cat("\nTest t Elettronica vs Abbigliamento:\n")
print(test_categorie)


# ═══════════════════════════════════════════════════════════════════
# ESERCIZIO 3: TEMPERATURA (PAIRED T-TEST)
# ═══════════════════════════════════════════════════════════════════

load("../../input/rData/temperatura.RData")

cat("\n=== TEMPERATURA LABORATORI ===\n")

## 3.1 Test t appaiato: PRE vs POST
test_paired <- t.test(temperatura$TemperaturaPostTrattamento,
                      temperatura$TemperaturaPreTrattamento,
                      paired = TRUE,
                      alternative = "greater")

cat("\nTest t appaiato (POST > PRE):\n")
print(test_paired)

if (test_paired$p.value < 0.05) {
  cat("→ La temperatura è aumentata significativamente (p < 0.05)\n")
}

## 3.2 Calcola differenze
differenze <- temperatura$TemperaturaPostTrattamento -
              temperatura$TemperaturaPreTrattamento

cat("\nStatistiche differenze (POST - PRE):\n")
cat("Media differenza:", mean(differenze), "°C\n")
cat("SD differenza:", sd(differenze), "°C\n")

## 3.3 Confronta laboratori (ANOVA)
# Solo per temperature PRE
anova_lab <- aov(TemperaturaPreTrattamento ~ Laboratorio, data = temperatura)
cat("\nANOVA tra laboratori (temperature PRE):\n")
summary(anova_lab)

## 3.4 Test post-hoc (Tukey HSD) se ANOVA significativa
if (summary(anova_lab)[[1]][["Pr(>F)"]][1] < 0.05) {
  tukey <- TukeyHSD(anova_lab)
  cat("\nTest post-hoc Tukey:\n")
  print(tukey)
}

## 3.5 Grafici
par(mfrow = c(2, 2))

# Boxplot differenze
boxplot(differenze,
        main = "Differenze Temperatura (POST - PRE)",
        ylab = "Δ Temperatura (°C)",
        col = "orange")
abline(h = 0, col = "red", lty = 2)

# Boxplot per laboratorio
boxplot(TemperaturaPreTrattamento ~ Laboratorio,
        data = temperatura,
        main = "Temperature PRE per Laboratorio",
        col = c("red", "green", "blue"))

# Paired plot (prima coppia di obs)
temp_lab_a <- temperatura[temperatura$Laboratorio == "Lab_A", ]
plot(1:nrow(temp_lab_a),
     temp_lab_a$TemperaturaPreTrattamento,
     type = "b",
     col = "blue",
     ylim = c(15, 35),
     main = "Lab A: PRE vs POST",
     ylab = "Temperatura (°C)",
     xlab = "Osservazione")
lines(1:nrow(temp_lab_a),
      temp_lab_a$TemperaturaPostTrattamento,
      type = "b",
      col = "red")
legend("topleft", c("PRE", "POST"), col = c("blue", "red"), lty = 1)

# Istogramma differenze
hist(differenze,
     main = "Distribuzione Differenze",
     xlab = "Δ Temperatura (°C)",
     col = "lightblue",
     breaks = 15)

par(mfrow = c(1, 1))


# ═══════════════════════════════════════════════════════════════════
# ESERCIZIO 4: PAZIENTI CLINICA
# ═══════════════════════════════════════════════════════════════════

load("../../input/rData/pazienti.RData")

cat("\n=== PAZIENTI CLINICA ===\n")

## 4.1 Tabella di contingenza: Trattamento vs Miglioramento
tabella_trattamento <- table(pazienti$GruppoTrattamento, pazienti$Migliorato)
cat("\nTabella Trattamento x Miglioramento:\n")
print(tabella_trattamento)

## 4.2 Proporzioni miglioramento per gruppo
prop_miglioramento <- prop.table(tabella_trattamento, margin = 1)
cat("\nProporzioni miglioramento per gruppo:\n")
print(round(prop_miglioramento, 3))

## 4.3 Test chi-quadrato indipendenza
test_chi_pazienti <- chisq.test(tabella_trattamento)
cat("\nTest Chi-quadrato:\n")
print(test_chi_pazienti)

## 4.4 Test proporzione: Farmaco_B meglio di Placebo?
n_farmaco_b <- sum(pazienti$GruppoTrattamento == "Farmaco_B")
migliora_farmaco_b <- sum(pazienti$GruppoTrattamento == "Farmaco_B" &
                          pazienti$Migliorato == "Si")

n_placebo <- sum(pazienti$GruppoTrattamento == "Placebo")
migliora_placebo <- sum(pazienti$GruppoTrattamento == "Placebo" &
                        pazienti$Migliorato == "Si")

test_prop <- prop.test(c(migliora_farmaco_b, migliora_placebo),
                       c(n_farmaco_b, n_placebo),
                       alternative = "greater")
cat("\nTest proporzioni Farmaco_B > Placebo:\n")
print(test_prop)

## 4.5 ANOVA: Riduzione pressione per gruppo
pazienti$Riduzione <- pazienti$PressionePre - pazienti$PressionePost

anova_pressione <- aov(Riduzione ~ GruppoTrattamento, data = pazienti)
cat("\nANOVA riduzione pressione:\n")
summary(anova_pressione)

## 4.6 Medie riduzione per gruppo
medie_riduzione <- aggregate(Riduzione ~ GruppoTrattamento,
                              data = pazienti,
                              FUN = mean)
cat("\nMedie riduzione per gruppo:\n")
print(medie_riduzione)


# ═══════════════════════════════════════════════════════════════════
# ESERCIZIO 5: TEMPI RISPOSTA
# ═══════════════════════════════════════════════════════════════════

load("../../input/rData/tempi_risposta.RData")

cat("\n=== TEMPI RISPOSTA ===\n")

## 5.1 Statistiche per condizione
medie_tempo <- aggregate(TempoRisposta_ms ~ Condizione,
                         data = tempi_risposta,
                         FUN = mean)
cat("\nTempi medi per condizione:\n")
print(medie_tempo)

## 5.2 Test normalità (Shapiro-Wilk)
# I tempi di risposta sono spesso log-normali
shapiro_test <- shapiro.test(tempi_risposta$TempoRisposta_ms)
cat("\nTest normalità Shapiro-Wilk:\n")
print(shapiro_test)

if (shapiro_test$p.value < 0.05) {
  cat("→ Dati NON normali (p < 0.05)\n")
  cat("→ Considera trasformazione log\n")
}

## 5.3 Trasformazione logaritmica
tempi_risposta$LogTempo <- log(tempi_risposta$TempoRisposta_ms)

shapiro_log <- shapiro.test(tempi_risposta$LogTempo)
cat("\nTest normalità su log(Tempo):\n")
print(shapiro_log)

## 5.4 ANOVA su dati trasformati
anova_tempo <- aov(LogTempo ~ Condizione, data = tempi_risposta)
cat("\nANOVA log(Tempo) per Condizione:\n")
summary(anova_tempo)

## 5.5 Test post-hoc
if (summary(anova_tempo)[[1]][["Pr(>F)"]][1] < 0.05) {
  tukey_tempo <- TukeyHSD(anova_tempo)
  cat("\nTest post-hoc Tukey:\n")
  print(tukey_tempo)
}

## 5.6 Proporzione risposte corrette per condizione
prop_corrette <- aggregate(Corretto == "Si" ~ Condizione,
                           data = tempi_risposta,
                           FUN = mean)
names(prop_corrette)[2] <- "Proporzione_Corrette"
cat("\nProporzione risposte corrette:\n")
print(prop_corrette)


# ═══════════════════════════════════════════════════════════════════
# ESERCIZIO 6: PRODUZIONE INDUSTRIALE
# ═══════════════════════════════════════════════════════════════════

load("../../input/rData/produzione.RData")

cat("\n=== PRODUZIONE INDUSTRIALE ===\n")

## 6.1 Tasso difetti
produzione$TassoDifetti <- produzione$PezziDifettosi / produzione$PezziProdotti

cat("Tasso medio difetti:", mean(produzione$TassoDifetti), "\n")
cat("SD tasso difetti:", sd(produzione$TassoDifetti), "\n")

## 6.2 Tasso difetti per turno
tasso_per_turno <- aggregate(TassoDifetti ~ Turno,
                              data = produzione,
                              FUN = mean)
cat("\nTasso difetti per turno:\n")
print(tasso_per_turno)

## 6.3 Correlazione temperatura - tasso difetti
cor_temp_difetti <- cor.test(produzione$TemperaturaAmbiente,
                              produzione$TassoDifetti)
cat("\nCorrelazione Temperatura - Tasso Difetti:\n")
cat("r =", cor_temp_difetti$estimate, "\n")
cat("p-value =", cor_temp_difetti$p.value, "\n")

## 6.4 Regressione: Difetti ~ Temperatura
modello_difetti <- lm(TassoDifetti ~ TemperaturaAmbiente, data = produzione)
cat("\nRegressione Difetti ~ Temperatura:\n")
summary(modello_difetti)

## 6.5 ANOVA pezzi prodotti per turno
anova_produzione <- aov(PezziProdotti ~ Turno, data = produzione)
cat("\nANOVA PezziProdotti per Turno:\n")
summary(anova_produzione)

## 6.6 Grafici
par(mfrow = c(2, 2))

boxplot(TassoDifetti ~ Turno, data = produzione,
        main = "Tasso Difetti per Turno",
        col = c("yellow", "orange", "red", "blue"))

plot(produzione$TemperaturaAmbiente,
     produzione$TassoDifetti,
     main = "Temperatura vs Tasso Difetti",
     xlab = "Temperatura (°C)",
     ylab = "Tasso Difetti",
     pch = 19,
     col = "darkred")
abline(modello_difetti, col = "blue", lwd = 2)

boxplot(PezziProdotti ~ Turno, data = produzione,
        main = "Produzione per Turno",
        col = c("lightgreen", "green", "darkgreen", "forestgreen"))

hist(produzione$TassoDifetti,
     main = "Distribuzione Tasso Difetti",
     xlab = "Tasso Difetti",
     col = "pink",
     breaks = 20)

par(mfrow = c(1, 1))


# ═══════════════════════════════════════════════════════════════════
# ESERCIZIO 7: REGRESSIONE ALTEZZE E PESI
# ═══════════════════════════════════════════════════════════════════

load("../../input/rData/persone.RData")

cat("\n=== ALTEZZE E PESI ===\n")

## 7.1 Correlazione altezza-peso
cor_altezza_peso <- cor.test(persone$Altezza_cm, persone$Peso_kg)
cat("\nCorrelazione Altezza - Peso:\n")
cat("r =", cor_altezza_peso$estimate, "\n")
cat("p-value =", cor_altezza_peso$p.value, "\n")

## 7.2 Regressione semplice
modello_peso <- lm(Peso_kg ~ Altezza_cm, data = persone)
cat("\nRegressione Peso ~ Altezza:\n")
summary(modello_peso)

## 7.3 Coefficienti
coeff <- coef(modello_peso)
cat("\nIntercetta:", coeff[1], "\n")
cat("Pendenza:", coeff[2], "\n")
cat("Interpretazione: per ogni cm in più di altezza,")
cat("il peso aumenta di", round(coeff[2], 2), "kg\n")

## 7.4 R² e significatività
r_squared <- summary(modello_peso)$r.squared
cat("\nR² =", r_squared, "\n")
cat("→", round(r_squared * 100, 1), "% della varianza spiegata\n")

## 7.5 Predizione: peso atteso per altezza 170cm
nuova_altezza <- data.frame(Altezza_cm = 170)
peso_predetto <- predict(modello_peso, nuova_altezza)
cat("\nPeso predetto per h=170cm:", peso_predetto, "kg\n")

## 7.6 Intervallo di confidenza per predizione
intervallo <- predict(modello_peso, nuova_altezza, interval = "confidence")
cat("IC 95%:", intervallo[2], "-", intervallo[3], "\n")

## 7.7 Analisi residui
residui <- residuals(modello_peso)

cat("\nStatistiche residui:\n")
cat("Media:", mean(residui), "\n")
cat("SD:", sd(residui), "\n")

## 7.8 Grafici diagnostici
par(mfrow = c(2, 2))

# Scatterplot con retta
plot(persone$Altezza_cm, persone$Peso_kg,
     main = "Regressione Peso ~ Altezza",
     xlab = "Altezza (cm)",
     ylab = "Peso (kg)",
     pch = 19,
     col = ifelse(persone$Sesso == "M", "blue", "pink"))
abline(modello_peso, col = "red", lwd = 2)
legend("topleft", c("M", "F"), col = c("blue", "pink"), pch = 19)

# Residui vs fitted
plot(fitted(modello_peso), residui,
     main = "Residui vs Valori Predetti",
     xlab = "Valori predetti",
     ylab = "Residui",
     pch = 19)
abline(h = 0, col = "red", lty = 2)

# Q-Q plot residui
qqnorm(residui)
qqline(residui, col = "red")

# Istogramma residui
hist(residui,
     main = "Distribuzione Residui",
     xlab = "Residui",
     col = "lightblue",
     breaks = 20)

par(mfrow = c(1, 1))


# ═══════════════════════════════════════════════════════════════════
# FINE ESERCIZI
# ═══════════════════════════════════════════════════════════════════

cat("\n")
cat("═══════════════════════════════════════════════════════════════════\n")
cat("✅ ESERCIZI COMPLETATI!\n")
cat("═══════════════════════════════════════════════════════════════════\n")
cat("\n")
cat("Hai praticato con:\n")
cat("  ✓ Statistiche descrittive e outlier\n")
cat("  ✓ Test t (indipendenti e appaiati)\n")
cat("  ✓ ANOVA e test post-hoc\n")
cat("  ✓ Test Chi-quadrato\n")
cat("  ✓ Test proporzioni\n")
cat("  ✓ Correlazione e regressione\n")
cat("  ✓ Trasformazioni e normalità\n")
cat("  ✓ Analisi grafiche\n")
cat("\n")
cat("Buono studio! 📊\n")
cat("═══════════════════════════════════════════════════════════════════\n")
