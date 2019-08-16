//デフォルトのスタイル設定データを定義
var style_config = [
  {
    "attr_name" : "scrb-w",
    "description" : "ボックスの幅を設定(cssと同じ単位が使用可能)",
    "style" :
    [
      {
        "element" : "",
        "css_name" : "width",
        "value" : "300px",
        "calc" : false,
        "add_formula" : ""
      }
    ]
  },
  {
    "attr_name" : "scrb-h",
    "description" : "ボックスの高さを設定(cssと同じ単位が使用可能)",
    "style" :
    [
      {
        "element" : "",
        "css_name" : "height",
        "value" : "300px",
        "calc" : false,
        "add_formula" : ""
      },
      {
        "element" : ".scrb-child_v_b",
        "css_name" : "height",
        "value" : "300px",
        "calc" : false,
        "add_formula" : ""
      },
      {
        "element" : ".scrb-child_v_a",
        "css_name" : "height",
        "value" : "300px",
        "calc" : false,
        "add_formula" : ""
      }
    ]
  },
  {
    "attr_name" : "scrb-trs",
    "description" : "スクロール時の動き方(transition)を設定(cssと同じ書き方)",
    "style" :
    [
      {
        "element" : ".scrb-child",
        "css_name" : "transition",
        "value" : "",
        "calc" : false,
        "add_formula" : ""
      }
    ]
  },
  {
    "attr_name" : "scrb-bd",
    "description" : "ボックスのボーダーを設定(cssと同じ書き方)",
    "style" :
    [
      {
        "element" : "",
        "css_name" : "border",
        "value" : "solid 1px #000",
        "calc" : false,
        "add_formula" : ""
      }
    ]
  },
  {
    "attr_name" : "scrb-bar-w",
    "description" : "スクロールバーの幅を設定(cssと同じ単位が使用可能)",
    "style" :
    [
      {
        "element" : ".scrb-child",
        "css_name" : "padding-right",
        "value" : "15px",
        "calc" : false,
        "add_formula" : ""
      },
      {
        "element" : ".scrb-child_v",
        "css_name" : "width",
        "value" : "15px",
        "calc" : false,
        "add_formula" : ""
      },
      {
        "element" : ".scrb-child_v_btn_b",
        "css_name" : "width",
        "value" : "15px",
        "calc" : false,
        "add_formula" : ""
      },
      {
        "element" : ".scrb-child_v_btn_b",
        "css_name" : "height",
        "value" : "15px",
        "calc" : false,
        "add_formula" : ""
      },
      {
        "element" : ".scrb-child_v_btn_a",
        "css_name" : "width",
        "value" : "15px",
        "calc" : false,
        "add_formula" : ""
      },
      {
        "element" : ".scrb-child_v_btn_a",
        "css_name" : "height",
        "value" : "15px",
        "calc" : false,
        "add_formula" : ""
      }
    ]
  }
];

$(function() {

    //高さ調整の関数
    function adjust_height(index){
      if ( !event || Math.abs(mousedown_position_x - event.pageX) < 100){
        scrb_data[index]["bar-current-position"] = ( scrb_data[index]["bar-current-position"] < 0 ? 0 : ( scrb_data[index]["bar-current-position"] > scrb_data[index]["bar-movable-range"] ? scrb_data[index]["bar-movable-range"] : scrb_data[index]["bar-current-position"] ) )
      }else{
        scrb_data[index]["bar-current-position"] = scrb_data[index]["bar-start-position"] ;
      }
      scrb_data[index]["inner-scroll-rate"] = Math.abs(scrb_data[index]["inner-current-position"] / scrb_data[index]["inner-movable-range"]);
      scrb_data[index]["bar-current-position"] = ( scrb_data[index]["bar-current-position"] < 0 ? 0 : ( scrb_data[index]["bar-current-position"] > scrb_data[index]["bar-movable-range"] ? scrb_data[index]["bar-movable-range"] : scrb_data[index]["bar-current-position"] ));
      scrb_data[index]["bar-scroll-rate"] = scrb_data[index]["bar-current-position"] / scrb_data[index]["bar-movable-range"];
      scrb_data[index]["inner-current-position"] = ( scrb_data[index]["inner-current-position"] < 0  ? 0 : ( ( scrb_data[index]["inner-current-position"] * -1 ) > scrb_data[index]["inner-movable-range"] ? (scrb_data[index]["inner-movable-range"] * -1) : scrb_data[index]["inner-current-position"] ));
      $(scrb_data[index]["elm_scrb_bar_v"]).css("top", ( scrb_data[index]["bar-current-position"] + scrb_data[index]["btn-b-height"] ) + "px");
      $(scrb_data[index]["elm_scrb_inner"]).css("top", scrb_data[index]["inner-movable-range"] * scrb_data[index]["bar-scroll-rate"] * -1 + "px");
      scrb_data[index]["bar-current-position"] = parseInt($(scrb_data[index]["elm_scrb_bar_v"]).css("top").replace(/[^-.0-9]/g,"")) - scrb_data[index]["btn-b-height"];
      scrb_data[index]["inner-current-position"] = parseInt($(scrb_data[index]["elm_scrb_inner"]).css("top").replace(/[^-.0-9]/g,""));
    }

    //サイズ調整の関数
    function adjust_size(index){
      scrb_data[index]["this-height"] = $(scrb_data[index]["elm_this"]).innerHeight();
      scrb_data[index]["inner-height"] = ($(scrb_data[index]["elm_scrb_inner"]).height());
      scrb_data[index]["btn-b-height"] = $(scrb_data[index]["elm_btn_b"]).height();
      scrb_data[index]["btn-a-height"] = $(scrb_data[index]["elm_btn_a"]).height();
      scrb_data[index]["inner-movable-range"] = ( scrb_data[index]["inner-height"] - scrb_data[index]["this-height"]);

      $(scrb_data[index]["elm_btn_b_arrow"])
        .css({
            "border": ($(scrb_data[index]["elm_btn_b"]).width() * 0.6 / 2) + "px solid transparent",
            "border-bottom-width": $(scrb_data[index]["elm_btn_b"]).height() * 0.6 * 0.866 + "px",
            "border-bottom-color": ( $(this).data("scrb-btn-c") !== undefined ? $(this).data("scrb-btn-c") : "#fff"),
            "border-top":"none"
        });

      $(scrb_data[index]["elm_btn_a_arrow"])
        .css({
            "border": ($(scrb_data[index]["elm_btn_a"]).width() * 0.6 / 2) + "px solid transparent",
            "border-top-width": $(scrb_data[index]["elm_btn_a"]).height() * 0.6 * 0.866 + "px",
            "border-top-color": ( $(this).data("scrb-btn-c") !== undefined ? $(this).data("scrb-btn-c") : "#fff"),
            "border-bottom":"none"
        });

      $(scrb_data[index]["elm_scrb_bar_v"])
        .css({
            "height": ( Math.pow( $(scrb_data[index]["elm_this"]).innerHeight() , 2) / $(scrb_data[index]["elm_scrb_inner"]).height() ) + "px"
          }
        );

      scrb_data[index]["bar-height"] = ($(scrb_data[index]["elm_scrb_bar_v"]).height()) ;
      scrb_data[index]["bar-movable-range"] = (scrb_data[index]["this-height"] - scrb_data[index]["bar-height"]) - scrb_data[index]["btn-b-height"] - scrb_data[index]["btn-a-height"];
      scrb_data[index]["bar-current-position"] = parseInt($(scrb_data[index]["elm_scrb_bar_v"]).css("top").replace(/[^-.0-9]/g,"")) - scrb_data[index]["btn-b-height"] ;
      scrb_data[index]["inner-current-position"] = parseInt($(scrb_data[index]["elm_scrb_inner"]).css("top").replace(/[^-.0-9]/g,""));
    }


    scrb_data = [] ;
    observer = [] ;
    mousedown_position_x = 0;
    mousedown_position_y = 0;
    active_bar_num = 0;

    //初期設定
    $(".scrb-parent")
    .css({
        "box-sizing":"border-box",
        "overflow":"hidden",
        "position":"relative"
      }
    )
    .each(function(index,element){
        //ボックス毎に実行
        scrb_data[index] = [];
        scrb_data[index]["style"] = [];


        $(this)
          .attr("id","scrb-box_"+(index+1));

        $.each($(this).data(),function(key,value){
          scrb_data[index]["style"][key] = value;
        });

        //ボックスのインナーを設定
        var scrb_inner = document.createElement("div");
        $(scrb_inner)
          .addClass("scrb-child")
          .css({
              "position":"absolute",
              "top":0,
              "left":0,
              "min-height":"100%"
          })
          .html($(this).html());



        //スクロールバーの生成
        var scrb_bar_v_body = document.createElement("div");
        $(scrb_bar_v_body)
          .addClass("scrb-child_v_body")
          .css({
              "position":"absolute",
              "top":0,
              "right":0,
              "width":"100%",
              "height":"100%",
              "background-color": ( $(this).data("scrb-bar-bgc") !== undefined ? $(this).data("scrb-bar-bgc") : "#999")
            }
          );

        var scrb_bar_v = document.createElement("div");
        $(scrb_bar_v)
          .addClass("scrb-child_v")
          .css({
              "position":"absolute",
              "top":0,
              "right":0,
              "height":"50px"
            })
          .append(scrb_bar_v_body);

        $(this)
          .html("")
          .append(scrb_inner,scrb_bar_v);


        //スクロールバーの前後の部分の生成

        var scrb_bar_v_b = document.createElement("div");
        var scrb_bar_v_a = document.createElement("div");


        $(scrb_bar_v_b)
          .addClass("scrb-child_v_b scrb-child_v_p")
          .css({
              "position":"absolute",
              "bottom":"100%",
              "left":0,
              "width":"100%",
              "height":$(this).height()+"px",
              "background-color": ( $(this).data("scrb-bar-p-bgc") !== undefined ? $(this).data("scrb-bar-p-bgc") : "#ddd")
            }
          );

        $(scrb_bar_v_a)
          .addClass("scrb-child_v_a scrb-child_v_p")
          .css({
              "position":"absolute",
              "top":"100%",
              "left":0,
              "width":"100%",
              "height":$(this).height()+"px",
              "background-color": ( $(this).data("scrb-bar-p-bgc") !== undefined ? $(this).data("scrb-bar-p-bgc") : "#ddd")
            }
          );

        $(scrb_bar_v).append(scrb_bar_v_b,scrb_bar_v_a);


        //スクロールバーのボタンの生成

        var scrb_bar_v_btn_b = document.createElement("div");
        var scrb_bar_v_btn_a = document.createElement("div");

        var scrb_bar_v_btn_b_arrow = document.createElement("div");
        var scrb_bar_v_btn_a_arrow = document.createElement("div");

        $(scrb_bar_v_btn_b)
          .addClass("scrb-child_v_btn_b scrb-child_v_btn")
          .css({
              "position":"absolute",
              "top":0,
              "right":0,
              "line-height":1,
              "display":"flex",
              "justify-content":"center",
              "align-items":"center",
              "cursor":"pointer",
              "background-color": ( $(this).data("scrb-btn-bgc") !== undefined ? $(this).data("scrb-btn-bgc") : "#666"),
              "color": ( $(this).data("scrb-btn-c") !== undefined ? $(this).data("scrb-btn-c") : "#fff")
            }
          )
          .append(scrb_bar_v_btn_b_arrow);

          $(scrb_bar_v_btn_b_arrow)
            .addClass("scrb_bar_v_btn_b_arrow scrb-child_v_btn_arrow")
            .css({
                "width":"60%",
                "height":(60 * 0.866) + "%",
                "box-sizing":"border-box"
              }
            );


          $(scrb_bar_v_btn_a)
            .addClass("scrb-child_v_btn_a scrb-child_v_btn")
            .css({
                "position":"absolute",
                "bottom":0,
                "right":0,
                "line-height":1,
                "display":"flex",
                "justify-content":"center",
                "align-items":"center",
                "cursor":"pointer",
                "background-color": ( $(this).data("scrb-btn-bgc") !== undefined ? $(this).data("scrb-btn-bgc") : "#666"),
                "color": ( $(this).data("scrb-btn-c") !== undefined ? $(this).data("scrb-btn-c") : "#fff")
              }
            )
            .append(scrb_bar_v_btn_a_arrow);

            $(scrb_bar_v_btn_a_arrow)
              .addClass("scrb_bar_v_btn_a_arrow scrb-child_v_btn_arrow")
              .css({
                  "width":"60%",
                  "height":(60 * 0.866) + "%",
                  "box-sizing":"border-box"
                }
              );


          $(this).append(scrb_bar_v_btn_b,scrb_bar_v_btn_a);


        //スタイルを適用

        for (var i = 0; i < style_config.length; i++){
          for (var j = 0; j < style_config[i]["style"].length; j++){
            // console.log( $(this).children(style_config[i]["style"][j]["element"]) );
            console.log( "#scrb-box_"+ (index + 1) +" " + style_config[i]["style"][j]["element"] );
            console.log( $("#scrb-box_"+ (index + 1) +" " + style_config[i]["style"][j]["element"])[0] );
            $("#scrb-box_"+ (index + 1) +" " + style_config[i]["style"][j]["element"]).eq(0).css(
              style_config[i]["style"][j]["css_name"],
              (
                $(this).data( style_config[i]["attr_name"]) !== undefined
                ?
                (
                  style_config[i]["style"][j]["calc"]
                  ?
                  ( "calc(" + $(this).data(style_config[i]["attr_name"]) + style_config[i]["style"][j]["add_formula"] + ")" )
                  :
                  $(this).data(style_config[i]["attr_name"])
                )
                :
                (
                  style_config[i]["style"][j]["calc"]
                  ?
                  ("calc(" + style_config[i]["style"][j]["value"] + style_config[i]["style"][j]["add_formula"] + ")" )
                  :
                  style_config[i]["style"][j]["value"]
                )
              )
            );
          }
        }

        //ボタンを修正

        if ( !$(this).data("scrb-btn") )
        {
          $(scrb_bar_v_btn_b)
            .html("")
            .css("height",0);
          $(scrb_bar_v_btn_a)
          .html("")
          .css("height",0);
        }

        $(scrb_bar_v_btn_b_arrow)
          .css({
              "border": ($(scrb_bar_v_btn_b_arrow).width() / 2) + "px solid transparent",
              "border-bottom-width":$(scrb_bar_v_btn_b_arrow).height() + "px",
              "border-bottom-color": ( $(this).data("scrb-btn-c") !== undefined ? $(this).data("scrb-btn-c") : "#fff"),
              "border-top":"none"
          });

        $(scrb_bar_v_btn_a_arrow)
          .css({
              "border": ($(scrb_bar_v_btn_a_arrow).width() / 2) + "px solid transparent",
              "border-top-width":$(scrb_bar_v_btn_a_arrow).height() + "px",
              "border-top-color": ( $(this).data("scrb-btn-c") !== undefined ? $(this).data("scrb-btn-c") : "#fff"),
              "border-bottom":"none"
          });

        scrb_data[index]["elm_this"] = $(this)[0];
        scrb_data[index]["elm_scrb_bar_v"] = $(scrb_bar_v)[0] ;
        scrb_data[index]["elm_scrb_inner"] = $(scrb_inner)[0] ;
        scrb_data[index]["elm_btn_b"] = $(scrb_bar_v_btn_b)[0] ;
        scrb_data[index]["elm_btn_a"] = $(scrb_bar_v_btn_a)[0] ;
        scrb_data[index]["elm_btn_b_arrow"] = $(scrb_bar_v_btn_b_arrow)[0] ;
        scrb_data[index]["elm_btn_a_arrow"] = $(scrb_bar_v_btn_a_arrow)[0] ;
        scrb_data[index]["btn-b-height"] = $(scrb_bar_v_btn_b).height();
        scrb_data[index]["btn-a-height"] = $(scrb_bar_v_btn_a).height();
        scrb_data[index]["bar-start-position"] = parseInt($(scrb_bar_v).css("top").replace(/[^-.0-9]/g,"")) - scrb_data[index]["btn-b-height"];

        //バーの可動可能量などのデータを格納
        adjust_size(index);
        adjust_height(index);

        //マウスホイールイベントの登録
        $(this)[0].onwheel =
        $(this)[0].mousewheel =
        $(this)[0].onmousewheel = function(e){
          wheel_value = ( e.wheelDeltaY ? e.wheelDeltaY : ( e.wheelDelta ? e.wheelDelta : ( e.deltaY ? -e.deltaY : 0 ) ) );
          event.preventDefault();
          active_bar_num = $(this).index(".scrb-parent") ;
          mousedown_position_x = event.pageX;
          mousedown_position_y = event.pageY;
          $(this).children(".scrb-child_v").css("top",(scrb_data[active_bar_num]["bar-current-position"] + scrb_data[active_bar_num]["btn-b-height"] + -wheel_value / $(this).children(".scrb-child").height() * scrb_data[active_bar_num]["bar-movable-range"])+"px") ;
          adjust_size(active_bar_num);
          adjust_height(active_bar_num);
          event.stopPropagation();
        }

        //スクロールバーの上下ボタンを押した時の処理
        $(scrb_bar_v_btn_b).on("mousedown",function(e){
            active_bar_num = $(this).index(".scrb-child_v_btn_b") ;
            scroll_btn_count = 0;
            function repeat_b(){
              if ( scroll_btn_count == 0 || scroll_btn_count > 10 )
              {
                $(scrb_data[active_bar_num]["elm_scrb_bar_v"]).css("top",(scrb_data[active_bar_num]["bar-current-position"] + scrb_data[active_bar_num]["btn-b-height"] - Math.ceil(scrb_data[active_bar_num]["bar-movable-range"] * 1 / scrb_data[active_bar_num]["inner-movable-range"]))+"px") ;
                adjust_size(active_bar_num);
                adjust_height(active_bar_num);
              }
              scroll_btn_count++;
            }
            btn_b_repeater = setInterval(repeat_b,30);

            $(scrb_bar_v_btn_b).on("mouseup",function(){
              clearInterval(btn_b_repeater);
            });
        });

        $(scrb_bar_v_btn_a).on("mousedown",function(e){
            active_bar_num = $(this).index(".scrb-child_v_btn_a") ;
            scroll_btn_count = 0;
            function repeat_a(){
              if ( scroll_btn_count == 0 || scroll_btn_count > 10 )
              {
                $(scrb_data[active_bar_num]["elm_scrb_bar_v"]).css("top",(scrb_data[active_bar_num]["bar-current-position"] + scrb_data[active_bar_num]["btn-b-height"] + Math.ceil(scrb_data[active_bar_num]["bar-movable-range"] * 1 / scrb_data[active_bar_num]["inner-movable-range"]))+"px") ;
                adjust_size(active_bar_num);
                adjust_height(active_bar_num);
              }
              scroll_btn_count++;
            }
            btn_a_repeater = setInterval(repeat_a,30);

            $(scrb_bar_v_btn_a).on("mouseup",function(){
              clearInterval(btn_a_repeater);
            });
        });

        //要素に変更が生じた場合にサイズ調整を行う(入れるとEdgeとIEで動かなくなる)

        // $(scrb_data[index]["elm_scrb_inner"]).on("DOMSubtreeModified propertychange",function(){
        //   adjust_size(index);
        //   adjust_height(index);
        // });

      }
    );

    //サイズ変更イベントの登録

    window.onresize = function(){
      for (var i = 0; i < scrb_data.length; i++) {
        adjust_size(i);
        adjust_height(i);
      }
    }

    //スクロールバーにhoverした時の処理

    $(".scrb-child_v_body").hover(function(){
        $(this).css({
            "background-color": ( $(this).closest(".scrb-parent").data("scrb-bar-bgc-hover") !== undefined ? $(this).closest(".scrb-parent").data("scrb-bar-bgc-hover") : "#bbb"),
            "cursor":"grab"
          }
        );
      },function(){
        $(this).css({
            "background-color": ( $(this).closest(".scrb-parent").data("scrb-bar-bgc") !== undefined ? $(this).closest(".scrb-parent").data("scrb-bar-bgc") : "#999") ,
            "cursor":"auto"
          }
        );
      }
    );



    //スクロールバーの前後の要素の処理

    $(".scrb-child_v_p").hover(function(){
        $(this).css({
            "background-color": ( $(this).closest(".scrb-parent").data("scrb-bar-p-bgc-hover") !== undefined ? $(this).closest(".scrb-parent").data("scrb-bar-p-bgc-hover") : "#eee"),
            "cursor":"pointer"
          }
        );
      },function(){
        $(this).css({
            "background-color": ( $(this).closest(".scrb-parent").data("scrb-bar-p-bgc") !== undefined ? $(this).closest(".scrb-parent").data("scrb-bar-p-bgc") : "#ddd") ,
            "cursor":"auto"
          }
        );
      }
    );

    //スクロールバーの上を押した時

    $(".scrb-child_v_b").on("mousedown",function(){
        active_bar_num = $(".scrb-child_v_b").index(this);
        scrb_data[active_bar_num]["bar-current-position"] = scrb_data[active_bar_num]["bar-current-position"] - $(this).parent().height();
        scrb_data[active_bar_num]["bar-start-position"] = scrb_data[active_bar_num]["bar-current-position"];
        $(this).parent().css("top",(scrb_data[active_bar_num]["bar-current-position"] + scrb_data[active_bar_num]["btn-b-height"] + "px"));

    });

    //スクロールバーの下を押した時

    $(".scrb-child_v_a").on("mousedown",function(){
        active_bar_num = $(".scrb-child_v_a").index(this);
        scrb_data[active_bar_num]["bar-current-position"] = scrb_data[active_bar_num]["bar-current-position"] + $(this).parent().height();
        scrb_data[active_bar_num]["bar-start-position"] = scrb_data[active_bar_num]["bar-current-position"] ;
        $(this).parent().css("top",(scrb_data[active_bar_num]["bar-current-position"] + scrb_data[active_bar_num]["btn-b-height"] + "px"));
        adjust_size(active_bar_num);
        adjust_height(active_bar_num);
    });

    //スクロールバーの上下を押した時

    $(".scrb-child_v_p").on("mousedown",function(){
        mousedown_position_x = event.pageX;
        scrb_data[active_bar_num]["bar-start-position"] = mousedown_position_y = event.pageY;
        adjust_size(active_bar_num);
        adjust_height(active_bar_num);

        //押した所からドラッグした時
        $(window).on("mousemove",function(){
          scrb_data[active_bar_num]["bar-current-position"] = event.pageY - $(".scrb-parent").eq(active_bar_num).offset().top - ($(".scrb-parent .scrb-child_v").eq(active_bar_num).height() / 2);
          $(".scrb-parent .scrb-child_v").eq(active_bar_num).css("top",(scrb_data[active_bar_num]["bar-current-position"] + "px"));
          adjust_size(active_bar_num);
          adjust_height(active_bar_num);
          $("body").css({
              "-moz-user-select":"none",
              "-webkit-user-select":"none",
              "-ms-user-select":"none",
              "user-select":"none",
              "cursor":"grab"
          });
        });
    });

    $(".scrb-child_v_p").on("mouseup",function(){
        $(".scrb-child_v").off("mousedown");
    });

    //スクロール-ボタンの処理

    $(".scrb-child_v_btn").hover(function(){
        $(this).css({
            "background-color": ( $(this).data("scrb-btn-bgc-hover") !== undefined ? $(this).data("scrb-btn-bgc-hover") : "#aaa"),
            "color": ( $(this).data("scrb-btn-c-hover") !== undefined ? $(this).data("scrb-btn-c-hover") : "#fff"),
            "cursor":"grab"
          }
        );
      },function(){
        $(this).css({
            "background-color": ( $(this).data("scrb-btn-bgc") !== undefined ? $(this).data("scrb-btn-bgc") : "#666") ,
            "color": ( $(this).data("scrb-btn-c") !== undefined ? $(this).data("scrb-btn-c") : "#fff"),
            "cursor":"auto"
          }
        );
      }
    );


    //スクロールバーを操作した時

    //マウスを押した時
    $(".scrb-child_v_body").on("mousedown",function(){
        $(".scrb-child_v").off("mousemove");
        active_bar_num = $(".scrb-child_v_body").index(this);
        mousedown_position_x = event.pageX;
        mousedown_position_y = event.pageY;
        scrb_data[active_bar_num]["bar-start-position"] = parseInt($(this).parent().css("top").replace(/[^-.0-9]/g,"")) - scrb_data[active_bar_num]["btn-b-height"];
        adjust_size(active_bar_num);
        adjust_height(active_bar_num);
        this_bar = $(this) ;
        $("body").css({
            "-moz-user-select":"none",
            "-webkit-user-select":"none",
            "-ms-user-select":"none",
            "user-select":"none",
            "cursor":"grab"
        });
        $(window).on("mousemove",function(){
          scrb_data[active_bar_num]["bar-current-position"] = event.pageY - mousedown_position_y + scrb_data[active_bar_num]["bar-start-position"] ;
          adjust_height(active_bar_num);
        });
    });

    //マウスを離した時
    $(window).on("mouseup",function(){
        $(window).off("mousemove");
        $(".scrb-child_v,body").off("mousemove");
        $("body").css({
            "-moz-user-select":"auto",
            "-webkit-user-select":"auto",
            "-ms-user-select":"auto",
            "user-select":"auto",
            "cursor":"auto"
        });
        if ( active_bar_num !== undefined ) scrb_data[active_bar_num]["bar-start-position"] = scrb_data[active_bar_num]["bar-current-position"];
      }
    );


  }
);
