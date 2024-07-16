"use client"
import Topbar from "../MobileNav/MobileNav"
import Navbar from "../Navbar/Navbar"
import ReduxProvider from "@/helpers/redux/ReduxProvider"

  const Header : React.FC = () => {

  return(
    <>
      <ReduxProvider>
        <header id="header" className="page-header -has-sticky-nav">
          <Topbar />
          <Navbar />
        </header>
      </ReduxProvider>
    </>
  )
}

export default Header

