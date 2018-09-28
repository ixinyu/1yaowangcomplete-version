;(function(){
	$(function(){
	var $usename=$("#usename");
	var $email=$("#email");
	var flag1=false;
	var flag2=false;
	//用户名验证（不能重复）
	$usename.change(function(){
		var index=$(this).parent().index();
		$.get("http://47.104.244.134:8080/username.do",{username:$usename.val()},function(data){			
			console.log(data);
			//data.msg==成功，code=0表示有重名的
			if(data.code==1){
				$("form ul li").eq(index).children("em").show()
				.siblings("span").hide();	
				flag1=true;
			}else{
				$("<span>").appendTo($("form ul li").eq(index)).html("用户名已存在")
				.siblings("em").hide();
			}
		})
	})
	//邮箱验证（不能重复）
	$email.change(function(){
//		正则验证邮箱
		var reg=/[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}/;
		var emailVal=$(this).val();
		if(!reg.test(emailVal)){
			alert("邮箱格式不正确");
		}else{
			var index=$(this).parent().index();
			$.get("http://47.104.244.134:8080/useremail.do",{email:$email.val()},function(data){
				console.log(data);
				if(data.code==1){
					$("form ul li").eq(index).children("em").show()
					.siblings("span").hide();
					flag2=true;
				}else{
					$("<span>").appendTo($("form ul li").eq(index)).html("邮箱已存在")
				   .siblings("em").hide();
				}
			})
		}
		
	})
	
	//提交事件
	$("#subbtn").on("click",function(){
		console.log($(".sex input:checked").length);
		if($usename.val()==""){
			alert("请输入用户名");
		}else if($(".pwd")==""){
			alert("请输入密码");
		}else if($email=""){
			alert("请输入邮箱");
		}else if($(".sex input:checked").length==0){
			alert("请选择性别");
		}else if(!$(".yue input").is(":checked")){
			alert("请勾选同意协议");
		}else{
		if(flag1&&flag2){
			if($("#male").is(":checked")){
			    var $sexc="男";
			}else{
				var $sexc="女";
			}
		$.post("http://47.104.244.134:8080/usersave.do",{
			"username":$("#usename").val(),
			"password":$("#pwd").val(),
			"email":$("#email").val(),
			"sex":$sexc
		})
		location.href="login.html";
		
		
	}else{
		console.log("输入有误");
		alert("输入有误，请重新输入");
	}
   }
	
		
  })
		
		
		
	})
})();
