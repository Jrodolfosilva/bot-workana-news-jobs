const puppeteer = require("puppeteer");
const api = require('./api');
const cron = require('node-cron');

let browser; 

async function getBrowserInstance() {
    if (!browser) {
        browser = await puppeteer.launch({
            headless: 'new',
            defaultViewport: null
        });
    }
    return browser;
}

async function connectToWorkana() {
    const browserInstance = await getBrowserInstance();

    try {
        const pagePromises = []; // Array para armazenar promessas de páginas

        for (let i = 1; i < 4; i++) {
            const pagePromise = (async () => {
                const page = await browserInstance.newPage();
                await page.goto(`https://www.workana.com/jobs?category=it-programming&has_few_bids=1&language=pt&publication=1d&page=${i}`);
                await page.waitForSelector('.project-title');
                
                const dataNewJob = await page.$$eval('.project-title', (dados) => {
                    return dados.map((job) => {
                        const title = job.innerText;
                        const link = job.children[0].href;
                        const postDate =  new Date().toISOString()

                       ; 

                        return { title, link,postDate };
                    });
                });

                await api.saveNewJob(dataNewJob);
                await page.close(); // Feche a página após a conclusão
            })();

            pagePromises.push(pagePromise);
        }

        // Espere que todas as páginas sejam processadas em paralelo
        await Promise.all(pagePromises);
    } catch (error) {
        console.error('Erro:', error);
    }
}

connectToWorkana();

cron.schedule('*/3 * * * * ', () => connectToWorkana());
