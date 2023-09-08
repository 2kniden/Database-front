<template>
  <!--注册页面-->
  <div class="background">
    <!--输入信息的底板-->
    <div class="borad">
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
        <input class="input-box" style="margin-top: 10px;" placeholder="手机号"/>

        <!--验证码输入框，与上面不同-->
        <div class="input-box" style="border-radius: 0;background-color: #F1F3FF;padding-left: 0">
          <!--验证码输入框-->
          <input class="testcode-input-box" v-model="Form.verificationCode"/>
          <!--验证码发送文字-->
          <div class="testcoed-text" @click="getPhoneCode" v-if="Form.showCode">发送验证码</div>
          <div class="testcoed-text" v-if="Form.showCode === false">{{ Form.count }}</div>
        </div>

        <input class="input-box" placeholder="密码"/>
        <div class="warning-text">*要求密码中包含大小写字母和数字，至少8位</div><!--提示栏-->
        <input class="input-box"  style="margin-top: 5px;" placeholder="确认密码"/>
        <div class="warning-text">*要求此次密码和上次一致</div><!--提示栏-->
      </div>

      <!--按钮部分-->
      <div class="button">
        <div class="button-text" @click="gotoLoginPage">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "missPass",
  components:{

  },
  data(){
    return{
      Form: {
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
    gotoLoginPage(){
      let that = this;
      if(that.Form.verificationCode === that.Form.contentText){
        this.$router.push("/login");
      }
    },
    getPhoneCode(){
      // 如果未输入手机号，结束执行
      if (this.Form.phone == "") {
        alert("未输入手机号")
        return;
      }
      // 获取随机数（6位数字）
      let numCode = "";
      for (let i = 0; i < 6; i++) {
        numCode += Math.floor(Math.random() * 10);
      }
      // 存储发送的验证码,用于验证输入的手机验证码是否和本地存储的相同
      this.Form.contenttext = numCode;
      // 向手机号发送验证码传入的参数
      let phoneCode = new FormData();
      let content = "您的验证码是："+numCode+"。请不要把验证码泄露给其他人。";
      phoneCode.append("account",this.APIID);
      phoneCode.append("password",this.APIKEY);
      phoneCode.append("mobile",this.Form.phone);
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
              if (!this.Form.timer) {
                this.Form.showCode = false;
                this.Form.count = TIME_COUNT;
                this.Form.timer = setInterval(() => {
                  if (
                      this.Form.count > 0 &&
                      this.Form.count <= TIME_COUNT
                  ) {
                    this.Form.count -= 1;
                  } else {
                    this.Form.showCode = true;
                    clearInterval(this.Form.timer);
                    this.Form.timer = null;
                  }
                }, 1000);
              }
            }
          })
    },
  }
}
</script>

<style scoped>
.background{
  position: absolute;
  width: 100vw;
  height: 100vh;

  background-image: url("../../assets/login/register-background.png");
  background-size: cover;
}
.borad{
  position: relative;
  display: flex;
  flex-direction: column;
  width:580px;
  height: 595px;
  margin-left: 1020px;
  margin-top: 160px;
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
  height: 385px;
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
  width: 280px;
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
</style>
