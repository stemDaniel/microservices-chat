interface IAuthConfig {
    secret: string;
    expiresIn: string;
}

export default {
    secret: process.env.AUTHENTICATE_SECRET || 'default',
    expiresIn: process.env.AUTHENTICATE_EXPIRES_IN || '1d',
} as IAuthConfig;
