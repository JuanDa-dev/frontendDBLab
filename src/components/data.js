import { getRequest } from "./requests";

const url = 'http://localhost:3001/'

export const continentVariables = [
    "population", "population_density", "median_age", "aged_65_older", "aged_70_older", 
    "gdp_per_capita", "cardiovasc_death_rate", "diabetes_prevalence", "handwashing_facilities", 
    "hospital_beds_per_thousand", "life_expectancy", "human_development_index"
]

export const dataContinentsVariables = [
    "total_cases", "new_cases", "new_cases_smoothed", "total_deaths", "new_deaths", "new_deaths_smoothed",
    "total_cases_per_million", "new_cases_per_million", "new_cases_smoothed_per_million", "total_deaths_per_million", "new_deaths_per_million",
    "new_deaths_smoothed_per_million", "reproduction_rate", "new_tests_smoothed", "new_tests_smoothed_per_thousand", "positive_rate", "tests_per_case",
    "tests_units", "total_vaccinations", "people_vaccinated", "people_fully_vaccinated", "new_vaccinations_smoothed", "total_vaccinations_per_hundred",
    "people_vaccinated_per_hundred", "people_fully_vaccinated_per_hundred", "new_vaccinations_smoothed_per_million", "new_people_vaccinated_smoothed",
    "new_people_vaccinated_smoothed_per_hundred", "stringency_index"
]

export const getContinents = async (variable) => {
    const data = await getRequest(url + 'continents')
    const labels = []
    const datos = [{
        label: `${variable} of every country`,
        data: data.map(dato => {
            labels.push(dato.location)
            return dato[variable]
        }),
        color: "75, 192, 192"
    }]

    return {
        datos,
        labels
    }
}

export const getDataContinents = async (continents, variable) => {
    const data = await getRequest(url + 'dataContinents')

    const labels = []
    const datos = continents.map(continent => {
        labels.push(continent.location)

        return {
            label: `${variable} of ${continent.location}`,
            data: data.map(dato => dato).filter(dato => dato['isoCode'] === continent.isoCode).map(dato => dato[variable]),
            color: "75, 192, 192"
        }
    })

    return {
        datos,
        labels
    }
}

export const getDataContinentByContinentID = async (continent, variable) => {
    const data = await getRequest(url + `dataContinents/${continent.isoCode}`)
    return {
        label: `${variable} of ${continent.location}`,
        data: data['data'].map(d => d[variable]),
        color: "75, 192, 192"
    }
}