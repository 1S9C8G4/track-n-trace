import express from 'express'
import React from 'react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {renderToStaticMarkup} from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import Booking from './booking'
import App from '../shared/components/App'
import reducer from '../shared/reducer'

const app = express()

const parseBody = async (req, body='') => {
  return new Promise(resolve => {
    req.on('data', (part) => body += part);
    req.on('end', () => resolve(JSON.parse(body)));
  })
}

const getProvider = (url, store) => {
  return renderToStaticMarkup(
    <Provider store={store}>
      <StaticRouter location={url} context={{}}>
        <div id="root">
          <App/>
        </div>
      </StaticRouter>
    </Provider>
  )
}

const watchBookings = async () => {
  const bookings = await Booking.getAll()
  bookings.filter(booking =>
    booking.state !== 'Fetched' || booking.watch 
  ).forEach(Booking.updateHistory)
  setTimeout(watchBookings, 1000 * 60)
}

app.get('/', async (req, res) => {
  const bookings = await Booking.getAll()
  const store = createStore(reducer, {bookings})
  const provider = getProvider(req.url, store)
  const state = store.getState()
  res.render('view', {provider, state})
})

app.get('/bookings/:number', async (req, res) => {
  const bookings = await Booking.getAll()
  const booking = await Booking.get(req.params.number)
  const store = createStore(reducer, {bookings, booking})
  const provider = getProvider(req.url, store)
  const state = store.getState()
  res.render('view', {provider, state})
})

app.post('/api/bookings', async (req, res) => {
  const body = await parseBody(req)
  Booking.create(body.number)
  res.send()
})

app.get('/api/bookings/:number', async (req, res) =>
  res.send(await Booking.get(req.params.number))
)

app.put('/api/bookings/:number', async (req, res) => {
  const body = await parseBody(req)
  const booking = await Booking.get(req.params.number)
  booking.watch = body.watch
  await Booking.update(booking)
  res.send()
})

app.delete('/api/bookings/:number', async (req, res) =>
  Booking.destroy(req.params.number).then(() => res.send())
)

app.set('view engine', 'ejs')
app.set('views', __dirname + '/../../src/server')
app.use(express.static(__dirname + '/../../dist'))

watchBookings()
app.listen(3000)
