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

const ensureLogDirectoryExists = async () => {
  try {
    const exists = await RNFS.exists(logsPath);

    if (!exists) {
      await RNFS.mkdir(logsPath);
    }
  } catch (error) {
    console.error('Failed to create logs directory:', error);
  }
};

const writeLogToFile = async (logEntry: string) => {
  try {
    await ensureLogDirectoryExists();
    const logFilePath = getLogFilePath();

    await RNFS.appendFile(logFilePath, logEntry + '\n', 'utf8');
  } catch (error) {
    console.error('Failed to write log to file:', error);
  }
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
    console.warn('Failed to cleanup old logs:', error);
  }
};

// Run cleanup on startup
cleanupOldLogs();

// pino.transport doesn't work in React Native - it's Node.js only
// We write to files manually using RNFS instead
const pinoLogger = pino({
  level: 'info',
});

const prepareMessage = (messages: unknown[]) =>
  messages.map(message => JSON.stringify(message)).join(' ');

export const logger = (source: string) => ({
  info: (...messages: unknown[]) => {
    const message = prepareMessage(messages);
    const logObject = pinoLogger.info({ source }, message);

    // Write to file asynchronously
    const logEntry = JSON.stringify({
      level: 'info',
      time: Date.now(),
      source,
      message,
    });

    writeLogToFile(logEntry);

    return logObject;
  },
  warn: (...messages: unknown[]) => {
    const message = prepareMessage(messages);
    const logObject = pinoLogger.warn({ source }, message);

    // Write to file asynchronously
    const logEntry = JSON.stringify({
      level: 'warn',
      time: Date.now(),
      source,
      message,
    });

    writeLogToFile(logEntry);

    return logObject;
  },
});

// Export function to get all log files for sharing
export const getAllLogFiles = async (): Promise<string[]> => {
  try {
    await ensureLogDirectoryExists();
    const files = await RNFS.readDir(logsPath);

    return files
      .filter(
        file =>
          file.name.startsWith(`${logsFilePrefix}-`) &&
          file.name.endsWith(`.${logsFileExtension}`),
      )
      .map(file => file.path);
  } catch (error) {
    console.error('Failed to get log files:', error);

    return [];
  }
};

// Export function to get today's log file
export const getTodayLogFile = async (): Promise<string | null> => {
  try {
    await ensureLogDirectoryExists();
    const logFilePath = getLogFilePath();
    const exists = await RNFS.exists(logFilePath);

    return exists ? logFilePath : null;
  } catch (error) {
    console.error('Failed to get today log file:', error);

    return null;
  }
};

// Log startup info
(async () => {
  await ensureLogDirectoryExists();
  logger('logger').info(`Logs path: ${logsPath}`);
})();
