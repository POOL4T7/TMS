export const toInternationalNumberSystem = (num: number) => {
  if (isNaN(num)) {
    return 'Invalid count';
  }

  const abbreviations = ['', 'K', 'M', 'B'];
  let index = 0;

  while (num >= 1000 && index < abbreviations.length - 1) {
    num /= 1000;
    index++;
  }

  const formattedNumber = num.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

  return `${formattedNumber} ${abbreviations[index]}`;
};

export const getColor = (label: string) => {
  switch (label) {
    case 'server':
    case 'web':
      return 'success';
    case 'employeePanel':
    case 'companyPanel':
    case 'high':
      return 'error';
    case 'UI':
    case 'medium':
      return 'secondary';
    case 'low':
      return 'info';
    default:
      return 'primary';
  }
};
