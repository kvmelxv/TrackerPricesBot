import puppeteer from "puppeteer";

const URL =  "https://www.linenchest.com/en_ca/de-longhi-la-specialista-arte-evo?objectID=318961&indexName=lc2en_ca_products";

export async function getPrice() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(URL, { waitUntil: "networkidle2" });

        const bodyText = await page.evaluate(() => document.body.innerText);

        if (bodyText.includes("verify you are human") || bodyText.includes("CAPTCHA")) {
            console.log("⚠️ CAPTCHA détecté, le bot est bloqué !");
            await browser.close();
            return null;
        }

        // Sélecteur du prix
        const priceElement = await page.$("#product-price-318961");

        if (!priceElement) {
            console.log("Impossible de trouver le prix !");
            await browser.close();
            return null;
        }

        const priceText = await page.evaluate(el => el.getAttribute("data-price-amount"), priceElement);
        const price = parseFloat(priceText);
    
        console.log(`Prix actuel : ${price} CAD`);
        
        await browser.close();
        return price;

    } catch (error) {
        console.error("Erreur lors de la récupération du prix :", error);
        await browser.close();
        return null;
    }
}