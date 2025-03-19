const express = require("express");
const ytdl = require("ytdl-core");
const PORT = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/download", async (req, res) => {
  const videoId = req.query.url.split("v=")[1];
  const videoInfo = await ytdl.getInfo(req.query.url);

  res.render("download", {
    url: "https://www.youtube.com/embed/" + videoId,
    info: videoInfo.formats.sort((a, b) => {
      return a.mimeType < b.mimeType;
    }),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Localhost: https://localhost:${PORT}`);
});
