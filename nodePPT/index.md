title: 内部分享
speaker: 小久哥
url: 
transition: slide3
files: /js/index.js,/css/index.css,
theme: moon
date: 2016年4月21日

[slide style="background-image:url('/img/ntk22164.jpg')"]
# 小船 => 巨轮
<div style="margin-top: 30px;" ><img src="../img/1-top.jpg"></div>
----
* 友谊的小船<span class="text-danger">说翻就翻</span> {:&.fadeIn}
* 友谊的<span class="text-info">小船</span>升华为友情的<span class="text-info">巨轮</sapn>


[slide style="background-image:url('/img/ntk22164.jpg')"]
# 设计篇
<div class="columns-2">
    <div><h2>程序员的友谊之船</h2><h1 class="text-danger rollIn"><span>说翻就翻</span></h1></div>
    <div><img src="../img/sheji.jpg"></div>
</div>

[slide style="background-image:url('/img/ntk22164.jpg')"]

[magic data-transition="vertical3d"]
## 友谊的小船为什么说翻就翻
----
* 为什么图片会变形？ 
* 为什么信息显示不全？
* 为什么你做出来的没效果图好看？
========
## 为什么图片会变形
[手机屏幕尺寸分布](http://cdn2.w3cplus.com/cdn/farfuture/M-e4_frBiR-exi9UaMTGMIa5NCWj6Bh1LJeAmb_yhtE/mtime:1447815283/sites/default/files/blogs/2015/1511/rem-7.png)
[手机屏幕尺寸归类](http://cdn.w3cplus.com/cdn/farfuture/ue4cH6tebXis4kq8W6ZU4afq5M4Tcl_dQbgiuTeSA7g/mtime:1447899085/sites/default/files/blogs/2015/1511/rem-11.png)
<div class="columns2">
    <div><img src="../img/jilie.jpg" height="500" width="320"></div>
    <div><img src="../img/jilie2.jpg" height="500" width="375"></div>
</div>
========
## 为什么信息显示不全
<div class="columns2">
    <div><img src="../img/jiaozi.jpg" height="500" width="320"></div>
    <div style="height:500px;overflow:hidden;" id="jiaozicon"><img src="../img/jiaozi2.jpg" width="375"></div>
</div>
<div>
    <button class="btn btn-primary" id="btnjiaozi">变高</button> 
</div>
========
## 为什么没有效果图好看
<div class="columns2">
    <div><img src="../img/huangpian.jpg" height="500"></div>
    <div><img src="../img/huangpian2.png" height="500"></div>
</div>

> 其他问题：引导点击、定位依据
[/magic]

[slide style="background-image:url('/img/ntk22164.jpg')"]
[magic data-transition="cards"]
# 我们怎么办？
========
## 调整设计图的尺寸 
<div class="columns-2 textL"><ul><li class="textL">750 × n：iPhone 6(750×1334)</li><li class="textL">640 × n：iPhone 4s(640×960)</li><li class="textL">n = Height - 48px - 100px = <span class="text-success">812+</span></li></ul><img src="../img/chicun.jpg"></div>
========
## 寻找依据点
<div class="columns2">
    <div><img src="../img/huangpian.jpg" height="500"></div>
    <div><img src="../img/jiaozi.jpg" height="500"></div>
</div>
========
## 补充
<div class="columns-2 textL"><ul><li class="textL">设计稿中使用<span class="text-info">最长</span>文字做Demo</li><li class="textL">图片的宽高比例</li><li class="textL">提示信息</li><li class="textL">扩展性</li></ul><img src="../img/tanengliang.png"></div>
[/magic]

[slide style="background-image:url('/img/ntk22164.jpg')"]
# AE&PM篇
<div class="columns-2">
    <div><h2>程序员的友谊之船</h2><h1 class="text-danger  rollIn"><span>说翻就翻</span></h1></div>
    <div><img src="../img/AE.jpg"></div>
</div>

[slide style="background-image:url('/img/ntk22164.jpg')"]
# 如何是好？
----
* 为什么这个效果和我想的不一样 {:&.fadeIn}
* 为什么这个图片展示这么别扭
* 为什么你说不能做

[slide style="background-image:url('/img/ntk22164.jpg')"]
# 为什么你说不能做？
----
* 需求分两种： {:&.fadeIn}
    * 可以做(改)
    * 不可以做(改)
    * 一般后者占多数，但是会做
* 有限的时间做完->做好
* 已有的基础上新增一些东西

[slide style="background-image:url('/img/ntk22164.jpg')"]
# 试试看看？
----
* 技术咨询(是否能实现) {:&.fadeIn}
* 时间安排
* 开执行会(活动整体流程、动效细节之类)
* 素材的统计与整理，<span class="text-success">尺寸比例统一</span>
* 项目划分(微信 & 人人 & 友宝)
* 微信项目提供<span class="text-success">标题、</span><span class="text-success">描述、</span><span class="text-success">分享配图</span>

[slide style="background-image:url('/img/ntk22164.jpg')"]
# 总结
<div class="columns2 textL">
    <ol>
        <li class="textL">设计稿中使用<span class="text-info">最长</span>文字做Demo</li>
        <li class="textL">图片素材的宽高比例统一(<span class="text-info">PC</span>与<span class="text-info">移动端</span> & 同一端的不同页面)</li>
        <li class="textL">提示信息</li>
        <li class="textL">考虑扩展性(二态 & 何时出滚动条)</li>
        <li class="textL">考虑屏幕尺寸的大小，按需取舍，把重要的内容放在<span class="text-info">812</span>以内</li>
        <li class="textL">背景图尺寸 <span class="text-info">750 × 1336</span> 居中，带标准线</li>
        <li class="textL">自适应的根据点</li>
        <li class="textL">PSD文件尽量小</li>
    </ol>
    <ol>
        <li class="textL">技术咨询</li>
        <li class="textL">时间安排</li>
        <li class="textL">开执行会</li>
        <li class="textL">素材整理规划</li>
        <li class="textL">项目划分</li>
        <li class="textL">微信项目的素材提供</li>
    </ol>
</div>

[slide style="background-image:url('/img/bg1.png')"]
<div class="columns-2">
    <h1>Thanks</h1>
    <img src="../img/jieshu.jpg" height="500">
</div>
