const puppeteer = require('puppeteer')
const readline = require('readline')
const fs = require('fs')
const log_arr = ['response.txt', 'failure.txt']
const revision = process.argv[3] || '533271'
let deleteTxt = txtArr => txtArr.forEach(item => fs.exists(item, exists => exists && fs.unlink(item, err => err)))

try {
  (async () => {
    // clean previously log
    await deleteTxt(log_arr)

    // create browser & set chromium app path
    // const browser = await puppeteer.launch({executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium'})
    const browserFetcher = puppeteer.createBrowserFetcher()
    const revisionInfo = await browserFetcher.download(revision, (dB, tB) => {
      readline.cursorTo(process.stdout, 0)
      process.stdout.write(`  Downloading chromium(${revision}) ... ${((dB/tB) * 100).toFixed(1)}%`)
    })
    const browser = await puppeteer.launch({executablePath: revisionInfo.executablePath})
    const browser_version = await browser.version()
    const page = await browser.newPage()
    let response_log = ''
    let failed_log = ''
    
    // await page.setRequestInterception(true)
    
    // listener for response result
    page.on('response', response => {
    	let responseType = response.request().resourceType()

    	if (responseType === 'script' || responseType === 'image' || responseType === 'stylesheet') {
      	if( response.status() >= 400 ){
  		    response_log += `-Url   : ${response.url()}\n-Status: ${response.status()}\n-Type  : ${responseType}\n\n\n`
  		    fs.writeFile(log_arr[0], response_log, err => err)
      	}
    	}
    })

    // listener for requestfail
    page.on('requestfailed', request => {
    	failed_log += `-Url   : ${request.url()}\n-ERR   : ${request.failure().errorText}\n\n`
    	fs.writeFile(log_arr[1], failed_log, err => err)
    })

    console.log(`\n  Checking : <${process.argv[2]}> ...`)
    console.log(`  Browser version : ${browser_version}`)
    await page.goto(process.argv[2])
    // after 5s timeout
    await page.waitFor(5000)
    browser.close()
    console.log('  Done ...')
  })()
} catch (err) {
  console.log(err)
}
