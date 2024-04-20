import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import HomeScreen from './screens/HomeScreen.jsx'
import ProductScreen from './screens/ProductScreen.jsx'
import CartScreen from './screens/CartScreen.jsx'
import { Provider } from "react-redux"
import  store  from "./redux/store.js"
import LoginScreen from './screens/LoginScreen.jsx'
import { BrowserRouter } from 'react-router-dom';
import RegisterScreen from './screens/RegisterScreen.jsx' 
import ShippingScreen from './screens/ShippingScreen.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import PaymentScreen from './screens/PaymentScreen.jsx'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen.jsx'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import ProfileScreen from './screens/ProfileScreen.jsx'
import AdminRoute from './components/AdminRoute'
import OrderListScreen from './screens/admin/OrderListScreen.jsx'
import ProductListScreen from './screens/admin/ProductListScreen.jsx'
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx'
import UserListScreen from './screens/admin/UserListScreen.jsx'
import UserEditScreen from './screens/admin/UserEditScreen.jsx'
// import './index.css'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen/>} />
      <Route path="/product/:id" element={<ProductScreen/>} />
      <Route path="/cart" element={<CartScreen/>} />
      <Route path="/login" element={<LoginScreen/>} />
      <Route path='/register' element={<RegisterScreen/>}/>
      <Route path='' element={<PrivateRoute/>}>
      <Route path='/shipping' element={<ShippingScreen/>}/>
      <Route path='/payment' element={<PaymentScreen/>}/>
      <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
      <Route path='/order/:id' element={<OrderScreen/>}/>
      <Route path='/profile' element={<ProfileScreen/>}/>
      </Route>
      <Route path='' element={<AdminRoute/>}>
      <Route path='/admin/orderlist' element={<OrderListScreen/>}/>
      <Route path='/admin/productlist' element={<ProductListScreen/>}/>
      <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
      <Route path='/admin/userlist' element={<UserListScreen/>}/>
      <Route path='/admin/user/:id/edit' element={<UserEditScreen/>}/>
      </Route>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <Provider store={store}>
        <PayPalScriptProvider>
        <RouterProvider router={router} />
        </PayPalScriptProvider>
         {/* <HomeScreen /> */}  
        </Provider>
  </React.StrictMode>,
)
// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// )