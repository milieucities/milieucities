var LinkedStateMixin = React.addons.LinkedStateMixin;

var Comments = React.createClass({
  getInitialState: function() {
    return { comments: [] };
  },
  componentDidMount: function() {
    $.getJSON("/" + this.props.locale +"/dev_sites/"+ this.props.devSiteId + "/comments", function(data){
      var data = data.comments || [];
      this.setState({ comments: data });
    }.bind(this));
  },
  save: function(data){
    this.state.comments.push(data);
    this.setState({ comments: this.state.comments });
  },
  render: function(){
    return (
      <div>
        <Comments.CommentsIndex {...this.props} comments={this.state.comments} />
        <Comments.CommentsForm {...this.props} save={this.save} />
      </div>
    )
  }
});

Comments.CommentsIndex = React.createClass({
  commentNodes: function(){
    var commentNodes = this.props.comments.map(function(comment){
      return (
        <Comments.Comment {...this.props} key={comment.id} comment={comment} />
      );
    }.bind(this));
    return commentNodes;
  },
  render: function(){
    return (
      <div id="comments">
        {this.commentNodes()}
      </div>
    );
  }
});

Comments.Comment = React.createClass({
  render: function(){
    let { user } = this.props.comment;
    return (
      <div className="comment">
        <div className="user">{ user ? user.username : "Anonymous"}
        <span className="role"> | { user ? user.role : "User" } </span>
        </div>
        <div className="time"> {moment(this.props.comment.created_at).format("MM-DD-YYYY")}</div>
        <div className="body" dangerouslySetInnerHTML={{__html: this.props.comment.body.replace(/\n\r?/g, '<br>') }}>
        </div>
      </div>
    );
  }
});

Comments.CommentsForm = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return { body: "" };
  },
  submit: function(e){
    e.preventDefault();

    $.ajax({
      url: "/" + this.props.locale +"/dev_sites/"+ this.props.devSiteId +"/comments",
      dataType: "JSON",
      type: "POST",
      cache: false,
      contentType: false,
      processData: false,
      data: new FormData(e.currentTarget),
      success: function(data) {
        this.setState({ body: "" });
        this.props.save(data);
      }.bind(this)
    });

    return false;
  },
  render: function(){
    let backUpActionUrl = "/"+ this.props.locale + "/users/new";
    if(this.props.userId) {
      return (
        <div>
          <form id="new_comment" onSubmit={this.submit}>
            <input name="utf8" type="hidden" value="✓" />
            <input type="hidden" name="authenticity_token" value={this.props.authenticityToken} />
            <input type="hidden" name="comment[dev_site_id]" id="comment_dev_site_id" value={this.props.devSiteId} />
            <input type="hidden" name="comment[user_id]" id="comment_user_id" value={this.props.userId} />

            <textarea valueLink={this.linkState('body')}  placeholder="What do you think?" name="comment[body]" id="comment_body"></textarea>
            <input type="submit" name="commit" value="Comment" className="btn"/>
          </form>
        </div>
      );
    } else {
      return (
        <form action={ backUpActionUrl } method="get">
            <input type="submit" value="Sign up to Comment"
                 name="Submit" id="frm1_submit" className="btn" />
        </form>
      )
    }
  }
});
