import fetch from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';

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
}