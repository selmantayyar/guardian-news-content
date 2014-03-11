var news_views = require('./news_couchdbviews');
var news_app = require('./news_app');
var common = require('./common.js');

// connection configuration to pass on to couchbase.connect(). 
var config=common.dbconfig;


if( require.main == module ) {
    argv = process.argv.splice(2);
    if( argv[0] === '--setup' ) { // Create the design documents for news
        news_views.setup( config );
    } else if( argv[0] === '--reset' ) {  // Reset what was done by -d option
        news_views.reset( config );
    } else {
        news_app.start( config );
    }
}
