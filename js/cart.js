$(function () {
    //常见购物车class类
    class CartManger {
        constructor(data) {
            this.data = data;
            this.shopid = null;
        }
        //初始化
        init() {
            this.createHtml();
            this.clickWithNum();
            this.removeData();
        }
        //拿到数据库的数据渲染页面
        createHtml() {
            let html = this.data.map(ele => {
                return ` <tr data-index=${ele.shopid}>
                        <td><input type="checkbox" id="allSelect" ${ele.isActive==1 ? "checked" : "" }></td>
                        <td><img src=${ele.src}><p class="cent">${ele.title}<p></td>
                        <td>${ele.sale}元</td>
                        <td><div class="number"><span class="less">-</span><input type="text" class="val" value=${ele.num}><span class="push">+</span></div></td>
                        <td>${ele.total}（元）</td>
                        <td><i class="remove">删除</i></td>
                     </tr>`;
            }).join("");
            $(".shop_cont").html(html);
            $(".shopnum").html(this.data.length);
        }
        //给数量添加点击增减事件
        clickWithNum() {
            pushless();
        }
        //给删除标签添加点击事件
        removeData() {
            $(".remove").click(function () {
                let shopid = $(this).parents("tr").data("index");
                // console.log(shopid);
                $.ajax({
                    type: "post",
                    url: "../server/removedata.php",
                    data: `shopid=${shopid}`,
                    // dataType: "json",
                    success: function (response) {
                        // console.log(response);
                        getUi();
                    }
                });
            })
        }
    }
    //更新界面方法
    function getUi() {
        $.ajax({
            type: "get",
            url: "../server/getcart.php",
            dataType: "json",
            success: function (response) {
                let test = new CartManger(response);
                test.init();
            }
        });
    }
    getUi();
    // 给数量添加点击增减事件方法
    function pushless() {
        $("tr").on("click", "span", function () {
            let shopid = $(this).parents("tr").data("index");
            let sale = $(this).parent().parent().prev().html();
            sale = sale.substr(0, sale.length - 1) * 1;
            let cont = $(this).siblings(".val").val();
            if ($(this).attr("class") == "push") {
                $(this).siblings(".val").val(++cont);
            } else if ($(this).attr("class") == "less") {
                $(this).siblings(".val").val(--cont);
                if (cont <= 1) {
                    cont = 1;
                    $(this).siblings(".val").val(cont);
                }
            }
            $.ajax({
                type: "post",
                url: "../server/updatanum.php",
                data: `num=${cont}&shopid=${shopid}&sale=${sale}`,
                success: function (response) {
                    getUi();
                }
            });
        })
    }
})