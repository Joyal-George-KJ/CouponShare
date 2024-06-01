package com.example.copuponsss;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class Ipsettings extends AppCompatActivity {

    EditText e1;
    Button b1;

    public static String ip;

    SharedPreferences sh;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ipsettings);

        sh= PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
        e1=(EditText)findViewById(R.id.ipaddress);
        b1=(Button) findViewById(R.id.ipbutton);
        e1.setText(sh.getString("ip","192.168."));
        b1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                ip=e1.getText().toString();
                SharedPreferences.Editor e=sh.edit();
                e.putString("ip",ip);
                e.commit();
                startActivity(new Intent(getApplicationContext(),Login.class));

            }
        });
    }
//    public void onBackPressed()
//    {
//        // TODO Auto-generated method stub
//        new AlertDialog.Builder(this).setIcon(R.drawable.logo)
//                .setTitle("Exit  :")
//                .setMessage("Are you sure you want to exit..?")
//                .setPositiveButton("Yes",new DialogInterface.OnClickListener()
//                {
//
//                    @Override
//                    public void onClick(DialogInterface arg0, int arg1)
//                    {
//                        // TODO Auto-generated method stub
//                        Intent i=new Intent(Intent.ACTION_MAIN);
//                        i.addCategory(Intent.CATEGORY_HOME);
//                        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//                        startActivity(i);
//                        finish();
//                    }
//                }).setNegativeButton("No",null).show();
//
//    }
    }
