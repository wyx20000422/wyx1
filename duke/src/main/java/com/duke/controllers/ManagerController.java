package com.duke.controllers;

import javax.servlet.http.HttpSession;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.duke.model.entity.Manager;
import com.duke.model.entity.Userinfo;
import com.duke.model.services.ManagerService;
import com.duke.model.services.UserManagerService;


@RestController
public class ManagerController {
	

	public static final String CURRENTMANAGER = "CURRENTMANAGER";
	
	@Autowired
	private ManagerService service;
	
	
	@ResponseBody
	@PostMapping("/manlogin")
	public Manager doLogin(Manager manager,HttpSession session){
		
		
		Manager result = service.checkLogin(manager);
		if(null != result){
			session.setAttribute(CURRENTMANAGER, result);
			return result;
		}
		else{
		
		
		return new Manager();
		}
	}
	@RequestMapping("/getcurmanager")
	public Manager doGetCurrentManager(HttpSession session){
		return (Manager)session.getAttribute(CURRENTMANAGER);
	}
}
