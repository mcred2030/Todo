//
//  Badge.m
//  ReactSecond
//
//  Created by Red Red on 2018. 7. 5..
//  Copyright © 2018년 Tech2030com. All rights reserved.
//

#import "Badge.h"
#import <React/RCTLog.h>
#import <UserNotifications/UserNotifications.h>

@implementation Badge

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}


RCT_EXPORT_METHOD(badgeSetPlus:(NSInteger)num msg:(NSString *)msg date:(NSString *)date)
{
  [UIApplication sharedApplication].applicationIconBadgeNumber += num;
  
  [self scheduleLocalNotifications:msg val1:date];
  
}


RCT_EXPORT_METHOD(badgeSetMinus:(NSInteger)num)
{
  if([UIApplication sharedApplication].applicationIconBadgeNumber > 0) {
    [UIApplication sharedApplication].applicationIconBadgeNumber -= num;
  }
  
}


- (void)scheduleLocalNotifications:(NSString *)msg val1:(NSString *)date {
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  
  UNNotificationAction *snoozeAction = [UNNotificationAction actionWithIdentifier:@"Snooze"
                                                                            title:@"Snooze" options:UNNotificationActionOptionNone];
  UNNotificationAction *deleteAction = [UNNotificationAction actionWithIdentifier:@"Delete"
                                                                            title:@"Delete" options:UNNotificationActionOptionDestructive];
  
  UNNotificationCategory *category = [UNNotificationCategory categoryWithIdentifier:@"UYLReminderCategory"
                                                                            actions:@[snoozeAction,deleteAction] intentIdentifiers:@[]
                                                                            options:UNNotificationCategoryOptionNone];
  NSSet *categories = [NSSet setWithObject:category];
  
  [center setNotificationCategories:categories];
  
  
  
  UNMutableNotificationContent *content = [UNMutableNotificationContent new];
  content.title = date;
  content.body = msg;
  
  content.categoryIdentifier = @"UYLReminderCategory";
  content.sound = [UNNotificationSound defaultSound];
  //content.badge = [NSNumber numberWithInt:1];
  content.badge = [NSNumber numberWithInteger:([UIApplication sharedApplication].applicationIconBadgeNumber + 1)];
  
  
  
  UNTimeIntervalNotificationTrigger *trigger = [UNTimeIntervalNotificationTrigger triggerWithTimeInterval:15 repeats:NO];

  
  
  // Calendar
  // https://useyourloaf.com/blog/local-notifications-with-ios-10/
  
  NSDate *date = [NSDate dateWithTimeIntervalSinceNow:3600];
  NSDateComponents *triggerDate = [[NSCalendar currentCalendar]   
              components:NSCalendarUnitYear +
              NSCalendarUnitMonth + NSCalendarUnitDay +
              NSCalendarUnitHour + NSCalendarUnitMinute +
              NSCalendarUnitSecond fromDate:date];
  
  
  
  
  
  
  NSString *identifier = @"UYLLocalNotification";
  UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:identifier content:content trigger:trigger];
  
  [center addNotificationRequest:request withCompletionHandler:^(NSError * _Nullable error) {
    if (error != nil) {
      NSLog(@"Something went wrong: %@",error);
    }
  }];
}

@end
