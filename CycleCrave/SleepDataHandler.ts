import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health'

/* Permission options */
const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.SleepAnalysis],
  },
} as HealthKitPermissions

AppleHealthKit.initHealthKit(permissions, (error: string) => {
  /* Called after we receive a response from the system */

  if (error) {
    console.log('[ERROR] Cannot grant permissions!')
  }

  /* Can now read HealthKit */

  const options = {
    startDate: new Date(2024, 1, 1).toISOString(),
  }

  AppleHealthKit.getSleepSamples(
    options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
      if (callbackError) {
        console.log('[ERROR] Failed to get samples:', callbackError);
      } else {
        console.log('Sleep samples:', results);
      }
    },
  )
})