lambdaFame = 5
lambdaNoFame = 2
pFame = 0.35
pNoFame = 1-pFame

menoTreFame = ppois(2, lambdaFame)
menoTreNonFame = ppois(2, lambdaNoFame)

pFame * menoTreFame + pNoFame * menoTreNonFame

pTreNoFame = dpois(3, lambdaNoFame)

# P(NoFame | 3B) =
#   [P(3B | NoFame) * P(NoFame)] / [P(3B)]

pTreB = pFame * dpois(3, lambdaFame) +
  pNoFame * dpois(3, lambdaNoFame)

# P(A) = P(A | B) * P(B) + P(A | C) * P(C)

(pTreNoFame * pNoFame) / pTreB

7*2



media = 400
lambda = 1/media
pOttocento = 1-pexp(800, lambda)
1-pexp(400, lambda)
1/lambda^2

dbinom(1, 6, pOttocento)



lambda = 0.045
corta = pexp(55, lambda)
pexp(3, lambda)

1/lambda * 3

1-pbinom(0, 3, corta)


pPv = 4/10
pMv = 6/10
pPb = 2/12
pMb = 10/12

0.5 * dhyper(3, 6, 4, 3) +
0.5 * dhyper(3, 10, 2, 3)

1-phyper(0, 6, 4, 3)

aBlu = dhyper(2, 2, 10, 2) * dhyper(1, x 10, 0, 1)

pTot = 0.5 * aBlu + 
  0.5 * dhyper(2, 4, 6, 2) * dhyper(1, 6, 2, 1)

# P(B | 2P1M) = [P(2P1M | B) * p(B)] / [P(2P1M)]

(aBlu * 0.5) / pTot




media = 6.5
sd = 0.6

pMeno = pnorm(5.6, media, sd)
pnorm(7.6, media, sd) - pnorm(5.3, media, sd)
qnorm(0.13, media, sd)
pbinom(3, 7, pMeno)



pPv = 4/14
pMv = 10/14
pPb = 1/9
pMb = 8/9

0.5 * dbinom(3, 4, pMv) +
0.5 * dbinom(3, 4, pMb)

1-pbinom(0, 4, pMv)

# P(B | 2P2M) = [P(2P2M | B) * P(B)] / [P(2P2M)] 

pBlu = dbinom(2, 2, pPb) * dbinom(2, 2, pMb)

pTot = 0.5 * dbinom(2,2,pPv) * dbinom(2,2,pMv) +
       0.5 * dbinom(2,2,pPb) * dbinom(2,2,pMb)

(pBlu * 0.5) / pTot
