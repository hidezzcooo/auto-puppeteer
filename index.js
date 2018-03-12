/*Create by Roku*/

const puppeteer = require('puppeteer')
const fs = require('fs')
const target = process.argv.splice(2)[0]
const txtArr = ['response.txt', 'failure.txt']
let deleteTxt = txtArr => txtArr.forEach(item => fs.exists(item, exists => exists && fs.unlink(item, err => err)))

deleteTxt(txtArr)

try {
  (async () => {
    const browser = await puppeteer.launch({executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium'})
    // const browser = await puppeteer.launch()
    const page = await browser.newPage()
    let response_info = ''
    let failed_info = ''
    
    // await page.setRequestInterception(true)
    // /Applications/Chromium.app/Contents/MacOS/Chromium 

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
    // page.setContent('page.content()')
    console.log('------开始...!')
    console.log(`------检测 <${target}> ...`)
    console.log('------等待...!')
    await page.goto(target)
    await page.waitFor(5000)
    browser.close()
    console.log('------完成...!')
  })()
} catch (err) {
  console.log(err)
}
