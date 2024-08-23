import { Request, Response, Router } from "express";
import Container from "typedi";
import HostelController from "../controllers/HostelController";
import validateAuth from "../middleware/verifyAuth";

const router = Router()

const hostelController = Container.get(HostelController)

router.post("/", validateAuth ,(req: Request, res: Response)=> hostelController.create(req, res))

router.get("/:id", (req: Request, res: Response)=> hostelController.getOne(req, res))

router.get("/by-user/:userId", (req: Request, res: Response)=> hostelController.getHostelsByUser(req, res))

router.get("/", (req: Request, res: Response)=> hostelController.getAll(req, res))

router.patch("/:id", validateAuth ,(req: Request, res: Response)=> hostelController.update(req, res))

router.delete("/:id", validateAuth, (req: Request, res: Response)=> hostelController.delete(req, res))

router.patch("/switch-availability/:id", validateAuth, (req: Request, res: Response)=> hostelController.switchAvailability(req, res))

router.get("/type/recommended", (req: Request, res: Response)=> hostelController.getRecommendedHostels(req, res))

router.get("/type/popular", validateAuth ,(req: Request, res: Response)=> hostelController.getPopularHostel(req, res))

export default router