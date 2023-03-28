const { test, expect } = require('@playwright/test')

const pages = ['index.html', 'template-content.html', 'contact.html','privacy.html'];

const expectedNavbarLinks = [ ["Home",             "index.html"],
                              ["Content Template", "template-content.html"]]


for (const pageUrl of pages) {
    test(`Test Valid Navbar Links - ${pageUrl}`, async ({browser}) => {
        const context = await browser.newContext()
        const page = await context.newPage()

        await page.goto(pageUrl)
        const links = await page.$$(".navbar .nav-link")

        for (const link of links) {
            const url = await link.getAttribute('href')
            if (url.startsWith('#')) {
                continue
            }

            const newPage = await context.newPage()
            const response = await newPage.goto(url)
            const status = response.status()
            expect(response.ok()).toBe(true)

            await newPage.close()
        }
    })

    test(`Navbar has the Correct Links - ${pageUrl}`, async ({page}) => {
        await page.goto(pageUrl)
        const links = await page.$$(".navbar .nav-link")

        for (let i = 0; i < links.length; i++) {
            const link = links[i]
            const textContent = await link.textContent()
            const linkedUrl = await link.getAttribute("href")

            expect (textContent).toBe(expectedNavbarLinks[i][0])
            expect (linkedUrl).toBe(expectedNavbarLinks[i][1])
        }
    })
}