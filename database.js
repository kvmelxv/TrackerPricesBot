import fs from "fs";
const path = "data/prices.json";

//Lire le dernier prix enregistrer
export function getLastPrice() {
    if (!fs.existsSync(path)) return null;

    const data = JSON.parse(fs.readFileSync(path, "utf8"));
    return data.prices.length > 0 ? data.prices[data.prices.length - 1].price : null;
}

//Enregister un nouveau prix dans le fichier JSON
export function savePrice(price) {
    let data = { prices: [] };

    //Vérifier si le fichier existe et lire son contenu
    if (fs.existsSync(path)) {
        data = JSON.parse(fs.readFileSync(path, "utf8"));
    }

    //Ajouter le nouveau prix avec la date actuelle
    data.prices.push({
        price,
        date: new Date().toISOString()
    });

    //Sauvegarder les données dans le fichier
    fs.writeFileSync(path, JSON.stringify(data, null, 4));
}
