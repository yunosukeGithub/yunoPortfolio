'use strict';

const slideimg = document.getElementsByClassName('.slider__item');
const tabs = document.getElementsByClassName("absec__button");
const slideFade = document.getElementsByClassName("serdet__close");
// const sliderClick = document.getElementsById("slider__switch");
let current = 0;
let slideCurrent = 0;

// ハンバーガーメニューの実装
document.getElementById("js__hamburger").addEventListener('click', hamburger, false);

function hamburger(){
    document.getElementById('head__line--one').classList.toggle('line__one--after');
    document.getElementById('head__line--two').classList.toggle('line__two--after');
    document.getElementById('head__line--three').classList.toggle('line__three--after');
    document.getElementById('head__list').classList.toggle('in');
}

// メインヴィジュアルのスライドショー
$('.slider').slick({
    autoplay: false,
    autoplaySpeed: 3000,
    speed:500,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,//左右の矢印あり
    prevArrow: '<div class="slick-arrow prev-arrow"></div>',//矢印部分PreviewのHTMLを変更
    nextArrow: '<div class="slick-arrow next-arrow"></div>',//矢印部分NextのHTMLを変更
    dots: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
});


// document.getElementById("next__button").addEventListener('click', slideimg, false);

// function slideimg(){
//     document.getElementsByClassName("next-arrow")[0].onclick;
// }

// sliderClick.onclick = function(){
//     document.getElementsByClassName("next-arrow")[0].onclick;
// }

// imgをクリックして、スライドする方法がわからない。
// ・現在試した方法
//  ①img（メインヴィジュアル）をクリックした際に、"slider slick"のnext-arrowをクリックすることで、次の画像に推移する。
//   └結果として、何故かslick sliderのドットが消えてしまった。
//  ②img（メインヴィジュアル）をクリックした際に、現在表示されたときに付く"slick slider"のclass"slick-current"と"slick-active"を次のimgに付与する。
//   └【仮説】class"slider__item"が倍に増えているので、計8個の要素を取得してしまい、上手く機能しないのでは？
//    └【実行】機能しなかった。原因は不明。

// ②の方法を実行する。
// document.getElementById("slider__button").onclick=function(){
//     if(slideCurrent >= 0 && slideCurrent < slideimg.length-1){
//         slideCurrent++;
//         slideimg[slideCurrent-1].classList.remove("slick-current");
//         slideimg[slideCurrent-1].classList.remove("slick-active");
//         slideimg[slideCurrent].classList.add("slick-current");
//         slideimg[slideCurrent].classList.add("slick-active");
//     }else{
//         slideCurrent=0;
//         slideimg[slideCurrent+3].classList.remove("slick-current");
//         slideimg[slideCurrent+3].classList.remove("slick-active");
//         slideimg[slideCurrent].classList.add("slick-current");
//         slideimg[slideCurrent].classList.add("slick-active");
//     }
// };

// トップページ：屋台一覧のスライドショー（上手くいってない。）

// $('.sertop__visual--res').slick({
//     arrows: false,//左右の矢印はなし
//     autoplay: false,//自動的に動き出すか。初期値はfalse。
//     autoplaySpeed: 0,//自動的に動き出す待ち時間。初期値は3000ですが今回の見せ方では0
//     speed: 0,//スライドのスピード。初期値は300。
//     infinite: true,//スライドをループさせるかどうか。初期値はtrue。
//     pauseOnHover: false,//オンマウスでスライドを一時停止させるかどうか。初期値はtrue。
//     pauseOnFocus: false,//フォーカスした際にスライドを一時停止させるかどうか。初期値はtrue。
//     cssEase: 'linear',//動き方。初期値はeaseですが、スムースな動きで見せたいのでlinear
//     slidesToShow: 4,//スライドを画面に4枚見せる
//     slidesToScroll: 1,//1回のスライドで動かす要素数
//     responsive: [
//         {
//         breakpoint: 769,//モニターの横幅が769px以下の見せ方
//         settings: {
//             slidesToShow: 2,//スライドを画面に2枚見せる
//         }
//     },
//     {
//         breakpoint: 426,//モニターの横幅が426px以下の見せ方
//         settings: {
//             slidesToShow: 3.5,//スライドを画面に1.5枚見せる
//         }
//     }
// ]
// });

(function($){jQuery.event.add(window, "load", function(){
    $(".sertop__visual--res").endlessRiver({
        speed:100,
        pause:true,
        buttons:false
    });
 })})(jQuery);

// わいず祭りについて：代表者の言葉のタブメニュー実装
// 定数tabsで取得した要素を、for文を利用することで纏めてaddEventListenerを適用できる。
for(let i=0; i<tabs.length; i++){
    tabs[i].addEventListener('click', tabSwitch);
}

function tabSwitch(){
    document.getElementsByClassName('is__active')[0].classList.remove('is__active');
    this.classList.add('is__active');

    document.getElementsByClassName('is__show')[0].classList.remove('is__show');
    const arrayTabs = Array.prototype.slice.call(tabs);
    const index = arrayTabs.indexOf(this);
    document.getElementsByClassName('absec__det')[index].classList.add('is__show');
};

// 屋台一覧：屋台詳細切り替えスライドショー
document.getElementById("serdet__right").onclick=function(){
    nextChange(1);
};

document.getElementById("serdet__left").onclick=function(){
    backChange(-1);
};

function nextChange(num){
    if(current + num >= 0 && current + num < slideFade.length){
        current+=num;
        slideFade[current-1].classList.remove("serdet__open");
        slideFade[current].classList.add("serdet__open");
        slideFade[current].classList.add("serdet__anime");
    }else{
        current=0
        slideFade[current+10].classList.remove("serdet__open");
        slideFade[current].classList.add("serdet__open");
        slideFade[current].classList.add("serdet__anime");
    }
};

function backChange(num){
    if(current + num >= 0 && current + num < slideFade.length){
        current+=num;
        slideFade[current+1].classList.remove("serdet__open");
        slideFade[current].classList.add("serdet__open");
        slideFade[current].classList.add("serdet__anime");
    }else{
        current=10
        slideFade[current-10].classList.remove("serdet__open");
        slideFade[current].classList.add("serdet__open");
        slideFade[current].classList.add("serdet__anime");
    }
}

// const topvisual = document.getElementsByClassName('mainvisual');
// const slidebutton = document.getElementById('slide')
// let i = 0;

// slideimg.addEventListener('click', function(){
//     document.getElementsByClassName('.next-arrow').addEventListener('click', function(){},false);
// },false)


// slidebutton.addEventListener('click', function(){
//     if(i >= 0 && i < topvisual.length-1){
//         i++;
//         topvisual[i-1].classList.remove("mainvisual__open");
//         topvisual[i].classList.add("mainvisual__open");
//         topvisual[i].classList.add("mainvisual__slide");
//     }else{
//         i=0;
//         topvisual[i+3].classList.remove("mainvisual__open");
//         topvisual[i].classList.add("mainvisual__open");
//         topvisual[i].classList.add("mainvisual__slide");
//     }
// }, false)


