import { View, Text } from 'react-native';
import React from 'react';

import { SvgXml } from 'react-native-svg';

const SvgView = ({ svgPath, height = '50', width = '50', style }) => {
  return (
    <View>
      <SvgXml style={style} xml={`${svgPath}`} width={width} height={height} />
    </View>
  );
};

export default SvgView;
