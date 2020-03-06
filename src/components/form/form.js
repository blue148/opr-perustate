import React from "react"
import styled from "styled-components"
import {
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Button,
	Container,
	makeStyles,
	Grid,
	TextField,
	CssBaseline,
	
	
} from '@material-ui/core';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

import './form.scss'

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const crmConfig = {
	midpoint:process.env.AE_ENDPOINT,
	endpoint:encodeURI(process.env.REACT_APP_CRM_ENDPOINT)
  
}
const { midpoint, endpoint } = crmConfig;


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
		top:90px;
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
const programOptions = 
	[
	{
		key:'BSBA - ACCT',
		text:'Business: Accounting',
		value:'BSBA - ACCT',
		reference:'business-accounting',
	},
	{
		key:'BSBA - CMIS',
		text:'Business: Computer & Management Information Systems',
		value:'BSBA - CMIS'		
	},
	{
		key:'BSBA - HR',
		text:'Business: Human Resources',
		value:'BSBA - HR'
	},
	{
		key:'BSBA - MGMT',
		text:'Business: Management',
		value:'BSBA - MGMT'
	},
	{
		text:'Business: Management Applied Science (BAS)',
		value:'BAS - MGMT',
		key:'BAS - MGMT',
	},
	{
		text:'Business: Marketing',
		value:'BSBA - MKTG',
		key:'BSBA - MKTG',
	},
	{
		text:'Business: Public Administration',
		value:'BSBA - PA',
		key:'BSBA - PA',
	},
	{
		text:'Criminal Justice: Counseling',
		value:'CJUS - CS',
		key:'CJUS - CS',
	},
	{
		text:'Criminal Justice: Adminstration',
		value:'CJUS - JA',
		key:'CJUS - JA',
	},
	{
		text:'Criminal Justice: Law & Society',
		value:'CJUS - LAW',
		key:'CJUS - LAW',
	},
	{
		text:'Master of Science in Education',
		value:'MS - ED',
		key:'MS - ED',
	},
	{
		text:'Master of Science in Organizational Management',
		value:'MS - OM',
		key:'MS - OM',
	},
	{
		text:'Psychology',
		value:'BS/BA - PSYCH',
		key:'BS/BA - PSYCH',
	},
	{
		text:'Undecided',
		value:'Undergrad - Undecided',
		key:'Undergrad - Undecided',
	}

]
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
	//console.log( selectOptions(programArray(props.programs.edges)), ' Array');
	const phone = (props.phone==null)?'(402) 902-3128':props.phone;
	const headline = props.headline;
	const cleanHeadline = (headline)?headline.replace(/(<([/fp]+)>)/ig,""):'';//remove and p and f tags to clean up the code.
	const classes = useStyles();
	//const [program, setProgram] = React.useState(props.state.formSelect||'');
	const [state, setState] = React.useReducer(
	    (state, newState) => ({...state, ...newState}),
	    {formData:{
		    firstName:'',
			lastName:'',
			email:'',
			phoneNumber:'',
			programCode:'',
			},
		submitted:false
		}
	  )
	const handleChange = event => {
		setState({'formData':{[event.target.name]:event.target.value}});
		//console.log(state, 'onChange')
	};
	const handleSubmit = (e)=>{
		e.preventDefault();
		Object.keys(e.target).map((item,index)=>{
			if(e.target[item].name){
				setState({[e.target[item].name]:e.target[item].value})
				}
			return true;
		})
		//console.log(e.target.firstName.value, 'form submit');
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		
		const body = `{
		  "universityId": "102",
		  "programCode": "BSBA - MKTG",
		  "firstName": "_TestName3",
		  "lastName": "_TestLastName5",
		  "secondaryLastName": "_TestSecondaryLastName",
		  "email": "test@tertsr.er",
		  "cellNumber": "145694851231",
		  "phoneNumber": "14567894521",
		  "countryCode": "US",
		  "comments": "",
		  "origin": "website",
		  "source": "testSource",
		  "subSource": "testSubSource",
		  "campaignName": "",
		  "adGroupName": "",
		  "keyword": "",
		  "matchType": "testmatchtype",
		  "network": "testnetwork",
		  "device": "testdevice",
		  "deviceModel": "testdevicemodel",
		  "creative": "testcreative",
		  "placement": "testplacement",
		  "target": "testtarget",
		  "adPosition": "testadposition",
		  "feedItemId": "testfeeditemid",
		  "agencyTrackingCode": "testagencytrackingcode",
		  "webUrl": "https://opr-peru.netlify.com/lp/homepage",
		  "ip": ""
		}`;
		
		const init = {
		  method: 'POST',
		  headers,
		  body		  
		};
		const url = midpoint+'?url='+endpoint;
		
		console.log(encodeURI(endpoint),' submit')
		fetch(url, init)
		.then((response) => response.json())
		.then((json) => {
		 console.log(json, 'Re4sponse')
		})
		.catch((e) => {
		  // error in e.message
		  console.log(e.message)
		});
	}
	React.useEffect(()=>{	
		console.log(state, 'change')	
		if(props.state.formSelect!=='')setState({'formData':{'programCode':props.state.formSelect}})
			//console.log(state,' useEffect')
			},[props.state.formSelect]
	);
	const inputLabel = React.useRef(null);
	return(
		 <StyledContainer component="section" maxWidth={false} disableGutters={true} className={classes.container+' formPanel'}>
		      <CssBaseline />
		      <Spacer id="leadform"/>
		      <FormBox className={classes.paper}>
		        <FormHeadline>
		          {cleanHeadline||'Need More Information?'}
		        </FormHeadline>
		        <form className={classes.form} onSubmit={handleSubmit} >
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
					          value={state.formData.programCode}
					          onChange={handleChange}
					          className={classes.select}
					        >
						        <MenuItem value=''>Please Select a Program</MenuItem>
						        {selectOptions(programArray(props.programs.edges))}
					        </Select>
					    </FormControl>
		            </Grid>
		            <Grid item xs={12} >
		              <TextField
		                autoComplete="fname"
		                name="firstName"
		                variant="outlined"
		                required
		                fullWidth
		                id="firstName"
		                label="First Name"
		                margin='dense'
		                value={state.formData.firstName||''}
		                onChange={handleChange}
		                 className={classes.textfield}
		              />
		            </Grid>
		            <Grid item xs={12}>
		              <TextField
		                variant="outlined"
		                required
		                fullWidth
		                id="lastName"
		                label="Last Name"
		                name="lastName"
		                autoComplete="lname"
		                margin='dense'
		                className={classes.textfield}
		              />
		            </Grid>
		            <Grid item xs={12}>
		              <TextField
		                variant="outlined"
		                required
		                fullWidth
		                id="email"
		                label="Email Address"
		                name="email"
		                autoComplete="email"
		                margin='dense'
		                 className={classes.textfield}
		              />
		            </Grid>
		            <Grid item xs={12}>
		              <TextField
		                variant="outlined"
		                required
		                fullWidth
		                id="phoneNumber"
		                label="Phone"
		                name="phoneNumber"
		                margin='dense'
		                 className={classes.textfield}
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
		      </FormBox>
		    </StyledContainer>
		)
	}