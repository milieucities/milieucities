import React, { Component } from 'react'
import css from './form.scss'
import { without } from 'lodash'

export default class FileAttachmentsWithLabel extends Component {
  constructor(props) {
    super(props)
    this.state = { fileList: this.props.files }
    this.generateDeleteHandler = (file) => this._generateDeleteHandler(file);
    this.handleFileUploadChange = (file) => this._handleFileUploadChange(file);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.files !== nextProps.files) {
      this.setState({ fileList: nextProps.files })
    }
  }

  _generateDeleteHandler(file) {
    return () => {
      const fileList = without(this.state.fileList, file);
      const filesToDelete = this.props.filesToDelete;
      filesToDelete.push(file);

      this.setState({ fileList });
      this.props.handleDelete(filesToDelete)
    }
  }

  _handleFileUploadChange(e) {
    const fileList = [];

    this.props.files.map((file) => {
      fileList.push(file);
      this.setState({ fileList })
    })

    for (let i = 0; i < e.currentTarget.files.length; i++) {
      fileList.push(e.currentTarget.files.item(i));
      this.setState({ fileList })
    }
  }

  render() {
    return(
      <div className={`file-field input-field ${this.props.classes}`}>
        <label htmlFor='dev_site_files'>{this.props.label}</label>
        {
          this.state.fileList.map((file, index) => (
            <div className={css.fileAttachment} key={index}>
            { file.url &&
              <div className={css.wrapper}>
                <a href={file.url}>{file.name}</a>
                <i className={`fa fa-times ${css.action}`} aria-hidden="true" onClick={this.generateDeleteHandler(file)}></i>
              </div>
            }
            {
              !file.url &&
              <div className={css.wrapper}>
                {file.name}
                <i className="fa fa-cloud-upload" aria-hidden="true"></i>
              </div>
            }
            </div>
          ))
        }
        <input
          multiple='multiple'
          type='file'
          name='dev_site[files][]'
          id='dev_site_files'
          accept=".pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={this.handleFileUploadChange}
        />
      </div>
    )
  }
}

