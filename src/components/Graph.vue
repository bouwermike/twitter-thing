<template>
  <div>
    <div class="container">
      <div class="row">
        <h1>
          Comparing the number of tweets from
          <span class="emphasised">{{this.$store.state.topic}}</span> with the stock price of
          <span
            class="emphasised-rooi"
          >{{this.$store.state.stock_info.companyName}}</span>
        </h1>
        <transition name="fade">
          <h3 class="try-another" @click="tryAnother">Try Another</h3>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Graph",
  data: () => {
    return {};
  },
  methods: {
    tryAnother() {
      this.$router.push('/')
    }
  },
  mounted() {
    this.$store.dispatch("getTweets");
    this.$store.dispatch("getStockPrices");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  margin: 30px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.row {
  justify-content: center;
}

.emphasised {
  color: lightgrey;
  font-style: italic;
}

.emphasised-rooi {
  color: #f3487b;
  font-style: italic;
}

.try-another {
  margin-top: 5px;
  transition: 0.5s;
  color: #0ab248;
  text-align: center;
  width: 60%;
  padding: 2px;
  background-color: white;
  border-radius: 5px;
  border: 0.5px solid #0ab248;
}
.try-another:hover {
  transition-timing-function: ease-in-out;
  transition: 0.5s;
  cursor: pointer;
  color: white;
  background-color: #0ab248;
}
</style>
