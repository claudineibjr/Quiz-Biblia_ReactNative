import fetch from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { DocumentNode } from 'graphql';

export default class GraphQLClient {
	private static urlServer() {
		return 'https://us-central1-quizbiblico-b3eec.cloudfunctions.net';
	}

	public static ApolloServerClient(endPoint: string){
		const uri = this.urlServer() + '/' + endPoint;
		const client = new ApolloClient({
			link: createHttpLink({
				fetch: fetch,
				uri: uri
			}),
			cache: new InMemoryCache()
		});

		return client;
	}

    public static async executeQuery(query: DocumentNode, queryType: string, endPoint: string): Promise<any>{
		return new Promise<any>((resolve, reject) => {
			const apolloServerClient = GraphQLClient.ApolloServerClient(endPoint);
			if (queryType === 'Q'){
				apolloServerClient.query({query: query}).then((result) => {
					resolve(result.data);
				}).catch((error) => {
					reject(error);
				});
			} else if (queryType === 'M'){
				apolloServerClient.mutate({mutation: query}).then((result) => {
					resolve(result.data);
				}).catch((error) => {
					reject(error);
				});
			}
		});
	}
}