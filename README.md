## 安装
首先需要安装 puppeteer，命令行下运行：
```bash
> cd auto-puppeteer    # enter puppeteer dir
> cnpm i or npm i      # install puppeteer
```
> 注意：如果是在祖国安装使用 puppeteer，请务必使用 `cnpm` 执行命令，并且确保 `node` 版本 >= v7.6.0

如果使用 `npm` 安装 puppeteer 可能会出现下面的一坨：
> ERROR: Failed to download Chromium r543305! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download.<br>
{ Error: getaddrinfo ENOTFOUND storage.googleapis.com storage.googleapis.com:443<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;at errnoException (dns.js:50:10)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:92:26)<br>
&nbsp;&nbsp;code: 'ENOTFOUND',<br>
&nbsp;&nbsp;errno: 'ENOTFOUND',<br>
&nbsp;&nbsp;syscall: 'getaddrinfo',<br>
&nbsp;&nbsp;hostname: 'storage.googleapis.com',<br>
&nbsp;&nbsp;host: 'storage.googleapis.com',<br>
&nbsp;&nbsp;port: 443 }

导致不能下载 Chromium ，从而无法正常安装 puppeteer；

或者通过设置全局变量 `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` 来跳过自动安装 Chromium 的步骤 ，然后手动下载并安装 Chromium 来运行（使用 `cnpm` 将避免这样的情况发生）；

## Chromium 路径

手动修改 `index.js` 文件可以指定 Chromium 的安装路径：
```javascript
puppeteer.launch({executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium'})  // on MacOS
```
## 运行
安装配置完成，运行（URL为将要进行检测的目标地址）：
```bash
> npm start <URL> # URL is target website address

... Checking : <URL> ...
... Browser version : HeadlessChrome/6x.0.xxxx.x
... Done ...
```
> 建议安装 [Chromium/66 以下版本](http://chromium.woolyss.com/#external-extension-installation)(需要科学上网)，由于 puppeteer 默认安装当前 Chromium 的最高版本，会导致某些https请求验证不通过，当做请求失败处理的情况。
## 相关
- [puppeteer github](https://github.com/GoogleChrome/puppeteer/tree/v1.1.1)
- [puppeteer api](https://github.com/GoogleChrome/puppeteer/blob/v1.1.1/docs/api.md)
- [Chromium_OSX_65.0.3325.146](https://iweb.dl.sourceforge.net/project/osxportableapps/Chromium/Chromium_OSX_65.0.3325.146.dmg)



