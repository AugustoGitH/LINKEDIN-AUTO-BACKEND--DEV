const capitalizeString = (string: string) => {
  return string
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.substring(1, word.length))
    .join(" ");
};

export default capitalizeString;
