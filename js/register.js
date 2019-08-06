$(function () {
    /*  验证码处理 */
    (new Captcha({
        fontSize: 80,
        lineNum: 20,
        dotR: 3,
        dotNum: 30
    })).draw($("#captcha")[0], text => {
        console.log(text, "验证码");
    })
    /* 正则表达式 */
    let regUsername = /^[A-Za-z\d]{6,8}$/;
    let regPhone = /^1[3-9]\d{9}$/;
    let regPassword = /^[a-zA-Z0-9]{6,16}$/;
})