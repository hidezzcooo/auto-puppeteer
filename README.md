# auto-puppeteer

## 安装
首先需要安装 puppeteer，命令行下运行：
```bash
cd auto-puppeteer    # enter puppeteer dir
npm i  or  cnpm i    # install puppeteer
```
> 注意：如果在祖国母亲的怀抱下运行 puppeteer，请务必使用 `cnpm` 执行命令，并且确保 `node` 版本 >=v7.6.0

如果使用 `npm` 安装 puppeteer 可能会出现下面的错误：
> (node:35089) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): AssertionError [ERR_ASSERTION]: Chromium revision is not downloaded. Run "npm install" or "yarn install"

也可以手动下载 Chromium 并修改 `index.js` 指定 Chromium 的安装路径，例如：
```javascript
puppeteer.launch({executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium'})
// on MacOS
```
## 运行
安装配置完成，运行（URL为将要进行检测的目标地址）：
```bash
npm start <URL> # URL is target website address
```
> 建议手动安装 [Chromium/66 以下版本](http://chromium.woolyss.com/#external-extension-installation)，由于默认 puppeteer 默认安装浏览器版本为66+，会导致某些https请求验证不通过，并当做请求失败处理。
## 相关
- [puppeteer github](https://github.com/GoogleChrome/puppeteer/tree/v1.1.1)
- [puppeteer api](https://github.com/GoogleChrome/puppeteer/blob/v1.1.1/docs/api.md)




