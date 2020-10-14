$(function(){

	$.post("/mavendemo/getcuruser",null,function(data){
	if(data){
			//名字写在页面上
            $("#curpwd").html(data.userpwd);
			//将当前用户id藏在页面上
           $("#curemail").val(data.useremail);
          $("#curid").val(data.userid);
            $("#curname").val(data.username);
            $("#curpwd").val(data.userpwd);
            
		}
		
	},"json");
});

$(document).ready(function(){
    //$("#curid").val(data.userid);
    
    $("#queding").click(function(){
        var userid = $("#curid").val();
    //var username = $("#curname").val();
   // var useremail = $("#curemail").val();
        var curpwd = $("#curpwd").val();
        var oldpwd = $("#oldpwd").val();
        var newpwd = $("#userpwd").val();
        var qnewpwd = $("#quserpwd").val();
        if(!oldpwd){
            alert("旧密码不能为空");
            return false;
        }
        if(!newpwd){
            alert("新密码不能为空");
            return false;
        }
        if(!qnewpwd){
            alert("确认新密码不能为空");
            return false;
        }
        if(qnewpwd!=newpwd){
            alert("两次密码不一样");
            return false;
        }
        if(oldpwd==curpwd){
            
        
        $.post("/mavendemo/moduser",   "userid=" + userid + "&userpwd=" + newpwd,function (data) {
            
            if(data == "true"){
               
                
                alert("重置密码成功，请登录");
                window.location.href = "/mavendemo/index.html";
            }
            else{
               alert("ERROR");
            }
        }, "text");
        }
        else{
            alert("旧密码错误");
        }
    });
    

});
$(function(){
    $("#return").click(function(){
		 window.location.href="/mavendemo/indexmain.html";	
		
	});
})