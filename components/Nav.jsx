"use client";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
// import logo from "../public/assets/images/logo.svg";
import { useEffect, useState } from "react";

const Nav = () => {
  // const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null);

  const [toggleDropdown, settoggleDropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setProviders();
  }, []);

  return (
    <nav className=" flex justify-between w-full mb-16 pt-3">
      <Link href="/" className=" flex gap-2 justify-center">
        <Image
          src="/assets/images/logo.svg"
          alt="PriorityLives Logo"
          width={30}
          height={30}
          className=" object-contain"
        />
        <p className=" logo_text">PriorityLives</p>
      </Link>
      {/* { Desktop Navigation} */}
      <div className=" sm:flex hidden">
        {isUserLoggedIn ? (
          <div className=" flex gap-3 md:gap-5">
            <Link href="/create-prompt" className=" black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline-btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                width={30}
                height={30}
                className=" rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className=" black-btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      <div className=" sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className=" flex">
            <Image
              src="/assets/images/logo.svg"
              width={30}
              height={30}
              className=" rounded-full"
              alt="profile"
              onClick={() => settoggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className=" dropdown">
                <Link
                  href="/profile"
                  className=" dropdown_link"
                  onClick={() => settoggleDropdown(false)}
                >
                  My Proflie
                </Link>
                <Link
                  href="/create"
                  className=" dropdown_link"
                  onClick={() => settoggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    settoggleDropdown(false);
                    signOut();
                  }}
                  className=" black-btn mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className=" black-btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
