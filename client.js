// 借助img.onload测算网速 
// 好处：没有跨域问题 
// 坏处：要自己测文件大小并提供参数fileSize,且文件必须为图片，文件大小不能灵活控制
function getSpeedWithImg(imgUrl, fileSize) {
    return new Promise((resolve, reject) => {
        let start = null;
        let end = null;
        let img = document.createElement('img');
        start = new Date().getTime();
        img.onload = function (e) {
            end = new Date().getTime();
            const speed = fileSize * 1000 / (end - start)
            resolve(speed);
        }
        img.src = imgUrl;
    }).catch(err => { throw err });
}
// 通过Ajax测算网速
// 好处： 不用提供文件大小参数，测试的文件不一定要是图片,且数据量能灵活控制
// 坏处：跨域
function getSpeedWithAjax(url) {
    return new Promise((resolve, reject) => {
        let start = null;
        let end = null;
        start = new Date().getTime();
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                end = new Date().getTime();
                const size = xhr.getResponseHeader('Content-Length') / 1024;
                const speed = size * 1000 / (end - start)
                resolve(speed);
            }
        }
        xhr.open('GET', url);
        xhr.send();
    }).catch(err => { throw err });
}

// 通过navigator.connection.downlink读取网速
// 优点：1.这是一个同步方法而不是异步方法 2.不需要任何参数 
// 缺点：1.兼容性很有问题，2.带宽查询不是实时的,具有分钟级别的时间间隔
function getSpeedWithDnlink() {
    // downlink测算网速
    const connection = window.navigator.connection;
    if (connection && connection.downlink) {
        return connection.downlink;
    }
}

// 先尝试采用downlink测速，否则多次AJAX测速并求平均值
function getNetSpeed(url, times) {
    // downlink测算网速
    const connection = window.navigator.connection;
    if (connection && connection.downlink) {
        return connection.downlink;
    }
    // 多次测速求平均值
    const arr = [];
    for (let i = 0; i < times; i++) {
        arr.push(getSpeedWithAjax(url));
    }
    return Promise.all(arr).then(speeds => {
        debugger;
        let sum = 0;
        speeds.forEach(speed => {
            sum += speed;
        });
        return sum / times;
    })
}

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