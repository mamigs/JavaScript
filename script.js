// Define the quiz data
const quizData = [
    {
        question: "En büyük rakam hangisidir?",
        imgLink: 'https://matematikrontgeni.com/uploads/posts/2023-01/seo-2048x1480-1.jpg',
        answers: [
            { text: "15", isCorrect: false },
            { text: "30", isCorrect: false },
            { text: "250", isCorrect: false },
            { text: "9", isCorrect: true }
        ]
    },
    {
        question: "Türkiye'deki illerin plaka kodlarının toplamı kaçtır? nx(n+1)/2 förmülü ile bulunur.",
        imgLink: 'https://isbh.tmgrup.com.tr/sbh/site/v4/siyasi-harita/i/turkiye-siyasi-haritasi.jpg',
        answers: [
            { text: "5543", isCorrect: false },
            { text: "4432", isCorrect: false },
            { text: "3321", isCorrect: true  },
            { text: "2210", isCorrect: false}
        ]
    },
    {
        question: "Hangisi ünlü türk matematikçidir?",
        imgLink: 'https://www.bilgi.edu.tr/media/uploads/resume/profile/581-en.jpg',
        answers: [
            { text: "Asım Orhan Barut", isCorrect: false },
            { text: "Sait Akpınar", isCorrect: false },
            { text: "İsmail Akbay", isCorrect: false },
            { text: "Ali NESİN", isCorrect: true }
           
        ]
    },
    {
        question: "Matematik ilk nerede ortaya çıktı?",
        imgLink: 'https://www.muhendisbeyinler.net/wp-content/uploads/2018/03/antik-misir-sayi-sistemi.jpg',
        answers: [
            { text: "Amerika", isCorrect: false },
            { text: "Almanya", isCorrect: false },
            { text: "İsviçre", isCorrect: false },
            { text: "Mısır ve Mezopotamya", isCorrect: true }
           
        ]
    },
];

let activeQuestionIndex = 0;

// Function to load a question
function loadQuestion() {
    const currentQuestion = quizData[activeQuestionIndex];
    const questionElement = document.getElementById('question');
    const answerListElement = document.getElementById('answer-list');
    const imageElement = document.getElementById('question-image');
    const questionNumberElement = document.getElementById('question-number');

    // Set the question number
    questionNumberElement.textContent = activeQuestionIndex + 1 + '/' + quizData.length;

    // Clear previous question and answers when it is loaded
    questionElement.textContent = '';
    answerListElement.innerHTML = '';

    // Set the question text
    questionElement.textContent = currentQuestion.question;

    // Set the image for the question
    imageElement.setAttribute('src', currentQuestion.imgLink)

    // Add the answer choices
    currentQuestion.answers.forEach(answer => {
        const li = document.createElement('li');
        li.textContent = answer.text;
        li.onclick = () => checkAnswer(answer.isCorrect);
        answerListElement.appendChild(li);
    });
}

// Start the quiz
loadQuestion();

// Handle the next question button click
document.getElementById('next-question').addEventListener('click', () => {
    if (activeQuestionIndex < quizData.length) {
        document.getElementById('next-question').style.display = '';
        activeQuestionIndex++
        if(activeQuestionIndex == quizData.length - 1) {
            document.getElementById('next-question').style.visibility = 'hidden';
        }
        loadQuestion();
    } else {
        activeQuestionIndex = 0;
        showNotification('Test tamamlandı zaten!', 3000, 'purple');
    }
});

// Handle the Reset the quiz button click
document.getElementById('reset').addEventListener('click', () => {
        activeQuestionIndex = 0;
        showNotification('Test  baştan başladı!', 3000, 'purple');
        loadQuestion();
        document.getElementById('next-question').style.visibility = 'visible';
});

// Function to show notification
function showNotification(message, duration = 3000, color = 'green') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    notification.style.backgroundColor = color;

    let quizContainer = document.querySelector('#quiz-container');
    quizContainer.style.border = '2px solid ' + color;

    // Hide the notification after the duration
    setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
}

// Modify checkAnswer function to use showNotification
function checkAnswer(isCorrect) {
    if (isCorrect) {
        showNotification('Doğru Cevap!', 3000, 'green');
    } else {
        showNotification('Yanlış Cevap. Tekrar Deneyiniz!', 3000, 'red');
    }
    // Load the next question if you want
    //activeQuestionIndex++;
    if (activeQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showNotification('Testi Başarıyla tamamlandınız!', 3000, 'purple');
    }
}