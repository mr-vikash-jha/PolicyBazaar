import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../actions/userActions';

const ListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { users, error } = useSelector((state) => state);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(fetchUsers(page, 5));
  }, [dispatch, page]);

  const handleItemPress = (id) => {
    navigation.navigate('Details', { id });
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleItemPress(item.id)}>
        <View style={styles.listItem}>
          <Text style={styles.userName}>{`${item.first_name} ${item.last_name}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (users.length % 5 !== 0 || users.length === 0) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [users]);

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={
          <View style={styles.loadMoreButtonContainer}>
            {hasMore && (
              <Button title="Load More" onPress={handleLoadMore} disabled={loading} />
            )}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  listItem: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 16,
  },
  loadMoreButtonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
});

export default ListScreen;
