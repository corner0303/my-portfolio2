$(function(){
  //drawerjs.
  $(".drawer").drawer();

    // #から始まるURLがクリックされた時
  $('a[href^="#"]').click(function() {
    // .headerクラスがついた要素の高さを取得
    let header = $(".header").innerHeight(); 
    // 移動速度を指定（ミリ秒）
    let speed = 500;
    let speedBottom = 300;
    // hrefで指定されたidを取得
    let id = $(this).attr("href");
    // idの値が#のみだったらターゲットをhtmlタグにしてトップへ戻るようにする
    let target = $("#" == id ? "html" : id);
    // ページのトップを基準にターゲットの位置を取得
    // let position = $(target).offset().top;

      // トップからの距離からヘッダー分の高さを引く
      let position = $(target).offset().top - header;

      let positionBottom = $(target).offset().top - header ; //普通のver
      // let positionBottom = $(target).offset().top - header + 100; //若干下に落とすver

    // ターゲットの位置までspeedの速度で移動
    $("html, body").animate(//100px下に落として
      {
        scrollTop: positionBottom
      },
      speedBottom
    );

    $("html, body").animate(//上にあげる
      {
        scrollTop: position
      },
      speed
    );
    return false;
  });

  // wow.js
  new WOW().init()

  //googleform
  let $form = $("#js-form")//formタグにidをつけてその値の定義
  $form.submit(function (e) { 
    $.ajax({ 
      url: $form.attr('action'), 
      data: $form.serialize(), 
      type: "POST", 
      dataType: "xml", 
      statusCode: { //ここから上は解読してくれ
        0: function () { 
        //送信に成功したときの処理 
        $form.slideUp(300)//formをスライドアップして消す
        $("#js-success").slideDown(300)//サクセス文を出す
      }, 
      200: function () { 
        //送信に失敗したときの処理 
        $("#js-error").slideDown(300)//formをスライドアップして消す
        $form.slideUp()//エラー文を出す
      } 
      } 
    }); 
    return false; //返り値ドーン
  }); 

  //formの入力確認
  let $submit = $("#js-submit")//送信ボタンに指定されたIDを定義
  $("#js-form input, #js-form textarea").on("change",function(){//value値が変更されたら、その時点で発動
    if(
    $("#js-form input[type='text']").val() !== "" &&//空白でない
    $("#js-form input[type='email']").val() !== "" &&//空白でない
    $("#js-form input[name='entry.1806958771']").prop("checked") === true//checkedになっている場合をtrueに
    ){//全てOKな場合
      //全て入力された時
      $submit.addClass("-active")//submitに-activeクラス追加
      $submit.prop("disabled",false)//disabledを消す
    }else {
      //されていないとき
      $submit.removeClass("-active")//submitに-activeクラス消去
      $submit.prop("disabled",true)//disabledを付与
    }
    
  })
})