import React from 'react';
import { Text, View } from 'react-native';

export type DetailMultiRowProps = {
  title: string;
  data: string[];
  emptyMessage?: string;
};

const DetailMultiRow = ({ title, data, emptyMessage = 'No data' }: DetailMultiRowProps) => {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-lg font-bold">{title}</Text>
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <View key={index} className="ml-2">
            <Text className="text-base">• {item}</Text>
          </View>
        ))
      ) : (
        <Text className="text-base italic">{emptyMessage}</Text>
      )}
    </View>
  );
};

export default DetailMultiRow;
