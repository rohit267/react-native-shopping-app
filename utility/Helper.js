import React from 'react'
import {Box,Text} from 'native-base'

export const ErrorToast = message => {
  return {
    render: () => {
      return (
        <Box backgroundColor={'red.400'}>
          <Text color="white" px={4} py={4}>
            {message}
          </Text>
        </Box>
      );
    },
    duration: 1500,
    placement: 'top',
  };
};
