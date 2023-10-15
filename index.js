const  puppeteer = require("puppeteer");


function checkJobs (){

setInterval(()=>{

    connectToWorkana()
},10000)
}

checkJobs()

async function connectToWorkana (){

const browser = await puppeteer.launch({
    headless:"new",
    defaultViewport: null
})

const page = await browser.newPage()



await page.goto('https://www.workana.com/jobs?category=it-programming&language=pt')


const dataPage = await page.evaluate(()=>{

    const title = document.querySelectorAll(".h3.project-title")

   return title

})

console.log(dataPage)

await browser.close()

}


connectToWorkana()