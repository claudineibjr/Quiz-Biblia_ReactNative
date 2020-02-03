export enum QuestionDificulty{
    Easy,
    Medium,
    Hard
}

export type Answer = 0 | 1 | 2 | 3;

export enum Testament{
    Velho,
    Novo
}

export enum BibleSection{
    Pentateuco,
    Historia_1,
    Poesia,
    Profetas_Maiores,
    Profetas_Menores,
    Evangelhos,
    Historia_2,
    Cartas,
    Profecia
}

export class QuestionFilter{
    dificulty: QuestionDificulty | undefined;
    testament: Testament | undefined;
    bibleSection: BibleSection | undefined;

    constructor(dificulty: QuestionDificulty | undefined, testament: Testament | undefined, bibleSection: BibleSection | undefined){
        this.dificulty = dificulty;
        this.testament = testament;
        this.bibleSection = bibleSection;
    }
}

export default class Question {
    private idQuestion: number;
    public getIdQuestion(): number{
        return this.idQuestion;
    }
    public setIdQuestion(idQuestion: number): void{
        this.idQuestion = idQuestion;
    }
    
    private textQuestion: string;
    public getTextQuestion(): string{
        return this.textQuestion;
    }    
    
    //  0 - Alternativa A | 1 - Alternativa B | 2 - Alternativa C | 3 - Alternativa D
    private answer: Answer;
    public getAnswer(): number{
        return this.answer;
    }    
    
    private alternatives: Array<string>;
    public getAlternatives(): Array<string>{
        return this.alternatives;
    }
    
    private textBiblical: string;
    public getTextBiblical(): string{
        return this.textBiblical;
    }    
    
    //  1 - Fácil | 2 - Médio | 3 - Difícil
    private dificulty: QuestionDificulty;
    public getDificulty(): number{
        return this.dificulty;
    }
    public getDificulty_string(): string {
        switch(this.dificulty){
            case QuestionDificulty.Easy:    return 'Fácil';
            case QuestionDificulty.Medium:  return 'Médio';
            case QuestionDificulty.Hard:    return 'Difícil';
        }

        return '';
    }    
    
    //  Antigo | Novo
    private testament: Testament;
    public getTestament(): Testament{
        return this.testament;
    }    
    
    //  Pentateuco | História 1 | Poesia | Profetas Maiores | Profetas Menores | Evangelhos | História 2 | Cartas | Profecias
    private bibleSection: BibleSection;
    public getBibleSection(): BibleSection{
        return this.bibleSection;
    }
    public getBibleSection_string(): string {
        switch(this.bibleSection){
            case BibleSection.Pentateuco:          return 'Pentateuco';
            case BibleSection.Historia_1:          return 'História';
            case BibleSection.Poesia:              return 'Poesia';
            case BibleSection.Profetas_Maiores:    return 'Profetas Maiores';
            case BibleSection.Profetas_Menores:    return 'Profetas Menores';
            case BibleSection.Evangelhos:          return 'Evangelhos';
            case BibleSection.Historia_2:          return 'História';
            case BibleSection.Cartas:              return 'Cartas';
            case BibleSection.Profecia:            return 'Profecia';
        }

        return '';
    }

    public getBibleSectionTestament(): string{
        return this.getBibleSection_string() + ' (' + (this.testament === Testament.Velho ? 'A. T.' : 'N. T.' ) + ')'
    }

    
    private biblicalReference: string;
    public getBiblicalReference(): string{
        return this.biblicalReference;
    }    

    constructor (   textQuestion: string, answer: Answer, 
                    alternatives: Array<string>,
                    textBiblical: string, dificulty: QuestionDificulty, testament: Testament, 
                    bibleSection: BibleSection, biblicalReference: string){
        
        this.textQuestion = textQuestion;
        this.answer = answer;
        this.alternatives = alternatives;
        this.textBiblical = textBiblical;
        this.dificulty = dificulty;
        this.testament = testament;
        this.bibleSection = bibleSection;
        this.biblicalReference = biblicalReference;

        this.idQuestion = -1;
    }

    getObjectFromClass(): object{
        return {
            'idQuestion': this.idQuestion,
            'textQuestion': this.textQuestion,
            'answer': this.answer,
            'alternatives': this.alternatives,
            'textBiblical': this.textBiblical,
            'dificulty': this.dificulty,
            'testament': this.testament,
            'bibleSection': this.bibleSection,
            'biblicalReference': this.biblicalReference
        }
    }

    static getClassFromObject(newQuestion: any): Question {
        const alternatives: Array<string> = Object.keys(newQuestion.alternatives).map(iCount => newQuestion.alternatives[iCount]);
        const answer: Answer = newQuestion.answer;
        const bibleSection: BibleSection = newQuestion.bibleSection;
        const biblicalReference: string = newQuestion.biblicalReference;
        const dificulty: QuestionDificulty = newQuestion.dificulty;
        const idQuestion: number = newQuestion.idQuestion;
        const testament: Testament = newQuestion.testament;
        const textBiblical: string = newQuestion.textBiblical;
        const textQuestion: string = newQuestion.textQuestion;

        let question = new Question(textQuestion, answer, alternatives, textBiblical, dificulty, testament, bibleSection, biblicalReference);
        question.idQuestion = idQuestion;

        return question;
    }

}