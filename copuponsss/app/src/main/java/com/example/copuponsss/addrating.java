package com.example.copuponsss;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

public class addrating extends AppCompatActivity implements JsonResponse {

    RatingBar ratingbar;
    String rat, status, revtable,stimes,rev;
    TextView e1;
    EditText e2;
    Button B1;
    SharedPreferences sh;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_addrating);

        sh = PreferenceManager.getDefaultSharedPreferences(getApplicationContext());

        ratingbar = (RatingBar) findViewById(R.id.rating);
        e1 = (TextView) findViewById(R.id.ratingText);

        B1=(Button) findViewById(R.id.rate);
        ratingbar.setOnRatingBarChangeListener(new RatingBar.OnRatingBarChangeListener() {
            @Override
            public void onRatingChanged(RatingBar ratingBar, float rating, boolean b) {

                e1.setText("Your Rating :\t" + rating);
                rat = rating+"";

                e2=(EditText) findViewById(R.id.stime);


            }
        });


        B1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                e1.setText("Your Rating :\t" + rat);

                stimes=e2.getText().toString();



                JsonReq JR = new JsonReq();
                JR.json_response = (JsonResponse) addrating.this;
                String q = "/rateings?rating=" + rat + "&log_id=" + sh.getString("login_id", "")+"&review="+stimes +"&cid="+user_viewrequest.cid ;
                q = q.replace(" ", "%20");
                JR.execute(q);
            }
        });
    }

    @Override
    public void response(JSONObject jo) {
        try {
            String method = jo.getString("method");
            Log.d("pearl", method);

            if (method.equalsIgnoreCase("rate")) {
                status = jo.getString("status");
                if (status.equalsIgnoreCase("success")) {
                    Toast.makeText(getApplicationContext(), "thanks for the review", Toast.LENGTH_SHORT).show();
                    startActivity(new Intent(getApplicationContext(), userhome.class));
                }
            }

            else if (method.equalsIgnoreCase("rate")) {
                status = jo.getString("status");
                Log.d("pearl", status);

                if (status.equalsIgnoreCase("okey")) {
//                    JSONArray ja1 = (JSONArray) jo.getJSONArray("data");
                    revtable = jo.getString("data");;


                    if (revtable.equalsIgnoreCase("1.0")) {
                        ratingbar.setRating(1);
                    } else if (revtable.equalsIgnoreCase("2.0")) {
                        ratingbar.setRating(2);
                    } else if (revtable.equalsIgnoreCase("3.0")) {
                        ratingbar.setRating(3);
                    } else if (revtable.equalsIgnoreCase("4.0")) {
                        ratingbar.setRating(4);
                    } else if (revtable.equalsIgnoreCase("5.0")) {
                        ratingbar.setRating(5);

                    }

                }


            }

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
    }

