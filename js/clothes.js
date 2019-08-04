define(function () {
    console.log("11")
    //女装模块class类
    class Clothes {
        constructor() {
            this.data = data;
            this.tit = tit;
            console.log(this.data, this.tit);
        }
        //初始化
        init() {
            this.createHtml();
        }
        //创建页面标签
        createHtml() {
            this.createHeaer();
            this.createContent();
            this.oContent = $("<div class='content'></div>");
            this.oClothes = $("<div></div>").attr("id", "clothes").append(this.oContent);
            $("#home").append(this.oClothes);
        }
        //创建头部标签
        createHeaer() {
            let oTitle = $("<div></div>").addClass("goods_titile");

        }
        //创建内容标签
        createContent() {}
    }
    return Clothes;
});