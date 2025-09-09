import * as RNFS from '@dr.pogodin/react-native-fs';
import pino from 'pino';

const logsFilePrefix = 'logs';
const logsFileExtension = 'json';
const logsPath = RNFS.DocumentDirectoryPath + '/logs';

const getLogFilePath = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');

  return `${logsPath}/${logsFilePrefix}-${yyyy}-${mm}-${dd}.${logsFileExtension}`;
};

const cleanupOldLogs = async () => {
  try {
    const FILE_LIFE_TIME_IN_DAYS = 7;
    const files = await RNFS.readDir(logsPath);
    const now = Date.now();
    const fileLifeTimeInMs = FILE_LIFE_TIME_IN_DAYS * 24 * 60 * 60 * 1000;

    for (const file of files) {
      if (
        file.name.startsWith(`${logsFilePrefix}-`) &&
        file.name.endsWith(`.${logsFileExtension}`)
      ) {
        const age = now - file.mtime!.getTime();

        if (age > fileLifeTimeInMs) {
          await RNFS.unlink(file.path);
        }
      }
    }
  } catch (error) {
    logger('cleanupOldLogs').warn('Failed to cleanup old logs:', error);
  }
};

// Run cleanup on startup
cleanupOldLogs();

const transport = pino.transport({
  targets: [
    {
      target: 'pino/file',
      options: {
        destination: getLogFilePath(),
      },
    },
    {
      target: 'pino-pretty',
    },
  ],
});

const pinoLogger = pino(
  {
    level: 'info',
  },
  transport,
);

const prepareMessage = (messages: unknown[]) =>
  messages.map(message => JSON.stringify(message)).join(' ');

export const logger = (source: string) => ({
  info: (...messages: unknown[]) =>
    // @ts-expect-error - pino types are wrong
    pinoLogger.info(prepareMessage(messages), { source }),
  warn: (...messages: unknown[]) =>
    // @ts-expect-error - pino types are wrong
    pinoLogger.warn(prepareMessage(messages), { source }),
});
