import React, { Component } from 'react'
import _ from 'lodash'
import Comment from './Comment'
import CommentForm from './CommentForm'
import { List } from 'immutable'
import { RIETextArea } from 'riek'
import css from './comments.scss'
import i18n from './locale'

export default class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = { page: 0, limit: 5, total: this.props.total }
    this.currentUserId = document.body.dataset.userId;
    this.loadComments = () => this._loadComments();
    this.hasMoreComments = () => this._hasMoreComments();
    this.appendMoreComments = () => this._appendMoreComments();
    this.openModal = () => this._openModal();
    this.editComment = (c,b) => this._editComment(c,b);
  }

  componentDidMount() {
    $('.modal-trigger').leanModal();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.devSiteId !== this.props.devSiteId) {
      this.setState({ page: 0, children: List()},
        () => this.loadComments()
      )
    }
  }

  _openModal() {
    document.querySelector('#sign-in-modal .modal-content').focus();
  }

  _loadComments() {
    console.log('LOADING OCMMETS FROM COMMENTS')
    $.getJSON(`/dev_sites/${this.props.devSiteId}/comments`,
      { page: this.state.page, limit: this.state.limit },
      comments => this.setState({ children: comments })
    );
  }

  _hasMoreComments() {
    const { page, total, limit } = this.state;
    return ( (page + 1) * limit < total );
  }

  _appendMoreComments() {
    this.setState({ page: this.state.page + 1 },
      () => {
        $.getJSON(`/dev_sites/${this.props.devSiteId}/comments`,
          { page: this.state.page, limit: this.state.limit },
          comments => this.setState({ children: this.state.comments.push(...comments), total: comments[0].total })
        );
      }
    );
  }

  _editComment(comment, body) {
    const devSiteId = this.props.devSiteId

    $.ajax({
      url: `/dev_sites/${devSiteId}/comments/${comment.id}`,
      dataType: 'JSON',
      data: { comment: { body }},
      type: 'PATCH',
      success: () => {
        this.loadComments();
      },
      error: error => {
        window.flash('alert', error.responseText)
      }
    });
  }

  render() {
    const { locale } = document.body.dataset;
    const children = this.props.children;
    i18n.setLanguage(locale);

    return <div className={css.container}>

      {children && children.map(comment =>
        <Comment
          comment={comment}
          key={comment.id}
          parent={this}
          editComment={this.editComment}
          saveComment={this.props.saveComment}
          deleteComment={this.props.deleteComment}
          handleDeleteRootComment={this.props.handleDeleteRootComment}
          handleDeleteChildComment={this.props.handleDeleteChildComment}
          devSiteId={this.props.devSiteId}
        />)
      }
      {
        this.hasMoreComments() &&
        <a onClick={this.appendMoreComments} className={css.loadmore}>{i18n.loadMore}</a>
      }
    </div>;
  }
}
