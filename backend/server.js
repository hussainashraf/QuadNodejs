const express = require('express')
const app = express()
const port = 4000
const Crypto = require('./schemas/crypto')
const axios = require('axios');
const cors = require('cors');
const mongoose = require('./dbConfiguration')
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

const fetchDataAndStoreInDB = async () => {
    try {
      const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
      const top10Cryptos = Object.values(response.data).slice(0, 10);
    //  console.log(top10Cryptos)
      await Crypto.deleteMany({}); // Clear existing data
  
      await Crypto.insertMany(top10Cryptos);
      console.log('Data stored in the database.');
    } catch (error) {
      console.error('Error fetching and storing data:', error.message);
    }
  };
  
fetchDataAndStoreInDB();

app.get('/api/cryptoData', async (req, res) => {
    try {
      const data = await Crypto.find({});
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`)
})