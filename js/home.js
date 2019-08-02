$(function () {
    //给头部表现的关于我们添加鼠标滑过事件
    $(".about").hover(function () {
        $(".about_content").toggleClass("show_about");
    });
    let p1 = new Promise(function (resolve, reject) {
        //发送网络请求，banner-nav实例化对象
        $.ajax({
            type: "get",
            url: "./server/banner.php",
            success: function (response) {
                //创建banner导航栏
                class BannerNav {
                    constructor(data) {
                        this.data = data;
                        console.log(this.data)
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
                let test = new BannerNav(JSON.parse(response));
                test.init();
            }
        });
    })

    let p2 = new Promise(function (resolve, reject) {
        //发送网络请求，banner-slider实例化对象
        $.ajax({
            type: "get",
            url: "./server/banner.php",
            // data: "data",
            // dataType: "dataType",
            success: function (response) {
                class BannerSlider {
                    constructor() {
                        this.oSlider = null;
                    }
                    // 初始化
                    init() {
                        this.createHtml();
                    }
                    // 创建轮播图标签
                    createHtml() {
                        this.oSlider = $("<div class='banner_slider'></div>");
                        $("#banner .content").append(this.oSlider);
                        this.oSlider.html(`<img src="./images/190611_5ffffgbhfk1h5d35hb99e99c57dil_1134x440.jpg">`);
                    }
                }
                let test = new BannerSlider();
                test.init();
            }
        })
    })

    let p3 = new Promise(function (resolve, reject) {
        $.ajax({
            type: "get",
            url: "./server/banner.php",
            // data: "data",
            // dataType: "dataType",
            success: function (response) {
                console.log($(".banner_member")[0]);
                console.log($("#banner .content")[0]);
                $(".banner_member").appendTo("#banner .content");
            }
        });
    })
    Promise.all([p1, p2, p3]);

})