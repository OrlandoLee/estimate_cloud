import React, { Component } from "react";
import Taro, { showToast } from "@tarojs/taro";
import { View, Button, Image, Text, Input, Form, Switch } from "@tarojs/components";
import EChart from "techarts";
import * as echarts from "./echarts";

import "./index.scss";

// https://github.com/elvinzhu/techarts
// Note: echart minimized version doesn't work. need to download full version from techarts and overwrite echart.js
export default class Index extends Component {
  chart = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      option: {},
      savings: 1000000,
      cost: 50000,
      stock: 90,
      bond: 8,
      cash: 2,
      years: 30
    };
  }

  componentDidMount() {
    this.handleClick();
  }

  handleChange(inputName, e) {
    console.log([inputName])
    console.log(e.target.value)

    this.setState({
			[inputName]: Number(e.target.value.replace(/[^0-9.-]+/g,""))
		})

    if(this.state.stock + this.state.bond + this.cash != 100) {
      Taro.showToast({
        title: '股票，债券，现金比例之和应为100',
        icon: 'none',
        duration: 2000
      })
    }
  }
  
  toCurrency(number) {
    const formatter = new Intl.NumberFormat("zh", {
      style: "decimal",
      currency: "CNY"
    });
  
    return formatter.format(number);
  }

  handleClick() {
    // 1. success works on IDE
    // 2. on mobile this doesn't work for preview, because URL is not allowed
    
    Taro.cloud.callFunction({
      // 云函数名称
      name: 'fire_calculator',
      // 传给云函数的参数
      data: {
        a: 1,
        b: 2,
      },
      success: function (res) {
        this.setState({ option: res.result });
        Taro.showToast({
          title: 'fire calculator is successful',
          icon: 'success',
          duration: 2000
        })
      }.bind(this),
      fail: console.error
    })
    // Taro.request({
    //   url: 'https://6f8008d3e087.ngrok.io/high_scores?savings='+this.state.savings+'&cost='+this.state.cost/12+'&stock='+this.state.stock/100+'&cash='+this.state.cash/100+'&bond='+this.state.bond/100+'&years='+this.state.years,
    //   // url: 'https://pingtas.qq.com',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     this.setState({ option: res.data });
    //     Taro.showToast({
    //       title: '成功',
    //       icon: 'success',
    //       duration: 2000
    //     })
    //   }.bind(this),
    //   fail: function (res) {
    //     Taro.showToast({
    //       title: 'fail',
    //       icon: 'success',
    //       duration: 2000
    //     })
    //     this.setState({ option: getOption() });
    //   }.bind(this)
    // })
  }

  render() {
    const { option, exportedImg } = this.state;

    var validPercent = (this.state.stock + this.state.bond + this.state.cash == 100)
    return (
      <View className="page-index">
        <View className="line-chart">
          {/* 通过 option 设置数据 */}
          <EChart echarts={echarts} option={option} />
        </View>
        {/* <View className="line-chart"> */}
          {/* 通过组件实例设置数据 */}
          {/* <EChart ref={this.chart} echarts={echarts} /> */}
        {/* </View> */}
        {/* {exportedImg && <Image mode="widthFix" src={exportedImg}></Image>} */}
        {/* <Button onClick={this.exportImg}>导出图片</Button> */}
        {/* <View className="line-chart"> */}
          {/* 通过组件实例设置数据，并自定义echarts的初始化 */}
          {/* <EChart echarts={echarts} option={option} onInit={this.onInit} /> */}
        {/* </View> */}
        <View className='example-body'>
          <Text>总积蓄</Text>
          <Input type='number' onInput={this.handleChange.bind(this, 'savings')} value={this.toCurrency(this.state.savings)} />
          <Text>年花费</Text>
          <Input type='number' onInput={this.handleChange.bind(this, 'cost')} value={this.toCurrency(this.state.cost)} />
          <Text>股票比例</Text>
          <Input type='number' onInput={this.handleChange.bind(this, 'stock')} value={this.state.stock} />
          <Text>债券比例</Text>
          <Input type='number' onInput={this.handleChange.bind(this, 'bond')} value={this.state.bond} />
          <Text>现金比例</Text>
          <Input type='number' onInput={this.handleChange.bind(this, 'cash')} value={this.state.cash} />
          <Text>FIRE年龄</Text>
          <Input type='number' onInput={this.handleChange.bind(this, 'years')} value={this.state.years} />
          
          
          <Button onClick={this.handleClick.bind(this)} type={validPercent? '' : 'warn'} disabled={validPercent ? false : true} > {validPercent? '更新' : '请确保总和为100%'}</Button>
        </View>

      </View>
    );
  }

  // exportImg = () => {
  //   this.chart.current.canvasToTempFilePath({
  //     success: res => {
  //       this.setState({
  //         exportedImg: res.tempFilePath
  //       });
  //     }
  //   });
  // };

  // manualSetOption() {
  //   const newX = [...xData];
  //   const newY = [...yData];
  //   const date = new Date(2020, 3, 7);
  //   setInterval(() => {
  //     const newDate = new Date(date.setDate(date.getDate() + 1));
  //     newX.shift();
  //     newX.push(`${newDate.getMonth() + 1}/${newDate.getDate()}`);
  //     newY.shift();
  //     newY.push((100 * Math.random()).toFixed(2));
  //     this.chart.current.setOption(getOption(newX, newY));
  //   }, 1000);
  // }

  // onInit = (canvas, width, height, dpr) => {
  //   const chart = echarts.init(canvas, null, {
  //     width: width,
  //     height: height,
  //     devicePixelRatio: dpr // new
  //   });
  //   return chart; // 必须return
  // };
}

function getOption() {
  return {"title":{"text":"堆叠区域图"},"tooltip":{"trigger":"axis"},"legend":{"data":["dead","broke","fire","win"]},"color":["#7B7B7B","#DB625E","#94E694","#72C372"],"toolbox":{"feature":{"saveAsImage":{}}},"grid":{"left":"3%","right":"4%","bottom":"3%","containLabel":true},"xAxis":[{"type":"category","boundaryGap":false,"data":[60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]}],"yAxis":[{"type":"value","max":100}],"series":[{"name":"dead","type":"line","stack":"总量","areaStyle":{},"emphasis":{"focus":"series"},"data":[8.5,9.1,9.7,10.4,11.1,11.9,12.8,13.8,14.8,15.9,17.1,18.4,19.9,21.4,23.0,24.8,26.8,28.9,31.1,33.5,36.1,38.9,41.8,45.0,48.3,51.8,55.4,59.2,63.1,67.0,70.9,74.7,78.5,82.0,85.2,88.2,90.7,92.9,94.7,96.1,97.3,98.1,98.7,99.2,99.5,99.7,99.8,99.9,99.9,100.0,100.0,100.0,100.0,100.0]},{"name":"broke","type":"line","stack":"总量","areaStyle":{},"emphasis":{"focus":"series"},"data":[0.0,0.0,2.3,15.6,33.5,49.6,60.6,65.1,69.3,71.3,71.8,71.0,70.4,69.7,68.9,67.4,66.4,64.6,63.1,61.1,59.1,56.5,53.8,50.9,47.8,44.6,41.2,38.0,34.5,30.9,27.2,23.6,20.1,16.8,13.8,11.1,8.7,6.6,4.9,3.6]},{"name":"fire","type":"line","stack":"总量","areaStyle":{},"emphasis":{"focus":"series"},"data":[59.7,67.3,69.2,58.2,41.8,25.9,15.3,11.4,6.6,4.1,2.6,2.2,1.9,2.5,2.3,1.6,1.1,1.3,0.6,0.4,0.0,0.0,0.2,0.5,0.5,0.5,0.8,0.5,0.3,0.2,0.0,0.0,0.0,0.1,0.0,0.0,0.1,0.1,0.0,0.0]},{"name":"win","type":"line","stack":"总量","areaStyle":{},"emphasis":{"focus":"series"},"data":[31.9,23.7,18.8,15.8,13.6,12.5,11.3,9.7,9.3,8.6,8.5,8.4,7.8,6.4,5.8,6.1,5.7,5.3,5.2,5.0,4.8,4.6,4.2,3.6,3.4,3.1,2.6,2.3,2.1,2.0,1.9,1.6,1.4,1.1,1.0,0.8,0.5,0.4,0.3,0.3]}]}
}

