import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

import GraphQLClient from "../GraphQLClient";

export enum QuestionQueries {
	getQuestionById = 'Q1',
	getQuestion = 'Q2'
}

export default class GraphQLQuestion { 

	public static async executeQuery(queryType: QuestionQueries, fields?: Array<string>, parameters?: any): Promise<any>{
		const query = this.getQuery(queryType, fields, parameters);
		return GraphQLClient.executeQuery(query, queryType[0].toUpperCase(), 'questions');
	}

	private static getQuery(queryType: QuestionQueries, fields?: Array<string>, parameters?: any) {
		let query: DocumentNode;

		const fragmentText = this.getFragment(fields);

		switch(queryType) {
			case QuestionQueries.getQuestionById:
				query = gql`
					query{
						getQuestionById(idQuestion: ${parameters.idQuestion}){
							${fields!.join(' ')}
						}
					}`;
				break;

			case QuestionQueries.getQuestion:
				query = gql`
					${fragmentText}
					query{
						getQuestion(userAnswered: ${parameters.userAnswered}, questionFilter: {}){
							${fields!.join(' ')}
							${fragmentText.length > 0 ? "...FullQuestion" : ""}
						}
					}`;
				break;
		}

		return query;
	}

	private static getFragment(fields?: Array<string>){
		let fragmentText = '';
		if (fields && fields!.length == 0){
			fragmentText = `fragment FullQuestion on Question{
				idQuestion
				textQuestion
				answer
				alternatives
				textBiblical
				dificulty
				testament
				bibleSection
				biblicalReference
			}`;
		}else{
			fragmentText = '';
		}

		return fragmentText;
	}
}