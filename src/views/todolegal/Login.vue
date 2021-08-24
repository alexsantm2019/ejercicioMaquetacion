<template>

  <div class="container">

    <Header titulo="Bienvenido Usuario"
      subtitulo="Por favor ingresa a tu cuenta ingresando tu número de cédula y contraseña."
      subtituloAlterno="Si no tienes una cuenta en TodoLegal, puedes crear una gratis" />

    <div class="row justify-content-center mt-4">
      <div class="col-md-6">
        <div class="card border-0 p-4  cardLegal">

          <form>

            <div class="form-group">
              <div class="input-group mb-2">
                <input type="text" v-model="username" class="form-control form-inline" maxlength=10
                  placeholder="Cédula de identidad" id="exampleInputEmail1" aria-describedby="emailHelp">
                <div class="input-group-prepend">

                  <b-button v-b-popover.bottom="{ variant: 'info',  content: 'Tu cédula debe encontrarse vigente para ingresar al sistema' }" title="Information">
                    <i class="fas fa-info  form-inline"></i>
                  </b-button>

                </div>
              </div>
            </div>

            <div class="form-group">
              <input type="password" v-model="password" class="form-control" maxlength=14 placeholder="Contraseña"
                id="exampleInputPassword1">
            </div>
            <router-link to="/register">
              <h6 class="tituloLegal">No tengo cuenta, crear una GRATIS</h6>
            </router-link>
            <button @click.prevent="login()" :disabled="!checkForm()"
              :class="checkForm() ? 'btn-primary' : 'btn-light' " class="btn  mt-2 float-right">
              Continuar <i class="far fa-arrow-alt-circle-right"></i>
            </button>

          </form>

          <div class="alert alert-danger mt-3" v-if="error">
            <span>{{error}}</span>
            <button @click.prevent="clear()" class="text-center btn btn-outline-primary border-0">
              Limpiar
            </button>
          </div>

        </div>
      </div>

    </div>

  </div>

</template>

<script>
  import AuthServices from "../../services/auth/authServices.js";
  import Header from "@/components/Header.vue";

  export default {
    name: 'Form',
    components: {
      Header
    },

    data() {
      return {
        username: "",
        password: "",
        error: "",
        textPopover: "Tu cédula debe encontrarse vigente para ingresar al sistema"
      }
    },

    methods: {
      clear() {
        this.username = "";
        this.password = "";
        this.error = "";
      },

      login() {
        var ultimoCaracter = '2'
        var data = {
          username: this.username + '-' + ultimoCaracter,
          password: this.password,
        };
        AuthServices.login(data)
          .then((response) => {
            var respuesta = response.status;
            var cedula = response.data.username;
            // var nombre = response.data.name;
            // var apellido = response.data.lastname;
            var nombre = response.data.name + ' ' +response.data.lastname;
            if (respuesta == 200) {
              this.$router.push({
                name: 'Success',
                params: {
                  cedula: cedula,
                  nombre: nombre
                }
              });
            } else {
              this.error = response.data;
            }
          })
          .catch((error) => {
            var errorResponse = error.response.status;
            if (errorResponse == 404) {
              this.error = "Login incorrecto. Por favor revise cédula y contraseña e intente de nuevo";
            }
          });

      },
      checkForm() {
        if (Boolean(this.username) && Boolean(this.password)) {
          return true;
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