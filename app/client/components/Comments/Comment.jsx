import React, { Component } from 'react'
import CommentForm from './CommentForm'
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
    this.deleteComment = (e) => this._deleteComment(e);
    this.editComment = (e) => this._editComment(e);
    this.toggleCommentForm = (e) => this._toggleCommentForm(e);
    this.fetchChildren = () => this._fetchChildren();
    this.generateChildren = () => this._generateChildren();
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

  _deleteComment(e) {
    e.preventDefault();
    const { comment, parent } = this.props;
    const devSiteId = this.props.devSiteId
    $.ajax({
      url: `/dev_sites/${devSiteId}/comments/${comment.id}`,
      dataType: 'JSON',
      type: 'DELETE',
      success: (comment) => {
        parent.loadComments();
      },
      error: error => {
        window.flash('alert', error.responseText)
      }
    });
  }

  _editComment(e) {
    const { comment, parent } = this.props;
    const devSiteId = this.props.devSiteId
    $.ajax({
      url: `/dev_sites/${devSiteId}/comments/${comment.id}`,
      dataType: 'JSON',
      data: { comment: { body: e.commentBody }},
      type: 'PATCH',
      success: () => {
        parent.loadComments();
      },
      error: error => {
        window.flash('alert', error.responseText)
      }
    });
  }

  _fetchChildren() {
    const { comment } = this.props;
    const devSiteId = this.props.devSiteId
    console.log('FETCH CHILDREN')
    console.log('comment', comment)

    $.ajax({
      url: `/dev_sites/${devSiteId}/comments/${comment.id}/children`,
      dataType: 'JSON',
      type: 'GET',
      success: (res) => {
        console.log('RESPONSE', res)
        this.setState({ children: res })
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  _toggleCommentForm() {
    this.setState({ showCommentForm: !this.state.showCommentForm })
  }

  _generateChildren() {
    return this.state.children.map((child) => {
      console.log('CHILD', child)
      return(
        <Comment
          comment={child}
          key={child.id}
          parent={this}
          saveComment={this.props.saveComment}
          devSiteId={this.props.devSiteId}
        />
      )
    })
  }

  render() {
    const { comment } = this.props;
    const { readMoreClicked, showReadMore, showCommentForm } = this.state;
    const { locale } = document.body.dataset;
    const userOwnsComment = (comment.user && comment.user.id == this.currentUserId);
    const children = this.generateChildren();
    console.log('CHILDREN', children)
    i18n.setLanguage(locale);

    return(
      <div className={css.comment}>
        <div className={css.info}>
          <span className={css.name}>
            {comment.user ? (!comment.user.anonymous_comments && comment.user.name || i18n.anoymous) : i18n.anoymous}
          </span>
          <span className={css.date}>
            {moment(comment.created_at).format('MMMM DD, YYYY ')}
          </span>
          {
            userOwnsComment &&
            <span className={css.user_actions}>
              <a href='#' onClick={this.deleteComment}><i className='fa fa-trash' /></a>
            </span>
          }
        </div>
        <div className={css.bodyContainer}>
          <div className={readMoreClicked ? css.wholebody : css.body} ref='body'>
            {
              userOwnsComment &&
              <RIETextArea
                value={comment.body}
                change={this.editComment}
                propName='commentBody'
              />
            }
            {
              !userOwnsComment &&
              <p dangerouslySetInnerHTML={{__html: comment.body.replace(/\n\r?/g, '<br>') }}></p>
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
          <CommentForm {...this.props}
            parentId={this.props.comment.id}
            saveComment={this.props.saveComment}
            toggleCommentForm={this.toggleCommentForm}
          />
        }
        {
          (comment.replies > 0) &&
          <a onClick={this.fetchChildren}>Show all {comment.replies} replies</a>
        }
        { children }
      </div>
    )
  }
}
