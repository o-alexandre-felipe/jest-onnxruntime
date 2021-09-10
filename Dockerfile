from node:16.8-slim
WORKDIR /
RUN apt-get update && apt-get -yy -q install git \
  && git clone https://github.com/o-alexandre-felipe/jest-onnxruntime.git
WORKDIR /jest-onnxruntime
RUN npm install

