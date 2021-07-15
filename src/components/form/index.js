import React from "react"

import fetch from 'cross-fetch'
import { 
	ApolloProvider,
	ApolloClient, 
	InMemoryCache,
	HttpLink 
} from '@apollo/client';
import ScrollIntoView from 'react-scroll-into-view'
import FormPanel from './formgql2_1'
import './peruform.scss'

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const crmConfig = {
	midpoint:process.env.GATSBY_ASH_ENDPOINT,
	apiKey:process.env.GATSBY_APIKEY,
	redirect:process.env.GATSBY_REDIRECT,
	version:'2_1',
	clientCTPA:'By submitting this form, I am providing my digital signature agreeing that Peru State College may email me or contact me regarding educational services by telephone and/or text message utilizing automated technology at the telephone number(s) provided above. I understand this consent is not a condition to attend Peru State College or to purchase any other goods or services.',
	defaultPhone: '(402) 902-3005'
  
}
const { 
	midpoint, 
	apiKey,
	redirect,
	version,
	clientCTPA,
	defaultPhone
	} = crmConfig;


const gqlClient = new ApolloClient({
	link: new HttpLink({
		uri: midpoint,
		headers: {'x-api-key':apiKey},
		fetch
		
	}),		
	cache: new InMemoryCache(),
	
})
const handleFormExpand =()=>{
	document.querySelector('.formPanel').classList.add('opened');
}
 
export default function LeadFormApp(props){
	const redirectURL = (props.redirectUrl==='')?redirect:props.redirectUrl;
	console.log('redirect',redirectURL)

	let programList = props.programs.nodes
		.sort((a,b)=>(a.shortName && a.shortName.localeCompare(b.shortName)))
		.map(({shortName, programCode},index) => {
			if(!shortName)return;
			if(!programCode)return;
			let item=[];
			
			item['label']=shortName;
			item['value']='PERU_'+programCode.replace(/\s/g,'').replace('-','_')

			return ({label:shortName, value: 'PERU_'+programCode.replace(/\s/g,'').replace('-','_')});
			})
			
	const cleanHeadline = props.headline?.replace(/(<([/fp]+)>)/ig,"");//remove and p and f tags to clean up the code.
	const cleanSubHeadline = props.subheadline?.replace(/(<([/fp]+)>)/ig,"");//remove and p and f tags to clean up the code.
	const programCodeTarget = (props.programCode)?'PERU_'+props.programCode.replace(/\s/g,'').replace('-','_'):'';
	return(
		<ApolloProvider client={gqlClient}>
			<aside id="leadform-area">
			<ScrollIntoView 
				selector={'.formPanel'} 
				alignToTop={true} 
				onClick={handleFormExpand}
				
			>
				<h2 className='form-title'>
					{cleanHeadline||'Need More Information?'} 
		        </h2>
				<FormPanel 
					//endpoint={endpoint}
					midpoint={midpoint}
					origin={"Website_RFI"}
					redirect={redirectURL}
					formtype={"crm"}
					env={process.env.NODE_ENV}
					formFocus={'rfiForm'}
					formversion={version}
					programList = {programList}			
					programFocus = {programCodeTarget}///single program setting				
	
					programSelect = {programCodeTarget}//{props.programContent.programCode}///single program setting
					
					clientPrefix = "PERU"
					partnerCode="PERU"
					campusCode = "PERU_ONLINE"
					clientCTPA = {clientCTPA}
					defaultPhone = {defaultPhone}
					cid='main'
	
					
					
					{...props}
				/>
			</ScrollIntoView>
			</aside>
		</ApolloProvider>

	)
}


