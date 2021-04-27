import  React from 'react'
import { View, StyleSheet} from 'react-native'

const TopContainer = (props) => {
  return(
    <View style={{ ...styles.Container, ...props.style }}>
    {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default TopContainer;
