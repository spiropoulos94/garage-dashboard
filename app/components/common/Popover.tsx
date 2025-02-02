import React, { useRef, useEffect, useState } from "react";

interface PopoverProps {
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  visible: boolean;
  onClose: () => void;
  className?: string;
  anchorRef: React.RefObject<HTMLElement>;
}

const Popover: React.FC<PopoverProps> = ({
  children,
  position = "bottom",
  visible,
  onClose,
  className,
  anchorRef,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  const [anchorRefHeight, setAnchorRefHeight] = useState(0);
  const [anchorRefWidth, setAnchorRefWidth] = useState(0);

  useEffect(() => {
    if (anchorRef.current) {
      setAnchorRefHeight(anchorRef.current.clientHeight);
      setAnchorRefWidth(anchorRef.current.clientWidth);
    }
  }, [anchorRef]);

  useEffect(() => {
    if (!visible) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        anchorRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visible, onClose, anchorRef]);

  const getPopoverStyle = (position: "top" | "bottom" | "left" | "right"): React.CSSProperties => {
    switch (position) {
      case "top":
        return {
          bottom: `${anchorRefHeight}px`,
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "bottom":
        return {
          top: `100%`,
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "left":
        return {
          top: "50%",
          right: `${anchorRefWidth}px`,
          transform: "translateY(-50%)",
        };
      case "right":
        return {
          top: "50%",
          left: `${anchorRefWidth}px`,
          transform: "translateY(-50%)",
        };
      default:
        return {};
    }
  };

  return (
    <div className={`relative z-50 ${className}`}>
      {visible && (
        <div
          ref={popoverRef}
          className="popover absolute mt-1 w-full rounded bg-white shadow-sm"
          style={getPopoverStyle(position)}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;
