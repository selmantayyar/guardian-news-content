var news_views = require('./news_couchdbviews');
var news_app = require('./news_app');

// connection configuration to pass on to couchbase.connect(). 
var config = {
    host : [ "localhost:8091" ],
    bucket : 'guardian'
}

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
