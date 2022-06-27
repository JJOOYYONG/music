




$(document).ready(function (){
   getlist();
});

function save_url(){
    let url = $("#music_url").val();
    console.log(url)
    $.ajax({
       url:"/save_url",
       data:{'url_give':url},
       type:"POST",
       success:function (result){
            alert(result['msg']);
            window.location.reload()
        }
    });
}
let frame;
let lists;
let len ;
let audio ;
let deg = 45;
function getlist(){
    $.ajax({
       url:'/get_list',
       data:{},
       type:'GET',
       success:function (result){
           let data = result['list'];
           let temp='';
           if(data.length ==0){
                temp =`<article>
                          <span>등록된 곡이 없습니다 X-X</span>
                       </article>`
               $("#wrap").append(temp);
           }else{
                for(let i=0;i<data.length;i++){
                    let img =data[i]["img"];
                    let title = data[i]["title"];
                    let artist = data[i]["artist"];

                    temp=`<article style="transform:rotate(${deg * i}deg) translateY(-100vh)">
                            <div class="inner">
                                <div class="pic" style="background-image: url('${img}')">
                                    <div class="dot"></div>
                                </div>
                                <div class="txt">
                                    <h2>${title}</h2>
                                    <p>${artist}</p>
                                    <ul>
                                        <li class="pause">
                                            <i class="fas fa-pause" onclick="pause(this);"></i>
                                        </li>
                                        <li class="play">
                                            <i class="fas fa-play" onclick="play(this);"></i>
                                        </li>
                                        <li class="load">
                                             <i class="fas fa-redo-alt" onclick="load(this)"></i>
                                        </li>
                                    </ul>
                                    <audio src ="../static/music/Blizzards.mp3"></audio>
                                </div>
                            </div>
                        </article>`
                    $("#wrap").append(temp);
                }
                frame = document.querySelector("section");
                lists = frame.querySelectorAll("article");
                len = lists.length;
                audio= frame.querySelectorAll("audio");
           }

        }
    });
}

function prev(){
    initMusic();
    num++;
    frame.style.transform=`rotate(${deg*num}deg)`;
    (active == 0)?active = len : active--;
    activation(active,lists);
}
function next(){
    console.log(active);
    initMusic();
    num--;
    frame.style.transform=`rotate(${deg*num}deg)`;
    (active == len)?active = 0: active++;
    activation(active,lists);
}

let num = 0 ;
let active = 0;
function activation(index,lists){
    for (let el of lists){
        el.classList.remove("on");
    }
    lists[index].classList.add("on");
}

function initMusic(){
    for(let el of audio){
        el.pause();
        el.load();
        el.parentElement.previousElementSibling.classList.remove("on");
    }
}




function play(e){
    let isActive = $(e).currentTarget.closest("article").querySelector(".pic").classList.add("on");
    if(isActive){
        $(e).currentTarget.closest("article").querySelector("audio").play();
    }

}
function pause(e){
    let isActive = $(e).currentTarget.closest("article").querySelector(".pic").classList.remove("on");
    if(isActive) {
        $(e).currentTarget.closest("article").querySelector("audio").pause();
    }
}

function load(e){
     let isActive = $(e).currentTarget.closest("article").querySelector(".pic").classList.add("on");
     if(isActive){
         $(e).currentTarget.closest("article").querySelector("audio").load();
         $(e).currentTarget.closest("article").querySelector("audio").play();
     }
}



