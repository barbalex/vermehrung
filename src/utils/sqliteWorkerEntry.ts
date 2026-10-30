// Runs inside the wa-sqlite dedicated worker (started by the workerFactory
// in initiateDb.ts). The relative path into node_modules bypasses the
// package exports map (which hides the file) and lets Vite's dev server
// resolve it to the optimized dependency bundle.
//
// No top-level await here: the dispatcher posts its initialize message at
// worker construction, and messages arriving while a module worker is still
// awaiting its top level are dropped.
import * as workerRuntime from '../../node_modules/nitromelondb/adapters/sqlite/sqlite-wasm/workerRuntime.js'

type Runtime = typeof workerRuntime

// the module is CommonJS: in dev the optimized bundle exports it as
// default-only, in the build the named export exists - handle both
const startNitromelonWebWorker =
  workerRuntime.startNitromelonWebWorker ??
  (workerRuntime as unknown as { default?: Runtime }).default
    ?.startNitromelonWebWorker

if (!startNitromelonWebWorker) {
  throw new Error('startNitromelonWebWorker not found on workerRuntime module')
}

startNitromelonWebWorker(
  self as unknown as Parameters<Runtime['startNitromelonWebWorker']>[0],
)
