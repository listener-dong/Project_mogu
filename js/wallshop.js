$(function () {
    //给头部表现的关于我们添加鼠标滑过事件
    $(".about").hover(function () {
        $(".about_content").toggleClass("show_about");
    });
    //创建导航控制的class类
    class NavManger {
        constructor(data) {
            this.data = data;
            this.oNav = null;
            this.oContent = null;
            this.oHeader = null;
            this.oBody = null;
            this.oTitle = null;
        }
        //初始化
        init() {
            this.createHtml();
            this.mouseHeader();
        }
        //创建页面标签
        createHtml() {
            this.oNav = $(".shopnav");
            this.oContent = $("<div></div>").addClass("content");
            this.oTitle = $("<h2></h2>").addClass("shop-title").html(this.data[0].title);
            $(".shop_title").find(".content").append(this.oTitle);
            $(this.oNav).append(this.oContent);
            this.createHeader();
            this.createBody();
            $(".nav-li").eq(0).addClass("active");
            $(".content-body").eq(0).addClass("show");
        }
        //创建头部标签
        createHeader() {
            let i = 0;
            this.oHeader = $("<div></div>").addClass("header");
            let html = this.data.map((ele, index) => {
                return `<li class="nav-li" data-index=${index}><a>${ele.title}</a></li>`;
            }).join("");
            this.oHeader.html(`<ul class="nav-ul">${html}</ul>`);
            $(this.oContent).append(this.oHeader);
        }
        //创建内容标签
        createBody() {
            let html_body = this.data.map((ele, index) => {
                let cont = ele.content.map((elc) => {
                    let li = elc.lis.map((e) => {
                        return `<li class="lis">${e}</li>`;
                    }).join("");
                    return `<div class="cont"><div class="tit"><span class="gup-title">${elc.guptitle}</span><img src=../images/${elc.gupsrc}></div><ul class="uls">${li}</ul></div>`;
                }).join("");
                return `<div class="content-body" data-index=${index}>
                        <div class="left">${cont}</div>
                        <div class="right"><img src=../images/${ele.src}></div>
                        </div>`;
            })
            this.oBody = $("<div></div>").addClass("body");
            this.oBody.html(html_body);
            this.oContent.append(this.oBody);
        }
        //鼠标点击事件
        mouseHeader() {
            let self = this;
            //不是箭头函数，this指向被点击的li
            $(".nav-ul .nav-li").click(function () {
                $(this).addClass("active").siblings().removeClass("active");
                let index = $(this).index();
                $(".content-body").eq(index).addClass("show").siblings().removeClass("show");
                self.oTitle.html(self.data[index].title); //下面商品的标题
                $(".goods").find(".content").remove(); //点击先移除商品列表
                //发送网络请求
                $.ajax({
                    type: "get",
                    url: `../server/wall/wallData${index}.json`,
                    data: "data",
                    dataType: "json",
                    success: function (response) {
                        let test = new ShopManger(response);
                        test.init();
                    }
                });
            })
        }
    }
    //创建wall商品列表class类
    class ShopManger {
        constructor(data) {
            this.data = data;
            this.oBox = null;
            this.oContent = null;
        }
        //初始化
        init() {
            this.createHtml();
            this.mouseShop();
            this.clickWithli();
        }
        //创建页面标签
        createHtml() {
            let lis = this.data.map((ele, i) => {
                let html_li = `<li class="shop-li" data-index=${i+1}><img src=${ele.src}><p class="find">找相似</p><p class="name">${ele.title}</p><p class="price"><span class="class_a">￥${ele.sale}</span><span class="class_b">￥${ele.org}</span><img src="../images/upload_27g4f1ch6akie83hacb676j622b9l_32x30.png" class="icon"></p></li>`;
                return html_li;
            }).join("");
            let html_shop = `<ul class="shop-content">${lis}</ul>`
            this.oBox = $(".goods");
            this.oContent = $("<div></div>").addClass("content").html(html_shop);
            $(this.oBox).append(this.oContent);
        }
        //鼠标滑过商品事件
        mouseShop() {
            $(".shop-li").hover(function () {
                $(this).find(".find").toggle();
                $(this).toggleClass("mouse");
            })
        }
        //鼠标点击商品事件
        clickWithli() {
            $(".shop-li").click(function () {
                // console.log($(this).data("index"));
                window.open("../html/detailspage.html");
                /* 发送网络请求，把点击的数据插入到一个新的表中 */
            })
        }
    }
    //发送网络请求
    $.ajax({
        type: "get",
        url: "../server/nav.php",
        data: "data",
        success: function (response) {
            let test = new NavManger(JSON.parse(response));
            test.init();
        }
    });
    //发送网络请求
    $.ajax({
        type: "get",
        url: "../server/getwallData0.php",
        dataType: "json",
        success: function (response) {
            console.log(response);
            let test = new ShopManger(response);
            test.init();
        }
    });
})