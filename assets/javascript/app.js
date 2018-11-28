var gTopic;
var dispTrivia = [""];
var userChoice;
var rRight;
var rWRong;
var numQAsked;
var qIndex;
var qTimeout;
var rTimerInterval;
var timeLeft;

$(".sTopicSelect").click(function () {
    gTopic = $(this).text();
    $(".instructionModal").toggleClass("is-active");
    startNewGame();
});

$(".rTopicSelect").click(function () {
    gTopic = $(this).text();
    $(".resultsModal").toggleClass("is-active");
    startGame();
});

function startNewGame() {
    pickTopicIndex();
    initializeVars();
    askNextQuestion();
}

$(".cPossible").click(function () {
    if ((rWrong + rRight) === (numQAsked - 2)) {
        clearTimeout(qTimeout);
        userChoice = $(this).text();
        var choiceSelected = true;
        letterChoice = userChoice[0];
        checkAnswer(choiceSelected, letterChoice);
    }
});

function pickTopicIndex() {
    if (gTopic === "Animals") {
        dispTrivia = animalQuestions;
    }
    else if (gTopic === "History") {
        dispTrivia = historyQuestions;
    }
    else if (gTopic === "Science") {
        dispTrivia = scienceQuestions;
    }
}

function initializeVars() {
    rRight = 0;
    rWrong = 0;
    numQAsked = 1;
    $("#rTimer").text(10);



    for (var i = 0; i < dispTrivia.length; i++) {
        dispTrivia[i].prevAsked = false;
    }
}

function askNextQuestion() {
    displayQuestion();
    takeUserAnswer();
}

function displayQuestion() {
    do {
        qIndex = Math.floor(Math.random() * dispTrivia.length);
    } while (dispTrivia[qIndex].prevAsked);

    $("#qNum").text(numQAsked);
    numQAsked++;
    $("#qAsked").text(dispTrivia[qIndex].trivQuestion);
    $("#qChoiceA").text(dispTrivia[qIndex].trivA);
    $("#qChoiceB").text(dispTrivia[qIndex].trivB);
    $("#qChoiceC").text(dispTrivia[qIndex].trivC);
    $("#qChoiceD").text(dispTrivia[qIndex].trivD);
    dispTrivia[qIndex].prevAsked = true;

    startCountdown();
}

function startCountdown() {
    timeLeft = 9;
    rTimerInterval = setInterval(function () {
        if (timeLeft < 0) {
            clearInterval(rTimerInterval);
        }
        else if (timeLeft >= 0) {
            $("#rTimer").text(timeLeft);
            timeLeft--;
        }
    }, 1000);
}

function takeUserAnswer() {
    qTimeout = setTimeout(function () {
        checkAnswer();
    }, 10000);
}

function checkAnswer(answerAttempted, selectionToCheck) {
    if (answerAttempted && (dispTrivia[qIndex].trivAnswer[0] === selectionToCheck)) {
        rRight++;
        console.log("right");
    }
    else {
        $("#wrongQuestion").text(dispTrivia[qIndex].trivQuestion);
        $("#wrongRightAnswer").text(dispTrivia[qIndex].trivAnswer);
        rWrong++

        if (answerAttempted) {
            $("#wrongModalTitle").text("Incorrect Answer");
        }
        else {
            $("#wrongModalTitle").text("Time's Up!");
        }

        $(".wrongModal").toggleClass("is-active");
    }

    var checkActive = $(".wrongModal").hasClass("is-active");
    if (checkActive) {
        var closeWrongModal = setTimeout(function () {

            $(".wrongModal").toggleClass("is-active");
            gameStillGoing();
        }, 3000);
    }
    else {
        gameStillGoing();
    }
}

function gameStillGoing() {
    if (numQAsked > 10) {
        gameOver();
        return;
    }
    else {
        askNextQuestion();
        return;
    }
}

function gameOver() {
    if ((rWrong > 0) && (rWrong < 4)) {
        $("#resultTitle").text("Nice Job!");
    }
    else if ((rWrong > 3) && (rWrong < 7)) {
        $("#resultTitle").text("Good Effort!");
    }
    else if ((rWrong > 6) && (rWrong < 10)) {
        $("#resultTitle").text("Keep Practicing!");
    }
    else if (rWrong === 10) {
        $("#resultTitle").text("Are you even trying?");
    }
    else if (rWrong === 0) {
        $("#resultTitle").text("PERFECT!");
    }
    $("#numQCorrect").text(rRight);
    $("#numQIncorrect").text(rWrong);
    $(".resultsModal").toggleClass("is-active");

}

var aQ1 = new triviaQuestion("What is the only mammal born with horns?", "Deer", "Giraffe", "Ram", "Antelope", "B. Giraffe");
var aQ2 = new triviaQuestion("What do you call a group of crows?", "A Flock", "A Herd", "A Murder", "A Crew", "C. A Murder");
var aQ3 = new triviaQuestion("Which animal has the fastest metabolism?", "A Bee", "A Hummingbird", "A Rat", "A Mantis Shrimp", "B. A Hummingbird");
var aQ4 = new triviaQuestion("An animal that lives part of its life on land and part in water is known as what?", "A Marsupial", "An Arachnid", "A Trilopod", "An Amphibian", "D. An Amphibian");
var aQ5 = new triviaQuestion("An octopus can fit through any hole larger that its what?", "Beak", "Eye", "Suction Cups", "Ink Bladder", "A. Beak");
var aQ6 = new triviaQuestion("Venison is meat from which animal?", "Lamb", "Moose", "Buffalo", "Deer", "D. Deer");
var aQ7 = new triviaQuestion("What is the largest shark currently alive?", "Megalodon", "Great White Shark", "Whale Shark", "Bull Shark", "C. Whale Shark");
var aQ8 = new triviaQuestion("What is the fastest animal in the ocean?", "Blue Whale", "Great White Shark", "Sailfish", "Barracuda", "C. Sailfish");
var aQ9 = new triviaQuestion("What is the fastest animal?", "Peregrine Falcon", "Cheetah", "Blue Whale", "Black Mamba", "A. Peregrine Falcon");
var aQ10 = new triviaQuestion("Which animal has the most legs", "A Centipede", "A Millipede", "A Caterpillar", "A Gigapede", "B. A Millipede");
var aQ11 = new triviaQuestion("Which animal has the larget eyes relative to its body?", "An Octopus", "A Tarsier", "An Owl", "A Dragonfly", "B. A Tarsier");
var aQ12 = new triviaQuestion("Which animal gives birth to the largest baby relative to its body?", "A Kiwi", "A Giraffe", "A Blue Whale", "A Giant Panda", "A. A Kiwi");
var aQ13 = new triviaQuestion("What is the national animal of Scotland?", "Loch Ness Monster", "Scottish Terrier", "Sheep", "Unicorn", "D. Unicorn");
var aQ14 = new triviaQuestion("How many hearts does an octopus have?", "One", "Two", "Three", "None", "C. Three");
var aQ15 = new triviaQuestion("Which animal has a heart?", "Nematode", "Jellyfish", "Starfish", "Annelid", "D");
var animalQuestions = [aQ1, aQ2, aQ3, aQ4, aQ5, aQ6, aQ7, aQ8, aQ9, aQ10, aQ11, aQ12, aQ13, aQ14, aQ15];

var hQ1 = new triviaQuestion("Which U.S. President declared that the last Thursday in November should be celebrated as Thanksgiving?", "Benjamiin Franklin", "Abraham Lincoln", "Franklin D. Roosevelt", "George Washington", "B. Abraham Lincoln");
var hQ2 = new triviaQuestion("Who was the first female Prime Minister of a European country?", "Joan of Arc", "Angela Merkel", "Margaret Thatcher", "Kim Clark", "C. Margaret Thatcher");
var hQ3 = new triviaQuestion("In which country was the fountain pen first used?", "China", "Egypt", "Germany", "Rome", "B. Egypt");
var hQ4 = new triviaQuestion("Tenochtitlan is now known as what city?", "Lima, Peru", "Oaxaca, Mexico", "San Salvador, El Salvador", "Mexico City, Mexicco", "D. Mexico City, Mexico");
var hQ5 = new triviaQuestion("Who was the first U.S. president who was born a citizen of the United States?", "Martin Van Buren", "John Quincy Adams", "Andrew Jackson", "William Henry Harrison", "A. Martin Van Buren");
var hQ6 = new triviaQuestion("Florence Nightingale aided the sick and wounded during which war?", "The Revolutionary War", "The French and Indian War", "The Civil War", "The Crimean War", "D. The Crimean War");
var hQ7 = new triviaQuestion("Siddhartha Gautama is believed to be the founder of what religion?", "Hinduism", "Confucianism", "Buddhism", "Jainism", "C. Buddhism");
var hQ8 = new triviaQuestion("The period of European history that lasted from the 14th to the the 17th century is known as what?", "Dark Ages", "Middle Ages", "Renaissance", "Industrial Revolution", "C. Renaissance");
var hQ9 = new triviaQuestion("What Byzantine city was renamed Istanbul after being captured by the Ottoman Empire?", "Constantinople", "Alexandria", "Beirut", "Callipolis", "A. Constantinople");
var hQ10 = new triviaQuestion("The first human-made object to land on the moon was launched by what country?", "China", "The Soviet Union", "France", "The United States", "B. The Soviet Union");
var hQ11 = new triviaQuestion("The oldest parliament in the world belongs to what country?", "Greece", "Iceland", "China", "Austria", "B. Iceland");
var hQ12 = new triviaQuestion("Brazil was once a colony of which European country?", "Portugal", "France", "Spain", "England", "A. Portugal");
var hQ13 = new triviaQuestion("The Kingdom of Joseon was founded in 1392 in what country?", "Jordan", "Mongolia", "Japan", "Korea", "D. Korea");
var hQ14 = new triviaQuestion("Which two African countries have never been colonized?", "Chad & Angola", "Ghana & Burundi", "Ethiopia & Liberia", "Senegal & Malawi", "C. Ethiopia & Liberia");
var hQ15 = new triviaQuestion("Which Native American tribe used totem poles?", "Choctaw", "Chumash", "Powhattan", "Algonquian", "D. Algonquian");
var historyQuestions = [hQ1, hQ2, hQ3, hQ4, hQ5, hQ6, hQ7, hQ8, hQ9, hQ10, hQ11, hQ12, hQ13, hQ14, hQ15];

var sQ1 = new triviaQuestion("What heavy metal element was once known as quicksilver?", "Aluminum", "Mercury", "Silver", "Potassium", "B. Mercury");
var sQ2 = new triviaQuestion("What gives red blood cells their color?", "Iron", "Oxygen", "Hemoglobin", "Carbon Dioxide", "C. Hemoglobin");
var sQ3 = new triviaQuestion("The world’s fastest growing plant is a species of what?", "Lichen", "Bamboo", "Grass", "Algae", "B. Bamboo");
var sQ4 = new triviaQuestion("Which scientist is considered the father of modern genetics?", "Dmitri Medeleev", "George Washington Carver", "Charles Darwin", "Gregor Mendel", "D. Grego Mendel");
var sQ5 = new triviaQuestion("What is the closest star to our own sun?", "Proxima Centauri", "Betelgeuse", "Polaris", "Sirius", "A. Proxima Centauri");
var sQ6 = new triviaQuestion("In our solar system, which planet has the shortest day?", "Mercury", "Saturn", "Venus", "Jupiter", "D. Jupiter");
var sQ7 = new triviaQuestion("Which drug can be found in moldy bread?", "Methanphetamine", "Acetaminophine", "Penicillin", "Callendula", "C. Penicillin");
var sQ8 = new triviaQuestion("What does the acronym SCUBA stand for?", "Submerged Compact Underwater Breathing Apparatus", "Suddenly, Carl Understood Being Altruistic", "Self-Contained Underwater Breathing Apparatus", "Sorry. Can't. Understandably Brain Adled.", "C. Self-Contained Underwater Breathing Apparatus");
var sQ9 = new triviaQuestion("What is a unit of power?", "Watt", "Horsepower", "Pascal", "Parsec", "A. Watt");
var sQ10 = new triviaQuestion("In humans, what is the only internal organ capable of regenerating lost tissue?", "Brain", "Liver", "Stomach", "Duodenum", "B. Liver");
var sQ11 = new triviaQuestion("What is the phase transition from gas to solid called?", "Condensation", "Deposition", "Solidification", "Sublimation", "B. Deposition");
var sQ12 = new triviaQuestion("Which is the most abundant metal in the earth’s crust?", "Aluminum", "Carbon", "Silver", "Oxygen", "A. Aluminum");
var sQ13 = new triviaQuestion("The European Organization for Nuclear Research is known by what four letter acronym?", "EONR", "NRCE", "NORC", "CERN", "D. CERN");
var sQ14 = new triviaQuestion("In science, how long is an eon?", "One Year", "One Million Years", "One Billion Years", "One Trillion Years", "C. One Billion Years");
var sQ15 = new triviaQuestion("What was the first planet to be discovered using the telescope?", "Venus", "Mars", "Jupiter", "Uranus", "D. Uranus");
var scienceQuestions = [sQ1, sQ2, sQ3, sQ4, sQ5, sQ6, sQ7, sQ8, sQ9, sQ10, sQ11, sQ12, sQ13, sQ14, sQ15];

function triviaQuestion(questionAssign, aAssign, bAssign, cAssign, dAssign, answerAssign) {
    this.trivQuestion = questionAssign;
    this.trivA = aAssign;
    this.trivB = bAssign;
    this.trivC = cAssign;
    this.trivD = dAssign;
    this.trivAnswer = answerAssign;
    this.prevAsked = false;
}