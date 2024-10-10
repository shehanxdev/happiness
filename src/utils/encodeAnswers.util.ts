import { answersToEcodedIntMapping } from './../constants/answersToEcodedIntMapping';

export const replaceFeaturesWithEncodedValues = (
  features: string[]
): number[] => {
  return features.map(feature => {
    return answersToEcodedIntMapping[feature] ?? -1;
  });
};
