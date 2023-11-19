
import { registerHandle } from "@hyperoracle/zkgraph-lib"
import { zkmain_ethereum, asmain_ethereum } from "@hyperoracle/zkgraph-lib"
import { handleBlocks } from "./mapping"

declare function __call_as_start(): void;

export function zkmain(): void {
  __call_as_start();
  registerHandle(handleBlocks)
  return zkmain_ethereum()
}

export function asmain(): Uint8Array {
  __call_as_start();
  registerHandle(handleBlocks)
  return asmain_ethereum()
}
function abort(a: usize, b: usize, c: u32, d: u32): void {}
