$(function(){

	$.post("/mavendemo/getcuremail",null,function(data){
		if(data){
			//名字写在页面上
            $("#curid").html(data.userid);
			//将当前用户id藏在页面上
            $("#curemail").val(data.useremail);
           $("#curid").val(data.userid);
            $("#curname").val(data.username);
            
            
		}
		
	},"json");
});
$(function () {
   
    $("#que").click(function(){
		
		var useremail = $("#useremail").val();
		if(!useremail){//用户没写用户名为真
			alert("邮箱还没有写哦");
				return;
		}
		
		
		//第一个是url
		//第二个是用户输入的表单参数
		//第三个是用来响应ajax,data是用来返回数据
		//第四个是返回参数的类型，通常是json
       var userid = $("#curid").val();
    var username = $("#curname").val();
    var useremail = $("#curemail").val();
		$.post("/mavendemo/email",$("[name]").serialize(),function(data){
			if(data.useremail){
              var judge;
       judge=prompt("请输入密码");
       $.post("/mavendemo/moduser","userid="+userid+"&userpwd=" + judge,function(da){
            if(da=="true"){
                alert("修改成功");
				window.location.href = "/mavendemo/index.html";
				
			}
        },"text");
            }
			else{
				alert("邮箱错误")
			}
			
		},"json");
		
    
    });
});
$(function(){
	$("#returnhome").click(function(){
		 window.location.href="/mavendemo/index.html";	
		
	});
});
