type AspectProps = {
  ratio: string;
  children: any;
};

const defaultRatioPercentage = "50%"; // 2/1
const fractionRegex = /([1-9][0-9]*(.[0-9]*)?)\/[1-9][0-9]*(.[0-9]*)?/g;

const calculateAspectRatioPercentage = (ratio: string) => {
  const containsValidFraction = fractionRegex.test(ratio);

  if (containsValidFraction) {
    const fraction = ratio.match(fractionRegex)?.[0];
    const numerator = Number(fraction?.split("/")?.[0]);
    const denominator = Number(fraction?.split("/")?.[1]);

    const roundedNumerator = Math.floor(numerator);
    const roundedDenominator = Math.floor(denominator);

    return `${(roundedDenominator / roundedNumerator) * 100}%`;
  } else {
    return defaultRatioPercentage;
  }
};

const Aspect = (props: AspectProps) => {
  const { ratio, children } = props;

  const aspectRatioPercentage = calculateAspectRatioPercentage(ratio);

  const paddingStyles = {
    paddingTop: aspectRatioPercentage,
  };

  return (
    <div style={paddingStyles} className="relative h-0">
      <div className="w-full h-full absolute top-0 left-0">{children}</div>
    </div>
  );
};

export default Aspect;
