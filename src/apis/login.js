import request, { defaults } from "request";
import JSEncrypt from "jsencrypt";
var time = 0 //登录次数
var time2 = 0
var body1 = 1
// 开启记录cookie,重定向时自动带上cookie
request = defaults({ jar: true });
// let publicKey= `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyor3CX6A6U4EoSHawtALiJoB0CkJnb/wmVkcVT5EmNupGVrVSeJo80ZAxsgd9S1CZVXxTXtJ7XjsqnzR64Qvrn+tdvj9Ck5k/6Tnp6HoKU/AQxA3tQ5Zqw6D6ihPOyVV4z4cdK5wjzEBNPhJuTjjzP4VQ4h4VseWNbfhXGK3vSes8oNn5Wwor9r1UbEJP/ZMHrDJxAcwe0GPvebAqEp4O5ZcTtWnq+/qkoUB6z/52EnCMltoPmuMC+o3fWdICBf4q70oSDClfuhLVi4mRT2K5UUH8fsxEe6oPtkvk9vVCCOZRmo0MXpXZiIqdZOtgcBzn/0mzoNd58KxeIy0ginjfwIDAQAB`
request({
    url:"https://cas.paas.cdut.edu.cn/cas/jwt/publicKey"
},function (error, response, body) {
    publicKey = body
})

var encrypt = new JSEncrypt();
var session =""

encrypt.setPublicKey(publicKey);
var encodedPassword = "__RSA__"+encrypt.encrypt("Tosuke0073");
// console.log(encodedPassword)
// console.log(encodeURIComponent("202019060415"))
// console.log(encodeURIComponent(encodedPassword))
function login_redirect(url) {
    // console.log(encodedPassword)
    let options1 = {
        url: url,
        method: "POST",
        connection:"keep-alive",
        formData: {
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
         },
        headers: {
            "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.39',
            "Cookie":session,
            "Origin": "https://cas.paas.cdut.edu.cn",
            "ContentType":"application/x-www-form-urlencoded"
        },
        // 重定向
        //  followRedirect: false,
       
    }
    let options2 ={
        url:url,
        method: "GET",
        headers: {
            "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.39',
            "Cookie":session,
            "Origin": "https://cas.paas.cdut.edu.cn",
            "Content-Type":"application/x-www-form-urlencoded"
        },
    }
   let options={}
    if(time >=1){
        options = options2
    }
    else{
        options = options1
    }
   
    console.log(options.method)
    request(options, function (error, response, body) {
        console.log("...login_redirect.....");
        if(error){
            console.log(error)
            return
        }
        console.log("请求中")

        console.log(response.statusCode)
       
        if (response.statusCode == 302 || response.statusCode == 301) {
            time++
            console.log(time)
            // cookie1.push(response.headers["set-cookie"][0])
            session = response.headers['set-cookie'];
            login_redirect(response.headers.location);
        }
        else {
            console.log("...跳转完...");
            console.log("写入")
            if(body1){
                writeFileSync(`./body${body1}.html`, body)
            }
            body1++
            // console.log(response);
            time = 0
            if(time2 == 0){
              console.log("第二次请求")
              time2++
              login_redirect("https://cas.paas.cdut.edu.cn/cas/login?service=http%3A%2F%2Fjw.cdut.edu.cn%2Fsso%2Flogin.jsp%3FtargetUrl%3Dbase64aHR0cDovL2p3LmNkdXQuZWR1LmNuL0xvZ29uLmRvP21ldGhvZD1sb2dvblNTT2NkbGdkeA%3D%3D");
            }
            else{
                return getTimetable()
            }
           
            // if (time2 == 0) {
            //     time2++;
            //     console.log("666")
            //     login_redirect("https://jw.cdut.edu.cn/jsxsd/framework/xsMainV_new.htmlx?t1=1");
            // }
            // else {
            //     console.log("打印")
            //     console.log(response.headers);
            //     console.log(body);
            // }

        }
    });
}
 login_redirect("https://cas.paas.cdut.edu.cn/cas/login?service=http%3A%2F%2Fjw.cdut.edu.cn%2Fsso%2Flogin.jsp%3FtargetUrl%3Dbase64aHR0cDovL2p3LmNkdXQuZWR1LmNuL0xvZ29uLmRvP21ldGhvZD1sb2dvblNTT2NkbGdkeA%3D%3D");


 function getTimetable(){
    let options3 = {
        url:"https://jw.cdut.edu.cn/jsxsd/framework/mainV_index_loadkb.htmlx?rq=2023-04-12&sjmsValue=7E5976C91D9A4146930951FD11516BCC&xnxqid=2023-2024-1",
        method:"GET",
        headers: {
            "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.39',
            "Cookie":session,
            "Origin": "https://cas.paas.cdut.edu.cn",
            "ContentType":"application/x-www-form-urlencoded"
        },

    }
    request(options3, function (error, response, body) {
        console.log(response.statusCode)
        return body
    })
 }
 export default login_redirect