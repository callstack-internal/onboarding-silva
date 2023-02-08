#import "RNCKNativeButtonViewManager.h"
#import "RNCKNativeButton.h"

@implementation RNCKNativeButtonViewManager

RCT_EXPORT_MODULE(CKNativeButton)

RCT_EXPORT_VIEW_PROPERTY(enabled, BOOL)

RCT_CUSTOM_VIEW_PROPERTY(text, NSString, UIButton) {
    [view setTitle:json forState:UIControlStateNormal];
}

RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)

- (UIButton *)view
{
    return [[RNCKNativeButton alloc] initWithFrame:CGRectZero];
}

@end
