package com.example.copuponsss;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

public class userhome extends AppCompatActivity {

    ImageView b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,b11,b12,b13,b14;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_userhome);

        b1=(ImageView) findViewById(R.id.viewclass);
        b2=(ImageView) findViewById(R.id.viewevent);
//        b3=(ImageView) findViewById(R.id.viewbookings);
//        b4=(ImageView) findViewById(R.id.searchnearbunk);
//        b5=(ImageView) findViewById(R.id.Viewrechargerequests);
//        b6=(ImageView) findViewById(R.id.searchmechanic);
//        b7=(ImageView) findViewById(R.id.viewrequest);
//        b8=(ImageView) findViewById(R.id.searchspareparts);
//        b9=(ImageView) findViewById(R.id.viewordereditems);
        b10=(ImageView) findViewById(R.id.sendcomplaints);
        b11=(ImageView) findViewById(R.id.logout);
//        b12=(ImageView) findViewById(R.id.viewmyordered);
//        b13=(ImageView) findViewById(R.id.addblog);
        b14=(ImageView) findViewById(R.id.viewblog);

//        b13.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                startActivity(new Intent(getApplicationContext(),blog.class));
//            }
//        });
        b14.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(getApplicationContext(),user_viewrequest.class));
            }
        });

        b1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(getApplicationContext(),Addmycoupons.class));
            }
        });
//        b12.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                startActivity(new Intent(getApplicationContext(),Viewmyorders.class));
//            }
//        });
//
        b2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(getApplicationContext(),view_othercoupons.class));
            }
        });
//
//        b3.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                startActivity(new Intent(getApplicationContext(),UserViewbookings.class));
//            }
//        });
//        b4.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                startActivity(new Intent(getApplicationContext(),UserSearchnearbunk.class));
//            }
//        });
//
//        b5.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                startActivity(new Intent(getApplicationContext(),UserViewrechargerequests.class));
//            }
//        });
//
//        b6.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                startActivity(new Intent(getApplicationContext(),UserSearchmechanic.class));
//            }
//        });
//
//        b7.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                startActivity(new Intent(getApplicationContext(),UserViewrequest.class));
//            }
//        });
//
//        b8.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                startActivity(new Intent(getApplicationContext(),UserSearchspareparts.class));
//            }
//        });
//        b9.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                startActivity(new Intent(getApplicationContext(),UserViewordereditems.class));
//            }
//        });
        b10.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(getApplicationContext(),UserSendcomplaint.class));
            }
        });
        b11.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(getApplicationContext(),Login.class));
            }
        });
    }
    }
