import React, {useState} from "react"
import {
	InputLabel,
	MenuItem,
	FormControl,
	FormHelperText,
	Select,
	Container,
	makeStyles,
	Grid,
	TextField,
	CssBaseline,
	CircularProgress	
} from '@material-ui/core';
//import MuiPhoneNumber from 'material-ui-phone-number';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {customAlphabet} from 'nanoid'

import './form.scss'


import {  
	gql,
	useMutation
} from '@apollo/client';



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

/***
 * Material UI style cusomtizations
 ***/
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
		origin, 
		redirect,
		formtype,
		programs
	} = props;
	
	const searchVars = {}
	const searchParams = (props.location)?new URLSearchParams(props.location.search):'';
	if(searchParams){
		//console.log(searchParams);
		for(var item of searchParams.entries()){
			searchVars[item[0]]=decodeURIComponent(item[1]).toUpperCase();
		}
	}
	//console.log(searchVars);
	const [createLead, { data }] = useMutation(leadFormSend);
	
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
	
	const [programCode, setProgramCode] = useState(); 

	const ProgramsSelectList = programs.nodes.map(({shortName, programCode},index) => (
							<MenuItem 
								value={'PERU_'+programCode.replace(/\s/g,'').replace('-','_')}
								key={index} 
								>
									{shortName}
							</MenuItem>
							))
	
	

							
	return(

		<Container component="section" maxWidth={false} disableGutters={true} className={classes.container+' formPanel'}>
		      <CssBaseline />
		      <span className="spacer" id="leadform"/>
		      <div className={[classes.paper, 'formBox'].join(' ')}>
		        <h2 className={[state.submitted?'hide':'','form-title'].join(' ')}>
		          Need More Information? {(searchVars.testform)?'TEST LEAD':null}
		        </h2>
		        
		        <div className={["successContainer",state.submitted?'':'hide'].join(' ')}>
					<h3>Thank you for your request.</h3>
					<h4>We have received your request and will contact you shortly</h4>
				</div>
				 <Formik
			 		enableReinitialize={true}
			 		initialValues={{ 
				 		email: '', 
				 		firstName: '',
				 		lastName:'', 
				 		phoneNumber: '', 
				 		programCode:props.state.formSelect,
				 		programs:props.programs.nodes,
				 		request:false,
				 		isSingle:props.isSingle||false
				 	}}
				 		
	                onSubmit={(values, { setSubmitting}) => {
						//console.log(values, 'submitting');
						/*****while sumbmitting and waiting for a repsonse, show spinner
						//on response, if success, redirect to viewdo, else show thankyou message*/
						setState({request:true})
						
						//if(values.request!==true && typeof window != 'undefined')window.dataLayer.push({event:'Request Info Button Click'});
						
						const testLead=(searchVars.testform)?true:false;
						
						const body = {
							'captureUrl': location.href,
							'leadId': leadId,
							'partnerCode':'PERU',
							'collegeCode': 'PERU',
							'campusCode': 'PERU_ONLINE',
							'sourceCode': searchVars.utm_medium||'UNKNOWN',
							'programCode': values.programCode||'PERU_UNDERGRAD_UNDECIDED',
							'phoneNumberCountry': 'US',
							'formType': origin,
							'email': values.email,
							'phoneNumber': values.phoneNumber,
							'firstName': values.firstName,
							'lastName': values.lastName,
							'deviceType': searchVars.utm_device||'UNKNOWN',
							"isTestLead": testLead,
							'sourceTracking': {
								'campaignName': searchVars.utm_campaign||'',
								'adGroupId': searchVars.utm_adgroup||'',
								'keyword': searchVars.utm_term||'',
								'matchType': searchVars.utm_matchtype||'',
								'network': searchVars.utm_network||'',
								'creativeId': searchVars.utm_content||'',
								'placement': searchVars.utm_placement||'',
								'target': searchVars.urm_target||'',
								'feedItemId': searchVars.utm_feeditemid||'',
								'agencyTrackingCode':  searchVars.utm_agencytrackingcode||''
							}
						};
						//console.log(body, ' body submitting');
	                   
						const crmData = (formtype=="crm")?[
								"firstname="+encodeURIComponent(values.firstName),
								"lastname="+encodeURIComponent(values.lastName),
								"email="+encodeURIComponent(values.email),
								"phone="+encodeURIComponent("+1"+values.phoneNumber.replace(/[^A-Z0-9]+/ig, "")),
								"segment="+encodeURIComponent(values.programCode)
							]:'';
							
						const redirectTarget = (redirect && !searchVars.testform)?redirect+crmData.join('&'):null;
						//const redirectTarget = redirect||null;
						createLead({ variables: {leadInput:body} }).then((response)=>{
								setSubmitting(false);
								//put redirect on creatlead:true
								//console.log(response);
								if(response.data.createLead===true){
									(redirectTarget && typeof window !== 'undefined' )?window.location.href = redirectTarget:setState({'submitted':true})
									}
							}).catch((e)=>{
								console.log(e.message, 'message')
								
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
						.required("Must enter a phone number"),
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
	                    programs
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
							            	<InputLabel ref={inputLabel} id="programs-label" variant="outlined" style={{marginTop:'-7px'}}>
									         Select a Program
									        </InputLabel>
									        <Select
									          labelId="programs-label"
									          id="programs"
									          name="programCode"
									          variant='outlined' 
									          margin='dense'
									          value={values.programCode}
									          onChange={(e) => {
											      //setProgramCode(e.target.value);
											      handleChange(e);
										    }}
									          className={classes.select}
									          style={{whiteSpace: 'normal'}}
									          error={errors.programCode && touched.programCode && <FormHelperText>'Please choose a program of interest'</FormHelperText>}
									        >
										        <MenuItem value=''>Please Select a Program</MenuItem>
										        {ProgramsSelectList}										        
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
										
									</Grid>
									
								</Grid>
								
								<Grid container justify="flex-end" className="leadform-actions">
									<Grid item xs={12}>
										<button
											type="submit"
											variant="contained"
											color="primary"
											className={['aeopr-button','aeopr-primary-button','aeopr-send-button'].join(' ')}
										
										>
											Request Info
										</button>
										<p className="ctaSection">
											or call <a className="mobile-only phone-link" href={"tel:+1 (402) 902-3005"}>(402) 902-3005</a>
											<span className="desktop-only">(402) 902-3005</span>
										</p>
										<div className="legal-text ctpaText">
											<p>By submitting this form, I am providing my digital signature agreeing that Peru State College may email me or contact me regarding educational services by telephone and/or text message utilizing automated technology at the telephone number(s) provided above. I understand this consent is not a condition to attend Peru State College or to purchase any other goods or services.</p>
										</div>
									</Grid>
								</Grid>
		                    </form>
	                    </>
	                  );
	                }}
		        </Formik>
		      </div>
		    </Container>
		)
	}
