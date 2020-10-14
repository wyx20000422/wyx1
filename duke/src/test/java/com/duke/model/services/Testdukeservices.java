package com.duke.model.services;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.duke.model.entity.Userinfo;
import com.duke.model.services.UserManagerService;
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
public class Testdukeservices {
    
	@Autowired
	private UserManagerService service;

//	@Test
	//public void testAddUser(){
	//	boolean addNewUser = service.addNewUser(new Userinfo(0,"lt","123","456"));
		
	//	System.out.println(addNewUser);
}


 
 
 

