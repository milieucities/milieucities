import React, { Component } from 'react';
import _ from 'lodash'
import Comments from './Comments'
import CommentForm from './CommentForm'

export default class CommentsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.currentUserId = parseInt(document.body.dataset.userId);
    this.fetchComments = () => this._fetchComments();
    this.saveComment = (b, p) => this._saveComment(b, p);
    this.handleSave = (b) => this._handleSave(b);
    this.deleteComment = (c) => this._deleteComment(c);
    this.handleDeleteRootComment = (c) => this._handleDeleteRootComment(c);
    this.updateCommentsState = (c) => this._updateCommentsState(c);
    this.fetchComments();
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
      window.flash('notice', 'Your comment has been deleted.');
    }).catch(err => {
      console.log(err);
      window.flash('alert', 'Your comment was not deleted. Please try again.');
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
                    }
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
        window.flash('notice', 'Your comment has been saved.')
        this.state.comments.unshift(comment);
        this.setState({ comments: this.state.comments });
      }
    }).catch((error) => {
      window.flash('alert', 'Your comment was not saved. Please try again.')
    })
  }

  render() {
    const totalComments = this.state.comments ? this.state.comments.length : 0;
    const comments = this.state.comments;

    return(
      <div>
        <CommentForm
          { ...this.props }
          handleSave={this.handleSave}
        />

        <div className="total-comments">
          <p>{totalComments} responses</p>
        </div>

        { comments &&
          <Comments
            { ...this.props }
            children={comments}
            saveComment={this.saveComment}
            deleteComment={this.deleteComment}
            handleDeleteRootComment={this.handleDeleteRootComment}
          />
        }
      </div>
    )
  }
}