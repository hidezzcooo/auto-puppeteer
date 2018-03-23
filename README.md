## 准备工作
想要安装 puppeteer，需要做如下准备工作；

 - 确保 `node` 版本 >= `v7.6.0`
 - 绑定 `host` ：`216.58.221.48 storage.googleapis.com`

## 安装
配置好 `host` 拷贝代码然后执行下面的命令:

```bash
> cd auto-puppeteer    # enter puppeteer dir
> npm i                # install puppeteer
```

如果没有绑定 `host` 安装可能会出现下面的一坨：
> \> ERROR: Failed to download Chromium r543305! Set &nbsp;&nbsp;"PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download.<br>
&nbsp;&nbsp;{ Error: getaddrinfo ENOTFOUND storage.googleapis.com storage.googleapis.com:443<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;at errnoException (dns.js:50:10)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:92:26)<br>
&nbsp;&nbsp;code: 'ENOTFOUND',<br>
&nbsp;&nbsp;errno: 'ENOTFOUND',<br>
&nbsp;&nbsp;syscall: 'getaddrinfo',<br>
&nbsp;&nbsp;hostname: 'storage.googleapis.com',<br>
&nbsp;&nbsp;host: 'storage.googleapis.com',<br>
&nbsp;&nbsp;port: 443 }

这是因为没有绑定 `host` 的话根本打不开 storage.googleapis.com 。

从错误中发现可以通过设置全局变量 `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` 来跳过自动安装 Chromium ；

如果 Chromium 正常下载将会显示：

```bash
Downloading Chromium r543305 - 75.3 Mb [==                  ] 8% 157.2s
```
## 运行
安装配置完成，运行：
```bash
> npm start <url> # url is target website address

  > Checking : url
  > Browser version : HeadlessChrome/6x.0.xxxx.x
  > Done!
```
- url 为要检测的完整链接地址(不需要尖括号...)
### 如何使用其他版本 Chromium？

如果当前版本的 Chromium 不能满足需求，可以添加参数来指定：
```bash
> npm start <url> <revision> # add revision params
```
- revision 为 Chromium 的修订版本号，可以参考[这里](http://omahaproxy.appspot.com/)<br>

> 这里注意：Chromium 将会使用最后一次输入的 revision 版本，并且在程序内只会保存一个版本。
### 手动修改 Chromium 路径

修改 `index.js` 文件的 `executablePath` 可以指定 Chromium 的安装路径：
```javascript
puppeteer.launch({executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium'})  // on MacOS
```

> 由于 puppeteer 默认安装当前 Chromium 的最高版本，会导致某些https请求验证不通过，当做请求失败处理的情况。
## 相关
- [puppeteer github](https://github.com/GoogleChrome/puppeteer/tree/v1.1.1)
- [puppeteer api](https://github.com/GoogleChrome/puppeteer/blob/v1.1.1/docs/api.md)
- [Chromium_OSX_65.0.3325.146](https://iweb.dl.sourceforge.net/project/osxportableapps/Chromium/Chromium_OSX_65.0.3325.146.dmg)



