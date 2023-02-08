package com.weatherapp.native_notification;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MyNotificationModule extends ReactContextBaseJavaModule {
    String notificationChannelId = "NotificationChannel";

    public MyNotificationModule(ReactApplicationContext context) {
        super(context);
        createNotificationChannel();
    }

    @Override
    public String getName() {
        return "MyNotification";
    }

    @ReactMethod
    public void showNotification(String title, String content) {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(getReactApplicationContext(), notificationChannelId)
                .setSmallIcon(android.R.drawable.arrow_up_float)
                .setContentTitle(title)
                .setContentText(content)
                .setPriority(NotificationCompat.PRIORITY_DEFAULT);

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(getReactApplicationContext());
        notificationManager.notify(666, builder.build());
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "Notification Channel";
            String description = "Sends notifications";
            int importance = NotificationManager.IMPORTANCE_DEFAULT;

            NotificationChannel channel = new NotificationChannel(notificationChannelId, name, importance);
            channel.setDescription(description);
            NotificationManager notificationManager = getReactApplicationContext().getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }
}