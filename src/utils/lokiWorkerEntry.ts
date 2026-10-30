// Runs inside the dedicated worker (see lokiWebWorker.ts).
// Importing nitromelondb's worker module installs its DatabaseBridge on the
// worker global, which then serves the dispatcher's postMessage protocol.
// The default export must stay bound: nitromelondb declares
// "sideEffects": false, so a bare side-effect import would be tree-shaken
// from the worker bundle. The relative path bypasses the package exports
// map, which hides the file.
import lokiWorker from '../../node_modules/nitromelondb/adapters/lokijs/worker/loki.worker.js'

if (!lokiWorker) {
  throw new Error('loki.worker module did not load')
}
