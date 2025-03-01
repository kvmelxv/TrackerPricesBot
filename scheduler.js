import cron from "node-cron";
import { getPrice } from "./scraper.js";
import { savePrice, getLastPrice } from "./database.js";
import { sendAlert } from "./notifier.js";

cron.schedule("0 */6 * * *", async () => { // Vérifier toutes les 6h
    console.log("verification du prix ...");

    const price = await getPrice();
    if(!price) return;

    const lastPrice = getLastPrice();
    if(!lastPrice || price < lastPrice) {
        console.log("Prix en baisse, envoi d'une alerte !");
        sendAlert(price);
    }else {
        console.log("Pas de baisse de prix.");
    }

    savePrice(price);
});

console.log("⏳ Bot en attente...");