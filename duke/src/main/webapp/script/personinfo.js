$(function(){

	$.post("/mavendemo/getcuruser",null,function(data){
		if(data){
			//名字写在页面上
            $("#curemail").html(data.useremail);
			//将当前用户id藏在页面上
            //$("#curemail").val(data.useremail);
           $("#curid").val(data.userid);
            $("#curname").html(data.username);
            
            
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