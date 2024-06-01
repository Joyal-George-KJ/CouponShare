package com.example.copuponsss;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

public class view_othercoupons extends AppCompatActivity implements JsonResponse, AdapterView.OnItemClickListener {
    EditText e1,e2,e3,e4;
    Button b1;
    ListView l1;
    SharedPreferences sh;
    String weeks,fdates,stimes,etimes;
    String[] act,week,etime,stime,date,value,cid;
    public  static  String cuid;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_othercoupons);

        l1=(ListView)findViewById(R.id.list);
        l1.setOnItemClickListener(this);
        sh= PreferenceManager.getDefaultSharedPreferences(getApplicationContext());



        JsonReq JR = new JsonReq();
        JR.json_response = (JsonResponse) view_othercoupons.this;
        String q = "/view_othercoupons?login_id="+ sh.getString("login_id", "")+"&cid="+Addmycoupons.cids;
        q = q.replace(" ", "%20");
        JR.execute(q);



    }

    @Override
    public void response(JSONObject jo) {
        try {

            String status = jo.getString("status");
            Log.d("pearl", status);


            if (status.equalsIgnoreCase("success")) {
                JSONArray ja1 = (JSONArray) jo.getJSONArray("data");


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
                ArrayAdapter<String> ar = new ArrayAdapter<String>(getApplicationContext(), R.layout.custtext, value);

                l1.setAdapter(ar);



            }
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            Toast.makeText(getApplicationContext(), "no notification", Toast.LENGTH_LONG).show();

        }
    }

    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
        cuid=cid[i];
        final CharSequence[] items = {"Send Request","cancel"};

        AlertDialog.Builder builder = new AlertDialog.Builder(view_othercoupons.this);
        builder.setItems(items, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int item) {
                if (items[item].equals("Send Request")) {

                    JsonReq JR = new JsonReq();
                    JR.json_response = (JsonResponse) view_othercoupons.this;
                    String q = "/sendrequest?log_id=" +sh.getString("login_id", "")+"&cid="+cuid;
                    q = q.replace(" ", "%20");
                    JR.execute(q);


                }

                else if (items[item].equals("cancel")) {



                }
            }

        });
        builder.show();
    }
}
