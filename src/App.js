import React, { useState, useEffect } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlocks from "grapesjs-blocks-basic";
import gjsForms from "grapesjs-plugin-forms";
import "./styles/main.scss";
function App() {
  const [editor, setEditor] = useState(null);
  useEffect(() => {
    const editor = grapesjs.init({
      container: "#editor",
      plugins: [gjsPresetWebpage, gjsBlocks, gjsForms],
      pluginsOpts: {
        gjsPresetWebpage: {},
        gjsBlocks: {},
        gjsForms: {},
      },
      storageManager: {
        type: "local",
        autosave: false,
        autoload: false,
        options: {
          local: {},
        },
      },
    });

    // Add custom panel with buttons
    editor.Panels.addPanel({ id: "devices-c" })
      .get("buttons")
      .add([
        {
          id: "set-device-desktop",
          command: function (e) {
            return e.setDevice("Desktop");
          },
          className: "fa fa-desktop",
          active: 1,
        },
        {
          id: "set-device-tablet",
          command: function (e) {
            return e.setDevice("Tablet");
          },
          className: "fa fa-tablet",
        },
        {
          id: "set-device-mobile",
          command: function (e) {
            return e.setDevice("Mobile portrait");
          },
          className: "fa fa-mobile",
        },
        {
          id: "block-editor",
          command: function (e) {
            saveChanges(editor);
            alert("Saved Successfully! ");
          },
          className: "fa fa-save",
        },
      ]);

    // Load template data from local storage
    let templateData = JSON.parse(localStorage.getItem("gjsProject"));
    if (templateData) {
      editor.setComponents(templateData.components);
      editor.setStyle(templateData.styles);
    }
    setEditor(editor);
  }, []);

  // Save changes to local storage
  const saveChanges = (editor) => {
    let components = editor.getComponents();
    let style = editor.getStyle();
    let templateData = {
      components: components,
      style: style,
    };
    localStorage.setItem("gjsProject", JSON.stringify(templateData));
  };

  return (
    <div className="App">
      <div>
        <h1>
          <b>
            <i>Freedy Go WebSite Builder</i>
          </b>
        </h1>
      </div>
      <div id="editor">WebSite Builder</div>
    </div>
  );
}

export default App;
