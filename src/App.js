import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ResponsiveAppBar from './components/AppBar/AppBar_test';
import { useEffect, useState } from 'react';
import Wards from './pages/Wards/Wards';
import UserList from './pages/UserList/UserList';
import UserDetailsPage from './pages/UserDetailsPage/UserDetailsPage';
import UserInfoPage from './pages/UserInfoPage/UserInfoPage';
import { MyContext } from './ContextAPI';
import CustomizedSnackbars from './components/CustomSnackBar';
import AddFamilyDetailsPage from './pages/AddFamilyDetailPage/AddFamilyDetailsPage';
import AksOfficeBearers from './pages/Aks_office_bearers/AksOfficeBearers';

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [allUsers, setAllUsers] = useState([])

  const [loggedInUserDetails, setLoggedInUserDetails] = useState([])

  const [flag, setFlag] = useState(false)
  const [message, setMessage] = useState("")
  const [errorType, setErrorType] = useState("")

  // console.log(loggedIn)


  useEffect(() => {


    try {
      (async () => {

        await fetch("https://aks-backend.onrender.com/api/user/fetchallusers", {
          method: 'GET', headers: {
            'Content-type': 'application/json'
          },

        }).then(async (res) => {
          const allUsers = await res.json();
          setAllUsers(allUsers)
        }).catch((error => {
          if (error) {
            localStorage.clear()
            setMessage("Oops!! Our site is facing Downtime. Sorry for any inconvience.Please try after sometime");
            setErrorType("error")
            setFlag(true)
          }

        }))

      })()






    } catch (error) {

      console.log(error)

    }


  }, [])



  return (
    <>
      {
        localStorage.getItem("userId") !== null ?
          <>
            <BrowserRouter>
              <MyContext.Provider value={{ allUsers, loggedInUserDetails, setLoggedInUserDetails, setLoggedIn, loggedIn }}>
                {loggedIn || localStorage.getItem("userId") !== null ? <ResponsiveAppBar /> : <></>}
                {/* <ResponsiveAppBar /> */}
                <CustomizedSnackbars flag={flag} setFlag={setFlag} msg={message} errorType={errorType} />
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/home" element={<Home />} />
                  {/* <Route path="/officebearers" element={<SearchBar />} /> */}
                  <Route path="/officebearers" element={<AksOfficeBearers />} />
                  <Route path="/wards" element={<Wards />} />
                  <Route path="/userlist/:ward_name" element={<UserList />} />
                  <Route path="/userdetail/:user_id" element={<UserDetailsPage />} />
                  <Route path="/userinfopage" element={<UserInfoPage />} />
                  <Route path="/familydetails" element={<AddFamilyDetailsPage />} />

                  <Route path="*" element={<ErrorPage />} />

                </Routes>

              </MyContext.Provider>
            </BrowserRouter>
          </> : <>
            <BrowserRouter>
              <MyContext.Provider value={{ setLoggedInUserDetails, setLoggedIn, loggedIn }}>
                {/* {loggedIn || localStorage.getItem("userId") !== null ? <ResponsiveAppBar /> : <></>} */}
                {/* <ResponsiveAppBar /> */}
                <CustomizedSnackbars flag={flag} setFlag={setFlag} msg={message} errorType={errorType} />
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="*" element={<LoginPage />} />

                </Routes>

              </MyContext.Provider>
            </BrowserRouter>


          </>
      }

    </>

  );
}

export default App;
