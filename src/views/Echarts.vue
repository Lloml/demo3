<template>
  <div id="top">
    <div>
      <div id="example-5">
        <label>
          <select v-model="selected">
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
    <div id="myChart" :style="{width: '1000px', height: '500px'}"></div>
  </div>

</template>
<script>
let myChart
export default {
  name: 'Echarts',
  components: {},
  mounted () {
    this.drawLine()
  },
  data: function () {
    return {
      selected: this.$store.getters.getMonthList('json1')[0],
      monthList: this.$store.getters.getMonthList('json1'),
      group: 'Power Supply and Consumption'
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
          source: this.$store.getters.getDataFromJson1('Heat Supply and Consumption', 'June Thursday', 'bar', 'json1')
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {},
        series: [
          // 这几个系列会在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
          {type: 'bar', stack: '广告', seriesLayoutBy: 'row'},
          {type: 'bar', stack: '广告', seriesLayoutBy: 'row'},
          {type: 'bar', stack: '广告', seriesLayoutBy: 'row'},
          {type: 'bar', stack: '广告', seriesLayoutBy: 'row'},
          {type: 'bar', stack: '广告', seriesLayoutBy: 'row'}
        ]
      })
    },
    changeData (groupName) {
      this.group = groupName
    }
  },
  watch: {
    group: function (val, oldVal) {
      myChart.setOption({
        dataset: {
          source: this.$store.getters.getDataFromJson1(this.group, this.selected, 'bar', 'json1')
        }
      })
    },
    selected: function (val, oldVal) {
      myChart.setOption({
        dataset: {
          source: this.$store.getters.getDataFromJson1(this.group, this.selected, 'bar', 'json1')
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
