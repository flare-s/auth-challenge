const server = require("./server.js");

const PORT = process.env.PORT || 3333;

console.log(process.env.DB_FILE, process.env.COOKIE_SECRET);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
