const fs = require('fs');
const path = "./jobs.json";

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
        const data = readFile();
        if (data) {
            return data;
        } else {
            console.log('Não existem dados em data ou dbData');
            return null;
        }
    },

    jobExist: (title) => {
        const data = readFile();
        return data.some((item) => item.title === title);
    },

    saveNewJob: (dataNewJob) => {
        const data = readFile();
        dataNewJob.map((job) => {
            const verify = data.some((item) => item.title === job.title);

            if (!verify) {
                data.unshift(job);
                fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
                console.log(`${job.title}: foi salvo no banco e deve notificar`);
            } else {
                console.log(`Já existe no banco: ${job.title}`);
            }
        });
    }
};
