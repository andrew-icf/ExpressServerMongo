var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function(){
   nodemon({
     script: 'app.js', // what it is going to run
     ext: 'js', // what is is watching for
     env: {
       PORT: 8000
     },
     ignore: ['./node_modules/** ']
   })
   .on('restart', function(){
     console.log('Restarting...');
   });
});
