$(document).ready(function(){
	
	$("#log").click(function(){

		
		
		var manname = $("#manname").val();
		if(!manname){//用户没写用户名为真
			alert("用户名还没有写哦");
				return;
		}
		
		var manpwd = $("#manpwd").val();
		if(!manpwd){
			alert("密码还没有写呢")
			return;
		}

		$.post("/mavendemo/manlogin",$("[name]").serialize(),function(data){
			if(data.manid){
				window.location.href = "/mavendemo/manage.html";
				
			}
			else{
				alert("你写的不对哦")
			}
			
		},"json");
		
		
		
		
	});
	
	$("#manpwd").next().click(function(){
	var type=$("#manpwd").attr("type");
		if(type=="password"){
			$("#manpwd").next().attr("src","image/closeeye.jpg");
			$("#manpwd").next().css({"width":"30","height":"30"});
			$("#manpwd").prop("type","text");
		}
		else{
			$("#manpwd").next().attr("src","image/eye.jpg");
			$("#manpwd").next().css({"width":"30","height":"30"});
			$("#manpwd").prop("type","password");
		}
	});
});
$(function(){
	$("#return").click(function(){
		 window.location.href="/mavendemo/index.html";	
		
	});
})