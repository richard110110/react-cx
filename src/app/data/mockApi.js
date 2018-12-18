import sampleData from './sampleData';

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const DelayMileSeconds = 1000;

export const fetchSampleData = () => {
    return delay(DelayMileSeconds).then(()=> {
        return Promise.resolve(sampleData)
    })
}