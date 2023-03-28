const { test, expect } = require('@playwright/test')

const pagesToCheck = ['index.html',
                      'contact.html',
                      'template-content.html',
]

test('test-valid-footer-links', async ({browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    for (const pageToCheck of pagesToCheck) {
        // console.log("Checking page " + pageToCheck)

        await page.goto(pageToCheck)
        const links = await page.$$("footer a")

        for (const link of links) {
            const url = await link.getAttribute('href')
            console.log("Checking " + pageToCheck + " for valid footer link to " + url)
            if (url.startsWith('#')) {
                console.log(`Skipping link "${url}" because it is not a new page.`)
                continue
            }

            const newPage = await context.newPage()
            const response = await newPage.goto(url)
            const status = response.status()
            expect(response.ok()).toBe(true)

            await newPage.close()
        }
    }
})

test('footer-contains-correct-links-and-wording', async ({page}) => {
    // 2d array of [words,link]
    const expectedFooterLinks = [ ["Privacy Policy", "privacy.html"],
                                  ["Contact","contact.html"]
    ]

    for (const pageToCheck of pagesToCheck) {
        // console.log("Checking page " + pageToCheck)

        await page.goto(pageToCheck)
        const links = await page.$$("footer a")

        for (let i = 0; i < links.length; i++) {
            const link = links[i]
            const textContent = await link.textContent()
            const linkedUrl = await link.getAttribute("href")

            console.log("Checking " + pageToCheck + " has " + expectedFooterLinks[i][0] + " linking to " + expectedFooterLinks[i][1])
            expect (textContent).toBe(expectedFooterLinks[i][0])
            expect (linkedUrl).toBe(expectedFooterLinks[i][1])

        }

    }
})
