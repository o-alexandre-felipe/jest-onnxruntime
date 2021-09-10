
describe('Execution inside jest', () => {
  it('Typecheck fails after evaluating model', async () => {
    require('onnxjs')
    require('onnxjs-node')
    const sess = new onnx.InferenceSession({backendHint:'onnxruntime'})
    await sess.loadModel(__dirname + '/double.onnx')
    const x = 1.5
    // Will produce
    // TypeError: A float32 tensor's data must be type of function Float32Array() 
    u = await sess.run([new onnx.Tensor([x], 'float32', [1])])
    // In my case it never reaches here
    expect(u.values().next().value.data[0]).toEqual(2*x)
  })
})