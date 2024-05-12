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
        for (let i = 1; i < 6; i++) {
        const page = await browser.newPage();
        await page.setUserAgent(randomUseragent.getRandom())
        await page.goto(`https://www.workana.com/jobs?category=it-programming&has_few_bids=1&language=pt&publication=1d&page=${i}`,{timeout:60000});
            
        await page.waitForSelector('.project-title');
        const dataNewJob = await page.$$eval('.project-title', (dados) => {
        return dados.map((job) => {
          const title = job.innerText;
                        let link = job.children[0].href;
                        if(!link){
                            link = job.children[0].children[0].href
                        }
                        const date =  new Date().getDate()
                        
                        return { title, link,date };
                    });
                });


              await api.saveNewJob(dataNewJob);
  
      

      
            }

     await browser.close()
    } catch (error) {
        console.error('Erro:', error);
       await browser.close()
    }finally {
        const pages = await browser.pages();
    
        for(const page of pages) await page.close();
      }
}

connectToWorkana();

cron.schedule('*/2 * * * * ', () => connectToWorkana());
