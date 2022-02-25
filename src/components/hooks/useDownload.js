import axios from "axios";

const MIME_TYPE_MAP = {
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    ".docx",
  "text/csv": ".csv",
};
const downloadFile = (data, mimeType, fileName) => {
  // const blob = new Blob([data], {
  //   type: mimeType,
  // });
  const blobUrl = URL.createObjectURL(data);
  const link = Object.assign(document.createElement("a"), {
    href: blobUrl,
    style: { display: "none" },
    download: fileName,
  });
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(blobUrl);
};
export const useDownload = () => {
  const fileDownloadHandler = (filePath, fileName) => {
    const fetchFile = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://localhost:1337/${filePath}`,
          responseType: "blob",
        });
        downloadFile(
          response.data,
          response.data.type,
          fileName + "-" + Date.now() + MIME_TYPE_MAP[response.data.type]
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchFile();
  };
  return { fileDownloadHandler };
};
