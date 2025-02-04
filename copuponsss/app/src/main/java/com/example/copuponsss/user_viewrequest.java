package com.example.copuponsss;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

public class user_viewrequest extends AppCompatActivity implements JsonResponse, AdapterView.OnItemClickListener {
    ListView l1;
    SharedPreferences sh;
    String[] date,statu,rejectnotification,images,value,notification_id,crid,cids;
    public static String cid,cou,stat;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_viewrequest);

        l1=(ListView) findViewById(R.id.list);
        l1.setOnItemClickListener(this);
        sh= PreferenceManager.getDefaultSharedPreferences(getApplicationContext());


        JsonReq JR = new JsonReq();
        JR.json_response = (JsonResponse) user_viewrequest.this;
        String q = "/viewrequest?log_id=" +sh.getString("login_id", "");
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


                date = new String[ja1.length()];
                statu = new String[ja1.length()];
                rejectnotification = new String[ja1.length()];

                images = new String[ja1.length()];
                notification_id= new String[ja1.length()];
                crid= new String[ja1.length()];
                cids=new String[ja1.length()];



                value = new String[ja1.length()];


                for (int i = 0; i < ja1.length(); i++) {
                    date[i] = ja1.getJSONObject(i).getString("date");
                    statu[i] = ja1.getJSONObject(i).getString("status");

                    rejectnotification[i] = ja1.getJSONObject(i).getString("fname");
                    images[i] = ja1.getJSONObject(i).getString("coupons");
                    crid[i] = ja1.getJSONObject(i).getString("crequest_id");
                    cids[i]=ja1.getJSONObject(i).getString("coupons_id");








                    value[i] = "date:" + date[i] + "\n status: " + statu[i] + "\n username: " + rejectnotification[i]+ "\n coupons: " + images[i]   ;

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
        cid=crid[i];
        cou=cids[i];
        final CharSequence[] items = {"Add fake complaints","ratings"};

        AlertDialog.Builder builder = new AlertDialog.Builder(user_viewrequest.this);
        builder.setItems(items, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int item) {
                if (items[item].equals("Add fake complaints")) {

                   startActivity(new Intent( getApplicationContext(),Addanyfakecomplaint.class));

                }

                else if (items[item].equals("ratings")) {


                    startActivity(new Intent( getApplicationContext(),addrating.class));
                }
            }

        });
        builder.show();
    }
    }
