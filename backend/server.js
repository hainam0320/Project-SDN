const app = require('./app');

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Backend is running!');
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
