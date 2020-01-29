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
	query($pageName:String!){
		
		 contentfulNestedTabbedLandingPage(pageName: {eq:$pageName}){
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
              tabName
	            programs {
	              programTitle
	              programDetails {
	                programDetails
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
              programTitle
              applyBy
              startClasses
              totalCost
              transferrableCredits
              tuition
              programDetails {
                programDetails
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