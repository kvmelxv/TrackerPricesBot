import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const URL =  "https://www.linenchest.com/en_ca/de-longhi-la-specialista-arte-evo?objectID=318961&indexName=lc2en_ca_products";

export async function sendAlert(price) {
    const message = {
        content: `Le prix de la machine à café a baissé à ${price} CAD ! Achetez maintenant : ${URL}`,
    };

    try {
        await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(message),
        });

        console.log("Alerte Discord envoyée !");
    } catch (error) {
        console.error("Erreur d'envoi sur Discord :", error);
    }
}