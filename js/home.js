$(function () {
    //给头部表现的关于我们添加鼠标滑过事件
    $(".about").hover(function () {
        $(".about_content").toggleClass("show_about");
    });
    new Promise(function (resolve, reject) {
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
                    let test = new BannerSlider(response);
                    test.init();
                    resolve();
                }
            })
        })
    }).then(function () {
        $(".banner_member").appendTo("#banner .content");
    })
})