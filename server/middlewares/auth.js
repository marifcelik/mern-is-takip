import jwt from 'jsonwebtoken';

/**
 * yetkilendirme için kullanılacak middleware.  
 * basitçe jwt' nin var olup olmadığını, var ise geçerli olup olmadığını
 * kontrol ediyor
 * @param {String} secret_key 
 * @param {Object} options 
 */
export default function (secret_key, options = { admin: false }) {
    /**
     * @param {Request} req - istek
     * @param {Response} res - cevap
     * @param {Function} next - middleware next fonksyonu
     */
    return async (req, res, next) => {
        try {
            const token = req.cookies.jwt;

            const decode = jwt.verify(token, secret_key);
            if (options.admin && !decode.isAdmin)
                return res.status(403).json({ error: 'its not admin' });

            next();
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                res.clearCookie('jwt');
                res.status(400).json({ message: 'failed', error: err.toString() });
            }
            if (err instanceof jwt.JsonWebTokenError)
                res.status(400).json({ message: 'failed', error: err.toString() })

        }
    }
}