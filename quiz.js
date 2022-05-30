(function () {

    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const quizTimer = document.getElementById('timer');
    const beginButton = document.getElementById('begin');
    const quizMessage = document.getElementById('quizMessage');
    const nextButton = document.getElementById("next");
    const mainContainer = document.getElementById("mainConatiner");
    const wrongAnswer = document.getElementById("wrongAnswer");
    const rightAnswer = document.getElementById("rightAnswer");

    var quizScore = 100;
    var quizComplete = false;





    //array to store all questions
    const quizQuestions = [
        {
            question: "HTML stands for -",
            answers: {
                a: "HighText Machine Language",
                b: "HyperText and links Markup Language",
                c: "HyperText Markup Language",
                d: "None of these"
            },
            correctAnswer: "c"
        },
        {
            question: "The property in CSS used to change the text color of an element is?",
            answers: {
                a: "bgcolor",
                b: "color",
                c: "background-color",
                d: "All of the above"
            },
            correctAnswer: "b"
        },
        {
            question: "Are the negative values allowed in padding property?",
            answers: {
                a: "Yes",
                b: "No",
                c: "Can't say",
                d: "May be"
            },
            correctAnswer: "b"
        },
        {
            question: "Which of the following variables takes precedence over the others if the names are the same",
            answers: {
                a: "Global variable",
                b: "The local element",
                c: "The two of the above",
                d: "None of the above"
            },
            correctAnswer: "b"
        },
        {
            question: "Which of the following number object function returns the value of the number?",
            answers: {
                a: "toString()",
                b: "valueOf()",
                c: "toLocaleString()",
                d: "toPrecision()"
            },
            correctAnswer: "b"
        }

    ];
    
    //answer map
    var answerMap = new Map;
    answerMap.set('question0', 'c').
        set('question1', 'b').
        set('question2', 'b').
        set('question3', 'b').
        set('question4', 'b');

    function buildQuiz() {
        const output = [];

        // looping through each questions and its index as questionNumber
        quizQuestions.forEach(
            (currentQuestion, questionNumber) => {

                const answers = [];

                // for each answer
                for (choice in currentQuestion.answers) {
                    // add an HTML radio button
                    answers.push(
                        `<label>
                                <input type="radio" name="question${questionNumber}" value="${choice}" >
                                ${choice} :
                                ${currentQuestion.answers[choice]}
                                </label>`
                    );
                }

                // add this question and its answers to the output
                output.push(
                    `<div class="screen">
                             <div class="question"> ${currentQuestion.question} </div>
                             <div class="answers"> ${answers.join("")} </div>
                             </div>`
                );
            }
        );

        //add to question container
        quizContainer.innerHTML = output.join('');
    }

    function showResults() {

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else {
                // color the answers red
                answerContainers[questionNumber].style.color = 'red';
                quizScore = quizScore - 15;
            }
        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    function showSlide(n) {
        const slides = document.querySelectorAll(".screen");
        slides[currentSlide].classList.remove('active-screen');
        slides[n].classList.add('active-screen');
        currentSlide = n;

        if (currentSlide === slides.length - 1) {
            mainContainer.style.display = 'none';
            resultsContainer.style.display = 'block';
            quizComplete = true

        }
        else {
            mainContainer.style.display = 'block';
            resultsContainer.style.display = 'none';
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }


    //remove 20 from quiz score if wrong answer
    function updateQuizScore() {
        quizScore = quizScore - 20;
    }

    //quiz count down
    function quizTimerCountDown() {
        var countDownTimer = setInterval(function () {
            if (quizScore <= 1 || quizComplete == true) {
                clearInterval(countDownTimer);
            }
            quizScore -= 1;
            quizTimer.innerHTML = quizScore;
        }, 1000);
    }

    function getSelectedAnswer(slectedAnswer) {
        var questionNumber = slectedAnswer.target.attributes["name"].value;
        var answerSelected = slectedAnswer.target.attributes["value"].value;
        var correctAnswer = '';
        correctAnswer = answerMap.get(questionNumber);
        //evaluate answer
        if (correctAnswer == answerSelected) {
            //showNextSlide();
            wrongAnswer.style.display = 'none';
            rightAnswer.style.display = 'inline';
        }
        else {
            wrongAnswer.style.display = 'inline';
            rightAnswer.style.display = 'none';
            updateQuizScore();
        }
    }

    
    function beginQuiz() {
        quizMessage.style.display = 'none';
        wrongAnswer.style.display = 'none';
        rightAnswer.style.display = 'none';
        quizTimer.innerHTML = quizScore;
        //quiz timer is set and quiz status is incomplete
        quizTimerCountDown();
        mainContainer.style.display = 'block';
        document.querySelectorAll("input[type='radio']").forEach((input) => {
            input.addEventListener('change', getSelectedAnswer);
        });
        
    }
    
    // Kick things off
    buildQuiz();


    let currentSlide = 0;

    // Show the first slide
    showSlide(currentSlide);
    mainContainer.style.display = 'none';


    // Event listeners
    submitButton.addEventListener('click', showResults);
    nextButton.addEventListener("click", showNextSlide);
    beginButton.addEventListener("click", beginQuiz);

})();
