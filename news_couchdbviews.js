var couchbase = require('couchbase');

exports.setup = function( config ) {

    var bsbucket = new couchbase.Connection( config, function( err ) {
        if(err) {
            console.log("Unable to connect to server");
            console.log(config);
            process.exit(1);
        }

	 var ddoc = {
		"views": {
		  "news_by_section": {
			"map": 
			  "function (doc, meta) { \n"+
				"    emit(doc.sectionName,doc.fields.headline); \n"+
				"  } \n"
			   , "reduce" : "_count"
		  },
		  "news_by_date": {
			"map": 
			 "function (doc, meta) { \n"
			+"  if (doc.webPublicationDate) { \n"
			+"     emit(dateToArray(doc.webPublicationDate)); \n"
			+"    } \n"
			+"  } \n"
			,"reduce" : "_count"
		  }                    
		}
	  };
	bsbucket.setDesignDoc('dev_news', ddoc, function(err, resp, data) { 
		if (err) { 
			console.log(err);
			process.exit(1);
		} 
		process.exit(0);
	});
	
 });
}

exports.reset = function( config ) {
  var bsbucket = new couchbase.Connection( config, function( err ) {
    if(err) {
      console.error("Failed to connect to cluster: " + err);
      process.exit(1);
    }

    bsbucket.getDesignDoc( "dev_news", function( err, ddoc, meta ) {
      console.log(err);
      console.log('get done');

      delete ddoc['views']['news_by_section'];
      delete ddoc['views']['news_by_date'];
      bsbucket.setDesignDoc( "dev_news", ddoc, function( err, res ) {
        console.log('set done');

        if(err) {
            console.log( 'ERROR' + err );
            process.exit(1);
        } else {
            console.log( 'Updated ');
        }
        process.exit(0);
      });
    });
  });
}