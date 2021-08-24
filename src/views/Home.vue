<template>
  <div class="container">

      <Header titulo="Welcome to TodoLegal" subtitulo="Por favor haga click en 'Login' para iniciar"/>
      <p>
        <router-link to="/login"><h1 class="mt-4">Login</h1></router-link>
      </p>

  </div>
</template>

<script>
import Header from "@/components/Header.vue";
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
  .tituloLegal {
    color: #1D2469 !important;
  }

  hr {
    position: relative;
    background: #1D2469 !important;
  }

  .cardLegal {
    background-color: #F5F5F5;
    border-top-right-radius: 3rem;
    border-bottom-left-radius: 3rem;
  }
</style>
