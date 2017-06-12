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
    this.saveComment = (b) => this._saveComment(b);
    this.deleteComment = (c) => this._deleteComment(c);
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
    const newComments = _.without(this.state.comments, comment);
    const devSiteId = this.props.devSiteId;

    $.ajax({
      url: `/dev_sites/${devSiteId}/comments/${comment.id}`,
      dataType: 'JSON',
      type: 'DELETE',
      success: () => {
        this.setState({ comments: newComments })
        window.flash('notice', 'Your comment has been deleted.')
      },
      error: error => {
        window.flash('alert', error.responseText)
      }
    });
  }

  _saveComment(body) {
    const limit = this.state.limit;
    const data = {
                    comment: {
                      body,
                      commentable_id: this.props.devSiteId,
                      commentable_type: 'DevSite',
                      user_id: this.currentUserId,
                    },
                    limit
                  }
    $.ajax({
      url: `/dev_sites/${this.props.devSiteId}/comments`,
      dataType: 'JSON',
      type: 'POST',
      data: data,
      success: (comment) => {
        if (comment.flagged_as_offensive === 'FLAGGED') {
          window.flash('notice', i18n.flaggedNotification);
        } else {
          this.state.comments.unshift(comment)
        }
        this.setState({ body: '' });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  render() {
    const totalComments = this.state.comments ? this.state.comments.length : 0;
    const comments = this.state.comments;

    return(
      <div>
        <CommentForm
          { ...this.props }
          saveComment={this.saveComment}
        />

        <div className="total-comments">
          <p>{totalComments} responses</p>
        </div>

        { comments && <Comments { ...this.props } children={comments} deleteComment={this.deleteComment} />}
      </div>
    )
  }
}