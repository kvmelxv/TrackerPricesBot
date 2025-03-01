import { getPrice } from "./scraper.js";
import { savePrice, getLastPrice } from "./database.js";
import { sendAlert } from "./notifier.js";

(async () => {
    console.log("Vérification du prix en cours...");

    const price = await getPrice();

    if (!price) {
        console.log("Impossible de récupérer le prix.");
        return;
    }

    const lastPrice = getLastPrice();
    
    if (!lastPrice || price < lastPrice) {
        console.log("⬇️ Prix en baisse, envoi d'une alerte !");
        sendAlert(price);
    } else {
        console.log("Pas de baisse de prix.");
    }

    savePrice(price);
    
})();
