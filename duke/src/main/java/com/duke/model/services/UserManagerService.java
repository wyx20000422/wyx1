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
			//�ж��û����Ƿ�Ϸ�
			//���ֺ�����ͬ����id���Ҳ�ͬ���ˣ����ҵ����ֲ��Ϸ�
			UserinfoExample example = new UserinfoExample();
			
			Criteria cc = example.createCriteria();
			cc.andUseridEqualTo(user.getUserid());
			//cc.andUseridEqualTo(user.getUserid());
			//cc.andUseremailLike(user.getUseremail());
			//List<Userinfo> list = userMapper.selectByExample(example);
			//if(list.size()>0){
			//	return false;
			//}
			//�����޸Ĺ���
			int i =userMapper.updateByPrimaryKeySelective(user);
			return i>0;
		}
		
		
		
		//����Idɾ���û�
		public boolean delUserById(int userid){
			int num = userMapper.deleteByPrimaryKey(userid);
			return num>0;
		}
		
		//ʵ�ֶ�̬������ҳ��ѯ�Ĺ���
		//cond����Ϣ
		//pagesizeҳ������
		//pageNum��Ŀ
		public PageInfo<Userinfo> searchUserinfo(Userinfo cond,int pageNum,int pageSize){
			UserinfoExample example = new UserinfoExample();
			Criteria cc = example.createCriteria();
	//		if(null != cond.getUserid()){
				//���id ����
		//		cc.andUseridEqualTo(cond.getUserid());
				
	//		}
	//		if(null != cond.getUsername() && !"".equals(cond.getUsername())){
				//����û�������
	//			cc.andUsernameLike("%"+cond.getUsername()+"%");
				
	//		}
	//		if(null != cond.getUserpwd() && !"".equals(cond.getUserpwd())){
	//			//�����������
		//		cc.andUserpwdEqualTo(cond.getUserpwd());
		//	}
			if(null != cond.getUseremail() && !"".equals(cond.getUseremail())){
				//�����������
				cc.andUseremailLike("%"+cond.getUseremail()+"%");
			}
			//�𶯷�ҳ���
			PageHelper.startPage(pageNum, pageSize);
			//��Ҫ����κδ���
			//ʵʩ��ѯ
			List<Userinfo> list = userMapper.selectByExample(example);
			//����ֵ
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
	  //����
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
		  //�����������
		  cc.andUsernameEqualTo(username);
		  List<Userinfo> list = userMapper.selectByExample(example);
		 
			  return list.size() == 0;
		  
	}
	//public boolean  addNewUseremail(Userinfo useremail){
		  
	//	  boolean isOK = checkUseremail(useremail.getUseremail());
		  
	//	  if(!isOK){
	//		  return false;
	//	  }
		  //����
		  
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
		  //�����������
		  cc.andUseremailEqualTo(useremail);
		  List<Userinfo> list = userMapper.selectByExample(example);
		 
			  return list.size() == 0;
		  
	}
	//public boolean recordlogin(String loginnum){
		
	//}
	}

