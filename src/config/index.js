import dotenv from 'dotenv';
const envData = dotenv.config().parsed
function validateConfig(){
    const requiredKeys = ['INPUT_FILE', 'OUTPUT_FILE', 'MIN_AGE', 'CITY_FILTER'];
    for(let key of requiredKeys){
        if(!envData[key]) {
            throw new Error(`.env has no required key (${key})`);
        }
    }
    return true
}
export function getConfig(){
    if(validateConfig()) return envData;
}
