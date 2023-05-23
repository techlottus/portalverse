//@ts-ignore
import edjsParser from "editorjs-parser";

const parser = new edjsParser();

const parseEditorRawData = (rawData: string) => {
  try {
    const output = JSON.parse(rawData);
    const markup = parser?.parse(output);
    return markup;
  } catch {
    return null;
  }
};

export default parseEditorRawData;
