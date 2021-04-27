import  React from 'react'
import { View, StyleSheet} from 'react-native'

const HeadingContainer = (props) => {
  return(
    <View style={{ ...styles.Container, ...props.style }}>
    {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9EBE2',
  },
})

export default HeadingContainer;
