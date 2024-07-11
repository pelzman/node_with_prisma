import { Router } from "express";
import { authRouter } from "./AuthRoute";
import { clientRoute } from "./ClientRoute";

const router:Router = Router()

router.use('/', authRouter)
router.use('/', clientRoute)

export const MainRoutes:Router = router
