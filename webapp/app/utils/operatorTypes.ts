export enum OperatorTypes {
  Equal = '=',
  NotEqual = '!=',
  Contain = 'like',
  NotContain = 'not like',
  Between = 'between',
  In = 'in',
  NotIn = 'not in',
  LessThan = '<',
  GreaterThan = '>',
  LessThanOrEqual = '<=',
  GreaterThanOrEqual = '>='
}

export const OperatorTypesLocale = {
  [OperatorTypes.Equal]: 'Equal',
  [OperatorTypes.NotEqual]: 'Not equal',
  [OperatorTypes.Contain]: 'Contain',
  [OperatorTypes.NotContain]: 'Not contain',
  [OperatorTypes.Between]: 'Between',
  [OperatorTypes.In]: 'IN',
  [OperatorTypes.NotIn]: 'Not in',
  [OperatorTypes.LessThan]: 'Less than',
  [OperatorTypes.GreaterThan]: 'Greater than',
  [OperatorTypes.LessThanOrEqual]: 'Less than or equal',
  [OperatorTypes.GreaterThanOrEqual]: 'Greater than or equal'
}

export const LinkageOperatorTypes = [
  OperatorTypes.Equal,
  OperatorTypes.NotEqual,
  OperatorTypes.Contain,
  OperatorTypes.LessThan,
  OperatorTypes.GreaterThan,
  OperatorTypes.LessThanOrEqual,
  OperatorTypes.GreaterThanOrEqual
]

export const TableCellConditionOperatorTypes = {
  [OperatorTypes.Equal]: ['string', 'geoCountry', 'geoProvince', 'geoCity', 'number', 'date'],
  [OperatorTypes.NotEqual]: ['string', 'geoCountry', 'geoProvince', 'geoCity', 'number', 'date'],
  [OperatorTypes.LessThan]: ['number', 'date'],
  [OperatorTypes.GreaterThan]: ['number', 'date'],
  [OperatorTypes.LessThanOrEqual]: ['number', 'date'],
  [OperatorTypes.GreaterThanOrEqual]: ['number', 'date'],
  [OperatorTypes.Contain]: ['string', 'geoCountry', 'geoProvince', 'geoCity'],
  [OperatorTypes.Between]: ['number', 'date'],
  [OperatorTypes.In]: ['string', 'geoCountry', 'geoProvince', 'geoCity', 'number', 'date']
}

export default OperatorTypes
