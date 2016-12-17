import React, { Component } from 'react'
import { List } from 'immutable'
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
  _loadComments() {
    $.getJSON(`/dev_sites/${this.props.devSiteId}/comments`,
      { page: this.state.page, limit: this.state.limit },
      json => this.setState({ comments: List(json.comments), total: json.total })
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
          json => this.setState({ comments: this.state.comments.push(...json.comments), total: json.total })
        );
      }
    );
  }
  render() {
    const { comments, total } = this.state;
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    return <div className={css.container}>
      <div className={!this.currentUserId && css.nouser}>
        {this.currentUserId ? <CommentForm {...this.props} parent={this} /> :
          <a href="#sign-in-modal" className='modal-trigger btn'>{i18n.signInToComment}</a>}
      </div>
      {total > 0 && <div className={css.number}> {total} responses</div>}
      {comments.map(comment => <Comment comment={comment} key={comment.id} parent={this} />)}
      {this.hasMoreComments() && <a onClick={this.appendMoreComments} className={css.loadmore}>{i18n.loadMore}</a> }
    </div>;
  }
}

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.parent = this.props.parent;
    this.handleChange = (e) => this.setState({ body: e.target.value });
    this.submitForm = (e) => this._submitForm(e);
  }
  _submitForm(e) {
    e.preventDefault();
    const { body, limit } = this.state;
    $.ajax({
      url: `/dev_sites/${this.props.devSiteId}/comments`,
      dataType: 'JSON',
      type: 'POST',
      cache: false,
      data: {comment: { body }, limit },
      success: (json) => {
        this.parent.setState({
          comments: this.parent.state.comments.unshift(json),
          total: this.parent.state.total + 1
        })
        this.setState({ body: '' });
      }
    });
  }
  render() {
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);
    return <form id='new_comment' onSubmit={this.submitForm}>
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
  }
}

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { showReadMore: false };
    this.currentUserId = document.body.dataset.userId;
    this.viewWholeBody = (e) => this._viewWholeBody(e);
    this.voteUp = () => this._voteUp();
    this.voteDown = () => this._voteDown();
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
  render() {
    const { comment } = this.props;
    const { readMoreClicked, showReadMore } = this.state;
    const { locale } = document.body.dataset;
    i18n.setLanguage(locale);

    return <div className={css.comment}>
      <div className={css.info}>
        <span className={css.name}>
          {comment.user ? (comment.user.username || comment.user.name || i18n.anoymous) : i18n.anoymous}
        </span>
        <span className={css.date}>
          {moment(comment.created_at).format('MMMM DD, YYYY ')}
        </span>
      </div>
      <div className={css.bodyContainer}>
        <div className={readMoreClicked ? css.wholebody : css.body} ref="body"
             dangerouslySetInnerHTML={{__html: comment.body.replace(/\n\r?/g, '<br>') }}>
        </div>
        <div className={css.votesContainer}>
          <i className="fa fa-angle-up fa-2x" onClick={this.voteUp}></i>
          <i className="fa fa-angle-down fa-2x" onClick={this.voteDown}></i>
          { comment.vote_count }
        </div>
      </div>
      {showReadMore && !readMoreClicked &&
        <a href="#" onClick={this.viewWholeBody} className={css.readmore}>{i18n.readMore}</a>}
    </div>
  }
}
