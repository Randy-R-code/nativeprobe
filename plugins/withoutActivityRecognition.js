const { withAndroidManifest, AndroidConfig } = require('expo/config-plugins');

// expo-sensors' own AndroidManifest.xml unconditionally declares
// ACTIVITY_RECOGNITION for its Pedometer sub-module, which NativeProbe
// never uses (Pedometer is out of scope for V1). Play Console then forces
// the "Health apps" declaration for a permission the app never actually
// requests — strip it via manifest merger instead.
module.exports = function withoutActivityRecognition(config) {
  return withAndroidManifest(config, (config) => {
    const androidManifest = config.modResults;
    AndroidConfig.Manifest.ensureToolsAvailable(androidManifest);

    androidManifest.manifest['uses-permission'] = androidManifest.manifest['uses-permission'] ?? [];
    androidManifest.manifest['uses-permission'].push({
      $: {
        'android:name': 'android.permission.ACTIVITY_RECOGNITION',
        'tools:node': 'remove',
      },
    });

    return config;
  });
};
