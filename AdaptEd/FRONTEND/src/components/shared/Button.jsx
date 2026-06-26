export default function Button({ children, type = "button", variant = "primary", className = "", ...props }) {
  const base = "w-full py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90 active:opacity-80 cursor-pointer";

  const variants = {
    primary: "text-white",
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
  };

  const inlineStyle = variant === "primary" ? { backgroundColor: "var(--color-accent)" } : {};

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      style={inlineStyle}
      {...props}
    >
      {children}
    </button>
  );
}
