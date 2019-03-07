<template>
  <div>
    <Top/>
  </div>
</template>

<script>
// @ is an alias to /src
import Top from "@/components/Top.vue";

export default {
  name: "home",
  components: {
    Top
  },
  mounted() {
    this.$store.dispatch('getSupportedSymbols')
  }
};
</script>
