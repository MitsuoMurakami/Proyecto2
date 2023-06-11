import logo from './logo.svg';
// import './login-register.css';

function Register() {
  return (
    <div>
      <body>
        <div class="wrapper">
          <form>
            <div class="form-outline">
              <label class="form-label" for="form1">Usuario:</label>
              <br></br><br></br>
              <input type="name" id="form1" class="form-control" />
            </div>
            <br></br><br></br>
            <div class="form-outline">
              <label class="form-label" for="form2">Correo Electrónico:</label>
              <br></br><br></br>
              <input type="email" id="form2" class="form-control" />
            </div>
            <br></br><br></br>
            <div class="form-outline">
              <label class="form-label" for="form3">Contraseña:</label>
              <br></br><br></br>
              <input type="password" id="form3" class="form-control" />
            </div>
            <br></br><br></br>
            <div class="form-outline">
              <label class="form-label" for="form4">Confirmar contraseña:</label>
              <br></br><br></br>
              <input type="password" id="form4" class="form-control" />
            </div>

            <br></br><br></br>
            <button type="button">Registrar</button>
            
            <br></br><br></br>
            <div class="text-center">
              <p>¿Ya estás registrado? <a href="/login">Ingresa aquí</a></p>
            </div>
          </form>
        </div>
      </body>
    </div> 
  );
}

export default Register;