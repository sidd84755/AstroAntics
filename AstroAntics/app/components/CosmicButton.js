import React, { useState } from 'react';
import { Button, useTheme, IButtonProps } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, Animated, Easing, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

const CosmicButton = ({ children, icon, ...props }) => {
  const theme = useTheme();
  const [scaleValue] = useState(new Animated.Value(1));
  const [gradientColors] = useState([
    theme.colors.spaceBlue,
    theme.colors.cosmicPurple,
    theme.colors.nebulaPink,
  ]);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
    
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ overflow: 'hidden' }}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <LinearGradient
          colors={gradientColors}
          start={[0, 0]}
          end={[1, 1]}
          style={{
            borderRadius: 25,
            padding: 2, // Creates a border effect
          }}
        >
          <LinearGradient
            colors={[theme.colors.cosmicDark, theme.colors.cosmicPurple]}
            start={[0.5, 0]}
            end={[0.5, 1]}
            style={{
              borderRadius: 23,
              paddingVertical: 12,
              paddingHorizontal: 24,
            }}
          >
            <Button
              bg="transparent"
              _text={{
                color: theme.colors.starDust,
                fontFamily: 'heading',
                fontSize: 'md',
                letterSpacing: 1,
              }}
              _pressed={{
                opacity: 0.8,
              }}
              leftIcon={icon ? <Animated.View>{icon}</Animated.View> : undefined}
              {...props}
              style={[
                {
                  shadowColor: theme.colors.nebulaPink,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 10,
                  elevation: 6,
                },
                props.style,
              ]}
            >
              {children}
            </Button>
          </LinearGradient>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default CosmicButton;