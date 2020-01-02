import Puppeteer from 'puppeteer';
import { promisify } from 'util';

const Wait = promisify(setTimeout);

async function main(): Promise<void> {
  console.info(`Running \n***`);

  const browser: Puppeteer = await Puppeteer.launch();

  let nextId: number = 1;
  let shouldContinue = true;

  while(shouldContinue) {
    const url: string = `https://www.saatchiart.com/account/artworks/${nextId}`
    console.info(`[${nextId.toString().padStart(9, ' ')}] data from: ${url}`);
    // const data = await getDataFromUrl(url, browser);

    
    await Wait(Math.random() * 5000);
    nextId++;
  }
  return;
}

async function getDataFromUrl(url: string, browser) {
  const page: Puppeteer.page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on('request', request => {
    const resourceType = request.resourceType()

    if (resourceType === 'document') {
      request.continue()
    } else {
      request.abort()
    }
  })

  page.on('requestfinished', (request) => {
    console.info('requestfinished', request.status());
  });
  await page.goto(url);

  return url;
}

main().finally(() => {
  console.info(`Exiting.`);
  process.exit();
});
