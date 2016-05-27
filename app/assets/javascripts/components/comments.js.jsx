var LinkedStateMixin = React.addons.LinkedStateMixin;

var Comments = React.createClass({
  getInitialState: function() {
    return { comments: [] };
  },
  componentDidMount: function() {
    $.getJSON("/dev_sites/"+ this.props.devSiteId + "/comments", function(data){
      this.setState({ comments: data });
    }.bind(this));
  },
  save: function(data){
    this.setState({ comments: data });
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
  comments: function(){
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
        {this.comments()}
      </div>
    );
  }
});

Comments.Comment = React.createClass({
  render: function(){
    var user = this.props.comment.user;
    console.log(this.props.comment);
    return (
      <div className="comment">
        <div className="voting">
          <i className="fa fa-angle-up fa-2x"></i><br/>
          <i className="fa fa-angle-down fa-2x"></i>
        </div>
        <div className="user">{ user ? user.username : "Anonymous"}
        <span className="role"> | { user ? user.role : "User" } </span>
        </div>
        <div className="time"> {moment(this.props.comment.created_at).format("MM-DD-YYYY")}</div>
        <div className="body">
          {this.props.comment.body.replace(/\n\r?/g, '<br>')}
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
      url: "/dev_sites/"+ this.props.devSiteId +"/comments",
      dataType: "JSON",
      type: "POST",
      cache: false,
      contentType: false,
      processData: false,
      data: new FormData(e.currentTarget),
      success: function(data) {
        this.setState({ body: "" });
        this.props.save(data);
      }.bind(this),
      error: function(data) {
        if(data.status === 406){
          //TODO
        }else{
          //TODO
        }
      }.bind(this)
    });

    return false;
  },
  render: function(){
    return (
      <div>
        <form id="new_comment" onSubmit={this.submit}>
          <input name="utf8" type="hidden" value="✓" />
          <input type="hidden" name="authenticity_token" value={this.props.authenticityToken} />
          <input type="hidden" name="comment[dev_site_id]" id="comment_dev_site_id" value={this.props.devSiteId} />
          <input type="hidden" name="comment[user_id]" id="comment_user_id" value={this.props.userId} />

          <textarea valueLink={this.linkState('body')}  placeholder="I can't wait to see this in our neighbourhood!" name="comment[body]" id="comment_body"></textarea>
          <input type="submit" name="commit" value="Comment" className="btn"/>
        </form>
      </div>
    );
  }
});
