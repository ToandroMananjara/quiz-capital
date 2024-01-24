
let quiz =
[
    {
        question :'Madagascar'  ,
        reponse : ['Antananarivo', 'Fianarantsoa', 'Antsirabe', 'Itaosy'],
        reponseVrai:'Antananarivo'
    },
    {
        question :'France'  ,
        reponse : ['Paris', 'Nice', 'Bordeaux', 'Marseille'],
        reponseVrai:'Paris'
    },
    {
        question :'Italie'  ,
        reponse : ['Rome', 'Naples', 'Milan', 'Fiorentina'],
        reponseVrai:'Rome'
    },
    {
        question :'Suisse'  ,
        reponse : ['Berne', 'Genève', 'Zurich', 'Bâle'],
        reponseVrai:'Berne'
    },
    {
        question :'Turquie'  ,
        reponse : ['Ankara', 'Istanbul', 'Izmir', 'Bursa'],
        reponseVrai:'Ankara'
    },
    {
        question :'Espagne'  ,
        reponse : ['Madrid', 'Barcelone', 'Seville', 'Mallorca'],
        reponseVrai:'Madrid'
    },
    {
        question :'Brésil'  ,
        reponse : ['Brasilia', 'Rio de Janiero', 'Sao Paulo', 'Santos'],
        reponseVrai:'Brasilia'
    },
    {
        question :'USA'  ,
        reponse : ['Washington DC', 'New York', 'Chicago', 'Los Angeles'],
        reponseVrai:'Washington DC'
    },
    {
        question :'Algerie'  ,
        reponse : ['Alger', 'Oran', 'Constantine', 'Béjaia'],
        reponseVrai:'Alger'
    },
    {
        question :'Chine'  ,
        reponse : ['Shanghai', 'Shenyang', 'Tianjin', 'Pékin'],
        reponseVrai:'Pékin'
    },
    {
        question :'Allemagne'  ,
        reponse : ['Bérlin', 'Dortmund', 'Cologne', 'Schalke'],
        reponseVrai:'Bérlin'
    }
];

let homePage = document.querySelector('.home-page');
let container = document.querySelector('.container');
let scoreContainer = document.querySelector('.score');
let questionNumberContainer = document.querySelector('.question-number');
let question = document.getElementById('question');
let reponses = document.querySelectorAll('.reponse-btn');
let message = document.querySelector('.message');
let startBtn = document.querySelector('.start');
let nextBtn = document.querySelector('.next');
let restarts = document.querySelectorAll('.restart');
let containerToggle = document.querySelector('.container-toggle');

let questionNumber = 1;
questionNumberContainer.innerHTML = questionNumber

const random = (max) => {
    return Math.floor(Math.random() * max);
}
let randomInitial 
let randomIndex = 0;
let arrayIndex = []
let randomIndex_1 
const indexQuestionFunction = ()=>{
    randomInitial = random(quiz.length)
        arrayIndex.push(randomInitial)

        randomIndex_1 = random(quiz.length)
        do{

            if (arrayIndex.includes(randomIndex_1)) {
                randomIndex_1 = random(quiz.length)
            }else{
                arrayIndex.push(randomIndex_1)
            }
        }
        while(arrayIndex.length<=9)
        console.log(arrayIndex);
        randomIndex = 0
}


console.log('randomIndex',randomIndex);
const randomReponse = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = random(i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
}  

const questionFunction = (randomIndex) =>{
    question.textContent = quiz[randomIndex].question;
    reponses.forEach((reponseBtn, index)=>{
        reponseBtn.innerHTML = quiz[randomIndex].reponse[index];
    });
};

let score = 0;

const reponseVraieColor = (btn, message) =>{
    btn.style.background='green';
    message.innerHTML = 'Bravo! c\'est la bonne réponse!';
    message.style.color = 'green';
    btn.style.color='#fff';

};

const reponseFauxColor = (btn, message) =>{
    btn.style.background='#FF595E';
    btn.style.color='#fff';
    message.innerHTML = "Oups! réponse incorrect !";
    message.style.color = '#FF595E';
}

const reponseFunction = (btn) => {
    
    if(btn.textContent === quiz[arrayIndex[randomIndex]].reponseVrai){
        score = score + 1;
        reponseVraieColor(btn, message);
    }
    else{
        reponseFauxColor(btn, message);
    }

    scoreContainer.innerHTML = score;
};
 
const etatInitialReponse = () => {
    reponses.forEach(reponseBtn => {
        reponseBtn.style.background='#575366';
        reponseBtn.style.color='#fff';
    });
};

const styleDisplay = (dom1, dom2) =>{
    dom1.style.display = 'none';
    dom2.style.display = 'flex';
};

indexQuestionFunction()

startBtn.addEventListener('click', () => {
    styleDisplay(homePage, container);
    questionFunction(arrayIndex[randomIndex]);
    randomReponse(quiz[arrayIndex[randomIndex]].reponse);
});

let isBoolean = true;
reponses.forEach(reponseBtn => {
    reponseBtn.addEventListener('click', () =>{
        if(isBoolean){
            reponseFunction(reponseBtn);
        }
        isBoolean = false;
        console.log(isBoolean);
    });
});


nextBtn.addEventListener('click', () =>{
    
    questionNumber = questionNumber + 1;
        if(questionNumber <= 10){
            if (!isBoolean) {
                randomIndex = randomIndex + 1
                questionNumberContainer.innerHTML = questionNumber;
                message.innerHTML = '';
                etatInitialReponse();
                questionFunction(arrayIndex[randomIndex]);
                randomReponse(quiz[arrayIndex[randomIndex]].reponse);
                console.log(questionNumber);
            }
        }else if (questionNumber === 11) {
        questionNumber = 1;
        styleDisplay(container, containerToggle);   
        }
    isBoolean = true;
});   
 
restarts.forEach( restart => {
    restart.addEventListener('click', () =>{
        arrayIndex.forEach(elt =>{
            arrayIndex.shift()
        })
        indexQuestionFunction()
        isBoolean = true;
        styleDisplay(containerToggle, container);
        questionNumber = 1;
        questionNumberContainer.innerHTML = questionNumber;
        score= 0;
        scoreContainer.innerHTML = score;
        message.innerHTML = '';
        etatInitialReponse();
        questionFunction(arrayIndex[randomIndex]);
        randomReponse(quiz[arrayIndex[randomIndex]].reponse);
    });
});
