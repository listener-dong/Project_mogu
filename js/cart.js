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
            this.computedTotalPrice();
            this.checkBox();
            this.checkAll();
        }
        //拿到数据库的数据渲染页面
        createHtml() {
            let html = this.data.map(ele => {
                return ` <tr data-index=${ele.shopid}>
                        <td><input type="checkbox" class="select" ${ele.isActive==1 ? "checked" : "" }></td>
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
                $.ajax({
                    type: "post",
                    url: "../server/removedata.php",
                    data: `shopid=${shopid}`,
                    success: function (response) {
                        getUi();
                    }
                });
            })
        }
        //总价
        computedTotalPrice() {
            let res = 0;
            let times = 0;
            this.data.map(element => {
                if (element.isActive == 1) {
                    res += element.total * 1;
                    ++times;
                }
            });
            $(".total").html(res);
            // console.log(times);
            $(".choose").html(times);
        }
        //给复选框添加点击事件
        checkBox() {
            checkbox();
        }
        checkAll() {
            checkall();
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
    //给单个复选框添加点击事件
    function checkbox() {
        $(".select").click(function () {
            let isActive;
            if ($(this).is(":checked")) {
                isActive = 1;
            } else {
                isActive = 0;
                $("#allSelect").prop("checked", false); //当有一个没有被选中的时候，取消全选勾选
            }
            let shopid = $(this).parents("tr").data("index");
            $.ajax({
                type: "post",
                url: "../server/isactive.php",
                data: `shopid=${shopid}&isActive=${isActive}`,
                // dataType: "dataType",
                success: function (response) {
                    getUi();
                }
            });
        })
    }
    //给全选复选框添加点击事件
    function checkall() {
        $("#allSelect").click(function () {
            let check;
            if ($(this).is(":checked")) {
                check = 1;
            } else {
                check = 0;
            }
            $.ajax({
                type: "post",
                url: "../server/isactiveall.php",
                data: `isActive=${check}`,
                // dataType: "dataType",
                success: function (response) {
                    getUi();
                }
            });
        })
    }
})