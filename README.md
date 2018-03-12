# auto-puppeteer

## 安装puppeteer
首先需要安装puppeteer，命令行下运行
```
cd auto-puppeteer    //enter puppeteer project
cnpm i           // install puppeteer
```
> 注意：如果在祖国母亲的怀抱下运行此程序，请务必使用*cnpm*执行命令

安装完成，运行


```
npm start <URL> //URL is your website address
```


如果出现下面的错误，请手动指定Chromeium的安装路径
> (node:35089) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): AssertionError [ERR_ASSERTION]: Chromium revision is not downloaded. Run "npm install" or "yarn install"
