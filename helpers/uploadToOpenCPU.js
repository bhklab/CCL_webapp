const axios = require('axios');

async function uploadToOpenCPU(url, data) {
  const resp = await axios({
    method: 'post',
    url,
    data: { list: data },
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    maxContentLength: 100000000,
    maxBodyLength: 1000000000,
  }).catch((err) => {
    throw err;
  });
  console.log('uploadToOpenCPU: response:', resp.data);
}

module.exports = uploadToOpenCPU;
