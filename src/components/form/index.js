import React from "react"
import styled from "styled-components"
import { 
	ApolloProvider,
	ApolloClient, 
	InMemoryCache 
} from '@apollo/client';

import FormPanel from './form'

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const crmConfig = {
	midpoint:process.env.GATSBY_ASH_ENDPOINT,
	endpoint:process.env.GATSBY_CRM_ENDPOINT,
	apiKey:process.env.GATSBNY_ENV_APIKEY,
	redirect:process.env.GATSBY_REDIRECT
  
}
const { 
	endpoint,
	midpoint, 
	apiKey,
	redirect
	} = crmConfig;

console.log(midpoint,'endpoint')
const gqlClient = new ApolloClient({
	uri: midpoint,
	headers: {'x-api-key':apiKey},
	cache: new InMemoryCache()
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
