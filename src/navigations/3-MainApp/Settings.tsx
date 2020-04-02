import React from 'react'
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  Switch,
  NativeModules,
} from 'react-native'
import { COLORS } from '../../styles'
import { MyBackground } from '../../components/MyBackground'
import { SafeAreaView } from 'react-native-safe-area-context'

interface SettingsProps {}

interface SettingsState {
  isServiceEnabled: boolean
}

export class Settings extends React.Component<SettingsProps, SettingsState> {
  constructor(props) {
    super(props)
    this.state = {
      isServiceEnabled: false,
    }
  }

  componentDidMount() {
    // Check if Tracer Service has been enabled
    NativeModules.ContactTracerModule.isTracerServiceEnabled()
      .then(enabled => {
        this.setState({
          isServiceEnabled: enabled,
        })
      })
      .then(() => {})
  }

  componentWillUnmount() {}

  /**
   * User Event Handler
   */

  onServiceSwitchChanged = () => {
    if (this.state.isServiceEnabled) {
      // To turn off
      NativeModules.ContactTracerModule.disableTracerService().then(() => {})
    } else {
      // To turn on
      NativeModules.ContactTracerModule.enableTracerService().then(() => {})
    }
    this.setState({
      isServiceEnabled: !this.state.isServiceEnabled,
    })
  }

  render() {
    return (
      <MyBackground variant="light">
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.PRIMARY_LIGHT}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <View>
            <View style={styles.body}>
              <View style={styles.horizontalRow}>
                <Text style={styles.normalText}>Service: </Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={
                    this.state.isServiceEnabled ? '#f5dd4b' : '#f4f3f4'
                  }
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={this.onServiceSwitchChanged}
                  value={this.state.isServiceEnabled}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </MyBackground>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ffffff',
    padding: 24,
  },
  horizontalRow: {
    marginTop: 24,
    flexDirection: 'row',
  },
  normalText: {
    fontSize: 16,
    color: '#000000',
  },
  mediumText: {
    fontSize: 20,
    color: '#000000',
  },
  largeText: {
    fontSize: 24,
    color: '#000000',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  scrollView: {
    marginTop: 24,
  },
})