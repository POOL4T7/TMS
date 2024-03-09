export const toInternationalNumberSystem = (num: number) => {
  if (isNaN(num)) {
    return "Invalid count";
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

export const colorHelper = (status: string) => {
  if (status == "active" || status == "publish") return "success";
  else if (status == "draft" || status == "inactive") return "primary";
  else if (status == "deleted") return "error";
};
