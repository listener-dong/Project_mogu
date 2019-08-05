$(function () {
    //给头部表现的关于我们添加鼠标滑过事件
    $(".about").hover(function () {
        $(".about_content").toggleClass("show_about");
    });
    //创建Banner导航栏class类
    class BannerNav {
        constructor(data) {
            this.data = data;
            this.oNav = null;
            this.oShow = null;
        }
        //初始化
        init() {
            this.createHtml();
            this.mouseWithLeft();
        }
        //创建标签
        createHtml() {
            this.oNav = $("<div></div>").addClass("banner_nav");
            $("#banner .content").append(this.oNav);
            let html_main = this.createLeft() + this.createRight();
            this.oNav.html(html_main);
        }
        //创建导航栏左侧标签
        createLeft() {
            let nav = this.data.map(ele => {
                let navi = ele.tist.map(ele => {
                    return `<span class="nav_i ${ele.state}">${ele.name}</span>`
                }).join("");
                return `<li class="nav_li"><h3 class="nav_titile">${ele.title}</h3>${navi}</li>`
            }).join("");
            let navul = `<ul class="nav_ul">${nav}</ul>`;
            return navul;
        }
        //创建导航栏右侧标签
        createRight() {
            let html = this.data.map(ele => {
                let left = ele.show.left.map(ele => {
                    let lis = ele.li.map(ele => {
                        return `<li class="l_li ${ele.ls}">${ele.ln}</li>`;
                    }).join("");
                    return `<div class="left_cont"><div class="left_cont_tit clear"><p class="left_tit">${ele.lt}</p><p class="more">更多<i class="bt"></i></p></div><ul class="left_ul clear">${lis}</ul></div>`;
                }).join("");
                let left_content = `<div class="left_content">${left}</div>`
                let rlis = ele.show.right.map(ele => {
                    return `<li class="r_li"><img src=${ele.src}><p class="r_name">${ele.rn}</p></li>`;
                }).join("");
                let right = `<div class="right_content"><div class="ti_title">/猜您喜欢/</div><ul class="ul_cont clear">${rlis}</ul></div>`;
                return `<div class="show_cont">${left_content + right}</div>`;
            }).join("");
            return html;
        }
        //给左侧标签添加鼠标滑过事件
        mouseWithLeft() {
            $(".nav_li").mouseenter(function () {
                $(this).addClass("active").siblings().removeClass("active");
                let index = $(this).index();
                let uls = $(".show_cont");
                uls.eq(index).addClass("show_block").siblings().removeClass("show_block");
            })
            $(".banner_nav").mouseleave(function () {
                $(".nav_li").removeClass("active");
                $(".show_cont").removeClass("show_block");
            })
        }
    }
    //创建Banner轮播图class类
    class BannerSlider {
        constructor(data) {
            this.data = data;
            this.oSlider = null;
            this.oPhoto = null;
            this.oDirection = null;
            this.oNumber = null;
            this.index = 0;
            this.times = 0;
            this.pictureWidth = 0;
            this.timer = null;
        }
        // 初始化
        init() {
            this.createHtml();
            this.autoPlayer();
            this.clickDirection();
            this.addMouse();
            this.clickNumber();
            this.switchNum(0);
            //获取元素自身的宽度
            this.pictureWidth = this.oPhoto.eq(0).children().eq(0).width();
        }
        // 创建轮播图标签
        createHtml() {
            this.oSlider = $("<div class='banner_slider'></div>");
            $("#banner .content").append(this.oSlider);
            this.creatPhoto();
            this.createDirection();
            this.createNumber();
        }
        //创建背景图标签
        creatPhoto() {
            let photos = this.data.map((ele, i) => {
                this.index = i;
                return `<li class="photo_li"><img src=./images/${ele}></li>`;
            }).join("");
            this.oPhoto = $("<ul></ul>").addClass("photo_ul");
            this.oPhoto.html(photos);
            this.oSlider.append(this.oPhoto);
        }
        //创建方向箭头标签
        createDirection() {
            this.oDirection = $("<div></div>").addClass("direction");
            let html = `<span class="before"></span><span class="last"></span>`;
            this.oDirection.html(html);
            this.oSlider.append(this.oDirection);
        }
        //创建数字选择标签
        createNumber() {
            this.oNumber = $("<ul></ul>").addClass("number");
            let lis = "";
            for (let i = 0; i < this.index + 1; i++) {
                lis = '<li class="num"></li>' + lis;
            }
            this.oSlider.append(this.oNumber.html(lis));
        }
        //背景图自动轮播
        autoPlayer() {
            //定时器
            this.timer = setInterval(() => {
                this.after();
            }, 2000);
        }
        //下一张
        after() {
            this.times++;
            //临界值检查，到最后一张后往第一张跳
            if (this.times > this.oPhoto.children().length - 1) {
                this.times = 0;
            }
            this.oPhoto.css("left", -this.times * this.pictureWidth + "px");
            this.switchNum(this.times);
        }
        //上一张
        before() {
            this.times--;
            //临界值检查，到最后一张后往第一张跳
            if (this.times < 0) {
                this.times = this.oPhoto.children().length - 1
            }
            this.oPhoto.css("left", -this.times * this.pictureWidth + "px");
            this.switchNum(this.times);
        }
        //鼠标点击箭头上下切换
        clickDirection() {
            //拿到页面中上下张切换的标签
            this.oDirection.on("click", (e) => {
                if (e.target.className == "before") {
                    this.before();
                } else if (e.target.className == "last") {
                    this.after();
                }
            })
        }
        //鼠标的移入移出事件
        addMouse() {
            this.oSlider.on("mouseenter", () => {
                clearInterval(this.timer);
            })
            this.oSlider.on("mouseleave", () => {
                this.autoPlayer();
            })
        }
        //鼠标点击序列切换
        clickNumber() {
            let self = this;
            this.oNumber.on("click", "li", function (e) {
                let index = $(this).index();
                self.times = index;
                self.oPhoto.css("left", -self.times * self.pictureWidth + "px");
                self.switchNum(self.times);

            })
        }
        //给序列做排他处理
        switchNum(index) {
            let lis = this.oNumber.children();
            lis.eq(index).addClass("active").siblings().removeClass("active");
        }
    }
    //倒计时-轮播图class类
    class PanicManger {
        constructor(data) {
            this.data = data;
            this.oPanic = null;
            this.slider_ul = null;
            this.slider_cont = null;
            this.oRight = null;
            this.timer = null;
            this.slider_jt = null;
            // console.log(this.data);
            this.index = 0;
            this.liWith = 0;
            this.page = 0;
            this.times = 0;
        }
        //初始化
        init() {
            this.createHtml();
            this.autoPlayer();
            this.addMouse();
            this.clickDirection();
            this.index = this.data.length; //商品总数
            this.liWith = $(this.slider_ul).children().eq(0).innerWidth(); //每个商品的宽度
            this.page = (this.index / 4); //页码
        }
        //创建页面标签
        createHtml() {
            this.oPanic = $("#panic .content");
            this.createTop();
            this.createBottom();
        }
        //创建上部标签
        createTop() {
            //左侧倒计时
            let oLeft = $("<div></div>").addClass("countdown").html("<img src=./images/180423_4c1k410gfcjj100b7ck185ldbc1d4_460x588.png_999x999.v1c0.81.webp>");
            oLeft.append(this.countdownTime());
            let oCountdown = $("<div></div>").addClass("countdown_slider");
            oCountdown.append(oLeft);
            this.sliderWithTop();
            // console.log(this.oRight)
            oCountdown.append(this.oRight); //右侧轮播图导入
            this.oPanic.append(oCountdown);
        }
        //创建下部标签
        createBottom() {
            let self = this;
            $.ajax({
                type: "get",
                url: "./server/panicPhoto.json",
                dataType: "json",
                success: function (response) {
                    let lis = response.map(ele => {
                        // console.log(ele);
                        return `<li class="panic_bottom_photo"><img src=${ele}></li>`;
                    }).join("");
                    let html = `<ul class="panic_bottom_ul">${lis}</ul>`
                    let oPanicBto = $("<div  class='panic_bottom'></div>").html(html);
                    $(self.oPanic).append(oPanicBto);
                }
            });
        }
        //倒计时方法
        countdownTime() {
            let oPanic_time = $("<div></div>").addClass("time");
            let times = setInterval(function () {
                //结束时间
                let endTime = new Date(2019, (8 - 1), 10, 0, 0);
                let nowTime = new Date();
                let testTime = (endTime.getTime() - nowTime.getTime()) / 1000;
                //时分秒
                let h = getNum(Math.floor(testTime / 60 / 60));
                let m = getNum(Math.floor(testTime / 60 % 60));
                let s = getNum(Math.floor(testTime % 60));
                oPanic_time.html(`<span>${h}</span>:<span>${m}</span>:<span>${s}</span>`);
            }, 1000)
            //临界值检查
            function getNum(num) {
                if (num < 10) {
                    num = "0" + num;
                }
                return num;
            }
            return oPanic_time;
        }
        //轮播图
        sliderWithTop() {
            //思路：拿到所有的数据，水平排列
            let slider_lis = this.data.map(ele => {
                return `<li class="goods"><div class="img"><img src=${ele.src}></div><p class="title">${ele.title}</p><p class="price"><span class="original_price">￥${ele.original_price}</span><del class="sale_price">￥${ele.sale_price}</del></p></li>`;
            }).join("");
            this.slider_jt = $("<div></div>").addClass("jiant").html("<span class='before'></span><span class='after'></span>");
            this.slider_ul = $("<ul></ul>").addClass("slider_goods").html(slider_lis);
            this.slider_cont = $("<div></div>").addClass("slider_content").html(this.slider_ul);
            this.oRight = $("<div></div>").addClass("slider");
            this.oRight.append(this.slider_jt).append(this.slider_cont);
        }
        //背景图自动轮播
        autoPlayer() {
            //定时器
            this.timer = setInterval(() => {
                this.after();
            }, 2000);
        }
        //下一张
        after() {
            this.times++;
            //临界值检查，到最后一张后往第一张跳
            if (this.times > this.page - 1) {
                this.times = 0;
                this.slider_ul.css("left", -this.times * 920 + "px"); //跳动有问题
            }
            this.slider_ul.animate({
                left: -this.times * 920 + "px"
            });
        }
        //上一张
        before() {
            this.times--;
            //临界值检查，到最后一张后往第一张跳
            if (this.times < 0) {
                this.times = this.page - 1
                this.slider_ul.css("left", -this.times * 920 + "px"); //跳动有问题
            }
            this.slider_ul.animate({
                left: -this.times * 920 + "px"
            });
        }
        //鼠标点击箭头上下切换
        clickDirection() {
            //拿到页面中上下张切换的标签
            this.slider_jt.on("click", (e) => {
                if (e.target.className == "before") {
                    this.before();
                } else if (e.target.className == "after") {
                    this.after();
                }
            })
        }
        //鼠标的移入移出事件
        addMouse() {
            this.oRight.on("mouseenter", () => {
                clearInterval(this.timer);
            })
            this.oRight.on("mouseleave", () => {
                this.autoPlayer();
            })
        }
    }
    //女装模块class类
    class Clothes {
        constructor(title, data) {
            this.data = data;
            this.title = title;
            // console.log(this.title, this.data);
            this.oContent = null;
            this.oClothes = null;
            this.oUl = null;
            this.timer = null;
            this.goodsSlider = null;
            this.oJt = null;
            this.times = 0;
            this.index = this.data.length; //商品总数
            this.liWith = $(this.slider_ul).children().eq(0).innerWidth(); //每个商品的宽度
            this.page = (this.index / 4); //页码
        }
        //初始化
        init() {
            this.createHtml();
            this.autoPlayer();
            this.addMouse();
            this.clickDirection();
        }
        //创建页面标签
        createHtml() {
            this.oContent = $("<div class='content'></div>");
            this.oClothes = $("<div></div>").attr("id", "clothes").append(this.oContent);
            $("#home").append(this.oClothes);
            this.createHeaer();
            this.createContent();
        }
        //创建头部标签
        createHeaer() {
            let oTitle = $("<div></div>").addClass("goods_top").addClass("clear");
            this.oContent.append(oTitle);
            let title_tis = this.title.tis.map(ele => {
                return `<li class="goods_tit_li">${ele}</li>`
            }).join("");
            oTitle.html(`<span class='color_block'></span><h2 class='goods_title'>${this.title.title}</h2><ul class='goods_tit_ul'>${title_tis}</ul>`);
        }
        //创建内容标签
        createContent() {
            //商品楼层图内容区域标签
            let oBottom = $("<div></div>").addClass("goods_content").addClass("clear");
            //商品楼层左侧大图
            let bigPhoto = $("<div></div>").addClass("big_photo").html(`<img src=${this.title.big_photo}>`);
            //商品楼层右侧详情
            let goodsDetails = $("<div></div>").addClass("goods_details");
            //商品楼层右侧轮播图
            this.goodsSlider = this.createSlider();
            //商品楼层右侧优惠背景
            let goodsSale = $("<ul></ul>").addClass("goods_sale");
            let sale_lis = this.title.bg_src.map(ele => {
                return `<li class="sale_bg"><img src=${ele}></li>`;
            }).join("");
            goodsSale.html(sale_lis);
            //商品楼层右侧商品分组
            let goodsGroup = $("<ul></ul>").addClass("goods_group");
            let group_lis = this.title.goods_group.map(ele => {
                return `<li class="group_bg"><div class="text"><h3 class="g_title">${ele.g_title}</h3><p class="g_name">${ele.g_name}</p></div><img src=${ele.g_src}></li>`;
            }).join("");
            goodsGroup.append(group_lis);

            goodsDetails.append(this.goodsSlider).append(goodsSale).append(goodsGroup);
            oBottom.append(bigPhoto).append(goodsDetails);
            this.oContent.append(oBottom);
        }
        //商品楼层右侧轮播图
        createSlider() {
            let html = this.data.map(ele => {
                return `<li class="goods_list"><img src=${ele.src}><p class="goods_tit">${ele.title}</p><p class="goods_price">￥${ele.sale_price}</p></li>`;
            }).join("");
            this.oJt = $("<div></div>").addClass("slider_jt").html("<span class='before'></span><span class='after'></span>");
            this.oUl = $("<ul></ul>").addClass("slider_ul").html(html);
            return $("<div></div>").addClass("goods_slider").append(this.oUl).append(this.oJt);
        }
        //背景图自动轮播
        autoPlayer() {
            //定时器
            this.timer = setInterval(() => {
                this.after();
            }, 2000);
        }
        //下一张
        after() {
            this.times++;
            //临界值检查，到最后一张后往第一张跳
            if (this.times >= this.page) {
                this.oUl.stop().animate({
                    left: -this.page * 960 + "px"
                });
                this.oUl.css("left", 0 + "px"); //跳动有问题
                this.times = 1;
            }
            this.oUl.stop().animate({
                left: -this.times * 960 + "px"
            });
        }
        //上一张
        before() {
            this.times--;
            //临界值检查，到最后一张后往第一张跳
            if (this.times < 0) {
                this.times = this.page - 1;
                this.oUl.css("left", -(this.times) * 960 + "px");
                this.oUl.stop().animate({
                    left: -(4 * 960) + "px"
                });
                this.times = this.page - 2;
            } else {
                this.oUl.stop().animate({
                    left: -(this.times * 960) + "px"
                });
            }
        }
        //鼠标的移入移出事件
        addMouse() {
            this.goodsSlider.on("mouseenter", () => {
                clearInterval(this.timer);
            })
            this.goodsSlider.on("mouseleave", () => {
                this.autoPlayer();
            })
        }
        //鼠标点击箭头上下切换
        clickDirection() {
            //拿到页面中上下张切换的标签
            this.oJt.on("click", (e) => {
                if (e.target.className == "before") {
                    this.before();
                } else if (e.target.className == "after") {
                    this.after();
                }
            })
        }
    }
    //通用楼层class类
    class SameManger {
        constructor(title, data) {
            this.title = title;
            this.data = data;
            this.oBbox = null;
            this.oContent = null;
            this.oLen = null;
            this.oDot = null;
            this.times = 0;
        }
        //初始化
        init() {
            this.createHtml();
            this.autoPlayer();
            this.clickNumber();
            this.switchNum(0);
        }
        //创建页面表现
        createHtml() {
            this.oContent = $("<div></div>").addClass("content"); //动态设置ID
            this.createHeaer();
            this.createContent();
            this.oBbox = $("<div></div>").attr("id", "shoe_bag").append(this.oContent);
            $("#home").append(this.oBbox);
        }
        //创建标题部分标签
        createHeaer() {
            let oTitle = $("<div></div>").addClass("same_goods_top").addClass("clear");
            this.oContent.append(oTitle);
            let title_tis = this.title.tis.map(ele => {
                return `<li class="goods_tit_li">${ele}</li>`
            }).join("");
            oTitle.html(`<span class='color_block'></span><h2 class='goods_title'>${this.title.title}</h2><ul class='goods_tit_ul'>${title_tis}</ul>`);
        }
        //创建内容部分标签
        createContent() {
            //商品楼层左侧大图
            let oBig = this.title.big_photo.map(ele => {
                return `<li class="big_li"><img src=${ele}></li>`;
            })
            let oBig_ul = $("<ul class='big_ul'><ul>").html(oBig);
            let bigPhoto = $("<div></div>").addClass("big_photo").append(oBig_ul);
            //商品楼层右侧详情
            let goodsDetails = $("<div></div>").addClass("goods_details");
            //详情区域左侧内容
            let goodsleft = this.cerateGoods();
            //详情区域右侧内容
            let goodsright = $("<div></div>").addClass("details_right");
            let oHot = this.title.hot.map(ele => {
                return `<li class="hot_li"><img src=${ele.src}><div class="hot_info"><p class="hot_name">${ele.name}</p><p class="hot_price">￥${ele.price}</p></div></li>`;
            }).join("");
            let hot_ul = $("<ul class='hot_ul'></ul>").html(oHot);
            let hot_tit = $("<div></div>").addClass("hot_header").html("<h3 class='hot_title'>热销品推荐</h3><p class='replace'>换一批</p>");
            goodsright.append(hot_tit).append(hot_ul);
            goodsDetails.append(goodsleft).append(goodsright);
            //商品楼层图内容区域标签
            let oBottom = $("<div></div>").addClass("same_goods_content").addClass("clear");
            oBottom.append(bigPhoto).append(goodsDetails);
            this.oContent.append(oBottom);
        }
        //详情区域左侧内容
        cerateGoods() {
            this.oLen = $("<div></div>").addClass("sleder_len");
            let oSlider = $("<div></div>").addClass("sleder_content").addClass("clear").append(this.oLen);
            let oGoodes = $("<div></div>").addClass("details_left");
            let res = "";
            let len = this.data.length;
            for (let i = 0; i < len; i++) {
                res += `<li class="slider_goods"><img src=${this.data[i].src}><h4 class="slider_title">${this.data[i].title}</h4><p class="slider_price">￥${this.data[i].price}</p></li>`;
                //每到达6次，输出一次
                if ((i + 1) % 6 == 0 && res !== "") {
                    // `<ul class="slider_ul">${res}</ul>`
                    var ul = $("<ul></ul>").addClass("slider_ul").html(res);
                    this.oLen.append(ul);
                    res = "";
                }
            }
            let ts = "";
            for (let j = 0; j < 5; j++) {
                ts += "<li class='dot'></li>"
            }
            this.oDot = $("<ul class='dot_ul clear'></ul>").html(ts);
            oGoodes.append(oSlider).append(this.oDot);
            // console.log(oLen.children().length);
            return oGoodes;
        }
        //轮播图自动播放
        autoPlayer() {
            setInterval(() => {
                this.after()
            }, 2000);
        }
        //下一张
        after() {
            this.times++;
            if (this.times > this.oLen.children().length - 1) {
                this.times = 0;
            }
            this.oLen.css("left", -this.times * 588 + "px");
            this.switchNum(this.times);
        }
        //上一张
        before() {
            this.times--;
            //临界值检查，到最后一张后往第一张跳
            if (this.times < 0) {
                this.times = this.oLen.children().length - 1
            }
            this.oPhoto.css("left", -this.times * 588 + "px");
            this.switchNum(this.times);
        }
        //鼠标点击序列切换
        clickNumber() {
            let self = this;
            this.oDot.on("click", "li", function (e) {
                let index = $(this).index();
                self.times = index;
                self.oLen.css("left", -self.times * 588 + "px");
                self.switchNum(self.times);

            })
        }
        //给序列做排他处理
        switchNum(index) {
            let lis = this.oDot.children();
            lis.eq(index).addClass("active").siblings().removeClass("active");
        }
    }
    //wall商品class类
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
        }
        //创建页面标签
        createHtml() {
            let html_shop = this.data.map(ele => {
                let html_li = `<li class="shop-li"><img src=${ele.src}><p class="find">找相似</p><p class="name">${ele.title}</p><p class="price"><span class="class_a">￥${ele.sale_price}</span><del class="class_b">￥${ele.original_price}</del><img src="./images/upload_27g4f1ch6akie83hacb676j622b9l_32x30.png" class="icon"></p></li>`;
                return html_li;
            }).join("");
            let title = $("<h3></h3>").addClass("wall_title").html("猜你喜欢");
            this.oBox = $("<div></div>").attr("id", "wall");
            let oUl = `<ul class="shop-content">${html_shop}</ul>`
            this.oContent = $("<div></div>").addClass("content").append(title).append(oUl);
            $(this.oBox).append(this.oContent);
            $("#home").append(this.oBox);
        }
        //鼠标滑过商品事件
        mouseShop() {
            $(".shop-li").hover(function () {
                $(this).find(".find").toggle();
                $(this).toggleClass("mouse");
            })
        }
    }
    //网络请求异步处理
    new Promise(function (resolve, reject) {
        //发送网络请求，banner-nav实例化对象
        $.ajax({
            type: "get",
            url: "./server/banner.php",
            success: function (response) {
                let test = new BannerNav(JSON.parse(response));
                test.init();
                resolve();
            }
        });
    }).then(function () {
        return new Promise(function (resolve, reject) {
            //发送网络请求，banner-slider实例化对象
            $.ajax({
                type: "get",
                url: "./server/bannerPhoto.json",
                dataType: "json",
                success: function (response) {

                    let test = new BannerSlider(response);
                    test.init();
                    resolve();
                }
            })
        })
    }).then(function () {
        $(".banner_member").appendTo("#banner .content");
    }).then(function () {
        return new Promise(function (resolve) {
            //发送网络请求，panic实例化对象
            $.ajax({
                type: "get",
                url: "./server/panicData.json",
                data: "data",
                dataType: "json",
                success: function (response) {
                    let test = new PanicManger(response);
                    test.init();
                    resolve();
                }
            });
        })
    }).then(function () {
        return new Promise(function (resolve) {
            $.ajax({
                type: "get",
                url: "./server/clothes.json",
                data: "data",
                dataType: "json",
                success: function (response) {
                    let title = response;
                    $.ajax({
                        type: "get",
                        url: "./server/clothesGoods.json",
                        success: function (response) {
                            /* 模块化测试，测试失败 */
                            // require(["./js/clothes.js"], function () {
                            //     let test = new Clothes(res, response);
                            //     test.init();
                            // })
                            let test = new Clothes(title, response);
                            test.init();
                            resolve();
                        }
                    });
                }
            })
        });
    }).then(function () {
        return new Promise(function (resolve) {
            $.ajax({
                type: "get",
                url: "./server/shoeTitle.json",
                dataType: "json",
                success: function (response) {
                    let title = response;
                    $.ajax({
                        type: "get",
                        url: "./server/shoeData.json",
                        dataType: "json",
                        success: function (response) {
                            let test = new SameManger(title, response);
                            test.init();
                            resolve();
                        }
                    });
                }
            });
        })
    }).then(function () {
        return new Promise(function (resolve) {
            $.ajax({
                type: "get",
                url: "./server/wallGoods.json",
                dataType: "json",
                success: function (response) {
                    let test = new ShopManger(response);
                    test.init();
                    resolve();
                }
            });
        })
    }).then(function () {
        $("#footer").appendTo("#home");
    })
})