import getBudgetObject from './7-getBudgetObject';

export default function getFullBudgetObject(income, gdp, capita) {
  const budget = getBudgetObject(income, gdp, capita);

  return {
    ...budget,
    getIncomeInDollars(incomeValue) {
      return `$${incomeValue}`;
    },
    getIncomeInEuros(incomeValue) {
      return `${incomeValue} euros`;
    },
  };
}
