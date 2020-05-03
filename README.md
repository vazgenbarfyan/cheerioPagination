# Cheerio Pagination

Cheerio is a Javascript library for scraping web info.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install required packages.

```bash
npm install
```
```bash
npm start
```
## Usage

```
const url = '/'; #specify start page 
const domain = ''; #specify page domain
```
Please make sure to the way of getting next page link is updated accordingly.

```
  #example
  const navigationLastItem = $('div[class="navigation"]', html).children().last();
  const hasNextPage = navigationLastItem.text().trim() === ">";
  const nextPageLink = domain + navigationLastItem.attr('href');
```
