var qnum=1;
jQuery(function () {
    // 题号
    //var qnum=1;
    showLoading();
    $('.star .btn_begin').click(function(){
        $('.star').hide();
        $('.candidate').show();
    });
    //$('.candidate .bor_dash ul li a,.candidate .bor_dash ul li a img').click(function(){
    $('.candidate .bor_dash ul li a').click(function(){
    	line = parseInt(jQuery(this).attr("info"));
      getQuestion(line);
      showQuestion();
    });
    $('.question .answer li a').click(function(){
    	if(qnum <= 2){
        	r.push(jQuery(this).attr("info"));
        }

        var classname=['flipInX1','flipInX2','flipInX3'];
        // 题目去除class
        $('.question .gifcon').removeClass('fadeInDown');
        // 选项去除class
        $('.question .answer li').each(function(index,e){
            $(this).removeClass(classname[index]);
        });
        qnum++;
        if(qnum == 5){
            // 显示结果计算页，然后进行跳转
           showCompute();
        }else{
            $('.qnum').html(qnum);
            // 题目和选项添加class
            setTimeout(function(){
                showOptions(qnum - 1);
                $('.question .gifcon').addClass('fadeInDown');
                $('.question .answer li').each(function(index,e){
                    $(this).addClass(classname[index]);
                })
            },10);
        }
    });

});

// loading页面加载百分比
function showLoading(){
    var t = (new Date).getTime();
    var n=0;
    var perload=0;
    var size=[68,72,32,40,7,22,35,34,2,34,28,1];
    var the_images = [];
    the_images.push( './images/title1.png');
    the_images.push( './images/title2.png');
    the_images.push( './images/titletra.gif');
    the_images.push( './images/titletra_shadow.png');
    the_images.push( './images/btn-begin.png');
    the_images.push( './images/boy.png');
    the_images.push( './images/f1.png');
    the_images.push( './images/f2.png');
    the_images.push( './images/girl.png');
    the_images.push( './images/m1.png');
    the_images.push( './images/m2.png');
    the_images.push( './images/tips.png');

    jQuery.imgpreload(the_images,{
        each: function(){
            perload+=Math.round(size[n]/375*100);
            n++;
            jQuery('.loadnum').html(perload);
            // console.log(perload);
            // var image = new Image();
            // image.dynsrc = the_images[n];
            // n++;
            // console.log(image.fileSize || image.size );
            // var fso = new ActiveXObject('Scripting.FileSystemObject');
            // var file = fso.GetFile(the_images[n]);
            // window.onerror = window.oldOnError;
            // console.log(file.Size);
        },
        all: function(){
            jQuery('.loadnum').html(100);
            setTimeout(function(){
                jQuery('.loading').fadeOut();
                jQuery('.star').show();
            },1500);
        }
    });
}

// 显示答题区域
function showQuestion(){
    $('.candidate').hide();
    showOptions(0);
    $('.question').show();
    console.log(q);
    var img_con=[];
    for (var i = 1; i < 4; i++) {
      img_con.push('./images/q/'+q[i].substr(0,1) + "/" + q[i].substr(1,2)+'/' +"f.gif");
      img_con.push('./images/q/'+q[i].substr(0,1) + "/" + q[i].substr(1,2)+'/' +"e.png");
      img_con.push('./images/q/'+q[i].substr(0,1) + "/" + q[i].substr(1,2)+'/' +"a.png");
      img_con.push('./images/q/'+q[i].substr(0,1) + "/" + q[i].substr(1,2)+'/' +"b.png");
      img_con.push('./images/q/'+q[i].substr(0,1) + "/" + q[i].substr(1,2)+'/' +"c.png");
    };
    jQuery.imgpreload(img_con);
}

// 结果加载页文字波动js
function showCompute(){
    var tip_text=[
      '你觉得我们的设计太丑了...',
      '你回忆起逝去的青春...',
      '你几乎感受不到PM2.5了...',
      '你预感今天有50%概率不用加班...',
      '你在想怎么选择会显得年轻...'
    ];
    var n=Math.floor(Math.random()*5);
    $('.txt4').html(tip_text[n]);

    $('.question').hide();
    $('.compute').show();
    t0=0;
    t1=150*8;
    t2=150*13;
    t3=150*18;
    t4=150*26;
    t5=150*34;
    t6=150*43;
    t7=150*49;
    jQuery.imgpreload(['./images/tryagain.png'],function(){});
    jQuery('.txt0').textillate({initialDelay:t0,in:{ effect:'bounceIn',delay:20} });
    jQuery('.txt1').textillate({initialDelay:t1,in:{ effect:'bounceIn',delay:20} });
    jQuery('.txt2').textillate({initialDelay:t2,in:{ effect:'bounceIn',delay:20} });
    jQuery('.txt3').textillate({initialDelay:t3,in:{ effect:'bounceIn',delay:20} });
    jQuery('.txt4').textillate({initialDelay:t4,in:{ effect:'bounceIn',delay:20} });
    jQuery('.txt5').textillate({initialDelay:t5,in:{ effect:'bounceIn',delay:20} });
    jQuery('.txt6').textillate({initialDelay:t6,in:{ effect:'bounceIn',delay:20} });
    jQuery('.txt7').textillate({initialDelay:t7,in:{ effect:'bounceIn',delay:20} });
    jQuery('.txt7').on('end.tlt', function () {
    	var male = 1;
    	var resultId;
    	var options = r.join('');
    	if(line == 1){
    		if(maleRandom == 0){
    			resultId = a10[options];
			}else{
				resultId = a11[options];
			}
    	}else if(line == 2){
    		resultId = a20[options];
    	}else if(line == 3){
    		male = 0;
    		resultId = a30[options];
    	}else{
    		male = 0;
    		resultId = a40[options];
    	}
        // 这里写跳转页面的方法
        window.location.href="result.html?male="+male+"&resultId="+resultId;
    });
}
