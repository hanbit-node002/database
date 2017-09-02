var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'hanbit',
    password: 'hanbit',
    database: 'hanbit',
    connectionLimit: 3
});

pool.getConnection(function(err, conn) {
    var insertSql = 'INSERT INTO tbl_member (id, pw, email, create_dt) ' +
        'VALUES (?, ?, ?, NOW())';

    conn.query(insertSql,
        ['hanbit6', 'abcd', 'hanbit6@hanbit.com'],
        function(err, result) {
            if (err) {
                console.log(err);
                return;
            }

            console.log(result.affectedRows + '건 입력되었습니다.');

            conn.release();

            selectMembers();
        });
});


function selectMembers() {
    pool.getConnection(function(err, conn) {
        var sql = 'SELECT * FROM tbl_member';

        conn.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            pool.end();

            printMembers(result);
        });
    });
}

function printMembers(members) {
    members.forEach(function(member) {
        console.log(member.id, member.email, member.create_dt);
    });
}








