
const textFields = ["code", "name", "sector"];
const intFields = ["quantity", "filtered"]

export function orderByField(tickers, ordering) {
    console.log("Run ordering type " + ordering.type + " field " + ordering.field);

    const tickersCopy = tickers.slice();
    if (ordering.type === "NONE") {
        return tickersCopy;
    }

    const orderField = ordering.field;

    const sortText = (a, b) => {
        if (ordering.type === "ASC") {
            return a[orderField].localeCompare(b[orderField]);
        } else {
            return b[orderField].localeCompare(a[orderField]);
        }
    };

    const sortInt = (a, b) => {
        if (ordering.type === "ASC") {
            return a[orderField] - b[orderField];
        } else {
            return b[orderField] - a[orderField];
        }
    };

    const sortNumber = (a, b) => {
        if (ordering.type === "ASC") {
            return a[orderField].value - b[orderField].value;
        } else {
            return b[orderField].value - a[orderField].value;
        }
    };

    if (textFields.includes(orderField)) {
        tickersCopy.sort(sortText);
    } else if (intFields.includes(orderField)) {
        tickersCopy.sort(sortInt);
    } else {
        tickersCopy.sort(sortNumber);
    }

    return tickersCopy;
}
