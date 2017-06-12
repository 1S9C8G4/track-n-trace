import request from 'request'
import cheerio from 'cheerio'

const PILSHIP_REPALCE = 'PABV'
const PILSHIP_URL = 'https://www.pilship.com/shared/ajax/?fn=get_tracktrace_job&ref_num='
const CHEERIO_SPLITTER = '<br/>'
const CHEERIO_OPTIONS = {xmlMode: true}

const SCHEDULETABLE_SELECTORS = [{
    key: 'arrival',
    selector: '.arrival-delivery',
    split: 2
  },{
    key: 'origin',
    selector: '.location',
    split: 1
  },{
    key: 'destination',
    selector: '.next-location',
    split: 1
  }, {
    key: 'vessel',
    selector: '.vessel-voyage',
    split: 1
  }, {
    key: 'voyage',
    selector: '.vessel-voyage',
    split: 2
}]

const getDataFromPilship = async (number) => {
  return new Promise((resolve, reject) => {
     request(`${PILSHIP_URL}${number.replace(PILSHIP_REPALCE, '')}`, (e, r, body) => {
      try {
        resolve(JSON.parse(body.trim()).data)
      } catch (er) {
        reject(er)
      }
    })
  })
}

const parseScheduletableData = ($) => {
  return SCHEDULETABLE_SELECTORS.reduce((result, item) => {
    result[item.key] = $(item.selector).html().split(CHEERIO_SPLITTER)[item.split]
    return result
  }, {})
}

const parseContaierData = ($) => {
  return {
    containers: $('.resultrow').toArray().map(row =>
      [ $(row).find('.container-num:first-child b').html(),
         $(row).find('.container-type').text()
      ].join('-')
    ).join(' | ')
  }
}

export default async (number, line='PIL', state='Fetched') => {
  try {
    const data = await getDataFromPilship(number)
    const scheduletableData = parseScheduletableData(cheerio.load(data.scheduletable, CHEERIO_OPTIONS))
    const containerData = parseContaierData(cheerio.load(data.containers, CHEERIO_OPTIONS))
    return Object.assign(scheduletableData, containerData, {line, state})
  } catch (er) {
     return {
      state: 'Failed'
    }
  }
}
