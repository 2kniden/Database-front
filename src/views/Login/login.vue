<template>
  <!--注册页面-->
  <div class="register-background" v-if="choosePage === '注册'">
    <!--输入信息的底板-->
    <div class="register-borad">
      <!--平台标识-->
      <div class="symbol">
        <!--平台标志-->
        <img class="logo" src="../../assets/login/logo.png"/>
        <!--平台名称-->
        <div class="symbol-text">迹忆旅游平台</div>
      </div>

      <!--输入框-->
      <div class="input-borad">
        <!--五个输入框-->
        <input class="input-box" style="margin-top: 10px;" placeholder="昵称"/>
        <input class="input-box" placeholder="密码"/>
        <div class="warning-text">*要求密码中包含大小写字母和数字，至少8位</div><!--提示栏-->
        <input class="input-box"  style="margin-top: 5px;" placeholder="确认密码"/>
        <div class="warning-text">*要求此次密码和上次一致</div><!--提示栏-->
        <input class="input-box"  style="margin-top: 5px;" placeholder="手机号码" v-model="registerForm.phone"/>

        <!--验证码输入框，与上面不同-->
        <div class="input-box" style="border-radius: 0;background-color: #F1F3FF;padding-left: 0">
          <!--验证码输入框-->
          <input class="testcode-input-box" v-model="registerForm.verificationCode"/>
          <!--验证码发送文字-->
          <div class="testcoed-text" @click="getRegisterPhoneCode" v-if="registerForm.showCode">发送验证码</div>
          <div class="testcoed-text" v-if="registerForm.showCode === false">{{ registerForm.count }}</div>
        </div>
      </div>

      <!--按钮部分-->
      <div class="button">
        <div class="button-text">注册</div>
        <div class="change-button" @click="changePage('登录')">已有账号？登录一下</div>
      </div>
    </div>
  </div>

  <!--登录页面-->
  <div class="login-background" v-if="choosePage === '登录'">
    <!--输入信息的底板-->
    <div class="login-borad">
      <!--平台标识-->
      <div class="symbol">
        <!--平台标志-->
        <img class="logo" src="../../assets/login/logo.png"/>
        <!--平台名称-->
        <div class="symbol-text">迹忆旅游平台</div>
      </div>

      <!--输入框-->
      <div class="input-borad" style="height: 240px;">
        <!--两个输入框-->
        <input class="input-box" style="margin-top: 10px;" placeholder="用户ID/手机号/邮箱" v-if="codeLogin === false"/>
        <input class="input-box" placeholder="密码" v-if="codeLogin === false"/>

        <!--如果是短信登陆-->
        <input class="input-box" style="margin-top: 10px;" placeholder="手机号" v-if="codeLogin"/>
        <div class="input-box" style="border-radius: 0;background-color: #F1F3FF;padding-left: 0" v-if="codeLogin">
          <!--验证码输入框-->
          <input class="testcode-input-box" style="width: 300px" v-model="loginForm.verificationCode"/>
          <!--验证码发送文字-->
          <div class="testcoed-text" @click="getLoginPhoneCode" v-if="loginForm.showCode">发送验证码</div>
          <div class="testcoed-text" v-if="loginForm.showCode === false">{{ loginForm.count }}</div>
        </div>

        <!--短信登陆和忘记密码-->
        <div class="warning-board">
          <div class="warning-button" v-if="codeLogin === false" @click="codeLogin=!codeLogin">短信登陆</div>
          <div class="warning-button" v-if="codeLogin" @click="codeLogin=!codeLogin">返回登录</div>
          <div class="warning-button" style="margin-left: 330px" @click="gotoMissPage">忘记密码</div>
        </div>
      </div>

      <!--按钮部分-->
      <div class="button">
        <div class="button-text" style="margin-left: 230px;">登录</div>
        <div class="change-button" @click="changePage('注册')">还没有账号？注册一下</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  components:{

  },
  data(){
    return{
      choosePage:'登录',
      codeLogin:false,
      registerForm: {
        phone: "",
        verificationCode: "", //表单中展示的验证码
        contentText: "", //向手机号发送的随机验证码
        timer: null,
        showCode: true, //判断展示‘获取验证码’或‘倒计时’
        count: "", //倒计时时间
      },
      loginForm: {
        phone: "",
        verificationCode: "", //表单中展示的验证码
        contentText: "", //向手机号发送的随机验证码
        timer: null,
        showCode: true, //判断展示‘获取验证码’或‘倒计时’
        count: "", //倒计时时间
      },
      APIID:"C51421715",
      APIKEY:"5a0ed71266a542a0857819d931ba09af"
    }
  },
  methods:{
    changePage(name){
      let that = this;
      that.choosePage = name;
    },
    gotoMissPage(){
      this.$router.push("/missPass");
    },
    getRegisterPhoneCode(){
      // 如果未输入手机号，结束执行
      if (this.registerForm.phone == "") {
        alert("未输入手机号")
        return;
      }
      // 获取随机数（6位数字）
      let numCode = "";
      for (let i = 0; i < 6; i++) {
        numCode += Math.floor(Math.random() * 10);
      }
      // 存储发送的验证码,用于验证输入的手机验证码是否和本地存储的相同
      this.registerForm.contenttext = numCode;
      // 向手机号发送验证码传入的参数
      let phoneCode = new FormData();
      let content = "您的验证码是："+numCode+"。请不要把验证码泄露给其他人。";
      phoneCode.append("account",this.APIID);
      phoneCode.append("password",this.APIKEY);
      phoneCode.append("mobile",this.registerForm.phone);
      phoneCode.append("content",content);

      //调用接口
      axios
          .post("/api/webservice/sms.php?method=Submit",phoneCode)
          .then((res)=>{
            if (res.status != 200) {
              alert("验证码发送失败！")
              return;
            } else {
              // 当验证码发送成功，开始60秒倒计时
              const TIME_COUNT = 60;
              if (!this.registerForm.timer) {
                this.registerForm.showCode = false;
                this.registerForm.count = TIME_COUNT;
                this.registerForm.timer = setInterval(() => {
                  if (
                      this.registerForm.count > 0 &&
                      this.registerForm.count <= TIME_COUNT
                  ) {
                    this.registerForm.count -= 1;
                  } else {
                    this.registerForm.showCode = true;
                    clearInterval(this.registerForm.timer);
                    this.registerForm.timer = null;
                  }
                }, 1000);
              }
            }
          })
    },
    getLoginPhoneCode(){
      // 如果未输入手机号，结束执行
      if (this.loginForm.phone == "") {
        alert("未输入手机号")
        return;
      }
      // 获取随机数（6位数字）
      let numCode = "";
      for (let i = 0; i < 6; i++) {
        numCode += Math.floor(Math.random() * 10);
      }
      // 存储发送的验证码,用于验证输入的手机验证码是否和本地存储的相同
      this.loginForm.contenttext = numCode;
      // 向手机号发送验证码传入的参数
      let phoneCode = new FormData();
      let content = "您的验证码是："+numCode+"。请不要把验证码泄露给其他人。";
      phoneCode.append("account",this.APIID);
      phoneCode.append("password",this.APIKEY);
      phoneCode.append("mobile",this.loginForm.phone);
      phoneCode.append("content",content);

      //调用接口
      axios
          .post("/api/webservice/sms.php?method=Submit",phoneCode)
          .then((res)=>{
            if (res.status != 200) {
              alert("验证码发送失败！")
              return;
            } else {
              // 当验证码发送成功，开始60秒倒计时
              const TIME_COUNT = 60;
              if (!this.loginForm.timer) {
                this.loginForm.showCode = false;
                this.loginForm.count = TIME_COUNT;
                this.loginForm.timer = setInterval(() => {
                  if (
                      this.loginForm.count > 0 &&
                      this.loginForm.count <= TIME_COUNT
                  ) {
                    this.loginForm.count -= 1;
                  } else {
                    this.loginForm.showCode = true;
                    clearInterval(this.loginForm.timer);
                    this.loginForm.timer = null;
                  }
                }, 1000);
              }
            }
          })
    }
  }
}
</script>

<style scoped>
.register-background{
  position: absolute;
  width: 100vw;
  height: 100vh;

  background-image: url("../../assets/login/register-background.png");
  background-size: cover;
}
.login-background{
  position: absolute;
  width: 100vw;
  height: 100vh;

  background-image: url("../../assets/login/login-background.png");
  background-size: cover;
}

/* 输入信息部分 */
.register-borad{
  position: relative;
  display: flex;
  flex-direction: column;
  width:580px;
  height: 690px;
  margin-left: 1020px;
  margin-top: 120px;
  border-radius: 68px;
  align-items: center;

  background-color: #F1F3FF;
}
.login-borad{
  position: relative;
  display: flex;
  flex-direction: column;
  width:580px;
  height: 475px;
  margin-left: 1020px;
  margin-top: 260px;
  border-radius: 68px;
  align-items: center;

  background-color: #F1F3FF;
}
/* 平台标志 */
.symbol{
  position: relative;
  display: flex;
  width: 300px;
  height: 85px;
  margin-top: 25px;
  align-items: center;
}
.logo{
  position: relative;
  display: flex;
  width: 85px;
  height: 85px;
}
.symbol-text{
  position: relative;
  display: flex;
  width: max-content;
  height: 42px;
  margin-left: 20px;

  color: #8097FD;
  font-family: Microsoft YaHei;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

/* 输入框 */
.input-borad{
  position: relative;
  display: flex;
  flex-direction: column;
  width: 510px;
  height: 480px;
  margin-top: 10px;
}
.input-box{
  position: relative;
  display: flex;
  width: 480px;
  height: 70px;
  border-radius: 33px;
  margin-top: 25px;
  padding-left: 20px;
  align-items: center;
  background: rgba(193, 204, 251, 0.51);

  font-family: Microsoft YaHei;
  color: #8097FD;
  font-size: 24px;
  font-style: normal;
  font-weight: 290;
  line-height: normal;
}
.testcode-input-box{
  position: relative;
  display: flex;
  width: 320px;
  height: 70px;
  border-radius: 33px;
  padding-left: 20px;
  background: rgba(193, 204, 251, 0.51);

  font-family: Microsoft YaHei;
  color: #8097FD;
  font-size: 24px;
  font-style: normal;
  font-weight: 290;
  line-height: normal;
}
.testcoed-text{
  position: relative;
  display: flex;
  width: max-content;
  height: 35px;
  margin-left: 20px;

  color: #8097FD;
  font-family: Microsoft YaHei;
  font-size: 24px;
  font-style: normal;
  font-weight: 290;
  line-height: normal;
  letter-spacing: 0.12px;
}
.warning-text{
  position: relative;
  display: flex;
  width: max-content;
  height: 15px;
  margin-left: 20px;
  margin-top: 5px;

  color: #888;
  font-family: Microsoft YaHei;
  font-size: 12px;
  font-style: normal;
  font-weight: 290;
  line-height: normal;
  letter-spacing: 0.06px;
}

/* 底部按钮按钮 */
.button{
  position: relative;
  display: flex;
  width: 510px;
  height: 40px;
  margin-top: 12px;
}
.button-text{
  position: relative;
  display: flex;
  width: max-content;
  height: 100%;
  margin-left: 240px;

  color: #8097FD;
  font-family: Microsoft YaHei;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.change-button{
  position: relative;
  display: flex;
  width: max-content;
  height: 20px;
  margin-left: 30px;
  margin-top: 20px;

  color: #888;
  font-family: Microsoft YaHei;
  font-size: 14px;
  font-style: normal;
  font-weight: 290;
  line-height: normal;
}

/* 短信登陆和忘记密码的提示按钮 */
.warning-board{
  position: relative;
  display: flex;
  width: 480px;
  height: 20px;
  margin-top: 20px;
  align-items: center;
}
.warning-button{
  position: relative;
  display: flex;
  width: max-content;
  height: 20px;
  margin-left: 10px;

  color: #8097FD;
  font-family: Microsoft YaHei;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.575px;
}
</style>
