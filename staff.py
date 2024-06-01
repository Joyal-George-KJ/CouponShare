from flask import *
from database import *

staff=Blueprint('staff',__name__)


@staff.route('/staff_home')
def staff_home():
	return render_template('staff_home.html')


@staff.route('/staff_addclass',methods=['get','post'])
def staff_addclass():
	data={}
	if 'es' in request.form:
		classs=request.form['classs']
		date=request.form['date']
		
		q="insert into coupons values(null,'0','%s','%s','pending','0')"%(classs,date)
		res=insert(q)
		return redirect(url_for('staff.staff_addclass'))
	if 'action' in request.args:
		action=request.args['action']
		eid=request.args['eid']
	else:
		action=None
	if action=='update':
		q="select * from coupons where coupons_id='%s'"%(eid)
		data['up']=select(q)
		if'update' in request.form:
			classs=request.form['classs']
			date=request.form['date']
			
			
			q="update coupons set coupons='%s',details='%s' where coupons_id='%s'"%(classs,date,eid)
			update(q)
			
			return redirect(url_for('staff.staff_addclass'))

	if action=='delete':
		q="delete from coupons where coupons_id='%s'"%(eid)
		delete(q)
		return redirect(url_for('staff.staff_addclass'))
	
	q="select * from coupons "
	data['view']=select(q)
	return render_template('staff_addclass.html',data=data)

