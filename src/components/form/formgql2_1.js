import React, {useState, useEffect} from "react"
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import Select from 'react-select' //maybe use instead
/// --> for Gatsby builds only due to SSR builds
import Cookies from 'js-cookie'
/// --> these modules are fgor interacting with Student Hub's GraphQL
import {customAlphabet} from 'nanoid'
import {  
	gql,
	useMutation
} from '@apollo/client';


import './form.scss'


const customStyles = {
   placeholder: (provided, state) => {
    const color = '#666';
    return { ...provided, color };
  }
 }

/// --> Student Hub needs a unique request ID. We use the customAlphabet function from nanoid to generate this

const getId = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  12
);

/// --> this will be the request's id for Student Hub
const leadId = getId();

/// --> Apollo/GraphQL set up for Student Hub

/// --> Student Hub GraphQL needs a Mutation sent as the query in order to add a lead

const leadFormSend = gql`
  mutation leadformsend($leadInput: CreateLeadInput!) {
	  createLead(lead: $leadInput)
	}
`

/// --> Phone Number Field Formatter

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format="(###) ###-####" mask="_"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
	
const renameKeys = (oldProp,newProp,{ [oldProp]: old, ...others }) => ({
    [newProp]: old,
    ...others
})	
	
function decorateUrl(urlString) {
  var ga = window[window['GoogleAnalyticsObject']];
  var tracker;
  if (ga && typeof ga.getAll === 'function') {
    tracker = ga.getAll()[0]; // Uses the first tracker created on the page
    urlString = (new window.gaplugins.Linker(tracker)).decorate(urlString);
  }
  return urlString;
}

/// -->> Helper function to get element position in the document
function offsetScroll(el, offset=0) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const elTop = rect.top + scrollTop;
    window.scrollTo({
		top: (elTop - offset),
		left: 0,
		behavior: 'smooth'
	})
}



/// -->> Persistent Param Cookie Reader
function getPersistCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(Cookies.get());
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
	  let cSub = c.substring(name.length, c.length);
	  
      return cSub.substring(cSub.indexOf('?'));
    }
  }
  return "";
}
//// Landing Page form refresh not using current state in React Select and Formik
/// Does Formik Initial values need to refresh, or is it React Select that is not rehydrating after render

/// --> Begin the function to build the form
	
export default function FormPanel(props){
	const { 
		midpoint, 
		origin, 
		redirectURL,
		programFocus,
		formtype,
		formFocus,
		programSelect,
		programList,
		clientPrefix,
		campusCode,
		partnerCode,
		clientCTPA,
		defaultPhone,
		cid,
		dataType,
		location
		} = props;

	const searchVars = {};
	//const location = window.location;
	const locationSearch = (location && location.search)?location.search:null;
/// --> detect testing flags in url. and set test values as needed 
	const testLead=(locationSearch?.search('testform')>=0)?true:false;
	const testRedirect = (locationSearch?.search('redirect')>=0)?true:false

	const testDirect = (testLead && testRedirect)?true:false;  //only set to true if testform flag is present
	
/// -->> check for utm_source in query. if not there, set to null	
	const urlParams = (locationSearch?.search('utm_source')>=0)?locationSearch:null;

/// -->>check for cookie if no valid location query

	const persistParams = (typeof window!=='undefined' && urlParams!==null)?urlParams:getPersistCookie('__gtm_campaign_url');
	//console.log(persistParams,'parms')
	const searchParams = (persistParams)?new URLSearchParams(persistParams):'';
	if(searchParams){
		for(var item of searchParams.entries()){
			searchVars[item[0]]=decodeURIComponent(item[1]).toUpperCase();
		}
	}
///serialize search vars string for use in urls	
	let searchString = Object.entries(searchVars).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&');
	



	const [createLead, { data }] = useMutation(leadFormSend);

	
	const [state, setState] = React.useReducer(
	    (state, newState) => ({...state, ...newState}),
	    {formData:{
		    firstName:'',
			lastName:'',
			email:'',
			phoneNumber:'',
			//programCode:'',
			location:props.location,
			},
		submitted:false,
		request:false
		}
	  )
	const inputLabel = React.useRef(null);
	
	const [programCode, setProgramCode] = useState(programFocus); 

/// -->> this refreshes the state when the programSelect prop changes. 
	useEffect(() => {
	      setProgramCode(programSelect);
	  }, [programSelect])
	  	 

/// --> build program list for the select form element. this has to be an array of objects
let initialProgram = {value:'',label:'Select...'};	
let ProgramsSelectList= [];
for(const program in programList){
	let programObj = programList[program];
	if(programObj.value===programFocus){
		initialProgram = programObj;
	}
	
	ProgramsSelectList.push(programList[program])
}
/// -->> Define validation schema

//// -->> Need validation of react-select 

const phoneFormat = /^\(?([2-9][0-9]{2})\)?[-. ]?([1-9][0-9]{2})[-. ]?([0-9]{4})$/;
const phoneCodes = /^\((201|202|203|205|206|207|208|209|210|212|213|214|215|216|217|218|219|220|223|224|225|228|229|231|234|239|240|248|251|252|253|254|256|260|262|267|269|270|272|276|279|281|301|302|303|304|305|307|308|309|310|312|313|314|315|316|317|318|319|320|321|323|325|326|330|331|332|334|336|337|339|341|346|347|351|352|360|361|364|380|385|386|401|402|404|405|406|407|408|409|410|412|413|414|415|417|419|423|424|425|430|432|434|435|440|442|443|445|447|448|458|463|469|470|475|478|479|480|484|500|501|502|503|504|505|507|508|509|510|512|513|515|516|517|518|520|530|531|534|539|540|541|551|559|561|562|563|564|567|570|571|572|573|574|575|580|582|585|586|601|602|603|605|606|607|608|609|610|612|614|615|616|617|618|619|620|623|626|628|629|630|631|636|640|641|646|650|651|657|659|660|661|662|667|669|678|680|681|682|689|701|702|703|704|706|707|708|710|712|713|714|715|716|717|718|719|720|724|725|726|727|731|732|734|737|740|743|747|754|757|760|762|763|765|769|770|772|773|774|775|779|781|785|786|801|802|803|804|805|806|808|810|812|813|814|815|816|817|818|820|828|830|831|832|838|839|840|843|845|847|848|850|854|856|857|858|859|860|862|863|864|865|870|872|878|901|903|904|906|907|908|909|910|912|913|914|915|916|917|918|919|920|925|928|929|930|931|934|936|937|938|940|941|945|947|949|951|952|954|956|959|970|971|972|973|978|979|980|984|985|986|989)\)(.*)/;



const validateSchema = Yup.object().shape({
	                  email: Yup.string()
	                    .email()
	                    .required('We will need a valid email address'),
	                  firstName: Yup.string()
	                    .required("We'll need your first name"),
	                  lastName: Yup.string()
	                    .required("We'll need your last name"),	                
	                  phoneNumber: Yup.mixed()
	                  	.required("We'll need your phone number")
	                  	//.oneOf(phoneCodes,"A valid area code is needed")
	                  	//.test('is_areacode',"A valid phone number is needed", value=>phoneCodes.test(value))
	                  	//.test('is_centralcode',"A valid phone number is needed", value=>phoneCodes.test(value))
						.test('is_format',"A valid phone number is needed",value=>phoneFormat.test(value))
						//format is (876) 543-1090
						//central office code cannot start with 0 or 1, and cannot have 11 as the second 2 digits, and can't match 988
	                  
	                })		
	return(

		<section className="formPanel" data-version={props.formversion}>
		      <span className="spacer" id="leadform"/>
		      <div className={['formBox'].join(' ')}>
		        {testLead && (<span>TEST LEAD</span>)}

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
				 		programCode:'PERU_BSBA_CMIS',//{programCode},
				 		programs:'',
				 		request:false,
				 		isSingle:props.isSingle||false
				 		}}
	                onSubmit={(values, { setSubmitting}) => {
						//console.log('values',values);

////// ---- BEING SUBMISSION FUNCTION ---- //////	
/// *** Move to external function ***///					
						/** while sumbmitting and waiting for a repsonse, show spinner
						on response, if success, redirect to viewdo, else show thankyou message */
												
						setState({request:true})
						
						
/// --> Set dataLayer value based on form
						const dataLayerType = (formFocus==='applyForm')?'Start Application Button Click':'Request Info Button Click';

/// -->> Set the dataLayer for the button click event						
						if(values.request!==true && typeof window != 'undefined'){
							window.dataLayer.push({event:dataLayerType})
						}
						const sourceCode = searchVars.utm_source||'UNKNOWN';
						//cleanse phone number of non-numeric characters .replace(/\D/g,'')
						const body = {
						'captureUrl': location.href,
						'leadId': leadId,
						'partnerCode':partnerCode, /// Need to be variable
						'collegeCode': clientPrefix, /// Need to be variable
						'campusCode': campusCode, /// Need to be variable
						'sourceCode': sourceCode,
						'programCode': programCode||clientPrefix+'_UNDERGRAD_UNDECIDED', /// Need to be variable
						'phoneNumberCountry': 'US',
						'formType': origin,
						'email': values.email,
						'phoneNumber': values.phoneNumber,
						'firstName': values.firstName,
						'lastName': values.lastName,
						'deviceType': searchVars.utm_device||'UNKNOWN',
						"isTestLead": testLead,
						'sourceTracking': {
							'campaignName': searchVars.utm_campaign||undefined,
							'adGroupId': searchVars.utm_adgroup||undefined,
							'keyword': searchVars.utm_term||undefined,
							'matchType': searchVars.matchtype||undefined,
							'network': searchVars.network||undefined,
							'creativeId': searchVars.creative||undefined,
							'placement': searchVars.placement||undefined,
							'target': searchVars.target||undefined,
							'feedItemId': searchVars.feeditemid||undefined,
							'agencyTrackingCode':  searchVars.agencytrackingcode||undefined,
							'adGroupId': searchVars.adgroup_id||undefined
						}
						};
						//console.log('form',body)
						let crmData = (formtype=="crm")?[
								"firstname="+encodeURIComponent(values.firstName),
								"lastname="+encodeURIComponent(values.lastName),
								"email="+encodeURIComponent(values.email),
								"phone="+encodeURIComponent(values.phoneNumber),
								"ocid="+encodeURIComponent(programCode),
								"leadsource="+encodeURIComponent(sourceCode),
								"captureurl="+encodeURIComponent(location.href),
								"tcpaconsent="+true,
								"segment="+encodeURIComponent(programCode),///Legacy parameter
								searchString		
								
							]:'';
							
 /// -->> Google CrossDomain Tracking for handoff to redirect
 /// -->> Add these query parameters to any links that point to a separate tracked domain
						let crossDomainTrackingParams='';
						var _hsq = window._hsq = window._hsq || [];
						_hsq.push(['addIdentityListener', function(hstc, hssc, hsfp) {
							

						    crossDomainTrackingParams = '&__hstc=' + hstc + '&__hssc=' + hssc + '&__hsfp=' + hsfp;
						}]);	
						
/// -->> Set Redirect url if redirect prop is true
						let redirectTarget = (redirectURL)?decorateUrl(redirectURL+crmData.join('&')+crossDomainTrackingParams):null;
						
/// -->> if you want to test with no redirect...
						if(!testDirect && testLead){
							redirectTarget=null;
						}
						
/// -->> Create Lead via apollo UseMutuation hook

						createLead({ variables: {leadInput:body} }).then((response)=>{
								setSubmitting(false);
								//put redirect on creatlead:true
								if(response.data.createLead===true){
									(redirectTarget)?window.location.href = redirectTarget:setState({'submitted':true})
									}
							}).catch((e)=>{
								console.log(e.message, 'message')
								
							})

	                }}
	                
////// ---- END SUBMISSION FUNCTION ---- //////
	                
/// -->> Formik Validation Schema

	                validationSchema={validateSchema}
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
	                    setFieldValue,
	                    programs,
	                    programCode
	                  } = props;
	                  	                  
	                 return(
						<>
							<div className={["form_overlay",isSubmitting===true?'':'hide'].join(' ')}>
					        	<div className="loader">
				                	<h4>Sending Request</h4>
			                	</div>
				            </div>
							
		                    <form 
		                    	onSubmit={handleSubmit} 
		                    	className={[state.submitted?'hide':'', isSubmitting===true?'submitting':''].join(' ')}
		                    	id={formFocus}>
		                    	<div className="form-body">
									<div className="form-group"> 
							            <div 
							           
						            		className={[
							            		' selectControl', 
							            		values.isSingle?"single-program":""]
							            		.join(' ')
							            		}>
								            		
						            		<label
						            			htmlFor="programCode" 
						            			id={`programs-label-${cid}`}>
												
												Select a Program
												
									        </label>
									        <Select
												id={`programCode-${cid}`}
												className="program-select"
												name="programCode"
												aria-labelledby={`programs-label-${cid}`}
												value={programCode}
												defaultValue={initialProgram}
												options={ProgramsSelectList}
												//menuPlacement="auto"
												menuShouldScrollIntoView={true}
												onFocus={()=>{
													//(window.innerWidth< 1024)&&
													(cid!=='modal-form')&&
													offsetScroll(document.querySelector(`#${formFocus}`),60);
													
												}}
												onChange={selectedOption=>{
													let event = { target : { name:'programCode',value: selectedOption.value}}
													setProgramCode(selectedOption.value);
													//console.log(event)
													//handleChange(selectedOption);     
												}}
												styles={customStyles}
												>									        
									        </Select>
									        {
										        (errors.programCode && touched.programCode) && 
										        (<div className="errortext">{errors.programCode}</div>)
										     }

							            	
									       									       
									    </div>
						            </div>
						            <div className="form-group">
						            	<label id={`firstName-${cid}`}>First Name</label>
										<Field								
											name="firstName"
											id="firstName"
											aria-labelledby={`firstName-${cid}`}
											className={['textfield'].join(' ')}
											value={values.firstName}
											onChange={handleChange}
											onBlur={handleBlur}
											
										/>
										{
											(errors.firstName && touched.firstName) && 
											(<div className="errortext">{errors.firstName}</div>)
										}
									</div>
									<div className="form-group">
										<label id={`lastName-${cid}`}>Last Name</label>
										<Field
											name="lastName"
											id="lastName"
											aria-labelledby={`lastName-${cid}`}
											className={['textfield'].join(' ')}
											value={values.lastName}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{
											(errors.lastName && touched.lastName) && 
											(<div className="errortext">{errors.lastName}</div>)
										}
									</div>	
									<div className="form-group">
									<label id={`email-${cid}`}>Email Address</label>
										<Field
											type="email"
											id="email"
											name="email"
											aria-labelledby={`email-${cid}`}											
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{
											(errors.email && touched.email) && 
											(<div className="errortext">{errors.email}</div>)
										}
									</div>
									<div className="form-group">
										<label id={`phoneNumber-${cid}`}>Phone</label>
										 <NumberFormat										 	
											autoComplete="tel-national"
											id="phoneNumber"
											name="phoneNumber"
											aria-labelledby={`phoneNumber-${cid}`}
											type="tel"
											value={values.phoneNumber} 
											onChange={																
												handleChange('phoneNumber')
												
											}
											onBlur={handleBlur}											
											format="(###) ###-####" mask="_"
									      />
									      {
											(errors.phoneNumber && touched.phoneNumber) && 
											(<div className="errortext">{errors.phoneNumber}</div>)
											}
											
									</div>
									
								</div>
								
								<div className="leadform-actions">
									<div className="form-group">
										<button
											type="submit"
											
											variant="contained"
											color="primary"
											className={['aeopr-button','aeopr-primary-button','aeopr-send-button', props.buttonClass].join(' ')}
										
										>
											Request Info
										</button>
										<p className="ctaSection">
											or call <a className="mobile-only phone-link" href={`tel:+1 ${defaultPhone}`}>
											{defaultPhone}</a>
											<span className="desktop-only">{defaultPhone}</span>
										</p>
										<div className=" legal-text ctpaText">
											<p >{clientCTPA}</p>
										</div>
									</div>
								</div>
		                    </form>
	                    </>
	                  );
	                }}
		        </Formik>
		      </div>
		    </section>
		)
	}