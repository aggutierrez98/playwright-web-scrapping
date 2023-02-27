module.exports = [
    {
        vendor: "Microsoft",
        hasSchema: false,
        url: "https://www.xbox.com/es-es/configure/8WJ714N3RBTL",
        checkStock: async ({ page }) => {
            const content = await page.textContent("[aria-label='Finalizar la compra del pack']")
            return content?.includes("Sin existencias") === false
        }
    },
    {
        vendor: "Geekspot",
        hasSchema: true,
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
        hasSchema: true,
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
    {
        vendor: 'Amazon',
        hasSchema: false,
        url: 'https://www.pccomponentes.com/microsoft-xbox-series-x-1tb',
        checkStock: async ({ page }) => {
            const content = await page.textContent('#buy-buttons-section')
            return content && content.includes('Añadir al carrito') === true
        }
    },
];