package com.duke.model.dao;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.duke.model.entity.Userinfo;
import com.duke.model.entity.UserinfoExample;
import com.duke.model.entity.UserinfoExample.Criteria;
import com.duke.model.dao.UserinfoMapper;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
public class Testdukedao {

	@Autowired
	private UserinfoMapper um;

	@Test
	public void testSelectByExample(){
		UserinfoExample example =  new UserinfoExample();
		
		Criteria cc = example.createCriteria();
	 
		cc.andUsernameEqualTo("hky");
		
		cc.andUserpwdEqualTo("123");
		
		List<Userinfo> list =  um.selectByExample(example);
		
		System.out.println(list);
	
	}
}
