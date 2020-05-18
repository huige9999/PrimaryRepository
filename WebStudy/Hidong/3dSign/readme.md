### 3D签到代码分析

1. 创建imgIndex——0到200打乱顺序的数组
     createIndex()

2. 初始化数据
    init()

```
init(){
   personArray初始化——[{image}.....]长度为1034  和 _index数组——0到1034打乱顺序的数组
   createPosition()
   camera scene renderer初始化
    
   nextTick钩子中
   将renderer.domElement挂在于页面根内容之下
   renderer渲染
   animate()
   transform()
}
```
```
createPosition(){
创建table数组——[{src——头像,p_x,p_y}]长度同personArray1034

1034次循环
创建dom——<div><img></div>
dom包装成object——CSS3DObject
设置object的x,y,z——随机坐标，打乱的位置
创建object1——CSS3DObject并设置它的x,y,z，然后将其放入targets.random中——targets:[{形状：[]}......]
初始化objects数组——存放object
创建object并设置他的x,y坐标与table数组中的x，y坐标成线性关系，并放入targets.table中

创建球体并放入targets.sphere中
......
}
```
```
animate(){
根据相机的z轴位置或者_rFlag标识来控制旋转scene
requestAnimationFrame重复执行animate方法
TWEEN更新
renderer渲染
}
transform(形状，持续时间，是否是Logo,z轴距离){
    清除TWEEN
    遍历objects数组
    调用TWEEN设置初始位置——objects item位置到结束位置 目标形状位置的过渡
}
```



### 思路：

1.  创建scene camera renderer

2.  创建3DObject——包含坐标信息，包含起始坐标信息的3DObject和目标状态的3DObject

3. Tweenjs实现 打乱坐标顺序的元素 到 规则3D图形的变化

4. renderer渲染出场景内容，requestAnimation重复执行这一过程