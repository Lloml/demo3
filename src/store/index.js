import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let testData1 = require('../assets/json1')
let testData2 = require('../assets/json2')
export default new Vuex.Store({
  state: {
    name: 'json',
    testData1: testData1,
    testData2: testData2,
    testData3: []
  },
  mutations: {
    setTestData3 (state, payload) {
      state.testData3 = payload
    }
  },
  actions: {},
  modules: {},
  getters: {
    getDataFromTestData1: state => (groupName, month, type, jsonName) => {
      let result = []
      let data = state[jsonName].filter(item => item['cmd'] === type && item['month'] === month)
      let index = 0
      for (let x of data) {
        let data2 = x['data'].filter(item => item['group_name'] === groupName)
        for (let y of data2) {
          let keys = Object.keys(y['data'])
          let obj = {}
          obj['hour'] = y['data'][keys[0]][0]
          for (let z in keys) {
            obj[keys[z]] = y['data'][keys[z]][1]
            result[index] = obj
          }
        }
        index++
      }

      return result
    },
    getMonthList: state => (jsonName) => {
      let result = new Set()
      let data = state[jsonName]
      for (let x of data) {
        result.add(x['month'])
      }
      // 这里的filter是为了去除无效数据比如null
      return [...result].filter(d => d)
    },
    getDataFromTestData2: state => (month, type) => {
      let result = [20]
      let data = state.testData2[type][month]
      let array = ['type']
      for (let i = 1; i <= 24; i++) {
        array.push(i - 1 + 'h')
      }
      let keys = Object.keys(data)
      console.log(keys)
      for (let x in keys) {
        let arr = []
        arr.push(keys[x])
        for (let y of data[keys[x]]) {
          arr.push(y[1])
        }
        result[x] = arr
      }
      result = [1].concat(result)
      result[0] = array
      return result
    }
  }
}
)
