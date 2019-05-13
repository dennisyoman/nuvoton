// JavaScript Document

$(document).ready(
    function() {
        //menu
        $("#mmb").click(function() {
            $(this).toggleClass("active");
            $("#nav").toggleClass("active");
        })

        //nav
        $(".main_nav > li").hover(
            function() {
                $("#wrapper").addClass("overlay");
                $("body").addClass("noscroll");
            },
            function() {
                $("#wrapper").removeClass("overlay");
                $("body").removeClass("noscroll");
            }
        );
        $(".mn").find("li").each(function(index) {
            if($(this).children("ul").length>0){
                $(this).addClass("tree");
            }
            $(this).children("a").each(function(index) {
                if($(this)[0].hasAttribute("href")){
                    $(this).addClass("link");
                }
            })
            $(this).hover(
                function() {
                    if($(this).children("ul").length>0){
                        $(this).parent().addClass("lock");
                    }
                    var offsetX = 0;
                    offsetX = $(this).parent().width()+$(this).parent().offset().left;
                    $(this).children("ul").show().css("left",offsetX).scrollTop(0); 
                    $(this).children("ul").clearQueue(); 
                },
                function() {

                    $(this).children("ul").delay(100).queue(function(){
                        $(this).hide();
                        $(this).parent().parent().removeClass("lock");
                        $(this).dequeue();
                    });
                }
            );
        });

        //tab
        if ($(".tab").length > 0) {
            $(".tab").children("div").each(function(index) {
                $(this).click(function() {
                    $(this).addClass("selected").siblings(".selected").removeClass("selected");
                    $(".tab_content").children("div").eq(index).addClass("selected").siblings(".selected").removeClass("selected");
                })
            }).eq(0).click();  
        }

        //gallery
        if ($(".gallery").length >= 1) {
            $(".gallery").each(function( index ) {
                gallerize($( this ));
            });
        }

        //aside
        if ($(".aside").length > 0) {
            $(".aside").children(".close").each(function(index) {
                $(this).click(function() {
                    $(this).parent().toggleClass("active");
                })
            }) 
        }

        //table
        if ($(".table").length > 0) {
            $(".table").each(function() {
                var title_ay = $(this).find(".css_tr").eq(0);
                var tr_ay = $(this).find(".css_tr");
                for(var i=1;i<=tr_ay.length;i++){
                    var td_ay = tr_ay.eq(i).find(".css_td");
                    for(var k=0;k<=td_ay.length;k++){
                        //console.log(td_ay.length);
                        var title = title_ay.find(".css_td").eq(k).text();
                        var oriHTML = td_ay.eq(k).html();
                        td_ay.eq(k).html("<span>"+title+"</span><span>"+oriHTML+"</span>");
                    }
                }
            }) 
        }
        


        //scroll to top
        $("#gotop").click(function() {
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        })

        //form
        $("#ok").click(function(e) {
            validateQuery();
        });

        ////textarea
        if ($("textarea.AutoHeight").length > 0) {
            $("textarea.AutoHeight").css("overflow", "hidden").bind("keydown keyup", function() {
                $(this).height('0px').height($(this).prop("scrollHeight") + "px");
            }).keydown();
        }

        if ($(".datepick").length > 0) {
            $(".datepick").pickadate({
                format: 'yyyy/mm/dd',
                formatSubmit: 'yyyy/mm/dd',
                today: false,
                clear: false,
                onOpen: function() {
                    //scrollPageTo( this.$node )
                }
            })
        }

        //fancybox
        if ($("[data-fancybox]").length > 0) {
            $("[data-fancybox]").fancybox({
                thumbs: false,
                protect: true,
                afterLoad: function(instance, slide) {
                    //console.log( instance );
                },
            });
        }


        //scroll
        $(window).scroll(function() {
            scrollFn();
        });


        //resize trigger
        $(window).resize(function() {
            resizeScreen();
        });

        resizeScreen();
        scrollFn();

        if (navigator.userAgent.match(/Trident\/7\./)) { // if IE
            $('body').on("mousewheel", function() {
                // remove default behavior
                event.preventDefault();

                //scroll without smoothing
                var wheelDelta = event.wheelDelta;
                var currentScrollPosition = window.pageYOffset;
                window.scrollTo(0, currentScrollPosition - wheelDelta);
            });
        }

        jQuery.fn.setfocus = function()
        {
            return this.each(function()
            {
                var dom = this;
                setTimeout(function()
                {
                    try { dom.focus(); } catch (e) { } 
                }, 0);
            });
        };

    }
);



function scrollFn() {

}

    

//


function resizeScreen() {
    $(".sticker").sticky('update');
}


//gallery
function gallerize(tar){
    var next = tar.find(".next").eq(0);
    var prev = tar.find(".prev").eq(0);
    var cap = tar.find(".cap").eq(0);
    var pager = tar.find(".slides_btns").eq(0);
    var slider = tar.find(".slides").eq(0);
    var banners = slider.find(">*");
    var amount = banners.length;

    var seq = 0;
    var interval;

    if(banners.length<2){
        next.hide();
        prev.hide();
        pager.hide();
    }

    if (pager.length >= 1 && amount>0 && !(pager.find(">*").length>0)) {
        for(var k=0; k<amount;k++){
            pager.append("<li></li>");
        }
    }

    function goNext(){
        seq +=1;
        if(seq >= amount){
            seq = 0;
        }
        banners.eq(seq).addClass("active").siblings(".active").removeClass("active");
        pager.find(">*").eq(seq).addClass("active").siblings(".active").removeClass("active");
        cap.hide().text(banners.eq(seq).attr("val")).fadeIn();
        clearInterval(interval);
    }

    function goPrev(){
        seq -=1;
        if(seq < 0){
            seq = amount-1;
        }
        banners.eq(seq).addClass("active").siblings(".active").removeClass("active");
        pager.find(">*").eq(seq).addClass("active").siblings(".active").removeClass("active");
        cap.hide().text(banners.eq(seq).attr("val")).fadeIn();
        clearInterval(interval);
    }

    //arrow
    next.click(function() {
        goNext();
    })
    prev.click(function() {
        goPrev();
    });

    //pager
    pager.find(">*").each(function( index ) {
        $(this).click(function() {
            seq = index;
            banners.eq(seq).addClass("active").siblings(".active").removeClass("active");
            $(this).addClass("active").siblings(".active").removeClass("active");
            if(banners.eq(seq).attr("link")!=""){
                cap.attr("href",banners.eq(seq).attr("link")).addClass("linked");
            }else{
                cap.attr("href","#").removeClass("linked");
            }
            if(banners.eq(seq).attr("tar")!=""){
                cap.attr("target","_blank");
            }else{
                cap.attr("target","");
            }
            cap.hide().text(banners.eq(seq).attr("val")).fadeIn();
            clearInterval(interval);
        })
    });

    //init
    banners.eq(seq).addClass("active");
    pager.find(">*").eq(seq).addClass("active");
    if(banners.eq(seq).attr("link")!=""){
        cap.attr("href",banners.eq(seq).attr("link")).addClass("linked");
    }else{
        cap.attr("href","#").removeClass("linked");
    }
    if(banners.eq(seq).attr("tar")!=""){
        cap.attr("target","_blank");
    }else{
        cap.attr("target","");
    }
    
    cap.hide().text(banners.eq(seq).attr("val")).fadeIn();

    //auto
    if(tar.hasClass("autoplay")){
        interval = setInterval(function(){
            seq +=1;
            if(seq >= amount){
                seq = 0;
            }
            banners.eq(seq).addClass("active").siblings(".active").removeClass("active");
            pager.find(">*").eq(seq).addClass("active").siblings(".active").removeClass("active");
            if(banners.eq(seq).attr("link")!=""){
                cap.attr("href",banners.eq(seq).attr("link")).addClass("linked");
            }else{
                cap.attr("href","#").removeClass("linked");
            }
            if(banners.eq(seq).attr("tar")!=""){
                cap.attr("target","_blank");
            }else{
                cap.attr("target","");
            }
            cap.hide().text(banners.eq(seq).attr("val")).fadeIn();
        }, 3500);
    }

    //hammer
    var swiper = new Hammer(tar[0]);
    swiper.on("swipeleft swiperight", function(ev) {
        //myElement.textContent = ev.type +" gesture detected.";
        //console.log(ev.type);
        if (ev.type == 'swipeleft') {
            goNext();
        } else if (ev.type == 'swiperight') {
            goPrev();
        }
    });
    
}

//bgImg
function bgImg(){
    $(".bgImg").each(function(index) {
        $(this).children("img").hide();
        var imgURL = $(this).children("img").attr("src");
        $(this).css("background", "url(" + imgURL + ") no-repeat center center");
        if($(this).hasClass("contain")){
            $(this).css("background-size", "contain");
        }else{
            $(this).css("background-size", "cover");
        }
        if($(this).hasClass("fixed")){
            if(!is_iPhone_or_iPad()){
                $(this).css("background-attachment", "fixed");
            }
        }
    });
}

//submit

var isEmail = function(email) {
    if (email == "") return true;
    reEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
    return reEmail.test(email);
}

var validateQuery = function() {

    var $mistake = 0;
    var $fromtop = 100;
    var $boddy = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    $("#query .alert").text('');
    $('#query .label').removeClass("error");

    if (!$('#date1').val()) {
        $('#date1').parent().addClass("error");
        if ($mistake == 0) {
            $("#query .alert").text('至少需要一個預約時間');
            $boddy.animate({ scrollTop: $('#date1').offset().top - $fromtop }, 600);
            $('#date1').focus();
        }
        $mistake += 1;
    }

    if (!$('#query input[name="name"]').val()) {
        $('#query input[name="name"]').parent().addClass("error");
        if ($mistake == 0) {
            $("#query .alert").text('請輸入聯絡人名稱');
            $boddy.animate({ scrollTop: $('#query input[name="name"]').eq(0).offset().top - $fromtop }, 600);
            $('#query input[name="name"]').focus();
        }
        $mistake += 1;
    }

    if (!$('#query input[name="phone"]').val()) {
        $('#query input[name="phone"]').parent().addClass("error");
        if ($mistake == 0) {
            $("#query .alert").text('請輸入連絡電話');
            $boddy.animate({ scrollTop: $('#query input[name="phone"]').eq(0).offset().top - $fromtop }, 600);
            $('#query input[name="phone"]').focus();
        }
        $mistake += 1;
    }

    if (!$('#query input[name="email"]').text()) {
        $('#query input[name="email"]').parent().addClass("error");
        if ($mistake == 0) {
            $("#query .alert").text('請輸入電子郵件');
            $boddy.animate({ scrollTop: $('#query input[name="email"]').eq(0).offset().top - $fromtop }, 600);
            $('#query input[name="email"]').focus();
        }
        $mistake += 1;
    }

    if (!isEmail($('#query input[name="email"]').val())) {
        $('#query input[name="email"]').parent().addClass("error");
        if ($mistake == 0) {
            $("#query .alert").text('電子郵件格式錯誤');
            $boddy.animate({ scrollTop: $('#query input[name="email"]').eq(0).offset().top - $fromtop }, 600);
            $('#query input[name="email"]').focus();
        }
        $mistake += 1;
    }

    if (!$('#query input[name="deliver"]').val()) {
        $('#query input[name="deliver"]').parent().addClass("error");
        if ($mistake == 0) {
            $("#query .alert").text('請輸入聯絡人名稱');
            $boddy.animate({ scrollTop: $('#query input[name="deliver"]').eq(0).offset().top - $fromtop }, 600);
            $('#query input[name="deliver"]').focus();
        }
        $mistake += 1;
    }



    if ($mistake > 0) {
        //return alert('請確認填寫資料格式正確');
    } else {
        //$("#query .submit").hide();
        //$("#register .spining").show();
        //window.location = 'finish.html';
    }
}

window.onload = function(){
    bgImg();
    //$(".sticker").sticky({topSpacing:90,zIndex:10,center:true});
};
