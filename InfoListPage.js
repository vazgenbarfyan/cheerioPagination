const rp = require('request-promise');
const $ = require('cheerio');
const getSinglePageInfo = require('./singlePage');
const domain = ''

const getCurrentListValues = (url) => {
    return rp(url).then(function(html) {
        const uris = [];
        const $pageResultTitles = $('.firms_title', html);
        const pageCount = $pageResultTitles.length;

        for(let i = 0, len = pageCount; i < len; i++) {
            uris.push($pageResultTitles[i].attribs.href)
        }

        return Promise.all(
            uris.map(function(url) {
                return getSinglePageInfo(domain + url);
            })
        );
    }).then(function(listValues) {
        return listValues
    }).catch((err) => console.log(err));
};

module.exports = getCurrentListValues;


