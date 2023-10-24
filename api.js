const fs = require('fs');
const path = "./jobs.json";
require('dotenv').config();
const key = process.env.WAInstance
let data = readFile()

function readFile() {
    try {
        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        return data;
    } catch (error) {
        console.error('Erro ao ler o arquivo:', error);
        return [];
    }
}

module.exports = {
    getData: () => {
        
        if (data) {
            return data;
        } else {
            console.log('Não existem dados em data ou dbData');
            return null;
        }
    },

    jobExist: (title) => {
        return data.some((item) => item.title === title);
    },

    saveNewJob: async(dataNewJob) => {

       for (const job of dataNewJob) {
            const verify = await data.find((item) => item.title === job.title);
            if (verify === undefined) {

                data.unshift(job)
                fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');

                const url = `http://18.230.140.98:3333/message/text?key=${key}`
                const message ={
                    id:"558198857479",
                    message: `🧙${job.title} : ${job.link}`
                }
               
                    await fetch(url,{
                        method: 'POST',
                        headers:{
                            "Content-Type":"application/json; charset=utf-8"
                        },
                        body:JSON.stringify(message)
                    }).then((res)=>res.json()).then((data)=>console.log(data)).catch((eerr)=>console.log(eerr))
                console.log(`Adicionei no banco ${job.title}`)
                
                 
            }else{
                console.log(`Existe ${job.title}`)
            }
        }
        

    }
};
