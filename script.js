let questionNum = 0;
let score = 0;

//start quiz. remove the first page and show question and answers, question number and score
function startQuiz(){
  $(".startButton").on("click", function(event) {
    $(".startQuiz").hide();
    $(".hideForm").toggle();
    $("#question").text(1);
    renderQuestion();
    event.preventDefault();
  });
}

//render questions and answers.
function renderQuestion() {
  $('.QAform').html(' ');
  if (questionNum < STORE.length) {
    $('.QAform').html(`<p>${STORE[questionNum].question}</p>
      <form>
        <fieldset>
          <label>
            <input type="radio" value="${STORE[questionNum].answers[0]}" name="answer" required>
            <span>${STORE[questionNum].answers[0]}</span>
          </label>

          <label>
            <input type="radio" value="${STORE[questionNum].answers[1]}" name="answer" required>
            <span>${STORE[questionNum].answers[1]}</span>
          </label>
          
          <label>
            <input type="radio" value="${STORE[questionNum].answers[2]}" name="answer" required>
            <span>${STORE[questionNum].answers[2]}</span>
          </label>

          <label>
            <input type="radio" value="${STORE[questionNum].answers[3]}" name="answer" required>
            <span>${STORE[questionNum].answers[3]}</span>
          </label>
          <button type = "submit" class="submitButton">Submit</button>
        </fieldset>
      </form>`)
  }
  else {
    retakeQuiz();
  };
}

//validate answer
$('.mainBox').on("submit", function(event){
  event.preventDefault();
  let correctAnswer = STORE[questionNum].correctAnswer;
  let selectedAnswer = $('input:checked').val();
  if (selectedAnswer === correctAnswer){
    handlecorrectAnswer();
  }
  else {
    handleWrongAnswer();
  }
});

//feedback for correct answer
function handlecorrectAnswer(){
  $('.QAform').html(`
  <img class = "icon circle" src = "https://github.com/katngo/catquiz/blob/master/cat-broke-vase.jpg?raw=true" alt = "cat broke the vase"></img>
  <p>Hmm...you're not bad at all</p>
  <button type = "button" class = "nextButton">Next</button>`);
  updateScore();
}

//feedback for wrong answer
function handleWrongAnswer(){
  $('.QAform').html(`
  <img class = "icon circle" src = "https://github.com/katngo/catquiz/blob/master/cat-tapping-tail.jpg?raw=true" alt = "cat tapping his tail"></img>
  <p>Try harder, hooman!</p>
  <p> The correct answer is  `+ STORE[questionNum].correctAnswer +`</p>
  <button type = "button" class = "nextButton">Next</button>`);
}

//calculate question number
$('.QAform').on('click', '.nextButton', function(event){
  questionNum++;
  if (questionNum < 10){
    $("#question").text(parseInt($("#question").text())+1);
  }
  renderQuestion();
  event.preventDefault();
});

//update score 
function updateScore(){
  score++;
  $('#score').text(score);
}

//reload page to start quiz over
function retakeQuiz(){
  $('.QAform').html(`
  <img class = "icon circle" src = "https://miro.medium.com/max/1313/0*N8iDk2f_QVaUMo7e.jpg" alt = "cat jumping to the box"></img>
  <p>That's it for now, hooman.</p>
  <p>You answered ${score} out of 10 questions correctly.</p>
  <button type = "button" id = "retake">Try Again</button>`);
  $('.mainBox').on("click", "#retake", function(event) {
    location.reload();
  });
}

//run the quiz
startQuiz();



