;(function(){
	$(function(){
		var $drop=$(".drop");
		var count=0;
		//小购物车的事件
		$(".car").click(function(){
			location.href="../html/cart.html";
		})
		/*$(".car").mouseover(function(){
			
		})*/
	
		
		$(".lg-btm").click(function(){
			location.href="../html/list.html";
		})
		//为头部下拉菜单添加 数据
		$("#headDrop").hover(function(){
			$.get("http://47.104.244.134:8080/goodstypelist.do?l=2",function(data){
				data=data;
				var str="";
				for(var i=0;i<data.length;i++){
					str+=`<li><em>A</em><span>${data[i].name}</span></li>`;
				}
				$drop.html(str).show();
			})
		},function(){
			$drop.hide();
		});
		
		
	
	//搜索框
		$("#search").focus(function(){
			$(".lt-trip").show();
		})
	
		$(".lt-trip").mouseenter(function(){
			$(".lt-trip").show();
		})
		$(".lt-trip").mouseleave(function(){
			$(".lt-trip").hide();
		})
		//每次输入获取相同数据
		$("#search").keydown(function(){
			$.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+$("#search").val()+"&cb=?",function(data){
//				console.log(data);
				data=data.s;
				data=data.splice(0,5);
				var str="";
				data.forEach(function(item){
					str += `<li><a href="https://www.baidu.com/s?wd=${item}">${item}</a></li>`;
				})
				$(".ltrip").html(str);
			})		
		})		
		
		//点击搜索按钮发送
		$("#searchBtn").click(function(){			
			location.href="https://www.baidu.com/s?wd="+$("#search").val()+"";		
		})
		//按回车键发送
		$(document).keydown(function(event){
			var $code=event.keyCode;
			console.log($code);
			if($code==13){
				location.href="https://www.baidu.com/s?wd="+$("#search").val()+"";
			}
		})
		
	//底部动画
	$(".fw-top ul li").mouseenter(function(){
		$(this).stop().animate({"margin-top":"-20px"},300,function(){
			$(this).stop().animate({"margin-top":0});
		})
		.siblings().stop().animate({"margin-top":0});
	})
	
	
	
	})
})();
