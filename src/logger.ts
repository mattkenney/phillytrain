import { useEffect } from 'react';

function build(level: string, ...what: unknown[]) {
  const url = new URL('/collect.gif', location.href);
  if (level) {
    url.searchParams.append('level', level);
  }
  url.searchParams.append('data', JSON.stringify(what, replacer));

  return url;
}

function replacer(_: string, value: unknown) {
  if (value instanceof Error || value instanceof GeolocationPositionError) {
    const { code, message, name, stack } = value as Error &
      GeolocationPositionError;
    return {
      code,
      message,
      name,
      stack: stack && String(stack).split('\n')[0],
      type: value.constructor.name,
    };
  }

  return value;
}

function send(url: URL) {
  console.error(url);
  fetch(url.href).catch((err: unknown) => {
    console.error(err, url);
  });
}

// use useEffect to log only once per data change
function useLog(level: string, ...what: unknown[]) {
  const data = build(level, ...what);
  useEffect(() => {
    send(data);
  }, [data]);
}

export const useLogError = (...what: unknown[]) => {
  useLog('error', ...what);
};
export const useLogInfo = (...what: unknown[]) => {
  useLog('info', ...what);
};
export const useLogWarn = (...what: unknown[]) => {
  useLog('warn', ...what);
};

export const logger = {
  error: (...args: unknown[]) => {
    send(build('error', ...args));
  },
  info: (...args: unknown[]) => {
    send(build('info', ...args));
  },
  log: (...args: unknown[]) => {
    send(build('', ...args));
  },
  warn: (...args: unknown[]) => {
    send(build('warn', ...args));
  },
};
