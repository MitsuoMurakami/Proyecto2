package com.example.finance;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class PERFIL extends AppCompatActivity {

    private TextView textViewUsername;
    private TextView textViewEmail;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);

        Button button1 = findViewById(R.id.button1);
        textViewUsername = findViewById(R.id.textView3);
        textViewEmail = findViewById(R.id.textView5);

        SharedPreferences preferences = getSharedPreferences("com.example.finance", MODE_PRIVATE);
        int id = 0;
        id = getIntent().getIntExtra("id", id);

        //Toast.makeText(PERFIL.this, id, Toast.LENGTH_LONG).show();

        String url = "https://josebojorquez.pythonanywhere.com/users/" + id;
        RequestQueue requestQueue = Volley.newRequestQueue(PERFIL.this);
        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONObject jsonResponse = new JSONObject(response);
                            String username = jsonResponse.getString("username"); // Establecer el nombre de usuario en el TextView
                            String email = jsonResponse.getString("email");
                            textViewUsername.setText(username);
                            textViewEmail.setText(email);
                        } catch (JSONException e) {
                            e.printStackTrace();
                            throw new RuntimeException(e);
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        textViewUsername.setText("Not found");
                    }
                });
        requestQueue.add(stringRequest);

        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {


                Intent i = new Intent(PERFIL.this, LOGIN.class);
                startActivity(i);
            }
        });
    }
}
