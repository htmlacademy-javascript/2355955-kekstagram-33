import './pictures.js';
import './image-upload.js';
import { getData, } from './api.js';
import { showDownloadDataErrorMessage } from './utils.js';
import { renderPhotosList } from './pictures.js';
getData()
  .then((data) => renderPhotosList(data))
  .catch(() => showDownloadDataErrorMessage());
