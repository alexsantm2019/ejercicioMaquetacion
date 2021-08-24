<template>
  <div class="container-fluid mb-3">
    <img alt="Vue logo" src="../assets/todolegal.png" />
    <h2 class="tituloLegal">{{titulo}}</h2>
    <hr class="tituloLegal" style="width:75%;  height:3px !important;">
    <span>{{subtitulo}}</span><br>
    <span>{{subtituloAlterno}}</span>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    props: ["titulo", "subtitulo", "subtituloAlterno"],
    data() {
      return {}
    },

    methods: {

    },

    mounted() {

    }
  }
</script>

