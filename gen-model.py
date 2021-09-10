import torch
class Double(torch.nn.Module):
  def forward(self, value):
    return 2*value
torch.onnx.export(Double(), (torch.tensor([1.5], dtype=torch.float32),), 'double.onnx')