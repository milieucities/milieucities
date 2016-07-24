var DevSites = React.createClass({
  getInitialState: function() {
    return { devSites: [], selectedDevSite: null };
  },
  componentDidMount: function() {
    $.getJSON("/dev_sites", function(data){
      this.setState({ devSites: data, selectedDevSite: ((data.length > 0) ? data[0] : null) });
    }.bind(this));
  },
  changeSelectedDevSite: function(devSite){
    this.setState({ selectedDevSite: devSite });
  },
  devSitesNodes: function(){
    if(this.state.devSites.length !== 0){
      return this.state.devSites.map(function(devSite){
        return <DevSites.Item {...this.props} devSite={devSite} selectedDevSite={this.state.selectedDevSite} key={devSite.id} changeSelectedDevSite={this.changeSelectedDevSite} />;
      }.bind(this));
    }else{
      return <div className="flow-text center">No developments sites loaded.</div>;
    }
  },
  render: function(){
    return <section id="dev-sites-index">
             <div className="header">
               All Developing Sites <span className="count">| {this.state.devSites.length} Sites</span>
             </div>
             <DevSites.Show {...this.props} devSite={this.state.selectedDevSite} />
             <div className="dev-sites row">
               {this.devSitesNodes()}
             </div>
           </section>
  }

});

DevSites.Show = React.createClass({
  render: function(){

    if(this.props.devSite === null){
      return false;
    }

    return  <div className="dev-site-profile hide-on-med-and-down">

              <div className="label title">Preview</div>
              <a href={"/" + this.props.locale + "/dev_sites/" + this.props.devSite.id}>
                <img src={this.props.devSite.image_url} className="display-image"/>
              </a>
              <div className="title">{this.props.devSite.title}</div>
              <div className="label title">Info</div>
              <div className="row">

                <div className="no-pad col s6 label">Development Id:</div>
                <div className="no-pad col s6">{this.props.devSite.devID ? this.props.devSite.devID : "N/A"}</div>

                <div className="no-pad col s6 label">Type:</div>
                <div className="no-pad col s6">{this.props.devSite.application_type ? this.props.devSite.application_type : "N/A"}</div>

                <div className="no-pad col s6 label">Address:</div>
                <div className="no-pad col s6">{this.props.devSite.addresses[0] ? this.props.devSite.addresses[0].street : "N/A"}</div>

                <div className="no-pad col s6 label">Latest Status:</div>
                <div className="no-pad col s6">{this.props.devSite.statuses[0] ? this.props.devSite.statuses[0].status : "N/A"}</div>

                <div className="no-pad col s6 label">Latest Status Date:</div>
                <div className="no-pad col s6">{ (this.props.devSite.statuses[0] && this.props.devSite.statuses[0].status_date) ? moment(this.props.devSite.statuses[0].status_date).format("MMMM D, YYYY") : moment(this.props.devSite.updated_at).format("MMMM D, YYYY") }</div>

              </div>

              <a href={"/" + this.props.locale + "/dev_sites/" + this.props.devSite.id} className="waves-effect waves-light btn">View Development</a>
            </div>;
  }

});

DevSites.Item = React.createClass({
  changeSelectedDevSite: function() {
    this.props.changeSelectedDevSite(this.props.devSite);
  },
  render: function(){

    return <div className="col s12 m6 l4">
            <div className={ (this.props.selectedDevSite.id === this.props.devSite.id ) ? "card selected" : "card" } onClick={this.changeSelectedDevSite}>
              <div className="card-image waves-effect waves-block waves-light">
                <img src={this.props.devSite.image_url } />
              </div>
              <div className="card-content">
                <span className="card-title grey-text text-darken-4 truncate"><a href={"/" + this.props.locale + "/dev_sites/" + this.props.devSite.id}>{this.props.devSite.title}</a></span>
                <span className="type">{this.props.devSite.application_type ? this.props.devSite.application_type : "N/A"}</span>
              </div>
            </div>
           </div>;
  }

});
