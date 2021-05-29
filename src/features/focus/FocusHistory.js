import React from 'react';
import {View, StyleSheet, FlatList, Text, SafeAreaView} from 'react-native';
import {sizes} from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem= ({item, index}) => {
    return (
      <Text style={styles.historyItem(item.status)}>
        {item.subject}
      </Text>
    )
}

export const FocusHistory = ({focusHistory, onClear}) =>  {

   const clearHistory = () => {
     onClear();
   }

   return (
      
      <SafeAreaView style={{ flex: .5,alignItems:'center',paddingTop: 10}} >
          {!!focusHistory.length &&
              <>
                  <Text style={styles.title}>Thing's that we have focussed on</Text>
                  
                  <FlatList
                        style={{ flex: 1}} 
                        contentContainerStyle={{flex: 1, alignItems:'center'}}
                        data={focusHistory}
                        renderItem={HistoryItem}
                  />
                  <View style={styles.clearContainer}>
                      <RoundedButton size={75} title="Clear" onPress={() => clearHistory()}/>
                  </View>
              </>
          }
      </SafeAreaView>
     
     
      
   )
}

const styles= StyleSheet.create({
    historyItem: (status) => ({
        color: status > 1 ? 'red' : 'green', 
        fontSize: sizes.md
    }),
    title: {
      color: 'white',
      fontSize: sizes.md
    },
    clearContainer: {
      alignItems: 'center',
      padding: sizes.md
    }
})

