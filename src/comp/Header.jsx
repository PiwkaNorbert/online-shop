import React from "react";

const Header = () => {
  return (
    <div className="sticky inset-x-0 top-0 z-30 w-full bg-bkg-1 transition-all">
      <div className="mx-auto w-full max-w-screen-xl px-5 md:px-20">
        <div className="flex h-16 items-center justify-between">
          <div></div>
          <div className="flex items-center space-x-6">
            <a
              className="delay-250 rounded-full border border-black bg-black px-5 py-1.5 text-center text-sm font-semibold text-slate-200 transition ease-in-out hover:border-accent-1 hover:text-slate-200 "
              href="/login"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
