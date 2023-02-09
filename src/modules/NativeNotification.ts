import {NativeModules} from 'react-native';

class NativeNotificationInterface {
  static showNotification(title: string, body: string) {
    const module = NativeModules.MyNotification;
    module.showNotification(title, body);
  }
}

export default NativeNotificationInterface;
