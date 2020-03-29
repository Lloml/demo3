<template>
  <div id="top">
    <div>
      <div id="example-5">
        <label>
          <select v-model="selected" v-cloak>
            <option disabled value="">请选择</option>
            <option v-for="month in monthList" :key='month' v-bind:value="month">{{month}}</option>
          </select>
        </label>
      </div>
    </div>
    <div class="tab">

      <button @click="changeData('Power Supply and Consumption')">
        Power Supply and Consumption
      </button>
      <button @click="changeData('Cool Supply and Consumption')">
        Cool Supply and Consumption
      </button>
      <button  @click="changeData('Heat Supply and Consumption')">
        Heat Supply and Consumption
      </button>

    </div>
    <div id="myChart" :style="{width: '1000px', height: '500px'}" v-cloak></div>
  </div>

</template>
<script>
let myChart
export default {
  name: 'Echarts',
  components: {},
  mounted () {
    this.getJson3()
    this.drawLine()
  },
  data: function () {
    return {
      selected: '',
      monthList: [],
      group: 'Power Supply and Consumption',
      json3: []
    }
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '柱状图' },
        tooltip: {},
        legend: {
        },
        dataset: {
          source: this.$store.getters.getDataFromJson1(this.group, this.selected, 'bar', 'json3')
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {},
        series: [
          // 这几个系列会在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
          {type: 'bar', stack: ' ', seriesLayoutBy: 'row'},
          {type: 'bar', stack: ' ', seriesLayoutBy: 'row'},
          {type: 'bar', stack: ' ', seriesLayoutBy: 'row'},
          {type: 'bar', stack: ' ', seriesLayoutBy: 'row'},
          {type: 'bar', stack: ' ', seriesLayoutBy: 'row'}
        ]
      })
    },
    changeData (groupName) {
      this.group = groupName
    },
    getJson3 () {
      this.$api.GET('/static/json3.json', {

      }).then(res => {
        let result = res.data
        if (result) {
          this.$store.commit('setJson3', result)
          this.selected = this.$store.getters.getMonthList('json3')[0]
          this.monthList = this.$store.getters.getMonthList('json3')
        }
      })
    }
  },
  watch: {
    group: function (val, oldVal) {
      myChart.setOption({
        dataset: {
          source: this.$store.getters.getDataFromJson1(this.group, this.selected, 'bar', 'json3')
        }
      })
    },
    selected: function (val, oldVal) {
      myChart.setOption({
        dataset: {
          source: this.$store.getters.getDataFromJson1(this.group, this.selected, 'bar', 'json3')
        }
      })
    }
  }
}
</script>
<style>
  #myChart{
    margin-left: auto;
    margin-right: auto;
  }
  .tab button{
    margin-left: 20px;
    margin-right: 20px;
    border: 0;

    background-color: transparent;

    outline: none;
  }
</style>
