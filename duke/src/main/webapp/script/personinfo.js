$(function(){

	$.post("/mavendemo/getcuruser",null,function(data){
		if(data){
			//名字写在页面上
            $("#curemail").html(data.useremail);
			//将当前用户id藏在页面上
            //$("#curemail").val(data.useremail);
		   $("#curid").val(data.userid);
		   
			$("#curname").html(data.username);
			if(data.operatorTime==null)
			{
				$("#curlogin").html("您是第一次登录");
			}
			else{
				$("#curlogin").html(new Date(data.operatorTime).format("yyyy-MM-dd hh:mm:ss"));
			}
            
            
		}
		
	},"json");
});

$(function(){
    $("#xiugai").click(function(){
		window.location.href = "/mavendemo/wangjimima.html";
	});
	$("#returnhome").click(function(){
		 window.location.href="/mavendemo/indexmain.html";	
		
	});
});