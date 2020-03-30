<template>
  <div>
    <div>
      <label>
        <select v-model="selected">
          <option disabled value="">请选择</option>
          <option v-for="month in monthList" :key='month' v-bind:value="month">{{month}}</option>
        </select>
      </label>
    </div>
    <div id="myChart" :style="{width: '1000px', height: '500px'}"></div>
<!--    <p>{{$store.getters.getDataFromTestData2('June Thursday','Transformer_1')}}</p>-->
  </div>
</template>
<script>
export default {
  name: 'Echarts2',
  data () {
    return {
      month: '',
      type: '',
      monthList: ['June Thursday'],
      selected: 'June Thursday'
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '条形图' },
        tooltip: {},
        legend: {},
        dataset: {
          source: this.$store.getters.getDataFromTestData2('June Thursday', 'Transformer_1')
        },
        xAxis: {type: 'category'},
        yAxis: {},
        series: [
          // 这几个系列会在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
          {type: 'line', seriesLayoutBy: 'row'},
          {type: 'line', seriesLayoutBy: 'row'},
          {type: 'line', seriesLayoutBy: 'row'}
        ]
      })
    }
  }
}
</script>
<style>
  #myChart {
    margin-right: auto;
    margin-left: auto;
  }
</style>
