import { getRequest } from "./requests";
import { getRandomColor, getDate } from "./utils"

export const getCountries = (countries, variable) => {
    const labels = countries.map(country => country.location)
    const data = [{
        label: `${variable.replaceAll("_", " ")} of every country`,
        data: countries.map(country => country[variable] ? country[variable] : 0),
        colors: countries.map(() => getRandomColor())
    }]
  
    return { data, labels }
}

export const getDataCountry = (dataCountry, country, variable) => {
    const labels = []
    const data = [{
        label: `${variable.replaceAll("_", " ")} of ${country.location}`,
        data: dataCountry.map(dato => {
            labels.push(getDate(dato['dateR']))
            return dato[variable] ? dato[variable] : 0
        }),
        colors: [getRandomColor()]
    }]

    return { data, labels }
}

export const getContinents = (continents, variable) => {
    const labels = continents.map(continent => continent.name ? continent.name : "Unknown")
    const data = [{
        label: `${variable.replaceAll("_", " ")} of every continent`,
        data: continents.map(continent => continent[variable] ? continent[variable] : 0),
        colors: labels.map(() => getRandomColor())
    }]
  
    return { data, labels }
}

export const getDataContinent = async (dataContinent, continent, variable) => {
    const labels = (await getRequest('dates')).map(dato => getDate(dato['dateR']))
    const temp = {}
    dataContinent.map(dato => {
        if (temp[dato.isoCode]) {
            temp[dato.isoCode].push(dato)
        } else {
            temp[dato.isoCode] = [dato]
        }
    })

    const data = Object.keys(temp).map(key => {
        const dato = temp[key]
        return {
            label: `${dato[0].location ? dato[0].location : "Unknown"}`,
            data: dato.map(d => d[variable] ? d[variable] : 0),
            colors: [getRandomColor()]
        }
    })
    
    return { data, labels }
}