const express = require('express')
const app = express()
const port = 3000
const { Gpio } = require("onoff")

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/pin/:pin/:state", (req, res) => {
    if (isNaN(req.params.pin)) {
        res.send("Pin Not a Number").status(400)
        return
    }
    if (isNaN(req.params.state)) {
        res.send("State Not a Number").status(400)
        return
    }

    let lednr = parseInt(req.params.pin)
    let led = new Gpio(lednr, "out")
    let state = parseInt(req.params.state)
    
    console.log(`Pin: ${lednr}\t|\tState: ${state}`);

    led.writeSync(state);

    res.send(`Switched ${req.params.pin}`)
})

const switchIn = new Gpio( '17', 'in', 'both' );

switchIn.watch( ( err, value ) => {
  if( err ) {
    console.log( 'Error', err );
  }

  // log pin value (0 or 1)
  console.log( 'Pin value', value );
} );



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
