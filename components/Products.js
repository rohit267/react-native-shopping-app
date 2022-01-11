import {Box, Text, FlatList, Image, Badge, Pressable} from 'native-base';
import React from 'react';
import FaIcons from 'react-native-vector-icons/FontAwesome';
import {randomDiscount} from '../utility/Helper';

function Products({data, click}) {
  const [productsData, setProductsData] = React.useState([]);

  React.useEffect(() => {
    let newData = data.map(item => {
      let discountPer = randomDiscount();
      let discount = (item.price * 50 * discountPer) / 100;
      let discountedAmount = item.price * 50 - discount;
      return {...item, discountPer, discount, discountedAmount};
    });
    setProductsData(newData);
  }, [data]);

  return (
    <FlatList
      data={productsData}
      renderItem={item => <Product item={item.item} click={click} />}
      keyExtractor={item => item.id}
      extraData={click}
    />
  );
}

export function Product(props) {
  const {item, click} = props;

  return (
    <Pressable
      flexDirection="row"
      margin="1"
      borderTopWidth="1"
      borderColor="grey"
      paddingTop="1"
      paddingBottom="1"
      onPress={() => click(item)}>
      <Image alt={item.title} src={item.image} height="108" width="108" />
      <Box marginLeft="4">
        <Text paddingRight="32" fontSize="14" fontWeight="500" noOfLines={2}>
          {item.title}
        </Text>
        <Box flexDirection="row" alignItems="center">
          <Badge
            colorScheme="success"
            variant="solid"
            width="55"
            justifyContent="space-around"
            flexDirection="row">
            <Text color="white" fontSize="16">
              {item.rating.rate}
            </Text>
            <FaIcons name="star" />
          </Badge>
          <Text marginLeft="1" color="gray.500" fontSize="14">
            ({item.rating.count})
          </Text>
        </Box>
        <PriceBox
          discountPer={item.discountPer}
          discount={item.discount}
          discountedAmount={item.discountedAmount}
          price={item.price}
        />
      </Box>
    </Pressable>
  );
}

export function PriceBox(props) {
  return (
    <Box flexDirection="row" alignItems="center">
      <Text
        color="grey"
        style={{
          textDecorationLine: 'line-through',
          textDecorationStyle: 'solid',
        }}>
        {props.price * 50}
      </Text>
      <Text fontSize="16" fontWeight="700" marginLeft="2">
        ₹ {Number(props.discountedAmount).toFixed(2)}
      </Text>
      <Text color="green.600" marginLeft="2">
        {props.discountPer}% off
      </Text>
    </Box>
  );
}

export default Products;
