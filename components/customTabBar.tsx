import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { spacing } from '@/styles';

type TabPath = '/(tabs)' | '/(tabs)/habits' | '/(tabs)/profile';

const tabs: { label: string; path: TabPath }[] = [
  { label: 'Home', path: '/(tabs)' },
  { label: 'Profile', path: '/(tabs)/profile' },
];

export default function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.tabBarWrapper}>
      <View style={styles.separator} />
      <View style={styles.tabBarContainer}>
        {tabs.map((tab, index) => {
          const isActive = pathname === tab.path;
          return (
            <Pressable
              key={index}
              onPress={() => router.push(tab.path as any)}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  separator: {
    height: 0.25,
    backgroundColor: '#3F3F3F',
    width: '100%',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: "#1A1A1A",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
  },
  tabButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    borderRadius: spacing.sm,
  },
  activeTabButton: {
    backgroundColor: '#3F4A5A', // subtle highlight
  },
  tabText: {
    color: '#ccc',
    fontWeight: '600',
    fontSize: 14,
  },
  activeTabText: {
    color: 'white',
  },
});
