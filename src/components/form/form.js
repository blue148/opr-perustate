import React from "react"
import styled from "styled-components"
import {
	InputLabel,
	MenuItem,
	FormControl,
	FormHelperText,
	Select,
	Button,
	Container,
	makeStyles,
	Grid,
	TextField,
	CssBaseline,
	CircularProgress	
} from '@material-ui/core';
import MaterialUiPhoneNumber from '../phonenumberformatter'
import {Formik} from 'formik';
import * as Yup from 'yup';

import './form.scss'


import {customAlphabet} from 'nanoid'
import { 
	useMutation,
} from '@apollo/client';
import gql from 'graphql-tag';

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const crmConfig = {
	midpoint:process.env.GATSBY_AE_ENDPOINT,
	endpoint:process.env.GATSBY_CRM_ENDPOINT
  
}
const { midpoint, endpoint } = crmConfig;

/// --> get list of programs for select menu

const getId = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  12
);

const leadId = getId();

/// --> Apollo/GraphQL set up for Student Hub

///GraphQL Query/Mutation


const leadFormSend = gql`
  mutation leadformsend($leadInput: CreateLeadInput!) {
	  createLead(lead: $leadInput)
	}
`

////Nove this to scss due to FOUC
const StyledContainer = styled(Container)`
	
`
const FormBox = styled.div`
	
`

const FormHeadline = styled.h2`
`
const FormSubHeadline=styled.h3`

`
const CTPAText = styled.div`
`
const CTASection = styled.p`
	
`
const Spacer = styled.span`
 	
`
//pull these from GQL
//need to add key and sort
const programArray = (props)=>{
	const sorted = props.sort(function(a, b){
		  var x = a.node.pageSlug;
		  var y = b.node.pageSlug;
		  if (x < y) {return -1;}
		  if (x > y) {return 1;}
		  return 0;
		});
	return Object.keys(sorted).map((item,index)=>(
			{text:props[index].node.shortName,
				value:'PERU_'+props[index].node.programCode.replace(' - ','_'),
				key:props[index].node.programCode,
				reference:props[index].node.pageSlug}		
		))
}
const selectOptions =(props)=>{
		
	return Object.keys(props).map((item,index)=>{
		if(isNaN(item))return true;
		return(<MenuItem value={props[index].value} key={index} data-reference={props[index].reference}>{props[index].text}</MenuItem>
	)})
}
const useStyles = makeStyles(theme => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '90%', // Fix IE 11 issue.
		margin:0,
	},
	selectControl:{
		background:'white',

		
	},
	select: {
		minWidth: 120,
		margin:0,
		width:'100%',
		'&$focused': {
		      background: 'white',
	    }
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	submit: {
		marginTop: theme.spacing(5),
		height:'3rem',
		fontSize:'1.4rem',
	},
	headline:{
		marginBottom: theme.spacing(4)
	},
	textfield:{
		background:'white'
	},
	container:{
		top:'90px',
	}
	}));
	
	
export default function FormPanel(props){
	const [createLead, { data }] = useMutation(leadFormSend);
	
	const {phone,headline, subheadline, redirect, redirectUrl, successMsg} = props;
	//const {phone} = (props.formSettings.phone==null)?'(402) 902-3128':props.formSetting.phone;
	//const headline = props.headline;
	const cleanHeadline = (headline)?headline.replace(/(<([/fp]+)>)/ig,""):'';//remove and p and f tags to clean up the code.
	const cleanSubHeadline = (subheadline)?subheadline.replace(/(<([/fp]+)>)/ig,""):'';//remove and p and f tags to clean up the code.
	//clear if subheadline is only a br
	
	const submitSuccess = (successMsg)?successMsg:
					(<>
						<h3>Thank you for your request.</h3>
						<h4>We have received your request and will contact you shortly</h4>
					</>)
	const classes = useStyles();
	const [state, setState] = React.useReducer(
	    (state, newState) => ({...state, ...newState}),
	    {formData:{
		    firstName:'',
			lastName:'',
			email:'',
			phoneNumber:'',
			programCode:props.state.formSelect,
			location:props.location,
			},
		submitted:false,
		request:false
		}
	  )

	React.useEffect(()=>{
		if(props.state.formSelect!=='')setState({'formData':{'programCode':props.state.formSelect}})
			},[props.state.formSelect]
	);
	
	const inputLabel = React.useRef(null);
	///parse location string for ad vars
	
	/*** from google: {lpurl}?utm_source=sem&utm_medium=google&utm_campaign={_campaignname}&utm_adgroup={_adgroupname}&utm_term={keyword}&matchtype={matchtype}&network={network}&device={device}&devicemodel={devicemodel}&creative={creative}&placement={placement}&target={target}&adposition={adposition}&feeditemid={feeditemid}&adgroup_id={adgroupid}&target_id={targetid}&agencytrackingcode=v1-{campaignid}
	**** from facebook:?utm_source=paidsocial&utm_medium=facebook&utm_campaign={{campaign.name}}&utm_adgroup={{adset.name}}&network={{site_source_name}}&placement={{placement}}&adgroup_id={{adset.id}}&agencytrackingcode=v1-{{campaign.id}}*/
	
	const searchParams = (props.location)?new URLSearchParams(props.location.search):'';
	const searchVars = {}
	//(props.location.search)?JSON.parse('{"' + props.location.search.substring(1).replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) }):''
	if(searchParams){
		for(var item of searchParams.entries()){
			searchVars[item[0]]=decodeURIComponent(item[1])
		}
	}
	return(
		<StyledContainer component="section" maxWidth={false} disableGutters={true} className={classes.container+' formPanel'}>
		      <CssBaseline />
		      <Spacer className="spacer" id="leadform"/>
		      <FormBox className={[classes.paper, 'formBox'].join(' ')}>
		        <FormHeadline className={state.submitted?'hide':''}>
		          {cleanHeadline||'Need More Information?'}
		        </FormHeadline>
		        
		        {(cleanSubHeadline.replace(/(<([/br]+)>)/ig,""))?(
			        <FormSubHeadline className={state.submitted?'hide':''}>
			          {cleanSubHeadline}
			        </FormSubHeadline>
			        )
			        :null
			      }
		        <div className={["successContainer",state.submitted?'':'hide'].join(' ')}
		        	dangerouslySetInnerHTML={{__html:submitSuccess}}/> 
				 <Formik
			 		enableReinitialize={true}
			 		initialValues={{ 
				 		email: '', 
				 		firstName: '',
				 		lastName:'', 
				 		phoneNumber: '', 
				 		programCode:props.state.formSelect ,
				 		programs:props.programs.edges,
				 		request:false,
				 		isSingle:props.isSingle||false
				 		}}
	                onSubmit={(values, { setSubmitting}) => {
	                   //while sumbmitting and waiting for a repsonse, show spinner
	                   //on response, if success, redirect to viewdo, else show thankyou message
	                   setState({request:true})
	                   if(values.request!==true)window.dataLayer.push({event:'Request Info Button Click'});
	                  //add as variables to teh GraphQL mutation
							const body = {
							'captureUrl': props.location.href,
							'leadId': leadId,
							'partnerCode':'PERU',
							'collegeCode': 'PERU',
							'campusCode': 'PERU_ONLINE',
							'sourceCode': searchVars.utm_medium||'UNKNOWN',
							'programCode': values.programCode||'PERU_UNDERGRAD_UNDECIDED',
							'phoneNumberCountry': 'US',
							'formType': 'Website_RFI',
							'email': values.email,
							'phoneNumber': values.phoneNumber,
							'firstName': values.firstName,
							'lastName': values.lastName,
							'deviceType': searchVars.device||'UNKNOWN',
							"isTestLead": false,
							'sourceTracking': {
								'campaignName': searchVars.utm_campaign||'',
								'adGroupId': searchVars.utm_adgroup||'',
								'keyword': searchVars.utm_term||'',
								'matchType': searchVars.matchtype||'',
								'network': searchVars.network||'',
								'creativeId': searchVars.creative||'',
								'placement': searchVars.placement||'',
								'target': searchVars.target||'',
								'feedItemId': searchVars.feeditemid||'',
								'agencyTrackingCode':  searchVars.agencytrackingcode||''
							}
						};
	                   console.log(body, ' body submitting');
													
							
							///build viewdo redirect 
							const viewDoData = [
								"firstname="+encodeURIComponent(values.firstName),
								"lastname="+encodeURIComponent(values.lastName),
								"email="+encodeURIComponent(values.email),
								"phone="+encodeURIComponent("+1"+values.phoneNumber.replace(/[^A-Z0-9]+/ig, "")),
								"segment="+encodeURIComponent(values.programCode)
							]
							const redirectTarget = (redirect && redirectUrl)?redirectUrl+viewDoData.join('&'):null;
							
							createLead({ variables: {leadInput:body} }).then((response)=>{
								setSubmitting(false);
								console.log(response, 'response');
								//put redirect on creatlead:true
								if(response.data.createLead===true){
									(redirectTarget)?window.location.href = redirectTarget:setState({'submitted':true})
									}
							}).catch((e)=>{
								console.log(e.message, 'Errormessage')
								
							})
		                }}
	
	                validationSchema={Yup.object().shape({
	                  email: Yup.string()
	                    .email()
	                    .required('Required'),
	                  firstName: Yup.string()
	                    .required('Required'),
	                  lastName: Yup.string()
	                    .required('Required'),
	                  phoneNumber: Yup.string()
	                    .required('Required'),
	                  programCode: Yup.string()
	                    .required('Required')
	                })}
	              >
	                {(props) => {
	                  const {
	                    values,
	                    touched,
	                    errors,
	                    isSubmitting,
	                    handleChange,
	                    handleBlur,
	                    handleSubmit,
	                  } = props;
	                 return(
						<>
							<div className={["form_overlay",isSubmitting===true?'':'hide'].join(' ')}>
				                <CircularProgress variant='indeterminate' thickness={5}/>
				                <h4>Sending Request</h4>
							</div>
							
		                    <form onSubmit={handleSubmit} className={[classes.form, state.submitted?'hide':''].join(' ')}>
		                    
		                    	<Grid container spacing={0}>
									<Grid item xs={12}> 
							            <FormControl fullWidth className={[classes.selectControl,' selectControl', values.isSingle?"single-program":""].join(' ')}>
							            	<InputLabel ref={inputLabel} id="programs-label" variant="outlined">
									         Select a Program
									        </InputLabel>
									        <Select
									          labelId="programs-label"
									          id="programs"
									          name="programCode"
									          variant='outlined' 
									          margin='dense'
									          value={values.programCode}
									          onChange={handleChange}
									          className={classes.select}
									          style={{whiteSpace: 'normal'}}
									          error={errors.programCode && touched.programCode && <FormHelperText>'Please choose a program of interest'</FormHelperText>}
									        >
										        <MenuItem value=''>Please Select a Program</MenuItem>
										        {selectOptions(programArray(values.programs))}
									        </Select>
									    </FormControl>
						            </Grid>
						            <Grid item xs={12} >
										<TextField
										label="First Name"
										name="firstName"
										id="firstName"
										className={[classes.textfield,'textfield'].join(' ')}
										value={values.firstName}
										onChange={handleChange}
										onBlur={handleBlur}
										error={errors.firstName && touched.firstName}
										helperText={(errors.firstName && touched.firstName) && errors.firstName  && 'Your first name is required'}
										variant="outlined"
										fullWidth
										margin='dense'
										/>
									</Grid>
									 <Grid item xs={12} >
										<TextField
										label="Last Name"
										name="lastName"
										id="lastName"
										className={[classes.textfield, 'textfield'].join(' ')}
										value={values.lastName}
										onChange={handleChange}
										onBlur={handleBlur}
										error={errors.lastName && touched.lastName}
										helperText={(errors.lastName && touched.lastName) && errors.lastName && 'Your last name is required'}
										variant="outlined"
										fullWidth
										margin='dense'
										/>
									</Grid>	
									<Grid item xs={12}>
										<TextField
										variant="outlined"
										error={errors.email && touched.email}
										helperText={(errors.email && touched.email) && errors.email && 'Please provide a valid email address'}
										fullWidth
										id="email"
										label="Email Address"
										name="email"
										autoComplete="email"
										margin='dense'
										className={classes.textfield}
										onChange={handleChange}
										onBlur={handleBlur}
										/>
									</Grid>
									<Grid item xs={12}>
	
										<MaterialUiPhoneNumber
											disableCountryCode
											disableDropdown
											defaultCountry="us"
											regions={"america"}
											variant="outlined"
											fullWidth
											id="phoneNumber"
											label="Phone"
											name="phoneNumber"
											margin='dense'
											className={classes.textfield}
											onChange={handleChange('phoneNumber')}
											onBlur={handleBlur}
											error={errors.phoneNumber && touched.phoneNumber}
											helperText={(errors.phoneNumber && touched.phoneNumber) && errors.phoneNumber && 'Your phone number is required'}
										/>
	
									</Grid>
								</Grid>
								<Grid container justify="flex-end">
									<Grid item xs={12}>
										<Button
											type="submit"
											fullWidth
											variant="contained"
											color="primary"
											className={classes.submit+' button primary'}
										
										>
											Send Request
										</Button>
										<CTASection className="ctaSection">
											or call <a className="mobile-only phone-link" href={"tel:+1"+phone.replace(/\D/g,'')}>{phone}</a>
											<span className="desktop-only">{phone}</span>
										</CTASection>
										<CTPAText className="ctpaText">
											<p>By submitting this form, I am providing my digital signature agreeing that Peru State College may email me or contact me regarding educational services by telephone and/or text message utilizing automated technology at the telephone number(s) provided above. I understand this consent is not a condition to attend Peru State College or to purchase any other goods or services.</p>
										</CTPAText>
									</Grid>
								</Grid>
		                    </form>
	                    </>
	                  );
	                }}
		        </Formik>
		      </FormBox>
		    </StyledContainer>
		)
	}