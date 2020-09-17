import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';


const crmConfig = {
	midpoint:process.env.GATSBY_AE_ENDPOINT,
	apiKey:process.env.GATSBY_AE_KEY
  
}

const { midpoint, apiKey} = crmConfig;

export const client = new ApolloClient({
 	link: new HttpLink({
		uri: midpoint,
		headers: {'x-api-key':apiKey},
		fetch
		
	}),		
	cache: new InMemoryCache()
});