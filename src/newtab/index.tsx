import { useState } from "react"
import date from "../utils/time"
import "./style.css"


function IndexNewtab() {
  const [data, setData] = useState("")
  let time = date('Y-m-d h:i',new Date().getTime())
  let sreachtxt = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd="+data
  let sreachChange = function(e:any){
    setData(data=> data = e.target.value)
    console.log(sreachtxt)
  }
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
        <input value={data} onChange={(e)=>sreachChange(e)} className="sreach" type="text" />
        <a  href={sreachtxt}>百度搜索</a>
        </div>
        <div className="down"></div>
        </div>
        <div className="right"></div>
      </div>
      <div className="footer"></div>
    </div>
  )
}


export default IndexNewtab
