const Promise = require('bluebird')
const path = require('path')
var slugify = require('slugify')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const landingPage = path.resolve('./src/pages/landingpage.js')
    resolve(
      graphql(
        `
          {
              allContentfulNestedTabbedLandingPage {
              edges {
                node {
                  pageName
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
		//do this for each type of page... partnerpages, NestedTabbed, Tabbed, ProgramPages
		//this will create pages with each template 
        const pages = result.data.allContentfulNestedTabbedLandingPage.edges
        pages.forEach((page, index) => {
	        const pageSlug = slugify(page.node.pageName, {lower: true});
			createPage({
				path: `/lp/${pageSlug}/`,
				component: landingPage,
				context: {
				  pageName: page.node.pageName
				},
			})
        })
      })
    )
  })
}