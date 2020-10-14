package com.duke.controllers;

import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.registry.infomodel.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.duke.model.entity.Userinfo;
import com.duke.model.services.UserManagerService;
import com.github.pagehelper.PageInfo;


	
	   @RestController
	   public class UserManagerController {
		

		public static final String CURRENTUSER = "CURRENTUSER";
		public static final String CUREMAIL = "CUREMAIL";
		@Autowired
		private UserManagerService service;
		
		//修改用户
	@RequestMapping("/moduser")
		public boolean doModifyUser(Userinfo user){
			return service.modUserinfo(user);
		}
		
	
		
		//删除用户
		@RequestMapping("/deluser")
		public boolean doDeleteUser(int userid){
			return service.delUserById(userid);
		}
		
		//用户查询
		@RequestMapping("/searchuser")
		public PageInfo<Userinfo> doSearchUser(Userinfo cond,int pageNum,int pageSize){
			return service.searchUserinfo(cond, pageNum, pageSize);
		}
		
		
		
		@RequestMapping("/getcuremail")
		public Userinfo doGetCurrentUserinfo(HttpSession session){
			return (Userinfo)session.getAttribute(CUREMAIL);
		}
		
		@RequestMapping("/getcuruser")
		public Userinfo doGetCurrentUser(HttpSession session){
			return (Userinfo)session.getAttribute(CURRENTUSER);
		}
		
		@RequestMapping("/checkname")
		public boolean doCheckName(Userinfo user){
			return service.checkUsername(user.getUsername());
		}
		
		@RequestMapping("/reg")
		public boolean doReg(Userinfo user){
			
			return service.addNewUser(user);
			
		}
		//@RequestMapping("/addemail")
		//public boolean doAddemail(Userinfo user){
			
		//	return service.addNewUseremail(user);
			
	//s	}
		@ResponseBody
		@PostMapping("/login")
		public Userinfo doLogin(Userinfo user,HttpSession session){
			
			
			Userinfo result = service.checkLogin(user);
			if(null != result){
				session.setAttribute(CURRENTUSER, result);
				return result;
			}else{
			
			
			return new Userinfo();
			}
		}
		@ResponseBody
		@PostMapping("/email")
public Userinfo doWangjimima(Userinfo user,HttpSession session){
			
			
			Userinfo result = service.checkemail(user);
			if(null != result){
				session.setAttribute(CUREMAIL, result);
				return result;
			}else{
			
			
			return new Userinfo();
			}
		}
		@RequestMapping("/checkemail")
		public boolean doCheckEmail(Userinfo useremail){
			return service.checkUseremail(useremail.getUseremail());
		}
//记录登录次数
		
	}

