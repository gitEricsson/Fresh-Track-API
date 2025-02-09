import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import User, { UserDocument } from '../models/user.model';
import AppConfig from './app.config';

passport.use(
    new GoogleStrategy(
        {
            clientID: AppConfig.google.clientID!,
            clientSecret: AppConfig.google.clientSecret!,
            callbackURL: '/api/auth/google/callback',
        },
        async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: UserDocument | false) => void) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        email: profile.emails?.[0].value,
                        name: profile.displayName,
                    });
                }

                done(null, user);
            } catch (err) {
                done(err, false);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});


passport.deserializeUser(async (id: string, done: (error: any, user?: UserDocument | null) => void) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
