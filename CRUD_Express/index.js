const express = require("express")
const con = require('./db');
const app = express();

app.use(express.json());
app.set('port', process.env.APP_PORT );
app.set('host', process.env.APP_HOST );

con.on('open', () => {
    console.log('conneted...')
});

app.use('/user', require("./user/routes"))


app.listen(app.get('port'), () => console.log(`Application started on port ${app.get('port')} \n\Link: http://${app.get('host')}:${app.get('port')}`));