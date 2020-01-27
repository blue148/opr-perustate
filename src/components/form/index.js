import React from "react"
import styled from "styled-components"

const FormBox = styled.div`
	background-color:#999;
	position:fixed;
	width:315px;
	top:72px;
	bottom:0;
	right:0;
	padding:1.3rem;
	z-index:100;
`
const FormRow = styled.div`
	margin-bottom:10px;
	input,select{
		height:40px;
		width:100%;
		color:#333;
		border-color:#dbdbdb;
		}
	
`
export default class FormPanel extends React.Component{
	
	render(){
		
		return(
			<FormBox>
				<h2>Need More Information?</h2>
					<form method="post" action="/" id="ContactForm" enctype="multipart/form-data" class="form" novalidate="novalidate" data-ol-has-click-handler="">
	                <div>
	
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
	                        <input type="text"  name="phone" id="phone" placeholder="Phone*" maxlength="14"/>
	                    </FormRow>
	
	                    <div>
	                        <input type="hidden" name="city" id="city"/>
	                        <input type="hidden" name="country" id="country"/>
	                        <input type="hidden" name="education" id="education"/>
	                    </div>
	
	                </div>
	                <div className="form-cta-group">
	                    <div className="errorMessageContainer">
	                        <div className="errorMessage"><span className="allFieldsRequired">*All fields required.</span></div>
	                    </div>
	                    <div id="submitButtonContainer">
	                        <button type="button" id="requestInfo1" className="button2 formButton primary"  data-ol-has-click-handler="">Learn More</button>
	                        <button type="button" id="requestInfo0" className="button2 formButton primary" >Learn More</button>
	                    </div>
	                    <div>
	                        or call <a className="mobile-only phone-link" href="tel:+14029023128">(402) 902-3128</a>
	                        <span className="desktop-only">(402) 902-3128</span>
	                    </div>
	                </div>
	                <div>
	                    By submitting this form, I am providing my digital signature agreeing that Peru State College may email me or contact me regarding educational services by telephone and/or text message utilizing automated technology at the telephone number(s) provided above. I understand this consent is not a condition to attend Peru State College or to purchase any other goods or services.
	                </div>
	            </form>
			</FormBox>
		)
	}
}