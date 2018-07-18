//
//  HelloWorld.m
//  ReactSecond
//
//  Created by Red Red on 2018. 7. 3..
//

#import "HelloWorld.h"
#import <React/RCTLog.h>

@implementation HelloWorld

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(greeting:(NSString *)name)
{
  RCTLogInfo(@"Saluton HH, %@", name);
}

RCT_EXPORT_METHOD(badgeSet:(NSInteger)num)
{
  [UIApplication sharedApplication].applicationIconBadgeNumber = num;
}

@end
