const {Builder, By, Key, until} = require('selenium-webdriver');
const fs = require('fs');
let year = '2007';
let month = 1;
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let day = 2;

(async function parseTable() {
    let driver = await new Builder().forBrowser('safari').build();
    let table = []
    let row = []
    let tables = []

    // for (let index = 0; index < array.length; index++) {
    //     const element = array[index];
        
    // }
    let url = `http://localhost:3000/${year}Months/${year}${month.toString().padStart(2, '0')}${months[month-1]}/${months[month-1]}${day.toString().padStart(2, '0')}.htm`;
    // console.log(url)
    try {
        // Navigate to Url
        await driver.get(url);

        // Find every table
        let tablesFound = await driver.findElements(By.css('table'));
 
        for (let t of tablesFound) {
            // Get all the elements available with tag 'td' within above table
            let elements = await t.findElements(By.css('td'));

            // Get column count by finding each td in first table row
            let firstRow = await t.findElement(By.css('tr')).findElements(By.css('td'));
            // console.log(await elements.getText())
            // console.log(firstRow.length)
            
            // TODO: Remove &nbsp; from between brackets
            for(let e of elements) {
                await (await e.getText()).replace(/\t/g, '').replace(' ', '').replace(/\u00a0/g, " ").trim().split(/\r?\n/).filter(element => {
                    row.push(element)
                    console.log(element)
                })
                console.log(row)

                if (row.length == firstRow.length) {
                    table.push(row)
                    row = []

                    console.log(table)
                }

                // console.log(row)
            }

            tables.push(table)
        }
    }
    finally {
        await driver.quit();
        console.log(tables)
        // let fileName = `./data/${day}-${month}-${year}.json`
        // fs.writeFileSync(fileName, JSON.stringify(tables));
        // console.log(`Written to ${fileName}`);
    }
})();