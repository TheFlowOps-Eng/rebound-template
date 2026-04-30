import type { CSSProperties } from "react";

export function Input({
  label,
  placeholder = "Placeholder",
  type = "text",
  multiline = false,
  style,
  onCream = true,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  style?: CSSProperties;
  onCream?: boolean;
}) {
  const labelColor = onCream ? "var(--clove)" : "var(--bone)";
  const borderColor = onCream ? "var(--ink)" : "var(--bone)";
  const textColor = onCream ? "var(--espresso)" : "var(--bone)";
  const inputStyle: CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: 16,
    padding: 12,
    border: `1px solid ${borderColor}`,
    background: "transparent",
    color: textColor,
    borderRadius: 0,
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, ...style }}>
      <label
        style={{
          fontFamily: "var(--font-label)",
          fontWeight: 700,
          fontSize: 16,
          color: labelColor,
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          placeholder={placeholder}
          style={{ ...inputStyle, height: 180, resize: "none" }}
        />
      ) : (
        <input type={type} placeholder={placeholder} style={{ ...inputStyle, height: 48 }} />
      )}
    </div>
  );
}
