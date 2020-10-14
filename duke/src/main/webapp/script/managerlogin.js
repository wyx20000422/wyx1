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

		$.post("/mavendemo/login",$("[name]").serialize(),function(data){
			if(data.userid){
				window.location.href = "/mavendemo/manage.html";
				
			}
			else{
				alert("你写的不对哦")
			}
			
		},"json");
		
		
		
		
	});
	
	$("#userpwd").next().click(function(){
	var type=$("#userpwd").attr("type");
		if(type=="password"){
			$("#userpwd").next().attr("src","image/closeeye.jpg");
			$("#userpwd").next().css({"width":"30","height":"30"});
			$("#userpwd").prop("type","text");
		}
		else{
			$("#userpwd").next().attr("src","image/eye.jpg");
			$("#userpwd").next().css({"width":"30","height":"30"});
			$("#userpwd").prop("type","password");
		}
	});
});