const puppeteer = require("puppeteer");
const api = require('./api');
const cron = require('node-cron');
const randomUseragent = require('random-useragent');





async function connectToWorkana() {
  const  browser = await puppeteer.launch({
        headless: 'new',
        defaultViewport: null,
        
    });

    try {       
        for (let i = 1; i < 4; i++) {
            const page = await browser.newPage();
            await page.setUserAgent(randomUseragent.getRandom())
            await page.goto(`https://www.workana.com/jobs?category=it-programming&has_few_bids=1&language=pt&publication=1d&page=${i}`,{timeout:60000});
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

                await page.close(); // Feche a página após a conclusão
                await api.saveNewJob(dataNewJob);
        }

      await browser.close()
    } catch (error) {
        console.error('Erro:', error);
    }finally {
        const pages = await browser.pages();
    
        for(const page of pages) await page.close();
      }
}

connectToWorkana();

cron.schedule('*/2 * * * * ', () => connectToWorkana());
