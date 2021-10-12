const express = require('express')
const app = express()
const port = 3000
const { Gpio } = require("onoff")

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/pin/:pin", (req, res) => {
    if (isNaN(req.params.pin)) {
        res.send("Not a Number").status(400)
        return
    }

    let lednr = parseInt(req.params.pin)
    let led = new Gpio(lednr, "out")

    led.writeSync(led.readSync() ^ 1);

    res.send(`Switched ${req.params.pin}`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
