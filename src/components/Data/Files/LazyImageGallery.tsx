import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/build/image-gallery.css'

// lazy boundary: react-image-gallery (and its css) only loads when the
// lightbox is actually opened - it must not ride along with every form
export default ImageGallery
