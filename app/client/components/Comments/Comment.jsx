import React, { Component } from 'react'
import _ from 'lodash'
import CommentForm from './CommentForm'
import Comments from './Comments'
import { RIETextArea } from 'riek'
import css from './comments.scss'
import i18n from './locale'

export default class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = { showReadMore: false, showCommentForm: false, children: [] };
    this.currentUserId = document.body.dataset.userId;
    this.viewWholeBody = (e) => this._viewWholeBody(e);
    this.voteUp = () => this._voteUp();
    this.voteDown = () => this._voteDown();
    this.handleDelete = (e) => this._handleDelete(e);
    this.editComment = (e) => this._editComment(e);
    this.toggleCommentForm = (e) => this._toggleCommentForm(e);
    this.fetchChildren = () => this._fetchChildren()
    this.deleteComment = () => this._deleteComment();
    this.handleDeleteChildComment = (c) => this._handleDeleteChildComment(c);
    this.handleSave = (b, p) => this._handleSave(b, p);
    this.handleEditChildComment = (c,b) => this._handleEditChildComment(c,b);
    this.replyTo = () => this._replyTo();
  }

  componentDidMount() {
    if(this.refs.body.scrollHeight > 150) {
      this.setState({ showReadMore: true, readMoreClicked: false });
    }
  }

  _viewWholeBody(e) {
    e.preventDefault();
    this.setState({ readMoreClicked: true });
  }

  _voteUp() {
    const { comment, parent } = this.props;
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    const { failedToVote } = i18n;
    if(comment.voted_up) {
      $.ajax({
        url: `/users/${this.currentUserId}/votes/${comment.voted_up}`,
        dataType: 'JSON',
        type: 'DELETE',
        data: { vote: { comment_id: this.props.comment.id } },
        success: () => {
          parent.loadComments();
        },
        error: error => {
          window.flash('alert', failedToVote)
        }
      });
    } else if(comment.voted_down) {
        $.ajax({
          url: `/users/${this.currentUserId}/votes/${comment.voted_down}`,
          dataType: 'JSON',
          type: 'DELETE',
          data: { vote: { comment_id: this.props.comment.id } },
          success: () => {
            parent.loadComments();
          },
          error: error => {
            window.flash('alert', failedToVote)
          }
        });
      } else {
        $.ajax({
          url: `/users/${this.currentUserId}/votes`,
          dataType: 'JSON',
          type: 'POST',
          data: { vote: { up: true, comment_id: this.props.comment.id } },
          success: () => {
            parent.loadComments();
          },
          error: error => {
            window.flash('alert', failedToVote)
          }
        });
      }
  }

  _voteDown() {
    const { comment, parent } = this.props;
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    const { failedToVote } = i18n;
    if(comment.voted_down) {
      $.ajax({
        url: `/users/${this.currentUserId}/votes/${comment.voted_down}`,
        dataType: 'JSON',
        type: 'DELETE',
        data: { vote: { comment_id: this.props.comment.id } },
        success: () => {
          parent.loadComments();
        },
        error: error => {
          window.flash('alert', failedToVote)
        }
      });
    } else if(comment.voted_up) {
      $.ajax({
        url: `/users/${this.currentUserId}/votes/${comment.voted_up}`,
        dataType: 'JSON',
        type: 'DELETE',
        data: { vote: { comment_id: this.props.comment.id } },
        success: () => {
          parent.loadComments();
        },
        error: error => {
          window.flash('alert', failedToVote)
        }
      });
    } else {
      $.ajax({
        url: `/users/${this.currentUserId}/votes`,
        dataType: 'JSON',
        type: 'POST',
        data: { vote: { up: false, comment_id: this.props.comment.id } },
        success: () => {
          parent.loadComments();
        },
        error: error => {
          window.flash('alert', failedToVote)
        }
      });
    }
  }

  _handleDeleteChildComment(comment) {
    this.props.deleteComment(comment).then(res => {
      const newComments = _.without(this.state.children, comment);
      this.setState({ children: newComments});
      window.flash('notice', 'Your comment has been deleted.');
    }).catch(err => {
      console.log(err);
      window.flash('alert', 'Your comment was not deleted. Please try again.');
    })
  }

  _handleDelete(e) {
    e.preventDefault();
    const deleteHandler = this.props.handleDeleteRootComment || this.props.handleDeleteChildComment

    deleteHandler(this.props.comment)
  }

  _handleSave(body, parentId) {
    console.log('HANDLE SAVE IN COMMENT');
    this.props.saveComment(body, parentId).then((comment) => {
      if (comment.flagged_as_offensive === 'FLAGGED') {
        window.flash('notice', i18n.flaggedNotification);
      } else {
        console.log('saved child comment', comment)
        window.flash('notice', 'Your comment has been saved.')
        this.state.children.unshift(comment);
        this.setState({ children: this.state.children });
      }
    }).catch((error) => {
      window.flash('alert', 'Your comment was not saved. Please try again.')
    })
  }

  _handleEditChildComment(comment, body) {
    this.props.editComment(comment, body).then((comment) => {
      window.flash('notice', 'Your comment was updated');
      this.fetchChildren();
    }).catch((error) => {
      window.flash('alert', 'Your comment was not saved. Please try again.')
      console.log(error);
    })
  }

  _editComment(e) {
    const editHandler = this.props.handleEditRootComment || this.props.handleEditChildComment;

    editHandler(this.props.comment, e.commentBody);
  }

  _toggleCommentForm() {
    this.setState({ showCommentForm: !this.state.showCommentForm })
  }

  _fetchChildren() {
    const devSiteId = this.props.devSiteId
    const comment = this.props.comment

    $.ajax({
      url: `/dev_sites/${devSiteId}/comments/${comment.id}/children`,
      dataType: 'JSON',
      type: 'GET',
      success: (res) => {
        console.log(res);
        this.setState({ children: res })
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  _replyTo() {
    if (this.props.parentCommentAuthor) {
      return <span className='reply-to'>@{this.props.parentCommentAuthor}</span>
    } else {
      return ''
    }
  }

  render() {
    const { comment } = this.props;
    const { readMoreClicked, showReadMore, showCommentForm } = this.state;
    const { locale } = document.body.dataset;
    const userOwnsComment = (comment.user && comment.user.id == this.currentUserId);
    const children = this.state.children;
    const author = comment.user ? (!comment.user.anonymous_comments && comment.user.name || i18n.anoymous) : i18n.anoymous;
    i18n.setLanguage(locale);

    return(
      <div className={css.comment}>
        <div className={css.info}>
          <span className={css.name}>
            {author}
          </span>
          <span className={css.date}>
            {moment(comment.created_at).format('MMMM DD, YYYY ')}
          </span>
          {
            userOwnsComment &&
            <span className={css.user_actions}>
              <a href='#' onClick={this.handleDeleteRootComment || this.handleDelete}><i className='fa fa-trash' /></a>
            </span>
          }
        </div>
        <div className={css.bodyContainer}>
          <div className={readMoreClicked ? css.wholebody : css.body} ref='body'>
            {
              userOwnsComment &&
              <p>
                {this.replyTo()}
                <RIETextArea
                  value={comment.body}
                  change={this.editComment}
                  propName='commentBody'
                />
              </p>
            }
            {
              !userOwnsComment &&
              <p>
                <span>{this.replyTo()}</span>
                <span dangerouslySetInnerHTML={{__html: comment.body.replace(/\n\r?/g, '<br>') }}></span>
              </p>
            }
          </div>
          <div className={css.votesContainer}>
            <i className='fa fa-angle-up fa-2x' onClick={this.voteUp} tabIndex='0'></i>
            <i className='fa fa-angle-down fa-2x' onClick={this.voteDown} tabIndex='0'></i>
            { comment.vote_count }
          </div>

        </div>
        {
          showReadMore && !readMoreClicked &&
          <a href='#' onClick={this.viewWholeBody} className={css.readmore} tabIndex='-1'>{i18n.readMore}</a>
        }
        <div className="reply-link">
          <a onClick={this.toggleCommentForm}>Reply</a>
        </div>
        {
          showCommentForm &&
          <CommentForm
            {...this.props}
            parentId={this.props.comment.id}
            handleSave={this.handleSave}
            toggleCommentForm={this.toggleCommentForm}
          />
        }
        {
          (comment.replies > 0) &&
          <a onClick={this.fetchChildren}>Show all {comment.replies} replies</a>
        }
        {
          children &&
          <Comments
            devSiteId={this.props.devSiteId}
            children={children}
            deleteComment={this.props.deleteComment}
            saveComment={this.props.saveComment}
            editComment={this.props.editComment}
            handleDeleteChildComment={this.handleDeleteChildComment}
            handleEditChildComment={this.handleEditChildComment}
            parentCommentAuthor={author}
          />
        }
      </div>
    )
  }
}
