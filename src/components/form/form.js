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

import {  
	gql,
	useMutation
} from '@apollo/client';
import {customAlphabet} from 'nanoid'


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



/*require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const crmConfig = {
	midpoint:process.env.GATSBY_AE_ENDPOINT,
	endpoint:process.env.GATSBY_CRM_ENDPOINT
  
}
const { midpoint, endpoint } = crmConfig;*/

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

const handleFormExpand =()=>{
	//console.log('opened', window.getComputedStyle(document.querySelector('.formPanel'), ':before').getPropertyValue('background'));
	document.querySelector('.formPanel').classList.add('opened');
}
//need to add key and sort
const programArray = (props)=>{
	const sorted = props.sort(function(a, b){
		  var x = a.pageSlug;
		  var y = b.pageSlug;
		  if (x < y) {return -1;}
		  if (x > y) {return 1;}
		  return 0;
		});
	return Object.keys(sorted).map((item,index)=>(
			{text:props[index].shortName,
				value:props[index].programCode,
				key:props[index].programCode,
				reference:props[index].pageSlug}		
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
	
	const {
			phone,
			headline, 
			subheadline, 
			redirect, 
			redirectUrl, 
			successMsg,
			endpoint,
			midpoint,
			origin, 
			formtype,
			programs
		} = props;
	const cleanHeadline = (headline)?headline.replace(/(<([/fp]+)>)/ig,""):'';//remove and p and f tags to clean up the code.
	const cleanSubHeadline = (subheadline)?subheadline.replace(/(<([/fp]+)>)/ig,""):'';//remove and p and f tags to clean up the code.
	
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
		request:false,
		error:false
		}
	  )

	React.useEffect(()=>{
		if(props.state.formSelect!=='')setState({'formData':{'programCode':props.state.formSelect}})
			},[props.state.formSelect]
	);
	
	const inputLabel = React.useRef(null);
	
	/*** from google: {lpurl}?utm_source=sem&utm_medium=google&utm_campaign={_campaignname}&utm_adgroup={_adgroupname}&utm_term={keyword}&matchtype={matchtype}&network={network}&device={device}&devicemodel={devicemodel}&creative={creative}&placement={placement}&target={target}&adposition={adposition}&feeditemid={feeditemid}&adgroup_id={adgroupid}&target_id={targetid}&agencytrackingcode=v1-{campaignid}
	**** from facebook:?utm_source=paidsocial&utm_medium=facebook&utm_campaign={{campaign.name}}&utm_adgroup={{adset.name}}&network={{site_source_name}}&placement={{placement}}&adgroup_id={{adset.id}}&agencytrackingcode=v1-{{campaign.id}}*/
	
	const searchParams = (props.location)?new URLSearchParams(props.location.search):'';
	const searchVars = {}

	if(searchParams){
		for(var item of searchParams.entries()){
			searchVars[item[0]]=decodeURIComponent(item[1])
		}
	}
	
	return(
		<StyledContainer component="section" maxWidth={false} disableGutters={true} className={classes.container+' formPanel'} onClick={handleFormExpand}>
		      <CssBaseline />
		      <Spacer className="spacer" id="leadform"/>
		      <FormBox className={[classes.paper, 'formBox'].join(' ')} >
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
		        <div className={["successContainer",state.submitted?'':'hide'].join(' ')}>
		        	{submitSuccess}
		        </div> 
				 <Formik
			 		enableReinitialize={true}
			 		initialValues={{ 
				 		email: '', 
				 		firstName: '',
				 		lastName:'', 
				 		phoneNumber: '', 
				 		programCode:props.state.formSelect ,
				 		programs:props.programs.nodes,
				 		request:false,
				 		isSingle:props.isSingle||false
				 		}}
	                onSubmit={(values, { setSubmitting}) => {
	                   //while sumbmitting and waiting for a response, show spinner
	                   //on response, if success, redirect to viewdo, else show thankyou message
	                   setState({request:true})
	                   if(values.request!==true)window.dataLayer.push({event:'Request Info Button Click'});
	                   const headers = new Headers();
	                   	let universityId = "102";
					   	let programCode = values.programCode;

	                   if(searchVars.testLead){
							universityId = "101";
							programCode='archer - '+programCode;
						}
						
					   headers.append('Content-Type', 'application/json');
						const body = {
						 "universityId": universityId,
						  "programCode": programCode,
						  "firstName": values.firstName,
						  "lastName": values.lastName,
						  "secondaryLastName": "",
						  "email": values.email,
						  "phoneNumber": "",
						  "cellNumber": values.phoneNumber,
						  "countryCode": "US",
						  "comments": "",
						  "origin": props.origin || "Website RFI",
						  "source": searchVars.utm_source,
						  "subSource": searchVars.utm_medium,
						  "campaignName": searchVars.utm_campaign,
						  "adGroupName": searchVars.utm_adgroup,
						  "keyword": searchVars.utm_term,
						  "matchType": searchVars.matchtype,
						  "network": searchVars.network,
						  "device": searchVars.device,
						  "deviceModel": searchVars.devicemodel,
						  "creative": searchVars.creative,
						  "placement": searchVars.placement,
						  "target": searchVars.target,
						  "adPosition": searchVars.adposition,
						  "feedItemId": searchVars.feeditemid,
						  "agencyTrackingCode": searchVars.agencytrackingcode,
						  "webUrl": props.location.origin+props.location.pathname,
						  "ip": ""
						};
						console.log('Body', body)

						const viewDoData = [
							"firstname="+encodeURIComponent(values.firstName),
							"lastname="+encodeURIComponent(values.lastName),
							"email="+encodeURIComponent(values.email),
							"phone="+encodeURIComponent("+1"+values.phoneNumber.replace(/[^A-Z0-9]+/ig, "")),
							"segment="+encodeURIComponent(values.programCode)
						]
						const init = {
						  method: 'POST',
						  headers,
						  body:JSON.stringify(body)		  
						};
						const redirectTarget = (redirect && redirectUrl)?redirectUrl+viewDoData.join('&'):null;
						const url = midpoint+'?url='+encodeURIComponent(endpoint);
						fetch(url, init)
						.then((response) => {	
							return response.text()
							})
						.then((text) => {
							if(text.includes('LeadID')){	
								setSubmitting(false);	
								(redirectTarget)?window.location.href = redirectTarget:setState({'submitted':true})								
							}
							
						})
						.catch((e) => {
							setSubmitting(false);
							setState({'error':true});
							console.log(state,' state')
							console.log(e.message,' errors')
						});
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
	                    handleOpen
	                  } = props;
	                 return(
						<>
							<div className={["form_overlay",isSubmitting===true?'':'hide'].join(' ')}>
				                <CircularProgress variant='indeterminate' thickness={5}/>
				                <h4>Sending Request</h4>
							</div>
							
		                    <form onSubmit={handleSubmit} className={[classes.form, state.submitted?'hide':''].join(' ')}>
		                    	<p className={["Mui-error", state.error?'':'hide'].join(' ')}>
		                    		<strong> We are very sorry about this...</strong><br/>
		                    		Our network is having some trouble submitting your information.<br/>
		                    		You can wait a little bit, then resend. <br/>
		                    		Or you can <a href={"tel:+1"+phone.replace(/\D/g,'')}>give us a call</a>.
		                    	</p>
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
											Request Info
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