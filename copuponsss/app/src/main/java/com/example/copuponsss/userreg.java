package com.example.copuponsss;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONObject;

public class userreg extends AppCompatActivity  implements JsonResponse {

    EditText e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12;
    Button b1;
    String fname,lname,Dateofpurchase,place,servicedate,pincode,phone,email,username,password,longitude,vehicle,vehicledetails;
    private int mYear, mMonth, mDay, mHour, mMinute;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_userreg);

        e1=(EditText) findViewById(R.id.fname);
        e2=(EditText) findViewById(R.id.lname);
        e3=(EditText) findViewById(R.id.place);
        e4=(EditText) findViewById(R.id.phone);

        e5=(EditText) findViewById(R.id.email);
        e6=(EditText) findViewById(R.id.uname);
        e7=(EditText) findViewById(R.id.password);



        b1=(Button) findViewById(R.id.userregistration);

//        final Calendar calendar=Calendar.getInstance() ;
//        final int year = calendar.get(calendar.YEAR);
//        final int month =calendar.get(calendar.MONTH);
//        final  int day =calendar.get(calendar.DAY_OF_MONTH);


        b1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                fname=e1.getText().toString();
                lname=e2.getText().toString();
                place=e3.getText().toString();
                phone=e4.getText().toString();
                email=e5.getText().toString();
                username=e6.getText().toString();
                password=e7.getText().toString();




                if(fname.equalsIgnoreCase("")|| !fname.matches("[a-zA-Z ]+"))
                {
                    e1.setError("Enter your firstname");
                    e1.setFocusable(true);
                }
                else if(lname.equalsIgnoreCase("")|| !lname.matches("[a-zA-Z ]+"))
                {
                    e2.setError("Enter your lastname");
                    e2.setFocusable(true);
                }





                else if(place.equalsIgnoreCase("")|| !place.matches("[a-zA-Z ]+"))
                {
                    e3.setError("Enter your place");
                    e3.setFocusable(true);
                }


                else if(phone.equalsIgnoreCase("") || phone.length()!=10)
                {
                    e4.setError("Enter your phone");
                    e4.setFocusable(true);
                }
                else if(email.equalsIgnoreCase("") || !email.matches("[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\\.)+(?:com|in|yahoo)"))
                {
                    e5.setError("Enter your email");
                    e5.setFocusable(true);
                }




                else if(username.equalsIgnoreCase(""))
                {
                    e6.setError("Enter your username");
                    e6.setFocusable(true);
                }
                else if(password.equalsIgnoreCase(""))
                {
                    e7.setError("Enter your password");
                    e7.setFocusable(true);
                }else {


                    JsonReq JR = new JsonReq();
                    JR.json_response = (JsonResponse) userreg.this;
                    String q = "/Userregistration?fname=" + fname + "&lname=" + lname + "&place=" + place + "&phone=" + phone + "&email=" + email + "&username=" + username + "&password=" + password ;
                    q = q.replace(" ", "%20");
                    JR.execute(q);

                }

            }
        });
    }

    @Override
    public void response(JSONObject jo) {
        try {
            String status = jo.getString("status");
            Log.d("pearl", status);


            if (status.equalsIgnoreCase("success")) {
                Toast.makeText(getApplicationContext(), "REGISTRATION SUCCESS", Toast.LENGTH_LONG).show();
                startActivity(new Intent(getApplicationContext(), Login.class));

            } else if (status.equalsIgnoreCase("duplicate")) {
                startActivity(new Intent(getApplicationContext(), userreg.class));
                Toast.makeText(getApplicationContext(), "Username and Password already Exist...", Toast.LENGTH_LONG).show();

            }

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            Toast.makeText(getApplicationContext(), e.toString(), Toast.LENGTH_LONG).show();
        }
    }
    }
