import express from 'express'

import { login, signup } from '../controllers/Auth.js'

const AdminRoute=express.Router()


AdminRoute.post("/signup",signup)
AdminRoute.post("/login",login)


export default AdminRoute
