// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {"title":{"text":"堆叠区域图"},"tooltip":{"trigger":"axis"},"legend":{"data":["dead","broke","fire","win"]},"color":["#7B7B7B","#DB625E","#94E694","#72C372"],"toolbox":{"feature":{"saveAsImage":{}}},"grid":{"left":"3%","right":"4%","bottom":"3%","containLabel":true},"xAxis":[{"type":"category","boundaryGap":false,"data":[60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]}],"yAxis":[{"type":"value","max":100}],"series":[{"name":"dead","type":"line","stack":"总量","areaStyle":{},"emphasis":{"focus":"series"},"data":[8.5,9.1,9.7,10.4,11.1,11.9,12.8,13.8,14.8,15.9,17.1,18.4,19.9,21.4,23.0,24.8,26.8,28.9,31.1,33.5,36.1,38.9,41.8,45.0,48.3,51.8,55.4,59.2,63.1,67.0,70.9,74.7,78.5,82.0,85.2,88.2,90.7,92.9,94.7,96.1,97.3,98.1,98.7,99.2,99.5,99.7,99.8,99.9,99.9,100.0,100.0,100.0,100.0,100.0]},{"name":"broke","type":"line","stack":"总量","areaStyle":{},"emphasis":{"focus":"series"},"data":[0.0,0.0,2.3,15.6,33.5,49.6,60.6,65.1,69.3,71.3,71.8,71.0,70.4,69.7,68.9,67.4,66.4,64.6,63.1,61.1,59.1,56.5,53.8,50.9,47.8,44.6,41.2,38.0,34.5,30.9,27.2,23.6,20.1,16.8,13.8,11.1,8.7,6.6,4.9,3.6]},{"name":"fire","type":"line","stack":"总量","areaStyle":{},"emphasis":{"focus":"series"},"data":[59.7,67.3,69.2,58.2,41.8,25.9,15.3,11.4,6.6,4.1,2.6,2.2,1.9,2.5,2.3,1.6,1.1,1.3,0.6,0.4,0.0,0.0,0.2,0.5,0.5,0.5,0.8,0.5,0.3,0.2,0.0,0.0,0.0,0.1,0.0,0.0,0.1,0.1,0.0,0.0]},{"name":"win","type":"line","stack":"总量","areaStyle":{},"emphasis":{"focus":"series"},"data":[31.9,23.7,18.8,15.8,13.6,12.5,11.3,9.7,9.3,8.6,8.5,8.4,7.8,6.4,5.8,6.1,5.7,5.3,5.2,5.0,4.8,4.6,4.2,3.6,3.4,3.1,2.6,2.3,2.1,2.0,1.9,1.6,1.4,1.1,1.0,0.8,0.5,0.4,0.3,0.3]}]}
}