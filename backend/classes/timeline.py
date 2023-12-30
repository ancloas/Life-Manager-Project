from datetime import datetime, timedelta




class Blockof10min():
    def __init__(self, start_timestamp: datetime, is_wakeup_time: bool= False, is_sleep_time: bool= False) -> None:
        self.start_timestamp=start_timestamp
        time_difference = get_timestamp_diff_in_secs(start_timestamp, datetime.now())
        
        self.is_wakeup_time = is_wakeup_time
        self.is_sleep_time = is_sleep_time
        if time_difference>600:
            self.state='past'
        elif time_difference<0:
            self.state='future'
        else:
            self.state='present'
        
        self.is_O_clock = self.start_timestamp.minute == 0



    def change_state(self):
        time_difference = get_timestamp_diff_in_secs(self.start_timestamp, datetime.now())
        if time_difference>600:
            self.state='past'
        elif time_difference<0:
            self.state='future'
        else:
            self.state='present'
    

    def is_O_clock(self):
        return self.start_timestamp.minute == 0

    def get_events(self):
        #event logic to be implemented
        return []

class Timeline:
    def __init__(self, wakeuptime: str, sleeptime: str) -> None:
        try:
            # Parse the wake-up and sleep times
            wakeuptime = datetime.strptime(wakeuptime, "%H:%M")
            sleeptime = datetime.strptime(sleeptime, "%H:%M")

            
            current_datetime = datetime.now()

            self.wakeupdatetime = current_datetime.replace(hour = wakeuptime.hour, minute=(wakeuptime.minute // 10) * 10, second=0, microsecond=0)
            self.sleepdatetime = current_datetime.replace(hour = sleeptime.hour, minute=(sleeptime.minute // 10) * 10, second=0, microsecond=0)

            # Calculate the time difference
            time_difference= self.sleepdatetime - self.wakeupdatetime

            blocks_of_10_minutes = int(time_difference.total_seconds() / 600)


            self.time_blocks=[]
            for block_no in range(0, blocks_of_10_minutes):      
                start_time = self.wakeupdatetime + timedelta(minutes=block_no*10)
                block= Blockof10min(start_time)
                if block_no==blocks_of_10_minutes-1:
                    block.is_sleep_time=True
                if block_no==0:
                    block.is_wakeup_time=True
                self.time_blocks.append(block)

        
        except ValueError as e:
            # Handle the case where the input times are not in the correct format
            raise ValueError("Invalid time format. Please use HH:MM format.") from e



        def get_data(self):
            data= {}



def get_timestamp_diff_in_secs(first_datetime, second_datetime):
    """
    Calculate the time difference in seconds between two datetime objects.

    Parameters:
    - first_datetime (datetime): The first datetime object.
    - second_datetime (datetime): The second datetime object.

    Returns:
    - int: The time difference in seconds (positive if second_datetime is in the future, negative if in the past).
    """
    time_difference = second_datetime - first_datetime
    return int(time_difference.total_seconds())

# # Example usage:
# try:
#     my_timeline = Timeline("07:30", "22:45")
#     print(f"Time difference: {my_timeline.time_difference}")
#     print(f"Blocks of 10 minutes: {my_timeline.blocks_of_10_minutes}")
# except ValueError as e:
#     print(e)


        


