const puppeteer = require('puppeteer')
const fs = require('fs')
const target = process.argv.splice(2)[0]
const txtArr = ['response.txt', 'failure.txt']
let deleteTxt = txtArr => txtArr.forEach(item => fs.exists(item, exists => exists && fs.unlink(item, err => err)))

// clean previously log
deleteTxt(txtArr)

try {
  (async () => {
    // create browser & set chromium app path
    // const browser = await puppeteer.launch({executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium'})
    const browser = await puppeteer.launch()
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
  		    fs.writeFile(txtArr[0], response_log, err => err)
      	}
    	}
    })

    // listener for requestfail
    page.on('requestfailed', request => {
    	failed_log += `-Url   : ${request.url()}\n-ERR   : ${request.failure().errorText}\n\n`
    	fs.writeFile(txtArr[1], failed_log, err => err)
    })

    console.log(`... Checking : <${target}> ...`)
    console.log(`... Browser version : ${browser_version}`)
    await page.goto(target)
    await page.waitFor(5000)
    browser.close()
    console.log('... Done ...')
  })()
} catch (err) {
  console.log(err)
}
