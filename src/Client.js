function loadReport(cb) {
    const requestOptions = {
        accept: 'application/json'
    };
    return fetch(`/api/v1/report`, requestOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function extractIndicator(indicator, cb) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`/api/v1/indicators/${indicator}/extract`, requestOptions)
        .then(checkStatus)
        .then(cb);
}

function getAllIndicatorCodes(cb) {
    const requestOptions = {
        accept: 'application/json'
    };
    return fetch(`/api/v1/indicators/codes`, requestOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function extractPositions(bearer, cb) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bearer: bearer })
    };
    return fetch(`/api/v1/positions`, requestOptions)
        .then(checkStatus)
        .then(cb);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
}

function getCompanyEvaluations(code, cb) {
    const requestOptions = {
        accept: 'application/json'
    };
    return fetch(`/api/v1/companies/${code}/evaluations`, requestOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then(cb)
        .catch(() => {
            cb({ observedPayout: 0, proventPredictions: [{ year: 2023, value: 0.0 }, { year: 2024, value: 0.0 }, { year: 2025, value: 0.0 }] });
        });
}

function saveCompanyEvaluations(code, evaluations, cb) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(evaluations)
    };
    return fetch(`/api/v1/companies/${code}/evaluations`, requestOptions)
        .then(checkStatus)
        .then(cb);
}

function getCondition(fieldName, cb) {
    const requestOptions = {
        accept: 'application/json'
    };
    return fetch(`/api/v1/conditions/${fieldName}`, requestOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then(cb)
        .catch(() => {
            cb({ minimum: 0, maximum: 0 });
        });
}

function saveCondition(fieldName, condition, cb) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(condition)
    };
    return fetch(`/api/v1/conditions/${fieldName}`, requestOptions)
        .then(checkStatus)
        .then(cb);
}

function parseJSON(response) {
    return response.json();
}

const Client = { loadReport, extractIndicator, getAllIndicatorCodes, extractPositions, getCompanyEvaluations, saveCompanyEvaluations, getCondition, saveCondition };
export default Client;