import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, PickerIOSComponent } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
  
  const [term, setTerm] = useState('');
  const [searchApi, results, errorMessage] = useResults();
  // console.log(results)
  const filterResultsByPrice = price => {
    //price === '$' || '$$' || '$$$'
    return results.filter(result => {
      return result.price === price;
    });
  };

  return (

    // <> Fits for any screen sizes
    <>
      <SearchBar
        term={term}
        // onTermChange={newTerm => setTerm(newTerm)}
        onTermSubmit={() => searchApi(term)}
        onTermChange={setTerm}
        // onTermSubmit={searchApi}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}

      <ScrollView>
        <ResultsList
          results={filterResultsByPrice('$')}
          title="Cost Effective"
        />
        <ResultsList
          results={filterResultsByPrice('$$')}
          title="Bit Pricier"
        />
        <ResultsList
          results={filterResultsByPrice('$$$')}
          title="Big Spender"
          />
      </ScrollView>
    </>
  )
};

const styles = StyleSheet.create({});

export default SearchScreen;
