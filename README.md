# Topsify

Topsify est un clone de Spotify réalisé avec Next.js 13 et qui consomme l'API Spotify.

## Live Version

[Topsify](https://topsify.2screens.dev/)

## Fonctionnalités

- Connexion au compte utilisateur
- Affichage des musiques récemment écoutées par l'utilisateur
- Affichage des playlists générales
- Recherche parmis les albums, artistes, playlists, podcasts (à venir)
- Affichage des playlists personnelles (à venir)
- Création et édition de playlists (à venir)

## Prérequis

- Node.js et NPM

## Installation

1. Cloner le dépôt:

```
git clone https://github.com/Toufik1247/topsify.git
```

2. Créer une application sur le site de Spotify consacré aux developpeurs 

```
https://developer.spotify.com/dashboard
```

3. Dans le dashboard Spotify de votre application, définir "Redirect URis" : 

```
http://localhost:3000/api/auth/callback/spotify
```

4. Generer une clé secrète NextAuth

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

5. Naviguer dans le dossier projet, renommer et editer le fichier .env.local.example

```
cd topsify
mv .env.local.example .env.local
nano .env.local
```

6. Installer les dépendances

```
npm install
```

7. Lancer le projet en mode développement

```
npm run dev
```

8. Construire le projet et lancer en mode production

```
npm run build
npm run start
```

