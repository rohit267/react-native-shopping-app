import {
  Input,
  Image,
  Center,
  InputGroup,
  InputLeftAddon,
  Button,
  Box,
  useToast,
  Text,
} from 'native-base';
import React, {useEffect} from 'react';
import Logo from '../assets/images/logo.png';
import {ErrorToast, SuccessToast} from '../utility/Helper';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../redux/loadingReducer';
import {setUser} from '../redux/userReducer';

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.loader);
  const userState = useSelector(state => state.user);
  const [mobile, setMobile] = React.useState('8789985521');
  const [otpBoxDisplay, setOtpBoxDisplay] = React.useState(false);
  const errorToast = useToast();
  const successToast = useToast();
  const [authConfirm, setAuthConfirm] = React.useState({});
  const otpBoxRef = React.useRef();
  const [otp, setOtp] = React.useState('');
  const [checking, setChecking] = React.useState(true);

  useEffect(() => {
    if(userState.user==null) setChecking(false);
    else navigation.replace('homepage')
  }, []);

  function handleMobileChange(e) {
    if (/^[0-9]+$/.test(e) || e === '') setMobile(e);
  }

  async function handleContinue(e) {
    if (mobile.length < 10 || /^[0-9]+$/.test(mobile) === false) {
      errorToast.show(ErrorToast('Please enter a valid mobile number'));
      return;
    }
    dispatch(setLoading(true));
    try {
      const confirm = await auth().signInWithPhoneNumber(`+91${mobile}`);
      setAuthConfirm(confirm);
      setOtpBoxDisplay(true);
      successToast.show(SuccessToast('OTP sent successfully'));
      otpBoxRef.current.focus();
    } catch (error) {
      console.log(error);
      errorToast.show(ErrorToast('Oops, something went wrong.'));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function confirmCode() {
    if (otp.length !== 6) {
      errorToast.show(ErrorToast('Please enter a valid OTP.'));
      return;
    }
    dispatch(setLoading(true));
    try {
      let mConfirm = await authConfirm.confirm(otp);
      if (mConfirm.user) {
        dispatch(setLoading(false));
        successToast.show(SuccessToast('Login successful'));
        setTimeout(() => {
          dispatch(setUser({mobile: mConfirm.user.phoneNumber}));
          navigation.navigate('homepage');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      errorToast.show(ErrorToast('Please enter a valid OTP.'));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <>
      {checking ? (
        <Center flex={1} backgroundColor={'dark.100'}>
          <Image source={Logo} style={{width: 100, height: 100}} />
          <Text marginTop={'2em'} color='yellow.400' >Loading...</Text>
        </Center>
      ) : (
        <Box flex={1}>
          <Center flex={1} backgroundColor={'dark.100'}>
            <Image source={Logo} style={{width: 100, height: 100}} alt="logo" />

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
                _text={{
                  color: 'dark.500',
                }}
                width={'80%'}
                background="white"
                isDisabled={otpBoxDisplay}
              />
            </InputGroup>
            <Input
              style={{borderColor: 'yellow'}}
              display={otpBoxDisplay ? 'flex' : 'none'}
              textAlign="center"
              letterSpacing={4}
              color="yellow.600"
              maxLength={6}
              fontSize={20}
              mt={8}
              ref={otpBoxRef}
              keyboardType="number-pad"
              width={300}
              placeholder="Enter OTP"
              background="white"
              value={otp}
              onChangeText={e => setOtp(e)}
            />
          </Center>

          <Button
            onPress={e => (otpBoxDisplay ? confirmCode(e) : handleContinue(e))}
            isLoading={isLoading}
            disabled={isLoading}
            backgroundColor="yellow.400"
            height={60}>
            Continue
          </Button>
        </Box>
      )}
    </>
  );
}
