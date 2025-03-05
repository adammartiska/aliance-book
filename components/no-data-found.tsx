import { Meh } from 'lucide-react-native';
import { Text, View } from 'react-native';

export type NoDataFoundProps = { label: string };

export const NoDataFound = ({ label = 'Unfortunately, there are no data' }: NoDataFoundProps) => {
  return (
    <View className="my-4 h-full flex-1 items-center justify-center">
      <Text className="my-4 text-xl font-bold">{label}</Text>
      <Meh color="black" size={24} />
    </View>
  );
};
