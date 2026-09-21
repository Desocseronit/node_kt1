import { access, constants, writeFile } from 'node:fs/promises';
import { getConfig } from './config/index.js';
import { readLines } from './utils/csv.js';

async function main() {
    const config = getConfig();

    try {
        await access(config.INPUT_FILE, constants.R_OK);
    }
    catch (e) {
        throw new Error(`Can not open ${config.INPUT_FILE}. Does it exist?`);
    }

    let matched = 0, processed = 0;
    let result = '';
    let isfirst = true;
    for await (let line of readLines(config.INPUT_FILE)) {
        if (isfirst) {
            result += line + '\n';
            isfirst = false;
        } else {
            let [id, name, age, city] = line.split(',');

            processed++;

            if (Number(age) >= config.MIN_AGE && city === config.CITY_FILTER) {
                result += line + '\n';
                matched++;
            }
        }
    }

    await writeFile(config.OUTPUT_FILE, result);

    console.log(`
        Обработанно строк: ${processed}\n
        Прошло фильтр: ${matched}
        `)
}

try {
    await main();
} catch (e) {
    console.error(`Error has occured: ${e.message}`);
    process.exitCode = 1;
}

