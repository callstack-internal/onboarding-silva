#import "RNCKNativeButton.h"

@implementation RNCKNativeButton

- (instancetype)initWithFrame:(CGRect)frame
{
  self = [super initWithFrame:frame];
  if (self) {
    [self setTitleColor:UIColor.whiteColor forState:UIControlStateNormal];
    self.backgroundColor = [[UIColor alloc] initWithRed:181/255.0 green:215/255.0 blue:228/255.0 alpha:1.0];
    
    [self addTarget:self action:@selector(handleOnPress) forControlEvents:UIControlEventTouchUpInside];
  }
  return self;
}

- (void)handleOnPress {
  self.onPress([NSDictionary dictionary]);
}

@end
