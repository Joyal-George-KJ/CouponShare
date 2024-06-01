package com.example.copuponsss;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

public class Addanyfakecomplaint extends AppCompatActivity implements JsonResponse {
    EditText e1,e2,e3,e4;
    Button b1;
    ListView l1;
    SharedPreferences sh;
    String weeks,fdates,stimes,etimes;
    String[] act,week,etime,stime,date,value;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_addanyfakecomplaint);

        l1=(ListView)findViewById(R.id.list);
        sh= PreferenceManager.getDefaultSharedPreferences(getApplicationContext());


        e2=(EditText) findViewById(R.id.week);

        e1=(EditText) findViewById(R.id.stime);





        b1=(Button) findViewById(R.id.add);


        JsonReq JR = new JsonReq();
        JR.json_response = (JsonResponse) Addanyfakecomplaint.this;
        String q = "/Viewfakecomplain?login_id="+ sh.getString("login_id", "")+"&cid="+user_viewrequest.cid;
        q = q.replace(" ", "%20");
        JR.execute(q);


        b1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                weeks=e1.getText().toString();

                stimes=e2.getText().toString();



                JsonReq JR = new JsonReq();
                JR.json_response = (JsonResponse) Addanyfakecomplaint.this;
                String q = "/Addanyfakecomplaint?login_id="+ sh.getString("login_id", "") +"&stime=" + stimes+"&week="+weeks+"&cid="+user_viewrequest.cid;
                q = q.replace(" ", "%20");
                JR.execute(q);
            }
        });
    }

    @Override
    public void response(JSONObject jo) {
        try {

            String method=jo.getString("method");
            if(method.equalsIgnoreCase("Addanyfakecomplaint")) {

                String status = jo.getString("status");
                Log.d("pearl", status);


                if (status.equalsIgnoreCase("success")) {
                    Toast.makeText(getApplicationContext(), "ADDED SUCCESSFULLY", Toast.LENGTH_LONG).show();
                    startActivity(new Intent(getApplicationContext(), Addanyfakecomplaint.class));

                } else {

                    Toast.makeText(getApplicationContext(), " failed.TRY AGAIN!!", Toast.LENGTH_LONG).show();
                }
            }
            else if(method.equalsIgnoreCase("Viewfakecomplain"))
            {
                String status=jo.getString("status");
                Log.d("pearl",status);


                if(status.equalsIgnoreCase("success")){
                    JSONArray ja1=(JSONArray)jo.getJSONArray("data");


                    week=new String[ja1.length()];
                    date=new String[ja1.length()];
                    stime=new String[ja1.length()];
//                    etime=new String[ja1.length()];

                    value=new String[ja1.length()];


                    for(int i = 0;i<ja1.length();i++)
                    {
                        week[i]=ja1.getJSONObject(i).getString("complaint");
                        date[i]=ja1.getJSONObject(i).getString("details");
                        stime[i]=ja1.getJSONObject(i).getString("date");
//                        etime[i]=ja1.getJSONObject(i).getString("status");
//



                        value[i]="complaints: "+week[i]+"\ndetails: "+date[i]+"\ndate : "+stime[i];

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
}