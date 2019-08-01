$(function () {
    //给头部表现的关于我们添加鼠标滑过事件
    $(".about").hover(function () {
        $(".about_content").toggleClass("show_about");
    });
    //发送网络请求，实例化对象
    $.ajax({
        type: "get",
        url: "./server/banner.php",
        success: function (response) {
            //创建banner导航栏
            class BannerNav {
                constructor(data) {
                    this.data = data;
                    this.oNav = null;
                    this.oShow = null;
                    // console.log(this.data);
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
                    this.oShow = $("<div></div>").addClass("nav_show");
                    this.createLeft();
                    this.createRight();
                    this.oNav.append(this.oShow);
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
                    this.oNav.html(navul);
                }
                //创建导航栏右侧标签
                createRight() {
                    let html = this.data.map(ele => {
                        let left = ele.show.left.map(ele => {
                            let lis = ele.li.map(ele => {
                                return `<li class="l_li ${ele.ls}">${ele.ln}</li>`;
                            }).join("");
                            return `<div class="left_cont"><p class="left_tit">${ele.lt}</p><ul class="left_ul">${lis}</ul></div>`;
                        }).join("");
                        let left_content = `<div class="left_content">${left}</div>`
                        let rlis = ele.show.right.map(ele => {
                            return `<li class="r_li"><img src=${ele.src}><p class="r_name">${ele.rn}</p></li>`;
                        }).join("");
                        let right = `<div class="right_content"><div class="ti_title">/猜您喜欢/</div><ul class="ul_cont">${rlis}</ul></div>`;
                        // let show = left_content + right;
                        return `<div class="show_cont">${left_content + right}</div>`;
                    }).join("");
                    this.oShow.html(html);
                }
                //给左侧标签添加鼠标滑过事件
                mouseWithLeft() {}
            }
            let test = new BannerNav(JSON.parse(response));
            test.init();
        }
    });
    //创建banner轮播图
})