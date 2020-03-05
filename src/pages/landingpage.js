import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"


export default ({data}) => {
	return (
    <Layout
    {...data.contentfulNestedTabbedLandingPage}/>
  )
}


export const query = graphql`
	query landingpagequery($slug: String){	
		contentfulNestedTabbedLandingPage(slug: { eq: $slug }){
			id
			slug
			phonenumber
			formheadline
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
	            items {
	              content {
	                icon
	                tagline
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
		              pageName
		              programDetails {
					  	content
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
	              applyBy
	              startClasses
	              totalCost
	              transferrableCredits
	              tuition
	              programDetails {
	               content
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
		}
	}  
`