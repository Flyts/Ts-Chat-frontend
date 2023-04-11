import Head from "next/head";
import { Poppins } from "@next/font/google";
import { useState, useEffect } from "react";
import { dataContext } from "../store/AuthStore";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { initialiseAuthState } from "../store/authStore";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["devanagari"],
})

function Layout({ children }) 
{
  const dispatch = useDispatch()

    useEffect(() => 
    {
      dispatch(initialiseAuthState())
    }, []);


  const component = 
    <div className={poppins.className} id={"Site"}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {children}
      </main>
    </div>

  return component;
}

export default Layout;


