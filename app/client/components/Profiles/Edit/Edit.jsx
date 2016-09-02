import React, { Component } from 'react'
import { render } from 'react-dom'
import css from './edit.scss'

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.currentUserId = parseInt(document.body.dataset.userId);

    this.loadProfile = () => this._loadProfile();
    this.loadProfile();
    this.loadSurvey = () => this._loadSurvey();
    this.loadSurvey();
    this.uploadAvatar = (e) => this._uploadAvatar(e);
    this.submitProfileForm = (e) => this._submitProfileForm(e);
    this.submitSurveyForm = (e) => this._submitSurveyForm(e);
  }
  _loadProfile() {
    $.getJSON(`/users/${this.currentUserId}/profile`,
      profile => this.setState({ profile })
    );
  }
  _loadSurvey() {
    $.getJSON(`/users/${this.currentUserId}/survey`,
      survey => this.setState({ survey })
    );
  }
  _uploadAvatar(e) {
    let form = new FormData();
    form.append('profile[avatar]', this.refs.avatar.files[0])

    this.setState({ avatarUploading: true });
    $.ajax({
      url: `/users/${this.currentUserId}/profile`,
      dataType: 'JSON',
      type: 'PATCH',
      contentType: false,
      processData: false,
      data: form,
      success: profile => {
        this.setState({ profile, avatarUploading: false });
        window.flash('notice', 'Profile updated successfully');
      }
    });
  }
  _submitProfileForm(e) {
    e.preventDefault();

    let form = new FormData(e.currentTarget);
    !form.has('profile[receive_newletter]') && form.append('profile[receive_newletter]', false)

    $.ajax({
      url: `/users/${this.currentUserId}/profile`,
      dataType: 'JSON',
      type: 'PATCH',
      contentType: false,
      processData: false,
      data: form,
      success: profile => {
        this.setState({ profile });
        window.flash('notice', 'Profile updated successfully');
      }
    });
  }
  _submitSurveyForm(e) {
    e.preventDefault();
    $.ajax({
      url: `/users/${this.currentUserId}/survey`,
      dataType: 'JSON',
      type: 'PATCH',
      contentType: false,
      processData: false,
      data: new FormData(e.currentTarget),
      success: survey => {
        this.setState({ survey });
        window.flash('notice', 'Survey saved successfully');
      }
    });
  }
  render() {
    const { profile, avatarUploading, survey } = this.state;
    return <div className={css.container}>
      <div className={css.info}>
        <div className={css.avatar}>
          {avatarUploading && <div className={css.loader}><i className='fa fa-spin fa-circle-o-notch fa-3x fa-fw' /></div>}
          <label className={css.icon} htmlFor='profile_avatar'><i className='fa fa-picture-o' /></label>
          <input type='file' ref='avatar' id='profile_avatar' onChange={this.uploadAvatar} style={{display: 'none'}} />
          <img src={ profile && profile.avatar && profile.avatar.thumb.url || require('./images/default-avatar.png')} />
        </div>

        <div className={css.delete}>
          <a data-confirm='Are you positive that you want to delete your account?'
            className='btn cancel block' rel='nofollow'
            data-method='delete' href={`/users/${this.currentUserId}`}>Delete Account</a>
        </div>
      </div>
      <div className={css.content}>
        <h2>Profile Settings</h2>

        {
          profile &&
          <form acceptCharset='UTF-8' onSubmit={this.submitProfileForm}>
            <input name='utf8' type='hidden' value='✓'/>

            <div className='row'>
              <div className='input-field col s12'>
                <label htmlFor='profile_name'>Name</label>
                <input type='text' defaultValue={profile.name} id='profile_name' name='profile[name]'/>
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12'>
                <label htmlFor='profile_street'>Street</label>
                <input type='text' defaultValue={profile.street} id='profile_street' name='profile[street]'/>
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12 m6'>
                <label htmlFor='profile_city'>City</label>
                <input type='text' defaultValue={profile.city} id='profile_city' name='profile[city]'/>
              </div>

              <div className='input-field col s12 m6'>
                <label htmlFor='profile_postal_code'>Postal Code</label>
                <input type='text' defaultValue={profile.postal_code} id='profile_postal_code' name='profile[postal_code]'/>
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12 m6'>
                <label htmlFor='profile_age_range'>Age Range</label>
                <select defaultValue={profile.age_range} name='profile[age_range]' id='profile_age_range'>
                  <option value=''></option>
                  <option value='17 and younger'>17 and younger</option>
                  <option value='18 - 25'>18 - 25</option>
                  <option value='26 - 35'>26 - 35</option>
                  <option value='36 - 55'>36 - 55</option>
                  <option value='56+'>56 and over</option>
                </select>
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12'>
                <label htmlFor='profile_field_of_occupation'>Field of Occupation</label>
                <input type='text' defaultValue={profile.field_of_occupation} id='profile_field_of_occupation' name='profile[field_of_occupation]'/>
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12'>
                <input type='checkbox' defaultChecked={profile.receive_newletter} id='profile_receive_newletter' name='profile[receive_newletter]'/>
                <label htmlFor='profile_receive_newletter' style={{display: 'inline', textTransform: 'none', paddingLeft: 10}}>I would like to receive newletters</label>
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12'>
                <button name='commit' type='submit' className='btn'>Save Profile</button>
              </div>
            </div>

          </form>
        }

        <div className={css.divider}></div>
        <h2>Let us know you a little better...</h2>

        {
          survey &&
          <form acceptCharset='UTF-8' onSubmit={this.submitSurveyForm}>
            <input name='utf8' type='hidden' value='✓'/>

            <div className='row'>
              <div className='input-field col s12'>
                <label htmlFor='survey_lived_in_neighborhood'>How long have you lived in your current neighborhood?</label>
                <select defaultValue={survey.lived_in_neighborhood} className='col s12 m6' name='survey[lived_in_neighborhood]' id='survey_lived_in_neighborhood'>
                  <option value=''></option>
                  <option value='Less than a year'>Less than a year</option>
                  <option value='2 - 3 years'>2 - 3 years</option>
                  <option value='3 - 5 years'>3 - 5 years</option>
                  <option value='5 - 10 years'>5 - 10 years</option>
                  <option value='10+ years'>10+ years</option>
                </select>
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12'>
                <label htmlFor='survey_neighborhood_description'>Three words to describe your neighborhood</label>
                <input type='text' defaultValue={survey.neighborhood_description} id='survey_neighborhood_description' name='survey[neighborhood_description]'/>
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12'>
                <label htmlFor='survey_community_involvement'>How would you describe your community involvement?</label>
                <div className={css.range}>
                  <div>Not involved :(</div>
                  <div>I keep track of what is going on</div>
                  <div>Super involved</div>
                </div>
                <input type='range' max='3' min='1' step='0.5' defaultValue={survey.community_involvement} id='survey_community_involvement' name='survey[community_involvement]'/>
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12'>
                <label htmlFor='survey_biking_infrastructure'>Would you like to see more content about biking infrastructure?</label>
                <div className={css.range}>
                  <div>Not involved :(</div>
                  <div>I keep track of what is going on</div>
                  <div>Super involved</div>
                </div>
                <input type='range' max='3' min='1' step='0.5' defaultValue={survey.biking_infrastructure} id='survey_biking_infrastructure' name='survey[biking_infrastructure]'/>
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12'>
                <label htmlFor='survey_urban_intensification'>Would you like to see more content about urban intensification?</label>
                <div className={css.range}>
                  <div>Not involved :(</div>
                  <div>I keep track of what is going on</div>
                  <div>Super involved</div>
                </div>
                <input type='range' max='3' min='1' step='0.5' defaultValue={survey.urban_intensification} id='survey_urban_intensification' name='survey[urban_intensification]'/>
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12'>
                <label htmlFor='survey_heritage'>Would you like to see more content about heritage conservation and restoration?</label>
                <div className={css.range}>
                  <div>Not involved :(</div>
                  <div>I keep track of what is going on</div>
                  <div>Super involved</div>
                </div>
                <input type='range' max='3' min='1' step='0.5' defaultValue={survey.heritage} id='survey_heritage' name='survey[heritage]'/>
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12'>
                <label htmlFor='survey_interesting_neighborhood_topics'>Are there any other topics that affect your neighborhood that you are interested in?</label>
                <textarea defaultValue={survey.interesting_neighborhood_topics} id='survey_interesting_neighborhood_topics' name='survey[interesting_neighborhood_topics]' />
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12'>
                <button name='commit' type='submit' className='btn'>Save Survey</button>
              </div>
            </div>

          </form>
        }
      </div>
    </div>;
  }
}

document.addEventListener('page:change', () => {
  const profileEdit = document.querySelector('#profile-edit');
  profileEdit && render(<Edit/>, profileEdit)
})
