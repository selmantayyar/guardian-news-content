var data = {
  "posts": [
    {
      "title": "Lorem ipsum",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "title": "Sed egestas",
      "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
    }
  ]
};
var couchbase = require('couchbase');
var config = {
    host : [ "localhost:8091" ],
    bucket : 'guardian'
}
// GET

exports.posts = function (req, res) {
  console.log('POSTS being listed');
  var posts = [];
  data.posts.forEach(function (post, i) {
    posts.push({
      id: i,
      title: post.title,
      text: post.text.substr(0, 50) + '...'
    });
  });
  res.json({
    posts: posts
  });
};

exports.post = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.posts.length) {
    res.json({
      post: data.posts[id]
    });
  } else {
    res.json(false);
  }
};

// POST
exports.addPost = function (req, res) {
  data.posts.push(req.body);
  res.json(req.body);
};

// PUT
exports.editPost = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }
};

// DELETE
exports.deletePost = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};

exports.search = function (req, res) {
  var keyword = req.params.keyword;
  console.log('STEP 1 '+req.params.keyword);
  if (keyword) {
    res.json({
      posts: data.posts
    });
  } else {
    res.json(false);
  }
};
exports.categories = function (req, res) {
  console.log('categories being listed');

  var db = new couchbase.Connection( config, function( err ) {
    if(err) {
      console.error("Failed to connect to cluster: " + err);
      process.exit(1);
    }

    console.log('Couchbase Connected');
  });

  var q = { limit:1000, group_level:1};
    db.view( "dev_news", "news_by_section", q).query(function(err, results) {

      res.json({
        posts: results
      });
    });
};

exports.news = function (req, res) {
  var category = req.params.category;

  console.log('news being listed by category '+category);

  var db = new couchbase.Connection( config, function( err ) {
    if(err) {
      console.error("Failed to connect to cluster: " + err);
      process.exit(1);
    }

    console.log('Couchbase Connected');
  });

  var params = { limit:1000, reduce:false};
  params.key =category;
    db.view( "dev_news", "news_by_section", params).query(function(err, results) {

      res.json({
        posts: results
      });
    });
};

exports.newsById = function (req, res) {
  var id = req.params.id;
  //var id="football/2014/jan/01/arsenal-cardiff-city-premier-league";

  console.log('news being listed by id '+id);

  var db = new couchbase.Connection( config, function( err ) {
    if(err) {
      console.error("Failed to connect to cluster: " + err);
      process.exit(1);
    }

    console.log('Couchbase Connected');
  });

    db.get(id,function(err, results) {
      
      res.json({
        post: results
      });
    });
};
exports.newsByDateStats = function (req, res) {

  var db = new couchbase.Connection( config, function( err ) {
    if(err) {
      console.error("Failed to connect to cluster: " + err);
      process.exit(1);
    }

    console.log('Couchbase Connected');
  });

  var params = { limit:1000, reduce:true,group:true,group_level:2};
  db.view( "dev_news", "news_by_date", params).query(function(err, results) {

      res.json({
        posts: results
      });
    });
};
exports.newsByDate = function (req, res) {
  var params = { limit:1000, reduce:false};
  var date = req.params.date;
  params.startkey = eval(date);
  var ek = eval(date);
  ek.push({});
  params.endkey = ek;

  console.log('news being listed by date '+date);

  var db = new couchbase.Connection( config, function( err ) {
    if(err) {
      console.error("Failed to connect to cluster: " + err);
      process.exit(1);
    }

    console.log('Couchbase Connected');
  });
  
   db.view( "dev_news", "news_by_date", params).query(function(err, results) {
    var keys=new Array();
    for (var i = 0; i < results.length; i++) {
        keys.push(results[i].id);
        console.log('id is: '+results[i].id);
      }
        db.getMulti(keys,null,function(error,data){
          if (err) throw err;
          res.json({
          posts: data
        });
      });
      
    });
};