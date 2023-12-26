const { open } = require("node:fs/promises");

(async () => {
    const file = await open("./input.txt");

    let patternLabel = /^[a-zA-Z]/;
    let patternData = /^[0-9]/;

    let data = {};
    let rowIndex = 0;
    let currentLabel = "";
    for await (const line of file.readLines()) {
        if (rowIndex === 0) {
            data["seeds"] = line
                .replace("seeds: ", "")
                .split(" ")
                .map((x) => parseInt(x));
        }

        if (line === "") continue;

        if (rowIndex !== 0 && patternLabel.test(line)) {
            const label = line.replace(" map:", "");
            data[label] = [];
            currentLabel = label;
        }

        if (rowIndex !== 0 && patternData.test(line)) {
            const [destination, source, length] = line.split(" ");
            data[currentLabel].push({
                destination: parseInt(destination),
                source: parseInt(source),
                length: parseInt(length),
            });
        }

        rowIndex++;
    }

    let lowestLocation;
    for (let i = 0; i < data["seeds"].length; i += 2) {
        let baseSeed = data["seeds"][i];
    
        for (let j = 0; j < data["seeds"][i + 1]; j++) {
            let seed = baseSeed + j;

            // seed-to-soil
            let seedToSoil = data["seed-to-soil"].find((x) => x.source <= seed && x.source + x.length >= seed);
            let soil = seedToSoil ? seedToSoil.destination + (seed - seedToSoil.source) : seed;

            // soil-to-fertilizer
            let soilToFertilizer = data["soil-to-fertilizer"].find((x) => x.source <= soil && x.source + x.length >= soil);
            let fertilizer = soilToFertilizer ? soilToFertilizer.destination + (soil - soilToFertilizer.source) : soil;

            // fertilizer-to-water
            let fertilizerToWater = data["fertilizer-to-water"].find((x) => x.source <= fertilizer && x.source + x.length >= fertilizer);
            let water = fertilizerToWater ? fertilizerToWater.destination + (fertilizer - fertilizerToWater.source) : fertilizer;

            // water-to-light
            let waterToLight = data["water-to-light"].find((x) => x.source <= water && x.source + x.length >= water);
            let light = waterToLight ? waterToLight.destination + (water - waterToLight.source) : water;

            // light-to-temperature
            let lightToTemperature = data["light-to-temperature"].find((x) => x.source <= light && x.source + x.length >= light);
            let temperature = lightToTemperature ? lightToTemperature.destination + (light - lightToTemperature.source) : light;

            // temperature-to-humidity
            let temperatureToHumidity = data["temperature-to-humidity"].find((x) => x.source <= temperature && x.source + x.length >= temperature);
            let humidity = temperatureToHumidity ? temperatureToHumidity.destination + (temperature - temperatureToHumidity.source) : temperature;

            // humidity-to-location
            let humidityToLocation = data["humidity-to-location"].find((x) => x.source <= humidity && x.source + x.length >= humidity);
            let location = humidityToLocation ? humidityToLocation.destination + (humidity - humidityToLocation.source) : humidity;

            lowestLocation = lowestLocation ? Math.min(lowestLocation, location) : location;
        }
    }

    console.log(lowestLocation);
})();
