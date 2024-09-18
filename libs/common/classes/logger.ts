import chalk from "chalk";
import { createWriteStream, WriteStream } from "fs";
import { join } from "path";
import { createDirectoryIfNotExists } from "../utils";

const DEFAULT_SAVE_TIMEOUT = 10 * 1000;
const LOGS_DIRECTORY = "./logs";

enum LogKind {
  LOG = "LOG",
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
  DEBUG = "DEBUG",
  TRACE = "TRACE"
}

interface Log {
  kind: LogKind;
  message: string;
  timestamp: Date;
}

interface LoggerOptions {
  saveLogs?: boolean;
  saveTimeout?: number;
}

export class Logger {
  private readonly path = join(process.cwd(), LOGS_DIRECTORY, `${this.name}.log`);
  private logs: Log[] = [];
  private writeStream: WriteStream | null = null;
  private writeLogTimeout: NodeJS.Timeout | null = null;
  private closeStreamTimeout: NodeJS.Timeout | null = null;

  constructor(
    private readonly name: string,
    private readonly options: LoggerOptions = {}
  ) {}

  private initializeWriteStream() {
    // We don't need to create a write stream if we already have one
    if (this.writeStream) return;

    // Make sure the directory exists
    createDirectoryIfNotExists(join(process.cwd(), LOGS_DIRECTORY));
    this.writeStream = createWriteStream(this.path, { flags: "a+" });
  }

  private closeStream() {
    this.clearCloseStreamTimeout();
    if (!this.writeStream) return;
    this.writeStream.close();
    this.writeStream = null;
  }

  private clearCloseStreamTimeout() {
    if (!this.closeStreamTimeout) return;
    clearTimeout(this.closeStreamTimeout);
    this.closeStreamTimeout = null;
  }

  private scheduleStreamClosure() {
    if (!this.writeStream) return;

    this.clearCloseStreamTimeout();
    this.closeStreamTimeout = setTimeout(() => {
      this.closeStream();
    }, 1000);
  }

  private writeLogs() {
    if (this.writeLogTimeout) return;
    if (!this.options.saveLogs) return;

    this.initializeWriteStream();
    this.clearCloseStreamTimeout();

    this.writeLogTimeout = setTimeout(() => {
      const logsToWrite = this.logs;

      const logString =
        logsToWrite
          .map(
            log => `[${log.timestamp.toISOString()}] ${LogKind[log.kind]}: ${log.message}`
          )
          .join("\n") + "\n";

      try {
        this.writeStream!.write(logString);
      } catch (e) {
        return this.processLog(LogKind.ERROR, `Failed to write logs to file: ${e}`);
      } finally {
        this.writeLogTimeout = null;
        this.scheduleStreamClosure();
      }

      // Clear the logs if we successfully wrote them
      this.logs = [];
    }, this.options.saveTimeout || DEFAULT_SAVE_TIMEOUT);
  }

  private saveLog(kind: LogKind, message: string, date: Date = new Date()) {
    const log: Log = {
      kind,
      message,
      timestamp: date
    };

    this.logs.push(log);
    this.writeLogs();
  }

  private processLog(kind: LogKind, message: string) {
    const date = new Date();

    this.saveLog(kind, message);

    const name = chalk.bold(chalk.yellowBright(`[${this.name}]`));
    const prefix = `${chalk.white(date.toLocaleString())} ${LogKind[kind]} ${name}`;

    message = `${prefix} ${message}`;

    switch (kind) {
      case LogKind.LOG:
        console.log(chalk.green(message));
        break;
      case LogKind.INFO:
        console.info(chalk.blue(message));
        break;
      case LogKind.ERROR:
        console.error(chalk.red(message));
        break;
      case LogKind.WARN:
        console.warn(chalk.yellow(message));
        break;
      case LogKind.DEBUG:
        console.debug(chalk.cyan(message));
        break;
      case LogKind.TRACE:
        console.trace(chalk.magenta(message));
        break;
    }
  }

  log(message: string) {
    this.processLog(LogKind.LOG, message);
  }

  info(message: string) {
    this.processLog(LogKind.INFO, message);
  }

  error(message: string) {
    this.processLog(LogKind.ERROR, message);
  }

  warn(message: string) {
    this.processLog(LogKind.WARN, message);
  }

  debug(message: string) {
    this.processLog(LogKind.DEBUG, message);
  }

  trace(message: string) {
    this.processLog(LogKind.TRACE, message);
  }
}
