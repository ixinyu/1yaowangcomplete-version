;(function(){
	$(function(){
		$banner=$(".ban-nav");

		//楼梯布局
		var $num=$(".usual").length;
		var ss="";
		for(var i=0;i<$num;i++){
			ss+="<li>"+$(".sta").eq(i).children("span").text()+"</li>"
		}
		$(".stair").html(ss);
		//楼梯事件
		var flag=true;
		$(window).scroll(function(){
			if(flag){
				var $scrolltop=$(this).scrollTop();		
			if($scrolltop>300){
				$(".stairs").fadeIn();
			}else{
				$(".stairs").fadeOut();
			}
			$(".usual").each(function(){
			
				if($scrolltop>=$(this).offset().top - $(this).outerHeight()/2){
					var $index=$(this).index();
//					console.log( $index);
					$(".stair li").eq($index).addClass("hover").siblings().removeClass("hover");
					$(".sta").eq($index).css({"background":"#FFA27A"});		
					
				}
			})		
		 }		
		})
		//划过事件
		$(".stair li").hover(function(){
			var $index=$(this).index();
			var oem=$(".sta").eq($index).children("em").text();
			$(this).text(oem);
			$(this).addClass("hover").siblings().removeClass("hover");
		},function(){
			var $index=$(this).index();
			var ospan=$(".sta").eq($index).children("span").text();
			$(this).text(ospan);
		})
		
		//点击楼层
		$(".stair li").click(function(){
			flag=false;
			var $index=$(this).index();
			$(this).addClass("hover").siblings().removeClass("hover");
			$("html,body").stop().animate({"scrollTop":$(".usual").eq($index).offset().top},500,function(){
				flag=true;
			})
			
		})
		
		
		
		//右侧定位
		$(".doc li").hover(function(){
			$(this).children("i").hide().siblings().show().css({"color":"#fff"}).parent().css({"background":"red"});			
		},function(){
			$(this).removeAttr("style").children("a").hide().siblings().show();
		})
		//最下面一个返回顶部
		$(".doc li:last").click(function(){
			$("html,body").stop().animate({"scrollTop":0},500);
		})
				
		//banner 的侧边栏		
			$.get("http://47.104.244.134:8080/goodstypelist.do?l=1",function(data){
				console.log(data);
				data=data;
				var str1="";
				data.forEach(function(items){
					str1+=`<li data-id="${items.id}"><i class="iconfont icon-caomei"></i><a href="#">${items.name}</a></li>`;
				})
				$banner.html(str1);
				$banner.append(str1);
				$banner.append(str1);
				//banner侧边栏的菜单	
				$(".ban-nav li").mouseover(function(){
					$(".bnav-trip").show();
//					var $index=$(this).data();
					var $index=$(this).index();
//					console.log($index);
					$(".bnav-trip span:eq(0)").html($(this).children("a").text());	
					$.getJSON("http://47.104.244.134:8080/goodsbytid.do?tid=13&page="+($index+1)+"&limit=10",function(data){			
//						console.log(data);
						data=data.data;
//						console.log(data);
						var st="";						
						data.forEach(function(items){							
						    $(".bnav-trip span:eq(1)").html(items.name.split(" ")[0]);
							st+=`<ul><li><h5>${items.name.split(" ")[1]}</h5></li>
	   	 					<li><a href=""><span>生产日期:</span>${items.pubdate}</a></li>
	   	 					<li><a href=""><span>生产厂家:</span>${items.info}</a></li>
	   	 					<li><a href=""><span>产品介绍:</span>${items.name.split(" ")[2]}</a><em>|</em><a>${items.name}</a></li>
	   	 					</ul>`;					
						})
						$(".bnl").html(st);
					})				
				})
				$(".bnav-trip span:eq(0)").html($(this).children("a").text());	
				$(".bnav-trip").mouseleave(function(){
					$(".bnav-trip").hide();
				})
				
			});


		//引入的轮播图插件
			var mySwiper = new Swiper('.ban', {
			autoplay: true,//可选选项，自动滑动
			autoplay: {
			    delay: 2000,//1秒切换一次
			  },
			navigation: {
		      nextEl: '.swiper-button-next',
		      prevEl: '.swiper-button-prev',
		  	},
		  	pagination :{
		      el: '.swiper-pagination',
				    clickable :true,
				  },
			effect : 'cube',
			  cubeEffect: {
			    slideShadows: true,
			    shadow: true,
			    shadowOffset: 100,
			    shadowScale: 0.6
			  },
		});
	
	
	var mySwiper1 = new Swiper('.smalllun', {
			autoplay: true,//可选选项，自动滑动
			autoplay: {
			    delay: 1000,//1秒切换一次
			  },
			navigation: {
			    nextEl: '.swiper-button-next',
			    prevEl: '.swiper-button-prev',
			  },
			pagination :{
		    el: '.swiper-pagination',
		    clickable :true,
		 },
		 effect : 'fade',
		});
	
	
	//家庭常备药
	
	$.ajax({
		type:"get",
		url:"http://47.104.244.134:8080/goodsbytid.do?tid=13&page=1&limit=5",
		async:true,
		success:function(data){
			data=data.data;
			var str="";
			for(let i=0;i<data.length;i++){
				data[i].price=parseInt(data[i].price/100);
//				data[i].name=data[i].name.substr(0,20);
				str+=`<div class="ubtm">
	   	  	 		<img src="imgs/ust${i+1}.jpg" alt="" />
	   	  	 		<p><span>${data[i].name.split(" ")[0]}</span></p>
	   	  	 		<span>￥：${data[i].price}</span>
	   	  	 	</div>`;
			}
			$(".ur-btm").html(str);
		}
	});
	

	//底部tab栏
	var $num=$(".fb-one").children().length;
	var ss="";
	for(var i=0;i<$num;i++){
		ss+=`<li><a href="">平安官网</a><a href="">资讯网</a></li>`;
	}
	$(".fb-two").html(ss).hide();
	
	//切换事件
	$(".foo-top").children().mouseover(function(){
		console.log(this);
		var index=$(this).index();
		$(this).css({"background":"#fff","border-bottom":0})
		.siblings().css({"background":"#F8F8F8","border-bottom":"1px"})
		.parent().siblings().children().eq(index).show()
		.siblings().hide();	
	})
	
	//小购物车
	$(".sm-car").click(function(){
		location.href="cart.html";
	})
	/*$(".sm-car").mouseover(function(){
		$(".carbox").show();
		console.log("aa");
	})*/
	
	
	
	
	//页面跳转
	$(".ban-lf").on("click","li",function(){
		location.href="html/list.html";
	})
	$(".lg-btm ul").on("click","li",function(){
		location.href="html/list.html";
	})
	$(".ban-cen").click(function(){
		location.href="html/list.html";
	})
	$(".new").children().click(function(){
		location.href="html/list.html";
	})
	$(".docyao").children().click(function(){
		location.href="html/list.html";
	})
	
	
	})
})();
