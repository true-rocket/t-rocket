function getGeoCode(adr){
  let seachUrl = 'https://geocoder.api.here.com/6.2/geocode.json?app_id=1gYrfhf0I1rCvOSmx8pA&app_code=5kiWkDTMG4PS4slLKuhzbA&searchtext='
  const https = require('https')
  seachUrl += encodeURIComponent(adr)
  https.get(url, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);

      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        if (parsedData.Responce.View.Result.length > 0){
           return parsedData.Responce.View.Result[0].Location.NavigationPosition[0]
        }
          return false
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
}

module.exports = {getGeoCode};
