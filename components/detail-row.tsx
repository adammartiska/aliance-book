import { Text, View } from 'react-native';

export type DetailRowProps = { label: string; value: string };

export const DetailRow = ({ label, value }: DetailRowProps) => {
  return (
    <View className="mb-2 flex-row">
      <Text className="w-1/3 font-semibold text-gray-700">{label}:</Text>
      <Text className="flex-1 text-gray-600">{value || 'N/A'}</Text>
    </View>
  );
};
