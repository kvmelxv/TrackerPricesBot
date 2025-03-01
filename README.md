# Price Tracker Bot

## Description

Price Tracker Bot est un bot qui surveille les prix d'un produit en ligne et envoie une alerte sur Discord lorsque le prix baisse.

## Fonctionnalités

- Scrape le prix d'un produit depuis un site e-commerce (Linen Chest)
- Enregistre les prix dans un fichier JSON
- Compare le prix actuel avec le dernier prix enregistré
- Envoie une notification sur Discord si le prix baisse

## Prérequis

- **Node.js** (version 18+ recommandée)
- **NPM** (inclus avec Node.js)
- **Un Webhook Discord**

## Installation

1. **Cloner le projet**

   ```sh
   git clone https://github.com/ton-utilisateur/price-tracker-bot.git
   cd price-tracker-bot
   ```

2. **Installer les dépendances**

   ```sh
   npm install
   ```

3. **Configurer le Webhook Discord**

   - Crée un webhook dans un serveur Discord
   - Copie l'URL du webhook
   - Remplace `DISCORD_WEBHOOK_URL` dans `notifier.js` par l'URL copiée

4. **Configurer les variables d'environnement**

   - Crée un fichier `.env`
   - Ajoute les informations suivantes :

   ```env
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/TON_WEBHOOK_ID
   ```

## Utilisation

### Lancer le bot manuellement

```sh
node index.js
```

### Programmer un suivi automatique

Le bot utilise `node-cron` pour exécuter la vérification automatiquement.

- Modifier `index.js` pour changer la fréquence du cron job

Exemple : Exécution toutes les 10 minutes

```javascript
cron.schedule("*/10 * * * *", async () => {
    console.log("Vérification du prix en cours...");
    const price = await getPrice();
    if (price) {
        const lastPrice = getLastPrice();
        if (!lastPrice || price < lastPrice) {
            console.log("⬇️ Prix en baisse, envoi d'une alerte !");
            await sendAlert(price);
        }
        savePrice(price);
    } else {
        console.log("⚠️ Impossible de récupérer le prix.");
    }
});
```

## Dépendances

- [Puppeteer](https://pptr.dev/) - Pour scraper les prix
- [Node-fetch](https://github.com/node-fetch/node-fetch) - Pour envoyer les notifications
- [Node-cron](https://www.npmjs.com/package/node-cron) - Pour planifier les vérifications
- [Dotenv](https://www.npmjs.com/package/dotenv) - Pour gérer les variables d’environnement
- [Sqlite3](https://www.npmjs.com/package/sqlite3) - Pour stocker les prix localement

## Améliorations futures

- Support de plusieurs sites e-commerce
- Interface Web pour voir l’historique des prix
- Support pour Telegram et Email

## Auteur

Développé par **Mustapha Kamel Cherif**

