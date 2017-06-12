import React, { Component } from 'react'
import Comment from './Comment'
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
  }

  _loadComments() {
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

  render() {
    const { locale } = document.body.dataset;
    const children = this.props.children;
    i18n.setLanguage(locale);

    return <div className={css.container}>

      {children && children.map(comment =>
        <Comment
          { ...this.props }
          comment={comment}
          key={comment.id}
        />)
      }
      {
        this.hasMoreComments() &&
        <a onClick={this.appendMoreComments} className={css.loadmore}>{i18n.loadMore}</a>
      }
    </div>;
  }
}
