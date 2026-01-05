# Distribuzione Esponenziale
pexp(x, rate = 1/media, lower.tail = FALSE)  # P(X > x)

# Distribuzione Geometrica
E_prove <- 1/p
pgeom(k-1, p, lower.tail = FALSE)  # P(Y > k prove)

# Test t appaiato
t.test(pre, post, paired = TRUE, alternative = "greater")

# Outlier
Q1 <- quantile(x, 0.25)
Q3 <- quantile(x, 0.75)
IQR_val <- Q3 - Q1
outlier_if_below <- Q1 - 1.5*IQR_val
outlier_if_above <- Q3 + 1.5*IQR_val

# ═══════════════════════════════════════════════════════════════════
# SUPPLEMENTO GUIDA R - NUOVI ARGOMENTI
# ═══════════════════════════════════════════════════════════════════
# Da aggiungere alla guida principale guida_R_EPS.R
# Contiene: Distribuzione Geometrica + Test t Appaiato
# ═══════════════════════════════════════════════════════════════════

# ═══════════════════════════════════════════════════════════════════
# DISTRIBUZIONE GEOMETRICA
# ═══════════════════════════════════════════════════════════════════

## Quando usarla?
# Modella il numero di prove (o fallimenti) fino al primo successo
# Es: Lanci un dado finché non esce 6, quanti lanci servono?

## ATTENZIONE: R conta i FALLIMENTI, non le prove!
# Se vuoi il numero di prove Y, devi fare Y = X + 1

## Esempio 1: Dado - Lanci finché non esce 6
p <- 1/6  # Probabilità di 6

# Numero medio di lanci (prove Y)
E_lanci <- 1/p
E_lanci  # 6 lanci

# P(Y = k) - Esattamente k lanci
# P(ottenere 6 esattamente al 3° lancio)
dgeom(2, prob = p)  # Usa k-1 perché R conta fallimenti! → 0.1157

# P(Y ≤ k) - Al massimo k lanci
# P(ottenere 6 entro i primi 5 lanci)
pgeom(4, prob = p)  # Usa k-1 → 0.5981

# P(Y > k) - Più di k lanci
# P(servono più di 10 lanci)
pgeom(9, prob = p, lower.tail = FALSE)  # Usa k-1 → 0.1615
# Oppure:
1 - pgeom(9, prob = p)

# Alternativa con formula diretta: P(Y > k) = (1-p)^k
(1 - p)^10  # 0.1615


## Esempio 2: Esame 18 Feb - Pianta e Precipitazioni
# X ~ Exp(λ=1/3) precipitazioni giornaliere (media 3mm)
# Bagni la pianta se X < 7.5 mm
# Quanti giorni passano mediamente tra una bagnata e l'altra?

# 1. Calcola probabilità di bagnare in un giorno
p_bagnare <- pexp(7.5, rate = 1/3)
p_bagnare  # 0.9179

# 2. Y = numero di giorni fino a quando bagno (Geometrica)
E_giorni <- 1/p_bagnare
E_giorni  # 1.089 giorni

# 3. P(la prossima bagnata è tra almeno 4 giorni)
# = P(primi 3 giorni NON bagno)
p_non_bagnare <- 1 - p_bagnare  # 0.0821
P_almeno_4_giorni <- p_non_bagnare^3
P_almeno_4_giorni  # 0.000554

# Oppure con pgeom:
pgeom(2, prob = p_bagnare, lower.tail = FALSE)  # 0.000554


## Esempio 3: Prodotti Difettosi
# 5% dei prodotti è difettoso
# Ispezioni prodotti finché non trovi il primo difettoso

p_difettoso <- 0.05

# Numero medio di prodotti da ispezionare
E_prodotti <- 1/p_difettoso
E_prodotti  # 20 prodotti

# P(il primo difettoso è tra i primi 3)
pgeom(2, prob = p_difettoso)  # 0.1426

# P(devo ispezionare almeno 50 prodotti)
pgeom(48, prob = p_difettoso, lower.tail = FALSE)  # 0.0769


## Riepilogo Formule Geometrica
# Se Y = numero di prove fino al successo:
# - E[Y] = 1/p
# - Var(Y) = (1-p)/p²
# - P(Y = k) = (1-p)^(k-1) * p
# - P(Y > k) = (1-p)^k

# In R (ricorda: conta fallimenti X = Y-1):
# - P(Y = k) → dgeom(k-1, p)
# - P(Y ≤ k) → pgeom(k-1, p)
# - P(Y > k) → pgeom(k-1, p, lower.tail=FALSE)


# ═══════════════════════════════════════════════════════════════════
# TEST t PER DATI APPAIATI (PAIRED t-test)
# ═══════════════════════════════════════════════════════════════════

## Quando usarlo?
# Due misurazioni sulle STESSE unità (before/after, pre/post, matched pairs)
# Esempio: Prestazioni atletiche prima e dopo un regime alimentare

## Differenza vs test a due campioni indipendenti:
# - Appaiato: Stesse persone/unità misurate 2 volte
# - Indipendente: Due gruppi diversi


## Esempio 1: Maratoneti (Esame 18 Feb)
# Dataset con tempiPRE e tempiPOST per ogni atleta
# Vogliamo testare se le prestazioni sono migliorate (tempi diminuiti)

# Carica dati
dati <- read.csv("dataset18feb.csv")

# H₀: μ_PRE = μ_POST (nessuna differenza)
# H₁: μ_PRE > μ_POST (prestazioni migliorate, tempi diminuiti)

# Test t appaiato unilaterale (greater)
test <- t.test(dati$tempiPRE,
               dati$tempiPOST,
               paired = TRUE,
               alternative = "greater")

# Visualizza risultati completi
test

# Estrai p-value
test$p.value

# Estrai gradi di libertà
test$parameter  # n - 1 (dove n = numero di coppie)

# Estrai intervallo di confidenza
test$conf.int

# Estrai statistica t
test$statistic

# Interpretazione
alpha <- 0.05
if (test$p.value < alpha) {
  print("Rifiuto H₀: Le prestazioni sono significativamente migliorate")
} else {
  print("Non rifiuto H₀: Non c'è evidenza di miglioramento significativo")
}


## Esempio 2: Peso Prima e Dopo Dieta
# Supponiamo di avere peso_prima e peso_dopo per 30 persone

# Genera dati fittizi per esempio
set.seed(123)
n <- 30
peso_prima <- rnorm(n, mean = 80, sd = 10)
peso_dopo <- peso_prima - rnorm(n, mean = 3, sd = 2)  # Perdita media 3kg

# Test bilaterale (two-sided)
# H₀: μ_diff = 0
# H₁: μ_diff ≠ 0
test_bilaterale <- t.test(peso_prima, peso_dopo,
                          paired = TRUE,
                          alternative = "two.sided")
test_bilaterale


# Test unilaterale (verifica se il peso è diminuito)
# H₀: μ_prima ≤ μ_dopo
# H₁: μ_prima > μ_dopo
test_perdita <- t.test(peso_prima, peso_dopo,
                       paired = TRUE,
                       alternative = "greater")
test_perdita


## Esempio 3: Verifica Manuale con le Differenze
# Il test t appaiato equivale a testare se la media delle differenze ≠ 0

differenze <- dati$tempiPRE - dati$tempiPOST

# Test sulla media delle differenze
t.test(differenze, mu = 0, alternative = "greater")

# Questo dà lo stesso risultato del test appaiato!


## Visualizzazione
# Boxplot delle differenze
differenze <- dati$tempiPRE - dati$tempiPOST
boxplot(differenze,
        main = "Distribuzione delle Differenze (PRE - POST)",
        ylab = "Differenza Tempo (minuti)",
        col = "lightblue")
abline(h = 0, col = "red", lty = 2)  # Linea a 0

# Istogramma delle differenze
hist(differenze,
     main = "Distribuzione delle Differenze",
     xlab = "Differenza (PRE - POST)",
     col = "lightgreen",
     breaks = 15)
abline(v = 0, col = "red", lwd = 2)
abline(v = mean(differenze), col = "blue", lwd = 2, lty = 2)
legend("topright",
       c("Zero", "Media"),
       col = c("red", "blue"),
       lty = c(1, 2),
       lwd = 2)


## Assunzioni del Test t Appaiato
# 1. Le differenze devono essere approssimativamente normali
# 2. Le coppie devono essere indipendenti tra loro

# Verifica normalità delle differenze
shapiro.test(differenze)
qqnorm(differenze)
qqline(differenze, col = "red")


## Riepilogo Test t Appaiato

# Bilaterale (H₁: μ_1 ≠ μ_2)
t.test(gruppo1, gruppo2, paired = TRUE, alternative = "two.sided")

# Unilaterale destro (H₁: μ_1 > μ_2)
t.test(gruppo1, gruppo2, paired = TRUE, alternative = "greater")

# Unilaterale sinistro (H₁: μ_1 < μ_2)
t.test(gruppo1, gruppo2, paired = TRUE, alternative = "less")

# Gradi di libertà: df = n - 1 (dove n = numero di coppie)


# ═══════════════════════════════════════════════════════════════════
# CONFRONTO: Test t Appaiato vs Indipendente
# ═══════════════════════════════════════════════════════════════════

## Esempio Comparativo
# Generiamo dati per dimostrare la differenza

set.seed(456)
n <- 20

# Scenario 1: Dati APPAIATI (stesse persone)
punteggio_pre <- rnorm(n, mean = 70, sd = 10)
punteggio_post <- punteggio_pre + rnorm(n, mean = 5, sd = 3)  # Miglioramento

# Test CORRETTO (paired)
test_paired <- t.test(punteggio_post, punteggio_pre,
                      paired = TRUE,
                      alternative = "greater")
test_paired$p.value  # Piccolo → rileva il miglioramento

# Test SBAGLIATO (indipendente)
test_wrong <- t.test(punteggio_post, punteggio_pre,
                     paired = FALSE,
                     alternative = "greater")
test_wrong$p.value  # Più grande → meno potente!

# Il test appaiato è più potente perché elimina la variabilità tra individui


## Scenario 2: Dati INDIPENDENTI (due gruppi diversi)
gruppo_A <- rnorm(n, mean = 70, sd = 10)
gruppo_B <- rnorm(n, mean = 75, sd = 10)

# Test CORRETTO (indipendente)
t.test(gruppo_B, gruppo_A,
       paired = FALSE,
       alternative = "greater")

# Test SBAGLIATO (paired) - NON HA SENSO!
# Non usare paired se i dati non sono appaiati!


# ═══════════════════════════════════════════════════════════════════
# TRUCCHI E SUGGERIMENTI PER L'ESAME
# ═══════════════════════════════════════════════════════════════════

## 1. Riconoscere quando usare Geometrica
# Cerca parole chiave:
# - "fino al primo..."
# - "quante volte prima di..."
# - "prima volta che..."
# Se n (numero prove) è ALEATORIO → Geometrica

## 2. Calcolo rapido E[Y] per Geometrica
E_Y <- 1/p  # Dove p = prob successo
# Se p è alto (es. 0.9) → E[Y] piccolo (1.1 prove)
# Se p è basso (es. 0.1) → E[Y] grande (10 prove)

## 3. Distinguere Test Appaiato vs Indipendente
# APPAIATO se:
# - "prima e dopo"
# - "pre e post"
# - "stesso gruppo misurato due volte"
# - "matched pairs"

# INDIPENDENTE se:
# - "confronta due gruppi"
# - "maschi vs femmine"
# - "trattamento A vs trattamento B su gruppi diversi"

## 4. Alternative nel test t
# "greater" (>) : Testa se il PRIMO argomento è MAGGIORE del SECONDO
# "less" (<)    : Testa se il PRIMO argomento è MINORE del SECONDO
# "two.sided" (≠): Testa se sono DIVERSI (qualsiasi direzione)

# Esempio: t.test(pre, post, alternative = "greater")
# Testa se pre > post (cioè se i valori sono DIMINUITI da pre a post è SBAGLIATO!)
# Per testare miglioramento (diminuzione valori), usa:
# t.test(pre, post, alternative = "greater")  # se vuoi pre > post
# OPPURE
# t.test(post, pre, alternative = "less")     # equivalente

## 5. Estrarre informazioni da un test
test_result <- t.test(x, y, paired = TRUE)

# P-value
test_result$p.value

# Statistica t
test_result$statistic

# Gradi di libertà
test_result$parameter

# Intervallo di confidenza
test_result$conf.int

# Media delle differenze
test_result$estimate


## 6. Geometrica in R - Ricorda l'offset!
# Per il numero di PROVE (Y):
# - P(Y = k) → dgeom(k-1, p)
# - P(Y ≤ k) → pgeom(k-1, p)
# - P(Y > k) → pgeom(k-1, p, lower.tail=FALSE)

# Per il numero di FALLIMENTI (X = Y-1):
# - P(X = k) → dgeom(k, p)
# - P(X ≤ k) → pgeom(k, p)


# ═══════════════════════════════════════════════════════════════════
# ESERCIZI RAPIDI DI VERIFICA
# ═══════════════════════════════════════════════════════════════════

## Esercizio 1: Geometrica
# Lanci una moneta finché non esce testa (p = 0.5)
# a) Numero medio di lanci?
E_lanci <- 1/0.5  # 2

# b) P(serve esattamente 4 lanci)?
dgeom(3, 0.5)  # 0.0625

# c) P(servono più di 5 lanci)?
pgeom(4, 0.5, lower.tail = FALSE)  # 0.03125


## Esercizio 2: Test t Appaiato
# 15 studenti fanno un test prima e dopo un corso
set.seed(789)
n <- 15
prima <- rnorm(n, 60, 10)
dopo <- prima + rnorm(n, 8, 5)  # Miglioramento medio di 8 punti

# Test bilaterale
test <- t.test(dopo, prima, paired = TRUE, alternative = "two.sided")
test$p.value  # < 0.05? → Miglioramento significativo

# Test unilaterale (testa se dopo > prima)
test_uni <- t.test(dopo, prima, paired = TRUE, alternative = "greater")
test_uni$p.value


## Esercizio 3: Combinato (Geometrica + Esponenziale)
# Tempo di attesa in minuti ~ Exp(λ = 1/5)
# Considero "successo" se attesa > 8 minuti
# Quanti clienti servono mediamente prima di averne uno con attesa > 8?

p_successo <- pexp(8, rate = 1/5, lower.tail = FALSE)
p_successo  # 0.2019

E_clienti <- 1/p_successo
E_clienti  # 4.95 clienti


# ═══════════════════════════════════════════════════════════════════
# FORMULE RAPIDE DA RICORDARE
# ═══════════════════════════════════════════════════════════════════

# GEOMETRICA (Y = numero prove):
# E[Y] = 1/p
# Var(Y) = (1-p)/p²
# P(Y = k) = (1-p)^(k-1) · p
# P(Y > k) = (1-p)^k

# TEST t APPAIATO:
# Si lavora con le differenze: D = X₁ - X₂
# H₀: μ_D = 0
# t = (D̄ - 0) / (s_D / √n)
# df = n - 1

# RELAZIONE ESPONENZIALE-GEOMETRICA:
# Se X ~ Exp(λ) è continua (tempo)
# Allora Y ~ Geom(p) è discreta (eventi)
# dove p = P(successo basato su X)

# ═══════════════════════════════════════════════════════════════════
# FINE SUPPLEMENTO
# ═══════════════════════════════════════════════════════════════════

# Per tornare alla guida principale, apri: guida_R_EPS.R


