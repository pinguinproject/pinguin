package com.example.sovandara.create_event;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;


import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import static com.example.sovandara.create_event.R.layout.creation;

/**
 * Created by Sovandara on 18/02/2019.
 */

public class Event extends AppCompatActivity {

    private TextView mDate;
    private DatePickerDialog.OnDateSetListener mDateListener;

    private String string1 = "Basketball";
    private String string2 = "Dancing";
    private String string3 = "Swimming";

    private String nest;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(creation);

        // For the date
        mDate = (TextView) findViewById(R.id.txtDate);
        mDate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick (View view) {
                Calendar cal = Calendar.getInstance();
                int year = cal.get(Calendar.YEAR);
                int month = cal.get(Calendar.MONTH);
                int day = cal.get(Calendar.DAY_OF_MONTH);

                DatePickerDialog dialog = new DatePickerDialog(Event.this, mDateListener, year, month, day);
                dialog.show();

            }
        });

        mDateListener = new DatePickerDialog.OnDateSetListener() {
            @Override
            public void onDateSet(DatePicker datePicket, int year, int month, int day) {
                month = month + 1;
                Log.d("Event","onDateSet: mm/dd/yyyy: " + month + "/" + day + "/" + year);

                String date = month + "/" + day + "/" + year;
                mDate.setText(date);
            }
        };
        // End date

        // Spinner
        Spinner spinner = (Spinner) findViewById(R.id.spinner);
        List<String> spinnerArray = new ArrayList<>();
        spinnerArray.add(0, "Select Nest");
        spinnerArray.add(string1);
        spinnerArray.add(string2);
        spinnerArray.add(string3);

        ArrayAdapter<String> table = new ArrayAdapter<>(this,android.R.layout.simple_list_item_1,spinnerArray);
        table.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(table);

        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                if(parent.getItemAtPosition(position).equals("Select Nest")){
                    // Do nothing
                }
                else {
                    nest = parent.getItemAtPosition(position).toString();
                    Toast.makeText(parent.getContext(), "Selected: " + nest, Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
                //TODO Auto-generated method stub
            }
        });
        // End spinner
    }

    public void send (View view) {
        // Transfer data | no need when database
        EditText edText = (EditText) findViewById(R.id.editTitle);
        TextView tvDate = (TextView) findViewById(R.id.txtDate);
        EditText edCity = (EditText) findViewById(R.id.editCity);
        EditText edAddress = (EditText) findViewById(R.id.editAddress);
        EditText edBegin = (EditText) findViewById(R.id.editBegin);
        EditText edEnd = (EditText) findViewById(R.id.editEnd);

        String title = edText.getText().toString();
        String date = tvDate.getText().toString();
        String city = edCity.getText().toString();
        String address = edAddress.getText().toString();
        String begin = edBegin.getText().toString();
        String end = edEnd.getText().toString();

        Intent intent = new Intent(Event.this, Display.class);
        Bundle bundle = new Bundle();
        bundle.putString("title",title);
        bundle.putString("date",date);
        bundle.putString("nest",nest);
        bundle.putString("city",city);
        bundle.putString("address",address);
        bundle.putString("begin",begin);
        bundle.putString("end",end);
        intent.putExtras(bundle);
        startActivity(intent);
        // End Transfer

    }


}