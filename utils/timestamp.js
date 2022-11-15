import { format } from 'date-fns'

var formatDistance = require('date-fns/formatDistance')
const dateFormat = "dd/MM/yyyy"
const dateFormatWithTime = "dd/MM/yyyy HH:mm"

const formatToDate = (value) => {
    var date = new Date(value)
    return format(date, dateFormatWithTime)
}

const formatToOnlyDate = (value) => {
    var date = new Date(value)
    return format(date, dateFormat)
}

const formatToDistance = (value) => {
    var currentDate = new Date()
    var date = new Date(value)
    return formatDistance(currentDate, date, { addSuffix: true })
}

export { formatToDate, formatToDistance, formatToOnlyDate };