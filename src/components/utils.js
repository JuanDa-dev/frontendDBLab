//https://www.datos.gov.co/d/xdk5-pm3f/visualization
export const getDate = (date) => {
    const day = `${(date.getDate())}`.padStart(2,'0');
    const month = `${(date.getMonth()+1)}`.padStart(2,'0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`
}

export const getRandomColor = () => {
    const posibilities = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]
    const size = posibilities.length
    let random_color = "#";
    
    for(let j = 0; j < 6; j++) {
      random_color += posibilities[Math.floor(Math.random() * size)]
    }

    return random_color;
}

export const hexToRGB = (cadena, transparency) => {
    const base = 16
    const red = parseInt(cadena.slice(1, 3), base)
    const green = parseInt(cadena.slice(3, 5), base)
    const blue = parseInt(cadena.slice(5, 7), base)

    return `rgba(${red}, ${green}, ${blue}, ${transparency})`
}

export const dataGraphic = (datasets, labels, structure) => {
    return {
        labels: labels.map(label => label),
        datasets: datasets.map(dato => {
            const dataset = Object.assign({}, structure)
            dataset['label'] = dato['label']
            dataset['data'] = dato['data']
            const colors = dato['colors']
            dataset['borderColor'] = colors
            dataset['pointBackgroundColor'] = colors
            dataset['backgroundColor'] = colors.map(color => hexToRGB(color, 0.3))

            return dataset
        })
    }
}

export const countryVariables = [
    "population", "population_density", "median_age", "aged_65_older", "aged_70_older", 
    "gdp_per_capita", "cardiovasc_death_rate", "diabetes_prevalence", "handwashing_facilities", 
    "hospital_beds_per_thousand", "life_expectancy", "human_development_index"
]

export const dataVariables = [
    "total_cases", "new_cases", "new_cases_smoothed", "total_deaths", "new_deaths", "new_deaths_smoothed",
    "total_cases_per_million", "new_cases_per_million", "new_cases_smoothed_per_million", "total_deaths_per_million", 
    "new_deaths_per_million", "new_deaths_smoothed_per_million", "reproduction_rate", "new_tests_smoothed", 
    "new_tests_smoothed_per_thousand", "positive_rate", "tests_per_case", "total_vaccinations", "people_vaccinated", 
    "people_fully_vaccinated", "new_vaccinations_smoothed", "total_vaccinations_per_hundred", 
    "people_vaccinated_per_hundred", "people_fully_vaccinated_per_hundred", "new_vaccinations_smoothed_per_million", 
    "new_people_vaccinated_smoothed", "new_people_vaccinated_smoothed_per_hundred", "stringency_index"
]

export const continentVariables = [
    "population", "population_density", "total_cases", "new_cases", "total_deaths", "new_deaths", 
    "new_deaths_smoothed", "total_vaccinations", "people_vaccinated", "people_fully_vaccinated", 
    "new_vaccinations_smoothed", "new_vaccinations_smoothed_per_million", "new_people_vaccinated_smoothed"
]