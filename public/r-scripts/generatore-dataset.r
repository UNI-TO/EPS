# ═══════════════════════════════════════════════════════════════════
# GENERATORE DATASET PER ESAMI EPS
# ═══════════════════════════════════════════════════════════════════
# Script per generare nuovi dataset .RData per esercitazioni
# ═══════════════════════════════════════════════════════════════════

set.seed(2025)  # Per riproducibilità

# ═══════════════════════════════════════════════════════════════════
# DATASET 1: STUDENTI E VOTI
# ═══════════════════════════════════════════════════════════════════
# Scenario: Analisi voti studenti con diverse variabili

n_studenti <- 150

studenti <- data.frame(
  ID = 1:n_studenti,
  Corso = sample(c("Informatica", "Matematica", "Fisica"),
                 n_studenti, replace = TRUE, prob = c(0.5, 0.3, 0.2)),
  AnnoImmatricolazione = sample(2020:2024, n_studenti, replace = TRUE),
  OreDiStudio = round(rnorm(n_studenti, mean = 80, sd = 25)),
  VotoEsame = numeric(n_studenti),
  Frequenza = sample(c("Alta", "Media", "Bassa"),
                     n_studenti, replace = TRUE, prob = c(0.4, 0.4, 0.2))
)

# Voto correlato a ore di studio e frequenza
for (i in 1:n_studenti) {
  base_voto <- 18 + (studenti$OreDiStudio[i] - 80) * 0.1

  if (studenti$Frequenza[i] == "Alta") {
    base_voto <- base_voto + rnorm(1, 3, 1.5)
  } else if (studenti$Frequenza[i] == "Media") {
    base_voto <- base_voto + rnorm(1, 1, 1.5)
  } else {
    base_voto <- base_voto + rnorm(1, -2, 1.5)
  }

  studenti$VotoEsame[i] <- round(max(18, min(30, base_voto)))
}

# Aggiustare ore di studio negative
studenti$OreDiStudio[studenti$OreDiStudio < 20] <-
  sample(20:40, sum(studenti$OreDiStudio < 20), replace = TRUE)

save(studenti, file = "../../input/rData/studenti.RData")


# ═══════════════════════════════════════════════════════════════════
# DATASET 2: VENDITE NEGOZI
# ═══════════════════════════════════════════════════════════════════
# Scenario: Analisi vendite in diverse città

n_vendite <- 200

vendite <- data.frame(
  GiornoSettimana = sample(c("Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"),
                           n_vendite, replace = TRUE),
  Citta = sample(c("Milano", "Roma", "Torino", "Napoli"),
                 n_vendite, replace = TRUE, prob = c(0.35, 0.30, 0.20, 0.15)),
  Categoria = sample(c("Elettronica", "Abbigliamento", "Alimentari"),
                     n_vendite, replace = TRUE),
  Importo = numeric(n_vendite),
  NumeroArticoli = round(rexp(n_vendite, rate = 1/3)) + 1
)

# Importo dipende da categoria e numero articoli
for (i in 1:n_vendite) {
  prezzo_medio <- switch(vendite$Categoria[i],
                         "Elettronica" = 250,
                         "Abbigliamento" = 60,
                         "Alimentari" = 15)

  vendite$Importo[i] <- round(
    vendite$NumeroArticoli[i] * rnorm(1, prezzo_medio, prezzo_medio * 0.3),
    2
  )
}

vendite$Importo[vendite$Importo < 5] <- round(runif(sum(vendite$Importo < 5), 5, 50), 2)

save(vendite, file = "../../input/rData/vendite.RData")


# ═══════════════════════════════════════════════════════════════════
# DATASET 3: MISURAZIONI TEMPERATURA
# ═══════════════════════════════════════════════════════════════════
# Scenario: Temperature misurate in 3 laboratori (test ANOVA)

n_misure_lab <- 30

temperatura <- data.frame(
  Laboratorio = rep(c("Lab_A", "Lab_B", "Lab_C"), each = n_misure_lab),
  TemperaturaPreTrattamento = numeric(n_misure_lab * 3),
  TemperaturaPostTrattamento = numeric(n_misure_lab * 3),
  Operatore = rep(sample(c("Mario", "Luca", "Sara", "Elena"),
                         n_misure_lab * 3, replace = TRUE))
)

# Lab A: media 22°C, alta precisione
temperatura$TemperaturaPreTrattamento[1:n_misure_lab] <-
  rnorm(n_misure_lab, 22, 1.2)

# Lab B: media 24°C, media precisione
temperatura$TemperaturaPreTrattamento[(n_misure_lab+1):(2*n_misure_lab)] <-
  rnorm(n_misure_lab, 24, 2.5)

# Lab C: media 23°C, bassa precisione
temperatura$TemperaturaPreTrattamento[(2*n_misure_lab+1):(3*n_misure_lab)] <-
  rnorm(n_misure_lab, 23, 3.8)

# Post trattamento: aumento medio di 5°C con variabilità
for (i in 1:(n_misure_lab * 3)) {
  aumento <- rnorm(1, 5, 1.5)
  temperatura$TemperaturaPostTrattamento[i] <-
    temperatura$TemperaturaPreTrattamento[i] + aumento
}

temperatura$TemperaturaPreTrattamento <- round(temperatura$TemperaturaPreTrattamento, 2)
temperatura$TemperaturaPostTrattamento <- round(temperatura$TemperaturaPostTrattamento, 2)

save(temperatura, file = "../../input/rData/temperatura.RData")


# ═══════════════════════════════════════════════════════════════════
# DATASET 4: PAZIENTI CLINICA
# ═══════════════════════════════════════════════════════════════════
# Scenario: Dati clinici per test proporzioni e chi-quadrato

n_pazienti <- 250

pazienti <- data.frame(
  ID = 1:n_pazienti,
  Eta = round(rnorm(n_pazienti, 45, 15)),
  Sesso = sample(c("M", "F"), n_pazienti, replace = TRUE),
  GruppoTrattamento = sample(c("Placebo", "Farmaco_A", "Farmaco_B"),
                              n_pazienti, replace = TRUE),
  PressionePre = round(rnorm(n_pazienti, 140, 20)),
  PressionePost = numeric(n_pazienti),
  Migliorato = character(n_pazienti)
)

# Aggiustare età
pazienti$Eta[pazienti$Eta < 18] <- sample(18:25, sum(pazienti$Eta < 18), replace = TRUE)
pazienti$Eta[pazienti$Eta > 85] <- sample(75:85, sum(pazienti$Eta > 85), replace = TRUE)

# Pressione post dipende da trattamento
for (i in 1:n_pazienti) {
  if (pazienti$GruppoTrattamento[i] == "Placebo") {
    riduzione <- rnorm(1, 2, 5)  # Poco effetto
  } else if (pazienti$GruppoTrattamento[i] == "Farmaco_A") {
    riduzione <- rnorm(1, 12, 6)  # Effetto moderato
  } else {
    riduzione <- rnorm(1, 18, 7)  # Forte effetto
  }

  pazienti$PressionePost[i] <- max(90,
                                   round(pazienti$PressionePre[i] - riduzione))

  # Miglioramento se riduzione >= 10 mmHg
  if ((pazienti$PressionePre[i] - pazienti$PressionePost[i]) >= 10) {
    pazienti$Migliorato[i] <- "Si"
  } else {
    pazienti$Migliorato[i] <- "No"
  }
}

save(pazienti, file = "../../input/rData/pazienti.RData")


# ═══════════════════════════════════════════════════════════════════
# DATASET 5: TEMPI RISPOSTA
# ═══════════════════════════════════════════════════════════════════
# Scenario: Tempi di risposta in millisecondi (distribuzione asimmetrica)

n_risposte <- 180

tempi_risposta <- data.frame(
  Partecipante = rep(1:60, each = 3),
  Condizione = rep(c("Facile", "Media", "Difficile"), times = 60),
  TempoRisposta_ms = numeric(n_risposte),
  Corretto = character(n_risposte),
  Eta_Partecipante = rep(sample(18:70, 60, replace = TRUE), each = 3)
)

# Tempi dipendono da condizione (distribuzione log-normale)
for (i in 1:n_risposte) {
  if (tempi_risposta$Condizione[i] == "Facile") {
    tempo <- rlnorm(1, meanlog = 6.2, sdlog = 0.4)  # ~500ms
    prob_corretto <- 0.9
  } else if (tempi_risposta$Condizione[i] == "Media") {
    tempo <- rlnorm(1, meanlog = 6.9, sdlog = 0.5)  # ~1000ms
    prob_corretto <- 0.7
  } else {
    tempo <- rlnorm(1, meanlog = 7.5, sdlog = 0.6)  # ~1800ms
    prob_corretto <- 0.5
  }

  # Aggiustamento per età (più vecchi = più lenti)
  eta_partecipante <- tempi_risposta$Eta_Partecipante[i]
  tempo <- tempo * (1 + (eta_partecipante - 40) * 0.008)

  tempi_risposta$TempoRisposta_ms[i] <- round(max(200, tempo))

  tempi_risposta$Corretto[i] <- sample(c("Si", "No"), 1,
                                       prob = c(prob_corretto, 1-prob_corretto))
}

save(tempi_risposta, file = "../../input/rData/tempi_risposta.RData")


# ═══════════════════════════════════════════════════════════════════
# DATASET 6: PRODUZIONE INDUSTRIALE
# ═══════════════════════════════════════════════════════════════════
# Scenario: Pezzi prodotti e difetti in 4 turni

n_giorni <- 50

produzione <- data.frame(
  Giorno = rep(1:n_giorni, each = 4),
  Turno = rep(c("Mattina", "Pomeriggio", "Sera", "Notte"), times = n_giorni),
  PezziProdotti = numeric(n_giorni * 4),
  PezziDifettosi = numeric(n_giorni * 4),
  TemperaturaAmbiente = numeric(n_giorni * 4)
)

for (i in 1:(n_giorni * 4)) {
  # Produzione dipende da turno
  base_produzione <- switch(produzione$Turno[i],
                            "Mattina" = 220,
                            "Pomeriggio" = 240,
                            "Sera" = 200,
                            "Notte" = 180)

  produzione$PezziProdotti[i] <- round(rnorm(1, base_produzione, 30))

  # Temperatura dipende da turno
  temp_media <- switch(produzione$Turno[i],
                       "Mattina" = 18,
                       "Pomeriggio" = 24,
                       "Sera" = 21,
                       "Notte" = 16)

  produzione$TemperaturaAmbiente[i] <- round(rnorm(1, temp_media, 2.5), 1)

  # Difetti dipendono da temperatura (più caldo = più difetti)
  prob_difetto <- 0.03 + (produzione$TemperaturaAmbiente[i] - 20) * 0.002
  prob_difetto <- max(0.01, min(0.08, prob_difetto))

  produzione$PezziDifettosi[i] <- rbinom(1,
                                         produzione$PezziProdotti[i],
                                         prob_difetto)
}

# Assicurare valori positivi
produzione$PezziProdotti[produzione$PezziProdotti < 100] <-
  sample(100:150, sum(produzione$PezziProdotti < 100), replace = TRUE)

save(produzione, file = "../../input/rData/produzione.RData")


# ═══════════════════════════════════════════════════════════════════
# DATASET 7: ALTEZZE E PESI
# ═══════════════════════════════════════════════════════════════════
# Scenario: Regressione lineare, correlazione

n_persone <- 120

persone <- data.frame(
  ID = 1:n_persone,
  Sesso = sample(c("M", "F"), n_persone, replace = TRUE, prob = c(0.5, 0.5)),
  Altezza_cm = numeric(n_persone),
  Peso_kg = numeric(n_persone),
  Eta = sample(20:65, n_persone, replace = TRUE)
)

for (i in 1:n_persone) {
  if (persone$Sesso[i] == "M") {
    altezza <- rnorm(1, 175, 8)
    # Peso correlato ad altezza: Peso = -80 + 0.9*Altezza + noise
    peso_atteso <- -80 + 0.9 * altezza
  } else {
    altezza <- rnorm(1, 162, 7)
    peso_atteso <- -65 + 0.8 * altezza
  }

  persone$Altezza_cm[i] <- round(altezza, 1)
  persone$Peso_kg[i] <- round(peso_atteso + rnorm(1, 0, 5), 1)
}

# Aggiustamenti
persone$Peso_kg[persone$Peso_kg < 45] <- round(runif(sum(persone$Peso_kg < 45), 45, 55), 1)
persone$Peso_kg[persone$Peso_kg > 120] <- round(runif(sum(persone$Peso_kg > 120), 90, 110), 1)

save(persone, file = "../../input/rData/persone.RData")


# ═══════════════════════════════════════════════════════════════════
# MESSAGGIO FINALE
# ═══════════════════════════════════════════════════════════════════

cat("\n")
cat("═══════════════════════════════════════════════════════════════════\n")
cat("✅ DATASET GENERATI CON SUCCESSO!\n")
cat("═══════════════════════════════════════════════════════════════════\n")
cat("\n")
cat("Dataset creati in ./input/rData/:\n")
cat("  1. studenti.RData       - Voti studenti e ore di studio\n")
cat("  2. vendite.RData        - Vendite negozi per città\n")
cat("  3. temperatura.RData    - Misurazioni laboratorio (paired t-test)\n")
cat("  4. pazienti.RData       - Dati clinici trattamenti\n")
cat("  5. tempi_risposta.RData - Tempi reazione esperimento\n")
cat("  6. produzione.RData     - Produzione industriale e difetti\n")
cat("  7. persone.RData        - Altezze e pesi (regressione)\n")
cat("\n")
cat("Usa load('nome_file.RData') per caricarli!\n")
cat("═══════════════════════════════════════════════════════════════════\n")
