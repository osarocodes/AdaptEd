export default function SubjectAvatar({ initial, color, size = "md" }) {
  const sizes = {
    sm: "w-9 h-9 text-xs",
    md: "w-10 h-10 text-sm",
  };
  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
      style={{ backgroundColor: color }}
    >
      {initial}
    </div>
  );
}
