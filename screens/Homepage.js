import {View} from 'native-base';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProducts} from '../redux/fakeStoreReducer';
import CategoryBar from '../components/CategoryBar';
import Products from '../components/Products';

function Homepage({navigation}) {
  const dispatch = useDispatch();
  const productsState = useSelector(state => state.products);
  const [productsToRender, setProductsToRender] = React.useState(
    productsState.products,
  );

  useEffect(() => {
    if (productsState.products.length == 0) dispatch(getAllProducts());
  }, []);

  const handleElectronicsClick = () => {
    let electronicsProducts = productsState.products.filter(
      product => product.category == 'electronics',
    );
    setProductsToRender(electronicsProducts);
  };

  const handleJewelleryClick = () => {
    let jewelleryProducts = productsState.products.filter(
      product => product.category == 'jewelery',
    );
    setProductsToRender(jewelleryProducts);
  };

  const handleMensClick = () => {
    let mensProducts = productsState.products.filter(product =>
      product.category.includes('men'),
    );
    setProductsToRender(mensProducts);
  };

  const handleWomenClick = () => {
    let womenProducts = productsState.products.filter(product =>
      product.category.includes('women'),
    );
    setProductsToRender(womenProducts);
  };

  const handleProductClick = product => {
    console.log('product clicked', product);
    // navigation.navigate('product', {product});
  };

  return (
    <View>
      <CategoryBar
        elec={handleElectronicsClick}
        jewel={handleJewelleryClick}
        men={handleMensClick}
        women={handleWomenClick}
      />
      <Products click={handleProductClick} data={productsToRender} />
    </View>
  );
}

export default Homepage;
