import express from 'express'

import { login, resetPassword } from '../controllers/Auth.js'

const AdminRoute=express.Router()


AdminRoute.post("/login",login)
AdminRoute.post("/resetpassword",resetPassword)


export default AdminRoute
