$(function () {
    //给头部表现的关于我们添加鼠标滑过事件
    $(".about").hover(function () {
        $(".about_content").toggleClass("show_about");
    });

    //创建banner导航栏
    class BannerNav {
        constructor(data) {
            this.data = data;
        }
        //初始化
        init() {
            this.createHtml();
            this.mouseWithLeft();
        }
        //创建标签
        createHtml() {
            this.createLeft();
            this.createRight()
        }
        //创建导航栏左侧标签
        createLeft() {}
        //创建导航栏右侧标签
        createRight() {}
        //给左侧标签添加鼠标滑过事件
        mouseWithLeft() {}
    }
    //发送网络请求，实例化对象
    $.ajax({
        type: "get",
        url: "../server/banner.php",
        success: function (response) {
            console.log(response);
        }
    });
    //创建banner轮播图
})