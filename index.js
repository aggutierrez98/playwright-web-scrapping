//@ts-check

const { chromium, } = require("playwright");

const shops = [
    {
        vendor: "Microsoft",
        url: "https://www.xbox.com/es-es/configure/8WJ714N3RBTL",
        checkStock: async ({ page }) => {
            const content = await page.textContent("[aria-label='Finalizar la compra del pack']")
            return content?.includes("Sin existencias") === false
        }
    },
    {
        vendor: "Geekspot",
        url: "https://geekspot.com.ar/productos/consola-xbox-series-x-1tb/",
        checkStock: async ({ page }) => {
            const locator = await page.locator(".js-prod-submit-form")
            const value = await locator.getAttribute("value")
            return value.includes("Sin stock") === false
        }
    },
    {
        vendor: 'Fnac',
        hasSchema: true,
        url: 'https://www.fnac.es/Consola-Xbox-Series-X-1TB-Negro-Videoconsola-Consola/a7732201',
        checkStock: async ({ page }) => {
            const notAvailableIcon = await page.$$('.f-buyBox-availabilityStatus-unavailable')
            return notAvailableIcon.length === 0
        }
    },
    {
        vendor: 'El Corte Inglés',
        hasSchema: false,
        url: 'https://www.elcorteingles.es/videojuegos/A37047078-xbox-series-x/',
        checkStock: async ({ page }) => {
            const content = await page.textContent('#js_add_to_cart_desktop')
            return content.includes('Agotado temporalmente') === false
        }
    },
    {
        vendor: 'PCComponentes',
        hasSchema: true,
        url: 'https://www.pccomponentes.com/microsoft-xbox-series-x-1tb',
        checkStock: async ({ page }) => {
            const content = await page.textContent('#buy-buttons-section')
            return content && content.includes('Añadir al carrito') === true
        }
    },
    // disabled for now because it's not working properly
  // {
  //   vendor: 'MediaMarkt',
  //   hasSchema: true,
  //   url: 'https://www.mediamarkt.es/es/product/_consola-microsoft-xbox-series-x-1-tb-ssd-negro-1487615.html',
  //   checkStock: async ({ page }) => {
  //     const content = await page.textContent('[data-test="pdp-product-not-available"]')
  //     return content.includes('no está disponible') === false
  //   }
  // }
];

(async () => {
    const browser = await chromium.launch({headless: false})

    for (const shop of shops) {
        const { checkStock, vendor, url } = shop;

        const page = await browser.newPage();
        await page.goto(url)
        const hasStock = await checkStock({ page })

        console.log(`${vendor}: ${hasStock ? "HAS STOCK!!!" : "out of stock"}`)
        await page.screenshot({path: `screenshots/${vendor}.png`})

        await page.close()
    }

    await browser.close()
})()