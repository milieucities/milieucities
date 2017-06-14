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
    this.state = {
      showReadMore: false,
      showCommentForm: false,
      children: [],
      showChildren: false,
    };
    this.currentUserId = document.body.dataset.userId;
    this.toggleWholeBody = (e) => this._toggleWholeBody(e);
    this.voteUp = () => this._voteUp();
    this.voteDown = () => this._voteDown();
    this.handleVoteChildComment = (c,d) => this._handleVoteChildComment(c,d);
    this.handleDelete = (e) => this._handleDelete(e);
    this.handleEdit = (e) => this._handleEdit(e);
    this.toggleCommentForm = (e) => this._toggleCommentForm(e);
    this.fetchChildren = () => this._fetchChildren()
    this.handleDeleteChildComment = (c) => this._handleDeleteChildComment(c);
    this.handleSave = (b, p) => this._handleSave(b, p);
    this.handleEditChildComment = (c,b) => this._handleEditChildComment(c,b);
    this.replyTo = () => this._replyTo();
    this.author = () => this._author();
    this.controlReplies = () => this._controlReplies();
    this.controlViewMore = () => this._controlViewMore();
    this.hideChildren = () => this._hideChildren();
    this.renderComment = () => this._renderComment();
  }

  componentDidMount() {
    if(this.refs.body.scrollHeight > 150) {
      this.setState({ showReadMore: true, readMoreClicked: false });
    }
  }

  _toggleWholeBody(e) {
    e.preventDefault();
    this.setState({ readMoreClicked: !this.state.readMoreClicked });
  }

  _voteUp() {
    const voteHandler = this.props.handleVoteRootComment || this.props.handleVoteChildComment;
    voteHandler(this.props.comment, "up");
  }

  _voteDown() {
    const voteHandler = this.props.handleVoteRootComment || this.props.handleVoteChildComment;
    voteHandler(this.props.comment, "down");
  }

  _handleVoteChildComment(comment, direction) {
    this.props.vote(comment, direction).then(() => {
      this.fetchChildren()
    }).catch((err) => {
      window.flash('alert', err.message);
    })
  }

  _handleDelete(e) {
    e.preventDefault();
    const deleteHandler = this.props.handleDeleteRootComment || this.props.handleDeleteChildComment

    deleteHandler(this.props.comment)
  }

  _handleSave(body, parentId) {
    this.props.saveComment(body, parentId).then((comment) => {
      if (comment.flagged_as_offensive === 'FLAGGED') {
        window.flash('alert', i18n.flaggedNotification);
      } else {
        window.flash('notice', i18n.commentSavedSuccess)
        this.state.children.unshift(comment);
        this.setState({ children: this.state.children, showChildren: true });
      }
    }).catch((error) => {
      window.flash('alert', i18n.commentSavedFailed)
    })
  }

  _handleEditChildComment(comment, body) {
    this.props.editComment(comment, body).then((comment) => {
      window.flash('notice', i18n.commentSavedSuccess);
      this.fetchChildren();
    }).catch((error) => {
      window.flash('alert', i18n.commentSavedFailed)
      console.log(error);
    })
  }

  _handleEdit(e) {
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
        this.setState({ children: res, showChildren: true })
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  _hideChildren() {
    this.setState({ showChildren: false })
  }

  _replyTo() {
    if (this.props.parentCommentAuthor) {
      return <span className={css.replyTo}>@{this.props.parentCommentAuthor}</span>
    } else {
      return ''
    }
  }

  _author() {
    const comment = this.props.comment;
    return comment.user ? (!comment.user.anonymous_comments && comment.user.name || i18n.anoymous) : i18n.anoymous;
  }

  _controlReplies() {
    const replyCount = Math.max(this.state.children.length, this.props.comment.replies);
    if (replyCount > 0) {
      if (!this.state.showChildren) {
        return(
          <a onClick={this.fetchChildren}>{i18n.formatString(i18n.seeReplies, replyCount)}</a>
        )
      } else {
        return(
          <a onClick={this.hideChildren}>{i18n.hideReplies}</a>
        )
      }
    }
  }

  _controlViewMore() {
    const { showReadMore, readMoreClicked } = this.state;

    if (showReadMore && !readMoreClicked) {
      return <a href='#' onClick={this.toggleWholeBody} tabIndex='-1'>{i18n.readMore}</a>
    } else if (showReadMore && readMoreClicked) {
      return <a href='#' onClick={this.toggleWholeBody} tabIndex='-1'>Show less</a>
    }
  }

  _renderComment() {
    const comment = this.props.comment;
    if (comment.user && comment.user.id == this.currentUserId) {
      return(
        <RIETextArea
          value={comment.body}
          change={this.handleEdit}
          propName='commentBody'
        />
      )
    } else {
      return (
        <span dangerouslySetInnerHTML={{__html: comment.body.replace(/\n\r?/g, '<br>') }}></span>
      )
    }
  }

  render() {
    const { comment } = this.props;
    const { readMoreClicked, showCommentForm, children, showChildren } = this.state;
    const userOwnsComment = (comment.user.id == this.currentUserId);
    const author = this.author();
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);

    return(
      <div className={css.comment}>
        <div className={css.info}>
          <span className={css.name}>{author}</span>
          <span className={css.date}>
            {moment(comment.created_at).format('MMMM DD, YYYY ')}
          </span>
          {
            userOwnsComment &&
            <a className={css.user_actions} onClick={this.handleDeleteRootComment || this.handleDelete}>
              <i className='fa fa-trash' />
            </a>
          }
        </div>

        <div className={css.bodyContainer}>
          <div className={readMoreClicked ? css.wholebody : css.body} ref='body'>
            <p>{this.replyTo()}{this.renderComment()}</p>
          </div>
          <div className={css.commentActions}>
            <a className={css.replyLink} onClick={this.toggleCommentForm}>{i18n.reply}</a>
            { this.controlReplies() }
            { this.controlViewMore() }
            <span className={css.votesContainer}>
              <i className='fa fa-angle-up fa-2x' onClick={this.voteUp} tabIndex='0'></i>
              <i className='fa fa-angle-down fa-2x' onClick={this.voteDown} tabIndex='0'></i>
              { comment.vote_count }
            </span>
          </div>
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
          (children && showChildren) &&
          <Comments
            { ...this.props }
            handleDeleteRootComment={null}
            handleVoteRootComment={null}
            handleDeleteChildComment={this.handleDeleteChildComment}
            handleEditChildComment={this.handleEditChildComment}
            handleVoteChildComment={this.handleVoteChildComment}
            parentCommentAuthor={author}
            children={children}
          />
        }
      </div>
    )
  }
}
