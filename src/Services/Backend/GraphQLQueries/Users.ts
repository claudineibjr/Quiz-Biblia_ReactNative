import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

import GraphQLClient from "../GraphQLClient";

export enum UserQueries {
	getUserByEmail = 'Q1',
	getUserById = 'Q2',
	getAllUsers = 'Q3',
	createUser = 'M1',
	loginUser = 'M2'
}

export default class GraphQLUser { 

	public static async executeQuery(queryType: UserQueries, fields?: Array<string>, parameters?: any): Promise<any>{
		const query = this.getQuery(queryType, fields, parameters);
		return GraphQLClient.executeQuery(query, queryType[0].toUpperCase(), 'users', fields, parameters);
	}

	private static getQuery(queryType: UserQueries, fields?: Array<string>, parameters?: any) {
		let query: DocumentNode;

		switch(queryType) {
			case UserQueries.getUserByEmail:
				query = gql`
					query {
						getUserByEmail(email: "${parameters.email}"){
							${fields!.join(' ')}
						}
					}`;
				break;

			case UserQueries.getUserById:
				query = gql`
					query {
						getUserById(id: "${parameters.id}"){
							${fields!.join(' ')}
						}
					}`;
				break;

			case UserQueries.getAllUsers:
				query = gql`
					query {
						getAllUsers {
							${fields!.join(' ')}
						}
					}`;
				break;

			case UserQueries.createUser:
				query = gql`
					mutation {
						createUser(user: ${parameters.user}) {
							${fields!.join(' ')}
						}
					}`;
				break;
			
			case UserQueries.loginUser:
				query = gql`
					mutation {
						loginUser(email: "${parameters.email}", password: "${parameters.password}"){
							${fields!.join(' ')}
						}
					}`;
				break;
		}

		return query;
	}
}