<template>
  <div>
    <div class="container">
      <div v-show="!this.$store.getters.stocks_loaded">
        <h1>Loading...</h1>
      </div>
      <div class="row" v-show="this.$store.getters.stocks_loaded">
        <h1>
          Compare tweets from
          <input id="topic" v-model="topic" placeholder="eg. @elonmusk">
          with the stock price for
          <input
            id="topic"
            v-model="stock"
            :placeholder="stock_placeholder"
            :disabled="!this.$store.getters.stocks_loaded"
          >
        </h1>
      </div>
      <transition name="fade">
        <div v-show="this.$store.getters.submit_ready" class="submit row" @click="submit">
          <h1>Compare</h1>
        </div>
      </transition>
      <div>
        <div class="" v-show="this.$store.getters.stocks_loaded">
          <p class="random-button" @click="show_options = true">List compatible stock symbols</p>
          <ul v-show="show_options">
            <li v-for="i in companies">
              <p>Company Name: {{i.name}}</p>
              <p>Stock Symbol: {{i.symbol}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Top",
  data: () => {
    return {
      topic: "",
      stock: "",
      show_options: false
    };
  },
  computed: {
    stock_placeholder: function() {
      if (this.$store.getters.stocks_loaded) {
        return "eg. TSLA";
      } else {
        return "fetching available stocks";
      }
    },
    companies: function() {
      return this.$store.state.all_company_info;
    }
  },
  watch: {
    topic: function(newTopic, oldTopic) {
      this.$store.commit("setTopic", newTopic);
    },
    stock: function(newStock, oldStock) {
      let upper_case = newStock.toUpperCase();
      this.$store.commit("setStock", upper_case);
    }
  },
  methods: {
    submit() {
      this.$router.push("/about");
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

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

.submit {
  margin-top: 20px;
  transition: 0.5s;
  color: #0ab248;
  text-align: center;
  width: 60%;
  padding: 2px;
  background-color: white;
  border-radius: 5px;
  border: 0.5px solid #0ab248;
}
.submit:hover {
  transition-timing-function: ease-in-out;
  transition: 0.5s;
  cursor: pointer;
  color: white;
  background-color: #0ab248;
}

.random-button {
  text-decoration: underline;
  color: blue;
}

.random-button:hover {
  cursor: pointer;
  color: #0ab248;
}

#topic {
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  font: 1em/1.25em sans-serif;
  text-align: center;
}
</style>
