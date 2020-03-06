const Promise = require('bluebird')
const path = require('path')
var slugify = require('slugify')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty'
    }
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const landingPage = path.resolve('./src/pages/landingpage.js')
  return new Promise((resolve, reject) => {
    
    resolve(
      graphql(
        `
          {
            allContentfulNestedTabbedLandingPage {
		      edges {
		        node {
		          slug
		          id
		        }
		      }
		    } 
		    allContentfulProgramInfo {
			    edges {
			      node {
			        id
			        pageSlug
			      }
			    }
			  }         
		  }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors,' Node Errors')
          reject(result.errors)
        }
		//do this for each type of page... partnerpages, NestedTabbed, Tabbed, ProgramPages
		//this will create pages with each template 
		result.data.allContentfulNestedTabbedLandingPage.edges.forEach((edge) => {
			createPage({
				path: `/lp/${edge.node.slug}/`,
				component: landingPage,
				context:{
					slug: edge.node.slug
				}
			})
        })
        result.data.allContentfulProgramInfo.edges.forEach((edge) => {
			createPage({
				path: `/lp/${edge.node.pageslug}/`,
				component: landingPage,
				context:{
					slug: edge.node.pageslug
				}
			})
        })
      })
    )
  })
}