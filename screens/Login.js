import {
  Input,
  Image,
  Center,
  InputGroup,
  InputLeftAddon,
  Button,
  Box,
  useToast,
  Icon,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import Logo from '../assets/images/logo.png';
import {ErrorToast} from '../utility/Helper';

export default function Login() {
  const [mobile, setMobile] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [otpBoxDisplay, setOtpBoxDisplay] = React.useState(false);
  const errorToast = useToast();

  function handleMobileChange(e) {
    if (/^[0-9]+$/.test(e) || e === '') setMobile(e);
  }

  function handleContinue(e) {
    if (mobile.length < 10)
      errorToast.show(ErrorToast('Please enter valid mobile number'));
  }

  return (
    <Box flex={1}>
      <Center flex={1} backgroundColor={'dark.100'}>
        <Image source={Logo} style={{width: 100, height: 100}} alt="logo" />

        <Input
          width={300}
          pl={6}
          mt={8}
          height={50}
          backgroundColor="white"
          color="dark.700"
          fontSize={20}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="person" />}
              size={8}
              ml="4"
              color="yellow.600"
            />
          }
          placeholder="full name"
        />

        <InputGroup width={300}>
          <InputLeftAddon
            background={'yellow.400'}
            _text={{
              color: 'white',
              fontSize: 20,
            }}
            mt={8}
            height={50}
            width={'22%'}
            children="+91"
          />
          <Input
            onChangeText={handleMobileChange}
            value={mobile}
            keyboardType="number-pad"
            height={50}
            fontSize={20}
            maxLength={10}
            placeholder="mobile number"
            mt={8}
            color="dark.700"
            width={'80%'}
            background="white"
          />
        </InputGroup>
        <Input
          style={{borderColor: 'yellow.400'}}
          display={otpBoxDisplay ? 'flex' : 'none'}
          textAlign="center"
          letterSpacing={4}
          color="yellow.600"
          maxLength={6}
          fontSize={20}
          mt={8}
          eeee
          keyboardType="number-pad"
          width={300}
          placeholder="Enter OTP"
        />
      </Center>
      <Button
        onPress={handleContinue}
        isLoading={isLoading}
        backgroundColor="yellow.400"
        height={60}>
        Continue
      </Button>
    </Box>
  );
}
