/*Create by Roku*/

const puppeteer = require('puppeteer')
const fs = require('fs')
const target = process.argv.splice(2)[0]
const txtArr = ['response.txt', 'failure.txt']
let deleteTxt = txtArr => txtArr.forEach(item => fs.exists(item, exists => exists && fs.unlink(item, err => err)))

deleteTxt(txtArr)

try {
  (async () => {
    // const browser = await puppeteer.launch({executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium'})
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    let response_info = ''
    let failed_info = ''
    
    // await page.setRequestInterception(true)
    page.on('response', response => {
    	let responseType = response.request().resourceType()

    	if (responseType === 'script' || responseType === 'image' || responseType === 'stylesheet') {
      	if( response.status() >= 400 ){
  		    response_info += `-Url   : ${response.url()}\n-Status: ${response.status()}\n-Type  : ${responseType}\n\n\n`
  		    fs.writeFile(txtArr[0], response_info, err => err)
      	}
    	}
    })

    page.on('requestfailed', request => {
    	failed_info += `-Url   : ${request.url()}\n-ERR   : ${request.failure().errorText}\n\n`
    	fs.writeFile(txtArr[1], failed_info, err => err)
    })

    console.log(`... Checking <${target}> ...`)
    await page.goto(target)
    await page.waitFor(5000)
    browser.close()
    console.log('... Done ...')
  })()
} catch (err) {
  console.log(err)
}
