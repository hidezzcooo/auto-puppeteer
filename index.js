const puppeteer = require('puppeteer')
const readline = require('readline')
const fs = require('fs')
const log_arr = ['response.txt', 'failure.txt']
let deleteTxt = txtArr => txtArr.forEach(item => fs.exists(item, exists => exists && fs.unlink(item, err => err)))

try {
  (async () => {
    let response_log = ''
    let failed_log = ''
    
    // clean previously log
    await deleteTxt(log_arr)

    const browserFetcher = puppeteer.createBrowserFetcher()
    const localRevision = await browserFetcher.localRevisions()
    const version = process.argv[3] || localRevision[0]
    const revisionInfo = await browserFetcher.download(version, (dB, tB) => {
      readline.cursorTo(process.stdout, 0)
      process.stdout.write(`  Downloading Chromium r${version} - ${(tB/1000000).toFixed(1)} Mb ${((dB/tB) * 100).toFixed(1)}%`)
    })
    const browser = await puppeteer.launch({executablePath: revisionInfo.executablePath})
    const browserVersion = await browser.version()
    const page = await browser.newPage()

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

    console.log(`\n  > Checking : ${process.argv[2]}`)
    console.log(`  > Browser version : ${browserVersion}`)
    // navigate to <URL>
    await page.goto(process.argv[2])

    // after 5s timeout
    await page.waitFor(5000)

    //close browser
    browser.close()
    console.log('  > Done!')

    process.argv[3] && localRevision.forEach(item => item !== process.argv[3] && browserFetcher.remove(item))
  })()
} catch (err) {
  console.log(err)
}
