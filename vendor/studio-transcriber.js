import { env, pipeline } from './transformers.min.js';

// Hrvatski Kanal Studio transcriber module.
// Runtime i WASM su lokalno u repozitoriju; samo model se preuzima u browser cache.
env.allowLocalModels = false;
env.allowRemoteModels = true;
env.useBrowserCache = true;
env.backends.onnx = env.backends.onnx || {};
env.backends.onnx.wasm = env.backends.onnx.wasm || {};
env.backends.onnx.wasm.wasmPaths = new URL('./', import.meta.url).href;

let whisperPromise = null;

export function createWhisperTranscriber(options = {}) {
  if (!whisperPromise) {
    whisperPromise = pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny', {
      device: 'wasm',
      dtype: 'q8',
      ...options,
    }).catch((error) => {
      whisperPromise = null;
      throw error;
    });
  }
  return whisperPromise;
}

export function resetWhisperTranscriber() {
  whisperPromise = null;
}
