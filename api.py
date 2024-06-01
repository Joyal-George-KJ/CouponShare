
from flask import *
from database import *
import uuid

api=Blueprint('api',__name__)
@api.route('/logins')
def logins():
	data={}
	u=request.args['username']
	p=request.args['password']
	q="select * from login where username='%s' and password='%s'"%(u,p)
	res=select(q)
	if res:
		data['data']=res
		data['status']='success'
	else:
		data['status']='faild'
	return str(data)



@api.route('/Addanyfakecomplaint')
def Addanyfakecomplaint():
	data={}
	
	cid=request.args['cid']

	l=request.args['stime']
	p=request.args['week']

	q="insert into fakecomplaint values (null,'%s','%s','%s',curdate())"%(cid,l,p)
	insert(q)
	print(q)
		
	data['status']='success'
	data['methods']='Addanyfakecomplaint'
	return str(data)



@api.route('/Viewfakecomplain')
def Viewfakecomplain():
	data={}
	lid=request.args['login_id']
	cid=request.args['cid']
	q="select * from fakecomplaint inner join coupon_request using (crequest_id) where crequest_id='%s'"%(cid)
	res=select(q)
	print(q)
	data['data']=res
	data['status']="success"
	data['method']="Viewfakecomplain"
	return str(data)




@api.route('/Addmycoupons')
def Addmycoupons():
	data={}
	

	f=request.args['login_id']
	l=request.args['stime']
	p=request.args['week']

	q="insert into coupons values (null,(select user_id from user where login_id='%s'),'%s','%s','pending',curdate())"%(f,l,p)
	insert(q)
	print(q)
		
	data['status']='success'
	data['methods']='Addmycoupons'
	return str(data)



@api.route('/Viewmycoupons')
def Viewmycoupons():
	data={}
	lid=request.args['login_id']
	q="select * from coupons  where user_id=(select user_id from user where login_id='%s')"%(lid)
	res=select(q)
	print(q)
	data['data']=res
	data['status']="success"
	data['method']="Viewmycoupons"
	return str(data)



@api.route('/view_othercoupons')
def view_othercoupons():
	data={}
	lid=request.args['login_id']


	q="select * from coupons  where user_id!=(select user_id from user where login_id='%s') "%(lid)
	res=select(q)
	print(q)
	data['data']=res
	data['status']="success"
	data['method']="view_othercoupons"
	return str(data)



@api.route('/rateings')
def rateings():
	data={}
	
	cid=request.args['cid']
	f=request.args['log_id']
	l=request.args['rating']
	r=request.args['review']

	q="insert into rating values (null,(select user_id from user where login_id='%s'),'%s','%s','%s')"%(f,cid,l,r)
	insert(q)
	print(q)
		
	data['status']='success'
	data['methods']='rateings'
	return str(data)


@api.route('/sendrequest')
def sendrequest():
	data={}
	
	cid=request.args['cid']
	f=request.args['log_id']
	

	q="insert into coupon_request values (null,'%s',(select user_id from user where login_id='%s'),curdate(),'pending')"%(cid,f)
	insert(q)
	print(q)
		
	data['status']='success'
	data['methods']='sendrequest'
	return str(data)



@api.route('/accept')
def accept():
	data={}
	
	cid=request.args['cid']
	cid1=request.args['cid1']
	
	q="update  coupon_request set status='accept' where crequest_id='%s'"%(cid)
	update(q)
	q="update  coupons set status='accept' where coupons_id='%s'"%(cid1)
	update(q)
	print(q)
		
	data['status']='success'
	data['methods']='accept'
	return str(data)



@api.route('/reject')
def reject():
	data={}
	
	cid=request.args['cid']
	cid1=request.args['cid1']
	
	q="update  coupon_request set status='reject' where crequest_id='%s'"%(cid)
	update(q)
	q="update  coupons set status='reject' where coupons_id='%s'"%(cid1)
	update(q)
	print(q)
		
	data['status']='success'
	data['methods']='reject'
	return str(data)








@api.route('/marriagecertificate')
def marriagecertificate():
	data={}
	
	f=request.args['dom']
	l=request.args['pom']
	p=request.args['localarea']
	ph=request.args['village']
	e=request.args['taluk']
	ql=request.args['dis']
	lid=request.args['lid']
	cid=request.args['cid']

	q="insert into marriagereg values(null,'%s','%s','%s','%s','%s','%s','pending','%s')"%(f,l,p,ph,e,ql,lid)
	id=insert(q)

	q="insert into certificaterequest values (null,'%s','%s','0','0',curdate(),'pending','%s')"%(lid,cid,id)
	insert(q)
	print(q)
		
	data['status']='success'
	return str(data)



@api.route('/licence',methods=['get','post'])
def licence():
	data={}
	
	image=request.files['image']
	path="static/"+str(uuid.uuid4())+image.filename
	image.save(path)
	l=request.form['lid']
	p=request.form['licencenum']
	ph=request.form['name']
	e=request.form['place']
	ql=request.form['district']

	ta=request.form['taluk']
	pl=request.form['email']
	a=request.form['phno']
	qu=request.form['addr']
	em=request.form['appointment']
	idp=request.form['idproof']

	age=request.form['ageproof']
	cid=request.form['cid']
	



	q="insert into licencereg values(null,'%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','pending')"%(p,ph,e,ql,ta,pl,a,qu,idp,age,path,em,l)
	id=insert(q)

	q="insert into certificaterequest values (null,'%s','%s','0','0',curdate(),'pending','%s')"%(l,cid,id)
	insert(q)
	print(q)
		
	data['status']='success'
	return str(data)



@api.route('/passport',methods=['get','post'])
def passport():
	data={}
	
	
	l=request.form['lid']
	p=request.form['name']
	ph=request.form['dob']
	e=request.form['district']
	ql=request.form['taluk']
	eml=request.form['email']
	pl=request.form['phno']
	a=request.form['addr']
	qu=request.form['qualification']
	em=request.form['emptype']
	idp=request.form['idproof']
	age=request.form['ageproof']
	cid=request.form['cid']
	
	image=request.files['image']
	path="static/"+str(uuid.uuid4())+image.filename
	image.save(path)
	
	q="insert into passport values(null,'%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','pending')"%(p,ph,e,ql,eml,pl,a,qu,em,idp,age,path,l)
	id=insert(q)
	q="insert into certificaterequest values (null,'%s','%s','0','0',curdate(),'pending','%s')"%(l,cid,id)
	insert(q)
	print(q)
		
	data['status']='success'
	return str(data)



@api.route('/voidersid',methods=['get','post'])
def voidersid():
	data={}
	
	image=request.files['image']
	path="static/"+str(uuid.uuid4())+image.filename
	image.save(path)
	lid=request.form['lid']
	p=request.form['dis']
	ph=request.form['application']
	e=request.form['fname']
	ql=request.form['age']

	dob=request.form['dob']
	pl=request.form['gender']
	a=request.form['addr']
	qu=request.form['street']
	em=request.form['town']
	po=request.form['po']

	pin=request.form['pincode']
	eml=request.form['email']
	pho=request.form['phno']
	idps=request.form['idproof']
	age=request.form['ageproof']
	aaad=request.form['aaddproof']
	cid=request.form['cid']




	q="insert into votersid values(null,'%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','pending','%s')"%(p,ph,e,ql,dob,pl,a,qu,em,po,pin,eml,pho,path,age,idps,lid)
	id=insert(q)
	q="insert into certificaterequest values (null,'%s','%s','0','0',curdate(),'pending','%s')"%(lid,cid,id)
	insert(q)
	print(q)
		
	data['status']='success'
	return str(data)





@api.route('/complaint')	
def complaint():
	data={}
	lid=request.args['lid']
	c=request.args['complaint']
	q="insert into `complaint` values(null,(select user_id from user where login_id='%s'),'%s','pending',now())"%(lid,c)
	insert(q)
	print(q)
	data['status']="success"
	data['method']="complaint"
	return str(data)

@api.route('/viewcomplaints')
def viewcomplaints():
	data={}
	lid=request.args['lid']
	q="select * from complaint inner join user using (user_id) where user_id=(select user_id from user where login_id='%s')"%(lid)
	res=select(q)
	print(q)
	data['data']=res
	data['status']="success"
	data['method']="viewcomplaints"
	return str(data)



@api.route('/feedback')	
def feedback():
	data={}
	lid=request.args['lid']
	c=request.args['complaint']
	q="insert into `feedback` values(null,(select user_id from user where login_id='%s'),'%s',now())"%(lid,c)
	insert(q)
	print(q)
	data['status']="success"
	data['method']="feedback"
	return str(data)

@api.route('/viewmycouponreq')
def viewmycouponreq():
	data={}
	cid=request.args['cid']
	lid=request.args['log_id']
	q="select * from coupon_request inner join user using (user_id)  inner join coupons on coupons.coupons_id=coupon_request.coupon_id  where    coupon_id='%s'"%(cid)
	res=select(q)
	print(q)
	data['data']=res
	data['status']="success"
	data['method']="viewmycouponreq"
	return str(data)



@api.route('/viewcategory')
def viewcategory():
	data={}

	
	q="select * from category "
	
	res=select(q)
	if res:
		data['data']=res
		data['status']='success'

	return str(data)



@api.route('/viewrequest')
def viewrequest():
	data={}
	

	
	q="select * from coupon_request inner join user using (user_id)  inner join coupons on coupons.coupons_id=coupon_request.coupon_id "
	res=select(q)
	print(q)
	if res:
		data['data']=res
		data['status']='success'

	return str(data)



@api.route('/viewmarriagecertificate')
def viewmarriagecertificate():
	data={}
	lid=request.args['log_id']
	rid=request.args['rid']

	
	q="SELECT * FROM `marriagereg`  INNER JOIN `user` ON user.login_id=`marriagereg`.uid   INNER JOIN `certificaterequest`  USING (`user_id`)   where uid='%s'  "%(lid)
	
	res=select(q)
	print(q)
	if res:
		data['data']=res
		data['status']='success'

	return str(data)


@api.route('/viewpassport')
def viewpassport():
	data={}
	lid=request.args['log_id']
	rid=request.args['rid']

	
	q="SELECT * FROM `passport`  INNER JOIN `user` ON user.login_id=`passport`.uid   INNER JOIN `certificaterequest`  USING (`user_id`)   where uid='%s' "%(lid)
	
	res=select(q)
	print(q)
	if res:
		data['data']=res
		data['status']='success'

	return str(data)



@api.route('/viewlicencereg')
def viewlicencereg():
	data={}
	lid=request.args['log_id']
	rid=request.args['rid']

	
	q="SELECT * FROM `licencereg`  INNER JOIN `user` ON user.login_id=`licencereg`.uid   INNER JOIN `certificaterequest`  USING (`user_id`)  where uid='%s'"%(lid)
	
	res=select(q)
	print(q)
	if res:
		data['data']=res
		data['status']='success'

	return str(data)



@api.route('/viewvotersid')
def viewvotersid():
	data={}
	lid=request.args['log_id']
	rid=request.args['rid']

	
	q="SELECT * FROM `votersid`  INNER JOIN `user` ON user.login_id=`votersid`.uid   INNER JOIN `certificaterequest`  USING (`user_id`)   where uid='%s' "%(lid)
	
	res=select(q)
	print(q)
	if res:
		data['data']=res
		data['status']='success'

	return str(data)






@api.route('/viewcertificate')
def viewcertificate():
	data={}
	lid=request.args['log_id']
	
	q="select * from certificaterequest  inner join authority using (authority_id) inner join category using (category_id) where user_id='%s' "%(lid)
	res=select(q)
	print(q)
	if res:
		data['data']=res
		data['status']='success'	
	data['method']="Viewactivity"
	return str(data)



@api.route('/Makepayment')
def Makepayment():
	data={}
	lid=request.args['login_id']
	amt=request.args['amount']
	rid=request.args['rid']
	name=request.args['name']

	
	q="insert into payment values(null,'%s','%s',now(),'paid')"%(rid,amt)
	insert(q)
	print(q)
	q="update certificaterequest set status='paid' where request_id='%s'"%(rid)
	update(q)
	data['status']='success'
	return str(data)



@api.route('/Userregistration')
def Userregistration():
	data={}
	f=request.args['fname']
	l=request.args['lname']
	
	pl=request.args['place']
	
	ph=request.args['phone']
	e=request.args['email']
	
	u=request.args['username']
	p=request.args['password']
	
	q="select * from login where username='%s' and password='%s'"%(u,p)
	res=select(q)
	if res:
		data['status']='already'
	else:
		q="insert into login values(NULL,'%s','%s','User')"%(u,p)
		lid=insert(q)
		r="insert into user values(NULL,'%s','%s','%s','%s','%s','%s')"%(lid,f,l,ph,e,pl)
		insert(r)
		print(r)
		data['status']="success"
	return str(data)
