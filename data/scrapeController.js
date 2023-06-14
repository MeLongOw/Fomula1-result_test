const {
    scrapeRaces,
    scrapeDrivers,
    scrapeTeams,
    scrapeDHL,
} = require("./scraper");
const fs = require("fs");

const scrapeController = async (browserInstance) => {
    try {
        let browser = await browserInstance;

        // scraping Races data and store
        let racesData = await scrapeRaces(browser);
        fs.writeFile(
            "../frontend/src/data/dataRaces.json",
            JSON.stringify(racesData),
            (err) => {
                if (err)
                    console.log("Error when write to file data. mes: " + err);
            }
        );
        console.log("------- scraping Races completed");

        // scraping Drivers data and store
        let driversData = await scrapeDrivers(browser);
        fs.writeFile("../frontend/src/data/dataDrivers.json", JSON.stringify(driversData), (err) => {
            if (err) console.log("Error when write to file data. mes: " + err);
        });
        console.log("------- scraping Drivers completed");

        // scraping Teams data and store
        let TeamsData = await scrapeTeams(browser);
        fs.writeFile("../frontend/src/data/dataTeams.json", JSON.stringify(TeamsData), (err) => {
            if (err) console.log("Error when write to file data. mes: " + err);
        });
        console.log("------- scraping Teams completed");

        // scraping DHL data and store
        let DHLData = await scrapeDHL(browser);
        fs.writeFile("../frontend/src/data/dataDHL.json", JSON.stringify(DHLData), (err) => {
            if (err) console.log("Error when write to file data. mes: " + err);
        });
        console.log("------- scraping DHL completed");
    } catch (error) {
        console.log("Error at scrapeController: " + error);
    }
};
module.exports = scrapeController;
