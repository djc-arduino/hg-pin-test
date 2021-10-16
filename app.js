const express = require('express')
const app = express()
const port = 3000
const { Gpio } = require("onoff")

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const switchIn = new Gpio( '16', 'in', 'both' );

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
