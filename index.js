// index.js
// where your node app starts

// init project
var express = require('express');
var path = require('path');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(path.join(__dirname, 'public')));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// timestamp endpoint
app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;

  const validateDate = passedValue => {
    const date = new Date(passedValue);
    let isValid = true;

    if (isNaN(date) || !isFinite(date)) {
      isValid = false;
    }

    return { passedDate: date, isValid };
  };

  let timestamp;

  if (!dateParam) {
    timestamp = {
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
    };

    return res.json(timestamp);
  }

  if (/^\d+$/.test(dateParam)) {
    dateParam = +dateParam;
  }

  const { passedDate, isValid } = validateDate(dateParam);

  if (isValid) {
    timestamp = {
      unix: passedDate.getTime(),
      utc: passedDate.toUTCString(),
    };

    res.json(timestamp);
  } else {
    res.json({ error: 'Invalid Date' });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
