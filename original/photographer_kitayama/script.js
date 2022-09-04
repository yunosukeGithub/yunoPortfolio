$(function(){
    $('.slick-list').slick({
		fade:true,//切り替えをフェードで行う。初期値はfalse。
		autoplay: true,//自動的に動き出すか。初期値はfalse。
		autoplaySpeed: 2800,//次のスライドに切り替わる待ち時間
		speed: 3000,//スライドの動きのスピード。今回はフェードインフェードアウトなので分かりにくい。
		infinite: true,//スライドをループさせるかどうか。初期値はtrue。
		//slidesToShow: 1,//スライドを画面に3枚見せる
		//slidesToScroll: 1,//1回のスクロールで3枚の写真を移動して見せる
		arrows: false,//左右の矢印無し。
        pauseOnFocus: false,//フォーカスで一時停止を無効
        pauseOnHover: false,//マウスホバーで一時停止を無効
        pauseOnDotsHover: false,//ドットナビゲーションをマウスホバーで一時停止を無効
});
$('.nav-toggle').click(function () { 
	$('.nav-toggle').toggleClass('show');
	$('.nav-menu').fadeToggle(); //非表示から表示へ
});
});
// 変数の宣言　HTMLのIDデータの文字データを読み込むことができる。
let backk = document.getElementById('lorder-bg');
let lorgs = document.getElementById('lorder');

// ロード画面の非表示を解除
console.log(document.getElementById('lorder-bg'));
backk.classList.remove('hide-lg');
lorgs.classList.remove('hide-lg');

// 読み込み完了
//loadはページが読み込まれたことを認識することができる。
//その後のstoploadは、読み込まれたらどのようなイベントを起こすのかを示している。
window.addEventListener('load', stopload);

// 10秒経ったら強制的にロード画面を非表示にする。
setTimeout('stopload()', 10000);

// ロード画面を非表示にする処理　ロードが終わると、変数bgとlorにフェードアウトのCSSを追加する。
function stopload(){
    backk.classList.add('fadeout-lg');
    lorgs.classList.add('fadeout-lorder');
}
