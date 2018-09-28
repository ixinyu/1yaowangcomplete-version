;(function(){
	$(function(){
//		头部
		$.get("../html/header.html",function(data){
			$(".header").html(data);
		});
		$.get("../html/footer.html",function(data){
			$(".foo").html(data);
		});
//		左侧下拉
		$(".ban-lfo li:not(:first)").click(function(){	
			if($(this).children().is(":hidden")){
				$(this).css({"background-image":"url('imgs/minus.gif')"});
			}else{
				$(this).css({"background-image":"url('imgs/plus.gif')"});
			}
			$(this).children(".li-two").slideToggle("slow");
			
		})
		 
//		右侧
		$(".bbox li a").click(function(){
			$(this).parent().children(".bbox-two").show().next().show();			
		})
		$(".bbox-san .qu").click(function(){
			$(this).parent().hide().siblings(".bbox-two").hide();
		})
		$(".bbox-san .que").click(function(){
			$(this).parent().hide().siblings(".bbox-two").hide().siblings("em").eq(0).html("爱尔康");
		})
		$(".bbox-two li input").click(function(){
			if($(".bbox-two input:checked").length>0){
				$(".bbox-san").children().eq(0).css({"background":"red",
                "color":"#fff"});
			}		
		})
		
		//分页请求
		var $first=$(".br-list").html();
		var count=0;
		$(".lf").click(function(){
			count--;
			if(count<=0){
//				alert("已经是第一页");
				count=0;				
			}
			$(".count").html((count+1));
			
			if(count!=0){
				getlist((count+1));
			}else{
				$(".br-list").html($first);
			}
			
		})
		$(".rig").click(function(){			
			count++;
			if(count>=2){
//				alert("已经是最后一页");
				count=2;
			}
			$(".count").html((count+1));
			getlist((count+1));
		})
		
		//下方分页按钮
		$(".fast").click(function(){
			var $index=$(this).index();
			getlist($index);
		})
			
	function getlist($index){
			$.get("http://47.104.244.134:8080/goodsbytid.do?tid=13&page="+$index+"&limit=12",function(data){
				console.log(data);
				data=data.data;
				var str="";
				data.forEach(function(items){
					items.price=parseInt(items.price/100);
					str+=`<div class="br-fo" data-id=${items.id}>
						   <div class="bf">
							<div class="big">
								<img src="${items.picurl}" alt="" />
							</div>							
							<div class="bf-btm">
								<p>￥:${items.price}.00</p>
								<p><span>自营</span><span>强生define新美瞳</span><span>${items.name}</span></p>
								<p><span>2盒减40,4盒免一盒</span></p>
								<p><i class="iconfont icon-good-filling"></i><span>1药网自营</span><span>评论<em>6</em>条</span></p>
							</div>					
						</div>
					</div>`;
				})
				$(".br-list").html(str);	
			 })
		}
		
			//banner 的侧边栏			
			$banner=$(".ban-nav");
			$.get("http://47.104.244.134:8080/goodstypelist.do?l=1",function(data){
//				console.log(data);
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
					$(".banner-lf").hide();
				})		
					//控制商品种类的显示与隐藏
					$(".kind").mouseenter(function(){
						$(".banner-lf").show();
					});
					
				});
				
			//给每个列表添加跳转事件
			$(".br-fo").click(function(){
				var $index=$(this).data().id;
				console.log($index);
				location.href="details.html";
     			setCookie("list-id",$index,7);			
			})
		
		
		
	})
})();
