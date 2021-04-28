
var server = require('./index');
const {db} = require('./src/db')

const force = true;
db.sync({ force })
    .then(function () {
        server.listen(3001, {origins: '*'}, function () {
            console.log('Server is listening on port 3001!');
        });
    });
