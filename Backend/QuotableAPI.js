const axios = require("axios");
const uri = "https://loripsum.net/api/1";
const QuotableAPI = async () => {
  const data2 = await axios.get(uri);
  return data2;
};

module.exports = QuotableAPI;
