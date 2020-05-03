const rp = require('request-promise');
const $ = require('cheerio');

const getSinglePageInfo = function(url) {
    return rp(url)
        .then(function(html) {
            const companyName = $('h2[class="company_name"]', html).text().trim();
            const companyNumbers = [];

            $('a[class="call"]', html).each((i, item) => {
                companyNumbers.push($(item, html).text())
            });

            return {
                companyName,
                companyNumbers : companyNumbers.join(', ')
            }
        })
        .catch((err) => console.log(err));
};

module.exports = getSinglePageInfo;
