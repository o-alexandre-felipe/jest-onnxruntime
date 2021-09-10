## JEST/onnxruntime bug

This repository demonstrates a problem I experienced when trying to use `jest` with `onnxjs`.
`onnxjs` is a frame work to evaluate neural network models in the format ONNX, it supports
different backends. `onnxjs-node` enables the use of `onnxruntime` in `onnxjs`.

These libraries use tensors objects, a tensor class is a multidimensional view of a typed array.
The outputs of a neural network are constructed in NAPI as typed arrays
[[1]](https://github.com/microsoft/onnxruntime/blob/e5ee0b435db9007921adeadffe929f247a5d6055/js/node/src/tensor_helper.cc#L257).

Both the native code and javascript code have typed array maps [[2]](https://github.com/microsoft/onnxruntime/blob/e5ee0b435db9007921adeadffe929f247a5d6055/js/node/src/tensor_helper.cc#L55),[[3]](https://github.com/microsoft/onnxruntime/blob/009f342caf425edd1fe00832047d78d536d36402/js/common/lib/tensor-impl.ts#L18), and the javascript code checks if the value 
returned is an array of the expected type[[4]](https://github.com/microsoft/onnxruntime/blob/009f342caf425edd1fe00832047d78d536d36402/js/common/lib/tensor-impl.ts#L108). Normally this works, but if we invoke this from a jest test, that check will evaluate to false,
and finally it will throw an error[[5]](https://github.com/microsoft/onnxruntime/blob/009f342caf425edd1fe00832047d78d536d36402/js/common/lib/tensor-impl.ts#L111).

Similar issues were reported before[[6]](https://github.com/facebook/jest/issues/10786), [[7]](https://github.com/facebook/jest/issues/10854).

## Steps to reproduce

Clone this repository and run `npm install`. The script `run.js` loads and evaluate `double.onnx` it should print `2 * 1.5 = 3`, where the `3` was calculated in the `onnxruntime` code. The script `jest.test.js` is the attempt to do the same in a jest test suite, unfortunately the test fails in that type check, before the (correct) result, is returned.

## Using Docker

For convenience, and to better reproducibility I also prepared a docker file, you should be able to see the described results by running
`docker-compose up --build`. The `OK` service shows the successful run. The `NOK` shows the failing run.

## The underlying ONNX model

The model was generated using `pytorch` in the script `gen-model.py`.

