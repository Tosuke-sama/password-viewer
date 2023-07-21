import { useState } from "react"
import date from "../utils/time"
import "./style.css"
import login from "../apis/login1"
import { Box, Button, ButtonGroup, TextField } from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';
declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'];
    };
  }

  interface Palette {
    neutral: Palette['primary'];
    bilibili:PaletteOptions['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary']
    bilibili:PaletteOptions['primary'];
  }

  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }

  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color'];
    };
  }
}
const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    bilibili:{
      main: '#fb7299',
      contrastText: '#fff',
    },
  },
});

function IndexNewtab() {
  const [data, setData] = useState("")
  let time = date('Y-m-d h:i',new Date().getTime())
  setInterval(()=>{
    time = date('Y-m-d h:i',new Date().getTime())
  },1000)

  //输入监听
  const handleSubmit = (event:any) => {
    setData(data =>data = event.target.value)
    console.log(event.target.value)
  };
  const handleKeyDown = (e:any) => {
    if (e.keyCode === 13) {
      console.log("按下了Enter键")
      href("BD")
    }
  }
  //搜索链接跳转
  const href = (name:string)=>{
    console.log(name)
    if(name=="BD"){
      window.location.href = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd="+data
    }
    if(name=="G"){
      window.location.href = "https://www.google.com/search?q="+data
    }
    if(name=="BY"){
      window.location.href = "https://www.bing.com/search?q="+data
    }
    if(name=="BILI"){
      console.log("bili")
      window.location.href = "https://www.bilibili.com"
    }
    if(name=="GIT"){
      window.location.href = "https://github.com/"
    }
    if(name=="YB"){
      window.location.href = "https://bsdt.cdut.edu.cn/EIP/nonlogin/homePage.htm"
    }
  }
  let timeTable:any = login("https://cas.paas.cdut.edu.cn/cas/login?service=http%3A%2F%2Fjw.cdut.edu.cn%2Fsso%2Flogin.jsp%3FtargetUrl%3Dbase64aHR0cDovL2p3LmNkdXQuZWR1LmNuL0xvZ29uLmRvP21ldGhvZD1sb2dvblNTT2NkbGdkeA%3D%3D");
  return (
    <div
      className="main"
      >
      <div className="header">
        <div className="head">欢迎使用成理小青年,更多功能正在开发中……</div>
      </div>
      <div className="middle">
        <div className="left"></div>
        <div className="inmiddle">
        <div className="up">
          <div className="time">
            {time}
          </div>
          <div className="sreach">
          <TextField  onKeyDown={(e)=>handleKeyDown(e)}  name="sreach" fullWidth onChange={(e)=>handleSubmit(e)} id="standard-basic" label="搜索一下" variant="standard" />
          </div>
          
       <div className="button" > 
       <ThemeProvider theme={theme}>
       <Button variant="contained" onClick={()=>href("BD")}>百度搜索</Button>
       <Button variant="contained" color="secondary" onClick={()=>href("G")}>谷歌搜索</Button>
       <Button variant="contained" color="success" onClick={()=>href("BY")}>必应搜索</Button>
       </ThemeProvider>
       </div>
        </div>
        <div className="down">
       
        <ButtonGroup  variant="text" className="buttongroup" size="large" aria-label="text button group">
        <ThemeProvider theme={theme}>
        <Button sx={{
          color:"#fb7299"
        }} onClick={()=>href("BILI")} >Bilibili</Button>
        </ThemeProvider>
        <Button sx={{
          color:"#1b1f23"}} onClick={()=>href("GIT")}  >Github</Button>
        <Button sx={{
          color:"#003c88"
        }} onClick={()=>href("YB")} >砚湖易办</Button>
      </ButtonGroup>
     
        </div>
        </div>
        <div className="right">
          
        </div>
      </div>
      <div className="footer"></div>
    </div>
  )
}


export default IndexNewtab
