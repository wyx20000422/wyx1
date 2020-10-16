
//对注册功能的操作
$(function(){
		//给用户名文本操作绑定失去焦点事件
	$("#username").blur(function(){
		var username = $(this).val();
		//验证是否为空
		if(!username){
			
			return ;
		}
		$.post("/mavendemo/checkname",$(this).serialize(),function(datae){
			if(datae == "true"){
				$("#msg").show().css("color","green").html("此名字未注册");
			}
			else{
				$("#msg").show().css("color","red").html("此名字已注册");
			}
			
		},"text");
	});

	$("#useremail").blur(function(){
		var useremail = $(this).val();
		//验证是否为空
		if(!useremail){
			
			return ;
		}
		$.post("/mavendemo/checkemail",$(this).serialize(),function(datar){
			if(datar == "true"){
				$("#mse").show().css("color","green").html("此邮箱未注册账号");
			}
			else{
				$("#mse").show().css("color","red").html("此邮箱已注册账号");
			}
			
		},"text");
	
		

	
	$("#reg").click(function(){
			//验证用户名
		var username = $("#username").val();
		if(!username){
			
			alert("请输入用户名");
			//光标进入用户名文本框
			$("#username").focus();
			return;
		}
		if(username.length<4||username.length>8){
			alert("用户名格式错误");
			return;
		}
		//验证邮箱
		var useremail = $("#useremail").val();
		if(!useremail){
			
			alert("请输入邮箱");
			//光标进入用户名文本框
			$("#useremail").focus();
			return;
		}
		//验证密码输入
		var userpwd = $("#userpwd").val();
		if(!userpwd){
			
			alert("请输入密码");
			return;
		}
		if(userpwd.length>16){
            alert("密码不符合格式");
            return;
        }
		//验证确认密码
		var passwd = $("#passwd").val();
		if(!passwd){
			
			alert("确认密码哦");
			return;
		}
		if(userpwd != passwd){
			
			alert("两次密码不一样哦");
			return;
		}
		
	
	
	
	
		//Ajax请求的处理
		
			
		$.post("/mavendemo/reg",$("[name]").serialize(),function(data){
			if(data =="true"){
				alert("注册成功，请登录");
				window.location.href = "/mavendemo/index.html";
			}
			else{
				alert("邮箱格式错误");
			//	window.location.href = "/mavendemo/reg.html";
			}
			
		},"text");
			
	});	
			
		
			
		
	});
	$("#userpwd").next().click(function(){
		var type=$("#userpwd").attr("type");
			if(type=="password"){
				$("#userpwd").next().attr("src","image/eye.jpg");
				$("#userpwd").next().css({"width":"25","height":"25"});
				$("#userpwd").prop("type","text");
			}
			else{
				$("#userpwd").next().attr("src","image/closeeye.jpg");
				$("#userpwd").next().css({"width":"25","height":"25"});
				$("#userpwd").prop("type","password");
			}
		});
	});

	$(function(){
		$("#return").click(function(){
			 window.location.href="/mavendemo/index.html";	
			
		});
	})
	