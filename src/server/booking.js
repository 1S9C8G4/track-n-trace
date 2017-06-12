import redis from 'redis'
import getPilshipData from './pilship'

const KEY = 'bookings'

const ATTRS = [
  'line',
  'arrival',
  'origin',
  'destination',
  'vessel',
  'containers'
]

const STATE = 'Fetching'

const db = redis.createClient()

const destroy = async (number) => {
  return Promise.all([
    new Promise(resolve =>
      db.srem(KEY, number, resolve)
    ), 
    new Promise(resolve =>
      db.del(`${KEY}:${number}`, resolve)
    )
  ])
}

const getAll = async () => {
  const numbers = await getNumbers()
  return Promise.all(numbers.map(get))
}

const getNumbers = async () => {
  return new Promise(resolve =>
    db.smembers(KEY, (er, numbers) => resolve(numbers))
  )
}

const get = async (number) => {
  return new Promise(resolve =>
    db.get(`${KEY}:${number}`, (er, data) => resolve(JSON.parse(data)))
  )
}

const create = async (number, state=STATE, history=[]) => {
  return Promise.all([
    new Promise(resolve =>
      db.sadd(KEY, number, resolve)
    ),
    new Promise(resolve =>
      db.setnx(`${KEY}:${number}`, JSON.stringify({state, number, history}), resolve)
    )
  ]).then(async () =>
    updateHistory(await get(number))
  )
}

const update = async (booking) => {
  return new Promise(async (resolve) =>
    db.set(`${KEY}:${booking.number}`, JSON.stringify(booking), resolve)
  )
}

const updateHistory = async (booking) => {
  const latest = await getPilshipData(booking.number)
  const last = booking.history[booking.history.length - 1] || {}
  if (shouldUpdateHistory(last, latest)) {
    booking.history.push(latest)
  }
  booking.state = latest.state
  await update(booking)
}

const shouldUpdateHistory = (last, latest)  => {
  return ATTRS.some(key => last[key] !== latest[key])
}

export default {
  get,
  getAll,
  getNumbers,
  create,
  update,
  updateHistory,
  destroy  
}
