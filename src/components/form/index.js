import React from "react"
import styled from "styled-components"

import fetch from 'cross-fetch'
import { 
	ApolloProvider,
	ApolloClient, 
	InMemoryCache,
	HttpLink 
} from '@apollo/client';

import FormPanel from './formgql'

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const crmConfig = {
	midpoint:process.env.GATSBY_ASH_ENDPOINT,
	endpoint:process.env.GATSBY_CRM_ENDPOINT,
	apiKey:process.env.GATSBY_APIKEY,
	redirect:process.env.GATSBY_REDIRECT
  
}
const { 
	endpoint,
	midpoint, 
	apiKey,
	redirect
	} = crmConfig;


const gqlClient = new ApolloClient({
	link: new HttpLink({
		uri: midpoint,
		headers: {'x-api-key':apiKey},
		fetch
		
	}),		
	cache: new InMemoryCache(),
	
})

 
export default function LeadFormApp(props){
	return(
		<ApolloProvider client={gqlClient}>
			<FormPanel 
				endpoint={endpoint}
				midpoint={midpoint}
				origin={"Website_RFI"}
				redirect={redirect}
				formtype={"crm"}
				{...props}
			/>
		</ApolloProvider>

	)
}
