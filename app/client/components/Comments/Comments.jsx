import React, { Component } from 'react'
import Comment from './Comment'
import css from './comments.scss'

export default class Comments extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const children = this.props.children;

    return(
      <div className={css.commentsList}>
        {children && children.map(comment =>
          <Comment
            { ...this.props }
            comment={comment}
            key={comment.id}
          />)
        }
      </div>
    )
  }
}
