### 代码分析
**oauth组件页面**

```
//授权提示框由isShow和isSVIP字段决定
  <view class='loginTip' wx:if="{{isShow && isSVIP}}">
    <view class='tipWarp'>
      <view class='top'>
        <view>需要获取用户信息才可以查看相关</view>
        <view>数据信息</view>
      </view>
      <view class='bottom'>
        知道了
      </view>
    </view>
    <button class='btn' type='primary' open-type="getUserInfo" bindgetuserinfo="getUser" lang="zh_CN">
      点击获取用户信息
    </button>
  </view>


```

**attached生命周期中——组件被“附着”到页面的时候，具体表现同onLoad类似**
```
    // 获取用户是否授权，设置isShow值
    net.getWxOuth().then(res => {
      console.log('获取授权成功:' + res)
      if (res) {
        this.setData({ isShow: false })
      } else {
        this.setData({ isShow: true })
      }
    }).catch(err => {
      this.setData({ isShow: false })
    })

```
**oauth组件方法中**
```
//设置isSVIP值
    setSVIP () {
      this.setData({
        isSVIP: true
      })
    }
    //点击获取用户信息按钮
    getUser (e) {
      // 微信授权
      net.wxLogin().then(res => {
        return net.getUser(res)
      }).then(res => {
        return net.outhUser(res)
      }).then(res => {
        if (res.statusCode == 200) {
          if (res.data.success) {
            // 授权成功
            this.setData({
              isShow: false
            })
            this.triggerEvent('success')
          } else {
            wx.showToast({
              title: '授权失败',
              icon: 'none'
            })
          }
        } else {
          wx.showToast({
            title: '授权失败',
            icon: 'none'
          })
        }
      })
    },



```
**net.wxLogin方法**
```

const wxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

```
**net.getUser方法**
```
const getUser = (data) => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      lang: "zh_CN",
      success: function (userRes) {
        resolve({
          ...data,
          ...userRes
        })
      },
      fail: function (e) {
        reject(e)
      }
    })
  })
}

```
**net.outhUser**
```

const outhUser = (data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: api.API_HOST + 'qrcode/oauth_user',
      data: {
        ...data
      },
      header: {
        'Cookie': '',
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      //服务端的回掉  
      success: function (result) {
        console.log('reLogin success');
        api.setToken(result.data.data.token);
        api.setVipType(result.data.data.user.vipType);
        api.setUser(result.data.data.user);
        //如果用户存在手机号 存储
        if (result.data.data.phone) {
          
          wx.setStorageSync('userphone', result.data.data.phone)
          app.globalData.needGetPhone = false
        }
        resolve(result)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}


```
**index页面**
```
    
   this.oauthDialog = this.selectComponent('#oauthDialog')

    api.ajax('qrcode/getLiveInfo', 'post', {
      live_id: liveid
    }, function (result) {
        // 本场是否是SVIP的活动
        if (result.data.SVIPInfo.SVIP == '1') {
          that.oauthDialog.setSVIP()
        }
})

```
### 阶段总结
如果是svip用户，在刚进入首页的时候，会根据是否授权来弹出自定义授权框组件。
非svip用户点击进入互动的时候会弹出微信自带的授权询问框，下面是对这种情况的代码分析

### 代码分析
**index页面有一个覆盖全屏大小的授权登录按钮**
```

 <button wx:if="{{!isOauth}}" bindgetuserinfo='testUser' open-type="getUserInfo" style='height:100vh;width:100%;position: absolute;top:0;left:0; opacity: 0;'></button>

```
**isOauth**
```

    // 获取用户授权信息
    //在index.js onLoad阶段执行
    wx.getSetting({
      success: function (res) {
        if (res.errMsg == 'getSetting:ok') {
          that.setData({
            isOauth: res.authSetting['scope.userInfo'] || false
          })
        }
      }
    })


```
**testUser**
```
//获取用户信息并授权登陆
 testUser: function (result) {
    const that = this
    if (result.detail.errMsg == 'getUserInfo:ok') {
      // 成功
      this.setData({
        isOauth: true
      })
      // OauthUser
      api.reLogin(function () {
        if (that.data.isNoScreenShow) {
          that.toNoScreen()
        } else {
          that.toLive()
        }
      })
    } else {
      wx.showToast({
        title: '获取用户信息失败',
        icon: 'none'
      })
    }
  },

```
**api.reLogin**
```
//调用wx.login获取用户code等信息然后调用后台授权登陆接口
  function reLogin(callback) {
    wx.login({
      success: function(res) {
        wx.getUserInfo({
          lang: 'zh_CN',
          success: function(userRes) {
            wx.request({
              url: API_HOST + 'qrcode/oauth_user',
              data: {
                code: res.code,
                encryptedData: userRes.encryptedData,
                iv: userRes.iv
              },
              header: {
                Cookie: '',
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              // 服务端的回掉
              success: function(result) {
                setToken(result.data.data.token)
                setVipType(result.data.data.user.vipType)
                setUser(result.data.data.user)
                if (callback) {
                  callback(result.data.data.token)
                }
              },
              fail: function() {
                console.log('getUserInfo fail')
                wx.showToast({
                  title: '网络异常,请重新扫码!',
                  icon: 'none'
                })
              }
            })
          },
          fail: function(e) {
            console.log(e)
          }
        })
      },
      fail: function() {
        // 登陆失败
        wx.showToast({
          title: '登陆失败!',
          icon: 'none'
        })
      }
    })
  }




```
### 40029错误分析
**当用户为SVIP时会不会出现调用两次授权登录的可能？**
**分析：**
关键字段：isShow isSVIP isOauth
用户A为SVIP用户，第一次进入首页，执行index的onLoad后执行oauth组件的attach，isOauth被初始化(首页授权按钮出现),isShow被初始化,请求获取直播信息后 isSVIP初始化。
自定义授权页面的出现在首页请求按钮页面出现之后.
但是onLoad不执行结束，页面还未渲染完成，点击事件是不会触发的。所以实际情况是：SVIP用户未授权直接点击一定会弹出授权框

### 授权登录流程总结
wx.getSetting获取用户授权信息
wx.Login 获取code--->wx.getUserInfo 获取encryptedData iv signature用户基本信息--->调用后台授权接口 传参数code iv signature encryptedData 用户基本信息等