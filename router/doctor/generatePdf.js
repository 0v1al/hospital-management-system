const express = require("express");
const router = express.Router();
const pdf = require("html-pdf");
const authorization = require("../../middlewares/authorization");

const pdfTemplate = require("../../documents/templatePdf");

router.post("/create-pdf", authorization ,(req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile(`${__dirname}/result.pdf`, err => {
    if (err) {
       res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

router.get("/get-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});


module.exports = router;