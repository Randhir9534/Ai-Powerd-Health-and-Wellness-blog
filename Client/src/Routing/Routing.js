import React from 'react'
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import RegisterPage from '../Components/Auth/Register/Register'
import LoginPage from '../Components/Auth/Login/Login'
import HomePage from '../Components/Content/Home/Home'
import BlogDetailPage from '../Components/Content/BlogDetails/BlogDetails'
import BookmarkPage from '../Components/Content/BookMark/BookMark'
import AboutPage from '../Components/Content/StaticPages/About/About'
import ContactPage from '../Components/Content/StaticPages/Contact/Contact'
import PrivacyPolicyPage from '../Components/Content/StaticPages/PrivacyPolicy/PrivacyPolicy'
import TermsPage from '../Components/Content/StaticPages/Terms/Terms'
import Navbar from '../Components/Content/Layout/Navbar/Navbar'
import Footer from '../Components/Content/Layout/Footer/Footer'
import ProfilePage from '../Components/Auth/Profile/Profile'
import ProtectedRoutes from '../Components/ProtectedRoutes/ProtectedRoutes'
import ReviewPage from '../Components/Content/ReviewPage/Review'
import BlogPage from '../Components/Content/Blog/Blog'
import DietPlanForm from '../Components/Content/DietPlan/DietPlanForm'
import DietPlanResult from '../Components/Content/DietPlan/DietPlanResult/DietPlanResult'

const Routing = () => {
  return (
    <div>
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/blog' element={<BlogPage/>}/>
                <Route element={<ProtectedRoutes/>}>
                <Route path='/blogs/:id' element={<BlogDetailPage/>}/>
                <Route path='/bookmark' element={<BookmarkPage/>}/>
                <Route path='/diet' element={<DietPlanForm/>} />
                <Route path='/view-diet' element={<DietPlanResult/>} />
                </Route>
                {/* ================ static pages ================== */}
                <Route path='/about' element={<AboutPage/>}/>
                <Route path='/contact' element={<ContactPage/>}/>
                <Route path='/privacy-policy' element={<PrivacyPolicyPage/>}/>
                <Route path='/terms' element={<TermsPage/>}/>
                <Route path='/review' element={<ReviewPage/>}/>
            </Routes>
            <Footer/>
        </Router>
    </div>
  )
}

export default Routing