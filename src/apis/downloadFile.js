import streamSaver from "streamsaver";
import { WritableStream } from "web-streams-polyfill/ponyfill";
import { API_URL } from "../config";
import storage from "../utils/storage";

const downloadFile = async (decodedUrl, fileName) => {
  const token = storage.getToken();

  fetch(`${API_URL}file/${decodedUrl}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((response) => {
    if (!window.WritableStream) {
      streamSaver.WritableStream = WritableStream;
      window.WritableStream = WritableStream;
    }

    const fileStream = streamSaver.createWriteStream(fileName);
    const readableStream = response.body;

    // More optimized
    if (readableStream.pipeTo) {
      return readableStream.pipeTo(fileStream);
    }

    window.writer = fileStream.getWriter();

    const reader = readableStream.getReader();
    const pump = () =>
      reader
        .read()
        .then((res) =>
          res.done
            ? window.writer.close()
            : window.writer.write(res.value).then(pump)
        );

    pump();
  });
};

export default downloadFile;
