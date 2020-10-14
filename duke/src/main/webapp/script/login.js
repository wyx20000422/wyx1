$(document).ready(function(){
	
	$("#log").click(function(){

		
		
		var username = $("#username").val();
		if(!username){//用户没写用户名为真
			alert("用户名还没有写哦");
				return;
		}
		
		var userpwd = $("#userpwd").val();
		if(!userpwd){
			alert("密码还没有写呢")
			return;
		}
		//第一个是url
		//第二个是用户输入的表单参数
		//第三个是用来响应ajax,data是用来返回数据
		//第四个是返回参数的类型，通常是json
		$.post("/mavendemo/login",$("[name]").serialize(),function(data){
			if(data.userid){
				var userid = data.userid;
			$.post("/mavendemo/moduser", "userid=" + userid + "&username=" + username + "&userpwd=" + userpwd + "&loginsign=" + 1,"text")
			$.post("/mavendemo/moduser", "userid=" + userid + "&username=" + username + "&userpwd=" + userpwd + "&loginsign=" + 0,"text")
				window.location.href = "/mavendemo/indexmain.html";
				
			}
			else{
				alert("你写的不对哦")
			}
			
		},"json");
		
		
		
		
	});
	$("#reg").click(function(){
		window.location.href = "/mavendemo/reg.html";
	});
	$("#forget").click(function(){
		window.location.href = "/mavendemo/modpwd.html";
	});

	$("#userpwd").next().click(function(){
	var type=$("#userpwd").attr("type");
		if(type=="password"){
			$("#userpwd").next().attr("src","image/eye.jpg");
			$("#userpwd").next().css({"width":"30","height":"30"});
			$("#userpwd").prop("type","text");
		}
		else{
			$("#userpwd").next().attr("src","image/closeeye.jpg");
			$("#userpwd").next().css({"width":"30","height":"30"});
			$("#userpwd").prop("type","password");
		}
	});
});

	


//游客模式
$(function(){
	$("#visitor").click(function(){
	
		window.location.href = "/mavendemo/visitor.html";
				
		});
});
//切换至管理员登录界面
$(function(){
	$("#manager").click(function(){
	
		window.location.href = "/mavendemo/manager.html";
				
		});
});