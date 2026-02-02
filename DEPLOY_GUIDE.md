# Guida al Deploy - Simulatore EPS

Questa guida ti mostra tre metodi per fare il deploy GRATUITO del progetto.

---

## 🚀 Opzione 1: VERCEL (Consigliata - Più Semplice)

Vercel offre deploy automatico da GitHub con CI/CD integrato.

### Metodo A: Deploy da GitHub (Consigliato)

1. **Push del progetto su GitHub** (se non l'hai già fatto):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin master
   ```

2. **Vai su Vercel**:
   - Visita: https://vercel.com/signup
   - Registrati con il tuo account GitHub (GRATIS)

3. **Importa il progetto**:
   - Click su "New Project"
   - Seleziona il repository GitHub "EPS" o "Simulatore esami"
   - Vercel rileva automaticamente che è un progetto Vite
   - Click su "Deploy"

4. **Fatto!** 🎉
   - Il tuo sito sarà live in 1-2 minuti
   - URL tipo: `https://simulatore-eps.vercel.app`
   - Ogni push su GitHub = deploy automatico!

### Metodo B: Deploy da CLI (alternativo)

```bash
# Dal terminale, nella directory del progetto:
npx vercel

# Segui le istruzioni:
# 1. Login con GitHub/Email
# 2. Conferma nome progetto
# 3. Conferma settings (premere Enter per default)
# 4. Deploy completo!

# Per deploy production:
npx vercel --prod
```

**Vantaggi Vercel**:
- ✅ Deploy in 1 click
- ✅ HTTPS automatico
- ✅ CI/CD automatico (push = deploy)
- ✅ Preview automatici per ogni commit
- ✅ 100GB bandwidth/mese gratis

---

## 🌐 Opzione 2: NETLIFY

Netlify è simile a Vercel, molto affidabile.

### Metodo A: Deploy da GitHub (Consigliato)

1. **Push su GitHub** (se non fatto):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin master
   ```

2. **Vai su Netlify**:
   - Visita: https://app.netlify.com/signup
   - Registrati con GitHub (GRATIS)

3. **Importa progetto**:
   - Click "Add new site" → "Import an existing project"
   - Seleziona GitHub → Autorizza → Scegli repository
   - **Settings da configurare**:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

4. **Fatto!** 🎉
   - URL tipo: `https://simulatore-eps.netlify.app`
   - Deploy automatico ad ogni push

### Metodo B: Deploy con CLI

```bash
# Installa Netlify CLI (opzionale, uso npx)
npm install -g netlify-cli

# O usa npx (senza installazione):
npx netlify deploy

# Build il progetto
npm run build

# Deploy
npx netlify deploy --prod
```

**Vantaggi Netlify**:
- ✅ Interfaccia intuitiva
- ✅ Form handling integrato
- ✅ 100GB bandwidth/mese gratis
- ✅ Ottimo per progetti statici

---

## 📦 Opzione 3: GITHUB PAGES

Completamente gratuito, usa l'infrastruttura di GitHub.

### Setup:

1. **Installa gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Modifica package.json** (aggiungi homepage e scripts):
   ```json
   {
     "homepage": "https://TUO-USERNAME.github.io/EPS",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Attiva GitHub Pages**:
   - Vai su GitHub → Repository → Settings → Pages
   - Source: seleziona branch "gh-pages"
   - Save

5. **Visita il sito**:
   - URL: `https://TUO-USERNAME.github.io/EPS`
   - Potrebbe servire 1-2 minuti per attivarsi

**Vantaggi GitHub Pages**:
- ✅ Completamente gratuito
- ✅ Integrato con GitHub
- ✅ Bandwidth illimitato*
- ⚠️ Solo siti pubblici
- ⚠️ Deploy manuale (npm run deploy)

---

## 🏆 Quale scegliere?

| Feature | Vercel | Netlify | GitHub Pages |
|---------|--------|---------|--------------|
| Setup | ⭐⭐⭐ Facilissimo | ⭐⭐⭐ Facilissimo | ⭐⭐ Medio |
| Deploy automatico | ✅ Sì | ✅ Sì | ❌ No |
| HTTPS | ✅ Gratis | ✅ Gratis | ✅ Gratis |
| Custom domain | ✅ Gratis | ✅ Gratis | ✅ Gratis |
| Bandwidth | 100GB/mese | 100GB/mese | Illimitato* |
| Build time | Veloce | Veloce | Locale |
| Analytics | ✅ Integrato | ✅ Integrato | ❌ No |

**Raccomandazione**:
- **Per questo progetto**: **VERCEL** (opzione 1, metodo A)
- Più semplice, deploy automatico, ottimizzato per Vite

---

## 🎯 Quick Start (VERCEL)

Il metodo più veloce per essere online in 5 minuti:

```bash
# 1. Assicurati che tutto sia committato
git add .
git commit -m "Ready for deployment"
git push origin master

# 2. Vai su https://vercel.com/signup
# 3. Login con GitHub
# 4. Click "New Project"
# 5. Seleziona il repository
# 6. Click "Deploy"
# 7. FATTO! 🎉
```

---

## 🔧 Build locale (test prima del deploy)

Prima di fare il deploy, testa la build in locale:

```bash
# Build del progetto
npm run build

# Preview della build
npm run preview

# Il sito sarà disponibile su http://localhost:4173
```

Se la build locale funziona, il deploy funzionerà sicuramente!

---

## ⚠️ Troubleshooting

### Errore "404 on refresh"

Se ottieni 404 quando ricarichi la pagina, aggiungi un file `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

Per Netlify, crea `public/_redirects`:
```
/*    /index.html   200
```

### Build fallisce

Verifica che:
- `npm run build` funzioni in locale
- Tutte le dipendenze siano in package.json
- Non ci siano errori ESLint critici

---

## 📊 Monitoraggio

Dopo il deploy:
- **Vercel**: Dashboard automatica con analytics
- **Netlify**: Analytics nella dashboard
- **GitHub Pages**: Usa Google Analytics (manuale)

---

## 🌟 Prossimi Passi (opzionali)

1. **Custom Domain**: Collega un dominio personalizzato (es: simulatore-eps.com)
2. **Analytics**: Aggiungi Google Analytics o Plausible
3. **PWA**: Trasforma in Progressive Web App per uso offline
4. **SEO**: Aggiungi meta tags per SEO

---

**Buon deploy! 🚀**

Se hai problemi, controlla i log nella dashboard del servizio che hai scelto.