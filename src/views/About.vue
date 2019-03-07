<template>
  <div>
    <Graph/>
    <br>
    <LineChart
      v-if="this.$store.state.stock_prices.length > 0 && this.$store.state.tweets.length > 0"
    />
  </div>
</template>

<script>
import Graph from "@/components/Graph.vue";
import LineChart from "@/components/Line.vue";
export default {
  name: "home",
  components: {
    Graph,
    LineChart
  }
};
</script>

