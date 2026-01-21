import { formatDistanceToNowStrict } from 'date-fns';

const formattedTime = (date: Date | number): string => {
  const distance = formatDistanceToNowStrict(date, { addSuffix: true });

  return distance
    .replace(' seconds', 'secs')
    .replace(' second', 'sec')
    .replace(' minutes', 'mins')
    .replace(' minute', 'min')
    .replace(' hours', 'hrs')
    .replace(' hour', 'hr')
    .replace(' days', 'dys')
    .replace(' day', 'd')
    .replace(' weeks', 'wks')
    .replace(' week', 'wk')
    .replace(' months', 'mos')
    .replace(' month', 'mo')
    .replace(' years', 'yrs')
    .replace(' year', 'yr')
    .replace('about ', '')      // remove "about"
    .replace('less than ', '')   // remove "less than"
    .replace('over ', '');       // remove "over"
};

export default formattedTime;