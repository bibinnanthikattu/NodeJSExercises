const createApp = require('./app.js')

const app=createApp();
app.listen(5000, () => {
    console.log('server is running on port 5000');
})