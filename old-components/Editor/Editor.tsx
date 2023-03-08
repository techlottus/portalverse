import React from "react";
import type EditorJS from "@editorjs/editorjs";
import type { EditorConfig, API } from "@editorjs/editorjs";
import { env } from "process";

const Table = require('@editorjs/table')
const List = require('@editorjs/list')
const Link = require('@editorjs/link')
const Header = require('@editorjs/header')
const Quote = require('@editorjs/quote')
const Delimiter = require('@editorjs/delimiter')
const Warning = require('@editorjs/warning');
const Image = require('@editorjs/image');
const Checklist = require('@editorjs/checklist');


interface IEditor extends Omit<EditorConfig, "data" | "holder" | "onChange"> {
  holder: string;
  value: EditorConfig["data"];
  defaultBlock?: string;
  handleContent?: (content: EditorConfig["data"]) => void;
  onBlur?: () => void;
}
const Editor: React.FC<IEditor> = (props) => {
  const {
    holder,
    value = '',
    minHeight = 50,
    defaultBlock = "paragraph",
    handleContent,
    onBlur,
    readOnly,
    ...restProps
  } = props;
  const editorJs = React.useRef<EditorJS | null>(null);
  const strapiUrl = env.NEXT_PUBLIC_STRAPI_URL
  
  const data =  JSON.parse((value as string).replaceAll(':"/uploads',`:"${strapiUrl}/uploads`)) 

  // This will run only once
  React.useEffect(() => {
    if(!editorJs?.current) {
      initEditor(editorJs);
    }
    return () => {
      if(editorJs?.current) {
        editorJs?.current?.destroy();
      }
    }
  }, []);

  /**
   * Handle readOnly to change to that mode on the fly
   */
  React.useEffect(() => {
      editorJs?.current?.readOnly?.toggle();
  }, [readOnly]);

  const initEditor = async (editorRef: React.MutableRefObject<EditorJS | null>) => {
    const { default: EditorJS } = await import("@editorjs/editorjs");
    const editor = new EditorJS({
      tools: {
        table: Table,
        list: List,
        linkTool: Link,
        header: Header,
        quote: Quote,
        delimiter: Delimiter,
        warning: Warning,
        checklist: Checklist,
        image: Image
      },
      holder: holder,
      minHeight,
      data,
      defaultBlock,
      onReady: () => {
        editorRef.current = editor;
        window?.dispatchEvent(new Event("resize"));
      },
      onChange: async (api: API) => {
        // Handling data
        if(!handleContent) {
          return;
        }
        // Retrieve data
        const content = await api.saver.save();
        handleContent(content);
      },
      readOnly,
      i18n: {
        messages: {
          ui: {
            blockTunes: {
              toggler: {
                "Click to tune": "Opciones",
              }
            },
            toolbar: {
              toolbox: {
                "Add": "Agrega un elemento"
              }
            }
          },
          blockTunes: {
            "delete": {
              "Delete": "Eliminar"
            },
            "moveUp": {
              "Move up": "Mover Arriba"
            },
            "moveDown": {
              "Move down": "Mover Abajo"
            }
          },
          toolNames: {
            "Text": "Texto",
            "Bold": "Negritas",
            "Italic": "Italicas",
            "Link": "Enlace",
          }
        }
      },
      ...restProps,
    })
  }
  return <div id={holder} onBlur={onBlur} />;
};

export default Editor;