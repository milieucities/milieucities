import React, { Component } from 'react'
import Comment from './Comment'
import CommentForm from './CommentForm'
import { List } from 'immutable'
import { RIETextArea } from 'riek'
import css from './comments.scss'
import i18n from './locale'

export default class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = { comments: List(), page: 0, limit: 5 }
    this.currentUserId = document.body.dataset.userId;
    this.loadComments = () => this._loadComments();
    this.hasMoreComments = () => this._hasMoreComments();
    this.appendMoreComments = () => this._appendMoreComments();
    this.loadComments();
    this.openModal = () => this._openModal();
    this.saveComment = (p,b) => this._saveComment(p,b);
  }

  componentDidMount() {
    $('.modal-trigger').leanModal();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.devSiteId !== this.props.devSiteId) {
      this.setState({ page: 0, comments: List()},
        () => this.loadComments()
      )
    }
  }

  _openModal() {
    document.querySelector('#sign-in-modal .modal-content').focus();
  }

  _loadComments() {
    $.getJSON(`/dev_sites/${this.props.devSiteId}/comments`,
      { page: this.state.page, limit: this.state.limit },
      comments => this.setState({ comments: List(comments), total: (comments.length > 0 ? comments[0].total : 0) })
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
          comments => this.setState({ comments: this.state.comments.push(...comments), total: comments[0].total })
        );
      }
    );
  }

  _saveComment(parentId, body) {
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
        if (comment.flagged_as_offensive === 'FLAGGED') {
          window.flash('notice', i18n.flaggedNotification);
        } else {
          this.setState({
            comments: this.state.comments.unshift(comment),
            total: this.state.total + 1
          })
        }
        this.setState({ body: '' });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  render() {
    const { comments, total } = this.state;
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    return <div className={css.container}>
      <div className={!this.currentUserId && css.nouser}>
        {
          this.currentUserId
          ? <CommentForm {...this.props} parent={this} saveComment={this.saveComment} />
        : <a href='#sign-in-modal' className='modal-trigger btn' onClick={this.openModal}>{i18n.signInToComment}</a>
        }
      </div>
      {
        total > 0 &&
        <div className={css.number}> {total} responses</div>
      }
      {comments.map(comment => <Comment comment={comment} key={comment.id} parent={this} saveComment={this.saveComment} devSiteId={this.props.devSiteId} />)}
      {
        this.hasMoreComments() &&
        <a onClick={this.appendMoreComments} className={css.loadmore}>{i18n.loadMore}</a>
      }
    </div>;
  }
}
