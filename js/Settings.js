{/* <reference path="../typings/globals/jquery/index.d.ts" /> */}

import {Quiz} from './quiz.js'
export class Settings {
    constructor() {
        this.categoryElement = document.getElementById("category");
        this.numberOfQuestionsElement = document.getElementById("numberOfQuestions");
        this.difficultyElement = document.getElementsByName("difficulty");

        this.startBtn = document.getElementById("startBtn");
        this.startBtn.addEventListener("click", this.StartQuiz.bind(this));

    }


    async StartQuiz() {
        
        let category = this.categoryElement.value;
        let numOfQues = this.numberOfQuestionsElement.value;
        let difficulty = [...this.difficultyElement].filter(el => el.checked)[0].value;
        let API = `https://opentdb.com/api.php?amount=${numOfQues}&category=${category}&difficulty=${difficulty}`

        let response = await this.FetchAPI(API);

        if(response.length > 0 ){
            $("#setting").fadeOut(500,()=>{
                $("#quiz").fadeIn(500)
            })
            let quiz = new Quiz(response);
        }
    }

    async FetchAPI(API){
        let response = await fetch(API)
        let result = await response.json();
        return result.results;
    }

}
