export default function AuthLayout({ children }) {
  return (
    <div className="h-full md:min-h-screen flex flex-col md:flex-row">
      {/* Left panel */}
      <div
        className="flex flex-col justify-center py-8 px-12 md:py-16 md:w-[45%] flex-shrink-0"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-5 md:mb-12">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <polygon points="18,0 36,18 18,36 0,18" fill="#F5A623" />
          </svg>
          <span className="text-white md:text-3xl font-bold tracking-wide">AdaptEd</span>
        </div>

        <h1 className="text-white text-2xl md:text-4xl xl:text-6xl font-bold leading-tight mb-4">
          Learn smarter.<br />Every single day.
        </h1>
        <p className="text-blue-200 text-sm md:text-lg leading-relaxed max-w-xs">
          Your AI study buddy that knows exactly where you're strong — and what to fix next.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center bg-white px-5 py-10 md:py-12">
        <div className="w-full max-w-sm md:max-w-md xl:max-w-lg">{children}</div>
      </div>
    </div>
  );
}
