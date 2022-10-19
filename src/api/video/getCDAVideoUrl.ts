import axios from 'axios';

export const getCDAVideoUrl = async (ebdUri: string) => {
  const removeKeys = ['_XDDD', '_CDA', '_ADC', '_CXD', '_QWE', '_Q5', '_IKSDE'];
  var result = '';
  const file = RegExp('"file":"(.*?)(?:")');
  const { data } = await axios.get(ebdUri + '?wersja=1080p');
  var firstMatch = file.exec(data);
  if (!firstMatch) {
    return '';
  }
  let match = decodeURIComponent(firstMatch[1]);
  removeKeys.forEach(key => {
    match = match.replace(key, '');
  });
  for (let e = 0; e < match.length; e++) {
    var f = match.charCodeAt(e);
    result +=
      f >= 33 && f <= 126
        ? String.fromCharCode(33 + ((f + 14) % 94))
        : String.fromCharCode(f);
  }
  result = result.replace('.cda.mp4', '');
  result = result.replace('.2cda.pl', '.cda.pl');
  result = result.replace('.3cda.pl', '.cda.pl');
  return `https://${result}.mp4`;
};
