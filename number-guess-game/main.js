//랜덤번호 지정
//유저가 번호를 입력한다. go라는 버튼을 누름  <-UI가 필요함
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호가 < 유저번호면 DOWN!!
//랜덤번호가 > 유저번호 UP!!
//RESET 버튼을 누르면 게임이 리셋된다
//5번의 기회를 다 쓰면 게임이 끝난다. (더이상 추측 불가, 버튼이 disabel)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면 알려준다. 그리고 기회를 깎지 않는다.


//랜덤번호를 저장해줄 변수 만들기

let computerNum = 0;
let playbutton = document.getElementById("play-button")   //가보자고 버튼을 눌렀을때 이벤트가 발생해야하므로
/* document는 쉽게말해 웹페이지 그자체. 다큐멘트안에서 플레이버튼이라는 아이디를 선택하게할거임
 getElementById는 아이디를 통해 가져오는 방식중 하나임 
 getElementByclassName 클래스 이름을  통해 가져오는 방식
 querySelector : id, class 태그 등 다양한 방식으로 선택 가능*/
let userInput = document.getElementById("user-input")
let resultarea = document.getElementById("result-area")
let resetButton = document.getElementById("reset-button")
let chances = 5 //기회가 몇번인지 저장하기 남은기회 5번
let gameOver = false 
let chancearea = document.getElementById("chance-area")
let history=[] //유저가 그전에 어떤 숫자를 입력해왔었는지를 알아야함 값이 여러개 들어가니깐 []어레이형식으로

playbutton.addEventListener("click",play)
/* playbutton에다가가 이벤트를 더해줘 : addEventListener(이벤트이름,이벤트발생시실행함수)
play라는 함수없으니깐 밑에서 play 함수 만들어주자 
play 함수를 매개변수로 넘김 근데 함수가 매개변수로서 변수로 들어가면 () 빼줘야함 
그래서 playbutton.addEventListener("click",play())  이렇게 play() 쓰면 함수처럼 실행되서임 */
resetButton.addEventListener("click",reset)

userInput.addEventListener("focus",function(){userInput.value=""}) //포커스 이벤트가 된다면 유저인풋의 밸류를 펑션에 없애주겠다.
// 함수이름 설정안한거는 여기서만 잠깐 쓰니깐 익명함수로 펑션() 이렇게..

function  pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100 ) +1 ;  /*math.Random은 랜덤한 숫자를 뽑을 수 있게 도와주는 함수 0~1 사이에있는 값을 픽해서줘 소숫점나옴*/
    /*Math.floor는 소숫점을 버리게 도와주는 함수*/
    /* math.random은 0~1 사이 숫자를 반환 이때 1은 포함이 안되고 1에 가까운 숫자를 반환한다. 그말은 이 프로그램은 0부터 99까지만 나온다는소리
    우리가 원하는 범위는 1~100임 그래서 +1을 해줘야 0~99에서 1~100이 된다.*/

    console.log("정답", computerNum);
}

function play() {
    let userValue = userInput.value;

    if(userValue<1 || userValue>100){
        resultarea.textContent = "1과 100사이 숫자를 입력해 주세요"
        return;  //리턴 안쓰면 찬스 깎임 리턴을 해줘야 함수 종료됨.
    }


    if(history.includes(userValue)){
        resultarea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요 "
        //includes 이미 포함한 값을 말함
        return
    }   


    chances --;  // 플레이버튼을 유저가 1번 클릭할때마다 기회가 1씩 줄어든다
    chancearea.textContent = `남은기회 : ${chances}번`
            // "" 이거는 정적인 값에 쓰고, ` 백틱을 쓰게되면은 정적인값과 동적인값을 같이 쓸수있다

    console.log("chance",chances)


    if(userValue < computerNum) {
        resultarea.textContent = "올리삼"//result area에다가 결과값을 보여준다. result area에 있는  텍스트 부분을 올리삼으로 바꿔줄거다
   
    }else if(userValue > computerNum){
        resultarea.textContent = "내리삼"

    }else {
        resultarea.textContent = "굿 맞췄삼"
        gameOver=true   //맞췄을때 게임이 끝났다는걸 알려주기 위해서.
    }
    
    history.push(userValue)  //히스토리에다가 유저값을 넣어준다.(입력한 값 히스토리 배열에 저장)
    console.log(history)

    if(chances < 1){
        gameOver = true
    }

    if (gameOver == true){
        playbutton.disabled =true;
    }
}

function reset() {
    //user input창이 깨끗하게 정리되고
    userInput.value= ""
    // 새로운 번호가 생성되고
    pickRandomNum();

    resultarea.textContent="결과값이 여기 나옵니다." //새로운 번호가 생성될때 다시 문구도 리셋
}




pickRandomNum();