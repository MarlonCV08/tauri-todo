import { getCurrentWindow } from "@tauri-apps/api/window";
import { Maximize, Minimize, Minus, X } from "lucide-react";
import { useEffect, useState } from "react";

export const AppHeader = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    getCurrentWindow().isMaximized().then(setIsMaximized);
  }, []);

  const handleMaximize = async () => {
    await getCurrentWindow().toggleMaximize();
    const maximized = await getCurrentWindow().isMaximized();
    setIsMaximized(maximized);
  };

  const buttonStyle = {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "14px",
    cursor: "pointer",
    padding: "6px 12px",
  };

  return (
    <div
      style={{
        height: "40px",
        background: "#1e1e1e",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        userSelect: "none",
      }}
    >
      {/* Zona draggable */}
      <div
        data-tauri-drag-region
        style={{
          flex: 1,
          paddingLeft: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span>Todo App</span>
      </div>

      {/* Botones */}
      <div style={{ display: "flex" }}>
        {/* Minimizar */}
        <button
          onClick={() => getCurrentWindow().minimize()}
          style={buttonStyle}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <Minus size={16} />
        </button>

        {/* Maximizar / Restaurar */}
        <button
          onClick={handleMaximize}
          style={buttonStyle}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          {isMaximized ? <Minimize size={16} /> : <Maximize size={16} />}
        </button>

        {/* Cerrar */}
        <button
          onClick={() => getCurrentWindow().close()}
          style={buttonStyle}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e81123")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};