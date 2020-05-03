const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');
const chalk = require('chalk');
const getCurrPageValues = require('./InfoListPage');

const outputFile = 'data.json';
let parsedResults = [];

const url = '/';
const domain = '';

console.log(chalk.yellow.bgBlue(`\n  Scraping of ${chalk.underline.bold(url)} initiated...\n`))

const getWebsiteContent = async (url) => {
    try {
        const html = await rp(url);
        const values = await getCurrPageValues(url);
        parsedResults = parsedResults.concat(values || []);

        const navigationLastItem = $('div[class="navigation"]', html).children().last();
        const hasNextPage = navigationLastItem.text().trim() === ">";
        const nextPageLink = domain + $('div[class="navigation"]', html).children().last().attr('href');


        console.log(chalk.cyan(`  Scraping: ${nextPageLink}`))

        if(!hasNextPage) {
            exportResults(parsedResults);
            return false
        }

        getWebsiteContent(nextPageLink)
    } catch(error) {
        exportResults(parsedResults);
        console.error(error)
    }
};

const exportResults = (parsedResults) => {
    fs.writeFile(outputFile, JSON.stringify(parsedResults, null, 4), (err) => {
        if(err) {
            console.log(err)
        }
        console.log(chalk.yellow.bgBlue(`\n ${chalk.underline.bold(parsedResults.length)} Results exported successfully to ${chalk.underline.bold(outputFile)}\n`))
    })
};

getWebsiteContent(url);
