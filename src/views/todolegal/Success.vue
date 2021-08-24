<template>
  <div class="container mt-1">
    <Header titulo="¡Validación exitosa!" />

    <i class="text-success h1 far fa-check-circle"></i>
    <h2 class="tituloLegal">Datos Verificados</h2>

    <div class="row justify-content-center mt-4">
      <div class="col-md-6">
        <div class="card border-0 p-4 cardLegal">

          <p class="text-primary">Nombres y apellidos: </p>
          <p>{{nombre}} </p>

          <p class="text-primary">Cédula de identidad: </p>
          <p>{{cedula}} </p>

        </div>
        <router-link to="/login">
          <h6 class="float-right mt-2">Finalizar <i class="far fa-arrow-alt-circle-right"></i></h6>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
  import Header from "@/components/Header.vue";

  export default {
    name: 'Form',
    components: {
      Header
    },
    data() {
      return {
        cedula: "",
        nombre: "",
      }
    },

    methods: {

    },
    mounted() {

    },
    created() {
      this.cedula = this.$route.params.cedula;
      this.nombre = this.$route.params.nombre;
    },
  }
</script>

<style lang="scss" scoped>

</style>