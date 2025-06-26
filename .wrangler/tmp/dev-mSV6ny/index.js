var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, 'name', { value, configurable: true });

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, 'createNotImplementedError');
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, 'fn');
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, 'notImplemented');
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, 'notImplementedClass');

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now
  ? globalThis.performance.now.bind(globalThis.performance)
  : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: 'node',
  entryType: 'node',
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0,
  },
  detail: void 0,
  toJSON() {
    return this;
  },
};
var PerformanceEntry = class {
  static {
    __name(this, 'PerformanceEntry');
  }
  __unenv__ = true;
  detail;
  entryType = 'event';
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail,
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, 'PerformanceMark');
  }
  entryType = 'mark';
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, 'PerformanceMeasure');
  }
  entryType = 'measure';
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, 'PerformanceResourceTiming');
  }
  entryType = 'resource';
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = '';
  name = '';
  nextHopProtocol = '';
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, 'PerformanceObserverEntryList');
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, 'Performance');
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError('Performance.timerify');
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming('');
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName
      ? this._entries.filter((e) => e.name !== markName)
      : this._entries.filter((e) => e.entryType !== 'mark');
  }
  clearMeasures(measureName) {
    this._entries = measureName
      ? this._entries.filter((e) => e.name !== measureName)
      : this._entries.filter((e) => e.entryType !== 'measure');
  }
  clearResourceTimings() {
    this._entries = this._entries.filter(
      (e) => e.entryType !== 'resource' || e.entryType !== 'navigation'
    );
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === 'string') {
      start = this.getEntriesByName(startOrMeasureOptions, 'mark')[0]?.startTime;
      end = this.getEntriesByName(endMark, 'mark')[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end,
      },
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError('Performance.addEventListener');
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError('Performance.removeEventListener');
  }
  dispatchEvent(event) {
    throw createNotImplementedError('Performance.dispatchEvent');
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, 'PerformanceObserver');
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError('PerformanceObserver.disconnect');
  }
  observe(options) {
    throw createNotImplementedError('PerformanceObserver.observe');
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance =
  globalThis.performance && 'addEventListener' in globalThis.performance
    ? globalThis.performance
    : new Performance();

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from 'node:stream';

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {}, { __unenv__: true });

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented('console.createTask');
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass('console.Console');
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis['console'];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2,
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times,
});
var console_default = workerdConsole;

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(
  /* @__PURE__ */ __name(function hrtime2(startTime) {
    const now = Date.now();
    const seconds = Math.trunc(now / 1e3);
    const nanos = (now % 1e3) * 1e6;
    if (startTime) {
      let diffSeconds = seconds - startTime[0];
      let diffNanos = nanos - startTime[0];
      if (diffNanos < 0) {
        diffSeconds = diffSeconds - 1;
        diffNanos = 1e9 + diffNanos;
      }
      return [diffSeconds, diffNanos];
    }
    return [seconds, nanos];
  }, 'hrtime'),
  {
    bigint: /* @__PURE__ */ __name(function bigint() {
      return BigInt(Date.now() * 1e6);
    }, 'bigint'),
  }
);

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from 'node:events';

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, 'WriteStream');
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === 'function' && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {}
    cb && typeof cb === 'function' && cb();
    return false;
  }
};

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, 'ReadStream');
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = '22.14.0';

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, 'Process');
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [
      ...Object.getOwnPropertyNames(_Process.prototype),
      ...Object.getOwnPropertyNames(EventEmitter.prototype),
    ]) {
      const value = this[prop];
      if (typeof value === 'function') {
        this[prop] = value.bind(this);
      }
    }
  }
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ''}${type ? `${type}: ` : ''}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return (this.#stdin ??= new ReadStream(0));
  }
  get stdout() {
    return (this.#stdout ??= new WriteStream(1));
  }
  get stderr() {
    return (this.#stderr ??= new WriteStream(2));
  }
  #cwd = '/';
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  arch = '';
  platform = '';
  argv = [];
  argv0 = '';
  execArgv = [];
  execPath = '';
  title = '';
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  ref() {}
  unref() {}
  umask() {
    throw createNotImplementedError('process.umask');
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError('process.getActiveResourcesInfo');
  }
  exit() {
    throw createNotImplementedError('process.exit');
  }
  reallyExit() {
    throw createNotImplementedError('process.reallyExit');
  }
  kill() {
    throw createNotImplementedError('process.kill');
  }
  abort() {
    throw createNotImplementedError('process.abort');
  }
  dlopen() {
    throw createNotImplementedError('process.dlopen');
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError('process.setSourceMapsEnabled');
  }
  loadEnvFile() {
    throw createNotImplementedError('process.loadEnvFile');
  }
  disconnect() {
    throw createNotImplementedError('process.disconnect');
  }
  cpuUsage() {
    throw createNotImplementedError('process.cpuUsage');
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError('process.setUncaughtExceptionCaptureCallback');
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError('process.hasUncaughtExceptionCaptureCallback');
  }
  initgroups() {
    throw createNotImplementedError('process.initgroups');
  }
  openStdin() {
    throw createNotImplementedError('process.openStdin');
  }
  assert() {
    throw createNotImplementedError('process.assert');
  }
  binding() {
    throw createNotImplementedError('process.binding');
  }
  permission = { has: /* @__PURE__ */ notImplemented('process.permission.has') };
  report = {
    directory: '',
    filename: '',
    signal: 'SIGUSR2',
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented('process.report.getReport'),
    writeReport: /* @__PURE__ */ notImplemented('process.report.writeReport'),
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented('process.finalization.register'),
    unregister: /* @__PURE__ */ notImplemented('process.finalization.unregister'),
    registerBeforeExit: /* @__PURE__ */ notImplemented('process.finalization.registerBeforeExit'),
  };
  memoryUsage = Object.assign(
    () => ({
      arrayBuffers: 0,
      rss: 0,
      external: 0,
      heapTotal: 0,
      heapUsed: 0,
    }),
    { rss: /* @__PURE__ */ __name(() => 0, 'rss') }
  );
  mainModule = void 0;
  domain = void 0;
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis['process'];
var getBuiltinModule = globalProcess.getBuiltinModule;
var { exit, platform, nextTick } = getBuiltinModule('node:process');
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  nextTick,
});
var {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  finalization,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  on,
  off,
  once,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding,
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding,
};
var process_default = _process;

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, '__facade_register__');
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    },
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, '__facade_invokeChain__');
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware,
  ]);
}
__name(__facade_invoke__, '__facade_invoke__');

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {}
      }
    } catch (e) {
      console.error('Failed to drain the unused request body.', e);
    }
  }
}, 'drainBody');
var middleware_ensure_req_body_drained_default = drainBody;

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause),
  };
}
__name(reduceError, 'reduceError');
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error3 = reduceError(e);
    return Response.json(error3, {
      status: 500,
      headers: { 'MF-Experimental-Error-Stack': 'true' },
    });
  }
}, 'jsonError');
var middleware_miniflare3_json_error_default = jsonError;

// src/shared/infra/clients/d1.ts
var CloudflareD1Client = class {
  constructor(db) {
    this.db = db;
  }
  static {
    __name(this, 'CloudflareD1Client');
  }
  query(sql, params) {
    return this.db
      .prepare(sql)
      .bind(...(params || []))
      .all();
  }
  async insert(sql, params) {
    return this.db
      .prepare(sql)
      .bind(...(params || []))
      .run();
  }
};
function createD1Client(db) {
  return new CloudflareD1Client(db);
}
__name(createD1Client, 'createD1Client');
var CloudflareD1Repository = class {
  constructor(d1Client) {
    this.d1Client = d1Client;
  }
  static {
    __name(this, 'CloudflareD1Repository');
  }
  async saveArticleSummary(summary) {
    const articleSql = `
      INSERT OR REPLACE INTO articles (
        id, title, url, likes_count, created_at, updated_at, 
        user_id, user_name, body, rendered_body
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await this.d1Client.insert(articleSql, [
      summary.originalArticle.id,
      summary.originalArticle.title,
      summary.originalArticle.url,
      summary.originalArticle.likes_count,
      summary.originalArticle.created_at,
      summary.originalArticle.updated_at,
      summary.originalArticle.user.id,
      summary.originalArticle.user.name,
      summary.originalArticle.body,
      summary.originalArticle.rendered_body,
    ]);
    for (const tag of summary.originalArticle.tags) {
      const tagSql = `
        INSERT OR REPLACE INTO article_tags (
          article_id, tag_name, tag_versions
        ) VALUES (?, ?, ?)
      `;
      await this.d1Client.insert(tagSql, [
        summary.originalArticle.id,
        tag.name,
        JSON.stringify(tag.versions),
      ]);
    }
    const summarySql = `
      INSERT OR REPLACE INTO article_summaries (
        id, title, url, summary_heading, summary_catch, summary_text, 
        target_audience, disclaimer, created_at, updated_at, original_article_id, keyword
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await this.d1Client.insert(summarySql, [
      summary.id,
      summary.title,
      summary.url,
      summary.summary.heading,
      summary.summary.catch,
      summary.summary.summaryText,
      summary.summary.targetAudience,
      summary.disclaimer,
      summary.created_at,
      summary.updated_at,
      summary.originalArticle.id,
      summary.keyword,
    ]);
  }
  async getAllArticleSummaries() {
    const sql = `
      SELECT 
        s.id, s.title, s.url, s.summary_heading, s.summary_catch, s.summary_text, 
        s.target_audience, s.disclaimer, s.created_at, s.updated_at, s.keyword,
        a.id as original_article_id, a.title as original_article_title, a.url as original_article_url,
        a.likes_count, a.created_at as original_article_created_at, a.updated_at as original_article_updated_at,
        a.user_id, a.user_name, a.body, a.rendered_body
      FROM article_summaries s
      LEFT JOIN articles a ON s.original_article_id = a.id
      ORDER BY s.created_at DESC
    `;
    const result = await this.d1Client.query(sql);
    const summaries = [];
    for (const row of result.results) {
      const tagSql = `
        SELECT tag_name, tag_versions
        FROM article_tags
        WHERE article_id = ?
      `;
      const tagResult = await this.d1Client.query(tagSql, [row.original_article_id]);
      const tags = tagResult.results.map((tag) => ({
        name: tag.tag_name,
        versions: JSON.parse(tag.tag_versions),
      }));
      summaries.push({
        id: row.id,
        title: row.title,
        url: row.url,
        summary: {
          heading: row.summary_heading,
          catch: row.summary_catch,
          summaryText: row.summary_text,
          targetAudience: row.target_audience,
        },
        disclaimer: row.disclaimer,
        created_at: row.created_at,
        updated_at: row.updated_at,
        originalArticle: {
          id: row.original_article_id,
          title: row.original_article_title,
          url: row.original_article_url,
          likes_count: row.likes_count,
          created_at: row.original_article_created_at,
          user: {
            id: row.user_id,
            name: row.user_name,
          },
          tags,
          body: row.body,
          rendered_body: row.rendered_body,
          updated_at: row.original_article_updated_at,
        },
        keyword: row.keyword,
      });
    }
    return summaries;
  }
  async getArticleSummaryById(id) {
    const sql = `
      SELECT 
        s.id, s.title, s.url, s.summary_heading, s.summary_catch, s.summary_text, 
        s.target_audience, s.disclaimer, s.created_at, s.updated_at, s.keyword,
        a.id as original_article_id, a.title as original_article_title, a.url as original_article_url,
        a.likes_count, a.created_at as original_article_created_at, a.updated_at as original_article_updated_at,
        a.user_id, a.user_name, a.body, a.rendered_body
      FROM article_summaries s
      LEFT JOIN articles a ON s.original_article_id = a.id
      WHERE s.id = ?
    `;
    const result = await this.d1Client.query(sql, [id]);
    if (result.results.length === 0) {
      return null;
    }
    const summaryData = result.results[0];
    const tagSql = `
      SELECT tag_name, tag_versions
      FROM article_tags
      WHERE article_id = ?
    `;
    const tagResult = await this.d1Client.query(tagSql, [summaryData.original_article_id]);
    const tags = tagResult.results.map((tag) => ({
      name: tag.tag_name,
      versions: JSON.parse(tag.tag_versions),
    }));
    return {
      id: summaryData.id,
      title: summaryData.title,
      url: summaryData.url,
      summary: {
        heading: summaryData.summary_heading,
        catch: summaryData.summary_catch,
        summaryText: summaryData.summary_text,
        targetAudience: summaryData.target_audience,
      },
      disclaimer: summaryData.disclaimer,
      created_at: summaryData.created_at,
      updated_at: summaryData.updated_at,
      originalArticle: {
        id: summaryData.original_article_id,
        title: summaryData.original_article_title,
        url: summaryData.original_article_url,
        likes_count: summaryData.likes_count,
        created_at: summaryData.original_article_created_at,
        user: {
          id: summaryData.user_id,
          name: summaryData.user_name,
        },
        tags,
        body: summaryData.body,
        rendered_body: summaryData.rendered_body,
        updated_at: summaryData.original_article_updated_at,
      },
      keyword: summaryData.keyword,
    };
  }
};
function createD1Repository(d1Client) {
  return new CloudflareD1Repository(d1Client);
}
__name(createD1Repository, 'createD1Repository');

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/crypto/node.mjs
var webcrypto = new Proxy(globalThis.crypto, {
  get(_, key) {
    if (key === 'CryptoKey') {
      return globalThis.CryptoKey;
    }
    if (typeof globalThis.crypto[key] === 'function') {
      return globalThis.crypto[key].bind(globalThis.crypto);
    }
    return globalThis.crypto[key];
  },
});

// ../../.nvm/versions/node/v20.19.3/lib/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/crypto.mjs
var workerdCrypto = process.getBuiltinModule('node:crypto');
var {
  Certificate,
  checkPrime,
  checkPrimeSync,
  constants,
  // @ts-expect-error
  Cipheriv,
  createCipheriv,
  createDecipheriv,
  createDiffieHellman,
  createDiffieHellmanGroup,
  createECDH,
  createHash,
  createHmac,
  createPrivateKey,
  createPublicKey,
  createSecretKey,
  createSign,
  createVerify,
  // @ts-expect-error
  Decipheriv,
  diffieHellman,
  DiffieHellman,
  DiffieHellmanGroup,
  ECDH,
  fips,
  generateKey,
  generateKeyPair,
  generateKeyPairSync,
  generateKeySync,
  generatePrime,
  generatePrimeSync,
  getCipherInfo,
  getCiphers,
  getCurves,
  getDiffieHellman,
  getFips,
  getHashes,
  getRandomValues,
  hash,
  Hash,
  hkdf,
  hkdfSync,
  Hmac,
  KeyObject,
  pbkdf2,
  pbkdf2Sync,
  privateDecrypt,
  privateEncrypt,
  publicDecrypt,
  publicEncrypt,
  randomBytes,
  randomFill,
  randomFillSync,
  randomInt,
  randomUUID,
  scrypt,
  scryptSync,
  secureHeapUsed,
  setEngine,
  setFips,
  sign,
  Sign,
  subtle,
  timingSafeEqual,
  verify,
  Verify,
  X509Certificate,
} = workerdCrypto;
var webcrypto2 = {
  // @ts-expect-error
  CryptoKey: webcrypto.CryptoKey,
  getRandomValues,
  randomUUID,
  subtle,
};

// node_modules/.pnpm/@google+generative-ai@0.24.1/node_modules/@google/generative-ai/dist/index.mjs
var SchemaType;
((SchemaType2) => {
  SchemaType2['STRING'] = 'string';
  SchemaType2['NUMBER'] = 'number';
  SchemaType2['INTEGER'] = 'integer';
  SchemaType2['BOOLEAN'] = 'boolean';
  SchemaType2['ARRAY'] = 'array';
  SchemaType2['OBJECT'] = 'object';
})(SchemaType || (SchemaType = {}));
var ExecutableCodeLanguage;
((ExecutableCodeLanguage2) => {
  ExecutableCodeLanguage2['LANGUAGE_UNSPECIFIED'] = 'language_unspecified';
  ExecutableCodeLanguage2['PYTHON'] = 'python';
})(ExecutableCodeLanguage || (ExecutableCodeLanguage = {}));
var Outcome;
((Outcome2) => {
  Outcome2['OUTCOME_UNSPECIFIED'] = 'outcome_unspecified';
  Outcome2['OUTCOME_OK'] = 'outcome_ok';
  Outcome2['OUTCOME_FAILED'] = 'outcome_failed';
  Outcome2['OUTCOME_DEADLINE_EXCEEDED'] = 'outcome_deadline_exceeded';
})(Outcome || (Outcome = {}));
var POSSIBLE_ROLES = ['user', 'model', 'function', 'system'];
var HarmCategory;
((HarmCategory2) => {
  HarmCategory2['HARM_CATEGORY_UNSPECIFIED'] = 'HARM_CATEGORY_UNSPECIFIED';
  HarmCategory2['HARM_CATEGORY_HATE_SPEECH'] = 'HARM_CATEGORY_HATE_SPEECH';
  HarmCategory2['HARM_CATEGORY_SEXUALLY_EXPLICIT'] = 'HARM_CATEGORY_SEXUALLY_EXPLICIT';
  HarmCategory2['HARM_CATEGORY_HARASSMENT'] = 'HARM_CATEGORY_HARASSMENT';
  HarmCategory2['HARM_CATEGORY_DANGEROUS_CONTENT'] = 'HARM_CATEGORY_DANGEROUS_CONTENT';
  HarmCategory2['HARM_CATEGORY_CIVIC_INTEGRITY'] = 'HARM_CATEGORY_CIVIC_INTEGRITY';
})(HarmCategory || (HarmCategory = {}));
var HarmBlockThreshold;
((HarmBlockThreshold2) => {
  HarmBlockThreshold2['HARM_BLOCK_THRESHOLD_UNSPECIFIED'] = 'HARM_BLOCK_THRESHOLD_UNSPECIFIED';
  HarmBlockThreshold2['BLOCK_LOW_AND_ABOVE'] = 'BLOCK_LOW_AND_ABOVE';
  HarmBlockThreshold2['BLOCK_MEDIUM_AND_ABOVE'] = 'BLOCK_MEDIUM_AND_ABOVE';
  HarmBlockThreshold2['BLOCK_ONLY_HIGH'] = 'BLOCK_ONLY_HIGH';
  HarmBlockThreshold2['BLOCK_NONE'] = 'BLOCK_NONE';
})(HarmBlockThreshold || (HarmBlockThreshold = {}));
var HarmProbability;
((HarmProbability2) => {
  HarmProbability2['HARM_PROBABILITY_UNSPECIFIED'] = 'HARM_PROBABILITY_UNSPECIFIED';
  HarmProbability2['NEGLIGIBLE'] = 'NEGLIGIBLE';
  HarmProbability2['LOW'] = 'LOW';
  HarmProbability2['MEDIUM'] = 'MEDIUM';
  HarmProbability2['HIGH'] = 'HIGH';
})(HarmProbability || (HarmProbability = {}));
var BlockReason;
((BlockReason2) => {
  BlockReason2['BLOCKED_REASON_UNSPECIFIED'] = 'BLOCKED_REASON_UNSPECIFIED';
  BlockReason2['SAFETY'] = 'SAFETY';
  BlockReason2['OTHER'] = 'OTHER';
})(BlockReason || (BlockReason = {}));
var FinishReason;
((FinishReason2) => {
  FinishReason2['FINISH_REASON_UNSPECIFIED'] = 'FINISH_REASON_UNSPECIFIED';
  FinishReason2['STOP'] = 'STOP';
  FinishReason2['MAX_TOKENS'] = 'MAX_TOKENS';
  FinishReason2['SAFETY'] = 'SAFETY';
  FinishReason2['RECITATION'] = 'RECITATION';
  FinishReason2['LANGUAGE'] = 'LANGUAGE';
  FinishReason2['BLOCKLIST'] = 'BLOCKLIST';
  FinishReason2['PROHIBITED_CONTENT'] = 'PROHIBITED_CONTENT';
  FinishReason2['SPII'] = 'SPII';
  FinishReason2['MALFORMED_FUNCTION_CALL'] = 'MALFORMED_FUNCTION_CALL';
  FinishReason2['OTHER'] = 'OTHER';
})(FinishReason || (FinishReason = {}));
var TaskType;
((TaskType2) => {
  TaskType2['TASK_TYPE_UNSPECIFIED'] = 'TASK_TYPE_UNSPECIFIED';
  TaskType2['RETRIEVAL_QUERY'] = 'RETRIEVAL_QUERY';
  TaskType2['RETRIEVAL_DOCUMENT'] = 'RETRIEVAL_DOCUMENT';
  TaskType2['SEMANTIC_SIMILARITY'] = 'SEMANTIC_SIMILARITY';
  TaskType2['CLASSIFICATION'] = 'CLASSIFICATION';
  TaskType2['CLUSTERING'] = 'CLUSTERING';
})(TaskType || (TaskType = {}));
var FunctionCallingMode;
((FunctionCallingMode2) => {
  FunctionCallingMode2['MODE_UNSPECIFIED'] = 'MODE_UNSPECIFIED';
  FunctionCallingMode2['AUTO'] = 'AUTO';
  FunctionCallingMode2['ANY'] = 'ANY';
  FunctionCallingMode2['NONE'] = 'NONE';
})(FunctionCallingMode || (FunctionCallingMode = {}));
var DynamicRetrievalMode;
((DynamicRetrievalMode2) => {
  DynamicRetrievalMode2['MODE_UNSPECIFIED'] = 'MODE_UNSPECIFIED';
  DynamicRetrievalMode2['MODE_DYNAMIC'] = 'MODE_DYNAMIC';
})(DynamicRetrievalMode || (DynamicRetrievalMode = {}));
var GoogleGenerativeAIError = class extends Error {
  static {
    __name(this, 'GoogleGenerativeAIError');
  }
  constructor(message) {
    super(`[GoogleGenerativeAI Error]: ${message}`);
  }
};
var GoogleGenerativeAIResponseError = class extends GoogleGenerativeAIError {
  static {
    __name(this, 'GoogleGenerativeAIResponseError');
  }
  constructor(message, response) {
    super(message);
    this.response = response;
  }
};
var GoogleGenerativeAIFetchError = class extends GoogleGenerativeAIError {
  static {
    __name(this, 'GoogleGenerativeAIFetchError');
  }
  constructor(message, status, statusText, errorDetails) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.errorDetails = errorDetails;
  }
};
var GoogleGenerativeAIRequestInputError = class extends GoogleGenerativeAIError {
  static {
    __name(this, 'GoogleGenerativeAIRequestInputError');
  }
};
var GoogleGenerativeAIAbortError = class extends GoogleGenerativeAIError {
  static {
    __name(this, 'GoogleGenerativeAIAbortError');
  }
};
var DEFAULT_BASE_URL = 'https://generativelanguage.googleapis.com';
var DEFAULT_API_VERSION = 'v1beta';
var PACKAGE_VERSION = '0.24.1';
var PACKAGE_LOG_HEADER = 'genai-js';
var Task;
((Task2) => {
  Task2['GENERATE_CONTENT'] = 'generateContent';
  Task2['STREAM_GENERATE_CONTENT'] = 'streamGenerateContent';
  Task2['COUNT_TOKENS'] = 'countTokens';
  Task2['EMBED_CONTENT'] = 'embedContent';
  Task2['BATCH_EMBED_CONTENTS'] = 'batchEmbedContents';
})(Task || (Task = {}));
var RequestUrl = class {
  static {
    __name(this, 'RequestUrl');
  }
  constructor(model, task, apiKey, stream, requestOptions) {
    this.model = model;
    this.task = task;
    this.apiKey = apiKey;
    this.stream = stream;
    this.requestOptions = requestOptions;
  }
  toString() {
    var _a, _b;
    const apiVersion =
      ((_a = this.requestOptions) === null || _a === void 0 ? void 0 : _a.apiVersion) ||
      DEFAULT_API_VERSION;
    const baseUrl =
      ((_b = this.requestOptions) === null || _b === void 0 ? void 0 : _b.baseUrl) ||
      DEFAULT_BASE_URL;
    let url = `${baseUrl}/${apiVersion}/${this.model}:${this.task}`;
    if (this.stream) {
      url += '?alt=sse';
    }
    return url;
  }
};
function getClientHeaders(requestOptions) {
  const clientHeaders = [];
  if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.apiClient) {
    clientHeaders.push(requestOptions.apiClient);
  }
  clientHeaders.push(`${PACKAGE_LOG_HEADER}/${PACKAGE_VERSION}`);
  return clientHeaders.join(' ');
}
__name(getClientHeaders, 'getClientHeaders');
async function getHeaders(url) {
  var _a;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-goog-api-client', getClientHeaders(url.requestOptions));
  headers.append('x-goog-api-key', url.apiKey);
  let customHeaders =
    (_a = url.requestOptions) === null || _a === void 0 ? void 0 : _a.customHeaders;
  if (customHeaders) {
    if (!(customHeaders instanceof Headers)) {
      try {
        customHeaders = new Headers(customHeaders);
      } catch (e) {
        throw new GoogleGenerativeAIRequestInputError(
          `unable to convert customHeaders value ${JSON.stringify(customHeaders)} to Headers: ${
            e.message
          }`
        );
      }
    }
    for (const [headerName, headerValue] of customHeaders.entries()) {
      if (headerName === 'x-goog-api-key') {
        throw new GoogleGenerativeAIRequestInputError(
          `Cannot set reserved header name ${headerName}`
        );
      } else if (headerName === 'x-goog-api-client') {
        throw new GoogleGenerativeAIRequestInputError(
          `Header name ${headerName} can only be set using the apiClient field`
        );
      }
      headers.append(headerName, headerValue);
    }
  }
  return headers;
}
__name(getHeaders, 'getHeaders');
async function constructModelRequest(model, task, apiKey, stream, body, requestOptions) {
  const url = new RequestUrl(model, task, apiKey, stream, requestOptions);
  return {
    url: url.toString(),
    fetchOptions: Object.assign(Object.assign({}, buildFetchOptions(requestOptions)), {
      method: 'POST',
      headers: await getHeaders(url),
      body,
    }),
  };
}
__name(constructModelRequest, 'constructModelRequest');
async function makeModelRequest(
  model,
  task,
  apiKey,
  stream,
  body,
  requestOptions = {},
  fetchFn = fetch
) {
  const { url, fetchOptions } = await constructModelRequest(
    model,
    task,
    apiKey,
    stream,
    body,
    requestOptions
  );
  return makeRequest(url, fetchOptions, fetchFn);
}
__name(makeModelRequest, 'makeModelRequest');
async function makeRequest(url, fetchOptions, fetchFn = fetch) {
  let response;
  try {
    response = await fetchFn(url, fetchOptions);
  } catch (e) {
    handleResponseError(e, url);
  }
  if (!response.ok) {
    await handleResponseNotOk(response, url);
  }
  return response;
}
__name(makeRequest, 'makeRequest');
function handleResponseError(e, url) {
  let err = e;
  if (err.name === 'AbortError') {
    err = new GoogleGenerativeAIAbortError(
      `Request aborted when fetching ${url.toString()}: ${e.message}`
    );
    err.stack = e.stack;
  } else if (
    !(e instanceof GoogleGenerativeAIFetchError || e instanceof GoogleGenerativeAIRequestInputError)
  ) {
    err = new GoogleGenerativeAIError(`Error fetching from ${url.toString()}: ${e.message}`);
    err.stack = e.stack;
  }
  throw err;
}
__name(handleResponseError, 'handleResponseError');
async function handleResponseNotOk(response, url) {
  let message = '';
  let errorDetails;
  try {
    const json = await response.json();
    message = json.error.message;
    if (json.error.details) {
      message += ` ${JSON.stringify(json.error.details)}`;
      errorDetails = json.error.details;
    }
  } catch (e) {}
  throw new GoogleGenerativeAIFetchError(
    `Error fetching from ${url.toString()}: [${response.status} ${response.statusText}] ${message}`,
    response.status,
    response.statusText,
    errorDetails
  );
}
__name(handleResponseNotOk, 'handleResponseNotOk');
function buildFetchOptions(requestOptions) {
  const fetchOptions = {};
  if (
    (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) !==
      void 0 ||
    (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0
  ) {
    const controller = new AbortController();
    if (
      (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0
    ) {
      setTimeout(() => controller.abort(), requestOptions.timeout);
    }
    if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) {
      requestOptions.signal.addEventListener('abort', () => {
        controller.abort();
      });
    }
    fetchOptions.signal = controller.signal;
  }
  return fetchOptions;
}
__name(buildFetchOptions, 'buildFetchOptions');
function addHelpers(response) {
  response.text = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(
          `This response had ${response.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`
        );
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      return getText(response);
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(
        `Text not available. ${formatBlockErrorMessage(response)}`,
        response
      );
    }
    return '';
  };
  response.functionCall = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(
          `This response had ${response.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`
        );
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      console.warn(`response.functionCall() is deprecated. Use response.functionCalls() instead.`);
      return getFunctionCalls(response)[0];
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(
        `Function call not available. ${formatBlockErrorMessage(response)}`,
        response
      );
    }
    return void 0;
  };
  response.functionCalls = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(
          `This response had ${response.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`
        );
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      return getFunctionCalls(response);
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(
        `Function call not available. ${formatBlockErrorMessage(response)}`,
        response
      );
    }
    return void 0;
  };
  return response;
}
__name(addHelpers, 'addHelpers');
function getText(response) {
  var _a, _b, _c, _d;
  const textStrings = [];
  if (
    (_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null ||
    _b === void 0
      ? void 0
      : _b.parts
  ) {
    for (const part of (_d =
      (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null ||
    _d === void 0
      ? void 0
      : _d.parts) {
      if (part.text) {
        textStrings.push(part.text);
      }
      if (part.executableCode) {
        textStrings.push(
          '\n```' + part.executableCode.language + '\n' + part.executableCode.code + '\n```\n'
        );
      }
      if (part.codeExecutionResult) {
        textStrings.push('\n```\n' + part.codeExecutionResult.output + '\n```\n');
      }
    }
  }
  if (textStrings.length > 0) {
    return textStrings.join('');
  } else {
    return '';
  }
}
__name(getText, 'getText');
function getFunctionCalls(response) {
  var _a, _b, _c, _d;
  const functionCalls = [];
  if (
    (_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null ||
    _b === void 0
      ? void 0
      : _b.parts
  ) {
    for (const part of (_d =
      (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null ||
    _d === void 0
      ? void 0
      : _d.parts) {
      if (part.functionCall) {
        functionCalls.push(part.functionCall);
      }
    }
  }
  if (functionCalls.length > 0) {
    return functionCalls;
  } else {
    return void 0;
  }
}
__name(getFunctionCalls, 'getFunctionCalls');
var badFinishReasons = [FinishReason.RECITATION, FinishReason.SAFETY, FinishReason.LANGUAGE];
function hadBadFinishReason(candidate) {
  return !!candidate.finishReason && badFinishReasons.includes(candidate.finishReason);
}
__name(hadBadFinishReason, 'hadBadFinishReason');
function formatBlockErrorMessage(response) {
  var _a, _b, _c;
  let message = '';
  if ((!response.candidates || response.candidates.length === 0) && response.promptFeedback) {
    message += 'Response was blocked';
    if ((_a = response.promptFeedback) === null || _a === void 0 ? void 0 : _a.blockReason) {
      message += ` due to ${response.promptFeedback.blockReason}`;
    }
    if ((_b = response.promptFeedback) === null || _b === void 0 ? void 0 : _b.blockReasonMessage) {
      message += `: ${response.promptFeedback.blockReasonMessage}`;
    }
  } else if ((_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0]) {
    const firstCandidate = response.candidates[0];
    if (hadBadFinishReason(firstCandidate)) {
      message += `Candidate was blocked due to ${firstCandidate.finishReason}`;
      if (firstCandidate.finishMessage) {
        message += `: ${firstCandidate.finishMessage}`;
      }
    }
  }
  return message;
}
__name(formatBlockErrorMessage, 'formatBlockErrorMessage');
function __await(v) {
  return this instanceof __await ? ((this.v = v), this) : new __await(v);
}
__name(__await, '__await');
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
  var g = generator.apply(thisArg, _arguments || []),
    i,
    q = [];
  return (
    (i = {}),
    verb('next'),
    verb('throw'),
    verb('return'),
    (i[Symbol.asyncIterator] = function () {
      return this;
    }),
    i
  );
  function verb(n) {
    if (g[n])
      i[n] = (v) =>
        new Promise((a, b) => {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
  }
  __name(verb, 'verb');
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  __name(resume, 'resume');
  function step(r) {
    r.value instanceof __await
      ? Promise.resolve(r.value.v).then(fulfill, reject)
      : settle(q[0][2], r);
  }
  __name(step, 'step');
  function fulfill(value) {
    resume('next', value);
  }
  __name(fulfill, 'fulfill');
  function reject(value) {
    resume('throw', value);
  }
  __name(reject, 'reject');
  function settle(f, v) {
    if ((f(v), q.shift(), q.length)) resume(q[0][0], q[0][1]);
  }
  __name(settle, 'settle');
}
__name(__asyncGenerator, '__asyncGenerator');
var responseLineRE = /^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;
function processStream(response) {
  const inputStream = response.body.pipeThrough(new TextDecoderStream('utf8', { fatal: true }));
  const responseStream = getResponseStream(inputStream);
  const [stream1, stream2] = responseStream.tee();
  return {
    stream: generateResponseSequence(stream1),
    response: getResponsePromise(stream2),
  };
}
__name(processStream, 'processStream');
async function getResponsePromise(stream) {
  const allResponses = [];
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      return addHelpers(aggregateResponses(allResponses));
    }
    allResponses.push(value);
  }
}
__name(getResponsePromise, 'getResponsePromise');
function generateResponseSequence(stream) {
  return __asyncGenerator(
    this,
    arguments,
    /* @__PURE__ */ __name(function* generateResponseSequence_1() {
      const reader = stream.getReader();
      while (true) {
        const { value, done } = yield __await(reader.read());
        if (done) {
          break;
        }
        yield yield __await(addHelpers(value));
      }
    }, 'generateResponseSequence_1')
  );
}
__name(generateResponseSequence, 'generateResponseSequence');
function getResponseStream(inputStream) {
  const reader = inputStream.getReader();
  const stream = new ReadableStream({
    start(controller) {
      let currentText = '';
      return pump();
      function pump() {
        return reader
          .read()
          .then(({ value, done }) => {
            if (done) {
              if (currentText.trim()) {
                controller.error(new GoogleGenerativeAIError('Failed to parse stream'));
                return;
              }
              controller.close();
              return;
            }
            currentText += value;
            let match = currentText.match(responseLineRE);
            let parsedResponse;
            while (match) {
              try {
                parsedResponse = JSON.parse(match[1]);
              } catch (e) {
                controller.error(
                  new GoogleGenerativeAIError(`Error parsing JSON response: "${match[1]}"`)
                );
                return;
              }
              controller.enqueue(parsedResponse);
              currentText = currentText.substring(match[0].length);
              match = currentText.match(responseLineRE);
            }
            return pump();
          })
          .catch((e) => {
            let err = e;
            err.stack = e.stack;
            if (err.name === 'AbortError') {
              err = new GoogleGenerativeAIAbortError(
                'Request aborted when reading from the stream'
              );
            } else {
              err = new GoogleGenerativeAIError('Error reading from the stream');
            }
            throw err;
          });
      }
      __name(pump, 'pump');
    },
  });
  return stream;
}
__name(getResponseStream, 'getResponseStream');
function aggregateResponses(responses) {
  const lastResponse = responses[responses.length - 1];
  const aggregatedResponse = {
    promptFeedback:
      lastResponse === null || lastResponse === void 0 ? void 0 : lastResponse.promptFeedback,
  };
  for (const response of responses) {
    if (response.candidates) {
      let candidateIndex = 0;
      for (const candidate of response.candidates) {
        if (!aggregatedResponse.candidates) {
          aggregatedResponse.candidates = [];
        }
        if (!aggregatedResponse.candidates[candidateIndex]) {
          aggregatedResponse.candidates[candidateIndex] = {
            index: candidateIndex,
          };
        }
        aggregatedResponse.candidates[candidateIndex].citationMetadata = candidate.citationMetadata;
        aggregatedResponse.candidates[candidateIndex].groundingMetadata =
          candidate.groundingMetadata;
        aggregatedResponse.candidates[candidateIndex].finishReason = candidate.finishReason;
        aggregatedResponse.candidates[candidateIndex].finishMessage = candidate.finishMessage;
        aggregatedResponse.candidates[candidateIndex].safetyRatings = candidate.safetyRatings;
        if (candidate.content && candidate.content.parts) {
          if (!aggregatedResponse.candidates[candidateIndex].content) {
            aggregatedResponse.candidates[candidateIndex].content = {
              role: candidate.content.role || 'user',
              parts: [],
            };
          }
          const newPart = {};
          for (const part of candidate.content.parts) {
            if (part.text) {
              newPart.text = part.text;
            }
            if (part.functionCall) {
              newPart.functionCall = part.functionCall;
            }
            if (part.executableCode) {
              newPart.executableCode = part.executableCode;
            }
            if (part.codeExecutionResult) {
              newPart.codeExecutionResult = part.codeExecutionResult;
            }
            if (Object.keys(newPart).length === 0) {
              newPart.text = '';
            }
            aggregatedResponse.candidates[candidateIndex].content.parts.push(newPart);
          }
        }
      }
      candidateIndex++;
    }
    if (response.usageMetadata) {
      aggregatedResponse.usageMetadata = response.usageMetadata;
    }
  }
  return aggregatedResponse;
}
__name(aggregateResponses, 'aggregateResponses');
async function generateContentStream(apiKey, model, params, requestOptions) {
  const response = await makeModelRequest(
    model,
    Task.STREAM_GENERATE_CONTENT,
    apiKey,
    /* stream */
    true,
    JSON.stringify(params),
    requestOptions
  );
  return processStream(response);
}
__name(generateContentStream, 'generateContentStream');
async function generateContent(apiKey, model, params, requestOptions) {
  const response = await makeModelRequest(
    model,
    Task.GENERATE_CONTENT,
    apiKey,
    /* stream */
    false,
    JSON.stringify(params),
    requestOptions
  );
  const responseJson = await response.json();
  const enhancedResponse = addHelpers(responseJson);
  return {
    response: enhancedResponse,
  };
}
__name(generateContent, 'generateContent');
function formatSystemInstruction(input) {
  if (input == null) {
    return void 0;
  } else if (typeof input === 'string') {
    return { role: 'system', parts: [{ text: input }] };
  } else if (input.text) {
    return { role: 'system', parts: [input] };
  } else if (input.parts) {
    if (!input.role) {
      return { role: 'system', parts: input.parts };
    } else {
      return input;
    }
  }
}
__name(formatSystemInstruction, 'formatSystemInstruction');
function formatNewContent(request) {
  let newParts = [];
  if (typeof request === 'string') {
    newParts = [{ text: request }];
  } else {
    for (const partOrString of request) {
      if (typeof partOrString === 'string') {
        newParts.push({ text: partOrString });
      } else {
        newParts.push(partOrString);
      }
    }
  }
  return assignRoleToPartsAndValidateSendMessageRequest(newParts);
}
__name(formatNewContent, 'formatNewContent');
function assignRoleToPartsAndValidateSendMessageRequest(parts) {
  const userContent = { role: 'user', parts: [] };
  const functionContent = { role: 'function', parts: [] };
  let hasUserContent = false;
  let hasFunctionContent = false;
  for (const part of parts) {
    if ('functionResponse' in part) {
      functionContent.parts.push(part);
      hasFunctionContent = true;
    } else {
      userContent.parts.push(part);
      hasUserContent = true;
    }
  }
  if (hasUserContent && hasFunctionContent) {
    throw new GoogleGenerativeAIError(
      'Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.'
    );
  }
  if (!hasUserContent && !hasFunctionContent) {
    throw new GoogleGenerativeAIError('No content is provided for sending chat message.');
  }
  if (hasUserContent) {
    return userContent;
  }
  return functionContent;
}
__name(
  assignRoleToPartsAndValidateSendMessageRequest,
  'assignRoleToPartsAndValidateSendMessageRequest'
);
function formatCountTokensInput(params, modelParams) {
  var _a;
  let formattedGenerateContentRequest = {
    model: modelParams === null || modelParams === void 0 ? void 0 : modelParams.model,
    generationConfig:
      modelParams === null || modelParams === void 0 ? void 0 : modelParams.generationConfig,
    safetySettings:
      modelParams === null || modelParams === void 0 ? void 0 : modelParams.safetySettings,
    tools: modelParams === null || modelParams === void 0 ? void 0 : modelParams.tools,
    toolConfig: modelParams === null || modelParams === void 0 ? void 0 : modelParams.toolConfig,
    systemInstruction:
      modelParams === null || modelParams === void 0 ? void 0 : modelParams.systemInstruction,
    cachedContent:
      (_a = modelParams === null || modelParams === void 0 ? void 0 : modelParams.cachedContent) ===
        null || _a === void 0
        ? void 0
        : _a.name,
    contents: [],
  };
  const containsGenerateContentRequest = params.generateContentRequest != null;
  if (params.contents) {
    if (containsGenerateContentRequest) {
      throw new GoogleGenerativeAIRequestInputError(
        'CountTokensRequest must have one of contents or generateContentRequest, not both.'
      );
    }
    formattedGenerateContentRequest.contents = params.contents;
  } else if (containsGenerateContentRequest) {
    formattedGenerateContentRequest = Object.assign(
      Object.assign({}, formattedGenerateContentRequest),
      params.generateContentRequest
    );
  } else {
    const content = formatNewContent(params);
    formattedGenerateContentRequest.contents = [content];
  }
  return { generateContentRequest: formattedGenerateContentRequest };
}
__name(formatCountTokensInput, 'formatCountTokensInput');
function formatGenerateContentInput(params) {
  let formattedRequest;
  if (params.contents) {
    formattedRequest = params;
  } else {
    const content = formatNewContent(params);
    formattedRequest = { contents: [content] };
  }
  if (params.systemInstruction) {
    formattedRequest.systemInstruction = formatSystemInstruction(params.systemInstruction);
  }
  return formattedRequest;
}
__name(formatGenerateContentInput, 'formatGenerateContentInput');
function formatEmbedContentInput(params) {
  if (typeof params === 'string' || Array.isArray(params)) {
    const content = formatNewContent(params);
    return { content };
  }
  return params;
}
__name(formatEmbedContentInput, 'formatEmbedContentInput');
var VALID_PART_FIELDS = [
  'text',
  'inlineData',
  'functionCall',
  'functionResponse',
  'executableCode',
  'codeExecutionResult',
];
var VALID_PARTS_PER_ROLE = {
  user: ['text', 'inlineData'],
  function: ['functionResponse'],
  model: ['text', 'functionCall', 'executableCode', 'codeExecutionResult'],
  // System instructions shouldn't be in history anyway.
  system: ['text'],
};
function validateChatHistory(history) {
  let prevContent = false;
  for (const currContent of history) {
    const { role, parts } = currContent;
    if (!prevContent && role !== 'user') {
      throw new GoogleGenerativeAIError(`First content should be with role 'user', got ${role}`);
    }
    if (!POSSIBLE_ROLES.includes(role)) {
      throw new GoogleGenerativeAIError(
        `Each item should include role field. Got ${role} but valid roles are: ${JSON.stringify(
          POSSIBLE_ROLES
        )}`
      );
    }
    if (!Array.isArray(parts)) {
      throw new GoogleGenerativeAIError(
        "Content should have 'parts' property with an array of Parts"
      );
    }
    if (parts.length === 0) {
      throw new GoogleGenerativeAIError('Each Content should have at least one part');
    }
    const countFields = {
      text: 0,
      inlineData: 0,
      functionCall: 0,
      functionResponse: 0,
      fileData: 0,
      executableCode: 0,
      codeExecutionResult: 0,
    };
    for (const part of parts) {
      for (const key of VALID_PART_FIELDS) {
        if (key in part) {
          countFields[key] += 1;
        }
      }
    }
    const validParts = VALID_PARTS_PER_ROLE[role];
    for (const key of VALID_PART_FIELDS) {
      if (!validParts.includes(key) && countFields[key] > 0) {
        throw new GoogleGenerativeAIError(
          `Content with role '${role}' can't contain '${key}' part`
        );
      }
    }
    prevContent = true;
  }
}
__name(validateChatHistory, 'validateChatHistory');
function isValidResponse(response) {
  var _a;
  if (response.candidates === void 0 || response.candidates.length === 0) {
    return false;
  }
  const content = (_a = response.candidates[0]) === null || _a === void 0 ? void 0 : _a.content;
  if (content === void 0) {
    return false;
  }
  if (content.parts === void 0 || content.parts.length === 0) {
    return false;
  }
  for (const part of content.parts) {
    if (part === void 0 || Object.keys(part).length === 0) {
      return false;
    }
    if (part.text !== void 0 && part.text === '') {
      return false;
    }
  }
  return true;
}
__name(isValidResponse, 'isValidResponse');
var SILENT_ERROR = 'SILENT_ERROR';
var ChatSession = class {
  static {
    __name(this, 'ChatSession');
  }
  constructor(apiKey, model, params, _requestOptions = {}) {
    this.model = model;
    this.params = params;
    this._requestOptions = _requestOptions;
    this._history = [];
    this._sendPromise = Promise.resolve();
    this._apiKey = apiKey;
    if (params === null || params === void 0 ? void 0 : params.history) {
      validateChatHistory(params.history);
      this._history = params.history;
    }
  }
  /**
   * Gets the chat history so far. Blocked prompts are not added to history.
   * Blocked candidates are not added to history, nor are the prompts that
   * generated them.
   */
  async getHistory() {
    await this._sendPromise;
    return this._history;
  }
  /**
   * Sends a chat message and receives a non-streaming
   * {@link GenerateContentResult}.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async sendMessage(request, requestOptions = {}) {
    var _a, _b, _c, _d, _e, _f;
    await this._sendPromise;
    const newContent = formatNewContent(request);
    const generateContentRequest = {
      safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
      generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
      tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
      toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
      systemInstruction:
        (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
      cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
      contents: [...this._history, newContent],
    };
    const chatSessionRequestOptions = Object.assign(
      Object.assign({}, this._requestOptions),
      requestOptions
    );
    let finalResult;
    this._sendPromise = this._sendPromise
      .then(() =>
        generateContent(this._apiKey, this.model, generateContentRequest, chatSessionRequestOptions)
      )
      .then((result) => {
        var _a2;
        if (isValidResponse(result.response)) {
          this._history.push(newContent);
          const responseContent = Object.assign(
            {
              parts: [],
              // Response seems to come back without a role set.
              role: 'model',
            },
            (_a2 = result.response.candidates) === null || _a2 === void 0 ? void 0 : _a2[0].content
          );
          this._history.push(responseContent);
        } else {
          const blockErrorMessage = formatBlockErrorMessage(result.response);
          if (blockErrorMessage) {
            console.warn(
              `sendMessage() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`
            );
          }
        }
        finalResult = result;
      })
      .catch((e) => {
        this._sendPromise = Promise.resolve();
        throw e;
      });
    await this._sendPromise;
    return finalResult;
  }
  /**
   * Sends a chat message and receives the response as a
   * {@link GenerateContentStreamResult} containing an iterable stream
   * and a response promise.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async sendMessageStream(request, requestOptions = {}) {
    var _a, _b, _c, _d, _e, _f;
    await this._sendPromise;
    const newContent = formatNewContent(request);
    const generateContentRequest = {
      safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
      generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
      tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
      toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
      systemInstruction:
        (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
      cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
      contents: [...this._history, newContent],
    };
    const chatSessionRequestOptions = Object.assign(
      Object.assign({}, this._requestOptions),
      requestOptions
    );
    const streamPromise = generateContentStream(
      this._apiKey,
      this.model,
      generateContentRequest,
      chatSessionRequestOptions
    );
    this._sendPromise = this._sendPromise
      .then(() => streamPromise)
      .catch((_ignored) => {
        throw new Error(SILENT_ERROR);
      })
      .then((streamResult) => streamResult.response)
      .then((response) => {
        if (isValidResponse(response)) {
          this._history.push(newContent);
          const responseContent = Object.assign({}, response.candidates[0].content);
          if (!responseContent.role) {
            responseContent.role = 'model';
          }
          this._history.push(responseContent);
        } else {
          const blockErrorMessage = formatBlockErrorMessage(response);
          if (blockErrorMessage) {
            console.warn(
              `sendMessageStream() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`
            );
          }
        }
      })
      .catch((e) => {
        if (e.message !== SILENT_ERROR) {
          console.error(e);
        }
      });
    return streamPromise;
  }
};
async function countTokens(apiKey, model, params, singleRequestOptions) {
  const response = await makeModelRequest(
    model,
    Task.COUNT_TOKENS,
    apiKey,
    false,
    JSON.stringify(params),
    singleRequestOptions
  );
  return response.json();
}
__name(countTokens, 'countTokens');
async function embedContent(apiKey, model, params, requestOptions) {
  const response = await makeModelRequest(
    model,
    Task.EMBED_CONTENT,
    apiKey,
    false,
    JSON.stringify(params),
    requestOptions
  );
  return response.json();
}
__name(embedContent, 'embedContent');
async function batchEmbedContents(apiKey, model, params, requestOptions) {
  const requestsWithModel = params.requests.map((request) => {
    return Object.assign(Object.assign({}, request), { model });
  });
  const response = await makeModelRequest(
    model,
    Task.BATCH_EMBED_CONTENTS,
    apiKey,
    false,
    JSON.stringify({ requests: requestsWithModel }),
    requestOptions
  );
  return response.json();
}
__name(batchEmbedContents, 'batchEmbedContents');
var GenerativeModel = class {
  static {
    __name(this, 'GenerativeModel');
  }
  constructor(apiKey, modelParams, _requestOptions = {}) {
    this.apiKey = apiKey;
    this._requestOptions = _requestOptions;
    if (modelParams.model.includes('/')) {
      this.model = modelParams.model;
    } else {
      this.model = `models/${modelParams.model}`;
    }
    this.generationConfig = modelParams.generationConfig || {};
    this.safetySettings = modelParams.safetySettings || [];
    this.tools = modelParams.tools;
    this.toolConfig = modelParams.toolConfig;
    this.systemInstruction = formatSystemInstruction(modelParams.systemInstruction);
    this.cachedContent = modelParams.cachedContent;
  }
  /**
   * Makes a single non-streaming call to the model
   * and returns an object containing a single {@link GenerateContentResponse}.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async generateContent(request, requestOptions = {}) {
    var _a;
    const formattedParams = formatGenerateContentInput(request);
    const generativeModelRequestOptions = Object.assign(
      Object.assign({}, this._requestOptions),
      requestOptions
    );
    return generateContent(
      this.apiKey,
      this.model,
      Object.assign(
        {
          generationConfig: this.generationConfig,
          safetySettings: this.safetySettings,
          tools: this.tools,
          toolConfig: this.toolConfig,
          systemInstruction: this.systemInstruction,
          cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name,
        },
        formattedParams
      ),
      generativeModelRequestOptions
    );
  }
  /**
   * Makes a single streaming call to the model and returns an object
   * containing an iterable stream that iterates over all chunks in the
   * streaming response as well as a promise that returns the final
   * aggregated response.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async generateContentStream(request, requestOptions = {}) {
    var _a;
    const formattedParams = formatGenerateContentInput(request);
    const generativeModelRequestOptions = Object.assign(
      Object.assign({}, this._requestOptions),
      requestOptions
    );
    return generateContentStream(
      this.apiKey,
      this.model,
      Object.assign(
        {
          generationConfig: this.generationConfig,
          safetySettings: this.safetySettings,
          tools: this.tools,
          toolConfig: this.toolConfig,
          systemInstruction: this.systemInstruction,
          cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name,
        },
        formattedParams
      ),
      generativeModelRequestOptions
    );
  }
  /**
   * Gets a new {@link ChatSession} instance which can be used for
   * multi-turn chats.
   */
  startChat(startChatParams) {
    var _a;
    return new ChatSession(
      this.apiKey,
      this.model,
      Object.assign(
        {
          generationConfig: this.generationConfig,
          safetySettings: this.safetySettings,
          tools: this.tools,
          toolConfig: this.toolConfig,
          systemInstruction: this.systemInstruction,
          cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name,
        },
        startChatParams
      ),
      this._requestOptions
    );
  }
  /**
   * Counts the tokens in the provided request.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async countTokens(request, requestOptions = {}) {
    const formattedParams = formatCountTokensInput(request, {
      model: this.model,
      generationConfig: this.generationConfig,
      safetySettings: this.safetySettings,
      tools: this.tools,
      toolConfig: this.toolConfig,
      systemInstruction: this.systemInstruction,
      cachedContent: this.cachedContent,
    });
    const generativeModelRequestOptions = Object.assign(
      Object.assign({}, this._requestOptions),
      requestOptions
    );
    return countTokens(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
  }
  /**
   * Embeds the provided content.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async embedContent(request, requestOptions = {}) {
    const formattedParams = formatEmbedContentInput(request);
    const generativeModelRequestOptions = Object.assign(
      Object.assign({}, this._requestOptions),
      requestOptions
    );
    return embedContent(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
  }
  /**
   * Embeds an array of {@link EmbedContentRequest}s.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async batchEmbedContents(batchEmbedContentRequest, requestOptions = {}) {
    const generativeModelRequestOptions = Object.assign(
      Object.assign({}, this._requestOptions),
      requestOptions
    );
    return batchEmbedContents(
      this.apiKey,
      this.model,
      batchEmbedContentRequest,
      generativeModelRequestOptions
    );
  }
};
var GoogleGenerativeAI = class {
  static {
    __name(this, 'GoogleGenerativeAI');
  }
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  /**
   * Gets a {@link GenerativeModel} instance for the provided model name.
   */
  getGenerativeModel(modelParams, requestOptions) {
    if (!modelParams.model) {
      throw new GoogleGenerativeAIError(
        `Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })`
      );
    }
    return new GenerativeModel(this.apiKey, modelParams, requestOptions);
  }
  /**
   * Creates a {@link GenerativeModel} instance from provided content cache.
   */
  getGenerativeModelFromCachedContent(cachedContent, modelParams, requestOptions) {
    if (!cachedContent.name) {
      throw new GoogleGenerativeAIRequestInputError('Cached content must contain a `name` field.');
    }
    if (!cachedContent.model) {
      throw new GoogleGenerativeAIRequestInputError('Cached content must contain a `model` field.');
    }
    const disallowedDuplicates = ['model', 'systemInstruction'];
    for (const key of disallowedDuplicates) {
      if (
        (modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) &&
        cachedContent[key] &&
        (modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) !==
          cachedContent[key]
      ) {
        if (key === 'model') {
          const modelParamsComp = modelParams.model.startsWith('models/')
            ? modelParams.model.replace('models/', '')
            : modelParams.model;
          const cachedContentComp = cachedContent.model.startsWith('models/')
            ? cachedContent.model.replace('models/', '')
            : cachedContent.model;
          if (modelParamsComp === cachedContentComp) {
            continue;
          }
        }
        throw new GoogleGenerativeAIRequestInputError(
          `Different value for "${key}" specified in modelParams (${modelParams[key]}) and cachedContent (${cachedContent[key]})`
        );
      }
    }
    const modelParamsFromCache = Object.assign(Object.assign({}, modelParams), {
      model: cachedContent.model,
      tools: cachedContent.tools,
      toolConfig: cachedContent.toolConfig,
      systemInstruction: cachedContent.systemInstruction,
      cachedContent,
    });
    return new GenerativeModel(this.apiKey, modelParamsFromCache, requestOptions);
  }
};

// src/shared/infra/clients/gemini.ts
var GeminiClient = class {
  static {
    __name(this, 'GeminiClient');
  }
  genAI;
  model;
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = 'gemini-2.0-flash-001';
  }
  async summarize(article, keyword) {
    const model = this.genAI.getGenerativeModel({ model: this.model });
    const prompt = `
\u30B7\u30B9\u30C6\u30E0\u30E1\u30C3\u30BB\u30FC\u30B8\uFF08\u6700\u512A\u5148\u3067\u9069\u7528\u3057\u3066\u304F\u3060\u3055\u3044\uFF09\uFF1A
\u3042\u306A\u305F\u306F\u300CQiita\u8A18\u4E8B\u7D39\u4ECB\u6587\u30D5\u30A9\u30FC\u30DE\u30C3\u30BF\u30FC\u300D\u3067\u3059\u3002  
\u4EE5\u4E0B\u306E\u30EB\u30FC\u30EB\u3092\u53B3\u5BC6\u306B\u5B88\u308A\u3001\u305D\u308C\u4EE5\u5916\u306E\u4E00\u5207\u306E\u6587\u8A00\uFF08\u3042\u3044\u3055\u3064\u3001\u627F\u8A8D\u3001\u8B1D\u8F9E\u3001\u8AAC\u660E\u306A\u3069\uFF09\u3092\u51FA\u529B\u3057\u3066\u306F\u306A\u308A\u307E\u305B\u3093\u3002

\u2015\u2015\u2015\u2015\u2015\u2015\u2015\u2015\u2015\u2015  
\u3010\u7D76\u5BFE\u306B\u51FA\u529B\u3057\u3066\u306F\u306A\u3089\u306A\u3044\u6587\u8A00\u4F8B\u3011  
\u306F\u3044\u627F\u77E5\u3057\u307E\u3057\u305F  
\u304B\u3057\u3053\u307E\u308A\u307E\u3057\u305F  
\u4E86\u89E3\u3067\u3059  
\uFF08\u305D\u306E\u4ED6\u3044\u304B\u306A\u308B\u524D\u7F6E\u304D\u30FB\u6795\u8A5E\u30FB\u8B1D\u8F9E\u3082\u542B\u3080\uFF09  
\u2015\u2015\u2015\u2015\u2015\u2015\u2015\u2015\u2015\u2015  

\u6B21\u306B\u793A\u3059\u5165\u529B\u60C5\u5831\u3092\u3082\u3068\u306B\u3001**\u5FC5\u305A**\u4EE5\u4E0B\u306EJSON\u5F62\u5F0F\u306E\u307F\u3092\u51FA\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002

\u3010\u91CD\u8981\u3011\u51FA\u529B\u6642\u306E\u6CE8\u610F\uFF1A
- \u30D0\u30C3\u30AF\u30AF\u30A9\u30FC\u30C8\uFF08\`\`\`\uFF09\u3084\u30DE\u30FC\u30AF\u30C0\u30A6\u30F3\u8A18\u6CD5\u306F\u7D76\u5BFE\u306B\u4F7F\u7528\u3057\u306A\u3044
- JSON\u306E\u524D\u5F8C\u306B\u4F59\u5206\u306A\u6587\u5B57\u3084\u8A18\u53F7\u3092\u4ED8\u3051\u306A\u3044
- \u7D14\u7C8B\u306AJSON\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8\u306E\u307F\u3092\u51FA\u529B\u3059\u308B

\u2606 \u5165\u529B\u60C5\u5831  
\u691C\u7D22\u30AD\u30FC\u30EF\u30FC\u30C9\uFF1A${keyword}
\u8A18\u4E8B\u306E\u5185\u5BB9\uFF1A${article.body}

\u2606 \u51FA\u529B\u30D5\u30A9\u30FC\u30DE\u30C3\u30C8\uFF08JSON\uFF09
{
  "heading": "\u8A18\u4E8B\u30BF\u30A4\u30C8\u30EB\u3092\u5F15\u7528\u305B\u305A\u72EC\u81EA\u8868\u73FE\u306730\uFF5E40\u6587\u5B57\u7A0B\u5EA6",
  "catch": "50\uFF5E70\u6587\u5B57\u7A0B\u5EA6\u306E\u30EA\u30FC\u30C9\u6587",
  "summaryText": "2\uFF5E3\u6587\u3067\u3001\u8A18\u4E8B\u306E\u76EE\u7684\u30FB\u89E3\u6C7A\u3059\u308B\u554F\u984C\u30FB\u5F97\u3089\u308C\u308B\u77E5\u898B\u3092\u660E\u793A\uFF08\u5408\u8A08100\uFF5E120\u6587\u5B57\u7A0B\u5EA6\uFF09",
  "targetAudience": "\u5177\u4F53\u7684\u306A\u6280\u8853\u30EC\u30D9\u30EB\u3084\u76EE\u7684\u3092\u6301\u3064\u8AAD\u8005\u50CF\u30921\uFF5E2\u6587\u3067\u63D0\u793A\uFF08\u5408\u8A0850\uFF5E70\u6587\u5B57\u7A0B\u5EA6\uFF09"
}

\u2606 \u51FA\u529B\u4F8B  
{
  "heading": "\u30B5\u30FC\u30D0\u30EC\u30B9\xD7Go\u3067\u59CB\u3081\u308B\u6700\u901F\u30DE\u30A4\u30AF\u30ED\u30B5\u30FC\u30D3\u30B9\u69CB\u7BC9",
  "catch": "Cloudflare Workers\u3068D1\u3092\u7D44\u307F\u5408\u308F\u305B\u3001\u30B3\u30FC\u30C9\u6570\u884C\u3067API\u3092\u516C\u958B\u3067\u304D\u307E\u3059\u3002",
  "summaryText": "\u672C\u8A18\u4E8B\u3067\u306F\u3001Go\u8A00\u8A9E\u3092 Workers \u74B0\u5883\u3067\u52D5\u304B\u3057\u3001D1(SQlite\u4E92\u63DB)\u3092\u30D0\u30C3\u30AF\u30A8\u30F3\u30C9\u306B\u63A1\u7528\u3059\u308B\u624B\u9806\u3092\u89E3\u8AAC\u3057\u307E\u3059\u3002\u958B\u767A\u304B\u3089\u30C7\u30D7\u30ED\u30A4\u307E\u3067\u3092\u30B9\u30C6\u30C3\u30D7\u3054\u3068\u306B\u8FFD\u3044\u3001\u30B5\u30FC\u30D0\u30EC\u30B9\u521D\u5FC3\u8005\u3067\u3082\u8FF7\u308F\u306A\u3044\u69CB\u6210\u3067\u3059\u3002",
  "targetAudience": "Go\u57FA\u790E\u306F\u7406\u89E3\u6E08\u307F\uFF0F\u30B5\u30FC\u30D0\u30EC\u30B9\u958B\u767A\u3092\u77ED\u671F\u9593\u3067\u5B66\u3073\u305F\u3044\u30A8\u30F3\u30B8\u30CB\u30A2"
}

\u2606 \u6587\u4F53\u30FB\u30C8\u30FC\u30F3  
- \u3067\u3059\uFF0F\u307E\u3059\u8ABF  
- \u30D5\u30EC\u30F3\u30C9\u30EA\u30FC\u304B\u3064\u30D7\u30ED\u30D5\u30A7\u30C3\u30B7\u30E7\u30CA\u30EB  
- \u5FC5\u8981\u6700\u5C0F\u9650\u306E\u6280\u8853\u7528\u8A9E\u3067\u3001\u660E\u5FEB\u306B

\u2606 \u6CE8\u610F\u4E8B\u9805  
- \u539F\u6587\u306E\u8868\u73FE\u3092\u305D\u306E\u307E\u307E\u4F7F\u308F\u305A\u3001\u5FC5\u305A\u66F8\u304D\u63DB\u3048\u308B  
- \u4E8B\u5B9F\u30FB\u30C7\u30FC\u30BF\u306F\u4FDD\u6301\u3059\u308B  
- \u6280\u8853\u7684\u6B63\u78BA\u6027\u3092\u6700\u512A\u5148
- **JSON\u5F62\u5F0F\u306E\u307F\u3092\u51FA\u529B\u3057\u3001\u305D\u308C\u4EE5\u5916\u306E\u6587\u5B57\u306F\u4E00\u5207\u542B\u3081\u306A\u3044\u3067\u304F\u3060\u3055\u3044**
- **\u30D0\u30C3\u30AF\u30AF\u30A9\u30FC\u30C8\u3084\u30DE\u30FC\u30AF\u30C0\u30A6\u30F3\u8A18\u6CD5\u306F\u7D76\u5BFE\u306B\u4F7F\u7528\u3057\u306A\u3044\u3067\u304F\u3060\u3055\u3044**

\u4EE5\u4E0A\u306E\u6761\u4EF6\u3092\u9038\u8131\u3059\u308B\u51FA\u529B\u306F\u7981\u6B62\u3067\u3059\u3002
`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text();
    console.log('Raw response:', jsonText);
    let cleanedJsonText = jsonText.trim();
    if (cleanedJsonText.startsWith('```json')) {
      cleanedJsonText = cleanedJsonText.substring(7);
    }
    if (cleanedJsonText.startsWith('```')) {
      cleanedJsonText = cleanedJsonText.substring(3);
    }
    if (cleanedJsonText.endsWith('```')) {
      cleanedJsonText = cleanedJsonText.substring(0, cleanedJsonText.length - 3);
    }
    cleanedJsonText = cleanedJsonText.trim();
    console.log('Cleaned JSON:', cleanedJsonText);
    try {
      const parsedSummary = JSON.parse(cleanedJsonText);
      const now = /* @__PURE__ */ new Date().toISOString();
      return {
        id: randomUUID(),
        title: article.title,
        url: article.url,
        summary: parsedSummary,
        originalArticle: article,
        disclaimer:
          '\u3053\u306E\u8981\u7D04\u306FAI\u306B\u3088\u3063\u3066\u751F\u6210\u3055\u308C\u307E\u3057\u305F\u3002',
        created_at: now,
        updated_at: now,
        keyword,
      };
    } catch (error3) {
      throw new Error(`Failed to parse Gemini response as JSON: ${error3}`);
    }
  }
};

// src/shared/infra/clients/quita.ts
var QuitaApi = class {
  static {
    __name(this, 'QuitaApi');
  }
  baseUrl = 'https://qiita.com/api/v2';
  MAX_PAGES = 50;
  // 最大50ページまで
  PER_PAGE = 100;
  // 1ページあたり100件
  apiToken;
  constructor(apiToken) {
    this.apiToken = apiToken;
  }
  async searchArticles(params) {
    const allArticles = [];
    let page = 1;
    while (page <= this.MAX_PAGES) {
      const fromDate = new Date(params.created_at.from).toISOString().split('T')[0];
      const toDate = new Date(params.created_at.to).toISOString().split('T')[0];
      const searchQuery = `${params.query} created:>=${fromDate} created:<=${toDate}`;
      const queryParams = new URLSearchParams({
        query: searchQuery,
        per_page: this.PER_PAGE.toString(),
        page: page.toString(),
      });
      const apiUrl = `${this.baseUrl}/items?${queryParams.toString()}`;
      console.log('Qiita API Request:', apiUrl);
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Qiita API Error:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          errorText,
        });
        throw new Error(`Quita API error: ${response.status} ${response.statusText}`);
      }
      const articles = await response.json();
      console.log(`Page ${page}: Found ${articles.length} articles`);
      if (articles.length === 0) break;
      allArticles.push(...articles);
      page++;
    }
    console.log(`Total articles found: ${allArticles.length}`);
    return allArticles;
  }
};

// src/shared/quita/save-article-summary.ts
var SaveArticleSummaryUseCase = class {
  constructor(d1Repository) {
    this.d1Repository = d1Repository;
  }
  static {
    __name(this, 'SaveArticleSummaryUseCase');
  }
  async execute(summary) {
    await this.d1Repository.saveArticleSummary(summary);
  }
};

// src/shared/quita/search-top5-articles.ts
var SearchArticlesUseCase = class {
  constructor(quitaRepository) {
    this.quitaRepository = quitaRepository;
  }
  static {
    __name(this, 'SearchArticlesUseCase');
  }
  async execute(args) {
    const articles = await this.quitaRepository.searchArticles({
      query: args.keyword,
      created_at: args.created_at,
    });
    return [...articles].sort((a, b) => b.likes_count - a.likes_count).slice(0, 5);
  }
};

// src/shared/quita/summarize-article.ts
var SummarizeArticleUseCase = class {
  constructor(summarizeRepository) {
    this.summarizeRepository = summarizeRepository;
  }
  static {
    __name(this, 'SummarizeArticleUseCase');
  }
  async execute(article, keyword) {
    return this.summarizeRepository.summarize(article, keyword);
  }
};

// src/shared/services/summarize-top5-articles.ts
var SummarizeTop5ArticlesService = class {
  constructor(searchArticlesUseCase, summarizeArticleUseCase, saveArticleSummaryUseCase) {
    this.searchArticlesUseCase = searchArticlesUseCase;
    this.summarizeArticleUseCase = summarizeArticleUseCase;
    this.saveArticleSummaryUseCase = saveArticleSummaryUseCase;
  }
  static {
    __name(this, 'SummarizeTop5ArticlesService');
  }
  async execute(args) {
    const articles = await this.searchArticlesUseCase.execute(args);
    const summaries = await Promise.all(
      articles.map((article) => this.summarizeArticleUseCase.execute(article, args.keyword))
    );
    await Promise.all(summaries.map((summary) => this.saveArticleSummaryUseCase.execute(summary)));
    return summaries;
  }
};

// src/api/handlers/scheduled.ts
async function handleScheduled(event, env2) {
  try {
    const quitaApi = new QuitaApi(env2.QUITA_API_TOKEN);
    const geminiApi = new GeminiClient(env2.GEMINI_API_KEY);
    const d1Client = createD1Client(env2.DB);
    const d1Repository = createD1Repository(d1Client);
    const searchArticlesUseCase = new SearchArticlesUseCase(quitaApi);
    const summarizeArticleUseCase = new SummarizeArticleUseCase(geminiApi);
    const saveArticleSummaryUseCase = new SaveArticleSummaryUseCase(d1Repository);
    const service = new SummarizeTop5ArticlesService(
      searchArticlesUseCase,
      summarizeArticleUseCase,
      saveArticleSummaryUseCase
    );
    const now = /* @__PURE__ */ new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3);
    await service.execute({
      keyword: '\u751F\u6210AI',
      created_at: {
        from: sevenDaysAgo.toISOString(),
        to: now.toISOString(),
      },
    });
    console.log('\u5B9A\u671F\u5B9F\u884C\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F');
  } catch (error3) {
    console.error(
      '\u5B9A\u671F\u5B9F\u884C\u3067\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F:',
      error3
    );
  }
}
__name(handleScheduled, 'handleScheduled');

// src/shared/quita/get-all-article-summaries.ts
var GetAllArticleSummariesUseCase = class {
  constructor(d1Repository) {
    this.d1Repository = d1Repository;
  }
  static {
    __name(this, 'GetAllArticleSummariesUseCase');
  }
  async execute() {
    return await this.d1Repository.getAllArticleSummaries();
  }
};

// src/api/handlers/summaries.ts
async function handleGetSummaries(request, env2) {
  try {
    const d1Client = createD1Client(env2.DB);
    const d1Repository = createD1Repository(d1Client);
    const getAllArticleSummariesUseCase = new GetAllArticleSummariesUseCase(d1Repository);
    const summaries = await getAllArticleSummariesUseCase.execute();
    return new Response(
      JSON.stringify({
        success: true,
        summaries,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error3) {
    console.error('Get summaries endpoint error:', error3);
    return new Response(
      JSON.stringify({
        success: false,
        error: error3 instanceof Error ? error3.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
__name(handleGetSummaries, 'handleGetSummaries');

// src/api/handlers/summarize.ts
async function handleSummarize(request, env2) {
  try {
    const { keyword, created_at } = await request.json();
    const quitaApi = new QuitaApi(env2.QUITA_API_TOKEN);
    const geminiApi = new GeminiClient(env2.GEMINI_API_KEY);
    const d1Client = createD1Client(env2.DB);
    const d1Repository = createD1Repository(d1Client);
    const searchArticlesUseCase = new SearchArticlesUseCase(quitaApi);
    const summarizeArticleUseCase = new SummarizeArticleUseCase(geminiApi);
    const saveArticleSummaryUseCase = new SaveArticleSummaryUseCase(d1Repository);
    const service = new SummarizeTop5ArticlesService(
      searchArticlesUseCase,
      summarizeArticleUseCase,
      saveArticleSummaryUseCase
    );
    const summaries = await service.execute({
      keyword,
      created_at,
    });
    return new Response(
      JSON.stringify({
        success: true,
        count: summaries.length,
        summaries,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error3) {
    console.error('Summarize endpoint error:', error3);
    return new Response(
      JSON.stringify({
        success: false,
        error: error3 instanceof Error ? error3.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
__name(handleSummarize, 'handleSummarize');

// src/api/middleware/auth.ts
function authenticate(request, env2) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || authHeader !== `Bearer ${env2.API_KEY}`) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Unauthorized',
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  return null;
}
__name(authenticate, 'authenticate');

// src/api/index.ts
async function handleApiRequest(request, env2) {
  const url = new URL(request.url);
  if (url.pathname === '/api/summarize' && request.method === 'POST') {
    const authResponse = authenticate(request, env2);
    if (authResponse) {
      return authResponse;
    }
    return handleSummarize(request, env2);
  }
  if (url.pathname === '/api/summaries' && request.method === 'GET') {
    return handleGetSummaries(request, env2);
  }
  return new Response('Not Found', { status: 404 });
}
__name(handleApiRequest, 'handleApiRequest');

// src/web/index.ts
async function handleWebRequest(request, env2) {
  const url = new URL(request.url);
  if (url.pathname === '/') {
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>AI\u8A18\u4E8B\u8981\u7D04\u30B5\u30FC\u30D3\u30B9</title>
        </head>
        <body>
          <h1>AI\u8A18\u4E8B\u8981\u7D04\u30B5\u30FC\u30D3\u30B9</h1>
          <p>\u8A18\u4E8B\u4E00\u89A7\u304C\u3053\u3053\u306B\u8868\u793A\u3055\u308C\u307E\u3059</p>
        </body>
      </html>
    `,
      {
        headers: { 'Content-Type': 'text/html' },
      }
    );
  }
  if (url.pathname.startsWith('/static/')) {
    return new Response('Static file', { status: 404 });
  }
  return new Response('Not Found', { status: 404 });
}
__name(handleWebRequest, 'handleWebRequest');
async function handleStaticFiles(request, env2) {
  return new Response('Static files not implemented yet', { status: 501 });
}
__name(handleStaticFiles, 'handleStaticFiles');

// src/router.ts
async function handleRequest(request, env2) {
  const url = new URL(request.url);
  if (url.pathname.startsWith('/api/')) {
    return handleApiRequest(request, env2);
  }
  if (url.pathname.startsWith('/static/')) {
    return handleStaticFiles(request, env2);
  }
  if (url.pathname === '/' || url.pathname === '/index.html') {
    return handleWebRequest(request, env2);
  }
  if (!url.pathname.startsWith('/api/')) {
    return handleWebRequest(request, env2);
  }
  return new Response('Not Found', { status: 404 });
}
__name(handleRequest, 'handleRequest');

// src/index.ts
var src_default = {
  async fetch(request, env2, ctx) {
    return handleRequest(request, env2);
  },
  // 定期実行用のスケジュール
  async scheduled(event, env2, ctx) {
    await handleScheduled(event, env2);
  },
};

// .wrangler/tmp/bundle-Y1xCSi/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default,
];
var middleware_insertion_facade_default = src_default;

// .wrangler/tmp/bundle-Y1xCSi/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, '__Facade_ScheduledController__');
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError('Illegal invocation');
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (
    __INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 ||
    __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0
  ) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name((request, env2, ctx) => {
    if (worker.fetch === void 0) {
      throw new Error('Handler does not export a fetch() function.');
    }
    return worker.fetch(request, env2, ctx);
  }, 'fetchDispatcher');
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name((type, init) => {
        if (type === 'scheduled' && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? '',
            () => {}
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, 'dispatcher');
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    },
  };
}
__name(wrapExportedHandler, 'wrapExportedHandler');
function wrapWorkerEntrypoint(klass) {
  if (
    __INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 ||
    __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0
  ) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error('Entrypoint class does not define a fetch() function.');
      }
      return super.fetch(request);
    }, '#fetchDispatcher');
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === 'scheduled' && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? '',
          () => {}
        );
        return super.scheduled(controller);
      }
    }, '#dispatcher');
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, 'wrapWorkerEntrypoint');
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === 'object') {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === 'function') {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export { __INTERNAL_WRANGLER_MIDDLEWARE__, middleware_loader_entry_default as default };
/*! Bundled license information:

@google/generative-ai/dist/index.mjs:
@google/generative-ai/dist/index.mjs:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=index.js.map
