$(function(){
	$(".tabClick .a1").on("click",function(){
		var i = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".i4-list .child").eq(i).addClass("on").siblings().removeClass("on");
		$(".i4-list .child").eq(i).find("li").eq(0).find("a").mouseover()
	});
	$(".tabClick .a2").on("click",function(){
		var i = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".i4-list .child").eq(i).addClass("on").siblings().removeClass("on");
		$(".i4-list .child").eq(i).find("li").eq(0).find("a").mouseover()
	})
	$(".tabClick .a3").on("click",function(){
		var i = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".i4-list .child").eq(i).addClass("on").siblings().removeClass("on");
		$(".i4-list .child").eq(i).find("li").eq(0).find("a").mouseover()
	});
    $(".tabClick .a4").on("click",function(){
		var i = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".i4-list .child").eq(i).addClass("on").siblings().removeClass("on");
		$(".i4-list .child").eq(i).find("li").eq(0).find("a").mouseover()
	});
	

	$(document).on("mouseover",".i4-list li a",function(e){
		//e.preventDefault();
		var i = $(this).closest("li").index();
		$(this).closest("li").addClass("on").siblings().removeClass("on");

		var _title = $(this).data("title");
		var _p = $(this).data("p");
		var _src = $(this).data("src");
		var _href = $(this).attr("href");

		$(".ind_4_cont .img .a").attr({"href":_href});
		$(".ind_4_cont .img img").attr({"src":_src});
		$(".ind_4_cont .img img").attr({"title":_title});
		$(".ind_4_cont .img .con p").html(_p);

	});
	$(".tabClick .a1").click();
})

$(function(){
	$(".zjclick .a1").on("click",function(){
		var i = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".izj-list .child").eq(i).addClass("on").siblings().removeClass("on");
		$(".izj-list .child").eq(i).find("li").eq(0).find("a").mouseover()
	});
	$(".zjclick .a2").on("click",function(){
		var i = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".izj-list .child").eq(i).addClass("on").siblings().removeClass("on");
		$(".izj-list .child").eq(i).find("li").eq(0).find("a").mouseover()
	})
	$(".zjclick .a3").on("click",function(){
		var i = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".izj-list .child").eq(i).addClass("on").siblings().removeClass("on");
		$(".izj-list .child").eq(i).find("li").eq(0).find("a").mouseover()
	});
	$(".zjclick .a4").on("click",function(){
		var i = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".izj-list .child").eq(i).addClass("on").siblings().removeClass("on");
		$(".izj-list .child").eq(i).find("li").eq(0).find("a").mouseover()
	});

	

	$(document).on("mouseover",".izj-list li a",function(e){
		//e.preventDefault();
		var i = $(this).closest("li").index();
		$(this).closest("li").addClass("on").siblings().removeClass("on");

		var _title = $(this).data("title");
		var _src = $(this).data("src");
		var _href = $(this).attr("href");

		$(".ind_zj_cont .img .a").attr({"href":_href});
		$(".ind_zj_cont .img img").attr({"src":_src});
		$(".ind_zj_cont .img img").attr({"title":_title});

	});
	$(".zjclick .a1").click();
})