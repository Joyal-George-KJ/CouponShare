from flask import *
from database import *

admin=Blueprint('admin',__name__)


@admin.route('/admin_home')
def admin_home():
	return render_template('admin_home.html')


@admin.route('/admin_viewuser',methods=['get','post'])
def admin_viewuser():
	data={}
	
	
	q="select * from user  inner join login using (login_id)"
	data['view']=select(q)


	if "action" in request.args:
		action=request.args['action']
		lid=request.args['lid']


	else:
		action=None

	if action=='accept':
		q="update login set usertype='user' where login_id='%s'"%(lid)
		update(q)
		return redirect(url_for('admin.admin_viewuser'))

	if action=='reject':
		q="update login set usertype='block' where  login_id='%s'"%(lid)
		update(q)
		return redirect(url_for('admin.admin_viewuser'))



	return render_template('admin_viewuser.html',data=data)




@admin.route('/admin_viewcoupons',methods=['get','post'])
def admin_viewcoupons():
	data={}


	q="select * from coupons  "
	data['view']=select(q)

	
	
	
	return render_template('admin_viewcoupons.html',data=data)


@admin.route('/admin_viewrated',methods=['get','post'])
def admin_viewrated():
	data={}
	
	
	
	q="select * from rating inner join user using (user_id) "
	data['view']=select(q)
	return render_template('admin_viewrated.html',data=data)




@admin.route('/admin_viewfakecomp',methods=['get','post'])
def admin_viewfakecomp():
	data={}
	
	
	q="select * from fakecomplaint"
	data['view']=select(q)
	return render_template('admin_viewfakecomp.html',data=data)


@admin.route('/admin_prousers',methods=['get','post'])
def admin_prousers():
	data={}
	
	
	q="select * from user inner join login using (login_id)"
	data['view']=select(q)


	if "action" in request.args:
		action=request.args['action']
		lid=request.args['lid']


	else:
		action=None

	if action=='accept':
		q="update login set usertype='user' where login_id='%s'"%(lid)
		update(q)
		return redirect(url_for('admin.admin_viewuser'))

	if action=='reject':
		q="update login set usertype='block' where  login_id='%s'"%(lid)
		update(q)
		return redirect(url_for('admin.admin_viewuser'))
	return render_template('admin_prousers.html',data=data)





@admin.route('/admin_view_complaints')
def admin_view_complaints():
    data={}
    e="select * from complaint inner join user using(user_id)"
    data['view']=select(e)
    return render_template('admin_view_complaints.html',data=data)

@admin.route('/admin_send_reply',methods=['get','post'])
def admin_send_reply():
    c_id=request.args['c_id']
    if 'reply' in request.form:
        reply=request.form['reply']
        y="update complaint set reply='%s' where complaint_id='%s'"%(reply,c_id)
        update(y)
        return redirect(url_for('admin.admin_view_complaints'))
    return render_template('admin_send_reply.html')
