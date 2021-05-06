const puppeteer = require('puppeteer');

async function webscrapAmazon (searchTerms) {
    // need to be Author, Title, Publisher and Date for old books predating isbn
    // const searchTerms = props.searchTerms;
    const url = 'https://www.amazon.co.uk/';
    console.log("inside webscrapper");
    let amazonVolumeListings = [];

    try {
    var browser = await puppeteer.launch();

    var page = await browser.newPage();

    const navigationPromise = page.waitForNavigation()
  
    await page.goto(`${url}`);    
    
    await page.waitForSelector('#nav-search #twotabsearchtextbox');
    await page.click('#nav-search #twotabsearchtextbox');
    await page.$eval('#nav-search #twotabsearchtextbox', (el, value) => el.value = value, searchTerms);
    await page.waitForSelector('#nav-search > .nav-searchbar > .nav-right > .nav-search-submit > .nav-input');
    await page.click('#nav-search > .nav-searchbar > .nav-right > .nav-search-submit > .nav-input');
    
    await navigationPromise;
    
    await page.waitForSelector('.sg-col-inner > .a-section > .a-size-mini > .a-link-normal > .a-size-medium');
    await page.click('.sg-col-inner > .a-section > .a-size-mini > .a-link-normal > .a-size-medium');
    
    await navigationPromise;    

    await page.waitForSelector('#productTitle');
    const textContent = await page.evaluate(() => document.querySelector('#productTitle').textContent);
    console.log(textContent);

    // click on used    
    if (await page.waitForSelector('.swatchElement > .a-list-item > .tmm-olp-links > .olp-used > .a-size-mini') !== null) 
    {        
        await page.click('.swatchElement > .a-list-item > .tmm-olp-links > .olp-used > .a-size-mini');
  
        await navigationPromise;   
        
        await page.waitForSelector('.olpOfferPrice');

        // const listings = await page.evaluate(() => document.querySelectorAll('.olpOffer'));
        const listingPrimaryPrices = await page.evaluate(() => Array.from(document.querySelectorAll('.olpOfferPrice'), element => element.textContent.match(/£([\s\S]*?)\s/)[1]));
        console.log(listingPrimaryPrices);

        const listingShippingPrices = await page.evaluate(() => Array.from(document.querySelectorAll('.olpShippingInfo'), element => {
            return element.querySelector('.olpShippingPrice') !== null ? element.querySelector('.olpShippingPrice').textContent : '0';
        }));      
        console.log(listingShippingPrices)

        const listingConditions = await page.evaluate(() => Array.from(document.querySelectorAll('.olpCondition'), element => element.textContent.match(/-\s([\s\S]*?)\n/)[1]));
        console.log(listingConditions);  
        
        amazonVolumeListings = listingPrimaryPrices.map((listingPrimaryPrice, index) => 
        ({primaryPrice: listingPrimaryPrice, shippingPrice: listingShippingPrices[index], condition: listingConditions[0]}));

        console.log(amazonVolumeListings);
    }    

    await page.close();
    await browser.close();

    return amazonVolumeListings;

    } catch (e) {
        console.log(e);
        await browser.close();
        return amazonVolumeListings;
    }
}

module.exports = {webscrapAmazon};