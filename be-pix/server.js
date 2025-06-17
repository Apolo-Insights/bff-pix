const express = require("express");
const cors = require("cors");
const { QrCodePix } = require("qrcode-pix");
const app = express();
const port = 7777;

// Configuração CORS específica para suportar HTTPS
const corsOptions = {
  origin: (origin, callback) => {
    // Libera acesso de qualquer origem segura
    if (!origin || origin.startsWith('https')) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  }
};

app.use(cors(corsOptions));

app.get("/qrcode", async (req, res) => {
  const { value } = req.query;
  const qrCodePix = QrCodePix({
    version: "01",
    key: "11976900686",
    name: "Joao kevin Formiga",
    city: "SAO PAULO",
    message: "Pagamento PIX",
    cep: "05822010",
    value: parseFloat(value),
  });

  res.send(await qrCodePix.base64());
});

app.listen(port, () => {
  console.log(`SERVER RUNNING AT: http://apollo-pix-deploy-dwczd2h5bbdncchb.eastus-01.azurewebsites.net:${port}`);
});