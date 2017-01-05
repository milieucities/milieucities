class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)]

    user_abilities

    if user.has_role? :admin
      admin_abilities
    elsif !user.new_record?
      regular_user_abilities(user)
    end
  end

  private

  def user_abilities
    can [:read, :search, :images, :geojson, :map], DevSite
    can :read, Events
    can :read, Profile
    can [:new, :create], User
    can :read, Comment
    can :read, Conversation
    can :create, NewsletterSubscription
    can :create, CityRequest
  end

  def admin_abilities
    can :manage, :all
  end

  def regular_user_abilities(user)
    can [:index, :read, :search, :images, :geojson, :map], DevSite
    can [:index, :read], Events
    can [:new, :create, :update, :destroy, :show], User, id: user.id
    can :manage, Profile, user_id: user.id
    can :manage, Notification, user_id: user.id
    can :manage, Comment, user_id: user.id
    can :manage, Vote, user_id: user.id
    can :manage, Conversation, user_id: user.id
    can :read, Comment
  end
end
