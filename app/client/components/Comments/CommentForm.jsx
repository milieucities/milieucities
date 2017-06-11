import React, { Component } from 'react'
import css from './comments.scss'
import i18n from './locale'

export default class CommentForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = (e) => this.setState({ body: e.target.value });
    this.submitForm = (e) => this._submitForm(e);
  }

  _submitForm(e) {
    e.preventDefault();
    const commentBody = this.state.body;
    const parentId = this.props.parentId;
    this.setState({ body: '' });
    this.props.saveComment(parentId, commentBody);

    if (this.props.toggleCommentForm) {
      this.props.toggleCommentForm();
    }
  }

  render() {
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);

    return(
      <form id='new_comment' onSubmit={this.submitForm}>
        <input name='utf8' type='hidden' value='✓' />
        <div className={css.wrapper}>
          <textarea className={css.textarea}
                    value={this.state.body}
                    onChange={this.handleChange}
                    placeholder={i18n.whatDoYouThink}>
          </textarea>
          <input type='submit' value={i18n.comment} className={css.submit}/>
        </div>
      </form>
    )
  }
}
