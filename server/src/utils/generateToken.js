import jwt from 'jsonwebtoken'

export const generateToken = (uuid) => {
    const token = jwt.sign(
        {
            user: {
                uuid,
            },
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',
        }
    )

    return token
}
