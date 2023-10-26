const cron = require('node-cron')
const fs = require('fs');
const path = "./jobs.json";
const date =  new Date()

function readFile() {
    try {
        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        return data;
    } catch (error) {
        console.error('Erro ao ler o arquivo:', error);
        return [];
    }
}

function updateJobsdB(){
    let data = readFile()

    for (var i = data.length - 1; i >= 0; i--) {
        var dataPostagem = new Date(data[i].postDate);
        var diferencaEmDias = (date - dataPostagem) / (1000 * 60 * 60 * 24);
      
        if (diferencaEmDias >= 1) {
            console.log(`Removido do banco:${data[i].title}`)
            data.splice(i, 1); 
            fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');

        }
      }

    

}cron.schedule('0 0 */2 * * *',updateJobsdB)
updateJobsdB()

