require('onnxjs')
require('onnxjs-node')

async function main(){
  const sess = new onnx.InferenceSession({backendHint:'onnxruntime'})
  await sess.loadModel(__dirname + '/double.onnx')
  const x = 1.5
  u = await sess.run([new onnx.Tensor([x], 'float32', [1])])
  console.log(`2 * ${x} = ${u.values().next().value.data[0]}`)
}
main()