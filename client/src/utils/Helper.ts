export const toInternationalNumberSystem = (num: number) => {
  if (isNaN(num)) {
    return "Invalid input. Please provide a valid num.";
  }

  const abbreviations = ["", "K", "M", "B"];
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
