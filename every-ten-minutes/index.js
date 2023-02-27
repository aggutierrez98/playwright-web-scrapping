//@ts-check

const { chromium } = require("playwright-chromium");
const shops = require("./shops");

module.exports = async function (context, _) {
    let available = []

    const browser = await chromium.launch({ headless: true })

    for (const shop of shops) {
        const { checkStock, vendor, url } = shop;

        const page = await browser.newPage();
        await page.goto(url)
        try {
            const hasStock = await checkStock({ page })
            if (hasStock) available.push({ vendor })
            context.log(`${vendor}: ${hasStock ? "HAS STOCK!!!" : "out of stock"}`)

        } catch (error) {
            context.log(error)
        }

        await page.close()
    }
    
    await browser.close()

    const availableOn = available.length > 0 ? `XBOX avaibalbe in: ${available.join(", ")}` : "No hay stock"

    context.res = {
        body: availableOn,
        headers: {
            "Content-Type": "application/json"
        }
    }
}; 