const CleanCSS = require("clean-css");
const slugify = require("slugify");
const htmlmin = require("html-minifier");
module.exports = function(eleventyConfig, data) {
	eleventyConfig.addNunjucksFilter("cssmin", function(code) {
		return new CleanCSS({}).minify(code).styles;
	});
	eleventyConfig.addFilter("publishPath", (input)=>{
			return '';
	});
	eleventyConfig.addFilter("slug", (input) => {
	  const options = {
	    replacement: "-",
	    remove: /[&,+()$~%.'"\/:*!?<>{}]/g,
	    lower: true
	  };
	  return slugify(input, options);
	});
	
	eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

	return {
		
	};
	

};
