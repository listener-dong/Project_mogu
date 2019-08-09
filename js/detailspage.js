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
            $(".big_photo").html(`<li class="li_photo"><img src=${this.data.src}></li>`);
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
})