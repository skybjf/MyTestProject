
$(window).load(function() {
    var skew = $("#skew"),
        logos = $(".logo"),
        dotContainer = $("#dotContainer"),
        skewBtn = $("#skewBtn"),
        staggerBtn = $("#staggerBtn"),
        particlesBtn = $("#particlesBtn"), 
        tl = new TimelineLite();
         
    // functions for building nested timelines
     
    function getSkewAnimation() {
        var skewTimeline = new TimelineLite();
        skewTimeline.from(skew, 0.3, {alpha:0})
                    .to(skew, 0.5, {skewX:45})
                    .to(skew, 0.8, {skewX:-45})
                    .to(skew, 0.5, {skewX:5, skewY:-10})
                    .to(skew, 0.5, {skewX:20, skewY:5})
                    .to(skew, 0.5, {alpha:0});
        return skewTimeline;        
    }
     
    function getStaggerAnimation() {
        var staggerTimeline = new TimelineLite();        
        staggerTimeline.from(logos, 0.2, {opacity:0})
                       .staggerFrom(logos, 0.6, {top:-60, left:"-=50px", rotation:"-90deg", ease:Back.easeOut}, 0.1)
                       .to(logos, 1, {opacity:0});    
        return staggerTimeline;
    }
     
    function getParticlesAnimation() {
        var particlesTimeline = new TimelineLite(),
            i = 300,
            radius = 450,
            centerX= 360,
            centerY = 30,
            dots = [],
            rawDots = [];
             
        while (--i > -1) {
            dot = document.createElement("img");
            dot.src = "img/dot.png";
            dot.id = "dot" + i;
            dotContainer.append(dot);
            dot.style.cssText = "position:absolute; left:" + centerX + "px; top:" + centerY + "px; width:1px; height:1px;"
            var angle = Math.random() * Math.PI * 2,
                insertionTime = i * 0.015;
                 
            particlesTimeline.from(dot, 0.05, {opacity:0, immediateRender:true}, insertionTime);
             
            particlesTimeline.to(dot, .7, {left:Math.cos(angle) * radius + centerX, 
                top:Math.sin(angle) * radius + centerY, 
                width:32, 
                height:32,
                ease:Cubic.easeIn
            }, insertionTime);
             
        }
        return particlesTimeline;
    }             
 
    // build timeline
     
    tl.add("skew") // adds a new label
      .add(getSkewAnimation()) // method returns a TimelineLite instance that gets nested at the end
      .add(getStaggerAnimation(), "stagger") //creates new label and adds animation there
      .add(getParticlesAnimation(), "particles")
         
    //controls
                   
    skewBtn.click(function() {
        tl.play('skew');
    });
                 
    staggerBtn.click(function() {
        tl.play('stagger');
    });
             
    particlesBtn.click(function() {
        tl.play('particles');
    });
     
    //show the demoBackground div after DOM is ready and all images loaded
    TweenLite.set($("#demoBackground"), {visibility:"visible"});
});