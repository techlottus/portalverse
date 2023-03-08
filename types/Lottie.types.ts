export type LottieAnimationWrapper = {
  path: string;
}
  
export type LottieDimensionsWrapper =  {
  width?: string;
  height?: string;
}

type LottieComponentData = {
  data: {
    data: LottieAnimationWrapper;
    dimensions: LottieDimensionsWrapper;
  }
}

export default LottieComponentData