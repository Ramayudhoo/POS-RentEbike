import * as React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import colors from '../constants/color';
import { useAuth } from '../provider/AuthProvider';

const Header: React.FC = () => {
  const { profileImageUrl, profileName, email } = useAuth();

  return (
    <Appbar.Header>
      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: profileImageUrl || 'https://example.com/path/to/default/profile/image.png' }} 
          style={styles.profileImage} 
        />
        <View>
          <Text style={styles.profileName}>{profileName || email || 'Guest'}</Text>
        </View>
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    padding:10,
    
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileName: {
    color: colors.black,
    fontWeight: 'bold',
  },
});

export default Header;
