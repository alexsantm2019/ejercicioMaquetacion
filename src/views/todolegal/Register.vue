<template>
  <div class="container">
    <Header titulo="Crear cuenta gratis"
      subtitulo="Ingresa los siguientes datos para registrarte como nuevo usuario." />

    <div class="row justify-content-center mt-4 ">
      <div class="col-md-6 ">
        <div class="card border-0  p-4 cardLegal">

          <form>
            <div class="form-group">
              <input type="text" class="form-control" v-model="username" maxlength=10 placeholder="Cédula de identidad"
                id="username" aria-describedby="emailHelp">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" v-model="password" maxlength=14 placeholder="Contraseña"
                id="password">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" v-model="confirmPassword" maxlength=14
                placeholder="Confirmar Contraseña" id="password1">
            </div>

            <router-link to="/login" class="btn btn-light float-left">
              <i class="far fa-chevron-left"></i> Atrás
            </router-link>
            <button @click.prevent="register()" 
              :disabled="!checkForm()"
              :class="checkForm() ? 'btn-primary' : 'btn-light' " class="btn mt-2 float-right mr-1">
              Registrarme <i class="far fa-arrow-alt-circle-right"></i>
            </button>

            <div class="alert alert-success mt-3" v-if="respuestaSuccess">
              {{respuestaSuccess}}
              <router-link to="/login">Login</router-link>
            </div>

            <div class="container-fluid alert alert-danger mt-3" v-if="error">
              <span>{{error}}</span>
              <button @click.prevent="clear()" class="text-center btn btn-outline-primary border-0">
                Limpiar datos
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Header from "@/components/Header.vue";
  import axios from 'axios';
  import AuthServices from "../../services/auth/authServices.js";

  export default {
    name: 'Form',
    components: {
      Header
    },

    data() {
      return {
        username: "",
        password: "",
        confirmPassword: "",
        error: "",
        respuestaSuccess: "",
      }
    },

    methods: {
      clear() {
        this.username = "";
        this.password = "";
        this.confirmPassword = "";
        this.error = "";
      },
      async register() {
        var token = await this.getTokenFromLogin();
        if (token) {
          var ultimoCaracter = '2';
          var data = {
            name: "Alexis",
            last_name: "Muñoz Lopez",
            phone_number: "8091010101",
            email: "xxx.xxx@todolegal.com",
            username: this.username + '-' + ultimoCaracter,
            password: this.password
          };


          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
          AuthServices.user(data)
            .then((response) => {
              var status = response.data.state;
              if (status == 'ACTIVE') {
                this.respuestaSuccess = "Usuario creado correctamente"
              } else {
                this.error = response.data;
              }
            })
            .catch((error) => {
              var errorResponse = error.response.status;
              if (errorResponse == 400) {
                this.error = " Por favor revise cédula y contraseña e intente de nuevo";
              } else {
                this.error = "Datos incorrectos";
              }
            });
        } else {
          this.error = "No existe token";
        }
      },
      async getTokenFromLogin() {
        var ultimoCaracter = '2'
        var token = "";
        var data = {
          username: '1758711124-2',
          password: 'TTes5t20s51**',
        };
        await AuthServices.login(data)
          .then((response) => {
            var respuesta = response.status;
            if (respuesta == 200) {
              token = response.data.access_token;
            }
          })
          .catch((error) => {
            var errorResponse = error.response.status;
            if (errorResponse == 404) {
              this.error = "Login incorrecto. Por favor revise cédula y contraseña e intente de nuevo";
            }
          });
        return token;
      },
      checkForm() {
        if (Boolean(this.username) && Boolean(this.password) && Boolean(this.confirmPassword)) {
          if (this.password === this.confirmPassword) {
            return true;
          }
        } else {
          return false;
        }
      }
    },

    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
</style>