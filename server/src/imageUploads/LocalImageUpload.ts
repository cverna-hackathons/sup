import * as Multer from 'multer';

export const LocalImageUpload = Multer({
  dest: (process.env.IMAGES_STATIC_DIR || '/tmp')
})