import multer from 'multer';

const storage = multer.memoryStorage();

// 🔁 Shared image file filter function
const imageFileFilter = (expectedFieldName) => {
  return (req, file, cb) => {
    if (file.fieldname !== expectedFieldName) {
      return cb(new Error(`Unexpected field - use "${expectedFieldName}"`));
    }
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  };
};

// 📸 Profile photo upload (for signup)
export const uploadProfilePhoto = multer({
  storage,
  fileFilter: imageFileFilter('profilePhoto'),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).single('profilePhoto');

// 📄 Resume upload (PDFs only)
export const uploadResume = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed for resumes'));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}).single('resume');

// 🖼️ Generic image upload (e.g. for company logos, etc.)
export const uploadImage = multer({
  storage,
  fileFilter: imageFileFilter('image'),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).single('image');
