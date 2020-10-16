package com.duke.model.services;



import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.duke.model.dao.UserinfoMapper;
import com.duke.model.entity.Userinfo;
import com.duke.model.entity.UserinfoExample;
import com.duke.model.entity.UserinfoExample.Criteria;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

	@Service
	public class UserManagerService {
		
		@Autowired
		private UserinfoMapper userMapper;
		
		public boolean modUserinfo(Userinfo user){
			//判断用户名是否合法
			//名字和我相同，但id和我不同的人，则我的名字不合法
			UserinfoExample example = new UserinfoExample();
			
			Criteria cc = example.createCriteria();
			cc.andUseridEqualTo(user.getUserid());
			//cc.andUseridEqualTo(user.getUserid());
			//cc.andUseremailLike(user.getUseremail());
			//List<Userinfo> list = userMapper.selectByExample(example);
			//if(list.size()>0){
			//	return false;
			//}
			//进行修改工作
			int i =userMapper.updateByPrimaryKeySelective(user);
			return i>0;
		}
		
		
		
		//根据Id删除用户
		public boolean delUserById(int userid){
			int num = userMapper.deleteByPrimaryKey(userid);
			return num>0;
		}
		
		//实现动态条件分页查询的功能
		//cond是信息
		//pagesize页面条数
		//pageNum数目
		public PageInfo<Userinfo> searchUserinfo(Userinfo cond,int pageNum,int pageSize){
			UserinfoExample example = new UserinfoExample();
			Criteria cc = example.createCriteria();
	//		if(null != cond.getUserid()){
				//添加id 条件
		//		cc.andUseridEqualTo(cond.getUserid());
				
	//		}
	//		if(null != cond.getUsername() && !"".equals(cond.getUsername())){
				//添加用户名条件
	//			cc.andUsernameLike("%"+cond.getUsername()+"%");
				
	//		}
	//		if(null != cond.getUserpwd() && !"".equals(cond.getUserpwd())){
	//			//添加密码条件
		//		cc.andUserpwdEqualTo(cond.getUserpwd());
		//	}
			if(null != cond.getUseremail() && !"".equals(cond.getUseremail())){
				//添加邮箱条件
				cc.andUseremailLike("%"+cond.getUseremail()+"%");
			}
			//起动分页插件
			PageHelper.startPage(pageNum, pageSize);
			//不要添加任何代码
			//实施查询
			List<Userinfo> list = userMapper.selectByExample(example);
			//返回值
			return new PageInfo<Userinfo>(list);
		}
		
	    
		
		
	  
	  public Userinfo checkLogin(Userinfo user){
		  
		  UserinfoExample example = new UserinfoExample();
		  Criteria cc = example.createCriteria();
		  
		  cc.andUsernameEqualTo(user.getUsername());
		  cc.andUserpwdEqualTo(user.getUserpwd());
		  
		  List<Userinfo> list = userMapper.selectByExample(example);
		  
		  if(list.size()>0){
			  return list.get(0);
		  }
		  else{
		  
		  return null;
		  }
	  }
public Userinfo checkemail(Userinfo user){
		  
		  UserinfoExample example = new UserinfoExample();
		  Criteria cc = example.createCriteria();
		  
		  cc.andUseremailLike(user.getUseremail());
		 
		  
		  List<Userinfo> list = userMapper.selectByExample(example);
		  
		  if(list.size()>0){
			  return list.get(0);
		  }
		  else{
		  
		  return null;
		  }
	  }
	  
	  
public boolean  addNewUser(Userinfo user){
	  
	  boolean isOK = checkUsername(user.getUsername());
	  boolean OK = checkUseremail(user.getUseremail());
	  boolean O = emaillogin(user.getUseremail());
	  if(!isOK||!OK){
		  return false;
	  }
	  //插入
	  if(!O) {
		  return false;
	  }
		  userMapper.insert(user);
		  
	  return true;
}


	/**
	 * @param user
	 */
	public boolean checkUsername(String username) {
		UserinfoExample example = new UserinfoExample();
		  Criteria cc = example.createCriteria();
		  //添加名字条件
		  cc.andUsernameEqualTo(username);
		  List<Userinfo> list = userMapper.selectByExample(example);
		 
			  return list.size() == 0;
		  
	}
	//public boolean  addNewUseremail(Userinfo useremail){
		  
	//	  boolean isOK = checkUseremail(useremail.getUseremail());
		  
	//	  if(!isOK){
	//		  return false;
	//	  }
		  //插入
		  
	//	  userMapper.insert(useremail);
		  
	//	  return true;
	//  }
	public boolean emaillogin(String useremail) {
		String regex="^\\s*\\w+(?:\\.{0,1}[\\w-]+)"
				+ "*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\\.[com]+\\s*$";
		return Pattern.compile(regex).matcher(useremail).find();
		
	}

	/**
	 * @param user
	 */
	public boolean checkUseremail(String useremail) {
		UserinfoExample example = new UserinfoExample();
		  Criteria cc = example.createCriteria();
		  //添加名字条件
		  cc.andUseremailEqualTo(useremail);
		  List<Userinfo> list = userMapper.selectByExample(example);
		 
			  return list.size() == 0;
		  
	}
	//public boolean recordlogin(String loginnum){
		
	//}
	}

