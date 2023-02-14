import { format } from 'src/Util/Format';
import { createHTime } from 'src/Core/HTime';

let date;

beforeEach(() => {
  date = createHTime({
    dateString: '2022-10-10T08:10:12.555Z',
  });
})

describe('format()', () => {
  test('format the date correctly', () => {
    expect(format(date, 'MM')).toEqual('10');
    expect(format(date, 'HH:mm:ss')).toEqual('08:10:12');
    expect(format(date, 'F:mm:ss')).toEqual('J:10:12');
    expect(format(date, "'F escaped:' F:mm:ss")).toEqual('F escaped: J:10:12');
    expect(format(date, "'F escaped:' FFF:mm:ss")).toEqual('F escaped: JJJ:10:12');
  });
});
