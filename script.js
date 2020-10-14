const username = prompt("What is your username!?")

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const submitButton = document.getElementById('submit-btn')
const restartButton=document.getElementById('restart-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const reportContainerElement=document.getElementById('report-container')
// const candNameElement=document.getElementById('cand-name')
const timerElement=document.getElementById('timer');

const table = document.getElementById("my-table");
const resultTable=document.getElementById('result-table');

let shuffledQuestions, currentQuestionIndex,score=0;
let ansSelected=false;
let startingMinutes;
let time;
let timePerQuestion=[10*60,0,0,0,0,0];




function updateTimer(){
  const minutes=Math.floor(time/60);
  let seconds=time%60;
  seconds=(seconds<10)? '0'+seconds : seconds;

  timerElement.innerHTML=`${minutes}: ${seconds}`;
  time--;
  if(time==0){
    showResults();
  }

}

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
submitButton.addEventListener('click',showResults);
restartButton.addEventListener('click',()=>window.location.reload())

function startGame() {
  score=0;
  startButton.classList.add('hide')
  reportContainerElement.classList.add('hide');
  // candNameElement.innerText="Welcome "+ username.toString();
  startingMinutes=10
  time=startingMinutes*60
  setInterval(updateTimer,1000);
  timerElement.innerText="Remaining time: "+ "10:00"
  shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0,5);
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
  submitButton.addEventListener('click',showResults);
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
  ansSelected=false;
}

function selectAnswer(e) {
  if(ansSelected==false){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct

    setStatusClass(selectedButton, correct)
    if ( currentQuestionIndex < 4) {
      nextButton.classList.remove('hide')
    } else {
      submitButton.classList.remove('hide')
      // startButton.innerText = 'Restart'
      // startButton.classList.remove('hide')
    }
    ansSelected=true;
    console.log("score ",score);
    timePerQuestion[currentQuestionIndex+1]=time;
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
    score++;
    console.log("hello ",element);
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

function showResults(){
  questionContainerElement.classList.add('hide')
  submitButton.classList.add('hide');
  reportContainerElement.classList.remove('hide')


  restartButton.classList.remove('hide')
  let row_name = resultTable.insertRow(0);
    let r1cell1 = row_name.insertCell(0);
    let r1cell2 = row_name.insertCell(1);
    r1cell1.innerHTML=`NAME `;
    r1cell2.innerHTML=`${username}`;

    let row_score = resultTable.insertRow(1);
    let r2cell1 = row_score.insertCell(0);
    let r2cell2 = row_score.insertCell(1);
    r2cell1.innerHTML=`SCORE`;
    r2cell2.innerHTML=`${score}`;

    let row_correct = resultTable.insertRow(2);
    let r3cell1 = row_correct.insertCell(0);
    let r3cell2 = row_correct.insertCell(1);
    r3cell1.innerHTML=`Number of Correct questions`;
    r3cell2.innerHTML=`${score}`

    let row_wrong = resultTable.insertRow(3);
    let r4cell1 = row_wrong.insertCell(0);
    let r4cell2 = row_wrong.insertCell(1);
    r4cell1.innerHTML=`Number of Wrong questions`;
    r4cell2.innerHTML=`${5-score}`;
  
  for(let i=1;i<timePerQuestion.length;i++){
    console.log(Math.floor((timePerQuestion[i-1]-timePerQuestion[i])/60));
    console.log(" minutes ")
    console.log((timePerQuestion[i-1]-timePerQuestion[i])%60)
    console.log( " seconds")
    let row = table.insertRow(i);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = `${i}`;
    let mins=(Math.floor((timePerQuestion[i-1]-timePerQuestion[i])/60));
    let secs=((timePerQuestion[i-1]-timePerQuestion[i])%60)
    cell2.innerHTML = (mins>0)? `${mins} minutes ${secs} seconds`: ` ${secs} seconds`;
  }
  
  
  
}


const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'Which is best language?',
    answers: [
      { text: 'C++', correct: true },
      { text: 'Python', correct: true },
      { text: 'Java', correct: true },
      { text: 'JAVA Script', correct: true }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  },
  {
    question: 'What is 4 * 4?',
    answers: [
      { text: '6', correct: false },
      { text: '16', correct: true }
    ]
  },
  {
    question: 'What is 9 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '18', correct: true }
    ]
  },
  {
    question: 'What is 4 - 2?',
    answers: [
      { text: '6', correct: false },
      { text: '2', correct: true }
    ]
  },
  {
    question: 'What is 4 * 9?',
    answers: [
      { text: '6', correct: false },
      { text: '36', correct: true }
    ]
  },
  {
    question: 'What is 4 * 10?',
    answers: [
      { text: '6', correct: false },
      { text: '40', correct: true }
    ]
  }
]
