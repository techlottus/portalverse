/**
 * This implementation for Safari-friendly Aspect Ratio Boxes is based on:
 * https://css-tricks.com/aspect-ratio-boxes/
 */

type AspectProps = {
  ratio: string;
  children: any;
};

// Aspect ratio is expressed as a padding-top percentage, where a ratio of 2:1 gives a padding-top percentage of 1 / 2 * 100 = 50%
const defaultRatioPercentage = "50%"; // 2:1

// Matches a fraction of either integer or floating point numbers, excluding numbers starting with 0
const fractionRegex = /([1-9][0-9]*(.[0-9]*)?)\/[1-9][0-9]*(.[0-9]*)?/g;

const calculateAspectRatioPercentage = (ratio: string) => {
  const containsValidFraction = fractionRegex.test(ratio);

  if (containsValidFraction) {
    const fraction = ratio?.match(fractionRegex)?.[0];
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
    <div style={paddingStyles} className="relative w-full h-0">
      <div className="w-full h-full absolute top-0 left-0">{children}</div>
    </div>
  );
};

export default Aspect;
