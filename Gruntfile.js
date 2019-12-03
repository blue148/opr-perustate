module.exports = function(grunt){
	grunt.initConfig({
		//builds svg libraries
		svgstore: {
			options: {
			  prefix : 'icon-', // This will prefix each ID
			},
			default: {
				files:{
					'_includes/libraries/svg-defs.svg':['_includes/svgs/*.svg'],
				}	
			},
		},
	  // define source files and their destinations
		uglify: {
			my_target:{

			    files: [{ 
			        src: '_includes/js/src/*.js',  // source files mask
			        dest: '_includes/js/',    // destination folder
			        expand: true,    // allow dynamic building
			        flatten: true,   // remove all unnecessary nesting
			        ext: '.min.js'   // replace .js to .min.js
			    }]
			}
		},
		watch: {
		    js:  { files: '_includes/js/src/*', tasks: [ 'uglify' ] },
		},
		sass: {
		    dist: {
				files: {
					'_includes/css/main.css': '_includes/scss/main.scss'
				}
		    }
		}
	});
	//grunt.loadNpmTasks('grunt-svgstore');

	// load plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-sass');
	
	// register at least this one task
	grunt.registerTask('default', [ 'uglify','sass' ]);
}