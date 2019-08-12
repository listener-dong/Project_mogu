$(function () {
    //给注册按钮添加点击跳转
    $(".reg").click(function () {
        window.location.href = "./register.html";
    });
    //创建login的class类
    class LoginManger {
        constructor() {
            this.oMain = null;
            this.oBtn = null;
        }
        //初始化
        init() {
            this.oBtn = $("#btn"); //登陆按钮
            this.toggleTab();
            this.listenOrd();
        }
        //选项卡切换
        toggleTab() {
            /* 给上标题添加事件委托 */
            this.oMain = $(".login_main").children();
            let left = this;
            $(".login_type").on("click", "li", function () {
                $(this).addClass("active").siblings().removeClass("active");
                let index = $(this).index();
                left.oMain.eq(index).addClass("show").siblings().removeClass("show");
            })
        }
        //监听普通登陆事件
        listenOrd() {
            let oInfo = $(".ord"); //拿到提示标签
            let regUsername = /^[A-Za-z\d]{6,10}$/; //判断用户名格式
            let regPassword = /^[a-zA-Z0-9]{6,16}$/; //判断密码格式
            let userName = "";
            let passWord = "";
            //给用户名输入框添加两个事件，一个点击，一个失去焦点
            $("#userName").on("click", function () {
                oInfo.removeClass("active_i");
            })
            $("#userName").on("blur", function () {
                userName = $.trim($("#userName").val());
                if (userName.length == 0) {
                    oInfo.addClass("active_i").html("请输入您的用户名！")
                } else if (!regUsername.test(userName)) {
                    oInfo.addClass("active_i").html("请输入正确用户名格式！")
                } else {
                    oInfo.removeClass("active_i");
                }
            })
            //给密码名输入框添加两个事件，一个点击，一个失去焦点
            $("#password").on("click", function () {
                oInfo.removeClass("active_i");
            })
            $("#password").on("blur", function () {
                passWord = $.trim($("#password").val());
                if (passWord.length == 0) {
                    oInfo.addClass("active_i").html("请输入您的密码！")
                } else if (!regPassword.test(passWord)) {
                    oInfo.addClass("active_i").html("请输入正确密码格式！")
                } else {
                    oInfo.removeClass("active_i");
                }
            })
            //登陆按钮添加点击事件
            $(this.oBtn).click(function () {
                $.ajax({
                    type: "post",
                    url: "../server/api/login.php",
                    dataType: "json",
                    data: `username=${userName}&&password=${passWord}`,
                    success: function (response) {
                        console.log(response);
                        let status = response.status;
                        console.log(status);
                        if (status == "success") {
                            alert("登陆成功！")
                        }
                    }
                });
            })
        }
    }
    let test = new LoginManger();
    test.init();
})