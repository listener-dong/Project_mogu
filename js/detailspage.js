$(function () {
    //创建详情页class类
    class Details {
        constructor(data) {
            this.data = data[0];
        }
        //初始化
        init() {
            this.createHtml();
            this.clickWithNum();
            this.clickWithCar();
        }
        //数据插入页面
        createHtml() {
            /* 标题插入 */
            $(".title").html(this.data.title);
            /* 大图插入 */
            $("#l_box").children("img").attr("src", this.data.src);
            $("#r_box").children("img").attr("src", this.data.src);
            // $("#r_box").append(`<img src=${this.data.src}>`);
            /* 小图插入 */
            $(".small_photo").html(`<li class="lis"><img src=${this.data.src}></li>`);
            /* 选择图插入 */
            $(".cen_photo").html(`<li class="tip"><img src=${this.data.src}></li>`);
            /* 价格插入 */
            $(".org_i").html("￥" + this.data.org);
            $(".sale_i").html("￥" + this.data.sale);
        }
        //1.给数量添加点击增减事件
        clickWithNum() {
            let cont = 1;
            let oInput = $(".number").find(".val");
            oInput.val(cont);
            $(".number").on("click", "span", function () {
                if ($(this).attr("class") == "push") {
                    oInput.val(++cont)
                } else if ($(this).attr("class") == "less") {
                    oInput.val(--cont);
                    if (cont <= 1) {
                        cont = 1;
                        oInput.val(cont);
                    }
                }
            })
        }
        //2.给加入购物车按钮添加点击事件
        clickWithCar() {
            let self = this;
            $(".car").click(function () {
                let num = $(".number").find(".val").val();
                let shopid = Cookie.getItem("shopid");
                let isActive = 1;
                let title = self.data.title;
                let src = self.data.src;
                let org = self.data.org;
                let sale = self.data.sale;
                //3.发送网络请求把商品的id、复选框状态、标题、价格(售价和折扣价))、图片、数量、小计插入到购物车的表中
                $.ajax({
                    type: "post",
                    url: "../server/addcart.php",
                    data: `shopid=${shopid}&src=${src}&title=${title}&org=${org}&sale=${sale}&num=${num}&isActive=${isActive}`,
                    // dataType: "json",
                    success: function (response) {

                    }
                });
            })
        }
        //加入购物车功能
        /* 1.给数量添加点击增减事件
           2.给加入购物车按钮添加点击事件
           3.发送网络请求把商品的id、复选框状态、标题、价格(售价和折扣价))、图片、数量、小计插入到购物车的表中 */
    }
    //拿到页面Cookie中的商品id后发送网络请求
    let shopid = Cookie.getItem("shopid");
    $.ajax({
        type: "get",
        url: "../server/findwallData0.php",
        data: `shopid=${shopid}`,
        dataType: "json",
        success: function (response) {
            // Cookie.clear();
            let test = new Details(response);
            test.init();
        }
    });
    /* 放大镜功能 */
    // 1.获取页面标签
    var box = document.getElementById("left_m");
    var mask = document.getElementById("mask");
    var r_box = document.getElementById("r_box");
    var rectangle = document.getElementById("rectangle");
    var pic = r_box.getElementsByTagName('img')[0];

    //给遮罩添加鼠标滑过事件
    mask.onmouseover = function () {
        r_box.style.display = 'block';
        rectangle.style.display = 'block';
    }

    mask.onmouseout = function () {
        r_box.style.display = 'none';
        rectangle.style.display = 'none';
    }

    mask.onmousemove = function (e) {
        var e = e || window.event;
        //鼠标在标签中的位置
        var left = e.offsetX - rectangle.offsetWidth / 2;
        var top = e.offsetY - rectangle.offsetHeight / 2;
        //判断鼠标接近边框的时候给固定值
        if (left < 0) {
            left = 0;
        } else if (left > (box.offsetWidth - rectangle.offsetWidth)) {
            left = box.offsetWidth - rectangle.offsetWidth;
        }

        if (top < 0) {
            top = 0;
        } else if (top > (mask.offsetHeight - rectangle.offsetHeight)) {
            top = mask.offsetHeight - rectangle.offsetHeight;
        }
        //小遮罩在大遮罩中的位置
        rectangle.style.left = left + 'px';
        rectangle.style.top = top + 'px';

        var percentX = left / (box.offsetWidth - rectangle.offsetWidth);
        var percentY = top / (box.offsetHeight - rectangle.offsetHeight);

        //放大效果的图片的位置
        pic.style.left = -percentX * (pic.offsetWidth - r_box.offsetWidth) + 'px';
        pic.style.top = -percentY * (pic.offsetHeight - r_box.offsetHeight) + 'px';
    }
})