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
import {Helmet} from 'react-helmet';

import './form.scss'

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const crmConfig = {
	midpoint:process.env.GATSBY_AE_ENDPOINT,
	endpoint:process.env.GATSBY_CRM_ENDPOINT
  
}
const { midpoint, endpoint } = crmConfig;

////Nove this to scss due to FOUC
const StyledContainer = styled(Container)`
	background-color:${props=>props.theme.shade};
	bottom:0;
	grid-column:1;
	order:20;
	margin-top:0;
	padding:0;
	width:100%;
	@media (min-width: 768px) {
		grid-column:2/3;
		grid-row:1;
		z-index:99;
		right: 9%;
		top: 0px;
		position: fixed;
		width:357px!important;
	}
	@media (max-width:1290px){
		left:850px;
	}
	@media (max-width:768px){
		left:750px;
		}
`
const FormBox = styled.div`
		padding: 0;

		@media (min-width: 768px) {
			width:355px;
			height: 100%;
			overflow-y: auto;
			}
`

const FormHeadline = styled.h2`
	text-align:center;
	margin:1rem auto 2rem;
	line-height:1.4;
	font-size:1.7rem;
`
const CTPAText = styled.div`
	margin-top:1rem;
		p{
			font-size:.6rem;
			line-height:1rem;
		}
`
const CTASection = styled.p`
	text-align:center;
	a{
		font-size:1.6rem;
		font-weight:600;
		text-decoration:none;
		color:${props=>props.theme.brandblue};
	}
	span{
		font-size:1.3rem;
		font-weight:600;
		text-decoration:none;
		color:${props=>props.theme.brandblue};
	}
`
const Spacer = styled.span`
 	display: block; 
	  content: " "; 
	  margin-top: 0px; 
	  height: 0px; 
	  visibility: hidden; 
	  pointer-events: none;
	  @media (min-width:768px){
		  height:85px;
		  margin-top:-85px;
	  }
`
//pull these from GQL
//need to add key and sort
const programArray = (props)=>{
	return Object.keys(props).map((item,index)=>(
			{text:props[index].node.shortName,
				value:props[index].node.programCode,
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
	margin: theme.spacing(3, 0, 2),
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

	const phone = (props.phone==null)?'(402) 902-3128':props.phone;
	const headline = props.headline;
	const cleanHeadline = (headline)?headline.replace(/(<([/fp]+)>)/ig,""):'';//remove and p and f tags to clean up the code.
	const classes = useStyles();
	const [state, setState] = React.useReducer(
	    (state, newState) => ({...state, ...newState}),
	    {formData:{
		    firstName:'',
			lastName:'',
			email:'',
			phoneNumber:'',
			programCode:props.state.formSelect,
			},
		submitted:false
		}
	  )
	const handleChange = event => {
		setState({'formData':{[event.target.name]:event.target.value}});
	};

	React.useEffect(()=>{	
		if(props.state.formSelect!=='')setState({'formData':{'programCode':props.state.formSelect}})
			},[props.state.formSelect]
	);
	
	const inputLabel = React.useRef(null);
	///parse location string for ad vars
	/*** from google: {lpurl}?utm_source=sem&utm_medium=google&utm_campaign={_campaignname}&utm_adgroup={_adgroupname}&utm_term={keyword}&matchtype={matchtype}&network={network}&device={device}&devicemodel={devicemodel}&creative={creative}&placement={placement}&target={target}&adposition={adposition}&feeditemid={feeditemid}&adgroup_id={adgroupid}&target_id={targetid}&agencytrackingcode=v1-{campaignid}
	**** from facebook:?utm_source=paidsocial&utm_medium=facebook&utm_campaign={{campaign.name}}&utm_adgroup={{adset.name}}&network={{site_source_name}}&placement={{placement}}&adgroup_id={{adset.id}}&agencytrackingcode=v1-{{campaign.id}}*/
	
	const searchVars = (props.location.search)?
		JSON.parse('{"' + props.location.search.substring(1).replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) }):''
		
	return(
		<StyledContainer component="section" maxWidth={false} disableGutters={true} className={classes.container+' formPanel'}>?
		      <CssBaseline />
		      <Spacer id="leadform"/>
		      <FormBox className={[classes.paper, 'formBox'].join(' ')}>
		        <FormHeadline className={state.submitted?'hide':''}>
		          {cleanHeadline||'Need More Information?'}
		        </FormHeadline>
		        <div className={["successContainer",state.submitted?'':'hide'].join(' ')}>
					<h3>Thank you for yoru request.</h3>
					<h4>We have received your request and will contact you shortly</h4>
				</div>
 
				 <Formik
			 		enableReinitialize={true}
			 		initialValues={{ email: '', firstName: '',lastName:'', phoneNumber: '', programCode:props.state.formSelect ,programs:props.programs.edges }}
	                onSubmit={(values, { setSubmitting}) => {
	                   //while sumbmitting and waiting for a repsonse, show spinner
	                   //on response, if success, show thank you
	                   if (typeof window !== 'undefined'){
		                   window.dataLayer.push({event: 'Request Info Button Click'});
		                   }
	                   const headers = new Headers();
						headers.append('Content-Type', 'application/json');
						
						const body = {
						 "universityId": "102",
						  "programCode": values.programCode,
						  "firstName": values.firstName,
						  "lastName": values.lastName,
						  "secondaryLastName": "",
						  "email": values.email,
						  "phoneNumber": "",
						  "cellNumber": values.phoneNumber,
						  "countryCode": "US",
						  "comments": "",
						  "origin": "Website RFI",
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
						
						const init = {
						  method: 'POST',
						  headers,
						  body:JSON.stringify(body)		  
						};
						const url = midpoint+'?url='+encodeURIComponent(endpoint);
						/*fetch(url, init)
						.then((response) => {	
							setSubmitting(false)
							return response.json()
							})
						.then((json) => {
							if(json.Success)setState({'submitted':true})
						})
						.catch((e) => {
						  console.log(e.message)
						});*/
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
	                    submitForm,
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
						            <FormControl fullWidth className={classes.selectControl+' selectControl'}>
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
									className={classes.textfield}
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
									className={classes.textfield}
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
									<CTASection >
										or call <a className="mobile-only phone-link" href={"tel:+1"+phone.replace(/\D/g,'')}>{phone}</a>
										<span className="desktop-only">{phone}</span>
									</CTASection>
									<CTPAText>
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