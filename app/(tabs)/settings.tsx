import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Moon, Bell, Globe, Download, Info, Heart } from 'lucide-react-native';
import { useAppContext } from '@/context/AppContext';
import Colors from '@/constants/Colors';

type UpdateFrequency = 'daily' | 'weekly' | 'realtime';

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useAppContext();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dataUpdateFrequency, setDataUpdateFrequency] = useState<UpdateFrequency>('daily');
  const [offlineEnabled, setOfflineEnabled] = useState(true);

  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
          <Text style={[styles.subtitle, { color: theme.textLight }]}>Customize your app experience</Text>
        </View>

        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Appearance</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Moon size={20} color={theme.text} style={styles.settingIcon} />
              <Text style={[styles.settingLabel, { color: theme.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: Colors.light.border, true: Colors.lightPrimary }}
              thumbColor={isDarkMode ? Colors.primary : Colors.light.textLight}
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Notifications</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell size={20} color={theme.text} style={styles.settingIcon} />
              <Text style={[styles.settingLabel, { color: theme.text }]}>Enable Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: Colors.light.border, true: Colors.lightPrimary }}
              thumbColor={notificationsEnabled ? Colors.primary : Colors.light.textLight}
            />
          </View>
          
          <TouchableOpacity style={[styles.settingItem, { borderTopColor: theme.divider }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>Alert Preferences</Text>
              <Text style={[styles.settingSubLabel, { color: theme.textLight }]}>Configure economic alerts</Text>
            </View>
            <ChevronRight size={20} color={theme.textLight} />
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Data Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Globe size={20} color={theme.text} style={styles.settingIcon} />
              <Text style={[styles.settingLabel, { color: theme.text }]}>Currency</Text>
            </View>
            <View style={[styles.currencySelector, { backgroundColor: theme.background }]}>
              <Text style={[styles.currencyText, { color: theme.text }]}>USD</Text>
              <ChevronRight size={16} color={theme.textLight} />
            </View>
          </View>
          
          <TouchableOpacity style={[styles.settingItem, { borderTopColor: theme.divider }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>Update Frequency</Text>
              <Text style={[styles.settingSubLabel, { color: theme.textLight }]}>
                {dataUpdateFrequency === 'daily' ? 'Daily' : 
                 dataUpdateFrequency === 'weekly' ? 'Weekly' : 'Real-time'}
              </Text>
            </View>
            <ChevronRight size={20} color={theme.textLight} />
          </TouchableOpacity>
          
          <View style={[styles.settingItem, { borderTopColor: theme.divider }]}>
            <View style={styles.settingInfo}>
              <Download size={20} color={theme.text} style={styles.settingIcon} />
              <Text style={[styles.settingLabel, { color: theme.text }]}>Offline Access</Text>
            </View>
            <Switch
              value={offlineEnabled}
              onValueChange={setOfflineEnabled}
              trackColor={{ false: Colors.light.border, true: Colors.lightPrimary }}
              thumbColor={offlineEnabled ? Colors.primary : Colors.light.textLight}
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>About</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Info size={20} color={theme.text} style={styles.settingIcon} />
              <Text style={[styles.settingLabel, { color: theme.text }]}>About the App</Text>
            </View>
            <ChevronRight size={20} color={theme.textLight} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.settingItem, { borderTopColor: theme.divider }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>Terms of Service</Text>
            </View>
            <ChevronRight size={20} color={theme.textLight} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.settingItem, { borderTopColor: theme.divider }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>Privacy Policy</Text>
            </View>
            <ChevronRight size={20} color={theme.textLight} />
          </TouchableOpacity>
          
          <View style={[styles.madeWithLove, { borderTopColor: theme.divider }]}>
            <Text style={[styles.madeWithLoveText, { color: theme.textLight }]}>
              Made with <Heart size={12} color={Colors.error} fill={Colors.error} style={styles.heartIcon} /> in India
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  settingSubLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginTop: 2,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  currencyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginRight: 4,
  },
  madeWithLove: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderTopWidth: 1,
  },
  madeWithLoveText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    marginHorizontal: 4,
  },
});