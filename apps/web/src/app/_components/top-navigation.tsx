import { CodeIcon } from "lucide-react";
import Link from "next/link";

export function TopNavigation() {
  return (
    <nav className="flex w-full flex-col border-b">
      <div className="flex h-16 w-full items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <CodeIcon />
            <span className="text-lg font-semibold text-purple-300">
              Code Blocks
            </span>
          </Link>
        </div>

        {/* <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/"
              className="text-purple-200 transition-colors duration-200 hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/snippets"
              className="text-purple-200 transition-colors duration-200 hover:text-foreground"
            >
              Snippets
            </Link>
            <Link
              href="/categories"
              className="text-purple-200 transition-colors duration-200 hover:text-foreground"
            >
              Categories
            </Link>
            <Link
              href="/search"
              className="text-purple-200 transition-colors duration-200 hover:text-foreground"
            >
              Search
            </Link>
          </div> */}

        {/* <div className="hidden items-center space-x-4 md:flex">
            <button className="text-purple-200 transition-colors duration-200 hover:text-foreground">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-foreground transition-all duration-200 hover:from-purple-600 hover:to-pink-600">
              New Snippet
            </button>
          </div> */}

        {/* <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-purple-200 transition-colors duration-200 hover:text-foreground"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div> */}
      </div>

      {/* {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 border-t border-white/10 px-2 pt-2 pb-3 sm:px-3">
              <Link
                href="/"
                className="block px-3 py-2 text-purple-200 transition-colors duration-200 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/snippets"
                className="block px-3 py-2 text-purple-200 transition-colors duration-200 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Snippets
              </Link>
              <Link
                href="/categories"
                className="block px-3 py-2 text-purple-200 transition-colors duration-200 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/search"
                className="block px-3 py-2 text-purple-200 transition-colors duration-200 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
              <div className="pt-4">
                <button className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-foreground transition-all duration-200 hover:from-purple-600 hover:to-pink-600">
                  New Snippet
                </button>
              </div>
            </div>
          </div>
        )} */}
    </nav>
  );
}
