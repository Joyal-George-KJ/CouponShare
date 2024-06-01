from flask import *
from database import *

user=Blueprint('user',__name__)


@user.route('/user_home')
def user_home():
	return render_template('user_home.html')


@user.route('/user_send_complaint',methods=['get','post'])
def user_send_complaint():
    data={}
    if 'com_sub' in request.form:
        complaint=request.form['complaint']
        
        q="insert into complaint values(null,'%s','%s','pending',curdate())"%(session['uid'],complaint)
        insert(q)
        flash("Send successfully")
        return redirect(url_for('user.user_send_complaint'))

    q="select * from complaint where user_id='%s' "%(session['uid'])
    data['view']=select(q)
    
    return render_template('user_send_complaint.html',data=data)


@user.route('/user_viewstudenteng',methods=['get','post'])
def user_viewstudenteng():
	data={}
	cid=request.args['cid']
	
	
	q="select * from engageddetails  inner join  login using (login_id) inner join user on user.login_id=engageddetails.login_id  where class_id='%s'"%(cid)
	data['view']=select(q)
	return render_template('user_viewstudenteng.html',data=data)

@user.route('/user_addcoupon',methods=['get','post'])
def user_addcoupon():
	data={}
	d="select * from coupons where user_id='%s'"%(session['uid'])
	data['view']=select(d)
	if 'sub' in request.form:
		c=request.form['co']
		n=request.form['d']
		ins="insert into coupons values(null,'%s','%s','%s','pending',curdate())"%(session['uid'],c,n)
		insert(ins)
		return redirect(url_for('user.user_addcoupon'))
	return render_template('user_addcoupon.html',data=data)
@user.route('/userview_otherscoupon',methods=['get','post'])
def userview_otherscoupon():
	data={}
	d="select * from coupons where user_id not in ('%s')"%(session['uid'])
	data['view']=select(d)
	if 'action' in request.args:
		action=request.args['action']
		cid=request.args['cid']
		uid=request.args['uid']
	else:
		action=None
	if action=='user_buy':
		s="insert into coupon_request values(null,'%s','%s',curdate(),'pending')"%(cid,uid)
		insert(s)
		return redirect(url_for('user.user_home'))
	return render_template('userview_otherscoupon.html',data=data)


@user.route('/viewcoupon_request',methods=['get','post'])
def viewcoupon_request():
	data={}
	c=request.args['cid']
	d="select *,coupon_request.status as sts from coupon_request inner join coupons using(user_id) where coupons_id='%s'"%(c)
	data['view']=select(d)
	if 'action' in request.args:
		action=request.args['action']
		cid=request.args['cid']
		did=request.args['did']
	else:
		action=None
	if action=='accept':
		s="update coupon_request set status='accept' where crequest_id='%s'"%(cid)
		update(s)
		d="update coupons set status='accept' where coupons_id='%s'"%(did)
		update(s)
		return redirect(url_for('user.user_home'))
	if action=='accept':
		s="update coupon_request set status='reject' where crequest_id='%s'"%(cid)
		update(s)
		d="update coupons set status='reject' where coupons_id='%s'"%(did)
		update(s)
		return redirect(url_for('user.user_home'))

	
	return render_template('viewcoupon_request.html',data=data)

	
@user.route('/user_viewstaffeng',methods=['get','post'])
def user_viewstaffeng():
	data={}
	cid=request.args['cid']
	
	
	q="select * from engageddetails  inner join  login using (login_id) inner join staff on staff.login_id=engageddetails.login_id  where class_id='%s'"%(cid)
	data['view']=select(q)
	return render_template('user_viewstaffeng.html',data=data)




@user.route('/user_viewclass',methods=['get','post'])
def user_viewclass():
	data={}
	
	
	q="select * from class"
	data['view']=select(q)
	return render_template('user_viewclass.html',data=data)



	