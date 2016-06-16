var DevSites = React.createClass({
  getInitialState: function() {
    return { devSites: [], selectedDevSite: null };
  },
  componentDidMount: function() {
    $.getJSON("/" + this.props.locale + "/dev_sites", function(data){
      this.setState({ devSites: data, selectedDevSite: ((data.length > 0) ? data[0].dev_site : null) });
    }.bind(this));
  },
  changeSelectedDevSite: function(devSite){
    this.setState({ selectedDevSite: devSite });
  },
  render: function(){

    var noDevSites;
    var devSitesNodes = this.state.devSites.map(function(devSite, i){
      return (
        <DevSites.Item {...this.props} devSite={devSite.dev_site} selectedDevSite={this.state.selectedDevSite} key={i} reactKey={i} changeSelectedDevSite={this.changeSelectedDevSite} />
      );
    }.bind(this));

    if(this.state.devSites.length === 0){
      noDevSites = <div className="flow-text center">No developments sites loaded.</div>;
    }

    return <section id="dev-sites-index">
             <div className="header">
               All Developing Sites <span className="count">| {this.state.devSites.length} Sites</span>
             </div>
             <DevSites.Show {...this.props} devSite={this.state.selectedDevSite} />
             <div className="dev-sites row">
               {devSitesNodes}

               {noDevSites}
             </div>
           </section>
  }

});

DevSites.Show = React.createClass({
  getInitialState: function() {
    return { devSite: this.props.devSite };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({ devSite: nextProps.devSite })
  },
  render: function(){

    if(this.state.devSite === null){
      return false;
    }

    return  <div className="dev-site-profile hide-on-med-and-down">

              <div className="label title">Preview</div>
              <a href={"/" + this.props.locale + "/dev_sites/" + this.state.devSite.id}>
                <img src={this.state.devSite.image_url} className="display-image"/>
              </a>
              <div className="title">{this.state.devSite.title}</div>
              <div className="label title">Info</div>
              <div className="row">

                <div className="no-pad col s6 label">Development Id:</div>
                <div className="no-pad col s6">{this.state.devSite.devID ? this.state.devSite.devID : "N/A"}</div>

                <div className="no-pad col s6 label">Type:</div>
                <div className="no-pad col s6">{this.state.devSite.application_type ? this.state.devSite.application_type : "N/A"}</div>

                <div className="no-pad col s6 label">Address:</div>
                <div className="no-pad col s6">{this.state.devSite.addresses[0] ? this.state.devSite.addresses[0].address.street : "N/A"}</div>

                <div className="no-pad col s6 label">Latest Status:</div>
                <div className="no-pad col s6">{this.state.devSite.statuses[0] ? this.state.devSite.statuses[0].status.status : "N/A"}</div>

                <div className="no-pad col s6 label">Latest Status Date:</div>
                <div className="no-pad col s6">{ (this.state.devSite.statuses[0] && this.state.devSite.statuses[0].status.status_date) ? moment(this.state.devSite.statuses[0].status.status_date).format("MMMM D, YYYY") : moment(this.state.devSite.updated_at).format("MMMM D, YYYY") }</div>

              </div>

              <a href={"/" + this.props.locale + "/dev_sites/" + this.state.devSite.id} className="waves-effect waves-light btn">View Development</a>
            </div>;
  }

});

DevSites.Item = React.createClass({

  getInitialState: function() {
    return { devSite: this.props.devSite, selectedDevSite: this.props.selectedDevSite };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({ devSite: nextProps.devSite, selectedDevSite: nextProps.selectedDevSite })
  },
  changeSelectedDevSite: function() {
    this.props.changeSelectedDevSite(this.state.devSite);
  },
  render: function(){

    return <div className="col s12 m6 l4">
            <div className={ (this.state.selectedDevSite.id === this.state.devSite.id ) ? "card selected" : "card" } onClick={this.changeSelectedDevSite}>
              <div className="card-image waves-effect waves-block waves-light">
                <img src={this.state.devSite.image_url } />
              </div>
              <div className="card-content">
                <span className="card-title grey-text text-darken-4 truncate"><a href={"/" + this.props.locale + "/dev_sites/" + this.state.devSite.id}>{this.state.devSite.title}</a></span>
                <span className="type">{this.state.devSite.application_type ? this.state.devSite.application_type : "N/A"}</span>
              </div>
            </div>
           </div>;
  }

});
