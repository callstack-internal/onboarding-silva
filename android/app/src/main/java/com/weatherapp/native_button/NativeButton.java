package com.weatherapp.native_button;

import android.content.Context;
import android.graphics.Color;

import androidx.annotation.NonNull;
import androidx.appcompat.widget.AppCompatButton;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class NativeButton extends AppCompatButton {
    public NativeButton(@NonNull Context context) {
        super(context);
        this.setBackgroundColor(Color.argb(255, 181, 215, 228));
        this.setTextColor(Color.WHITE);
        this.setOnClickListener(viewClicked -> {
            WritableMap event = Arguments.createMap();
            event.putString("action", "click");

            ReactContext reactContext = (ReactContext) getContext();
            reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "press", event);
        });
    }
}
