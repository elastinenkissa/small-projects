const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const blogRoute = require("./controllers/blog-controller");

app.use("/api/blogs", blogRoute);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
