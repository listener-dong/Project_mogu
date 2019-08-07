$(function () {
    /* 声明全局变量 */
    let userName = ""; //用户名
    let userPhone = ""; //手机号
    let userPasswordA = ""; //密码A
    let userPasswordB = ""; //密码B
    let msgCode = ""; //输入框的短信验证码
    let imgCodeText = "" //输入框图形验证码的值

    let imgCode = ""; //初始化图形验证码的值

    /*  图形验证码处理 */
    (new Captcha({
        fontSize: 80,
        lineNum: 20,
        dotR: 3,
        dotNum: 30
    })).draw($("#captcha")[0], text => {
        imgCode = text;
        /* 自动触发失去焦点事件 */
        $("#imgCode").trigger("blur");
    })

    let msgCodeText = ""; //生成的短信验证码

    /* 正则表达式 */
    let regUsername = /^[A-Za-z\d]{6,10}$/;
    let regPhone = /^1[3-9]\d{9}$/;
    let regPassword = /^[a-zA-Z0-9]{6,16}$/;
    /* 监听用户名输入框失去焦点事件 */
    $("#usernameID").blur(function (e) {
        let text = $.trim($(this).val());
        userName = text;
        e.preventDefault(); //阻止事件默认动作
        // let b = $(this).next().addClass("info_show");
        // console.log(b)
        if (text.length == 0) {
            $(this).next().addClass("info_show").html("用户名不能为空！");
        } else if (!regUsername.test(text)) {
            $(this).next().addClass("info_show").html("请输入正确的用户名格式！");
        } else {
            $(this).next().removeClass("info_show");
        }
    });
    /* 短信验证码方法 */
    function formatterDateTime() {
        var date = new Date()
        var month = date.getMonth() + 1
        var datetime = date.getFullYear() +
            "" // "年"
            +
            (month >= 10 ? month : "0" + month) +
            "" // "月"
            +
            (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate()) +
            "" +
            (date.getHours() < 10 ? "0" + date.getHours() : date
                .getHours()) +
            "" +
            (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                .getMinutes()) +
            "" +
            (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                .getSeconds());
        return datetime;
    }

    /* 给发送短信按钮添加点击事件 */
    $(".btn_msm").click(function () {
        msgCodeText = parseInt(Math.random() * 1000000);
        let text = $.trim($("#phoneID").val());
        /* 检查手机号是否正确 */
        if (text.length != 0 && regPhone.test(text)) {
            /* 发送网络请求 */
            $.ajax({
                type: 'post',
                url: 'http://route.showapi.com/28-1',
                dataType: 'json',
                data: {
                    "showapi_timestamp": formatterDateTime(),
                    "showapi_appid": '101922', //这里需要改成自己的appid
                    "showapi_sign": 'ac43dbf57a4845f69142f9737f0c04d6', //这里需要改成自己的应用的密钥secret
                    "mobile": text, //手机号码
                    "content": `{"code":${msgCodeText},"minute":"3","comName":"陈旭东发的"}`,
                    "tNum": "T150606060601",
                    "big_msg": ""
                },

                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    alert("操作失败!");
                },
                success: function (result) {
                    console.log("提交成功") //console变量在ie低版本下不能用
                    // alert(result.showapi_res_code)
                }
            });
            let count = 5;
            let timer = setInterval(function () {
                count--;
                if (count <= 0) {
                    $(".btn_msm").html("发送短信验证码");
                    clearInterval(timer);
                } else {
                    $(".btn_msm").html("重试" + count + "s");
                }
            }, 1000);
        } else {
            alert("手机号码不正确");
        }
        /* 开启倒计时，当前标签不可点击 */
    })

    /* 监听短信验证码输入框失去焦点事件 */
    $("#messageCode").blur(function (e) {
        let text = $(this).val();
        msgCode = text;
        e.preventDefault();
        if (text.length == 0) {
            $(this).siblings(".register_info").addClass("info_show").html("短信验证码不能为空！");
        } else if (text != msgCodeText) {
            $(this).siblings(".register_info").addClass("info_show").html("短信验证码输入错误！");
        } else {
            $(this).siblings(".register_info").removeClass("info_show");
        }
    })

    /* 监听手机号输入框失去焦点事件 */
    $("#phoneID").blur(function (e) {
        let text = $.trim($(this).val());
        userPhone = text;
        e.preventDefault(); //阻止事件默认动作
        if (text.length == 0) {
            $(this).next().addClass("info_show").html("手机号不能为空！");
        } else if (!regPhone.test(text)) {
            $(this).next().addClass("info_show").html("请输入正确的手机号码！");
        } else {
            $(this).next().removeClass("info_show");
        }
    });
    /* 监听验证码输入框失去焦点事件 */
    $("#imgCode").blur(function (e) {
        let text = $(this).val().toLowerCase();
        imgCode = imgCode.toLowerCase();
        imgCodeText = text;
        e.preventDefault();
        if (text.length == 0) {
            $(this).siblings(".register_info").addClass("info_show").html("验证码不能为空！");
        } else if (text != imgCode) {
            $(this).siblings(".register_info").addClass("info_show").html("验证码输入错误！");
        } else {
            $(this).siblings(".register_info").removeClass("info_show");
        }
    })
    /* 监听密码输入框失去焦点事件 */
    $("#passwordA").blur(function (e) {
        let text = $.trim($(this).val());
        userPasswordA = text;
        e.preventDefault(); //阻止事件默认动作
        if (text.length == 0) {
            $(this).next().addClass("info_show").html("密码不能为空！");
        } else if (!regPassword.test(text)) {
            $(this).next().addClass("info_show").html("请输入正确格式的密码！");
        } else {
            $(this).next().removeClass("info_show");
        }
    });
    /* 监听确认密码输入框失去焦点事件 */
    $("#passwordB").blur(function (e) {
        let textA = userPasswordA;
        let textB = $.trim($(this).val());
        userPasswordB = textB;
        e.preventDefault(); //阻止事件默认动作
        if (textB.length == 0) {
            $(this).next().addClass("info_show").html("密码不能为空！");
        } else if (textA != textB) {
            $(this).next().addClass("info_show").html("两次输入的密码不一致！");
        } else {
            $(this).next().removeClass("info_show");
        }
    });
    /* 点击注册按钮事件 */
    // (1)先获取标签绑定点击事件
    $(".register_btn").click(function () {
        // location.href = "../home.html";
        //复选框是否勾选
        let ischecked = $("#protocol").is(":checked");
        if (!ischecked) {
            alert("请阅读并同意用户协议！");
            return;
        }
        userName = "chenxudong";
        userPhone = 13502525477;
        imgCodeText = "abcd";
        msgCode = "3333";
        userPasswordA = 1234567;
        userPasswordB = 1234567;
        /* 判断输入框内容不为空且不提示警告信息 */
        if (userName.length != 0 && userPhone.length != 0 && imgCodeText.length != 0 && msgCode.length != 0 && userPasswordA.length != 0 && userPasswordB.length != 0 && $(".info_show").length == 0) {
            $.ajax({
                type: "post",
                url: "../server/api/register.php",
                dataType: "json",
                data: `username=${userName}&userphone=${userPhone}&password=${userPasswordA}`,
                success: function (response) {
                    /* 判断请求是否成功 */
                    if (response.status == "success") {
                        alert(response.msg);
                        window.location.href = "./login.html";
                    } else {
                        alert(response.msg);
                    }
                }
            });
        }
    })
})