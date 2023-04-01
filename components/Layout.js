import Head from "next/head";
import { Poppins } from "@next/font/google";
import { useState, useEffect } from "react";
import { dataContext } from "../store/AuthStore";
import Cookies from "js-cookie";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["devanagari"],
})

function Layout({ children }) 
{
	const [userLogin, setUserLogin] = useState(null),
        [token, setToken]         = useState(""),
        [conversationSelected, setConversationSelected] = useState({
          messages: []
        }),
        [idFriendSelected, setIdFriendSelected] = useState(""),
        [friends, setFriends] = useState([]),
        [loader, setLoader] = useState(false),
        [dataNotification, setDataNotification] = useState({
          status: false
        })

    useEffect(() => 
    {
        if(!token)
        {
            const token = Cookies.get("token")

            if(token)
            {
                setUserLogin(JSON.parse(Cookies.get("user")));
                setToken(token);
            }
        }
    }, [token]);


  const component = (
    <div className={poppins.className} id={"Site"}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {children}
      </main>
    </div>
  );

  return component;
}

export default Layout;


