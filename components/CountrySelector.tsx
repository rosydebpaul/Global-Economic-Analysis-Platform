import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  TextInput,
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Search, X, ChevronDown } from 'lucide-react-native';
import { CountryData } from '@/types/dataTypes';
import Colors from '@/constants/Colors';

interface CountrySelectorProps {
  countries: CountryData[];
  selectedCountries: CountryData[];
  onSelect: (country: CountryData) => void;
  onRemove: (countryId: string) => void;
  maxSelections?: number;
  label?: string;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  countries,
  selectedCountries,
  onSelect,
  onRemove,
  maxSelections = 5,
  label = 'Select Countries'
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedCountries.some(selected => selected.id === country.id)
  );

  const canSelectMore = selectedCountries.length < maxSelections;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <View style={styles.selectedContainer}>
        {selectedCountries.length > 0 ? (
          <FlatList
            data={selectedCountries}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.selectedCountry}>
                <Text style={styles.selectedCountryText}>{item.name}</Text>
                <TouchableOpacity
                  onPress={() => onRemove(item.id)}
                  style={styles.removeButton}
                  role="button"
                >
                  <X size={14} color={Colors.textLight} />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text style={styles.placeholder}>No countries selected</Text>
        )}
        
        {canSelectMore && (
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
            role="button"
          >
            <Text style={styles.addButtonText}>Add</Text>
            <ChevronDown size={16} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>
      
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <SafeAreaView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select a Country</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
                role="button"
              >
                <X size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchContainer}>
              <Search size={20} color={Colors.textLight} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search countries..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCorrect={false}
                autoCapitalize="none"
                clearButtonMode="while-editing"
              />
            </View>
            
            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    onSelect(item);
                    setModalVisible(false);
                    setSearchQuery('');
                  }}
                  role="button"
                >
                  <Text style={styles.countryName}>{item.name}</Text>
                  <Text style={styles.countryRegion}>{item.region}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyMessage}>
                  {searchQuery ? 'No countries found' : 'No countries available'}
                </Text>
              }
            />
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 8,
  },
  selectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    padding: 8,
  },
  placeholder: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textLight,
    flex: 1,
    paddingHorizontal: 8,
  },
  selectedCountry: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightPrimary,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  selectedCountryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary,
    marginRight: 4,
  },
  removeButton: {
    padding: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary,
    marginRight: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.text,
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  countryItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  countryName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  countryRegion: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textLight,
  },
  emptyMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    padding: 24,
  },
});

export default CountrySelector;