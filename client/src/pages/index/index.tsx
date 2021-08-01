import React, { Component } from "react";
import Taro, { showToast } from "@tarojs/taro";
import { View, Button, Icon, Text, Input } from "@tarojs/components";
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
      years: 30,
      extra_income: 0,
      extra_income_age_start: 30,
      extra_income_age_end: 50,
      extra_expense: 0,
      extra_expense_age_start: 50,
      extra_expense_age_end: 70
    };
  }
    
  onShareAppMessage() {
    return {
      title: "我的积蓄足够提前退休吗？",
      path: '/pages/index/index'
    };
  }

  componentDidMount() {
    Taro.showShareMenu({
      withShareTicket: true
    })
    this.handleClick();
  }

  handleChange(inputName, e) {
    this.setState({
			[inputName]: e.target.value
		})
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
        extra_income: this.state.extra_income,
        extra_income_age_start: this.state.extra_income_age_start,
        extra_income_age_end: this.state.extra_income_age_end,
        extra_expense: this.state.extra_expense,
        extra_expense_age_start: this.state.extra_expense_age_start,
        extra_expense_age_end: this.state.extra_expense_age_end,
      },
      success: function (res) {
        this.setState({ option: res.result });

        Taro.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 2000
        })
      }.bind(this),
      fail: function () {
        Taro.showToast({
          title: '更新失败',
          icon: 'success',
          duration: 2000
        })
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
          <EChart echarts={echarts} option={option} onInit={this.onInit}/>
        </View> 

        {/* <View className="line-chart"> */}
          {/* 通过组件实例设置数据 */}
          {/* <EChart ref={this.chart} echarts={echarts} /> */}
        {/* </View> */}
        {/* {exportedImg && <Image mode="widthFix" src={exportedImg}></Image>} */}
        {/* <Button onClick={this.exportImg}>导出图片</Button> */}
        <View className="spacing">
        <View style="white-space:pre-wrap">
          这个提前退休计算器，在试着帮你回答一个很常见的问题：如果我在退休时拥有xx积蓄，那么我的钱够花一辈子吗?
        </View>
        

          <Text>修改下列数字，计算你现在的积蓄是否足够让你提前退休</Text>
          <View className="spacing" style='display: flex'>
            <View>
              <View className="tooltip">
                <Text>总积蓄 </Text>
                <Icon size='15' type='info_circle' color='#ccc'/>
                <Text className="tooltiptext"> 退休之后的总积蓄（除自住房外）</Text>
              </View>
              <Input className="input" type='number' onInput={this.handleChange.bind(this, 'savings')} value={this.state.savings} />
            </View>
            <View>

              <View className="tooltip">
                <Text>年花费 </Text>
                <Icon size='15' type='info_circle' color='#ccc'/>
                <Text className="tooltiptext"> 退休之后预计每年的花费</Text>
              </View>
              <Input className="input" type='number' onInput={this.handleChange.bind(this, 'cost')} value={this.state.cost} />
            </View>
          </View>
          <View className="spacing" style='display: flex'>
            <View>
              <View className="tooltip">
                <Text>股票比例 </Text>
                <Icon size='15' type='info_circle' color='#ccc'/>
                <Text className="tooltiptext"> 输入目标投资组合中股票的整数百分比。股票、债券和现金分配的总和应增加到 100%。在此计算中，资产将每年重新平衡到指定的分配。</Text>
              </View>
              <Input className="input" type='number' onInput={this.handleChange.bind(this, 'stock')} value={this.state.stock} />
            </View>
            <View>
            <View className="tooltip">
                <Text>债券比例 </Text>
                <Icon size='15' type='info_circle' color='#ccc'/>
                <Text className="tooltiptext"> 输入目标投资组合中债券的整数百分比。股票、债券和现金分配的总和应增加到 100%。在此计算中，资产将每年重新平衡到指定的分配。</Text>
              </View>
              <Input className="input" type='number' onInput={this.handleChange.bind(this, 'bond')} value={this.state.bond} />
            </View>
            <View>
              <View className="tooltip">
                <Text>现金比例 </Text>
                <Icon size='15' type='info_circle' color='#ccc'/>
                <Text className="tooltiptext"> 输入目标投资组合中债券的整数百分比。股票、债券和现金分配的总和应增加到 100%。在此计算中，资产将每年重新平衡到指定的分配。</Text>
              </View>
              <Input className="input" type='number' onInput={this.handleChange.bind(this, 'cash')} value={this.state.cash} />
            </View>
          </View>
          <View className="spacing" style='display: flex'>
            <View className="tooltip">
                <Text>退休年龄 </Text>
                <Icon size='15' type='info_circle' color='#ccc'/>
                <Text className="tooltiptext"> 预计退休年龄</Text>
              </View>
            <Input className="input" style='width: 10%' type='number' onInput={this.handleChange.bind(this, 'years')} value={this.state.years} />
          </View>
          <View className="spacing" style='display: flex'>
            <View>
              <View className="tooltip">
                <Text>额外年收入 </Text>
                <Icon size='15' type='info_circle' color='#ccc'/>
                <Text className="tooltiptext"> 退休之后您可能会有一些收入，比如退休金，房租，或者自己的公司收入。</Text>
              </View>
              <Input className="input" type='number' onInput={this.handleChange.bind(this, 'extra_income')} value={this.state.extra_income} />
            </View>
            <View>
            <View className="tooltip">
                <Text>开始年龄 </Text>
                <Icon size='15' type='info_circle' color='#ccc'/>
                <Text className="tooltiptext"> 额外年收入开始年龄</Text>
              </View>
              <Input className="input" type='number' onInput={this.handleChange.bind(this, 'extra_income_age_start')} value={this.state.extra_income_age_start} />
            </View>
            <View>
              <View className="tooltip">
                <Text>结束年龄 </Text>
                <Icon size='15' type='info_circle' color='#ccc'/>
                <Text className="tooltiptext"> 额外年收入结束年龄</Text>
              </View>
              <Input className="input" type='number' onInput={this.handleChange.bind(this, 'extra_income_age_end')} value={this.state.extra_income_age_end} />
            </View>
          </View>
          <View className="spacing" style='display: flex'>
            <View>
              <View className="tooltip">
                <Text>额外年支出 </Text>
                <Icon size='15' type='info_circle' color='#ccc'/>
                <Text className="tooltiptext"> 退休之后您可能会有一些额外支出，比如孩子教育，生病支出。</Text>
              </View>
              <Input className="input" type='number' onInput={this.handleChange.bind(this, 'extra_expense')} value={this.state.extra_expense} />
            </View>
            <View>
            <View className="tooltip">
                <Text>开始年龄 </Text>
                <Icon size='15' type='info_circle' color='#ccc'/>
                <Text className="tooltiptext"> 额外年支出开始年龄</Text>
              </View>
              <Input className="input" type='number' onInput={this.handleChange.bind(this, 'extra_expense_age_start')} value={this.state.extra_expense_age_start} />
            </View>
            <View>
              <View className="tooltip">
                <Text>结束年龄 </Text>
                <Icon size='15' type='info_circle' color='#ccc'/>
                <Text className="tooltiptext"> 额外年支出结束年龄</Text>
              </View>
              <Input className="input" type='number' onInput={this.handleChange.bind(this, 'extra_expense_age_end')} value={this.state.extra_expense_age_end} />
            </View>
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

  onInit = (canvas, width, height, dpr) => {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // new
    });

    setTimeout(()=>{
      chart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: 1 
        });}, 5000); //need to wait till the graph is loaded. initial load is really slow

    return chart; // 必须return
  };
}


