import React, { useEffect } from "react";
import { useState } from "react";
import Login from "./Login";
import { Link } from "react-router-dom";
import Languages from "./Languages.jsx";
import { IoMdNotifications, IoMdClose, IoMdMenu } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { auth } from "./Firebaseconfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Logout from "./Logout.jsx";
import { db } from "./Firsebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  updateDoc,
  doc,
  orderBy,
} from "firebase/firestore";

function Navbar() {
  //   const [authUser, setAuthUser] = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [hasUnread, setHasUnread] = useState(false); // Controls red dot visibility

  useEffect(() => {
    const q = query(collection(db, "notifications"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const sortedNotifications = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => b.timestamp - a.timestamp); // Sort by latest first

      setNotifications(sortedNotifications);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notifications"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotifications(notifList);
      setHasUnread(notifList.some((notif) => !notif.read));
    });

    return () => unsubscribe();
  }, [user]);

  const handleNotificationClick = () => {
    setShowDropdown(!showDropdown);
    if (hasUnread) {
      setHasUnread(false); // Remove red dot when clicked
    }
  };

  const markAsRead = async () => {
    if (!user) return;

    const unreadNotifications = notifications.filter((notif) => !notif.read);
    if (unreadNotifications.length === 0) return;

    await Promise.all(
      unreadNotifications.map(async (notif) => {
        const notifRef = doc(db, "notifications", notif.id);
        await updateDoc(notifRef, { read: true });
      })
    );

    // Update state
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));

    setShowDropdown(false);
  };

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navItems = (
    <>
      <Link to="/">
        <li>
          <a>Home</a>
        </li>
      </Link>
      <Link to="/diseasedetection">
        <li>
          <a>DiseaseDetection</a>
        </li>
      </Link>
      <Link to="/askexpert">
        <li>
          <a>Ask Expert</a>
        </li>
      </Link>
      <Link to="/aboutus">
        <li>
          <a>About Us</a>
        </li>
      </Link>
      <Link to="/help">
        <li>
          <a>FAQ/Help</a>
        </li>
      </Link>
      <Languages />
    </>
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <div
        className={`bg-white max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-700 dark:text-white fixed top-0 left-0 right-0 z-50  ${
          sticky
            ? "sticky-navbar shadow-md bg-slate-300 dark:bg-slate-800  dark:text-white duration-300 transition-all ease-in-out"
            : ""
        }`}
      >
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden text-black dark:text-white"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? (
                  <IoMdClose size={24} className="text-black dark:text-white" />
                ) : (
                  <IoMdMenu size={24} className="text-black dark:text-white" />
                )}
              </div>
              {menuOpen && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-white dark:bg-slate-800 text-black dark:text-white"
                >
                  {navItems}
                </ul>
              )}
            </div>

            <div className="md:bg-[url('/logo.png')] m-0 bg-cover h-[80px] w-[100px] after:hidden text-black dark:text-white"></div>

            <a className="md:text-2xl font-bold cursor-pointer text-[15px] md:w-[300px] w-[2000px] text-black dark:text-white">
              5MinCare.Ai
            </a>
          </div>
          <div className="navbar-end space-x-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>
            <label className="swap swap-rotate text-black dark:text-white">
              <input
                type="checkbox"
                className="theme-controller"
                value="synthwave"
              />
              {/* sun icon */}
              <svg
                className="swap-off fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            <div>
              {user ? (
                <button
                  className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 duration-300 border-2 border-red-800"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    className="bg-black dark:bg-white dark:text-black text-white px-3 py-2 rounded-md dark:hover:bg-gray-300 hover:bg-slate-800 duration-300 border-2 border-slate-600"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Login
                  </button>
                  <Login />
                </>
              )}
            </div>
            <div style={{ position: "relative" }}>
              {user && (
                <button
                  onClick={handleNotificationClick}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "20px",
                    position: "relative",
                  }}
                >
                  <span className="flex flex-row">
                    {showDropdown ? (
                      <IoMdClose
                        size={30}
                        className="text-black dark:text-white hover:text-gray-400 dark:hover:text-gray-400"
                      />
                    ) : (
                      <>
                        <IoMdNotifications
                          size={30}
                          className="text-black dark:text-white hover:text-gray-400 dark:hover:text-gray-400"
                        />
                        {hasUnread && (
                          <sup>
                            <GoDotFill className="text-red-600" />
                          </sup>
                        )}
                      </>
                    )}
                  </span>
                </button>
              )}

              {showDropdown && (
                <div
                  className="bg-white dark:bg-black border-2 overflow-y-auto max-h-96"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "40px",
                    borderRadius: "5px",
                    padding: "10px",
                    width: "300px",
                  }}
                >
                  <h4 className="text-black dark:text-white font-semibold">
                    Notifications
                  </h4>
                  <ul className="p-0 list-none">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <li
                          key={notif.id}
                          className="border-b border-gray-300 py-2"
                        >
                          <strong className="text-black dark:text-white">
                            📢 {notif.message}
                          </strong>
                          <br />
                          {notif.location && (
                            <small className="text-gray-400 dark:text-gray-400">
                              📍 {notif.location}
                            </small>
                          )}
                          <small className="text-gray-400 dark:text-gray-400 block">
                            {notif.timestamp?.seconds
                              ? new Date(
                                  notif.timestamp.seconds * 1000
                                ).toLocaleString()
                              : "Loading..."}
                          </small>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 dark:text-gray-400">
                        No notifications
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
