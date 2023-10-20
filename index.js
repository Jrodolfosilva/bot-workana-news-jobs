const  puppeteer = require("puppeteer");
const api = require('./api')
async function connectToWorkana (){

const browser = await puppeteer.launch({
    headless:"false",
    defaultViewport: null
})


const page = await browser.newPage()//abro uma nova página 

await page.goto('https://www.workana.com/jobs?category=it-programming&has_few_bids=1&language=pt&publication=1d') //navego até a url

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
}connectToWorkana()

