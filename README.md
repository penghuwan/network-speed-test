# Network-Speed-Test
测算网速的JS库，采用ES6语法和Promise风格编码，通过img加载/AJAX/downlink等方式测算网速

# Description
提供了四个API
+ **getSpeedWithImg**：借助img.onload测算网速。优点：没有跨域问题。缺点：要自己测文件大小并提供参数fileSize,且文件必须为图片，文件大小不能灵活控制
+ **getSpeedWithAjax**： 通过Ajax测算网速。 优点： 不用提供文件大小参数，测试的文件不一定要是图片,且数据量能灵活控制。缺点：可能需要跨域
+ **getSpeedWithDnlink**: 通过navigator.connection.downlink读取网速。优点：不需要任何参数。缺点：1.兼容性很有问题，2.带宽查询不是实时的,具有分钟级别的时间间隔
+ **getNetSpeed**：先尝试采用downlink测速，否则多次AJAX测速并求平均值

# Usage
如果你只是想看看demo效果：
+ clone 项目
+ 运行 node server.js
+ 浏览器打开localhost:3000/
+ 在client.js调试并输出结果

如果你使用NPM：
先 
```
npm i network-speed-test
```
然后
```
import * from 'network-speed-test';
getSpeedWithImg("https://s2.ax1x.com/2019/08/13/mPJ2iq.jpg", 8.97).then(
    speed => {
        console.log(speed);
    }
)

getSpeedWithAjax('./speed.jpg').then(speed => {
    console.log(speed);
});

getNetSpeed('./speed.jpg', 3).then(speed => {
    console.log(speed);
});

getSpeedWithDnlink();
```
