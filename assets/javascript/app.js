$(document).ready(function() {

	function initialScreen() {
		startScreen = "<p class = 'text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href'#' role= '#' role='button'>Start Quiz</a></p>";
		$(".mainArea").html(startScreen);
	}//end of initialScreen

initialScreen();

//create a function, generateHTML(), that is triggered by start button
$("body").on("click", ".start-button", function(event) {
	// true
	event.preventDefault();
	clickSound.play();
	generateHTML();
	timerWrapper();
}); //end of start click

$("body").on("click", ".answer", function(event){
	//true
	clickSound.play();
	selectedAnswer = $(this).text();

	if(selectedAnswer===correctAnswers[questionCounter]) {
		//alert("correct")
		clearInterval(theClock);
		generateWin();
	}//end of if

	else{
		//alert(wrong answer)
		clearInterval(theClock);
		generateLoss();
	}//end of else
})//end of answer

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
});//close reset-button

}) //end of document

function generateLossDueToTimeOut() {
	unasweredTally++;
	gameHTML="<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);
}//end of generatelossduetotimeout

function generateWin() {
	correctTally++;
	gameHTML="<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);	
}

function generateLoss() {
	incorrectTally++;
	gameHTML="<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);
}

function generateHTML() {
	gameHTML="<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter<4) {
		questionCounter++;
		generateHTML();
		counter=30;
		timerWrapper();
	}

	else {
		finalScreen();
	}
}//end of wait

function timerWrapper() {
	theClock=setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter===0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter>0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}//end of time wrapper

function finalScreen() {
	gameHTML="<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter=0;
	correctTally=0;
	incorrectTally=0;
	unansweredTally=0;
	counter=30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter=30;
var questionArray=["What is Batmans real name?", "What is Robins real name?", "What is Harley Quinns real name?", "Who is Batmans greatest Villian?", "What is Robins favorite weapon?"];
var answerArray=[["Bruce Wayne", "Bruc Wayne", "Bruce Wyne", "Darwin"], ["Jason Todd","Dick Grayson","Bruce Wayne","Robin Hood"], ["Harlen Quinzel", "Frances Quinzel", "Harleen Quinzel", "Harley Quinzel"], ["Bane","Two-Face","Joker","Poison Ivy"], ["Baton", "Mace", "Samurai Sword", "BattleStaff"]];
var imageArray=["<img class='center-block img-right' src='assets/images/bruce.jpg'>", "<img class='center-block img-right' src='assets/images/robin.jpg'>", "<img class='center-block img-right' src='assets/images/harleen.jpg'>", "<img class='center-block img-right' src='assets/images/joker.jpg'>", "<img class='center-block img-right' src='assets/images/battlestaff.jpg'>"];
var correctAnswers=["A. Bruce Wayne", "B. Dick Grayson", "C. Harleen Quinzel", "C. Joker", "D. BattleStaff"];
var questionCounter=0;
var selectedAnswer;
var theClock;
var correctTally=0;
var incorrectTally=0;
var unansweredTally=0;
var clickSound=new Audio("");