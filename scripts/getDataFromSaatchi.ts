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
    const data = await getDataFromUrl(url, browser);

    console.info(`[${nextId.toString().padStart(9, ' ')}] data from: ${url}`);
    
    await Wait(Math.random() * 5000);
    nextId++;
  }
  return;
}

async function getDataFromUrl(url: string, browser: Puppeteer.Browser) {
  const page: Puppeteer.page = await browser.newPage();

  await page.setRequestInterception(true);
  await page.goto(url);
}

main().finally(() => {
  console.info(`Exiting.`);
  process.exit();
});
