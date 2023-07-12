package com.example.finance;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class LOGIN extends AppCompatActivity {

    // Referencias a los campos de texto
    private EditText etEmail;
    private EditText etPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Obtén las referencias a los campos de texto
        etEmail = findViewById(R.id.emailEditText); // Asegúrate de cambiar el ID de tu EditText a "emailEditText" o el que corresponda
        etPassword = findViewById(R.id.contraseñaEditText);
    }

    public void onIniciarSesionClick(View view) {
        // Obtén el email y la contraseña ingresados
        String email = etEmail.getText().toString();
        String password = etPassword.getText().toString();

        // URL de tu API
        String url = "https://josebojorquez.pythonanywhere.com/login";

        // Crear nueva cola de solicitudes
        RequestQueue queue = Volley.newRequestQueue(this);

        // Nuevo objeto JSON para contener los parámetros de la solicitud
        JSONObject jsonParams = new JSONObject();
        try {
            jsonParams.put("email", email);
            jsonParams.put("password", password);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        // Crear la solicitud POST
        JsonObjectRequest postRequest = new JsonObjectRequest(Request.Method.POST, url, jsonParams,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        // La respuesta de la API
                        try {
                            //Toast.makeText(LOGIN.this, response.getString("response"), Toast.LENGTH_LONG).show();
                            //Toast.makeText(LOGIN.this, response.getString("response"), Toast.LENGTH_LONG).show();
                            if (response.getString("response").equals("SUCCESS")) {
                                // Iniciar sesión exitosa, cambia a la actividad de perfil

                                int id = Integer.valueOf(response.getString("id"));
                                //Toast.makeText(LOGIN.this, id, Toast.LENGTH_LONG).show();
                                String url = "https://josebojorquez.pythonanywhere.com/users/" + id;
                                Button btn = findViewById(R.id.button2);
                                btn.setOnClickListener(new View.OnClickListener() {
                                    @Override
                                    public void onClick(View v) {
                                        //SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(LOGIN.this);
                                        //SharedPreferences.Editor editor = preferences.edit();
                                        //editor.putInt("id", id);
                                        //editor.apply();

                                        //Toast.makeText(LOGIN.this, id, Toast.LENGTH_LONG).show();

                                        Intent intent = new Intent(LOGIN.this, PERFIL.class);
                                        intent.putExtra("id", id);
                                        startActivity(intent);
                                    }
                                });
                            } else {
                                // Iniciar sesión fallida, muestra un mensaje al usuario
                                Toast.makeText(getApplicationContext(), "Inicio de sesión fallido.", Toast.LENGTH_SHORT).show();
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        // Error de conexión o de la API, muestra un mensaje al usuario
                        Toast.makeText(getApplicationContext(), "Error: " + error.toString(), Toast.LENGTH_SHORT).show();
                    }
                }
        );

        // Añadir la solicitud a la cola
        queue.add(postRequest);
    }
}
