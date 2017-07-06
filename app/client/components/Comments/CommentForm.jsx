import React, { Component } from 'react'
import css from './comments.scss'
import i18n from './locale'

export default class CommentForm extends Component {

  constructor(props) {
    super(props);
    const showPrivacyPolicy = !(JSON.parse(document.body.dataset.userAcceptedPrivacyPolicy));
    this.state = { showPrivacyPolicy };
    this.handleChange = (e) => this.setState({ body: e.target.value });
    this.handleChangePrivacyPolicy = (e) => this._handleChangePrivacyPolicy(e);
    this.submitForm = (e) => this._submitForm(e);
  }

  _submitForm(e) {
    e.preventDefault();
    if (!this.state.acceptedPrivacyPolicy) {
      window.flash('alert', 'You must accept the Privacy Policy in order to comment.')
    } else {
      this.props.handleSave(this.state.body, this.props.parentId, this.state.acceptedPrivacyPolicy);
      this.setState({ body: '', showPrivacyPolicy: false });

      if (this.props.toggleCommentForm) {
        this.props.toggleCommentForm();
      }
    }
  }

  _handleChangePrivacyPolicy(e) {
    this.setState({ acceptedPrivacyPolicy: e.currentTarget.checked })
  }

  render() {
    const { locale, userAcceptedPrivacyPolicy } = document.body.dataset;
    console.log('showPrivacyPolicy', this.state.showPrivacyPolicy)
    i18n.setLanguage(locale);

    return(
      <form id='new_comment' onSubmit={this.submitForm} className={css.commentForm}>
        <input name='utf8' type='hidden' value='✓' />
        <div className={css.wrapper}>
          <textarea
            className={css.textarea}
            value={this.state.body}
            onChange={this.handleChange}
            placeholder={i18n.whatDoYouThink}>
          </textarea>
        </div>
        {
          this.state.showPrivacyPolicy &&
          <div className={css.privacy}>
            <p>{i18n.privacyPolicy}</p>
            <input type="checkbox" id='accept_privacy_policy' onChange={ this.handleChangePrivacyPolicy } />
            <label htmlFor="accept_privacy_policy">{i18n.acceptPrivacyPolicy}</label>
          </div>
        }
        <div className={css.submitBtn}>
          <input type='submit' value={i18n.comment} className={`${css.submit} btn`}/>
        </div>
      </form>
    )
  }
}
