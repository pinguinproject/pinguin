package com.example.pinguin;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        BottomNavigationView bottomNav = findViewById(R.id.bottom_nav);
        bottomNav.setOnNavigationItemSelectedListener(navListener);
    }

            private BottomNavigationView.OnNavigationItemSelectedListener navListener =
                    new BottomNavigationView.OnNavigationItemSelectedListener() {
                        @Override
                        public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
                            Fragment selectedFragment = null;
                            switch (menuItem.getItemId()) {
                                case R.id.nav_newsthread:
                                    selectedFragment = new NewsthreadFragment();
                                    break;

                                case R.id.nav_profile:
                                    selectedFragment = new profileFragment();
                                    break;

                                case R.id.nav_addevent:
                                    selectedFragment = new CreateEventFragment();
                                    break;
                            }
                            getSupportFragmentManager().beginTransaction().replace(R.id.scrollview,
                                    selectedFragment).commit();

                            return true;
                        }
                    };
}
