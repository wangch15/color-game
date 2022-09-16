const startPage = document.querySelector('.start-page')
const gamePage = document.querySelector('.game-page')
const scorePage = document.querySelector('.score-page')

const startBtn = document.querySelector('#game-start')
const againBtn = document.querySelector('#play-again')
const timer30 = document.getElementById('time-count')
const score = document.getElementById('score-count')

const gameBox = document.getElementById('gamebox')

const resultImg = document.querySelector('.result-img')
const resultH1 = document.querySelector('.result-box-h1')
const resultP = document.querySelector('.result-box-p')

//設定遊玩時間
var timeSet = 30
//設定製造各種等級的方塊函式
function makebox(lv, quantity, difficulty) {
    //方塊個數
    let num = Math.floor((Math.random() * quantity))

    for (let index = 0; index < quantity; index++) {
        //特殊方塊
        if (index == num) {
            gameBox.innerHTML = gameBox.innerHTML + `
                        <div class="randombox lv${lv} mask-${difficulty} answer"></div>
                        `
        } else {
            gameBox.innerHTML = gameBox.innerHTML + `
                        <div class="randombox lv${lv}"></div>
                        `
        }
    }

    // //設定方塊隨機顏色的RGB數據
    // var rgb_r = Math.floor((Math.random() * 256))
    // var rgb_g = Math.floor((Math.random() * 256))
    // var rgb_b = Math.floor((Math.random() * 256))
    // //將隨機數據丟入每個完成生成的色塊
    // let randomBox = document.querySelectorAll('.randombox')
    // for (let i = 0; i < randomBox.length; i++) {
    //     randomBox[i].style.backgroundColor = `rgb(${rgb_r}, ${rgb_g}, ${rgb_b})`
    // }

    //設定方塊隨機顏色的HSL數據 //可自己控制彩度明度
    var hsl_h = Math.floor((Math.random() * 360))
    var hsl_s = Math.floor((Math.random() * 75)) + 25
    var hsl_l = Math.floor((Math.random() * 65)) + 15

    //將隨機HSL數據丟入每個完成生成的色塊
    let randomBox = document.querySelectorAll('.randombox')
    for (let i = 0; i < randomBox.length; i++) {

        randomBox[i].style.backgroundColor = `hsl(${hsl_h},${hsl_s}%,${hsl_l}%)`
    }

}

//點擊開始按鈕，頁面跳轉
startBtn.addEventListener('click', function () {
    startPage.classList.remove('displayflex')
    startPage.classList.add('displaynone')
    gamePage.classList.remove('displaynone')
    gamePage.classList.add('displayflex')


    if (gamePage.classList.value.includes('displayflex')) {
        //設置倒數計時執行時會扣秒數的函式

        timer30.innerHTML = timeSet

        function aSecond() {
            timer30.innerHTML = timer30.innerHTML - 1

            var num = Math.floor((Math.random() * 4))
            
            //如果倒數==0, 停止倒數
            if (timer30.innerHTML == 0) {
                clearInterval(timer)
                gameBox.innerHTML = ''
                gamePage.classList.add('displaynone')
                gamePage.classList.remove('displayflex')
                scorePage.classList.remove('displaynone')
                scorePage.classList.add('displayflex')
                console.log(score.innerHTML)

            }

            //倒數結束後輸出結果
            let resultAnimal
            let scoreNumber = score.innerHTML
            scoreNumber = Number(scoreNumber)
            if (scoreNumber >= 45) {
                resultImg.src = "./img/6.jpg"
                resultAnimal = '鷹眼'
                resultP.innerHTML = `太厲害了！請容許我叫你一聲大哥`
            } else if (scoreNumber < 45 && scoreNumber >= 35) {
                resultImg.src = "./img/5.png"
                resultAnimal = '老虎'
                resultP.innerHTML = `你的眼睛很利嘛，不簡單`
            } else if (scoreNumber < 35 && scoreNumber >= 25) {
                resultImg.src = "./img/4.png"
                resultAnimal = '老貓'
                resultP.innerHTML = `貓科動物是你嗎大佬`
            } else if (scoreNumber < 25 && scoreNumber >= 15) {
                resultImg.src = "./img/3.png"
                resultAnimal = '老狗'
                resultP.innerHTML = `眼睛還算堪用啦，下次再努力點，汪`
            } else if (scoreNumber < 15 && scoreNumber >= 10) {
                resultImg.src = "./img/2.png"
                resultAnimal = '鼴鼠'
                resultP.innerHTML = `你是因為住土裡所以眼睛退化了嗎？摳連`
            } else if (scoreNumber < 10 && scoreNumber > 0) {
                resultImg.src = "./img/1.png"
                resultAnimal = '蝙蝠'
                resultP.innerHTML = `啊你是都在聽音辨位喔，走路不用看馬路？`
            } else if (scoreNumber == 0) {
                resultImg.src = "./img/0.png"
                resultAnimal = '瞎子'
                resultP.innerHTML = `都給你30秒了你還可以零分，還敢混啊你，給我專心玩`
            } resultH1.innerHTML = `您獲得了 ${scoreNumber} 分，根本是 ${resultAnimal} 等級`


        }
        //開始倒數計時並執行上列會扣秒數的函式
        var timer = setInterval(aSecond, 1000)

        //根據條件製造色塊
        function makeLvBox() {
            if (score.innerHTML == 0) {
                makebox(1, 4, 'easy')
                playing()
            } else if (score.innerHTML == 1) {
                makebox(2, 9, 'easy')
                playing()
            } else if (score.innerHTML == 2) {
                makebox(3, 16, 'normal')
                playing()
            } else if (score.innerHTML >= 3 && score.innerHTML < 5) {
                makebox(4, 25, 'normal')
                playing()
            } else if (score.innerHTML >= 5 && score.innerHTML < 7) {
                makebox(5, 36, 'normal')
                playing()
            } else if (score.innerHTML >= 7 && score.innerHTML < 10) {
                makebox(6, 49, 'hard')
                playing()
            } else {
                makebox(7, 64, 'hard')
                playing()
            }
        }

        //先調出製造色塊的函數，跑一次
        makeLvBox()

        //取得色塊資訊，並設置點擊事件
        function playing() {
            let randomBox = document.querySelectorAll('.randombox')
            //綁定個別色塊的點擊事件
            for (let i = 0; i < randomBox.length; i++) {
                randomBox[i].onclick = function () {
                    if (randomBox[i].classList.value.includes('answer')) {
                        gameBox.innerHTML = ''
                        let scoreNumber = score.innerHTML
                        scoreNumber = Number(scoreNumber)
                        score.innerHTML = scoreNumber + 1
                        makeLvBox()
                    }
                }
            }
        }
    }

})

againBtn.addEventListener('click', function () {
    score.innerHTML = ''
    timer30.innerHTML = timeSet
    scorePage.classList.add('displaynone')
    scorePage.classList.remove('displayflex')
    startPage.classList.remove('displaynone')
    startPage.classList.add('displayflex')
})
