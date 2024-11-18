export const isTimesReserved = (inputTimes: any, reservedTimes: any) => {

  const parseTime = (time: string) => {
    // Convert time to a comparable format (24-hour time)
    const [timeStr, meridian] = time.split(" ");
    let [hours, minutes] = timeStr.split(":").map(Number);

    if (meridian === "PM" && hours !== 12) hours += 12; // Convert PM times
    if (meridian === "AM" && hours === 12) hours = 0; // Adjust midnight to 0:00
    if (meridian === "PM" && hours === 12) hours = 12; // 12 PM should stay as 12:00

    return hours * 60 + minutes; // Convert to minutes since 00:00
  };

  let inputFrom = parseTime(inputTimes.inputFrom);
  let inputTo = parseTime(inputTimes.inputTo);
  let resFrom = parseTime(reservedTimes.resFrom);
  let resTo = parseTime(reservedTimes.resTo);

  // If the input time spans over midnight, adjust the end time
  if (inputFrom > inputTo) inputTo += 24 * 60; // Add 24 hours (in minutes) for next day
  if (resFrom > resTo) resTo += 24 * 60; // Same adjustment for reserved times

  // Check for overlap
  return inputFrom < resTo && inputTo > resFrom;
};