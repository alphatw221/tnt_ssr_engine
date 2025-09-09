import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const PortalWrapper = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR + 首次 hydration 階段：輸出一個穩定的佔位符
    return <div data-portal-placeholder />;
  }

  return createPortal(children, document?.body);
};

export default PortalWrapper;