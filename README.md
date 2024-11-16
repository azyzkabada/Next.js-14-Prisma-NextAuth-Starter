Voici un exemple de fichier README bien organisé pour votre projet Next.js 14, incluant des émojis pour rendre le tout plus attrayant :

---

# 🌟 **Next.js 14 + Prisma + NextAuth Starter**

Bienvenue dans votre projet Next.js 14 avec Prisma, NextAuth, Tailwind CSS, et Nodemailer. 🚀 Ce projet est prêt à l'emploi pour créer une application moderne avec une configuration robuste.

---

## 📚 **Sommaire**

- [🌟 **Next.js 14 + Prisma + NextAuth Starter**](#-nextjs-14--prisma--nextauth-starter)
  - [📚 **Sommaire**](#-sommaire)
  - [⚙️ **Configuration du Projet**](#️-configuration-du-projet)
    - [`.env.local`](#envlocal)
  - [💻 **Installation et Lancement**](#-installation-et-lancement)
  - [🛠️ **Scripts Disponibles**](#️-scripts-disponibles)
  - [🗄️ **Technologies Utilisées**](#️-technologies-utilisées)
  - [📂 **Arborescence**](#-arborescence)
  - [📧 **Configuration SMTP**](#-configuration-smtp)
  - [📖 **Documentation**](#-documentation)
  - [👨‍💻 **Auteur**](#-auteur)

---

## ⚙️ **Configuration du Projet**

Voici les fichiers d'environnement utilisés :

### `.env.local`

```env
# URL de l'application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Configuration PostgreSQL
POSTGRES_URL=postgresql://johndoe:password123@localhost:5432/johndoe_db?schema=public

# Secrets pour l'authentification
AUTH_SECRET=simulatedauthsecretkeyforjohndoe
JWT_SECRET=simulatedjwtsecretkeyforjohndoe

# OAuth - GitHub
GITHUB_ID=johndoe-github-id
GITHUB_SECRET=johndoe-github-secret

# OAuth - Google
GOOGLE_ID=1234567890-johndoe.apps.googleusercontent.com
GOOGLE_SECRET=johndoe-google-secret

# Email
RESEND_API_KEY=simulated-resend-api-key
EMAIL_FROM="John Doe <johndoe@example.com>"
```

---

## 💻 **Installation et Lancement**

1. **Clonez le dépôt :**

    ```bash
    git clone https://github.com/azyzkabada/Next.js-14-Prisma-NextAuth-Starter.git
    ```

2. **Installez les dépendances :**

    ```bash
    npm install
    ```

3. **Configurez la base de données Prisma :**

    ```bash
    npm run prisma:update
    ```

4. **Lancez le serveur en mode développement :**
    ```bash
    npm run dev
    ```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000) 🌐.

---

## 🛠️ **Scripts Disponibles**

Voici les scripts inclus dans le fichier `package.json` :

-   **Lancer en mode développement** : `npm run dev` 🚀
-   **Construire pour la production** : `npm run build` 🏗️
-   **Démarrer le serveur** : `npm run start` 🚀
-   **Linting** : `npm run lint` ✨
-   **Génération Prisma** : `npm run prisma:update` 🛠️
-   **Nettoyage et mise à jour Prisma** : `npm run prisma:clean` 🧹

---

## 🗄️ **Technologies Utilisées**

Voici les outils et bibliothèques utilisés dans ce projet :

-   ⚛️ **React 18** : Frontend moderne.
-   🌐 **Next.js 14** : Framework full-stack.
-   🛡️ **NextAuth.js** : Authentification sécurisée.
-   📦 **Prisma** : ORM pour PostgreSQL.
-   🌈 **Tailwind CSS** : Design et UI réactifs.
-   ✉️ **Nodemailer** : Envoi d'emails.
-   🔒 **JSON Web Tokens** : Sécurité et authentification.

---

## 📂 **Arborescence**

Voici un aperçu de l'organisation du projet :

```plaintext
├── prisma
│   ├── schema.prisma      # Schéma de la base de données
├── src
│   ├── pages
│   │   ├── api
│   │   │   └── auth       # Routes API pour l'authentification
│   │   └── index.js       # Page principale
│   ├── components         # Composants UI réutilisables
│   ├── styles             # Fichiers CSS/Tailwind
├── .env.local             # Configuration d'environnement
├── package.json           # Dépendances et scripts
```

---

## 📧 **Configuration SMTP**

Pour utiliser Nodemailer avec un service SMTP (comme Brevo) :

-   Ajoutez vos informations SMTP dans le fichier `.env.local` :

    ```env
    SMTP_HOST=smtp-relay.johndoe.com
    SMTP_EMAIL_USERNAME=johndoe@example.com
    SMTP_PASSWORD=johndoe-smtp-password
    SMTP_PORT=587
    ```

-   Exemple d'implémentation dans le code :

    ```javascript
    const nodemailer = require('nodemailer')

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    })
    ```

---

## 📖 **Documentation**

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Prisma Documentation](https://www.prisma.io/docs)
-   [NextAuth.js Guide](https://next-auth.js.org/getting-started/introduction)
-   [Tailwind CSS Docs](https://tailwindcss.com/docs)
-   [Nodemailer Setup](https://nodemailer.com/about/)

---

## 👨‍💻 **Auteur**

-   **Azyz Kabada**  
    📧 azyz.kabada@gmail.com  
    🌐 [GitHub](https://github.com/azyzkabada)

---

✨ _Merci d'avoir utilisé ce projet comme base pour votre application !_

---
# Next.js-14-Prisma-NextAuth-Starter
