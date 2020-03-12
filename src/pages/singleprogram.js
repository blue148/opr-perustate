import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
//import queryString from 'query-string'

import Layout from "../components/singleprogramlayout"


export default ({data, location}) => {
//parse pararmeters for cofingruation. console.log(queryString.parse(location.search),' master')
	return (
	<>
		<Helmet>
		  <meta charSet="utf-8" />
		  <title>{data.contentfulSingleProgramLandingPage.heroArea.headline.replace(/(<([/fp]+)>)/ig,"").replace(/ (?=[^ ]*$)/i, "&nbsp;")}</title>
		  <meta name="robots" content="noindex, nofollow"/>
		</Helmet>
		<Layout
		{...data.contentfulSingleProgramLandingPage}
		programs={data.allContentfulProgramInfo}
		location={location}/>
    </>

  )
}


export const query = graphql`
	query singleprogramquery($slug: String){	
		contentfulSingleProgramLandingPage(slug: { eq: $slug }) {
			pageName
		      slug
		      heroArea {
		        headline
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
    	      programContent {
			    programCode
			    pageName
	            programDetails {
	              headline
	              content
	            }
	            programInfo {
	              items {
	                content {
	                  icon
	                  tagline
	                }
	              }
	            }
	            careerOpportunities {
	              headline
	              content
	            }
	            applyBy
	            startClasses
	          }
		      accolades {
		        items {
		          content {
		            icon
		            tagline
		          }
		        }
		        headline
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