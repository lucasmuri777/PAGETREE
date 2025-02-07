import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(), // Armazena o arquivo em memória (não salva no disco)
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const isValid = allowedTypes.test(file.mimetype);

    if (isValid) {
      cb(null, true);
    } else {
      cb(new Error("Formato de arquivo inválido. Apenas PNG, JPG e JPEG são permitidos."));
    }
  },
  limits: { fileSize: 400 * 1024 * 1024 }, 
});
