;(function(){
	$(function(){		
		$usename=$("#usename");
		$password=$("#pwd");	
		
		//切换登录方式
		$(".toggle span").click(function(){
			var $i=$(this).index();
			$(".regcen-fir").eq($i).show().siblings().hide();
		})
		
		
		//登录
		$("#subbtn").click(function(){
			//检测表单内容是否为空			
			if($usename.val()==""){
				alert("请输入用户名");
			}else if($password.val()==""){
				alert("请输入密码");
			}else{
		
			$.post("http://47.104.244.134:8080/userlogin.do",{
				"name":$usename.val(),
				"password":$password.val()
			},function(data){
				console.log(data);
				data=data;
				setCookie("token",data.data.token,7);
				if(data.code==0){
					location.href="../index.html";
				}else{
					alert("请先注册再登录");
				}
			})
	}	
})
  		
		
  })
})();
