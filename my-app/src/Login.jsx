import logo from './logo.svg';
// import './login-register.css';

function Login() {
  return (
    <div>
      <body>
        <div class="wrapper">
          <form>
            <div>
              <label class="form-label" for="form1">Usuario o Correo Electrónico:</label>
              <br></br><br></br>
              <input type="email" id="form1" class="form-control" />
            </div>
            <br></br><br></br>
            <div>
              <label class="form-label" for="form2">Contraseña:</label>
              <br></br><br></br>
              <input type="password" id="form2" class="form-control" />
            </div>

            <br></br><br></br>
            <button type="button">Ingresar</button>
            
            <br></br><br></br>
            <div class="text-center">
              <p>¿No estás registrado? <a href="/register">Regístrate aquí</a></p>
            </div>
          </form>
        </div>
      </body>
    </div> 
  );
}

export default Login;