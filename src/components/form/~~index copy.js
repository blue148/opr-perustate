import React from "react"
import styled from "styled-components"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './form.scss'

const FormContainer = styled.section`
	background-color:${props=>props.theme.shade};
	bottom:0;
	grid-column:1;
	order:20;
	width:100%;
	margin-top:0;
	@media (min-width: 768px) {
		grid-column:2/3;
		grid-row:1;
		left:calc(50% + 283px);
		z-index:99;
	}
`
const FormBox = styled.div`
		padding:1.3rem;
		max-width:310px;
		@media (min-width: 768px) {
				position:fixed;
				top:72px;
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
`
const CTPAText = styled.div`
	margin-top:1rem;
		p{
			font-size:.6rem;
			line-height:1rem;
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
const SelectOptions =(props)=>(
	
	Object.keys(props).map((item,index)=>{
		if(isNaN(item))return true;
		return(<MenuItem value={props[index].value} key={index}>{props[index].text}</MenuItem>
	)})
)

export default class FormPanel extends React.Component{
	constructor(props){
		super(props);
		this.state={program:'',setProgram:'',labelWidth:0,setLabelWidth:0}
	}
		  
	handleChange = event =>{
		  this.setState({program:event.target.value})
	}
 
	render(){
		const phone = (this.props.phone==null)?'(402) 902-3128':this.props.phone;
		return(
			<FormContainer >
			 <Spacer id="leadform"/>
			<FormBox>
				<FormHeadline>{this.props.formheadline || 'Need More Information?'}</FormHeadline>
					<form method="post" action="/" id="ContactForm" encType="multipart/form-data" className="form" noValidate="novalidate" data-ol-has-click-handler="">
						<FormControl>
					        <InputLabel id="demo-simple-select-label">Programs</InputLabel>
					        <Select
					          labelId="programs-label"
					          id="programs"
					          value={this.state.program}
					          onChange={this.handleChange}
					        >
					          <SelectOptions {...programOptions}/>
					        </Select>
					      </FormControl>
	                    <FormRow>
	                    
	                        <select name="programs" id="programs">
	                            <option value="">Select Degree Program*</option>
	                            <option value="" disabled="">-------------</option>	                            
								<option value="BSBA - ACCT">Business: Accounting</option>
								<option value="BSBA - CMIS">Business: Computer and Management Information Systems</option>
								<option value="BSBA - HR">Business: Human Resources</option>
								<option value="BSBA - MGMT">Business: Management</option>
								<option value="BAS - MGMT">Business: Management BAS</option>
								<option value="BSBA - MKTG">Business: Marketing</option>
								<option value="BSBA - PA">Business: Public Administration</option>
								<option value="CJUS - CS">Criminal Justice: Counseling</option>
								<option value="CJUS - JA">Criminal Justice: Justice Administration</option>
								<option value="CJUS - LAW">Criminal Justice: Law and Society</option>
								<option value="MS - ED">Master of Science in Education: Curriculum and Instruction</option>
								<option value="MS - OM">Master of Science in Organizational Management</option>
								<option value="BS/BA - PSYCH">Psychology</option>
								<option value="Undergrad - Undecided">Undergraduate: Undecided</option>
	                        </select>
	                    </FormRow>
	
	                    <FormRow>
	                        <input type="text"  name="name" id="name" placeholder="First Name*"/>
	                    </FormRow>
	
	                    <FormRow>
	                        <input type="text"  name="lastname" id="lastname" placeholder="Last Name*"/>
	                    </FormRow>
	
	                    <FormRow>
	                        <input type="text"  name="email" id="email" placeholder="Email*"/>
	                    </FormRow>
	
	                    <FormRow>
	                        <input type="text"  name="phone" id="phone" placeholder="Phone*" maxLength="14"/>
	                    </FormRow>
	
	                    <div>
	                        <input type="hidden" name="city" id="city"/>
	                        <input type="hidden" name="country" id="country"/>
	                        <input type="hidden" name="education" id="education"/>
	                    </div>
		                <div className="form-cta-group">
		                    <div id="submitButtonContainer">
		                        <button label="Learn More"/>
		                        <p>
			                        or call <a className="mobile-only phone-link" href={"tel:+1"+phone.replace(/\D/g,'')}>{phone}</a>
			                        <span className="desktop-only">{phone}</span>
		                        </p>
		                    </div>
		                </div>
		                <CTPAText>
		                    <p>By submitting this form, I am providing my digital signature agreeing that Peru State College may email me or contact me regarding educational services by telephone and/or text message utilizing automated technology at the telephone number(s) provided above. I understand this consent is not a condition to attend Peru State College or to purchase any other goods or services.</p>
		                </CTPAText>
	            </form>
			</FormBox>
			</FormContainer>
		)
	}
}