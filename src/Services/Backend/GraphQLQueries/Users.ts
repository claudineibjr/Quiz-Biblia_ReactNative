import gql from 'graphql-tag';

import GraphQLClient from "../GraphQLClient";

export enum UserQueries {
	getUserByEmail = 'Q1',
	getUserById = 'Q2',
	getAllUsers = 'Q3',
	createUser = 'M1'
}

export default class GraphQLUser { 
    public static async executeQuery(queryType: UserQueries, fields?: Array<string>, parameters?: any): Promise<any>{
		const query = this.getQuery(queryType, fields, parameters);

		return new Promise<any>((resolve, reject) => {
			const apolloServerClient = GraphQLClient.ApolloServerClient('users');
			if (queryType[0].toUpperCase() === 'Q'){
				apolloServerClient.query({query: query}).then((result) => {
					resolve(result.data);
				}).catch((error) => {
					reject(error);
				});
			} else if (queryType[0].toUpperCase() === 'M'){
				apolloServerClient.mutate({mutation: query}).then((result) => {
					resolve(result.data);
				}).catch((error) => {
					reject(error);
				});
			}
		});
	}

	private static getQuery(queryType: UserQueries, fields?: Array<string>, parameters?: any) {
		let query;

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
		}

		return query;
	}
}