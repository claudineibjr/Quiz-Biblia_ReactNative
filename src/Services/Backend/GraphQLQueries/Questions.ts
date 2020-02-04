import gql from 'graphql-tag';

import GraphQLClient from "../GraphQLClient";

export enum QuestionQueries {
	getQuestionById,
	getQuestion
}

export enum QuestionMutations {
	
}

export default class GraphQLQuestion { 
	public static async executeQuery(queryType: QuestionQueries, fields?: Array<string>, parameters?: any): Promise<any>{
		const query = this.getQuery(queryType, fields, parameters);
	
		return new Promise<any>((resolve, reject) => {
			GraphQLClient.ApolloServerClient('users').query({query: query}).then((result) => {
				resolve(result.data);
			}).catch((error) => {
				reject(error);
			});
		});
	}

	private static getQuery(queryType: QuestionQueries | QuestionMutations, fields?: Array<string>, parameters?: any) {
		let query;

		switch(queryType) {
			case QuestionQueries.getQuestion:
				query = gql`
					query{
						getQuestionById(idQuestion: ${parameters.idQuestion}){
							${fields!.join(' ')}
						}
					}`;
				break;

			case QuestionQueries.getQuestionById:
				query = gql`
					query{
						getQuestion(userAnswered: ${parameters.userAnswered}, questionFilter: {dificulty: 1, testament: 1, bibleSection: 5}){
							${fields!.join(' ')}
						}
					}`;
				break;
		}

		return query;
	}
}