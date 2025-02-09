import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { AuthRequest } from '../middlewares/auth';

class AuthController {
    async signup(req: Request, res: Response) {
        try {
            const user = await AuthService.signup(req.body);
            res.status(201).json(user);
        } catch (error: unknown) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const token = await AuthService.login(req.body);
            res.status(200).json({ token });
        } catch (error: unknown) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async googleAuthCallback(req: AuthRequest, res: Response) {
        try {
            const token = await AuthService.googleAuthCallback(req.user);
            res.status(200).json({ token });
        } catch (error: unknown) {
            res.status(400).json({ error: (error as Error).message });
        }
    }
}

export default new AuthController();
