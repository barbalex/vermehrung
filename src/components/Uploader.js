import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

if (typeof window !== 'undefined') {
  window.UPLOADCARE_PUBLIC_KEY = process.env.UPLOADCARE_PUBLIC_KEYUPLOADCARE_LOCALE =
    'de'
  window.UPLOADCARE_TABS =
    'file camera url gdrive gphotos dropbox instagram onedrive'
  window.UPLOADCARE_EFFECTS = 'crop'
  //window.UPLOADCARE_IMAGE_SHRINK = '2056x2056'
  window.UPLOADCARE_IMAGES_ONLY = true
  //window.UPLOADCARE_PREVIEW_STEP = true
}

const uploadcare = require('uploadcare-widget')

class Uploader extends Component {
  componentDidMount() {
    const widget = uploadcare.Widget(this.uploader)
    const { value, onChange, onUploadComplete } = this.props

    if (typeof value !== 'undefined') {
      widget.value(value)
    }
    if (typeof onChange === 'function') {
      widget.onChange(files => {
        if (files) {
          this.files =
            this.files && this.files.files ? this.files.files() : [this.files]
        } else {
          this.files = null
        }

        onChange(files)
      })
    }
    if (typeof onUploadComplete === 'function') {
      widget.onUploadComplete(onUploadComplete)
    }
    widget.onDialogOpen(dialog => (this.dialog = dialog))
  }

  componentWillUnmount() {
    if (this.dialog) {
      this.dialog.reject()
    }
    if (this.files) {
      uploadcare.jQuery.when.apply(null, this.files).cancel()
    }

    const widgetElement = uploadcare
      .jQuery(this.uploader)
      .next('.uploadcare--widget')
    const widget = widgetElement.data('uploadcareWidget')

    if (widget && widget.inputElement === this.uploader) {
      widgetElement.remove()
    }
  }

  getInputAttributes() {
    const attributes = Object.assign({}, this.props)

    delete attributes.value
    delete attributes.onChange
    delete attributes.onUploadComplete

    return attributes
  }

  render() {
    const attributes = this.getInputAttributes()

    return (
      <input
        type="hidden"
        ref={input => (this.uploader = input)}
        {...attributes}
      />
    )
  }
}

export default Uploader
