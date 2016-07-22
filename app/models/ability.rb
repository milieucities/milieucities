class Ability
  include CanCan::Ability

  def initialize(user)

    user ||= User.new # guest user (not logged in)

    can [:index, :read, :search, :images, :geojson], DevSite
    can [:index, :read], Events
    can :read, Profile
    can [:new, :create], User
    can :read, Comment


    # ADMIN =======================================================
    if user.has_role? :admin
      can :manage, User
      can :manage, Profile
      can :manage, DevSite
      can :manage, Event
      can :manage, Comment
    # REGULAR USER ================================================
    elsif !user.new_record?
      can [:index, :read, :search, :images, :geojson], DevSite
      can [:index, :read], Events
      can :manage, Profile, user_id: user.id
      can :manage, Comment, user_id: user.id
      can :read, Comment
    end

  end
end
