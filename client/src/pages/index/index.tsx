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
    Taro.showShareMenu({
      withShareTicket: true
    })
    this.handleClick();
  }

  handleChange(inputName, e) {
    console.log([inputName])
    console.log(e.target.value)

    this.setState({
			[inputName]: Number(e.target.value.replace(/[^0-9.-]+/g,""))
		})
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
        savings: this.state.savings,
        cost: this.state.cost/12,
        stock: this.state.stock/100,
        cash: this.state.cash/100,
        bond: this.state.bond/100,
        years: this.state.years,
      },
      success: function (res) {
        this.setState({ option: res.result });

        // Taro.showToast({
        //   title: '成功',
        //   icon: 'success',
        //   duration: 2000
        // })
      }.bind(this),
      fail: function () {
        // Taro.showToast({
        //   title: '失败',
        //   icon: 'success',
        //   duration: 2000
        // })
      }.bind(this)
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
      // fail: function (res) {
      //   Taro.showToast({
      //     title: 'fail',
      //     icon: 'success',
      //     duration: 2000
      //   })
        // this.setState({ option: getOption() });
      // }.bind(this)
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
        <View>
          <Text className="spacing">修改下列数字，计算你现在的积蓄是否足够退休</Text>
          <View className="spacing" style='display: flex'>
            <View>
              <Text>总积蓄：</Text>
              <Input className="input" type='number' onInput={this.handleChange.bind(this, 'savings')} value={this.toCurrency(this.state.savings)} />
            </View>
            <View>
              <Text>年花费：</Text>
              <Input className="input" type='number' onInput={this.handleChange.bind(this, 'cost')} value={this.toCurrency(this.state.cost)} />
            </View>
          </View>
          <View className="spacing" style='display: flex'>
            <View>
              <Text>股票比例：</Text>
              <Input className="input" type='number' onInput={this.handleChange.bind(this, 'stock')} value={this.state.stock} />
            </View>
            <View>
              <Text>债券比例：</Text>
              <Input className="input" type='number' onInput={this.handleChange.bind(this, 'bond')} value={this.state.bond} />
            </View>
            <View>
              <Text>现金比例：</Text>
              <Input className="input" type='number' onInput={this.handleChange.bind(this, 'cash')} value={this.state.cash} />
            </View>
          </View>
          <View className="spacing" style='display: flex'>
            <Text>打算退休年龄：</Text>
            <Input className="input" style='width: 10%' type='number' onInput={this.handleChange.bind(this, 'years')} value={this.state.years} />
          </View>
          <View className="spacing"/>
          <Button primary className="button" onClick={this.handleClick.bind(this)} type={validPercent? '' : 'warn'} disabled={validPercent ? false : true} > {validPercent? '开始计算' : '请确保比例总和为100%'}</Button>
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


