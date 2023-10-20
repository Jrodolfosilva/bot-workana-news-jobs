const  puppeteer = require("puppeteer");
const api = require('./api')
const cron = require('node-cron')



async function connectToWorkana(){
    
    const browser = await puppeteer.launch({
        headless:"new",
        defaultViewport: null
    })
    try{
        const page = await browser.newPage() 
        
        for(let i =1; i<5;i++){

            await page.goto(`https://www.workana.com/jobs?category=it-programming&has_few_bids=1&language=pt&publication=1d&page=${i}`) //navego até a url
            page.waitForSelector('.project-title') // Espero o selector está na DOM
            const dataNewJob = await page.$$eval('.project-title',(dados)=>{
            
                return dados.map((job)=>{
                    const title = job.innerText;
                    const link = job.children[0].href;
                    const datajob =  {title,link} 
                    return datajob
                })
            })
                
            api.saveNewJob(dataNewJob) 
        }

        await browser.close()
                
    }catch(error){console.log(error)}
    
 
}

connectToWorkana()

cron.schedule('*/3 * * * * ',()=>connectToWorkana())//busca a cada 3 minuto