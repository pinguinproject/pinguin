package com.example.sovandara.create_event;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

import org.w3c.dom.Text;

/**
 * Created by Sovandara on 19/02/2019.
 */

public class Display extends AppCompatActivity {
    @Override
    protected void onCreate (Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.display);

        Intent intent = getIntent();
        if(intent == null) {
            // code pour exit
        }
        Bundle bundle = getIntent().getExtras();

        String title = bundle.getString("title");
        String date = bundle.getString("date");
        String nest = bundle.getString("nest");
        String city = bundle.getString("city");
        String address = bundle.getString("address");
        String begin = bundle.getString("begin");
        String end = bundle.getString("end");

        TextView txtTitle = (TextView) findViewById(R.id.txtdsTitle);
        TextView txtDate = (TextView) findViewById(R.id.txtdsDate);
        TextView txtNest = (TextView) findViewById(R.id.txtdsNest);
        TextView txtCity = (TextView) findViewById(R.id.txtdsCity);
        TextView txtAddress = (TextView) findViewById(R.id.txtdsAddress);
        TextView txtBegin = (TextView) findViewById(R.id.txtdsBegin);
        TextView txtEnd = (TextView) findViewById(R.id.txtdsEnd);

        txtTitle.setText(title);
        txtDate.setText(date);
        txtNest.setText(nest);
        txtCity.setText(city);
        txtAddress.setText(address);
        txtBegin.setText(begin);
        txtEnd.setText(end);

    }
}
