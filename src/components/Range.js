import {React,useState} from 'react'
import { Slider } from 'react-native-range-slider-expo';
import RangeSlider from 'react-native-range-slider-expo';
import { View, Text, StyleSheet} from 'react-native';

export const Range = () => {
     const [fromValue, setFromValue] = useState(0);
     const [toValue, setToValue] = useState(0);
     const [value, setValue] = useState(0);

     const styles = StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          },
        });

    return (<div>
     <View style={styles.container}>
           <View>
                <RangeSlider min={5} max={25}
                     fromValueOnChange={value => setFromValue(value)}
                     toValueOnChange={value => setToValue(value)}
                     initialFromValue={11}
                />
                <Text>from value:  {fromValue}</Text>
                <Text>to value:  {toValue}</Text>
           </View>
           <View>
                <Slider min={0} max={40} step={4}
                     valueOnChange={value => setValue(value)}
                     initialValue={12}
                     knobColor='red'
                     valueLabelsBackgroundColor='black'
                     inRangeBarColor='purple'
                     outOfRangeBarColor='orange'
                />
                <Text>value:  {value}</Text>
           </View>
        </View>
      </div>     
 );
  
}
