import Puppeteer from 'puppeteer';
import { promisify } from 'util';

const Wait = promisify(setTimeout);


main().finally(() => {
  process.stdout.write(`Exiting \n`);
  process.exit();
});

async function main(): Promise<void> {
  process.stdout.write(`Running \n`);

  let nextId: number = 1;

  return;
}