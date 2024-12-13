# Weather App

Bienvenue dans l'application Weather App ! Ce projet vous permet d'obtenir des informations météorologiques en temps réel pour n'importe quelle ville grâce à une API.

## Fonctionnalités

- Recherche de la météo par nom de ville.
- Affichage des données telles que : température, humidité, description météorologique, etc.
- Interface utilisateur simple et élégante.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version recommandée : LTS)
- Un gestionnaire de packages comme npm ou yarn
- Une clé API d'un fournisseur de données météo (par exemple, OpenWeatherMap)

## Installation

1. Clonez ce dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/votre-utilisateur/weather-app.git
   ```

2. Accédez au répertoire du projet :

   ```bash
   cd weather-app
   ```

3. Installez les dépendances nécessaires :

   ```bash
   npm install
   ```

4. Configurez vos variables d'environnement :
   - Créez un fichier `.env` à la racine du projet.
   - Ajoutez-y votre clé API comme suit :

     ```env
     API_KEY=VotreCleAPI
     ```

## Utilisation

1. Lancez l'application en mode développement :

   ```bash
   npm start
   ```

2. Ouvrez votre navigateur et accédez à l'adresse suivante :

   ```
   http://localhost:3000
   ```

3. Entrez le nom d'une ville pour obtenir les informations météo correspondantes.

## Structure du projet

- **index.html** : Structure HTML de l'application.
- **style.css** : Styles CSS pour l'apparence.
- **script.js** : Logique JavaScript pour récupérer et afficher les données météo.
- **package.json** : Informations sur les dépendances et scripts du projet.
- **.env** : Variables d'environnement (non inclus par défaut).

## Dépendances

Ce projet utilise les bibliothèques suivantes :

- `axios` : Pour les requêtes HTTP.
- Toute autre dépendance mentionnée dans le fichier `package.json`.

## Contribuer

Les contributions sont les bienvenues ! Voici comment vous pouvez aider :

1. Forkez ce dépôt.
2. Créez une branche pour votre fonctionnalité :

   ```bash
   git checkout -b nouvelle-fonctionnalite
   ```

3. Effectuez vos modifications et validez-les :

   ```bash
   git commit -m "Ajout d'une nouvelle fonctionnalité"
   ```

4. Poussez vos modifications :

   ```bash
   git push origin nouvelle-fonctionnalite
   ```

5. Ouvrez une Pull Request.

Merci d'avoir utilisé Weather App !
# Weather-App
