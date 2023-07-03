const OBSERVED_PAYOUT = "OBSERVED_PAYOUT"
const PRICE = "PRICE"
const FAIR_PRICE_PERCENT = "FAIR_PRICE_PERCENT"
const FAIR_AVERAGE_PRICE_PERCENT = "FAIR_AVERAGE_PRICE_PERCENT"
const ROIC = "ROIC"
const DIVIDEND_LAST_FIVE_YEARS = "DIVIDEND_LAST_FIVE_YEARS"
const DIVIDEND_LAST_TWO_YEARS = "DIVIDEND_LAST_TWO_YEARS"
const DIVIDEND_NEXT_TREE_YEARS = "DIVIDEND_NEXT_TREE_YEARS"

const CODE = "CODE"
const NAME = "NAME"
const SECTOR = "SECTOR"
const QUANTITY = "QUANTITY"
const TOTAL = "TOTAL"
const AVERAGE_PRICE = "AVERAGE_PRICE"
const AVERAGE_PRICE_PERCENT = "AVERAGE_PRICE_PERCENT"
const VALORIZATION_30_DAYS = "VALORIZATION_30_DAYS"
const VALORIZATION_5_DAYS = "VALORIZATION_5_DAYS"
const TOTAL_PERCENT = "TOTAL_PERCENT"
const FILTERED = "FILTERED"
const PL = "PL"
const PVP = "PVP"

const FieldName = { 
    OBSERVED_PAYOUT, PRICE, FAIR_PRICE_PERCENT, FAIR_AVERAGE_PRICE_PERCENT, ROIC, DIVIDEND_LAST_FIVE_YEARS, DIVIDEND_LAST_TWO_YEARS, DIVIDEND_NEXT_TREE_YEARS,
    CODE, NAME, SECTOR, QUANTITY, TOTAL, AVERAGE_PRICE, AVERAGE_PRICE_PERCENT, VALORIZATION_30_DAYS, VALORIZATION_5_DAYS, TOTAL_PERCENT, FILTERED, PL, PVP
 };
export default FieldName;

const mapFields = new Map();

mapFields.set(PRICE, "price");
mapFields.set(OBSERVED_PAYOUT, "payout");
mapFields.set(FAIR_PRICE_PERCENT, "percFairPrice");
mapFields.set(FAIR_AVERAGE_PRICE_PERCENT, "percFairPriceAvg");
mapFields.set(ROIC, "roic");
mapFields.set(DIVIDEND_LAST_FIVE_YEARS, "div5");
mapFields.set(DIVIDEND_LAST_TWO_YEARS, "div2");
mapFields.set(DIVIDEND_NEXT_TREE_YEARS, "divF");

mapFields.set(CODE, "code");
mapFields.set(NAME, "name");
mapFields.set(SECTOR, "sector");
mapFields.set(QUANTITY, "quantity");
mapFields.set(TOTAL, "total");
mapFields.set(AVERAGE_PRICE, "avgPrice");
mapFields.set(AVERAGE_PRICE_PERCENT, "percAvgPrice");
mapFields.set(VALORIZATION_30_DAYS, "val30Days");
mapFields.set(VALORIZATION_5_DAYS, "val5Days");
mapFields.set(TOTAL_PERCENT, "percTotal");
mapFields.set(FILTERED, "filtered");
mapFields.set(PL, "pl");
mapFields.set(PVP, "pvp");

export function fieldAsText(fieldName) {
    return mapFields.get(fieldName);
}

const conditionFields = [
    OBSERVED_PAYOUT,
    PRICE,
    FAIR_PRICE_PERCENT,
    FAIR_AVERAGE_PRICE_PERCENT,
    ROIC,
    DIVIDEND_LAST_FIVE_YEARS,
    DIVIDEND_LAST_TWO_YEARS,
    DIVIDEND_NEXT_TREE_YEARS
];

export function isConditionField(fieldName) {
    return conditionFields.includes(fieldName);
}