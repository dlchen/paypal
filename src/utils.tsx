export const renderCurrencySymbol = (currency: string) => {
  switch (currency) {
    case 'USD': return '$';
    case 'EUR': return '€';
    case 'JPY': return '¥';
  };
}

export const validAmount = (amount: string) => {

  const noCommas = amount.replace(/,/g, '');
  return Number(noCommas) > 0;
};

export const validEmail = (email: string) => {

  const MAX_LENGTH_LOCAL = 64;
  const MAX_LENGTH_DOMAIN = 255;

  // return false if no '@' or 2 or more '@'
  const splitAt = email.split('@');
  if (splitAt.length === 1 || splitAt.length > 2) {
    return false;
  }

  const [local, domain] = splitAt;

  if (local.length === 0 ||
      local.length > MAX_LENGTH_LOCAL ||
      domain.length === 0 ||
      domain.length > MAX_LENGTH_DOMAIN) {
    return false;
  }

  if (!/\S+/.test(local)) {
    return false;
  }

  // return false if no '.' or 2 or more '.' in domain
  const domainSplit = domain.split('.');
  if (domainSplit.length === 1 || domainSplit.length > 2) {
    return false;
  }

  const [host, tld] = domainSplit;

  const domainRegex = /^[A-Za-z0-9\-]+$/;
  if (!domainRegex.test(host) || !domainRegex.test(tld)) {
    return false;
  }

  return true;
};

export const insertCommas = (wholeNum: number, { offset } = { offset: 0 }): string => {

  const stringified = String(wholeNum);

  const decimalIdx = stringified.length - offset;
  const decimals = stringified.slice(decimalIdx);
  const whole = stringified.slice(0, decimalIdx);

  const commaHelper = (acc: string, str: string, count: number): string => {

    const head = str && str[0];

    if (!head) return acc;

    const tail = str.slice(1);

    if (count === 1 && tail) {
      return commaHelper(acc + head + ',', tail, 3);
    }

    return commaHelper(acc + head, tail, count - 1);
  };

  const withCommas = commaHelper('', whole, whole.length % 3 || 3);

  return withCommas + decimals;
};

export const formatAmount = (digits: string) => {

  const parsed = parseInt(digits, 10);

  if (parsed === 0) {
    return '0.00';
  }

  const stringified = String(parsed);
  if (stringified.length <= 3) {
    let padded = stringified;
    while (padded.length < 3) {
      padded = '0' + padded;
    }
    return padded.slice(0, 1) + '.' + padded.slice(1);
  }

  const withCommas = insertCommas(parsed, { offset: 2 });
  const decimalIdx = withCommas.length - 2;
  const withDecimal = withCommas.slice(0, decimalIdx) + '.' + withCommas.slice(decimalIdx);
  return withDecimal;
};
