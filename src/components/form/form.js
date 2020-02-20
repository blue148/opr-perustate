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
	Typography,
	Box,
	Grid,
	FormControlLabel,
	TextField,
	CssBaseline,
	
	
} from '@material-ui/core';

import './form.scss'

const StyledContainer = styled(Container)`
	background-color:${props=>props.theme.shade};
	bottom:0;
	grid-column:1;
	order:20;

	margin-top:0;
	padding:0;
	@media (min-width: 768px) {
		grid-column:2/3;
		grid-row:1;
		z-index:99;
		right: 2%;
		top: 0px;
		position: fixed;
	}
	@media (max-width:768px){
			width:100%!important;
			}
`
const FormBox = styled.div`
		padding:1.3rem 0;
		top:72px;
		@media (min-width: 768px) {
			width:355px;
			}
`
const FormRow = styled.div`
	margin-bottom:10px;
	input,select{
		height:40px;
		width:100%;
		color:#333;
		border-color:${props=>props.theme.shade};
		}
	
`
const FormHeadline = styled.h2`
	text-align:center;
	margin:1rem auto;
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
	  margin-top: -85px; 
	  height: 85px; 
	  visibility: hidden; 
	  pointer-events: none;
`

const programOptions = [
	{
		key:'BSBA - ACCT',
		text:'Business: Accounting',
		value:'BSBA - ACCT'
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
	}
]
const selectOptions =(props)=>(
	
	Object.keys(props).map((item,index)=>{
		if(isNaN(item))return true;
		return(<MenuItem value={props[index].value} key={index}>{props[index].text}</MenuItem>
	)})
)
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
	formControl: {
	minWidth: 120,
	margin:0,
	width:'100%',
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
		width:'357px',
		top:'72px',
	}
	}));
	
	
export default function FormPanel(props){
	const phone = (props.phone==null)?'(402) 902-3128':props.phone;
	const classes = useStyles();
	const [program, setProgram] = React.useState('');

	//const inputLabel = React.useRef(null);
	//const [labelWidth, setLabelWidth] = React.useState(0);
	/*React.useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);*/
	
	const handleChange = event => {
		setProgram(event.target.value);
	};
	return(
		 <StyledContainer component="section" maxWidth={false} disableGutters={true} className={classes.container}>
		      <CssBaseline />
		      <Spacer id="leadform"/>
		      <FormBox className={classes.paper}>
		        <FormHeadline>
		          Need More Information?
		        </FormHeadline>
		        <form className={classes.form} noValidate>
		          <Grid container spacing={1}>
		            <Grid item xs={12}>
		            	<FormControl className={classes.formControl} variant='outlined' margin='dense'>
					        <InputLabel id="programs-label">Select a Program</InputLabel>
					        <Select
					          labelId="programs-label"
					          id="programs"
					          value={program}
					          onChange={handleChange}

					        >
					        <MenuItem value=''>Please Select a Program</MenuItem>
					          {selectOptions(programOptions)}
					        </Select>
				      </FormControl>
		            </Grid>
		            <Grid item xs={12} >
		              <TextField
		                autoComplete="fname"
		                name="name"
		                variant="outlined"
		                required
		                fullWidth
		                id="name"
		                label="First Name"
		                margin='dense'
		                
		                 className={classes.textfield}
		              />
		            </Grid>
		            <Grid item xs={12}>
		              <TextField
		                variant="outlined"
		                required
		                fullWidth
		                id="lastname"
		                label="Last Name"
		                name="lastname"
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
		                id="phone"
		                label="Phone"
		                name="phone"
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
		            Learn More
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