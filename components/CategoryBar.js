import {Pressable, Box, Text} from 'native-base';
import React from 'react';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function CategoryBar(props) {
  const categories = [
    {
      cat: 'electronics',
      icon: <FoundationIcon size={40} color="yellow" name="lightbulb" />,
      press: () => props.elec(),
    },
    {
      cat: 'jewelry',
      icon: <EntypoIcon size={40} name="medal" color="yellow" />,
      press: () => props.jewel(),
    },
    {
      cat: 'Mens',
      icon: <MaterialIcons size={40} color="yellow" name="shoe-formal" />,
      press: () => props.men(),
    },
    {
      cat: 'Womens',
      icon: <MaterialIcons size={40} color="yellow" name="shoe-heel" />,
      press: () => props.women(),
    },
  ];

  return (
    <Box
      padding="1"
      marginTop="0.4"
      display="flex"
      flexDirection="row"
      justifyContent="space-around"
      backgroundColor="dark.100">
      {categories.map((cat, index) => (
        <Pressable
          onPress={() => cat.press()}
          key={cat.cat}
          alignItems="center">
          {cat.icon}
          <Text color="white">{cat.cat.toUpperCase()}</Text>
        </Pressable>
      ))}
    </Box>
  );
}

export default CategoryBar;
