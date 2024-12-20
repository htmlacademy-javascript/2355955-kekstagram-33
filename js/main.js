import './pictures.js';
import './image-upload.js';
import { getData, } from './api.js';
import { showDownloadDataErrorMessage } from './utils.js';
import { showImgFilter } from './filters.js';


import { renderPhotosList } from './pictures.js';
getData()
  .then((data) => {
    renderPhotosList(data);
    showImgFilter();
  })
  .catch(() => showDownloadDataErrorMessage());
