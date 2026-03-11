import { changeAvatar } from '../services/usersServices.js';

import { resizeImg } from '../services/imgServices.js';

export async function updateAvatar(req, res, next) {
    try {
        if (req.file) {
            const avatar = await resizeImg(req.file);
            const user = await changeAvatar(req.user.id, avatar);
            return res.status(200).json({
                avatarURL: user.avatarURL,
            });
        }
        return res.status(401).json({
            message: 'Not authorized',
        });
    } catch (error) {
        next(error);
    }
}
