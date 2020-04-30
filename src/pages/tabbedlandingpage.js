import React, {useEffect} from "react"
import { graphql } from "gatsby"
import {Helmet} from "react-helmet"
//import queryString from 'query-string'

import Layout from "../components/tabbedlayout"


export default ({data, location}) => {
//parse pararmeters for cofingruation. console.log(queryString.parse(location.search),' master')
//add META field to CMS: Title,
const expId = process.env.GATSBY_EXPID||null;
	useEffect(()=>{
		//if there is an experiment running, create data layer vars
		if(expId){
				window.dataLayer.push({
				     'experimentId': expId,
				     'variationId': '0'
				  })
		}
	},[]
	)
	return (
	<>
		<Helmet>
			<script>{`
				`}
			</script>

			  <meta charSet="utf-8" />
			  <title>{data.contentfulNestedTabbedLandingPage.heroArea.headline.replace(/(<([/fp]+)>)/ig,"").replace(/ (?=[^ ]*$)/i, " ")}</title>
			  <meta name="robots" content="noindex, nofollow"/>
			  <script src="https://www.googleoptimize.com/optimize.js?id=GTM-TRVW6KX"></script>
			</Helmet>


	    <Layout
	    {...data.contentfulNestedTabbedLandingPage}
	    programs={data.allContentfulProgramInfo}
	    location={location}
	    />

    </>

  )
}


export const query = graphql`
	query tabbedpagequery($slug: String){	
		contentfulNestedTabbedLandingPage(slug: { eq: $slug }){
			id
			slug
			metaTitle
			callout{
				content{
					icon
					message
					display
				}
			}
			heroArea {
		        headline
		        subHeadline
		        itemsType
		        bullets @skip(if:false)
		        items{
			        content{
				        icon
				        tagline
				        }
				    }
		        image {
		          fields {
		            file {
		              en_US {
		                url
		              }
		            }
		          }
		        }
		      }
	          mainContentSection {
	            headline
	            content
	          }
	          tabbedContent {
		        ... on ContentfulProgramTabContent {
	              pageName
		            programs {
			          pageSlug
		              pageName
		              programCode
		              programDetails {
			              headline
						  content
		              }
		              careerOpportunities{
		              	content
		              }
		              programInfo{
			              items{
				              content{
					              tagline
					              icon
				              }
				            }
			              }
		              applyBy
		              totalCost
		              startClasses
		              tuition
		              transferrableCredits
		              creditHours
		            }
				}
				... on ContentfulProgramInfo {
	              pageName
	              pageSlug
	              programCode
	              applyBy
	              startClasses
	              totalCost
	              transferrableCredits
	              tuition
	              programDetails {
		              headline
					  content
	              }
	              programInfo{
			              items{
				              content{
					              tagline
					              icon
				              }
				            }
			              }

	              careerOpportunities{
		              content
		              }
	            }
	          }
	          accolades {
	            headline
	            items {
	              content {
	                icon
	                tagline
	              }
	            }
	          }
	          testimonial {
	            testimonial {
	              image {
	                fields {
	                  file {
	                    en_US {
	                      url
	                    }
	                  }
	                }
	              }
	              content
	            }
	          }
	          awards {
	            headline
	            items {
	              content {
	                image {
	                  fields {
	                    file {
	                      en_US {
	                        url
	                      }
	                    }
	                  }
	                }
	              }
	            }
	          }
	          bottomContentSection {
	            headline
	            content
	          }
	          formSettings {
	            headline
	            subheadline
	            successMsg
	            redirect
	            redirectUrl
	            phone
	          }
	         
		}
		allContentfulProgramInfo {
			edges{
				node{
					id
			        shortName
			        programCode
			        pageSlug
			    }
		     }
		  }
	}  
`