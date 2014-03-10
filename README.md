This is a simple web application built on node.js,angular.js and couchbase db.Basically,it is retrieving data from couchbase db using different queries and displaying it in various formats.This data is pushed to couchbase db using my simple java application.Please refer to https://github.com/selmantayyar/GuardianRestClient.

##PREREQUISITES

- Install Couchbase Server. http://www.couchbase.com/download
- Populate the data into couchbase server. https://github.com/selmantayyar/GuardianRestClient
- Install node.js http://nodejs.org/
- Install Couchbase node.js sdk
If you are installing it on windows 7,please refer to my collected experience,since it is a bit tricky: http://selmantayyar.wordpress.com/2013/11/25/installing-couchenode-on-windows-7/
For other OS,refer to http://www.couchbase.com/communities/nodejs/getting-started

##CONFIGURATION
-Change db configuration in app.js file accordingly.


##RUNNING
First install the db views,then run the application:

    node app.js --setup
    
    node app.js

Navigate to [http://localhost:3200](http://localhost:3200) and enjoy it!
