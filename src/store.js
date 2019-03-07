import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import getTime from 'date-fns/get_time'
import isSameDay from 'date-fns/is_same_day'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topic: '',
    stock: '',
    supported_symbols: [],
    tweets: [],
    stock_prices: [],
    stock_info: '',
    all_company_info: []
  },
  getters: {
    stocks_loaded: state => {
      if (state.supported_symbols.length > 0) {
        return true
      } else {
        return false
      }
    },
    stock_approved: state => {
      return state.supported_symbols.includes(state.stock)
    },
    submit_ready: (state, getters) => {
      if (state.topic.length > 0 && state.stock.length > 0 && getters.stock_approved) {
        return true
      } else {
        return false
      }
    },
    closePriceDataset: state => {
      return state.stock_prices.map(e => e.close)
    },
    closeDateDataset: state => {
      return state.stock_prices.map(e => getTime(e.date))
    },
    combinedStockDataSet: (state, getters) => {
      return state.stock_prices.map(e => {
        return {
          t: getTime(e.date),
          y: e.close
        }
      })
    }
  },
  mutations: {
    setTopic: (state, payload) => {
      state.topic = payload
    },
    setStock: (state, payload) => {
      state.stock = payload
    },
    setSupportedSymbols: (state, payload) => {
      state.supported_symbols = payload
    },
    setTweets: (state, payload) => {
      state.tweets = payload
    },
    setStockPrices: (state, payload) => {
      state.stock_prices = payload
    },
    setStockInfo: (state, payload) => {
      state.stock_info = payload
    },
    setAllCompanyInfo: (state, payload) => {
      state.all_company_info = payload
    },
    clearState: (state, payload) => {
      state.topic = ''
      state.stock = ''
      state.supported_symbols = []
      state.stock_prices = []
      state.tweets = []
      state.stock_info = []
    }
  },
  actions: {
    getSupportedSymbols: async (context, payload) => {
      try {
        let supported_symbols_raw = await axios.get('https://api.iextrading.com/1.0/ref-data/symbols')
        let supported_symbols = []
        let all_company_info = []

        await supported_symbols_raw.data.forEach(e => {
          supported_symbols.push(e.symbol)
        });

        await supported_symbols_raw.data.forEach(e => {
          all_company_info.push({symbol: e.symbol, name: e.name})
        });

        context.commit('setSupportedSymbols', supported_symbols)
        context.commit('setAllCompanyInfo', all_company_info)


      } catch (error) {
        console.log(error);
      }
    },
    getTweets: async (context, payload) => {
      axios
        .post("https://debonair-willow.glitch.me/search", {
          topic: context.state.topic,
          stock: context.state.stock
        })
        .then(res => {
          context.commit('setTweets', res.data.tweets)
          
        })
        .catch(err => {
          console.log(err);
        });
    },
    getStockPrices: (context, payload) => {
      axios
        .get(`https://api.iextrading.com/1.0/stock/${context.state.stock}/batch?types=quote,chart&range=1m`)
        .then(res => {
          context.commit('setStockPrices', res.data.chart)
          context.commit('setStockInfo', res.data.quote)
        })
        .catch(err => {
          console.log(err);
        })
    },
    enactClearState: (context) => {
      context.commit('clearState')
    }
  }
})