import Link from 'next/link';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 hover:opacity-90 transition-opacity ${className}`}>
      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M4 15a6 6 0 0 0 12 0c0-6-6-12-6-12S4 9 4 15z" />
          <path d="M10 15c0 2.761 2.239 5 5 5s5-2.239 5-5c0-5-5-10-5-10S10 10 10 15z" />
        </svg>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold">Sprout Hub</h1>
    </Link>
  );
} 