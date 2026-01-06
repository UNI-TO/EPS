(0.843750/2)+0.421875
0.5/4 + 0.5

media=121
sd = 16

pnorm(140, media, sd) * 100
pAlta = 1-pnorm(140, media, sd)
(pnorm(140, media, sd) - pnorm(100, media, sd)) * 100

1-pbinom(5, 20, pAlta)


pForte = 0.7
pDebole = 0.3
1-pbinom(10, 20, pForte)

pF = 2/5
pD = 3/5

pSegno = pF * dbinom(1, 1, pForte) +
         pD * dbinom(1, 1, pDebole)

# P(Forte | Segno) = [P(Segno | Forte) * P(Forte)]/[P(Segno)]

(pForte * pF) / pSegno

2 * (pForte * 20) + 3 * (pDebole * 15)



pLuisa = 0.8
pNonLuisa = 0.65

1-pbinom(12, 25, pLuisa)
pLuisa * 25

pLuisaTre = 1-pgeom(1, pLuisa)
pLMenoTre = 1-pLuisaTre
pMenoTre = 0.5 * pLMenoTre + 0.5 * pgeom(1, pNonLuisa) 

# P(Luisa | X < 3) = [P(X<3 | Luisa) * P(Luisa)] / [P(X < 3)]
(pLMenoTre * 0.5)/pMenoTre



(212+36)/500

54/(198+54)

36/(212+36)

pMTrenta = (198+54)/500
pMTrenta * 15
# np(1-p)
pMTrenta * 15 * (1-pMTrenta)
1-pbinom(7, 15, pMTrenta)


