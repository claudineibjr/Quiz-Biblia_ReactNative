export default class Question {
    private idQuestion: number;
    
    private textQuestion: string;
    
    //  0 - Alternativa A | 1 - Alternativa B | 2 - Alternativa C | 3 - Alternativa D
    private answer: number;
    
    private alternatives: Array<String>;
    
    private textBiblical: string;
    
    //  1 - Fácil | 2 - Médio | 3 - Difícil
    private levelQuestion: number;
    
    //  Antigo | Novo
    private testamento: string;
    
    //  Pentateuco | História 1 | Poesia | Profetas Maiores | Profetas Menores | Evangelhos | História 2 | Cartas | Profecias
    private secaoBiblia: string;
    
    private referenciaBiblica: string;

    constructor (   idQuestion: number, textQuestion: string, answer: number, 
                    alternatives: Array<String>,
                    textBiblical: string, levelQuestion: number, testamento: string, 
                    secaoBiblia: string, referenciaBiblica: string){
        
        this.idQuestion = idQuestion;
        this.textQuestion = textQuestion;
        this.answer = answer;
        this.alternatives = alternatives;
        this.textBiblical = textBiblical;
        this.levelQuestion = levelQuestion;
        this.testamento = testamento;
        this.secaoBiblia = secaoBiblia;
        this.referenciaBiblica = referenciaBiblica;
    }

    public getId(): number{                     return this.idQuestion;         }
    
    public getTextQuestion(): string{           return this.textQuestion;       }
    
    public getAnswer(): number{                 return this.answer;             }
    
    public getAlternatives(): Array<String>{    return this.alternatives;       }
    
    public getTextBiblical(): string{           return this.textBiblical;       }
    
    public getLevelQuestion(): number{          return this.levelQuestion;      }
    
    public getTestamento(): string{             return this.testamento;         }
    
    public getReferenciaBiblica(): string{      return this.referenciaBiblica;  }
    
    public getSecaoBiblia(): string{            return this.secaoBiblia;        }
    
    public getLevelQuestion_string(): string{
        switch(this.levelQuestion){
            case 1: return 'Fácil';
            case 2: return 'Médio';
            case 3: return 'Difícil';
        }
    }
    
    public getSecaoBiblia_string(): string{
        switch(this.secaoBiblia){
            case 'pentateuco':          return 'Pentateuco';
            case 'historia_1':          return 'História (A. T.)';
            case 'poesia':              return 'Poesia';
            case 'profetas_maiores':    return 'Profetas Maiores';
            case 'profetas_menores':    return 'Profetas Menores';
            case 'evangelhos':          return 'Evangelhos';
            case 'historia_2':          return 'História (N. T.)';
            case 'cartas':              return 'Cartas';
            case 'profecia':            return 'Profecia';
        }
    }
}