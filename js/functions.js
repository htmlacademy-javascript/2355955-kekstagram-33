const checkStringLength = (string, maxLength) => string.trim().length <= maxLength - 1;

const getReversedString = (string) => {
  let reversedString = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }

  return reversedString;
};

const isPolindrom = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();

  const reversedNormalizedString = getReversedString(normalizedString);
  return reversedNormalizedString === normalizedString;
};

const extractNubmerFromString = (param) => {
  let result = '';
  const convertParamToString = param.toString();
  for (let i = 0; i < convertParamToString.length; i++) {
    const isCharParsedToInteger = !Number.isNaN(parseInt(convertParamToString[i], 10));
    if (isCharParsedToInteger) {
      result += convertParamToString[i];
    }
  }
  return result ? parseInt(result, 10) : NaN;
};

const isOverWorkdayLimit = ({ startWorkdayTime, endWorkdayTime, meetingStartTime, meetingDuration }) => {
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map((item) => parseInt(item, 10));
    return hours * 60 + minutes;
  };

  const startWorkdayMinutes = timeToMinutes(startWorkdayTime);
  const endWorkdayMinutes = timeToMinutes(endWorkdayTime);
  const meetingStartMinutes = timeToMinutes(meetingStartTime);

  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= startWorkdayMinutes && meetingEndMinutes <= endWorkdayMinutes;
};

const workdayStart = '8:00';
const workdayEnd = '17:30';
const meetingStart = '8:00';
const duration = 900;

console.log(isOverWorkdayLimit({ startWorkdayTime: workdayStart, endWorkdayTime: workdayEnd, meetingStartTime: meetingStart, meetingDuration: duration }));

