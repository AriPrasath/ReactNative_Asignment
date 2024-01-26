import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import {fetchGif} from '../network/fetchGifs';
import {API_KEY} from '../constants';
import GifImage from '@lowkey/react-native-gif';

export const GifLayout = props => {
  const {searchText} = props;

  const [data, setData] = useState([]);

  const [pagination, setPagination] = useState({});
  const [params, setParams] = useState({
    limit: 50,
    api_key: API_KEY,
    offset: 0,
  });
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchData({loadMore: params.offset});
  }, [params]);

  useEffect(() => {
    if (!!searchText) {
      let newParam = params;
      newParam['q'] = searchText;
      newParam.offset = 0;

      setParams({...newParam});
    } else {
      let newParam = params;
      newParam['q'] = '';
      newParam.offset = 0;
      setParams({...newParam});
    }
  }, [searchText]);

  const fetchData = async ({loadMore = 0}) => {
    const res = await fetchGif(params);
    if (res.data.length > 0) {
      setPagination(res.pagination);
      if (loadMore) {
        setData([...data, ...res.data]);
      } else {
        flatListRef.current.scrollToOffset({animated: true, offset: 0});
        setData([...res.data]);
      }
    } else {
      //End of the response handler
    }
  };

  const loadMore = () => {
    if (pagination) {
      let newParam = params;
      newParam.offset = pagination?.offset + pagination?.count;
      setParams({...newParam});
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderList = itemInfo => {
    return (
      <View style={styles.flatListItemContainer}>
        <GifImage
          source={{uri: itemInfo.item?.images?.original_still?.url}}
          style={styles.gifStyle}
        />
      </View>
    );
  };

  return (
    <View style={styles.baseContainer}>
      <FlatList
        ref={ref => (flatListRef.current = ref)}
        data={data}
        renderItem={renderList}
        initialNumToRender={10}
        keyExtractor={(item, index) => item.id + index}
        numColumns={2}
        onEndReached={() => loadMore()}
        style={styles.flatListContainer}
      />
    </View>
  );
};

const {width, height} = Dimensions.get('screen');
const itemWidth = (width - 40) / 2;

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    marginHorizontal: 13,
  },
  flatListContainer: {
    flex: 1,
    margin: 5,
  },
  flatListItemContainer: {
    flex: 1,
    borderWidth: 1,
    width: itemWidth,
    height: itemWidth,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: itemWidth * 0.1,
    overflow: 'hidden',
    elevation: 2,
  },
  gifStyle: {
    width: itemWidth - 5,
    height: itemWidth - 5,
  },
});
