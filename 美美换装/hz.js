//// 结构加载完执行
window.onload = function(){
    //// 切换衣服
    let liObj = window.document.querySelectorAll("div#robe ul li");
    let changeObj = window.document.querySelectorAll("div#robe ol li");
    let hzObj = window.document.querySelectorAll("div#robe ol li img");
    
    
    liObj.forEach(function(item,index){
        item.onclick = function(){
            console.log(1);
            liObj.forEach(function(item,index){
                item.setAttribute("Class","")
            })
            item.setAttribute("Class","active");
            changeObj.forEach(function(item,index){
                item.setAttribute("Class","")
            })
            changeObj[index].setAttribute("Class","active");
        }
    })

    hzObj.forEach(function(item,index){
        item.onclick = function(){
            let img = this.getAttribute("src");
            let logo = this.parentNode.getAttribute("Class");
            if(logo == "tf"){
                document.querySelector("div#model div.tf img").setAttribute("src",img);
            }else if(logo == "sy"){
                document.querySelector("div#model div.sy img").setAttribute("src",img);
            }else if(logo == "qz"){
                document.querySelector("div#model div.qz img").setAttribute("src",img);
            }else if(logo == "wz"){
                document.querySelector("div#model div.wz img").setAttribute("src",img);
            }else if(logo == "xz"){
                document.querySelector("div#model div.xz img").setAttribute("src",img);
            }
        }
    })
}