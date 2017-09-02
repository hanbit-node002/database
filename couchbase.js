var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://localhost');
var bucket = cluster.openBucket('beer-sample');
var N1qlQuery = couchbase.N1qlQuery;

bucket.query(
    N1qlQuery.fromString('SELECT name, category FROM `beer-sample` WHERE type = $1 LIMIT 5'),
    ['beer'],
    function(err, result) {
        if (err) {
            console.log(err);
            return;
        }

        console.log(result);
        bucket.disconnect();
    });


/*bucket.remove('hanbit_test', function(err, result) {
    if (err) {
        console.log(err);
        return;
    }

    console.log(result);
    bucket.disconnect();
});*/

/*bucket.upsert('hanbit_test', {
    name: 'hanbit',
    type: 'education'
}, function(err, result) {
    if (err) {
        console.log(err);
        return;
    }

    console.log(result);
    bucket.disconnect();
});*/

/*
bucket.get('21st_amendment_brewery_cafe', function(err, result) {
    if (err) {
        console.log(err);
        return;
    }

    console.log(result.value.name);
    bucket.disconnect();
});*/
