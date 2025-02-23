import React from 'react';
import { VStack, Input, Text, useTheme } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import CosmicButton from './CosmicButton';
// import { ThemeProvider } from '../context/ThemeContext';

const AuthForm = ({ onSubmit, isLogin, loading }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const theme = useTheme();

  return (
    <VStack space={4} width="100%">
      {!isLogin && (
        <Controller
          control={control}
          name="username"
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              placeholder="Username"
              color={theme.colors.starDust}
              onChangeText={field.onChange}
              isInvalid={!!errors.username}
            />
          )}
        />
      )}
      
      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            placeholder="Email"
            keyboardType="email-address"
            color={theme.colors.starDust}
            onChangeText={field.onChange}
            isInvalid={!!errors.email}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: true, minLength: 6 }}
        render={({ field }) => (
          <Input
            placeholder="Password"
            secureTextEntry
            color={theme.colors.starDust}
            onChangeText={field.onChange}
            isInvalid={!!errors.password}
          />
        )}
      />

      {errors.password?.type === 'minLength' && (
        <Text color={theme.colors.nebulaPink} fontSize="sm">
          Password must be at least 6 characters
        </Text>
      )}

      <CosmicButton onPress={handleSubmit(onSubmit)}isLoading={loading}
        isDisabled={loading}>
        {loading ? 'Authenticating...' : isLogin ? 'Login' : 'Register'}
      </CosmicButton>
    </VStack>
  );
};

export default AuthForm;