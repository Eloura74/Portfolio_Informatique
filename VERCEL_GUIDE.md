# 🚀 Déploiement sur Vercel

Ce guide explique comment déployer votre Portfolio GitHub sur Vercel.

## Prérequis

1.  Un compte [GitHub](https://github.com/).
2.  Un compte [Vercel](https://vercel.com/).

## ⚠️ CORRECTION CRITIQUE DES PARAMÈTRES ⚠️

**Vous devez vérifier ces paramètres sinon le déploiement échouera (Erreur 404 ou Styles manquants).**

1.  Allez dans les **Settings** (Paramètres) de votre projet sur Vercel.
2.  Sélectionnez **Build & Development**.
3.  **Root Directory** (Répertoire Racine) :
    *   **DOIT ÊTRE VIDE**.
    *   ❌ Ne tapez PAS `./`.
    *   ❌ Ne tapez PAS `/`.
    *   ✅ Il doit indiquer "N/A" ou être complètement vide.
    *   **Action** : Effacez tout le contenu de cette case et cliquez sur **Save**.

4.  **Framework Preset** :
    *   Sélectionnez **Other**.

5.  **Build Command** :
    *   **DOIT ÊTRE VIDE**.
    *   Activez "Override" et laissez la case **VIDE**.
    *   (N'utilisez pas `npm run build`).

6.  **Output Directory** :
    *   **DOIT ÊTRE VIDE**.
    *   Activez "Override" et laissez la case **VIDE**.

---

## Étapes de Déploiement Standard

1.  **Push sur GitHub** : Assurez-vous que votre dernier code (incluant `vercel.json` et `requirements.txt`) est envoyé sur votre dépôt GitHub.

2.  **Importer le Projet dans Vercel** :
    *   Connectez-vous à votre tableau de bord Vercel.
    *   Cliquez sur **"Add New..."** -> **"Project"**.
    *   Trouvez votre dépôt `github-portfolio` et cliquez sur **"Import"**.

3.  **Configurer le Projet** :
    *   Suivez la **CORRECTION CRITIQUE DES PARAMÈTRES** ci-dessus.

4.  **Déployer** :
    *   Cliquez sur **"Deploy"**.
    *   Si vous avez déjà déployé et que cela a échoué, allez dans l'onglet **Deployments** et cliquez sur **Redeploy** (menu trois points -> Redeploy) après avoir corrigé les paramètres.

## Dépannage

### ❌ Erreur "Root Directory"
Si vous voyez une erreur rouge indiquant "Root Directory must be a relative path...", cela signifie que vous avez tapé `./` dans la case. **Effacez-le complètement.**

### ❌ Styles/CSS ne chargent pas
Si votre site charge mais semble cassé (pas de couleurs/mise en page) :
1.  Assurez-vous d'avoir envoyé le dernier fichier `vercel.json`.
2.  Nous avons simplifié `vercel.json` pour laisser Flask gérer les fichiers statiques.
3.  Redéployez le projet (Allez dans **Deployments** -> **Redeploy**).

### ❌ Erreur 404 Not Found
Cela signifie que Vercel n'a pas construit l'application Python correctement.
1.  Assurez-vous que `vercel.json` est à la racine de votre dépôt.
2.  Assurez-vous que **Build Command** est vide (pour que Vercel utilise le build Python par défaut).
3.  Assurez-vous que **Root Directory** est vide.
