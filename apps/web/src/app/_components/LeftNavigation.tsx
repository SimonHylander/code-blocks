"use client";

import Link from "next/link";
import { useState } from "react";

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  count?: number;
}

const categories: NavigationItem[] = [
  {
    id: "javascript",
    label: "JavaScript",
    href: "/categories/javascript",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.26-.66.39.196.636.495.731.839.731-.438 1.26-.438 1.26-.438.195-.195.195-.585 0-.78-.195-.195-.585-.195-.78 0l-1.26 1.26c-.195.195-.195.585 0 .78.195.195.585.195.78 0l.585-.585c.195-.195.585-.195.78 0 .195.195.195.585 0 .78l-.585.585c-.195.195-.195.585 0 .78.195.195.585.195.78 0l1.26-1.26c.195-.195.585-.195.78 0 .195.195.195.585 0 .78z" />
      </svg>
    ),
    count: 24,
  },
  {
    id: "typescript",
    label: "TypeScript",
    href: "/categories/typescript",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
      </svg>
    ),
    count: 18,
  },
  {
    id: "react",
    label: "React",
    href: "/categories/react",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-5.247 2.61-2.14-1.65-3.901-2.61-5.247-2.61C2.775 3.314 0 5.89 0 9.624c0 4.558 4.568 8.317 10.035 12.436.296.229.598.451.897.66.299-.209.601-.431.897-.66C17.432 17.94 22 14.182 22 9.624c0-3.735-2.775-6.31-6.122-6.31z" />
      </svg>
    ),
    count: 32,
  },
  {
    id: "python",
    label: "Python",
    href: "/categories/python",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0 4c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z" />
      </svg>
    ),
    count: 15,
  },
  {
    id: "css",
    label: "CSS",
    href: "/categories/css",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11h-3.248l.33 4.171L12 19.351l5.379-1.443L18.31 2.25H3.531l.469 5.5z" />
      </svg>
    ),
    count: 28,
  },
];

const recentSnippets: NavigationItem[] = [
  {
    id: "auth-hook",
    label: "useAuth Hook",
    href: "/snippets/auth-hook",
    icon: (
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
          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
        />
      </svg>
    ),
  },
  {
    id: "api-client",
    label: "API Client",
    href: "/snippets/api-client",
    icon: (
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
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "form-validation",
    label: "Form Validation",
    href: "/snippets/form-validation",
    icon: (
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
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export function LeftNavigation() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`hidden h-full border-r border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 md:block ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex h-full flex-col">
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:text-foreground border-b border-white/10 p-4 text-purple-200 transition-colors duration-200"
        >
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Categories Section */}
          <div className="p-4">
            <div
              className={`mb-4 flex items-center ${isCollapsed ? "justify-center" : ""}`}
            >
              <h3
                className={`text-sm font-semibold tracking-wider text-purple-300 uppercase ${
                  isCollapsed ? "hidden" : ""
                }`}
              >
                Categories
              </h3>
            </div>
            <nav className="space-y-1">
              {categories.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`hover:text-foreground flex items-center rounded-md px-3 py-2 text-sm font-medium text-purple-200 transition-colors duration-200 hover:bg-white/10 ${
                    isCollapsed ? "justify-center" : "justify-between"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{item.icon}</span>
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>
                  {!isCollapsed && item.count && (
                    <span className="rounded-full bg-purple-500/20 px-2 py-1 text-xs text-purple-200">
                      {item.count}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Recent Snippets Section */}
          <div className="border-t border-white/10 p-4">
            <div
              className={`mb-4 flex items-center ${isCollapsed ? "justify-center" : ""}`}
            >
              <h3
                className={`text-sm font-semibold tracking-wider text-purple-300 uppercase ${
                  isCollapsed ? "hidden" : ""
                }`}
              >
                Recent
              </h3>
            </div>
            <nav className="space-y-1">
              {recentSnippets.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`hover:text-foreground flex items-center rounded-md px-3 py-2 text-sm font-medium text-purple-200 transition-colors duration-200 hover:bg-white/10 ${
                    isCollapsed ? "justify-center" : ""
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-white/10 p-4">
          <button
            className={`text-foreground w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-2 transition-all duration-200 hover:from-purple-600 hover:to-pink-600 ${
              isCollapsed ? "text-xs" : "text-sm"
            }`}
          >
            {isCollapsed ? "+" : "New Snippet"}
          </button>
        </div>
      </div>
    </aside>
  );
}
