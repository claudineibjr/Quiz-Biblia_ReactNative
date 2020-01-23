import QuestionDB from './Services/Firebase/CloudFirestore/QuestionDB';
import User from './Model/User';
import { QuestionFilter, QuestionDificulty, BibleSection, Testament } from './Model/Question';

const user = new User('claudineibjr@hotmail.com', 'Claudinei Brito Junior');
const questionFilter = new QuestionFilter(QuestionDificulty.Hard, Testament.Novo, undefined);

QuestionDB.getQuestion(user, questionFilter).then((value) => {
    console.log(value);
}).catch((error) => {
    console.log(error);
});