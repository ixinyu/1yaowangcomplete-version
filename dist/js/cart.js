;(function(){
	$(function(){	
		$token=getCookie("token");
		var count1=0;
		$.get("http://47.104.244.134:8080/cartlist.do?token="+$token+"",function(data){
			console.log(data);
			var str="";
			for(var i=0;i<data.length;i++){
				str+=`<li class="clean pin" data-id="${data[i].id}" data-gid="${data[i].gid}">
						<p><input type="checkbox" /></p>
						<dl>
							<dt><img src="${data[i].goods.picurl}" alt="" /></dt>
							<dd>
								<p>${data[i].goods.name.split(" ")[0]}</p>
								<p><span>${data[i].goods.name.split(" ")[1]}</span><span>修改</span></p>
							</dd>
						</dl>
						<div class="carli-cen">
							<span>单价: <i>￥：${parseInt(data[i].goods.price/100)}.00</i></span>
							<span><em class="tp">-</em><input type="text" class="shuzi" value="${data[i].count}" /><em class="btm">+</em></span>
							<span>0.5kg</span>
							<span>有货</span>
							<span>总价：￥<i class="total">${parseInt(data[i].goods.price/100)*data[i].count}.00</i></span>
						</div>
						<div class="carli-rig">
							<p><span>收藏</span></p>
							<p class="del"><span>删除</span></p>
						</div>
					</li>`;
			}
			$(".carlist").html(str);
			
			//减号
			$(".tp").click(function(){
				$id=$(this).parents(".pin").data("id");
				$gid=$(this).parents(".pin").data("gid");
				count1=$(this).siblings(".shuzi").val();		
				if(count1>0){
					$.get("http://47.104.244.134:8080/cartupdate.do",{id:$id,gid:$gid,num:-1,token:$token},function(data){
					 console.log(data);
					})
				}	
				count1--;
				if(count1<=0){
					count1=0;
				}
				$(this).siblings(".shuzi").val(count1);
			})
			//加号
			$(".btm").click(function(){
				$id=$(this).parents(".pin").data("id");
				$gid=$(this).parents(".pin").data("gid");
				count1=$(this).siblings(".shuzi").val();
				$.get("http://47.104.244.134:8080/cartupdate.do",{id:$id,gid:$gid,num:1,token:$token},function(data){
					console.log(data);
				})		
				
				$(this).siblings(".shuzi").val(++count1);		
			})	
			//修改数据的事件
			$(".shuzi").focus(function(){
				$id=$(this).parents(".pin").data("id");
				$gid=$(this).parents(".pin").data("gid");
				var num1=$(this).val();
				$(this).change(function(){
					var num2=$(this).val();
					if(num1<num2){
						for(var i=num1;i<num2;i++){
							$.get("http://47.104.244.134:8080/cartupdate.do",{id:$id,gid:$gid,num:1,token:$token},function(data){
							console.log(data);
						  })
						}			
					}
					if(num1>num2){
						for(var i=num2;i<num1;i++){
							$.get("http://47.104.244.134:8080/cartupdate.do",{id:$id,gid:$gid,num:-1,token:$token},function(data){
							console.log(data);
						  })
						}	
					}
				})	
			})
			//删除按钮
			$(".del").click(function(){		
				$id=$(this).parents(".pin").data("id");
				$gid=$(this).parents(".pin").data("gid");
				
				console.log($(this).parents(".pin"));
				$(this).parents(".pin").remove();
				
				$.get("http://47.104.244.134:8080/cartupdate.do",{id:$id,gid:$gid,num:0,token:$token},function(data){
					console.log(data);
				})		
			})
			
			//全选事件
			var oinput=$(".carlist>li>p>input");
			$(".checkall").click(function(){
				var str=0;
				oinput.prop("checked",$(this).prop("checked"));	
			//总价
				for(var i=0;i<$(".carlist>li>p>input:checked").length;i++){
					str=str+parseInt($(".pin").eq(i).children(".carli-cen").children().children(".total").html());
				}
				$(".prototal").html(str);
			})
			//下方的单选事件
			oinput.click(function(){
				if($(".carlist>li>p>input:checked").length==oinput.length){
					$(".checkall").prop("checked",true);
				}else{
					$(".checkall").prop("checked",false);
				}
				//总价
				var str=0;
				for(var i=0;i<$(".carlist>li>p>input:checked").length;i++){
					str=str+parseInt($(".carlist>li>p>input:checked").eq(i)
					.parent().siblings(".carli-cen")
					.children().children(".total").html());
				}
				$(".prototal").html(str);
		})
			
			
			
		})
		
		
		
	})
})();
