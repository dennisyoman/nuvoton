// JavaScript Document

$(document).ready(
    function() {
        //menu
        $("#mmb").click(function() {
            $(this).toggleClass("active");
            $("#nav").toggleClass("active");
            $("#header .logo").toggleClass("disabled");
            //$("#header .logo").toggle();
        })

        //nav
        $(".main_nav > li").hover(
            function() {
                $(this).delay(200).queue(function(){
                    $(this).addClass("trig");
                    $("#wrapper").addClass("overlay");
                    $("body").addClass("noscroll");
                    $(this).dequeue();
                });
                
            },
            function() {
                $(this).clearQueue(); 
                $(this).removeClass("trig");
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

                    $(this).children("ul").delay(200).queue(function(){
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


        //fixed jump bg
        if(navigator.userAgent.match(/Trident\/7\./)) { // if IE
            $('body').on("mousewheel", function () {
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

        //initialize swiper when document ready
        if ($("#featured").length > 0) {
            var mySwiper = new Swiper('.swiper-container', {
                // Optional parameters
                //direction: 'vertical',
                //loop: true,
                autoHeight:true,
                slidesPerView: 3,
                spaceBetween: 30,
                slidesPerGroup:3,
                //centeredSlides: true,
                breakpoints: {
                    // when window width is <= 320px
                    350: {
                      slidesPerView: 1,
                      slidesPerGroup:1,
                    },
                    // when window width is <= 480px
                    650: {
                      slidesPerView: 2,
                      slidesPerGroup:2,
                    },
                },

                // If we need pagination
                pagination: {
                    el: '.swiper-pagination',
                    clickable:true,
                },

                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })
        }

        // ParticlesJS Config.
        if ($("#particles-js").length > 0) {
            particlesJS("particles-js", {
              "particles": {
                "number": {
                  "value": 80,
                  "density": {
                    "enable": true,
                    "value_area": 700
                  }
                },
                "color": {
                  "value": "#ddd"
                },
                "shape": {
                  "type": "circle",
                  "stroke": {
                    "width": 0,
                    "color": "#ddd"
                  },
                  "polygon": {
                    "nb_sides": 5
                  },
                },
                "opacity": {
                  "value": 0.5,
                  "random": false,
                  "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                  }
                },
                "size": {
                  "value": 3,
                  "random": true,
                  "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                  }
                },
                "line_linked": {
                  "enable": true,
                  "distance": 150,
                  "color": "#ddd",
                  "opacity": 0.5,
                  "width": 1
                },
                "move": {
                  "enable": true,
                  "speed": 4,
                  "direction": "none",
                  "random": false,
                  "straight": false,
                  "out_mode": "out",
                  "bounce": false,
                  "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                  }
                }
              },
              "interactivity": {
                "detect_on": "canvas",
                "events": {
                  "onhover": {
                    "enable": true,
                    "mode": "grab"
                  },
                  "onclick": {
                    "enable": true,
                    "mode": "push"
                  },
                  "resize": true
                },
                "modes": {
                  "grab": {
                    "distance": 140,
                    "line_linked": {
                      "opacity": 1
                    }
                  },
                  "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                  },
                  "repulse": {
                    "distance": 200,
                    "duration": 0.4
                  },
                  "push": {
                    "particles_nb": 4
                  },
                  "remove": {
                    "particles_nb": 2
                  }
                }
              },
              "retina_detect": true
            });
        }

        resizeScreen();
        scrollFn();

    }
);

function is_iPhone_or_iPad(){
    return (
        (navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPod") != -1)
    );
}

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



window.onload = function(){
    bgImg();
    //$(".sticker").sticky({topSpacing:90,zIndex:10,center:true});
};
