$(function() {
    var razor = $('.razor'), //剃须刀
        text2 = $('.text2'), //屏幕二 年限
        whitecut1 = $('.whitecut1'), //屏幕三 白色分割线
        yanzhi = $('.yanzhi'), //屏幕三 你的颜值击败数
        text4 = $('.text4'), //屏幕四 左上文字
        whitecut2 = $('.whitecut2'), //屏幕三 白色分割线
        per_zan = $('.per_zan'),
        per_log = $('.per_log'),
        per_pic = $('.per_pic'),
        imgmu5 = $('.imgmu5'),
        mainTimeline = new TimelineMax();

    function mu2() {
        razor.show();
        var ping2Timeline = new TimelineLite();
        ping2Timeline.to(razor, 0.5, {
                marginLeft: r(-94),
                ease: Back.easeOut,
                onComplete: function() {
                    TweenLite.to($('.info .head1'), 0.1, {
                        opacity: 1,
                        onComplete: function() {
                            TweenLite.to($('.info .head1 img'), 0.1, {
                                opacity: 1,
                            });
                        }
                    });
                }
            })
            .staggerTo(razor, 0.5, {
                marginLeft: r(144),
                top: r(500),
                ease: Back.easeOut,
                onComplete: function() {
                    TweenLite.to($('.info .head2'), 0.1, {
                        opacity: 1,
                        onComplete: function() {
                            TweenLite.to($('.info .head2 img'), 0.1, {
                                opacity: 1,
                            });
                        }
                    });
                }
            })
            .staggerTo(razor, 0.5, {
                marginLeft: r(382),
                top: r(480),
                ease: Back.easeOut,
                onComplete: function() {
                    TweenLite.to($('.info .head3'), 0.1, {
                        opacity: 1,
                        onComplete: function() {
                            TweenLite.to($('.info .head3 img'), 0.1, {
                                opacity: 1,
                            });
                        }
                    });
                }
            })
            .set(razor, {
                top: r(658),
                onComplete: function() {
                    TweenLite.to(text2, 0.25, {
                        scale: 1,
                        opacity: 1
                    });
                }
            })
            .staggerTo(razor, 0.25, {
                marginLeft: r(178),
                ease: Back.easeOut,
                onComplete: function() {
                    TweenLite.to(text2, 0, {
                        scale: 2,
                        opacity: 0,
                        delay: 0.5,
                        onComplete: function() {
                            $('.info').hide();
                        }
                    });
                }
            });
        return ping2Timeline;
    }

    function mu3() {
        // whitecut.show();
        var ping3Timeline = new TimelineLite();
        ping3Timeline.set(whitecut1, {
                display: 'block',
                delay: 0.5
            })
            .set($('.tip'), {
                opacity: 1
            })
            .set(razor, {
                marginLeft: r(-194),
                top: r(386)
            })
            .to(razor, 0.5, {
                marginLeft: r(160),
                top: r(300),
                ease: Power3.easeOut,
                onComplete: function() {
                    var linshi = new TimelineLite();
                    linshi.set(razor, {
                        marginLeft: r(346),
                        top: 'initial',
                        bottom: r(216)
                    })
                    lishi = null;
                }
            })
            .to($('.big_bg_head1'), 0.2, {
                opacity: 1
            })
            .to($('.whitecut1 .headcon'), 0.2, {
                opacity: 1
            })
            .to(yanzhi, 0.25, {
                scale: 1,
                opacity: 1,
                delay: 0.5
            })
            .to(razor, 0.25, {
                marginLeft: r(216),
                bottom: r(150),
                onComplete: function() {
                    var linshi = new TimelineLite();
                    linshi.set(yanzhi, {
                        scale: 2,
                        opacity: 0,
                        delay: 0.5
                    }).set(whitecut1, {
                        display: 'none'
                    }).set($('.big_bg_head1'), {
                        opacity: 0
                    });
                    linshi = null;
                }
            });

        return ping3Timeline;
    };

    function mu4() {
        var ping4Timeline = new TimelineLite();
        ping4Timeline.set($('.sanlie .ball'), {
                opacity: 1,
                delay: 0.5
            })
            .set(razor, {
                marginLeft: r(-114),
                top: r(534),
                bottom: 'initial',
                rotation: 14
            })
            .staggerTo(razor, 0.25, {
                marginLeft: r(92),
                ease: Expo.easeOut,
                onComplete: function() {
                    TweenLite.to(razor, 0.1, {
                        opacity: 0,
                        marginLeft: r(384),
                        top: r(680)
                    });
                }
            })
            .staggerTo($('.sanlie .grid'), 0.25, {
                opacity: 1
            })
            .staggerTo($('.sanlie .head'), 0.25, {
                opacity: 1
            })
            .staggerTo($('.sanlie .mess'), 0.25, {
                opacity: 1,
                onComplete: function() {
                    TweenLite.to(razor, 0.25, {
                        opacity: 1,
                        marginLeft: r(200),
                        top: r(680)
                    })
                }
            })
            .staggerTo(text4, 0.5, {
                scale: 1,
                opacity: 1
            });
        return ping4Timeline;
    }

    function mu5() {
        var ping5Timeline = new TimelineLite();
        ping5Timeline.set([$('.sanlie .ball'), $('.sanlie .grid'), $('.sanlie .head'), $('.sanlie .mess')], {
                opacity: 0,
                delay: 0.5
            })
            .set(text4, {
                scale: 2,
                opacity: 0
            }) //4屏结束 初始化
            .set(whitecut2, {
                display: 'block'
            })
            .set(razor, {
                marginLeft: r(-260),
                top: r(412)
            })
            .to(razor, 0.5, {
                marginLeft: r(180),
                top: r(450),
                ease: Power3.easeOut,
                // onComplete: function() {
                //     var linshi = new TimelineLite();
                //     linshi.set(razor, {
                //         marginLeft: r(346),
                //         top: 'initial',
                //         bottom: r(216)
                //     })
                //     lishi = null;
                // }
            })
            .staggerTo([$('.big_bg_head2'), $('.whitecut2 .headcon')], 0.5, {
                opacity: 1
            }, 0.1)
            .set(razor, {
                marginLeft: r(-298),
                top: r(220 + 20)
            })
            .to(razor, 0.25, {
                marginLeft: r(-120),
                top: r(230 + 20),
                onComplete: function() {
                    TweenLite.to(per_zan, 0.2, {
                        opacity: 1
                    });
                }
            })
            .set(razor, {
                marginLeft: r(80),
                top: r(236 + 20)
            })
            .to(razor, 0.25, {
                marginLeft: r(80),
                top: r(346 + 20),
                onComplete: function() {
                    TweenLite.to(per_log, 0.2, {
                        opacity: 1
                    });
                }
            })
            .set(razor, {
                marginLeft: r(-340),
                top: r(640 + 20)
            })
            .to(razor, 0.25, {
                marginLeft: r(-116),
                top: r(650 + 20),
                onComplete: function() {
                    TweenLite.to(per_pic, 0.2, {
                        opacity: 1
                    });
                }
            })
            .set(razor, {
                marginLeft: r(340),
                top: r(720 + 20)
            })
            .staggerTo(imgmu5, 0.2, {
                scale: 1,
                opacity: 1
            })
            .to(razor, 0.25, {
                marginLeft: r(194),
                top: r(720)
            });
        return ping5Timeline;
    };

    function mu6() {
        var ping6Timeline = new TimelineLite();
        ping6Timeline
            .set(whitecut2, {
                display: 'none',
                delay: 0.5
            })
            .set([$('.big_bg_head2'), $('.whitecut2 .headcon'), per_zan, per_log, per_pic], {
                opacity: 0
            })
            .set(imgmu5, {
                scale: 2,
                opacity: 0
            })
            .set($('.lawn'), { //6 屏开始
                opacity: 1
                    // delay:0.5
            })
            .set($('.btn-mytime'), {
                display: 'block'
            })
            .set(razor, {
                marginLeft: r(-288),
                opacity: 1,
                top: r(428),
                rotation: '-10'
            })
            .staggerTo(razor, 0.5, {
                marginLeft: r(262),
                top: r(240),
                ease: Expo.easeOut,
                onComplete: function() {
                    TweenLite.to($('.lawn .words'), 0.25, {
                        scale: 1,
                        opacity: 1
                    });
                }
            })
            .set(razor, {
                marginLeft: r(366),
                top: r(120)
            })
            .to(razor, 0.25, {
                marginLeft: r(226),
                top: r(170),
                ease: Expo.easeOut,
                delay: 0.5
            });
        return ping6Timeline;
    }

    function mu7() {
        var ping7Timeline = new TimelineLite();
        ping7Timeline
            .set([$('.lawn'), $('.text5')], {
                opacity: 0
            })
            .set($('.btn-mytime'), {
                display: 'none'
            })
            .set($('.text6'), {
                opacity: 1
            })
            .set($('.ball2'), {
                opacity: 1
            })
            .set($('.who'), {
                marginLeft: r(270),
                top: r(780),
                opacity: 1,
                width: 0,
                height: 0
            })
            .staggerTo($('.who'), 0.5, {
                marginLeft: r(-270),
                top: r(480),
                width: r(540),
                height: r(300),
            })
            .to($('.who .zheng'), 0.2, {
                opacity: 1
            })
            .to($('.who .name'), 0.5, {
                opacity: 1,
                scale: 1
            });
        return ping7Timeline;
    }

    function mu8() {
        var ping8Timeline = new TimelineLite();
        ping8Timeline
            .set($('.who'), {
                top: '2.4rem',
                width: '2.7rem',
                marginLeft: '-1.35rem',
                height: '1.5rem',
                opacity: 0,
                delay: 2
            }).
        set([$('.ball2'), razor], {
                opacity: 0
            })
            .set($('.text6'), { //幕8开始
                top: r(150)
            })
            .set($('.people'), {
                marginLeft: r(-184)
            })
            .staggerTo($('.people'), 0.4, {
                marginLeft: r(-284),
                opacity: 1
            })
            .staggerTo($('.text7'), 0.2, {
                top: r(384),
                opacity: 1
            })
            .staggerTo($('.btn-share'), 0.2, {
                top: r(570),
                opacity: 1
            })
            .staggerTo($('.btn-video'), 0.2, {
                top: r(658),
                opacity: 1
            })
            .staggerTo($('.btn-gillette'), 0.2, {
                top: r(746),
                opacity: 1
            });
        return ping8Timeline;
    }

    $('body').on("touchstart", ".btn1", function() {
        mu1();
        mainTimeline
            .add(mu2(), "mu2")
            .add(mu3(), "mu3")
            .add(mu4(), "mu4")
            .add(mu5(), "mu5")
            .add(mu6(), "mu6");
    });
    $('body').on("touchstart", ".btn-mytime", function() {
        $('.bg').removeClass('bg2').addClass('bg3');
        mainTimeline
            .add(mu7(), "mu7")
            .add(mu8(), "mu8");
    });
});

// px to rem
function r(n) {
    return n = n / 200 + 'rem';
}

function mu1() {
    $('.text1,.btn1').hide();
    $('.bg').removeClass('bg1').addClass('bg2');
    $('.text5,.info').show();
}


function showLoading() {
    var n = 0;
    var perload = 0;
    var the_images = [];
    the_images.push('./img/bg1.jpg');
    the_images.push('./img/bg2.jpg');
    the_images.push('./img/bg3.jpg');
    the_images.push('./img/ball.png');
    the_images.push('./img/bg_head.png');
    the_images.push('./img/bg_head_friend.png');
    the_images.push('./img/big_bg_head.png');
    the_images.push('./img/btn1.png');

    var count=the_images.length;
    jQuery.imgpreload(the_images, {
        each: function() {
            n++;
            perload = Math.round( (n/count) * 100);
            jQuery('.loadnum').html(perload);
        },
        all: function() {
            // $('.load').hide();
        }
    });
}

