package com.weatherapp.native_button;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

public class NativeButtonViewManager extends SimpleViewManager<NativeButton> {
    @NonNull
    @Override
    public String getName() {
        return "CKNativeButton";
    }

    @NonNull
    @Override
    protected NativeButton createViewInstance(@NonNull ThemedReactContext ReactContext) {
        return new NativeButton(ReactContext);
    }

    @Nullable
    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder().put("press", MapBuilder.of("phasedRegistrationNames", MapBuilder.of("bubbled", "onPress"))).build();
    }

    @ReactProp(name = "enabled")
    public void setEnabled(NativeButton button, Boolean enabled) {
        button.setEnabled(enabled);
    }

    @ReactProp(name = "text")
    public void setText(NativeButton button, String text) {
        button.setText(text);
    }
}
