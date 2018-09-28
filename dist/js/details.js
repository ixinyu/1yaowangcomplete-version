;(function(){
	$(function(){
		var count1=0;
		var count=0;
		$(".head").load("../html/header.html");
		$(".fo").load("../html/footer.html");
		//头部购物车
		$(".car").click(function(){
			location.href="../html/cart.html";
		})
		
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
					var $index=$(this).index();
					$(".bnav-trip span:eq(0)").html($(this).children("a").text());	
					$.getJSON("http://47.104.244.134:8080/goodsbytid.do?tid=13&page="+($index+1)+"&limit=10",function(data){			
						data=data.data;
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
		
			//商品详情tab栏
			$(".mtop .odd").click(function(){
				$(".oul table").hide();
				$(".oul-two").show();
			})
			$(".mtop .same").click(function(){
				$(".oul table").show();
				$(".oul-two").hide();
			})
			
			//放大镜
			$zoom=$(".zoom");
			$bigimg=$(".bigimg"); //大图区域
			$bigpic=$(".bigpic");  //大图
			$mtlf=$(".mt-lf");
			$mltop=$(".ml-top");
			$mltop.hover(function(){
				$zoom.show();
				$bigimg.show();				
			},function(){
				$zoom.hide();
				$bigimg.hide();
			})
			$mltop.mousemove(function(e){
				var e=e;
				var x=e.pageX-$mltop.offset().left-$zoom.outerWidth()/2;
				var y=e.pageY-$mltop.offset().top-$zoom.outerHeight()/2;				
				if(x<=0){
					x=0;
				}
				if(x>=$mltop.outerWidth()-$zoom.outerWidth()){
					x=$mltop.outerWidth()-$zoom.outerWidth();
				}				
				if(y<=0){
					y=0;
				}
				if(y>=$mltop.outerHeight()-$zoom.innerHeight()){
					y=$mltop.outerHeight()-$zoom.innerHeight();
				}
				$(".zoom").css({"left":x,"top":y});
				$bigpic.css({
					"left":-$zoom.position().left/$mltop.outerWidth()*$bigpic.width(),
					"top":-$zoom.position().top/$mltop.outerHeight()*$bigpic.height()
				});
			})
		
		//根据不同的id更换不同的图片
		
		var $detid=getCookie("list-id");
		$.get("http://47.104.244.134:8080/goodsbyid.do?id="+$detid+"",function(data){
			data=data;
//			console.log(data);
			var str="";
			str=`<div class="mt-lf">
					<div class="ml-top">
						<img src="${data.picurl}" class="mlt" />
						<div class="zoom"></div>
					</div>				
					<div class="xiaotu">
						<img src="${data.picurl}" alt="" />
					</div>
					<p>
						<span>商品邮编：1602209565</span>
						<span><i class="iconfont icon-favoritesfilling"></i><em>收藏</em></span>
						<span><i class="iconfont icon-yingtao"></i><em>分享</em><i class="iconfont icon-jiantouxia"></i></span>
					</p>
					<div class="bigimg">
						<img src="${data.picurl}" alt="" class="bigpic"/>
					</div>
				</div>
				<div class="mt-cen">
					<h6><span>自营</span><em class="title">${data.name.split(" ")[0]}</em></h6>
					<p>套餐价格：<span>￥：<em class="char">${parseInt(data.price/100)}.00</em></span><span>立省:20￥</span><span>星级评价：${data.star}</span></p>	
					<div class="taowrap">
					<div class="tao">
						<b>套餐:</b><span><em>1</em>件<em>${data.name.split(" ")[1]}</em></span>
						<span><em>${data.name.split(" ")[2]}</em></span><span><em>4件</em><em>27.5/件</em></span>
						<span><em>${data.name.split(" ")[3]}</em>
					</div>		
					<div class="nums">
						<b>数量：</b>
						<span>
							<input class="shuzi" value="0">				
							<em class="tp" data-id="${data.id}"><i class="iconfont icon-jiantoushang1"></i></em>
							<em class="btm" data-id="${data.id}"><i class="iconfont icon-jiantouxia"></i></em>					
						</span>
					</div>
					<p><i class="iconfont icon-shouji"></i>手机扫描更方便，<span>立即扫码</span><i class="iconfont icon-jiantouyou"></i></p>
					<div class="cart-btn" data-id="${data.id}">
						<i class="iconfont icon-31gouwuche"></i>
						<span>加入购物车</span>
						<em>加入成功</em>
						<div class="tankuang">
							<p><i  class="jian">1</i>件商品加入购物车</p>
							<div class="kuang">
								<img src="${data.picurl}">
								<dl>
									<dt>加入数量<i  class="jian">1</i></dt>
									<dd>总计金额<i>108</i></dd>
									<dd><span class="go">继续购物</span><span class="zhifu">去结算</span></dd>
								</dl>
							</div>
					    </div>
					</div>
					</div>
					<div class="mtcen-btm">
						<p>本商品由1药网销售和发货 </p>
						<p>18:00前下单预计当天出库，部分城市支持次日达。 运费详情 >></p>
						<p><i class="iconfont icon-duigou"></i>100%正品<i class="iconfont icon-duigou"></i>满69包邮<i class="iconfont icon-duigou"></i>药监认证 </p>
					</div>
				</div>
				<div class="mt-rig">
					<img src="${data.picurl}" alt="" />
				</div>
				`;
				$(".main-top").html(str);
						
			$(".xiaotu").children("img").mouseover(function(){
				$(this).css({"border":"1px solid red"});
				$(".mlt").attr({"src":$(this).attr("src")});
			})
			
			//加入购物车事件
//		刷新时显示购物车的数量
				
		if(getCookie("cart")){
			var obj = JSON.parse(getCookie("cart"));//将json字符串转换成对象的			
		}else{
			var obj={};
		}
		for(var i in obj){
			if(i==$detid){
				count1=obj[i];
			}
		}
		$(".shuzi").val(count1);
		//购物车按钮
		var $token=getCookie("token");
		if($token=="undefined"){
			alert("请先登录再加购物车(⊙o⊙)哦")
		}else{
			if(getCookie("cart")){
			var obja=JSON.parse(getCookie("cart"));
			}else{
				var obja={};
			}
			for(var i in obja){
				count+=obja[i];
			}
			$(".xiaoshu").html(count);
			
			
			$(".cart-btn").click(function(){
			$(this).children(".tankuang").show();			
			var $gid=$(this).data().id;			
			var num=$(".shuzi").val();
//			console.log(num);
			for(var i=0;i<num;i++){
			$.get("http://47.104.244.134:8080/cartsave.do?gid="+$gid+"&token="+$token+"",function(data){
				console.log(data);
			})
			}
			$(".cart-btn>em").show();
//			将该数据存到cookie中
			var $lid=getCookie("list-id");
			console.log($lid);
			if(getCookie("cart")){
				var obj1=JSON.parse(getCookie("cart"));
			}else{
				var obj1={};
			}
			
			if(obj1[$lid]==undefined){
					obj1[$lid] = 1;
				}else{
					obj1[$lid]++;
				}
			var liobj=JSON.stringify(obj1);
			setCookie("cart",liobj,3);
			$(".xiaoshu").html(++count);
			
			$(".jian").html($(".shuzi").val());
			
		 })
			//弹框隐藏事件
			$(".cart-btn").mouseout(function(){
				$(".cart-btn>em").hide();
			})
			$(".taowrap").mouseleave(function(){
				$(".tankuang").hide();
			})
			
			
		  //上箭头
			$(".tp").click(function(){
				count1--;
				if(count1<=0){
					count1=0;
				}
				$(".shuzi").val(count1);
				
				var $lid=$(this).data().id;
				var count=diaji(-1,$lid);
			
			  $(".xiaoshu").html(count1);
			})
			//下箭头
			$(".btm").click(function(){			
				var $lid=$(this).data().id;
				var count=diaji(1,$lid);
				$(".shuzi").val(++count1);	
				$(".xiaoshu").html(count1);
				
			})
			//go和支付事件
			$(".go").click(function(){
				location.href="list.html";
			})
			$(".zhifu").click(function(){
				location.href="cart.html";
			})
			
			function diaji(m,$lid){
				if(getCookie("cart")){
					var obja=JSON.parse(getCookie("cart"));
				}else{
					var obja={};
				}
				for(var i in obja){
					if(i==$lid){
						obja[i]=obja[i]+m;
					}
					count+=obja[i];
				}
				var liobj=JSON.stringify(obja);
				setCookie("cart",liobj,3);
				return count;
			}
		}
	 })
		

	})
})();
