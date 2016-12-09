class Ability
  include CanCan::Ability

  def initialize(user)

    user ||= User.new # guest user (not logged in)

    can [:read, :search, :images, :geojson, :map], DevSite
    can :read, Events
    can :read, Profile
    can [:new, :create], User
    can :read, Comment
    can :read, Conversation
    can :create, NewsletterSubscription

    # ADMIN =======================================================
    if user.has_role? :admin
      can :manage, :all
    # REGULAR USER ================================================
    elsif !user.new_record?
      can [:index, :read, :search, :images, :geojson, :map], DevSite
      can [:index, :read], Events
      can :manage, User, id: user.id
      can :manage, Profile, user_id: user.id
      can :manage, Notification, user_id: user.id
      can :manage, Survey, user_id: user.id
      can :manage, Comment, user_id: user.id
      can :manage, Vote, user_id: user.id
      can :manage, Conversation, user_id: user.id
      can :read, Comment
    end

  end
end
