$(function(){

	$.post("/mavendemo/getcuruser",null,function(data){
		if(data){
			//名字写在页面上
			$("#curname").html(data.username);
			//将当前用户id藏在页面上
			$("#curid").val(data.userid);
		}
		
	},"json");
});

$(function(){

	$("#searchBtnShow").click(function(){
		$("#pageNum").val(1);
		$("#searchBtn").click();
	});


	$("#searchBtn").click(function(){


		$.post("/mavendemo/searchuser", $("[name]").serialize(), function(data){

			if(data && data.size > 0){

				$("#total").html(data.total);

				$("#pages").html(data.pages);

				$("#curpage").html(data.pageNum);

				$("#goRange").attr("max",data.pages);

				$("#resulttable tr:gt(0)").remove();
				for(var i=0; i< data.list.length; i++){
					var userinfo = data.list[i];
					var oTr = $("<tr></tr>");

					$("<td></td>").html(userinfo.userid).appendTo(oTr);
					$("<td></td>").html(userinfo.username).appendTo(oTr);
					$("<td></td>").html(userinfo.userpwd).appendTo(oTr);
					
					var oTd = $("<td></td>").appendTo(oTr);
					var curid = $("#curid").val();

					if(curid != userinfo.userid){
						$("<input type='button' value='删除'>").click(function(){
							var isOK = confirm("您是真的要删除吗?");
							if(isOK){

								var userid = $(this).parent().parent().find("td:eq(0)").html();

								$.post("/mavendemo/deluser","userid="+userid, function(data){
									if(data == "true"){
										alert("删除成功")
										$("#searchBtn").click();
									}
									else{
										alert("删除失败,请重试.")
									}
									
								},"text")
							}
						}).appendTo(oTd);
					}

					//添加修改按钮
					$("<input type='button' value='修改'>").click(function(){
						if($(this).val() == "修改"){
							//获取当前行的第二个单元格对象
							var oTd2 = $(this).parent().parent().find("td:eq(1)");
							var username = oTd2.html();
							//清空单元格
							oTd2.empty();
							//动态生成文本框,将用户名初始化到其中并将其放到OTD2中
							$("<input type='text'>").css("width","50px").val(username).appendTo(oTd2);
							//将密码变为可编辑状态
							//获取第三个单元格对象,获得其文本
							var oTd3 = $(this).parent().parent().find("td:eq(2)");
							var userpwd = oTd3.html();
							oTd3.empty();
							$("<input type='text'>").css("width","50px").val(userpwd).appendTo(oTd3);
							$(this).val("确定");
						}
						else if($(this).val() == "确定"){
							//页面验证
							var oText2 = $(this).parent().parent().find("td:eq(1) input");
							var username = oText2.val();
							if(!username){
								alert("请输入用户名");
								oText2.focus();
								return;
							}
							//验证密码是否填写
							var oText3 = $(this).parent().parent().find("td:eq(2) input");
							var userpwd = oText3.val();
							if(!userpwd){
								alert("请输入密码");
								oText3.focus();
								return;
							}
							//发送ajax请求进行修改
							//获取当前用户的id
							var userid = $(this).parent().parent().find("td:eq(0)").html();
							var oBtn = $(this);
							$.post("/mavendemo/moduser", "userid=" + userid + "&username=" + username + "&userpwd=" + 1, function(data){
								if(data == "true"){
									//将用户名还原成不可编辑状态
									var oTd2 = oBtn.parent().parent().find("td:eq(1)");
									var oText2 = oTd2.find("input");
									var username = oText2.val();
									oTd2.empty();
									oTd2.html(username);
									var oTd3 = oBtn.parent().parent().find("td:eq(2)");
									var oText3 = oTd3.find("input");
									var userpwd = oText3.val();
									oTd3.empty();
									oTd3.html(userpwd);
									oBtn.val("修改");
									alert("修改成功");
									//将密码还原成不可编辑状态
									//提示信息
									//将确定按钮还原成修改按钮
									//$("#aaaBtn").click();
									$.post("/mavendemo/moduser", "userid=" + userid + "&username=" + username + "&userpwd=" + 0,"text")
								}
								else{
									alert("用户名冲突,请重试.");
								}
							}, "text");
						}
					}).appendTo(oTd);
					//修改按钮添加结束

					oTr.appendTo("#resulttable");
				}

				$("#resultdiv").show();
				$("#pagectrl").show();

				if(data.isFirstPage){
					 
					$("#prePage").hide();
					$("#prePageSpan").show();
				}
				else{
					$("#prePage").show();
					$("#prePageSpan").hide();
				}
				if(data.isLastPage){
					$("#nextPage").hide();
					$("#nextPageSpan").show();
				}
				else{
					$("#nextPage").show();
					$("#nextPageSpan").hide();
				}
			}
			else{
				$("#resultdiv").hide();
				$("#pagectrl").hide();

				alert("没有查到数据.");
			}
		}, "json");
	});
});


$(function(){
	$("#goRange").change(function(){
		var num =$(this).val();
		$("#gopage").val(num);
	});

	$("#prePage").click(function(){
		var pageNum = $("#pageNum").val();

		$("#pageNum").val(pageNum-1);
		$("#searchBtn").click();
	});

	$("#nextPage").click(function(){
		var pageNum = $("#pageNum").val();

		$("#pageNum").val(pageNum*1+1);
		$("#searchBtn").click();
	});

	$("#goBtn").click(function(){
		var gopage = $("#gopage").val() * 1; 

		
			if(gopage < 1){
				gopage = 1;
			}

			var pages = $("#pages").html();
			if(gopage > pages*1){
				gopage = pages;
			}

			$("#pageNum").val(gopage);

			$("#searchBtn").click();
		

	});
});
