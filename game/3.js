//获取标签对象
let bodyObj = document.querySelector("body");
let hotDog=document.querySelector("img.hotdog");
let sc = document.querySelector("img.sc");
let showDog = document.querySelector("p.dog");

//--------------------------------------------main
//王思聪移动
scMove();

//热狗出现
let foodT = window.setInterval(function () {
    creatHotDog()
},700)

//吃狗子
scEatHotdog()

//热狗掉下
HotDogdrop()


//--------------------------------------------main
//随机数函数
function random(Max,Min) {
    return Math.floor(Math.random()*(Max-Min+1)+Min);
}

//王思聪移动
function scMove(){
    // window.onmousemove = function(evt){
    //     let e = evt || window.event;
    //     console.log(e.clientX);
    // }
    bodyObj.onmousemove = function(evt){
        let e = evt || window.event;
        let pos = e.clientX-sc.clientWidth/2;
        if(pos<=0) pos = 0;
        if(pos>=window.innerWidth-sc.clientWidth) pos = window.innerWidth-sc.clientWidth;
        sc.style.left=pos+"px";
        // console.log(e.clientX);
    }
}

//随机出现热狗
let hd = 0;
let hg = 0;
function creatHotDog() {
    let nums =random(0,9);

    let hotpos = Math.floor(Math.random()*(window.innerWidth-sc.clientWidth-0+1)+0)
    var newHotDogObj = document.createElement("img");
    if ([6,8].includes(nums)) {
        newHotDogObj.src = "./image/cup.jpg";
        newHotDogObj.width = hotDog.width;
        newHotDogObj.style.position = "absolute"
        newHotDogObj.style.left = hotpos+"px"
        newHotDogObj.style.top = 0+"px"
        newHotDogObj.className = "hg"
        newHotDogObj.setAttribute("type","hg")
        hg++;
    }else{
        newHotDogObj.src = "./image/hotdog.jpg";
        newHotDogObj.width = hotDog.width;
        newHotDogObj.style.position = "absolute"
        newHotDogObj.style.left = hotpos+"px"
        newHotDogObj.style.top = 0+"px"
        newHotDogObj.className = "hd"
        newHotDogObj.setAttribute("type","hd");
        hd++;
    }
    bodyObj.appendChild(newHotDogObj);

    //最佳显示
    showDog.innerHTML = `热狗：${hd} & 冠军：${hg}`
}

//热狗下掉
function HotDogdrop() {
    window.setInterval(function () {
        let AllimgObj = window.document.querySelectorAll("img.hd,img.hg");
        AllimgObj.forEach((item,index)=>{
            let top = parseInt(item.style.top) + 2;
            item.style.top =top +"px";
            if(top>=window.innerHeight){
                bodyObj.removeChild(item);
            }
        })
    })
}

//王思聪吃热狗
function scEatHotdog() {
    score = 0;
    window.setInterval(function () {
        let AllimgObj = window.document.querySelectorAll("img.hd,img.hg")
        AllimgObj.forEach(function (item,index) {
            let imgX  = parseInt(item.style.left);
            let imgY  =parseInt(item.style.top) + item.offsetHeight;
            let scX = parseInt(sc.style.left);
            let scY = (window.innerHeight||document.documentElement.clientHeight) - sc.offsetHeight;

            if (imgX>scX && imgX<=scX+sc.offsetWidth && imgY>scY) {
                let type = item.getAttribute('type')
                type == 'hg' ? score+=5 : score++;

                let count = document.querySelector(".countdown");
                count.innerHTML = `分数：${score}`
                bodyObj.removeChild(item) 

                //加特效--------------吃到   +1
                let divObj = window.document.createElement("div")
                divObj.innerText = type == "hg"? "+5" : "+1";
                divObj.style.left = scX + sc.offsetWidth+"px";
                divObj.className = "show-score"

                bodyObj.appendChild(divObj);
                window.setTimeout(function () {
                    bodyObj.removeChild(divObj)
                },1000)
            }
        })
    })
}




// -------------main
//倒计时
let s= 4;
function GameT() {
    return setInterval(() => {
        s--
        let gameScoreObj = document.querySelector('p.time')
        if (s>=0) {
          gameScoreObj.innerText = `倒计时：${s}`
        }else {
          clearInterval(gameT) // 1-清除游戏倒计时
          clearInterval(foodT) // 2-清除随机食物
          s = 4;        // 3-重置游戏60s
          // 4-展示重新开始面板
          let payPanel = document.querySelector('.play-panel')
          let payPanelStop = payPanel.querySelector('.stop')
          payPanel.querySelector('.score').innerText = score+'分'
          payPanel.style.display =  payPanelStop.style.display = 'block'
          document.querySelector('p.countdown').innerText = "分数：0"
        }
      }, 1000)
}

let gameT = GameT();

// ### 重新开始游戏
let startBtn = document.querySelector('.play-panel .stop .btn')
startBtn.onclick = function() {
  // 清空分数
  score = 0        
  hd=0;
  hg = 0;     
  document.querySelector('p.countdown').innerText = `分数：${score}`
  document.querySelector('p.dog').innerText = `热狗：0 & 冠军：0`
  // 开始游戏
  foodT = window.setInterval(function () {
    creatHotDog()
},700) 
  gameT = GameT()
  // 开启面板
  let payPanel = document.querySelector('.play-panel')
  let payPanelStop = payPanel.querySelector('.stop')
  payPanel.style.display =  payPanelStop.style.display = 'none'
}

