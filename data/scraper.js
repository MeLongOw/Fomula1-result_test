const { createArray } = require("./helper");

const scrapeRaces = (browser) =>
    new Promise(async (resolve, reject) => {
        try {
            const years = createArray(2023, 1950);
            const dataRaces = [];
            for (let year of years) {
                const url = `https://www.formula1.com/en/results.html/${year}/races.html`;
                console.log("==> open new page");
                let page = await browser.newPage();
                await page.goto(url);
                console.log("==> access to: " + url);
                await page.waitForSelector("main");
                console.log("==> loading website done");
                let data = await page.$$eval(
                    ".table-wrap > table > tbody > tr",
                    (listEl) => {
                        return listEl.map((el, index) => {
                            return {
                                id: index,
                                grandPrix:
                                    el.querySelectorAll("td")[1].innerText,
                                date: el.querySelectorAll("td")[2].innerText,
                                winner: Array.from(
                                    el
                                        .querySelectorAll("td")[3]
                                        .querySelectorAll("span")
                                )
                                    .map((el) => el.innerText)
                                    .filter((el) => el !== "")
                                    .join(" "),
                                car: el.querySelectorAll("td")[4].innerText,
                                laps: el.querySelectorAll("td")[5].innerText,
                                time: el.querySelectorAll("td")[6].innerText,
                            };
                        });
                    }
                );
                dataRaces.push({ year, data });
                await page.close();
            }
            resolve(dataRaces);
        } catch (error) {
            console.log("error at scrape: " + error);
            reject(error);
        }
    });

const scrapeDrivers = (browser) =>
    new Promise(async (resolve, reject) => {
        try {
            const years = createArray(2023, 1950);
            const dataDrivers = [];
            for (let year of years) {
                const url = `https://www.formula1.com/en/results.html/${year}/drivers.html`;
                console.log("==> open new page");
                let page = await browser.newPage();
                await page.goto(url);
                console.log("==> access to: " + url);
                await page.waitForSelector("main");
                console.log("==> loading website done");
                let data = await page.$$eval(
                    ".table-wrap > table > tbody > tr",
                    (listEl) => {
                        return listEl.map((el, index) => {
                            return {
                                id: index,
                                pos: el.querySelectorAll("td")[1].innerText,
                                driver: Array.from(
                                    el
                                        .querySelectorAll("td")[2]
                                        .querySelectorAll("span")
                                )
                                    .map((el) => el.innerText)
                                    .filter((el) => el !== "")
                                    .join(" "),
                                nationality:
                                    el.querySelectorAll("td")[3].innerText,
                                car: el.querySelectorAll("td")[4].innerText,
                                pts: el.querySelectorAll("td")[5].innerText,
                            };
                        });
                    }
                );
                dataDrivers.push({ year, data });
                await page.close();
            }
            resolve(dataDrivers);
        } catch (error) {
            console.log("error at scrape: " + error);
            reject(error);
        }
    });

const scrapeTeams = (browser) =>
    new Promise(async (resolve, reject) => {
        try {
            const years = createArray(2023, 1950);
            const dataTeams = [];
            for (let year of years) {
                const url = `https://www.formula1.com/en/results.html/${year}/team.html`;
                console.log("==> open new page");
                let page = await browser.newPage();
                await page.goto(url);
                console.log("==> access to: " + url);
                await page.waitForSelector("main");
                console.log("==> loading website done");
                let data = await page.$$eval(
                    ".table-wrap > table > tbody > tr",
                    (listEl) => {
                        return listEl.map((el, index) => {
                            return {
                                id: index,
                                pos: el.querySelectorAll("td")[1].innerText,
                                team: el.querySelectorAll("td")[2].innerText,
                                pts: el.querySelectorAll("td")[3].innerText,
                            };
                        });
                    }
                );
                dataTeams.push({ year, data });
                await page.close();
            }
            resolve(dataTeams);
        } catch (error) {
            console.log("error at scrape: " + error);
            reject(error);
        }
    });

const scrapeDHL = (browser) =>
    new Promise(async (resolve, reject) => {
        try {
            const years = createArray(2023, 1950);
            const dataDHL = [];
            for (let year of years) {
                const url = `https://www.formula1.com/en/results.html/${year}/fastest-laps.html`;
                console.log("==> open new page");
                let page = await browser.newPage();
                await page.goto(url);
                console.log("==> access to: " + url);
                await page.waitForSelector("main");
                console.log("==> loading website done");
                let data = await page.$$eval(
                    ".table-wrap > table > tbody > tr",
                    (listEl) => {
                        return listEl.map((el, index) => {
                            return {
                                id: index,
                                grandPrix:
                                    el.querySelectorAll("td")[1].innerText,
                                driver: Array.from(
                                    el
                                        .querySelectorAll("td")[2]
                                        .querySelectorAll("span")
                                )
                                    .map((el) => el.innerText)
                                    .filter((el) => el !== "")
                                    .join(" "),
                                car: el.querySelectorAll("td")[3].innerText,
                                time: el.querySelectorAll("td")[4].innerText,
                            };
                        });
                    }
                );
                dataDHL.push({ year, data });
                await page.close();
            }
            resolve(dataDHL);
        } catch (error) {
            console.log("error at scrape: " + error);
            reject(error);
        }
    });

module.exports = {
    scrapeRaces,
    scrapeDrivers,
    scrapeTeams,
    scrapeDHL,
};
