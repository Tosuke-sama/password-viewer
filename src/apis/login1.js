import axios from 'axios'
import JSEncrypt from "jsencrypt";
axios.defaults.withCredentials = true
var time = 0 //登录次数
var time2 = 0
var body1 = 1
let publicKey=""
let session = ""
axios.get('',(res)=>{
    publicKey=res.data
})
var encrypt = new JSEncrypt();
encrypt.setPublicKey(publicKey);
var encodedPassword = "__RSA__"+encrypt.encrypt("Tosuke0073");
function login(url1){
    const url = url1
    const config = {
    headers:{
        "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.39',
        "Cookie":session,
        "Origin": "https://cas.paas.cdut.edu.cn",
        "ContentType":"application/x-www-form-urlencoded"
    }
  };
    const data ={
    'username': '202019060415',
    'password': encodedPassword,
    'captcha': '',
    'currentMenu': '1',
    'failN': '0',
    'mfaState': '',
    'execution': 'e1s1',
    '_eventId': 'submit',
    'geolocation': '',
    'submit': 'Login1'
  }
  if(time>=1){
    axios.get(url, config).then(res=>{
        console.log("第一次跳转完毕")
        console.log(res.status)
        login(url)
        time = 0
        time2 = 1
    })
  }
  else{
  axios.post(url, data, config)
  .then(res => {
    time++
    if(res.status==301||res.status==302){
        console.log("重定向")
        login(res.headers.location)
    }else{
        console.log("跳转完")
        console.log(res.data)

    }

  })
  .catch(err => console.log(err))
}

}
export default  login