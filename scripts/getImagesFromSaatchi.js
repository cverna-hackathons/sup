const puppeteer = require('puppeteer')
const Fs = require('fs')
const { promisify } = require('util')
const nextPageLinkSelector = "a.caYruh[aria-label='Pagination next']"
const writeFile = promisify(Fs.writeFile)
const wait = promisify(setTimeout)
const requestResourceTypes = [ 'image', 'document' ]
const imageSrcWhitelist = 'images.saatchiart.com'
const targetFilePath = fileName => `/tmp/target/${fileName}`
const imageFileNameFromUrl = url => url.split('/').pop()
const main = async () => {
  const browser = await puppeteer.launch()
  let nextPageHref = 'https://www.saatchiart.com/drawings'

  while (nextPageHref) {
    let page = await getImagesFromUrl({
      browser,
      pageUrl: nextPageHref
    })
    const nextPageLink = await page.$(nextPageLinkSelector)
    const nextPageLinkHrefProperty = await nextPageLink.getProperty('href')

    nextPageHref = await nextPageLinkHrefProperty.jsonValue()

    await page.close()
    await wait(10000)
    console.info('next', nextPageHref)
  }

  await browser.close()

  console.info('Done')
}

async function getImagesFromUrl({ browser, pageUrl }) {
  const page = await browser.newPage()

  await page.setRequestInterception(true)
  page.on('request', request => {
    const resourceType = request.resourceType()
    const resourceUrl = request.url()
    const filePath = targetFilePath(imageFileNameFromUrl(resourceUrl))

    if (
      requestResourceTypes.includes(resourceType) &&
      (resourceType === 'document' || !Fs.existsSync(filePath))
    ) {
      if (
        resourceType === 'image' &&
        !resourceUrl.includes(imageSrcWhitelist)
      ) {
        request.abort()
      } else {
        console.info('resource request check', resourceType, resourceUrl)
        request.continue()
      }
    } else {
      request.abort()
    }
  })

  page.on('requestfinished', async request => {
    const response = request.response()
    const url = request.url()
    const resourceType = request.resourceType()

    if (resourceType === 'image') {
      const targetLocation = targetFilePath(imageFileNameFromUrl(url))
      const responseBuffer = await response.buffer()

      console.info(
        `request finished [${targetLocation}]`,
        request.url(),
        responseBuffer.byteLength
      )
      await writeFile(targetLocation, responseBuffer)
      // console.info(`written into ${targetLocation}`)
    }
  })

  await page.goto(pageUrl)

  return page
}

main()
