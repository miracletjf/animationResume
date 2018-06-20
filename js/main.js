let code = `/*
 * 面试官你好，我是 Miracletjf
 * 我将以动画的形式来介绍自己
 * 只用文字来介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */

/* 首先给所有元素加上动画过渡 */
* {
  transition: all 0.8s;
}
/* 白色背景太单调了，增加点背景色 */
html {
  background: #272822; 
}
*{
  color: #fff; 
}
`
let code2 = `/* 增加内边距 */
#codeBox {
  padding: 16px;
  height: 100%;
  overflow: auto;
}
/* 增加一些边框和阴影 */
#codeBox {
  border: solid 1px #eee;
  box-shadow: 4px 4px 18px rgba(255,255,255,.25);
}
/* 增加一些代码高亮 */
.token.comment { color: slategray; }
.token.selector { color: #a6e22e; }
.token.punctuation { color: #f8f8f2; }
.token.property { color: #f92672; }
.token.function { color: #e6db74; }
/* 增加一些3D效果 */
html {
  perspective: 1000px;
}
#codeWrap {
  transform: rotateY(5deg);
  transform-origin: left;
}
/* 接下来我们来准备一张白纸 */
#codeWrap {
  width: 50%;
}
.paper {
  padding: 16px;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: auto;
}
/* 接下来 我们开始 写简历*/
/* 我们使用 markdown 语法来写 */
`
let code4 = `/* 接下来我将使用 mark.js
* 将 markdown 语法转为 HTML 
*/`;
let contentText =`
## MiracleTjf
高级前端开发工程师，有良好的编码习惯和编码风格，热爱新技术，并致力于不断提高自己。

## 技能
- 熟练使用html/css/javaScript
- 了解 http，命令行，基本算法等相关知识
- 对 mvvm 框架 有一定的了解 ，并且 熟练 使用 vue
- ...

## 工作经历
1. 创业
2. on

## 作品集
- [wwww](https://ws1.sinaimg.cn/large/005NgZr8gy1fsi4x0sgqoj308i030t8k.jpg)
- [wwww](https://ws1.sinaimg.cn/large/005NgZr8gy1fsi4x0sgqoj308i030t8k.jpg)

## 联系方式
- miracletjf@gmail.com
` 


let codeBox = document.getElementById('codeBox');
let styleWrap = document.getElementById('styleWrap');

addTextAnimateCode('',code,
  (res)=>{
    addTextAnimateCode(res,code2,'css',
    (res)=>{
      let paperWrap = document.createElement('div');
      paperWrap.id = 'paperWrap';

      let paper = document.createElement('pre');
      paper.className = 'paper';
      paper.id = 'paper';
      
      paperWrap.appendChild(paper);
      document.body.appendChild(paperWrap);
      addTextAnimateContent(contentText,(res)=>{
        let markedHtml = marked(document.getElementById('paper').innerHTML);
        paper.remove();
        let paperMd = document.createElement('div');
        paperMd.className = 'paper';
        paperMd.innerHTML = markedHtml;
        paperWrap.appendChild(paperMd);
      })
    })
  })

function addTextAnimateCode(resString,codeString,comp,callback){
  let n = 0;
  if(typeof comp === 'function'){
    callback = comp;
    comp = '';
  }
  const timer = setInterval(()=>{
    n++;
    let result = resString + codeString.slice(0,n);
    styleWrap.innerHTML = result;
    codeBox.innerHTML = compFn(comp,result);
    codeBox.scrollTop = codeBox.scrollHeight;
    if(n>=codeString.length){
      window.clearInterval(timer);
      if(typeof callback === 'function')
      callback(result);
    }
  },2)
}

function addTextAnimateContent(textString,callback){
  let n = 0;
  let paper = document.getElementById('paper');
  const timer = setInterval(()=>{
    n++;
    let result = textString.slice(0,n);
    paper.innerHTML = result;
    if(n>=textString.length){
      window.clearInterval(timer);
      if(typeof callback === 'function')
      callback(result);
    }
  },20)
}


function compFn(comp,codeString){
  if(!comp){
    return codeString;
  }
  return  Prism.highlight(codeString, Prism.languages[comp], 'javascript');
}
