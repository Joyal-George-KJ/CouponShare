package com.example.copuponsss;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.FileProvider;

import android.app.DatePickerDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Calendar;

public class Addmycoupons extends AppCompatActivity implements JsonResponse, AdapterView.OnItemClickListener {

    EditText e1,e2,e3,e4;
    Button b1;
    ListView l1;
    SharedPreferences sh;
    String weeks,fdates,stimes,etimes;
    String[] act,week,etime,stime,date,value,cid;
    public  static  String cids;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_addmycoupons);

        l1=(ListView)findViewById(R.id.list);

                l1.setOnItemClickListener(this);
        sh= PreferenceManager.getDefaultSharedPreferences(getApplicationContext());


        e2=(EditText) findViewById(R.id.week);

        e1=(EditText) findViewById(R.id.stime);





        b1=(Button) findViewById(R.id.add);


        JsonReq JR = new JsonReq();
        JR.json_response = (JsonResponse) Addmycoupons.this;
        String q = "/Viewmycoupons?login_id="+ sh.getString("login_id", "");
        q = q.replace(" ", "%20");
        JR.execute(q);


        b1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                weeks=e1.getText().toString();

                stimes=e2.getText().toString();



                JsonReq JR = new JsonReq();
                JR.json_response = (JsonResponse) Addmycoupons.this;
                String q = "/Addmycoupons?login_id="+ sh.getString("login_id", "") +"&stime=" + stimes+"&week="+weeks;
                q = q.replace(" ", "%20");
                JR.execute(q);
            }
        });
    }

    @Override
    public void response(JSONObject jo) {

        try {

            String method=jo.getString("method");
            if(method.equalsIgnoreCase("Addmycoupons")) {

                String status = jo.getString("status");
                Log.d("pearl", status);


                if (status.equalsIgnoreCase("success")) {
                    Toast.makeText(getApplicationContext(), "ADDED SUCCESSFULLY", Toast.LENGTH_LONG).show();
                    startActivity(new Intent(getApplicationContext(), Addmycoupons.class));

                } else {

                    Toast.makeText(getApplicationContext(), " failed.TRY AGAIN!!", Toast.LENGTH_LONG).show();
                }
            }
            else if(method.equalsIgnoreCase("Viewmycoupons"))
            {
                String status=jo.getString("status");
                Log.d("pearl",status);


                if(status.equalsIgnoreCase("success")){
                    JSONArray ja1=(JSONArray)jo.getJSONArray("data");


                    week=new String[ja1.length()];
                    date=new String[ja1.length()];
                    stime=new String[ja1.length()];
                    etime=new String[ja1.length()];
                    cid=new String[ja1.length()];

                    value=new String[ja1.length()];


                    for(int i = 0;i<ja1.length();i++)
                    {
                        week[i]=ja1.getJSONObject(i).getString("coupons");
                        date[i]=ja1.getJSONObject(i).getString("details");
                        stime[i]=ja1.getJSONObject(i).getString("date");
                        etime[i]=ja1.getJSONObject(i).getString("status");
                        cid[i]=ja1.getJSONObject(i).getString("coupons_id");




                        value[i]="coupons: "+week[i]+"\ndetails: "+date[i]+"\ndate : "+stime[i]+"\nstatus: "+etime[i];

                    }
                    ArrayAdapter<String> ar=new ArrayAdapter<String>(getApplicationContext(),R.layout.custtext,value);
                    l1.setAdapter(ar);
                }
            }

        }

        catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            Toast.makeText(getApplicationContext(), "no events", Toast.LENGTH_LONG).show();

        }
    }

    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {

        cids=cid[i];
        final CharSequence[] items = {"Coupons request","Cancel"};

        AlertDialog.Builder builder = new AlertDialog.Builder(Addmycoupons.this);
        builder.setItems(items, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int item) {
                if (items[item].equals("Coupons request")) {

                    startActivity(new Intent(getApplicationContext(),viewmycompreq.class));






                }

                else if (items[item].equals("Cancel")) {




                }
            }

        });
        builder.show();
    }
    }
