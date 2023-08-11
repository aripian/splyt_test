function findAppointment(schedule, length) {
  let time = 900;
  
  for (const bTime of schedule) {
    for (const meet of bTime) {
      if (meet[0] < 900 || meet[1] >= 1900) {
        return null;
      }
      for (const othermeet of bTime) {
        if (meet[0] < othermeet[0] && othermeet[0] <= meet[1]) {
          return null;
        } else if (meet[0] <= othermeet[1] && othermeet[1] < meet[1] + length) {
          return null;
        }
      }
    }
  }

  // The appointment fits into the schedules.
  return time + 60 * length // 60;
}

const schedule = [
  [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
  [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
  [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
];

const length = 60;

console.log(findAppointment(schedule, length));