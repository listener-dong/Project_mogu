$(function () {
    //创建详情页class类
    class Details {
        constructor(data) {
            this.data = data;
        }
        //初始化
        init() {
            this.createHtml();
        }
        //数据插入页面
        createHtml() {
            /* 标题插入 */
            $(".title").html(this.data.title);
            /* 大图插入 */
            $(".big_photo").html(this.data.pictue.map(ele => {
                return ` <li class="li_photo"><img src=../images/${ele}></li>`;
            }).join(""));
            /* 小图插入 */
            $(".small_photo").html(this.data.pictue.map(ele => {
                return ` <li class="lis"><img src=../images/${ele}></li>`;
            }).join(""));
            /* 选择图插入 */
            $(".cen_photo").html(this.data.pictue.map(ele => {
                return ` <li class="tip"><img src=../images/${ele}></li>`;
            }).join(""));
            /* 价格插入 */
            $(".org_i").html("￥" + this.data.org);
            $(".sale_i").html("￥" + this.data.sale);
        }
    }
    $.ajax({
        type: "get",
        url: "../server/detailspage1.json",
        success: function (response) {
            let test = new Details(response);
            test.init();
        }
    });
})