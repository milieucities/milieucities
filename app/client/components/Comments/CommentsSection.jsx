import React, { Component } from 'react';
import _ from 'lodash'
import Comments from './Comments'
import CommentForm from './CommentForm'
import css from './comments.scss'
import i18n from './locale'

export default class CommentsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.currentUserId = parseInt(document.body.dataset.userId);
    this.fetchComments = () => this._fetchComments();
    this.saveComment = (b, p) => this._saveComment(b, p);
    this.deleteComment = (c) => this._deleteComment(c);
    this.editComment = (c,b) => this._editComment(c,b);
    this.handleSave = (b) => this._handleSave(b);
    this.handleDeleteRootComment = (c) => this._handleDeleteRootComment(c);
    this.handleEditRootComment = (c,b) => this._handleEditRootComment(c,b);
    this.openModal = () => this._openModal();

    this.fetchComments();
  }

  componentDidMount() {
    $('.modal-trigger').leanModal();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.devSiteId !== this.props.devSiteId) {
      this.setState({ page: 0, comments: []},
        () => this.fetchComments()
      )
    }
  }

  _openModal() {
    document.querySelector('#sign-in-modal .modal-content').focus();
  }

  _fetchComments() {
    $.getJSON(`/dev_sites/${this.props.devSiteId}/comments`,
      { page: 0, limit: 5 },
      comments => {
        console.log(comments)
        this.setState({ comments })
      }
    );
  }

  _deleteComment(comment) {
    return new Promise((resolve, reject) => {
      const newComments = _.without(this.state.comments, comment);
      const devSiteId = this.props.devSiteId;

      $.ajax({
        url: `/dev_sites/${devSiteId}/comments/${comment.id}`,
        dataType: 'JSON',
        type: 'DELETE',
        success: res => {
          resolve(res)
        },
        error: error => {
          reject(error)
        },
      })
    })
  }

  _handleDeleteRootComment(comment) {
    this.deleteComment(comment).then(res => {
      const newComments = _.without(this.state.comments, comment);
      this.setState({ comments: newComments});
      window.flash('notice', i18n.commentDeletedSuccess);
    }).catch(err => {
      console.log(err);
      window.flash('alert', i18n.commentDeletedFailed);
    })
  }

  _saveComment(body, parentId = null) {
    return new Promise((resolve, reject) => {
      const limit = this.state.limit;
      const data = {
        comment: {
          body,
          commentable_id: this.props.devSiteId,
          commentable_type: 'DevSite',
          user_id: this.currentUserId,
          parent_id: parentId
        },
        limit
      };

      $.ajax({
        url: `/dev_sites/${this.props.devSiteId}/comments`,
        dataType: 'JSON',
        type: 'POST',
        data: data,
        success: (comment) => {
          resolve(comment)
        },
        error: (error) => {
          reject(comment)
        }
      })
    })
  }

  _handleSave(body) {
    this.saveComment(body).then((comment) => {
      if (comment.flagged_as_offensive === 'FLAGGED') {
        window.flash('notice', i18n.flaggedNotification);
      } else {
        window.flash('notice', i18n.commentSavedSuccess)
        this.state.comments.unshift(comment);
        this.setState({ comments: this.state.comments });
      }
    }).catch((error) => {
      window.flash('alert', i18n.commentSavedFailed)
    })
  }

  _editComment(comment, body) {
    return new Promise((resolve, reject) => {
      const devSiteId = this.props.devSiteId;

      $.ajax({
        url: `/dev_sites/${devSiteId}/comments/${comment.id}`,
        dataType: 'JSON',
        data: { comment: { body }},
        type: 'PATCH',
        success: (comment) => {
          console.log(comment)
          resolve(comment);
        },
        error: error => {
          reject(error);
        }
      });
    })
  }

  _handleEditRootComment(comment, body) {
    this.editComment(comment, body).then((comment) => {
      window.flash('notice', i18n.commentSavedSuccess);
      this.fetchComments();
    }).catch((error) => {
      window.flash('alert', i18n.commentSavedFailed)
      console.log(error);
    })
  }

  render() {
    const totalComments = this.state.comments ? this.state.comments.length : 0;
    const comments = this.state.comments;
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);

    return(
      <div className={css.commentsSection}>
        <h3>{i18n.makePublicComment}</h3>
        <CommentForm { ...this.props } handleSave={this.handleSave} />

        <div className={css.commentCount}>
          <p>{totalComments} responses</p>
        </div>

        { comments &&
          <Comments
            { ...this.props }
            children={comments}
            saveComment={this.saveComment}
            deleteComment={this.deleteComment}
            editComment={this.editComment}
            handleEditRootComment={this.handleEditRootComment}
            handleDeleteRootComment={this.handleDeleteRootComment}
          />
        }
      </div>
    )
  }
}