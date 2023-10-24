# Workana Jobs Notifier Bot

[![Node.js](https://img.shields.io/badge/Node.js-14.17-green.svg)](https://nodejs.org/)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-6.0-blue.svg)](https://github.com/puppeteer/puppeteer)
[![Cron](https://img.shields.io/badge/Cron-2.0-lightgrey.svg)](https://github.com/kelektiv/node-cron)

> Um bot de notificação para jobs na Workana que facilita a vida dos freelancers, especialmente aqueles que estão começando e não têm essa funcionalidade nos planos básicos. O bot utiliza Puppeteer, Node.js, FS (File System), a API Baileys para WhatsApp e o Node-cron para verificar a existência de novos jobs a cada 2 minutos, armazenando as informações em um banco de dados e enviando notificações via WhatsApp.

## Funcionalidades

- [x] Verifica periodicamente a plataforma Workana em busca de novos jobs.
- [x] Armazena informações relevantes dos jobs em um banco de dados local.
- [x] Envia notificações via WhatsApp sempre que novos jobs são encontrados.
- [x] Personalize as configurações para atender às suas necessidades.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 14.17 ou superior.
- [Puppeteer](https://github.com/puppeteer/puppeteer) para navegação na web.
- [Cron](https://github.com/kelektiv/node-cron) para agendar verificações periódicas.
- [API Baileys](https://github.com/adiwajshing/Baileys) para interagir com o WhatsApp.



