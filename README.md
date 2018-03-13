# auto-puppeteer

## 安装puppeteer
首先需要安装 puppeteer，命令行下运行
```
cd auto-puppeteer    // enter puppeteer project
npm i  or  cnpm i    // install puppeteer
```
> 注意：如果在祖国母亲的怀抱下运行 puppeteer，请务必使用*cnpm*执行命令

如果使用 ==npm== 安装 puppeteer 可能会出现下面的错误
> (node:35089) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): AssertionError [ERR_ASSERTION]: Chromium revision is not downloaded. Run "npm install" or "yarn install"

也可以手动下载 Chromium 并修改 ==index.js== 文件里 launch 的配置项 ==executablePath== 指定 Chromium 的安装路径，例如
```
puppeteer.launch({executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium'})
```
安装配置完成，运行（URL为将要进行检测的目标地址）
```
npm start <URL> // URL is target website address
```
---
- 建议使用手动指定 Chromium 路径运行程序，因为使用默认安装 puppeteer 的浏览器版本为66，可能会出现某些 https 证书不能通过验证，导致程序将其当做请求失败处理，所以最好使用66以下的 Chromium 版本




