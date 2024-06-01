from flask import *
from database import *

public=Blueprint('public',__name__)

@public.route('/')
def home():
	return render_template('home.html')

@public.route('/user_register',methods=['post','get'])
def user_register():
	if 'us' in request.form:
		fname=request.form['fname']
		lname=request.form['lname']
		place=request.form['place']
		phn=request.form['phn']
		mail=request.form['mail']
		uname=request.form['uname']
		passw=request.form['passw']
		q="insert into login values(null,'%s','%s','evaluator')"%(uname,passw)
		res=insert(q)
		q1="insert into evaluator values(null,'%s','%s','%s','%s','%s','%s')"%(res,fname,lname,place,phn,mail)
		insert(q1)
		return redirect(url_for('public.login'))
	return render_template('user_register.html')

@public.route('/login',methods=['post','get'])
def login():
	if 'ls' in request.form:
		uname=request.form['uname']
		passw=request.form['passw']
		q="select * from login where username='%s' and password='%s'"%(uname,passw)
		val=select(q)
		if val:
			session['lid']=val[0]['login_id']

			if val[0]['usertype']=='evaluator':
				r="select * from evaluator where login_id='%s'"%(session['lid'])
				res=select(r)
				if res:
					session['evaluator_id']=res[0]['evaluator_id']
				return redirect(url_for('staff.staff_home'))

			elif val[0]['usertype']=='staff':
				r="select * from staff where login_id='%s'"%(session['lid'])
				res=select(r)
				if res:
					session['staff_id']=res[0]['staff_id']
				return redirect(url_for('staff.staff_home'))

			elif val[0]['usertype']=='admin':
				return redirect(url_for('admin.admin_home'))

			elif val[0]['usertype']=='user':
				print("user")
				r="select * from user where login_id='%s'"%(session['lid'])
				res=select(r)
				if res:
					session['uid']=res[0]['user_id']
				return redirect(url_for('user.user_home'))
	return render_template('login.html')